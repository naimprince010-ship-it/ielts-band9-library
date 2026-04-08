import type {
  WritingChartData,
  WritingTableData,
  WritingProcessData,
  WritingMapData,
  WritingTest,
  WritingTask,
} from '@/types';

/** Embedded on writing `test_data` when navigating from mock list so Supabase refresh still works if ?testId= is stripped. */
export const WRITING_MOCK_ROW_ID_KEY = '_ieltstreeMockRowId';

export type Task1VisualPatch = {
  chartData?: WritingChartData;
  tableData?: WritingTableData;
  processData?: WritingProcessData;
  mapData?: WritingMapData;
};

function maybeJsonParse(value: unknown): unknown {
  if (typeof value !== 'string') return value;
  const s = value.trim();
  if (
    (s.startsWith('{') && s.endsWith('}')) ||
    (s.startsWith('[') && s.endsWith(']'))
  ) {
    try {
      return JSON.parse(s) as unknown;
    } catch {
      return value;
    }
  }
  return value;
}

/** Unwrap { content: { rows... } } style wrappers (common in AI / CMS exports). */
function unwrapShallowTableWrapper(raw: unknown, depth = 0): unknown {
  if (depth > 6 || raw == null) return raw;
  const un = maybeJsonParse(raw);
  if (Array.isArray(un)) return un;
  if (typeof un !== 'object') return un;
  const o = un as Record<string, unknown>;
  if (
    Array.isArray(o.rows) ||
    Array.isArray(o.headers) ||
    Array.isArray(o.columns) ||
    o.type === 'table' ||
    (Array.isArray(o.data) &&
      (o.data.length === 0 || Array.isArray((o.data as unknown[])[0])))
  ) {
    return un;
  }
  const inner = o.content ?? o.value ?? o.payload ?? o.table;
  if (inner != null && inner !== un) return unwrapShallowTableWrapper(inner, depth + 1);
  return un;
}

const TASK_FIELD_KEYS = new Set([
  'id',
  'taskNumber',
  'task_number',
  'taskType',
  'task_type',
  'title',
  'prompt',
  'minWords',
  'min_words',
  'recommendedTime',
  'recommended_time',
  'tips',
  'sampleAnswer',
  'sample_answer',
  'imageUrl',
  'image_url',
  'chartData',
  'chart_data',
  'chart',
  'processData',
  'process_data',
  'process',
  'flowchart',
  'mapData',
  'map_data',
  'map',
  'maps',
  'visual',
  'visual_data',
  'tableData',
  'table_data',
  'table',
  'dataTable',
  'data_table',
  'grid',
  'body',
]);

/** Last resort: find any nested value on the task that parses as a table (odd AI keys). */
function harvestTableFromTaskRecord(t1: Record<string, unknown>): WritingTableData | null {
  for (const [k, v] of Object.entries(t1)) {
    if (TASK_FIELD_KEYS.has(k)) continue;
    if (v == null || typeof v === 'boolean' || typeof v === 'number') continue;
    const t = normalizeTable(unwrapShallowTableWrapper(v));
    if (t && (t.headers.length > 0 || t.rows.length > 0)) return t;
  }
  return null;
}

function headerCellToString(c: unknown): string {
  if (c == null) return '';
  if (typeof c === 'string' || typeof c === 'number' || typeof c === 'boolean') return String(c);
  if (typeof c === 'object' && c !== null && 'name' in (c as Record<string, unknown>)) {
    return String((c as Record<string, unknown>).name ?? '');
  }
  return String(c);
}

/** Turn rows / body / data / grid into a list of row arrays; unwrap { "0": [...], "1": [...] }. */
function coerceTableRowsSource(raw: unknown): unknown[] | null {
  let src: unknown = raw;
  if (!Array.isArray(src) && src && typeof src === 'object' && !Array.isArray(src)) {
    const o = src as Record<string, unknown>;
    const nk = Object.keys(o).filter((k) => /^\d+$/.test(k));
    if (nk.length > 0) {
      src = nk.sort((a, b) => Number(a) - Number(b)).map((k) => o[k]);
    }
  }
  return Array.isArray(src) ? src : null;
}

