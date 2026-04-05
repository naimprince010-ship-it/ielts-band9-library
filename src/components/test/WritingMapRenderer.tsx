import { WritingMapData, WritingMapZone } from '@/types';

interface Props {
  mapData: WritingMapData;
  className?: string;
  compact?: boolean;
}

// Default colour lookup for common zone types
const ZONE_COLOR_LEGEND: Record<string, string> = {
  'park':        '#86efac',
  'garden':      '#86efac',
  'forest':      '#4ade80',
  'lake':        '#93c5fd',
  'river':       '#60a5fa',
  'road':        '#94a3b8',
  'school':      '#c4b5fd',
  'hospital':    '#fca5a5',
  'housing':     '#fda4af',
  'houses':      '#fda4af',
  'residential': '#fda4af',
  'shops':       '#fdba74',
  'shopping':    '#fdba74',
  'mall':        '#fdba74',
  'office':      '#93c5fd',
  'factory':     '#cbd5e1',
  'industrial':  '#cbd5e1',
  'car park':    '#e2e8f0',
  'car_park':    '#e2e8f0',
  'parking':     '#e2e8f0',
  'hotel':       '#fbbf24',
  'farm':        '#fde68a',
  'farmland':    '#fde68a',
  'beach':       '#fef08a',
  'bridge':      '#94a3b8',
};

function getZoneColor(zone: WritingMapZone): string {
  if (zone.color) return zone.color;
  const key = zone.label.toLowerCase().trim();
  return ZONE_COLOR_LEGEND[key] ?? '#e2e8f0';
}

function MapGrid({
  plan,
  compact,
}: {
  plan: WritingMapData['plans'][number];
  compact: boolean;
}) {
  const zones = plan.zones;
  const maxRow = Math.max(...zones.map(z => z.row + (z.rowSpan ?? 1) - 1), 4);
  const maxCol = Math.max(...zones.map(z => z.col + (z.colSpan ?? 1) - 1), 4);
  const cellSize = compact ? 52 : 72;

  return (
    <div>
      {plan.label && (
        <div className="text-center mb-1.5">
          <span className={`font-bold text-slate-700 ${compact ? 'text-xs' : 'text-sm'} bg-slate-100 px-2 py-0.5 rounded`}>
            {plan.label}
          </span>
        </div>
      )}

      {/* North arrow */}
      <div className="flex justify-end mb-1 pr-1">
        <span className="text-[10px] text-slate-400 font-bold">↑ N</span>
      </div>

      {/* Map grid */}
      <div className="border-2 border-slate-700 rounded-lg overflow-hidden">
        <div
          style={{
            display: 'grid',
            gridTemplateRows: `repeat(${maxRow}, ${cellSize}px)`,
            gridTemplateColumns: `repeat(${maxCol}, 1fr)`,
            gap: '1px',
            background: '#94a3b8',
          }}
        >
          {zones.map((zone, i) => {
            const bg = getZoneColor(zone);
            return (
              <div
                key={i}
                style={{
                  gridRow: `${zone.row} / span ${zone.rowSpan ?? 1}`,
                  gridColumn: `${zone.col} / span ${zone.colSpan ?? 1}`,
                  backgroundColor: bg,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'column',
                  padding: '4px',
                  textAlign: 'center',
                  minHeight: `${cellSize}px`,
                }}
              >
                <span
                  style={{
                    fontSize: compact ? '9px' : '11px',
                    fontWeight: 700,
                    color: '#1e293b',
                    lineHeight: 1.3,
                    wordBreak: 'break-word',
                    maxWidth: '100%',
                  }}
                >
                  {zone.label}
                </span>
                {zone.description && !compact && (
                  <span style={{ fontSize: '9px', color: '#475569', marginTop: '2px' }}>
                    {zone.description}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export function WritingMapRenderer({ mapData, className = '', compact = false }: Props) {
  const hasTwoPlans = mapData.plans.length >= 2;

  // Unique zones for legend
  const allZones = mapData.plans.flatMap(p => p.zones);
  const uniqueZones = allZones.filter(
    (z, i, arr) => arr.findIndex(x => x.label === z.label) === i
  );

  return (
    <div className={`bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden ${className}`}>
      {/* Header */}
      <div className="px-4 pt-4 pb-2 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-teal-100 text-teal-700">
            map / plan
          </div>
          {hasTwoPlans && (
            <div className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-600">
              before &amp; after
            </div>
          )}
        </div>
        <h3 className={`font-bold text-slate-800 mt-1 ${compact ? 'text-sm' : 'text-base'}`}>
          {mapData.title}
        </h3>
        {mapData.description && (
          <p className="text-xs text-slate-500 mt-0.5">{mapData.description}</p>
        )}
      </div>

      {/* Map plans */}
      <div className={`p-4 ${hasTwoPlans ? 'grid grid-cols-2 gap-4' : ''}`}>
        {mapData.plans.map((plan, idx) => (
          <MapGrid key={idx} plan={plan} compact={compact} />
        ))}
      </div>

      {/* Colour legend */}
      <div className="px-4 pb-3 flex flex-wrap gap-2">
        {uniqueZones.map((zone, i) => (
          <div key={i} className="flex items-center gap-1 text-[10px] text-slate-600">
            <span
              className="w-3 h-3 rounded-sm border border-slate-300 inline-block flex-shrink-0"
              style={{ backgroundColor: getZoneColor(zone) }}
            />
            {zone.label}
          </div>
        ))}
      </div>
    </div>
  );
}
