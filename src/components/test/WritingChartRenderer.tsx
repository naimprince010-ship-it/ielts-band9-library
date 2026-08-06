import { useEffect, useRef } from 'react';
import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  PieController,
  LineController,
  BarController,
  Title,
  Tooltip,
  Legend,
  Filler,
  ChartData,
  ChartOptions,
} from 'chart.js';
import { WritingChartData } from '@/types';

// Register Chart.js components (including Pie)
Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  PieController,
  LineController,
  BarController,
  Title,
  Tooltip,
  Legend,
  Filler
);

// Curated color palette for datasets
const LINE_COLORS = [
  { border: '#6366f1', background: 'rgba(99,102,241,0.12)' },
  { border: '#f59e0b', background: 'rgba(245,158,11,0.12)' },
  { border: '#10b981', background: 'rgba(16,185,129,0.12)' },
  { border: '#ef4444', background: 'rgba(239,68,68,0.12)' },
  { border: '#8b5cf6', background: 'rgba(139,92,246,0.12)' },
  { border: '#0ea5e9', background: 'rgba(14,165,233,0.12)' },
  { border: '#f97316', background: 'rgba(249,115,22,0.12)' },
];

const BAR_COLORS = [
  { border: '#6366f1', background: 'rgba(99,102,241,0.75)' },
  { border: '#f59e0b', background: 'rgba(245,158,11,0.75)' },
  { border: '#10b981', background: 'rgba(16,185,129,0.75)' },
  { border: '#ef4444', background: 'rgba(239,68,68,0.75)' },
  { border: '#8b5cf6', background: 'rgba(139,92,246,0.75)' },
  { border: '#0ea5e9', background: 'rgba(14,165,233,0.75)' },
  { border: '#f97316', background: 'rgba(249,115,22,0.75)' },
];

// Pie slices: solid, vibrant
const PIE_COLORS = [
  'rgba(99,102,241,0.85)',   // indigo
  'rgba(245,158,11,0.85)',   // amber
  'rgba(16,185,129,0.85)',   // emerald
  'rgba(239,68,68,0.85)',    // red
  'rgba(139,92,246,0.85)',   // violet
  'rgba(14,165,233,0.85)',   // sky
  'rgba(249,115,22,0.85)',   // orange
  'rgba(236,72,153,0.85)',   // pink
];

const TYPE_BADGE: Record<string, string> = {
  line: 'bg-indigo-100 text-indigo-700',
  bar:  'bg-amber-100 text-amber-700',
  pie:  'bg-rose-100 text-rose-700',
  combo: 'bg-emerald-100 text-emerald-700',
};

interface WritingChartRendererProps {
  chartData: WritingChartData;
  className?: string;
  compact?: boolean;
}

