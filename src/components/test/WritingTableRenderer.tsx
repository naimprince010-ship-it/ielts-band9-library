import { WritingTableData } from '@/types';

interface Props {
  tableData: WritingTableData;
  className?: string;
  compact?: boolean;
}

function normalizeRows(rows: unknown): string[][] {
  if (!Array.isArray(rows)) return [];
  return rows.map((row) => {
    if (Array.isArray(row)) return row.map((c) => String(c ?? ''));
    if (row && typeof row === 'object') {
      return Object.values(row as Record<string, unknown>).map((c) => String(c ?? ''));
    }
    return [String(row ?? '')];
  });
}

export function WritingTableRenderer({ tableData, className = '', compact = false }: Props) {
  const headers = Array.isArray(tableData.headers) ? tableData.headers : [];
  const rows = normalizeRows(tableData.rows);

  return (
    <div className={`bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden ${className}`}>
      {/* Header */}
      <div className="px-4 pt-4 pb-2 border-b border-slate-100">
        <div className="flex items-center gap-2 flex-wrap">
          <div className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-blue-100 text-blue-700">
            table
          </div>
          {tableData.unit && (
            <span className="text-[10px] text-slate-400">Unit: {tableData.unit}</span>
          )}
        </div>
        <h3 className={`font-bold text-slate-800 mt-1 ${compact ? 'text-sm' : 'text-base'}`}>
          {tableData.title}
        </h3>
        {tableData.description && (
          <p className="text-xs text-slate-500 mt-0.5">{tableData.description}</p>
        )}
      </div>

      {/* Table */}
      <div className="overflow-x-auto p-4">
        <table className="w-full text-sm border-collapse rounded-lg overflow-hidden">
          <thead>
            <tr>
              {headers.map((header, i) => (
                <th
                  key={i}
                  className={`bg-slate-800 text-white px-3 py-2.5 text-left font-semibold whitespace-nowrap
                    ${compact ? 'text-xs' : 'text-sm'}
                    ${i === 0 ? 'rounded-tl-lg' : ''}
                    ${i === headers.length - 1 ? 'rounded-tr-lg' : ''}`}
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, ri) => (
              <tr
                key={ri}
                className={`border-b border-slate-100 transition-colors hover:bg-slate-50 ${ri % 2 === 0 ? 'bg-white' : 'bg-slate-50/60'}`}
              >
                {row.map((cell, ci) => (
                  <td
                    key={ci}
                    className={`px-3 py-2 ${compact ? 'text-xs' : 'text-sm'}
                      ${ci === 0 ? 'font-semibold text-slate-700' : 'text-slate-600 text-right'}
                    `}
                  >
                    {cell}{tableData.unit && ci > 0 ? '' : ''}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        {tableData.source && (
          <p className="text-[10px] text-slate-400 mt-2 italic">Source: {tableData.source}</p>
        )}
      </div>
    </div>
  );
}