function normalizeTable(raw: unknown): WritingTableData | null {
  if (raw == null) return null;
  raw = unwrapShallowTableWrapper(maybeJsonParse(raw));
  if (Array.isArray(raw)) {
    return normalizeTable({ rows: raw });
  }
  if (typeof raw !== 'object') return null;
  const o = raw as Record<string, unknown>;

  const meta = {
    title: String(o.title ?? 'Data table'),
    description: o.description != null ? String(o.description) : undefined,
    unit: o.unit != null ? String(o.unit) : undefined,
    source: o.source != null ? String(o.source) : undefined,
  };

  // Array of uniform objects → headers from keys
  const fromRows = coerceTableRowsSource(o.rows ?? o.body ?? o.grid);
  const fromData = coerceTableRowsSource(o.data);
  const rowsSource =
    Array.isArray(fromRows) && fromRows.length > 0 ? fromRows : fromData;

  if (Array.isArray(rowsSource) && rowsSource.length > 0) {
    const r0 = rowsSource[0];
    if (r0 && typeof r0 === 'object' && !Array.isArray(r0)) {
      const headers = Object.keys(r0 as Record<string, unknown>);
      if (headers.length > 0) {
        const rows: string[][] = (rowsSource as Record<string, unknown>[]).map((row) =>
          headers.map((h) => {
            const v =
              row[h] ??
              row[h.replace(/\s+/g, '_')] ??
              row[h.toLowerCase().replace(/\s+/g, '_')];
            return v != null ? String(v) : '';
          })
        );
        return { type: 'table', ...meta, headers, rows };
      }
    }
  }

  const headersRaw = o.headers ?? o.columns ?? o.columnHeader ?? o.columnHeaders;
  let rowsRaw: unknown = o.rows ?? o.body ?? o.grid;
  if (
    !Array.isArray(rowsRaw) &&
    Array.isArray(o.data) &&
    (o.data.length === 0 || Array.isArray((o.data as unknown[])[0]))
  ) {
    rowsRaw = o.data;
  }

  const coercedRows = coerceTableRowsSource(rowsRaw);
  const matrix: unknown[][] =
    coercedRows?.map((row: unknown) => {
      if (Array.isArray(row)) return row;
      if (row && typeof row === 'object') {
        return [row];
      }
      return [row];
    }) ?? [];

  // Grid only: first row = headers (very common in AI / JSON exports)
  if ((!Array.isArray(headersRaw) || headersRaw.length === 0) && matrix.length > 0) {
    const first = matrix[0];
    const rest = matrix.slice(1);
    const allPrimitive =
      first.length > 0 &&
      first.every(
        (c) =>
          c == null ||
          typeof c === 'string' ||
          typeof c === 'number' ||
          typeof c === 'boolean'
      );
    if (allPrimitive) {
      const headers = first.map((c) => headerCellToString(c));
      if (headers.some((h) => h.length > 0)) {
        const rows: string[][] = rest.map((row) => {
          if (Array.isArray(row)) {
            return headers.map((_, i) => String(row[i] ?? ''));
          }
          if (row && typeof row === 'object') {
            const obj = row as Record<string, unknown>;
            return headers.map((h) => {
              const v =
                obj[h] ??
                obj[h.replace(/\s+/g, '_')] ??
                obj[h.toLowerCase().replace(/\s+/g, '_')];
              return v != null ? String(v) : '';
            });
          }
          return headers.map((_, i) => (i === 0 ? String(row ?? '') : ''));
        });
        return { type: 'table', ...meta, headers, rows };
      }
    }
  }

  if (!Array.isArray(headersRaw) || headersRaw.length === 0) return null;
  const headers = headersRaw.map((h) => headerCellToString(h));

  const rows: string[][] = matrix.map((row: unknown) => {
    if (Array.isArray(row)) {
      return row.map((c) => String(c ?? ''));
    }
    if (row && typeof row === 'object') {
      const obj = row as Record<string, unknown>;
      return headers.map((h) => {
        const v =
          obj[h] ??
          obj[h.replace(/\s+/g, '_')] ??
          obj[h.toLowerCase().replace(/\s+/g, '_')];
        return v != null ? String(v) : '';
      });
    }
    return [String(row ?? '')];
  });

  return {
    type: 'table',
    ...meta,
    headers,
    rows,
  };
}

