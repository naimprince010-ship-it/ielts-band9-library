import { useState } from 'react';
import { cn } from '@/lib/utils';
import { CheckCircle, XCircle, RotateCcw, Trophy, AlertTriangle } from 'lucide-react';
import { Button } from './button';
import { Card, CardContent, CardHeader, CardTitle } from './card';

interface PracticeQuestion {
  question: string;
  type: 'mcq' | 'multiple-choice' | 'fill-blank' | 'rewrite';
  options?: string[];
  correctAnswer?: number | string;
}

interface InteractivePracticeProps {
  questions: PracticeQuestion[];
  answerKey?: string[];
  className?: string;
  title?: string;
}

export function InteractivePractice({ 
  questions, 
  answerKey = [],
  className,
  title = 'Practice Questions'
}: InteractivePracticeProps) {
  const [answers, setAnswers] = useState<Record<number, string | number>>({});
  const [submitted, setSubmitted] = useState<Record<number, boolean>>({});
  const [showAllAnswers, setShowAllAnswers] = useState(false);

  const handleSelectOption = (questionIndex: number, optionIndex: number) => {
    if (submitted[questionIndex]) return;
    setAnswers(prev => ({ ...prev, [questionIndex]: optionIndex }));
  };

  const handleInputChange = (questionIndex: number, value: string) => {
    if (submitted[questionIndex]) return;
    setAnswers(prev => ({ ...prev, [questionIndex]: value }));
  };

  const handleSubmitQuestion = (questionIndex: number) => {
    setSubmitted(prev => ({ ...prev, [questionIndex]: true }));
  };

  const isCorrect = (questionIndex: number): boolean | null => {
    if (!submitted[questionIndex]) return null;
    const question = questions[questionIndex];
    const answer = answers[questionIndex];
    
    if ((question.type === 'mcq' || question.type === 'multiple-choice') && question.correctAnswer !== undefined) {
      return answer === question.correctAnswer;
    }
    return null;
  };

  const getScore = () => {
    let correct = 0;
    let total = 0;
    questions.forEach((q, i) => {
      if (submitted[i] && (q.type === 'mcq' || q.type === 'multiple-choice')) {
        total++;
        if (isCorrect(i)) correct++;
      }
    });
    return { correct, total };
  };

  const handleRetry = () => {
    setAnswers({});
    setSubmitted({});
    setShowAllAnswers(false);
  };

  const allMCQSubmitted = questions.every((q, i) => 
    (q.type !== 'mcq' && q.type !== 'multiple-choice') || submitted[i]
  );

  const score = getScore();

  return (
    <Card className={cn("mb-6 border-amber-200", className)} id="mini-practice">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-amber-700">
          <AlertTriangle className="h-5 w-5" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
      {questions.map((question, index) => {
        const questionSubmitted = submitted[index];
        const correct = isCorrect(index);
        
        return (
          <div 
            key={index} 
            className={cn(
              "border rounded-lg p-4 transition-colors",
              questionSubmitted && correct === true && "border-green-300 bg-green-50",
              questionSubmitted && correct === false && "border-red-300 bg-red-50",
              !questionSubmitted && "border-gray-200"
            )}
          >
            <p className="font-medium mb-3">
              {index + 1}. {question.question}
            </p>
            
            {(question.type === 'mcq' || question.type === 'multiple-choice') && question.options && (
              <div className="space-y-2 ml-4">
                {question.options.map((option, optIndex) => {
                  const isSelected = answers[index] === optIndex;
                  const isCorrectOption = question.correctAnswer === optIndex;
                  
                  return (
                    <button
                      key={optIndex}
                      onClick={() => handleSelectOption(index, optIndex)}
                      disabled={questionSubmitted}
                      className={cn(
                        "w-full text-left px-4 py-2 rounded-lg border transition-colors flex items-center gap-2",
                        !questionSubmitted && isSelected && "border-indigo-500 bg-indigo-50",
                        !questionSubmitted && !isSelected && "border-gray-200 hover:border-gray-300 hover:bg-gray-50",
                        questionSubmitted && isCorrectOption && "border-green-500 bg-green-100",
                        questionSubmitted && isSelected && !isCorrectOption && "border-red-500 bg-red-100",
                        questionSubmitted && "cursor-default"
                      )}
                    >
                      <span className={cn(
                        "w-6 h-6 rounded-full border-2 flex items-center justify-center text-sm font-medium",
                        !questionSubmitted && isSelected && "border-indigo-500 bg-indigo-500 text-white",
                        !questionSubmitted && !isSelected && "border-gray-300",
                        questionSubmitted && isCorrectOption && "border-green-500 bg-green-500 text-white",
                        questionSubmitted && isSelected && !isCorrectOption && "border-red-500 bg-red-500 text-white"
                      )}>
                        {String.fromCharCode(65 + optIndex)}
                      </span>
                      <span>{option}</span>
                      {questionSubmitted && isCorrectOption && (
                        <CheckCircle className="h-5 w-5 text-green-500 ml-auto" />
                      )}
                      {questionSubmitted && isSelected && !isCorrectOption && (
                        <XCircle className="h-5 w-5 text-red-500 ml-auto" />
                      )}
                    </button>
                  );
                })}
                
                {!questionSubmitted && answers[index] !== undefined && (
                  <Button 
                    onClick={() => handleSubmitQuestion(index)}
                    size="sm"
                    className="mt-2"
                  >
                    Check Answer
                  </Button>
                )}
                
                {questionSubmitted && (
                  <div className={cn(
                    "mt-3 p-3 rounded-lg text-sm",
                    correct ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                  )}>
                    {correct ? (
                      <span className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4" />
                        Correct! Well done.
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <XCircle className="h-4 w-4" />
                        Incorrect. The correct answer is {String.fromCharCode(65 + (typeof question.correctAnswer === 'number' ? question.correctAnswer : 0))}.
                      </span>
                    )}
                  </div>
                )}
              </div>
            )}
            
            {question.type === 'fill-blank' && (
              <div className="ml-4">
                <input
                  type="text"
                  value={(answers[index] as string) || ''}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                  placeholder="Type your answer..."
                  disabled={questionSubmitted}
                  className="w-full max-w-md px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <p className="text-gray-500 text-sm mt-1">(Fill in the blank)</p>
                {(showAllAnswers || questionSubmitted) && (
                  <p className="mt-2 text-green-700 text-sm">
                    <strong>Answer:</strong> {answerKey[index]}
                  </p>
                )}
              </div>
            )}
            
            {question.type === 'rewrite' && (
              <div className="ml-4">
                <textarea
                  value={(answers[index] as string) || ''}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                  placeholder="Rewrite the sentence..."
                  disabled={questionSubmitted}
                  rows={2}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                />
                <p className="text-gray-500 text-sm mt-1">(Rewrite the sentence)</p>
                {(showAllAnswers || questionSubmitted) && (
                  <p className="mt-2 text-green-700 text-sm">
                    <strong>Sample Answer:</strong> {answerKey[index]}
                  </p>
                )}
              </div>
            )}
          </div>
        );
      })}

      {allMCQSubmitted && score.total > 0 && (
        <Card className="border-indigo-200 bg-indigo-50">
          <CardContent className="py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Trophy className={cn(
                  "h-8 w-8",
                  score.correct === score.total ? "text-yellow-500" : "text-indigo-500"
                )} />
                <div>
                  <p className="font-semibold text-indigo-900">
                    Score: {score.correct}/{score.total}
                  </p>
                  <p className="text-sm text-indigo-700">
                    {score.correct === score.total 
                      ? "Perfect! Excellent work!" 
                      : score.correct >= score.total / 2 
                        ? "Good job! Keep practicing." 
                        : "Keep studying and try again!"}
                  </p>
                </div>
              </div>
              <Button variant="outline" onClick={handleRetry} className="gap-2">
                <RotateCcw className="h-4 w-4" />
                Try Again
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {!showAllAnswers && (
        <Button 
          variant="outline" 
          onClick={() => setShowAllAnswers(true)}
          className="w-full"
        >
          Show All Answers
        </Button>
      )}
      </CardContent>
    </Card>
  );
}
