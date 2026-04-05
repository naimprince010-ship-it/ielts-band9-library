import { WritingProcessData, WritingProcessStep } from '@/types';

interface Props {
  processData: WritingProcessData;
  className?: string;
  compact?: boolean;
}

const SHAPE_STYLES: Record<NonNullable<WritingProcessStep['shape']>, string> = {
  oval:    'rounded-full bg-emerald-100 border-emerald-400 text-emerald-800',
  rect:    'rounded-xl bg-white border-slate-300 text-slate-800',
  diamond: 'rounded-xl bg-amber-50 border-amber-300 text-amber-800',
};

const SHAPE_ICON: Record<NonNullable<WritingProcessStep['shape']>, string> = {
  oval:    '⬤',
  rect:    '▶',
  diamond: '◆',
};

function ProcessStep({ step, index, compact }: { step: WritingProcessStep; index: number; compact: boolean }) {
  const shape = step.shape ?? 'rect';
  const shapeStyle = SHAPE_STYLES[shape];
  const icon = SHAPE_ICON[shape];

  return (
    <div className="flex flex-col items-center">
      {/* Step number badge */}
      <div className="w-6 h-6 rounded-full bg-slate-700 text-white text-[10px] font-bold flex items-center justify-center mb-1.5 shadow">
        {index + 1}
      </div>

      {/* Step box */}
      <div className={`border-2 px-4 py-2.5 text-center shadow-sm w-full max-w-[180px] ${shapeStyle}`}>
        <div className="flex items-center justify-center gap-1.5">
          <span className="text-[10px] opacity-60">{icon}</span>
          <span className={`font-semibold ${compact ? 'text-xs' : 'text-sm'}`}>{step.label}</span>
        </div>
        {step.description && (
          <p className={`mt-1 opacity-70 ${compact ? 'text-[9px]' : 'text-xs'}`}>{step.description}</p>
        )}
      </div>
    </div>
  );
}

export function WritingProcessRenderer({ processData, className = '', compact = false }: Props) {
  const steps = processData.steps;
  const isCircular = processData.isCircular;

  return (
    <div className={`bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden ${className}`}>
      {/* Header */}
      <div className="px-4 pt-4 pb-2 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-green-100 text-green-700">
            process diagram
          </div>
          {isCircular && (
            <div className="px-2 py-0.5 rounded text-[10px] font-bold bg-violet-100 text-violet-700">
              cyclic ↻
            </div>
          )}
        </div>
        <h3 className={`font-bold text-slate-800 mt-1 ${compact ? 'text-sm' : 'text-base'}`}>
          {processData.title}
        </h3>
        {processData.description && (
          <p className="text-xs text-slate-500 mt-0.5">{processData.description}</p>
        )}
      </div>

      {/* Process flow */}
      <div className="p-5">
        {/* Legend */}
        <div className="flex items-center gap-4 mb-4 flex-wrap">
          <div className="flex items-center gap-1.5 text-[10px] text-slate-500">
            <span className="w-3 h-3 rounded-full bg-emerald-400 inline-block" />
            Start / End
          </div>
          <div className="flex items-center gap-1.5 text-[10px] text-slate-500">
            <span className="w-3 h-3 rounded bg-slate-300 inline-block" />
            Process step
          </div>
          <div className="flex items-center gap-1.5 text-[10px] text-slate-500">
            <span className="w-3 h-3 rounded bg-amber-300 inline-block" />
            Decision
          </div>
        </div>

        {/* Steps — vertical flow */}
        <div className="flex flex-col items-center gap-0">
          {steps.map((step, idx) => (
            <div key={idx} className="flex flex-col items-center w-full">
              <ProcessStep step={step} index={idx} compact={compact} />

              {/* Connector arrow */}
              {idx < steps.length - 1 && (
                <div className="flex flex-col items-center my-1">
                  <div className="w-0.5 h-5 bg-slate-300" />
                  <div className="text-slate-400 text-sm leading-none">▼</div>
                </div>
              )}

              {/* Return arrow for circular processes */}
              {isCircular && idx === steps.length - 1 && (
                <div className="flex flex-col items-center my-1">
                  <div className="w-0.5 h-3 bg-slate-300" />
                  <div className="border border-dashed border-slate-300 rounded-lg px-3 py-1 text-[10px] text-slate-400 flex items-center gap-1">
                    ↻ Returns to Step 1
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