function normalizeChart(raw: unknown): WritingChartData | null {
  if (!raw || typeof raw !== 'object') return null;
  const o = raw as Record<string, unknown>;
  const type = o.type;
  if (type !== 'line' && type !== 'bar' && type !== 'pie') return null;
  if (!Array.isArray(o.labels) || !Array.isArray(o.datasets)) return null;
  const datasets = (o.datasets as unknown[]).map((ds) => {
    if (!ds || typeof ds !== 'object') return { label: '', data: [] };
    const d = ds as Record<string, unknown>;
    const data = Array.isArray(d.data) ? d.data.map((n) => Number(n) || 0) : [];
    return {
      label: String(d.label ?? ''),
      data,
      borderColor: d.borderColor != null ? String(d.borderColor) : undefined,
      backgroundColor: d.backgroundColor != null ? String(d.backgroundColor) : undefined,
    };
  });
  return {
    type,
    title: String(o.title ?? 'Chart'),
    description: o.description != null ? String(o.description) : undefined,
    labels: (o.labels as unknown[]).map((l) => String(l ?? '')),
    unit: o.unit != null ? String(o.unit) : undefined,
    yMin: typeof o.yMin === 'number' ? o.yMin : undefined,
    yMax: typeof o.yMax === 'number' ? o.yMax : undefined,
    datasets,
  };
}

function normalizeProcess(raw: unknown): WritingProcessData | null {
  if (!raw || typeof raw !== 'object') return null;
  const o = raw as Record<string, unknown>;
  if (o.type !== 'process' && !Array.isArray(o.steps)) return null;
  if (!Array.isArray(o.steps)) return null;
  return {
    type: 'process',
    title: String(o.title ?? 'Process'),
    description: o.description != null ? String(o.description) : undefined,
    isCircular: Boolean(o.isCircular),
    steps: (o.steps as unknown[]).map((s) => {
      const st = (s && typeof s === 'object' ? s : {}) as Record<string, unknown>;
      return {
        label: String(st.label ?? ''),
        description: st.description != null ? String(st.description) : undefined,
        shape: st.shape === 'oval' || st.shape === 'rect' || st.shape === 'diamond' ? st.shape : undefined,
      };
    }),
  };
}

function normalizeMap(raw: unknown): WritingMapData | null {
  if (!raw || typeof raw !== 'object') return null;
  const o = raw as Record<string, unknown>;
  if (!Array.isArray(o.plans) || o.plans.length === 0) return null;
  return {
    type: 'map',
    title: String(o.title ?? 'Map'),
    description: o.description != null ? String(o.description) : undefined,
    plans: o.plans as WritingMapData['plans'],
  };
}

/** Match WritingTask1Renderer: skip empty chart payloads so they do not block a valid table. */
function isRenderableChartData(chart: WritingChartData): boolean {
  if (!chart || typeof chart !== 'object') return false;
  if (!Array.isArray(chart.labels) || chart.labels.length === 0) return false;
  if (!Array.isArray(chart.datasets) || chart.datasets.length === 0) return false;
  return chart.datasets.some((ds) => ds && Array.isArray(ds.data) && ds.data.length > 0);
}

/**
 * Pull Task 1 visual fields from AI JSON (handles alternate keys and table row shapes).
 */
