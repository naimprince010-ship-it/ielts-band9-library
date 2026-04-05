import { WritingTask } from '@/types';
import { WritingChartRenderer } from './WritingChartRenderer';
import { WritingTableRenderer } from './WritingTableRenderer';
import { WritingProcessRenderer } from './WritingProcessRenderer';
import { WritingMapRenderer } from './WritingMapRenderer';

interface Props {
  task: WritingTask;
  compact?: boolean;
  className?: string;
}

/**
 * Unified dispatcher for Writing Task 1 visuals.
 * Checks which visual field is set on the task and renders the appropriate component.
 * Priority: chartData → tableData → processData → mapData → imageUrl (legacy)
 */
export function WritingTask1Renderer({ task, compact = false, className = '' }: Props) {
  if (task.chartData) {
    return <WritingChartRenderer chartData={task.chartData} compact={compact} className={className} />;
  }
  if (task.tableData) {
    return <WritingTableRenderer tableData={task.tableData} compact={compact} className={className} />;
  }
  if (task.processData) {
    return <WritingProcessRenderer processData={task.processData} compact={compact} className={className} />;
  }
  if (task.mapData) {
    return <WritingMapRenderer mapData={task.mapData} compact={compact} className={className} />;
  }
  // Legacy: raw image URL
  if (task.imageUrl) {
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
