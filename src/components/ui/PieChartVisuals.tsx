import { ArrowDown, FileText, Eye, BarChart3, Lightbulb } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

// Mini Pie Chart SVG Component
interface MiniPieProps {
  percentage: number;
  size?: number;
  color?: string;
}

function MiniPie({ percentage, size = 40, color = '#6366f1' }: MiniPieProps) {
  const radius = (size - 4) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = `${(percentage / 100) * circumference} ${circumference}`;
  
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {/* Background circle */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="#e5e7eb"
        strokeWidth="4"
      />
      {/* Filled portion */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={color}
        strokeWidth="4"
        strokeDasharray={strokeDasharray}
        strokeLinecap="round"
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
      />
    </svg>
  );
}

// Proportion Language Grid with Mini Pies and Hover Tooltips
const proportionData = [
  { 
    percentage: 50, 
    text: 'half, one in two',
    example: 'Over half of the population voted in favor of the proposal.',
    color: '#6366f1'
  },
  { 
    percentage: 33, 
    text: 'a third, one in three',
    example: 'Approximately one third of respondents preferred online shopping.',
    color: '#8b5cf6'
  },
  { 
    percentage: 25, 
    text: 'a quarter, one in four',
    example: 'A quarter of the budget was allocated to education.',
    color: '#a855f7'
  },
  { 
    percentage: 20, 
    text: 'a fifth, one in five',
    example: 'One in five households owned more than two vehicles.',
    color: '#d946ef'
  },
  { 
    percentage: 10, 
    text: 'a tenth, one in ten',
    example: 'Only a tenth of participants completed the full course.',
    color: '#ec4899'
  },
];

export function ProportionLanguageGrid() {
  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold text-purple-800 mb-4 flex items-center gap-2">
        <BarChart3 className="h-5 w-5" />
        Proportion Language
      </h3>
      <TooltipProvider>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {proportionData.map((item) => (
            <Tooltip key={item.percentage}>
              <TooltipTrigger asChild>
                <div 
                  className="bg-white border-2 border-purple-100 rounded-xl p-4 flex flex-col items-center gap-2 hover:border-purple-300 hover:shadow-md transition-all cursor-pointer group"
                >
                  <MiniPie percentage={item.percentage} size={48} color={item.color} />
                  <div className="text-center">
                    <p className="font-bold text-lg text-gray-800">{item.percentage}%</p>
                    <p className="text-sm text-gray-600">{item.text}</p>
                  </div>
                </div>
              </TooltipTrigger>
              <TooltipContent side="bottom" className="max-w-xs bg-purple-900 text-white p-3">
                <p className="text-sm italic">"{item.example}"</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
      </TooltipProvider>
    </div>
  );
}

// Flow Chart for Pie Chart Structure
const structureSteps = [
  {
    icon: FileText,
    title: 'Introduction',
    description: 'Paraphrase what the chart(s) show',
    color: 'bg-blue-100 border-blue-300 text-blue-800',
    iconColor: 'text-blue-600'
  },
  {
    icon: Eye,
    title: 'Overview',
    description: 'Main proportions and notable features',
    color: 'bg-indigo-100 border-indigo-300 text-indigo-800',
    iconColor: 'text-indigo-600'
  },
  {
    icon: BarChart3,
    title: 'Body 1',
    description: 'Largest segments and their proportions',
    color: 'bg-green-100 border-green-300 text-green-800',
    iconColor: 'text-green-600'
  },
  {
    icon: BarChart3,
    title: 'Body 2',
    description: 'Smaller segments and comparisons',
    color: 'bg-orange-100 border-orange-300 text-orange-800',
    iconColor: 'text-orange-600'
  },
];

export function PieChartStructureFlow() {
  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold text-blue-800 mb-4">Pie Chart Structure</h3>
      <div className="flex flex-col md:flex-row items-stretch gap-2 md:gap-0">
        {structureSteps.map((step, index) => (
          <div key={index} className="flex flex-col md:flex-row items-center flex-1">
            <div className={`${step.color} border-2 rounded-xl p-4 w-full md:min-h-[120px] flex flex-col items-center justify-center text-center`}>
              <step.icon className={`h-8 w-8 ${step.iconColor} mb-2`} />
              <p className="font-bold text-sm">{step.title}</p>
              <p className="text-xs mt-1 opacity-80">{step.description}</p>
            </div>
            {index < structureSteps.length - 1 && (
              <>
                <ArrowDown className="h-6 w-6 text-gray-400 my-2 md:hidden" />
                <div className="hidden md:flex items-center px-1">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-gray-400">
                    <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// Before/After Comparison Box
interface BeforeAfterProps {
  before: string;
  after: string;
  label?: string;
}

export function BeforeAfterComparison({ before, after, label = "Paraphrasing Example" }: BeforeAfterProps) {
  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-3">{label}</h3>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-gray-100 border-2 border-gray-200 rounded-xl p-4">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Question Text</p>
          <p className="text-gray-700">{before}</p>
        </div>
        <div className="bg-green-50 border-2 border-green-200 rounded-xl p-4">
          <p className="text-xs font-semibold text-green-600 uppercase tracking-wide mb-2">Paraphrased (Band 9)</p>
          <p className="text-green-800 font-medium">{after}</p>
        </div>
      </div>
    </div>
  );
}

// Key Principle Highlight Box
interface KeyPrincipleProps {
  text: string;
}

export function KeyPrincipleBox({ text }: KeyPrincipleProps) {
  return (
    <div className="bg-amber-50 border-2 border-amber-300 rounded-xl p-4 flex items-start gap-3">
      <div className="bg-amber-200 rounded-full p-2 flex-shrink-0">
        <Lightbulb className="h-5 w-5 text-amber-700" />
      </div>
      <div>
        <p className="font-bold text-amber-800 text-sm uppercase tracking-wide mb-1">Pro Tip</p>
        <p className="text-amber-900">{text}</p>
      </div>
    </div>
  );
}

// Main Component that combines all visuals for Pie Chart lesson
export function PieChartCoreExplanation() {
  return (
    <div className="space-y-6">
      {/* Pie Chart Structure - Flow Chart */}
      <PieChartStructureFlow />
      
      {/* Proportion Language - Grid with Mini Pies */}
      <ProportionLanguageGrid />
      
      {/* Before/After Comparison */}
      <BeforeAfterComparison 
        before="The chart shows electricity usage in different sectors."
        after="The provided pie chart illustrates the consumption of electricity across various sectors."
      />
      
      {/* Key Principle - Highlighted Box */}
      <KeyPrincipleBox 
        text="Pie charts show proportions of a whole. Focus on relative sizes, not just percentages. Always compare segments and show relationships to the total."
      />
    </div>
  );
}

export default PieChartCoreExplanation;
