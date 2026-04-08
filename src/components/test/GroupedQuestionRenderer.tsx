import React from 'react';
import { ReadingQuestion, ListeningQuestion, UserAnswer } from '@/types';
import { sanitizeHtml } from '@/lib/sanitize';

interface GroupedQuestionRendererProps {
  firstQuestion: ReadingQuestion | ListeningQuestion;
  groupQuestions: (ReadingQuestion | ListeningQuestion)[];
  answers: Record<string, UserAnswer>;
  isSubmitted: boolean;
  onAnswerChange: (questionId: string, questionNumber: number, value: string) => void;
  questionRefs: React.MutableRefObject<Record<number, HTMLElement | null>>;
}

export function GroupedQuestionRenderer({
  firstQuestion,
  groupQuestions,
  answers,
  isSubmitted,
  onAnswerChange,
  questionRefs
}: GroupedQuestionRendererProps) {
  
  // Parses a string containing placeholders like [Q14] and replaces them with interactive inputs
  const renderTextWithInputs = (text: string) => {
    // Regex splits by [Qxx] or [xx] keeping the matched parts
    const parts = text.split(/(\[Q?\d+\])/g);
    
    return parts.map((part, index) => {
      const match = part.match(/\[Q?(\d+)\]/);
      if (match) {
        const qNum = parseInt(match[1]);
        const targetQuestion = groupQuestions.find(q => q.questionNumber === qNum);
        
        if (!targetQuestion) {
          // Fallback if question isn't in this group
          return <span key={index}>{part}</span>;
        }
        
        const currentAnswer = answers[targetQuestion.id]?.answer || '';
        let inputClass = "mx-1 inline-block w-32 px-2 py-1 h-8 text-sm border border-gray-300 rounded focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors";
        
        if (isSubmitted) {
           const isCorrect = (targetQuestion.acceptedAnswers && targetQuestion.acceptedAnswers.some(a => a.toLowerCase() === currentAnswer.toLowerCase())) || 
                             currentAnswer.toLowerCase() === targetQuestion.correctAnswer.toLowerCase();
                             
           inputClass += isCorrect ? ' border-green-500 bg-green-50 text-green-900' : ' border-red-500 bg-red-50 text-red-900';
        }
        
        return (
           <span key={`input-${qNum}-${index}`} className="inline-flex flex-col items-center align-middle mx-1">
             <input 
               ref={el => { if (questionRefs.current) questionRefs.current[qNum] = el; }}
               className={inputClass}
               value={currentAnswer}
               onChange={e => onAnswerChange(targetQuestion.id, qNum, e.target.value)}
               disabled={isSubmitted}
               type="text"
               placeholder={`Q${qNum}`}
             />
             {isSubmitted && !isCorrect(targetQuestion, currentAnswer) && (
               <span className="text-[10px] text-green-700 font-bold mt-1 text-center leading-tight">
                 {targetQuestion.correctAnswer}
               </span>
             )}
           </span>
        );
      }
      return <span key={index} dangerouslySetInnerHTML={{ __html: sanitizeHtml(part) }} />;
    });
  };

  const isCorrect = (q: ReadingQuestion | ListeningQuestion, answer: string) => {
    return (q.acceptedAnswers && q.acceptedAnswers.some(a => a.toLowerCase() === answer.toLowerCase())) || 
           answer.toLowerCase() === q.correctAnswer.toLowerCase();
  };

  return (
    <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-4 mb-6">
      <div className="mb-4">
        {/* Render group-level question text if available */}
        {firstQuestion.questionText && (
           <p className="text-gray-800 font-medium mb-4">{firstQuestion.questionText}</p>
        )}
      </div>

      {firstQuestion.type === 'table-completion' && firstQuestion.tableData && (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-slate-300 text-sm">
            <thead className="bg-slate-50">
              <tr>
                {firstQuestion.tableData.headers.map((header, idx) => (
                  <th key={idx} className="border border-slate-300 px-4 py-3 text-left font-bold text-slate-700 max-w-[200px]">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {firstQuestion.tableData.rows.map((row, rowIdx) => (
                <tr key={rowIdx} className="hover:bg-slate-50/50 transition-colors">
                  {row.cells.map((cell, cellIdx) => (
                    <td key={cellIdx} className="border border-slate-300 px-4 py-3 align-middle text-slate-700 leading-relaxed max-w-[300px]">
                      {renderTextWithInputs(cell)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {firstQuestion.type === 'summary-completion' && firstQuestion.summaryData && (
        <div className="prose prose-sm max-w-none text-slate-700 leading-wider p-4 bg-slate-50 rounded-lg border border-slate-100">
          <p className="leading-8">{renderTextWithInputs(firstQuestion.summaryData)}</p>
        </div>
      )}
    </div>
  );
}