export function WritingChartRenderer({ chartData, className = '', compact = false }: WritingChartRendererProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<Chart | null>(null);
  const chartDataSignature = JSON.stringify(chartData);

  useEffect(() => {
    if (!canvasRef.current) return;

    if (chartRef.current) {
      chartRef.current.destroy();
      chartRef.current = null;
    }

    const isPie = chartData.type === 'pie';
    const isCombo = chartData.type === 'combo';

    let data: ChartData;

    if (isPie) {
      // Pie: single dataset — data values = slice sizes, labels = slice names
      const values = chartData.datasets[0]?.data ?? [];
      data = {
        labels: chartData.labels,
        datasets: [{
          label: chartData.datasets[0]?.label || 'Share',
          data: values,
          backgroundColor: PIE_COLORS,
          borderColor: '#fff',
          borderWidth: 2,
          hoverOffset: 8,
        }],
      };
    } else {
      const palette = chartData.type === 'bar' ? BAR_COLORS : LINE_COLORS;
      data = {
        labels: chartData.labels,
        datasets: chartData.datasets.map((ds, idx) => {
          const datasetType = isCombo ? (ds.type || (idx === 0 ? 'bar' : 'line')) : chartData.type;
          const datasetPalette = datasetType === 'bar' ? BAR_COLORS : LINE_COLORS;
          const color = datasetPalette[idx % datasetPalette.length] || palette[idx % palette.length];
          return {
            type: datasetType,
            label: ds.label,
            data: ds.data,
            borderColor: ds.borderColor || color.border,
            backgroundColor: ds.backgroundColor || color.background,
            borderWidth: datasetType === 'line' ? 2.5 : 1.5,
            pointRadius: datasetType === 'line' ? 4 : 0,
            pointHoverRadius: datasetType === 'line' ? 6 : 0,
            pointBackgroundColor: ds.borderColor || color.border,
            tension: datasetType === 'line' ? 0.3 : 0,
            fill: datasetType === 'line' && chartData.datasets.length === 1,
            borderRadius: datasetType === 'bar' ? 4 : 0,
          };
        }),
      };
    }

    const options: ChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      animation: compact ? false : { duration: 600, easing: 'easeInOutQuart' },
      plugins: {
        legend: {
          position: isPie ? 'right' : 'bottom',
          labels: {
            font: { size: compact ? 10 : 12, family: "'Inter', sans-serif" },
            padding: isPie ? 12 : 16,
            usePointStyle: true,
            pointStyleWidth: 10,
          },
        },
        tooltip: {
          backgroundColor: 'rgba(15,23,42,0.92)',
          titleFont: { size: compact ? 11 : 13, weight: 'bold' },
          bodyFont: { size: compact ? 10 : 12 },
          padding: 10,
          callbacks: {
            label: (ctx) => {
              if (isPie) {
                const total = (ctx.dataset.data as number[]).reduce((a, b) => a + b, 0);
                const val = ctx.parsed as number;
                const pct = total > 0 ? ((val / total) * 100).toFixed(1) : '0';
                return ` ${ctx.label}: ${val}${chartData.unit || ''} (${pct}%)`;
              }
              return ` ${ctx.dataset.label}: ${ctx.parsed.y}${chartData.unit || ''}`;
            },
          },
        },
      },
      // No scales for pie
      ...(isPie ? {} : {
        scales: {
          x: {
            grid: { color: 'rgba(148,163,184,0.15)' },
            ticks: { font: { size: compact ? 9 : 11, family: "'Inter', sans-serif" } },
          },
          y: {
            min: chartData.yMin,
            max: chartData.yMax,
            grid: { color: 'rgba(148,163,184,0.15)' },
            ticks: {
              font: { size: compact ? 9 : 11, family: "'Inter', sans-serif" },
              callback: (val) => `${val}${chartData.unit || ''}`,
            },
            title: {
              display: !!chartData.description,
              text: chartData.description || '',
              font: { size: compact ? 9 : 11, family: "'Inter', sans-serif" },
              color: '#64748b',
            },
          },
        },
      }),
    };

    chartRef.current = new Chart(canvasRef.current, {
      type: isCombo ? 'bar' : chartData.type,
      data,
      options,
    });

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
        chartRef.current = null;
      }
    };
    // The parent timer renders every second. Rebuild only when chart content changes,
    // not when an equivalent chartData object gets a new identity.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chartDataSignature, compact]);

  return (
    <div className={`bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden ${className}`}>
      <div className="px-4 pt-4 pb-2 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${TYPE_BADGE[chartData.type] || 'bg-slate-100 text-slate-600'}`}>
            {chartData.type} chart
          </div>
          {chartData.unit && (
            <span className="text-[10px] text-slate-400">Unit: {chartData.unit}</span>
          )}
        </div>
        <h3 className={`font-bold text-slate-800 mt-1 ${compact ? 'text-sm' : 'text-base'}`}>
          {chartData.title}
        </h3>
        {chartData.description && !['line','bar'].includes(chartData.type) && (
          <p className="text-xs text-slate-500 mt-0.5">{chartData.description}</p>
        )}
      </div>
      <div className={`p-4 ${compact ? 'h-[250px] sm:h-[270px]' : 'h-[360px]'}`}>
        <canvas ref={canvasRef} className="h-full w-full" />
      </div>
    </div>
  );
}
