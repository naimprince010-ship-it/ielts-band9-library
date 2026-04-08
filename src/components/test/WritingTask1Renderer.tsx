import { WritingTask, WritingChartData, WritingTableData, WritingProcessData, WritingMapData } from '@/types';
import { WritingChartRenderer } from './WritingChartRenderer';
import { WritingTableRenderer } from './WritingTableRenderer';
import { WritingProcessRenderer } from './WritingProcessRenderer';
import { WritingMapRenderer } from './WritingMapRenderer';

interface Props {
  task: WritingTask;
  compact?: boolean;
  className?: string;
}

function isRenderableChart(chart: WritingChartData | undefined): boolean {
  if (!chart || typeof chart !== 'object') return false;
  if (!Array.isArray(chart.labels) || chart.labels.length === 0) return false;
  if (!Array.isArray(chart.datasets) || chart.datasets.length === 0) return false;
  return chart.datasets.some((ds) => ds && Array.isArray(ds.data) && ds.data.length > 0);
}

function isRenderableTable(t: WritingTableData | undefined): boolean {
  if (!t || typeof t !== 'object') return false;
  const hasHeaders = Array.isArray(t.headers) && t.headers.length > 0;
  const hasRows = Array.isArray(t.rows) && t.rows.length > 0;
  return hasHeaders || hasRows;
}

function isRenderableProcess(p: WritingProcessData | undefined): boolean {
  return !!(p && Array.isArray(p.steps) && p.steps.length > 0);
}

function isRenderableMap(m: WritingMapData | undefined): boolean {
  return !!(m && Array.isArray(m.plans) && m.plans.length > 0);
}

/** True if WritingTask1Renderer would output something (for warnings / integrity alignment). */
export function writingTask1RendererWouldShow(task: WritingTask | undefined): boolean {
  if (!task) return false;
  if (isRenderableChart(task.chartData)) return true;
  if (isRenderableTable(task.tableData)) return true;
  if (isRenderableProcess(task.processData)) return true;
  if (isRenderableMap(task.mapData)) return true;
  return typeof task.imageUrl === 'string' && task.imageUrl.trim().length > 0;
}

/**
 * Unified dispatcher for Writing Task 1 visuals.
 * Skips empty chart objects so a valid table is not hidden behind a broken chart payload.
 */
export function WritingTask1Renderer({ task, compact = false, className = '' }: Props) {
  if (isRenderableChart(task.chartData)) {
    return <WritingChartRenderer chartData={task.chartData!} compact={compact} className={className} />;
  }
  if (isRenderableTable(task.tableData)) {
    return <WritingTableRenderer tableData={task.tableData!} compact={compact} className={className} />;
  }
  if (isRenderableProcess(task.processData)) {
    return <WritingProcessRenderer processData={task.processData!} compact={compact} className={className} />;
  }
  if (isRenderableMap(task.mapData)) {
    return <WritingMapRenderer mapData={task.mapData!} compact={compact} className={className} />;
  }
  if (typeof task.imageUrl === 'string' && task.imageUrl.trim()) {
    return (
      <div className={`bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden p-4 ${className}`}>
        <img
          src={task.imageUrl}
          alt="Task visual"
          className="max-w-full rounded-lg border shadow-sm"
        />
      </div>
    );
  }
  return null;
}
