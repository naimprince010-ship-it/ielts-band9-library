import type {
  WritingChartData,
  WritingTableData,
  WritingProcessData,
  WritingMapData,
} from '@/types';

export type Task1VisualPatch = {
  chartData?: WritingChartData;
  tableData?: WritingTableData;
  processData?: WritingProcessData;
  mapData?: WritingMapData;
};

function normalizeTable(raw: unknown): WritingTableData | null {
  if (!raw || typeof raw !== 'object') return null;
  const o = raw as Record<string, unknown>;
  const headersRaw = o.headers;
  if (!Array.isArray(headersRaw) || headersRaw.length === 0) return null;
  const headers = headersRaw.map((h) => String(h ?? ''));

  const rowsRaw = o.rows;
  if (!Array.isArray(rowsRaw)) return null;

  const rows: string[][] = rowsRaw.map((row: unknown) => {
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
    title: String(o.title ?? 'Data table'),
    description: o.description != null ? String(o.description) : undefined,
    unit: o.unit != null ? String(o.unit) : undefined,
    source: o.source != null ? String(o.source) : undefined,
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

/**
 * Pull Task 1 visual fields from AI JSON (handles alternate keys and table row shapes).
 */
export function extractTask1Visuals(task1: unknown): Task1VisualPatch | null {
  if (!task1 || typeof task1 !== 'object') return null;
  const t1 = task1 as Record<string, unknown>;

  const chartRaw = t1.chartData ?? t1.chart;
  const tableRaw = t1.tableData ?? t1.table ?? t1.dataTable;
  const processRaw = t1.processData ?? t1.process ?? t1.flowchart;
  const mapRaw = t1.mapData ?? t1.map ?? t1.maps;

  // Prefer table when present (Task 1 prompts often say "table below")
  const tableData = normalizeTable(tableRaw);
  if (tableData) return { tableData };

  const chartData = normalizeChart(chartRaw);
  if (chartData) return { chartData };

  const processData = normalizeProcess(processRaw);
  if (processData) return { processData };

  const mapData = normalizeMap(mapRaw);
  if (mapData) return { mapData };

  return null;
}