export function extractTask1Visuals(task1: unknown): Task1VisualPatch | null {
  if (!task1 || typeof task1 !== 'object') return null;
  const t1 = task1 as Record<string, unknown>;

  const chartRaw = t1.chartData ?? t1.chart;
  const vis = t1.visual;
  const visTable =
    vis && typeof vis === 'object'
      ? (vis as Record<string, unknown>).tableData ??
        (vis as Record<string, unknown>).table ??
        (vis as Record<string, unknown>).dataTable ??
        (vis as Record<string, unknown>).grid
      : undefined;
  const tableRaw =
    t1.tableData ??
    t1.table_data ??
    t1.table ??
    t1.dataTable ??
    t1.data_table ??
    t1.grid ??
    visTable;
  const processRaw = t1.processData ?? t1.process ?? t1.flowchart;
  const mapRaw = t1.mapData ?? t1.map ?? t1.maps;

  // Prefer table when present (Task 1 prompts often say "table below")
  let tableData = normalizeTable(tableRaw);
  if (!tableData) tableData = harvestTableFromTaskRecord(t1);
  if (tableData) return { tableData };

  const chartData = normalizeChart(chartRaw);
  if (chartData && isRenderableChartData(chartData)) return { chartData };

  const processData = normalizeProcess(processRaw);
  if (processData) return { processData };

  const mapData = normalizeMap(mapRaw);
  if (mapData) return { mapData };

  return null;
}

function isNonEmptyVisualBlob(c: unknown): boolean {
  if (c == null) return false;
  if (typeof c === 'string') return c.trim().length > 0;
  if (typeof c !== 'object') return false;
  const o = c as Record<string, unknown>;
  const keys = Object.keys(o);
  if (keys.length === 0) return false;
  if (o.type === 'table' || Array.isArray(o.headers) || Array.isArray(o.rows)) {
    if (Array.isArray(o.headers) && o.headers.length > 0) return true;
    if (Array.isArray(o.rows) && o.rows.length > 0) return true;
    return false;
  }
  if (o.type === 'line' || o.type === 'bar' || o.type === 'pie') {
    return Array.isArray(o.labels) && o.labels.length > 0;
  }
  if (o.type === 'process' || Array.isArray(o.steps)) {
    return Array.isArray(o.steps) && o.steps.length > 0;
  }
  if (o.type === 'map' || Array.isArray(o.plans)) {
    return Array.isArray(o.plans) && o.plans.length > 0;
  }
  return true;
}

/** Fix task row after loading from JSON/Supabase (snake_case, missing taskType, odd visual keys). */
export function normalizeWritingTaskFromDb(raw: unknown): WritingTask {
  if (!raw || typeof raw !== 'object') {
    return {
      id: 'task-fallback',
      taskNumber: 1,
      taskType: 'task1',
      title: 'Task 1',
      prompt: '',
      minWords: 150,
      recommendedTime: 20,
    };
  }
  const t = raw as Record<string, unknown>;
  const out = { ...(t as unknown as WritingTask) };

  if (!out.taskType) {
    if (t.task_type === 'task1' || t.task_type === 'task2') {
      out.taskType = t.task_type as WritingTask['taskType'];
    } else if (Number(t.taskNumber) === 1 || Number(t.task_number) === 1) {
      out.taskType = 'task1';
      out.taskNumber = 1;
    } else if (Number(t.taskNumber) === 2 || Number(t.task_number) === 2) {
      out.taskType = 'task2';
      out.taskNumber = 2;
    }
  }
  if (out.taskNumber == null) {
    out.taskNumber = out.taskType === 'task2' ? 2 : 1;
  }

  const mergedForExtract = {
    chartData: out.chartData ?? t.chart_data,
    tableData: out.tableData ?? t.table_data,
    processData: out.processData ?? t.process_data,
    mapData: out.mapData ?? t.map_data,
    chart: t.chart,
    table: t.table,
    dataTable: t.data_table,
    grid: t.grid,
    visual: out.visual ?? t.visual ?? t.visual_data,
    process: t.process,
    flowchart: t.flowchart,
    map: t.map,
    maps: t.maps,
  };
  const patch = extractTask1Visuals(mergedForExtract);
  if (patch) {
    if (patch.chartData) out.chartData = patch.chartData;
    if (patch.tableData) out.tableData = patch.tableData;
    if (patch.processData) out.processData = patch.processData;
    if (patch.mapData) out.mapData = patch.mapData;
  }

  return out;
}

