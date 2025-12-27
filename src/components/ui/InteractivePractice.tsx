import { useState } from 'react';
import { cn } from '@/lib/utils';
import { CheckCircle, XCircle, RotateCcw, Trophy, AlertTriangle, Sparkles, Eye, Loader2 } from 'lucide-react';
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
  const [checkedRewrite, setCheckedRewrite] = useState<Record<number, boolean>>({});
  const [aiFeedback, setAiFeedback] = useState<Record<number, string>>({});
  const [loadingAI, setLoadingAI] = useState<Record<number, boolean>>({});

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

  // Helper function to get the correct option index for MCQ questions
  const getCorrectOptionIndex = (question: PracticeQuestion): number | null => {
    if (!question.options || question.correctAnswer === undefined) return null;
    
    // If correctAnswer is already a number, use it directly
    if (typeof question.correctAnswer === 'number') {
      return question.correctAnswer;
    }
    
    // If correctAnswer is a string, find the matching option index
    const correctAnswerStr = String(question.correctAnswer).trim().toLowerCase();
    const matchIndex = question.options.findIndex(
      opt => opt.trim().toLowerCase() === correctAnswerStr
    );
    
    return matchIndex >= 0 ? matchIndex : null;
  };

  const isCorrect = (questionIndex: number): boolean | null => {
    if (!submitted[questionIndex]) return null;
    const question = questions[questionIndex];
    const answer = answers[questionIndex];
    
    if ((question.type === 'mcq' || question.type === 'multiple-choice') && question.correctAnswer !== undefined) {
      const correctIndex = getCorrectOptionIndex(question);
      if (correctIndex === null) return null;
      return answer === correctIndex;
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
    setCheckedRewrite({});
    setAiFeedback({});
    setLoadingAI({});
  };

  const handleCheckRewrite = (questionIndex: number) => {
    setCheckedRewrite(prev => ({ ...prev, [questionIndex]: true }));
  };

  const handleGetAIFeedback = async (questionIndex: number, userAnswer: string, sampleAnswer: string, question: string) => {
    setLoadingAI(prev => ({ ...prev, [questionIndex]: true }));
    
    // Simulate AI feedback generation (in production, this would call an AI API)
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Generate feedback based on comparison
    const userLower = userAnswer.toLowerCase().trim();
    const sampleLower = sampleAnswer.toLowerCase().trim();
    
    let feedback = '';
    
    if (userLower === sampleLower) {
      feedback = "Perfect! Your answer matches the sample answer exactly. Great job!";
    } else if (userLower.length === 0) {
      feedback = "Please write your answer first before requesting feedback.";
    } else {
      // Analyze common grammar issues
      const issues: string[] = [];
      
      // Check for subject-verb agreement with "number of"
      if (question.toLowerCase().includes('number of') && userAnswer.includes('are')) {
        issues.push("Subject-verb agreement: 'The number of' takes a singular verb (is), not plural (are).");
      }
      
      // Check for article issues
      if (question.toLowerCase().includes('the education') && userAnswer.toLowerCase().includes('the education')) {
        issues.push("Article usage: General concepts like 'education' don't need 'the' article.");
      }
      
      // Check for preposition issues
      if (question.toLowerCase().includes('depends of') && userAnswer.toLowerCase().includes('depends of')) {
        issues.push("Preposition error: Use 'depends on' not 'depends of'.");
      }
      
      // Check for comma splice
      if (userAnswer.includes(', it') && !userAnswer.includes('because') && !userAnswer.includes(';')) {
        issues.push("Comma splice: Consider using a semicolon, conjunction, or separate sentences.");
      }
      
      // Check for conditional errors
      if (question.toLowerCase().includes('would have') && userAnswer.toLowerCase().includes('would have')) {
        issues.push("Conditional error: In 'if' clauses, use past simple (had), not 'would have'.");
      }
      
      if (issues.length > 0) {
        feedback = "Feedback:\n" + issues.map(i => "• " + i).join("\n") + "\n\nCompare with the sample answer above for the correct version.";
      } else {
        // Check similarity
        const userWords = new Set(userLower.split(/\s+/));
        const sampleWords = new Set(sampleLower.split(/\s+/));
        const commonWords = [...userWords].filter(w => sampleWords.has(w));
        const similarity = commonWords.length / Math.max(userWords.size, sampleWords.size);
        
        if (similarity > 0.7) {
          feedback = "Good attempt! Your answer is close to the sample. Check the sample answer above for any minor differences in grammar or word choice.";
        } else {
          feedback = "Your answer differs from the sample. Compare your response with the sample answer above and note the grammatical corrections made.";
        }
      }
    }
    
    setAiFeedback(prev => ({ ...prev, [questionIndex]: feedback }));
    setLoadingAI(prev => ({ ...prev, [questionIndex]: false }));
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
                  const isCorrectOption = getCorrectOptionIndex(question) === optIndex;
                  
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
                        Incorrect. The correct answer is {String.fromCharCode(65 + (getCorrectOptionIndex(question) ?? 0))}.
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
                    <strong>Answer:</strong> {typeof question.correctAnswer === 'string' ? question.correctAnswer : answerKey[index] || 'Answer not available'}
                  </p>
                )}
              </div>
            )}
            
            {question.type === 'rewrite' && (
              <div className="ml-4 space-y-3">
                <textarea
                  value={(answers[index] as string) || ''}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                  placeholder="Rewrite the sentence..."
                  disabled={questionSubmitted}
                  rows={2}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                />
                <p className="text-gray-500 text-sm">(Rewrite the sentence)</p>
                
                {/* Action Buttons */}
                {!showAllAnswers && !checkedRewrite[index] && (
                  <div className="flex gap-2 flex-wrap">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleCheckRewrite(index)}
                      disabled={!answers[index] || (answers[index] as string).trim().length === 0}
                      className="gap-1"
                    >
                      <Eye className="h-4 w-4" />
                      Check Answer
                    </Button>
                  </div>
                )}
                
                {/* Comparison View - Shows when checked or showAllAnswers */}
                {(showAllAnswers || checkedRewrite[index]) && (
                  <div className="space-y-3">
                    {/* User's Answer */}
                    {answers[index] && (answers[index] as string).trim().length > 0 && (
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                        <p className="text-xs font-medium text-blue-600 mb-1">Your Answer:</p>
                        <p className="text-blue-800">{answers[index] as string}</p>
                      </div>
                    )}
                    
                        {/* Sample Answer */}
                        <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                          <p className="text-xs font-medium text-green-600 mb-1">Sample Answer:</p>
                          <p className="text-green-800 font-medium">{typeof question.correctAnswer === 'string' ? question.correctAnswer : answerKey[index] || 'Sample answer not available'}</p>
                        </div>
                    
                    {/* AI Feedback Button */}
                    {!aiFeedback[index] && !loadingAI[index] && (
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => handleGetAIFeedback(
                          index, 
                          (answers[index] as string) || '', 
                          (typeof question.correctAnswer === 'string' ? question.correctAnswer : answerKey[index]) || '',
                          question.question
                        )}
                        className="gap-1 bg-purple-100 hover:bg-purple-200 text-purple-700"
                      >
                        <Sparkles className="h-4 w-4" />
                        Get AI Feedback
                      </Button>
                    )}
                    
                    {/* Loading AI */}
                    {loadingAI[index] && (
                      <div className="flex items-center gap-2 text-purple-600 text-sm">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Analyzing your answer...
                      </div>
                    )}
                    
                    {/* AI Feedback Display */}
                    {aiFeedback[index] && (
                      <div className="bg-purple-50 border border-purple-200 rounded-lg p-3">
                        <p className="text-xs font-medium text-purple-600 mb-1 flex items-center gap-1">
                          <Sparkles className="h-3 w-3" />
                          AI Feedback:
                        </p>
                        <p className="text-purple-800 text-sm whitespace-pre-line">{aiFeedback[index]}</p>
                      </div>
                    )}
                  </div>
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