/** JSONB sometimes stores tasks as { "0": {...}, "1": {...} } instead of an array. */
function coerceWritingTasksArray(rawTasks: unknown): unknown[] {
  const parsed = maybeJsonParse(rawTasks);
  if (Array.isArray(parsed)) return parsed;
  if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
    const o = parsed as Record<string, unknown>;
    const numericKeys = Object.keys(o).filter((k) => /^\d+$/.test(k));
    if (numericKeys.length > 0) {
      return numericKeys.sort((a, b) => Number(a) - Number(b)).map((k) => o[k]);
    }
    return Object.values(o);
  }
  return [];
}

/** Normalize full writing test from DB (tasks + testType). */
export function normalizeWritingTestFromDb(raw: unknown): WritingTest {
  const w =
    raw && typeof raw === 'object'
      ? ({ ...(raw as Record<string, unknown>) } as Record<string, unknown>)
      : ({} as Record<string, unknown>);
  delete w[WRITING_MOCK_ROW_ID_KEY];
  let tasksSource: unknown = w.tasks;
  if (tasksSource == null && (w.task1 != null || w.task2 != null)) {
    tasksSource = [w.task1, w.task2].filter((x) => x != null);
  }
  const rawTasks = coerceWritingTasksArray(tasksSource);
  const tasks: WritingTask[] = rawTasks.map((task) => normalizeWritingTaskFromDb(task));

  const out = { ...(w as unknown as WritingTest), tasks: tasks as WritingTest['tasks'] };
  if (!out.testType && w.test_type) {
    out.testType = w.test_type as WritingTest['testType'];
  }
  if (typeof out.testType === 'string') {
    const low = out.testType.toLowerCase();
    if (low === 'academic' || low === 'general') {
      out.testType = low as WritingTest['testType'];
    }
  }
  return out;
}

export function findWritingTask1(wData: WritingTest): WritingTask | undefined {
  const tasks = wData.tasks;
  if (!Array.isArray(tasks)) return undefined;
  const byType = tasks.find(
    (t) =>
      t.taskType === 'task1' ||
      (t as Record<string, unknown>).task_type === 'task1'
  );
  if (byType) return byType;
  return tasks.find(
    (t) =>
      Number(t.taskNumber) === 1 ||
      Number((t as Record<string, unknown>).task_number) === 1
  );
}

export function findWritingTask2(wData: WritingTest): WritingTask | undefined {
  const tasks = wData.tasks;
  if (!Array.isArray(tasks)) return undefined;
  const byType = tasks.find(
    (t) =>
      t.taskType === 'task2' ||
      (t as Record<string, unknown>).task_type === 'task2'
  );
  if (byType) return byType;
  return tasks.find(
    (t) =>
      Number(t.taskNumber) === 2 ||
      Number((t as Record<string, unknown>).task_number) === 2
  );
}

export function writingTask1HasAcademicVisual(task: WritingTask | undefined): boolean {
  if (!task) return false;
  if (typeof task.imageUrl === 'string' && task.imageUrl.trim()) return true;
  // Same detection as AI merge (table/chart/process/map alternate keys on the task object).
  if (extractTask1Visuals(task) != null) return true;
  const r = task as Record<string, unknown>;
  const blobs = [
    task.chartData,
    task.tableData,
    task.processData,
    task.mapData,
    r.chart_data,
    r.table_data,
    r.process_data,
    r.map_data,
    r.chart,
    r.table,
    r.data_table,
    r.grid,
    r.visual,
    r.process,
    r.flowchart,
    r.map,
    r.maps,
  ];
  return blobs.some(isNonEmptyVisualBlob);
}

/** Apply writing test_data normalization when loading mock_tests rows. */
export function normalizeMockTestRow<T extends { module_type: string; test_data: unknown }>(row: T): T {
  if (row.module_type !== 'writing') return row;
  return {
    ...row,
    test_data: normalizeWritingTestFromDb(row.test_data),
  };
}
