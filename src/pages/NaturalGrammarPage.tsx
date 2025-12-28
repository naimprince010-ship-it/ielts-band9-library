import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  Volume2, 
  VolumeX,
  Play,
  Pause,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  RefreshCw,
  Lightbulb,
  Eye,
  Sparkles,
  MessageCircle,
  Target,
  Award
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { 
  NaturalLesson, 
  StoryContext, 
  Annotation,
  ANNOTATION_COLORS,
  AnnotationKind,
  NaturalFeedback
} from '@/types';

// Sample Natural Approach Lesson Data
const SAMPLE_NATURAL_LESSONS: NaturalLesson[] = [
  {
    id: 'natural-past-tense',
    title: 'Past Tense Through Stories',
    slug: 'past-tense-stories',
    description: 'Learn past tense naturally by reading and listening to stories about everyday experiences.',
    level: 'beginner',
    topic: 'Past Simple Tense',
    targetPattern: 'Regular and irregular past tense verbs',
    is_premium: false,
    estimated_time: 15,
    contexts: [
      {
        id: 'story-1',
        title: 'A Day at the Beach',
        text: 'Last weekend, Sarah went to the beach with her family. They arrived early in the morning and found a perfect spot near the water. The children played in the sand while their parents watched them. Sarah built a beautiful sandcastle and decorated it with shells she collected. After lunch, they swam in the ocean and had a wonderful time. When the sun started to set, they packed their things and drove home. Everyone felt tired but happy.',
        annotations: [
          { start: 22, end: 26, kind: 'verb', label: 'past tense (go)', targetId: 'went-1', tooltip: 'went = past tense of "go"' },
          { start: 68, end: 75, kind: 'verb', label: 'past tense (arrive)', targetId: 'arrived-1', tooltip: 'arrived = past tense of "arrive"' },
          { start: 103, end: 108, kind: 'verb', label: 'past tense (find)', targetId: 'found-1', tooltip: 'found = past tense of "find"' },
          { start: 147, end: 153, kind: 'verb', label: 'past tense (play)', targetId: 'played-1', tooltip: 'played = past tense of "play"' },
          { start: 186, end: 193, kind: 'verb', label: 'past tense (watch)', targetId: 'watched-1', tooltip: 'watched = past tense of "watch"' },
          { start: 207, end: 212, kind: 'verb', label: 'past tense (build)', targetId: 'built-1', tooltip: 'built = past tense of "build"' },
          { start: 244, end: 253, kind: 'verb', label: 'past tense (decorate)', targetId: 'decorated-1', tooltip: 'decorated = past tense of "decorate"' },
          { start: 278, end: 287, kind: 'verb', label: 'past tense (collect)', targetId: 'collected-1', tooltip: 'collected = past tense of "collect"' },
          { start: 307, end: 311, kind: 'verb', label: 'past tense (swim)', targetId: 'swam-1', tooltip: 'swam = past tense of "swim"' },
          { start: 331, end: 334, kind: 'verb', label: 'past tense (have)', targetId: 'had-1', tooltip: 'had = past tense of "have"' },
          { start: 369, end: 376, kind: 'verb', label: 'past tense (start)', targetId: 'started-1', tooltip: 'started = past tense of "start"' },
          { start: 393, end: 399, kind: 'verb', label: 'past tense (pack)', targetId: 'packed-1', tooltip: 'packed = past tense of "pack"' },
          { start: 421, end: 426, kind: 'verb', label: 'past tense (drive)', targetId: 'drove-1', tooltip: 'drove = past tense of "drive"' },
          { start: 447, end: 451, kind: 'verb', label: 'past tense (feel)', targetId: 'felt-1', tooltip: 'felt = past tense of "feel"' },
          { start: 0, end: 12, kind: 'chunk', label: 'time expression', targetId: 'last-weekend', tooltip: 'Time expressions often signal past tense' }
        ],
        audioUrl: undefined
      },
      {
        id: 'story-2',
        title: 'The Job Interview',
        text: 'Yesterday, Tom had an important job interview. He woke up early and prepared carefully. He put on his best suit and checked his appearance in the mirror. Tom arrived at the office fifteen minutes early. The interviewer asked him many questions about his experience. Tom answered confidently and gave good examples. After the interview, he felt relieved and hopeful. The company called him the next day with good news!',
        annotations: [
          { start: 0, end: 9, kind: 'chunk', label: 'time expression', targetId: 'yesterday', tooltip: 'Yesterday signals past tense' },
          { start: 15, end: 18, kind: 'verb', label: 'past tense (have)', targetId: 'had-2', tooltip: 'had = past tense of "have"' },
          { start: 52, end: 56, kind: 'verb', label: 'past tense (wake)', targetId: 'woke-1', tooltip: 'woke = past tense of "wake"' },
          { start: 71, end: 79, kind: 'verb', label: 'past tense (prepare)', targetId: 'prepared-1', tooltip: 'prepared = past tense of "prepare"' },
          { start: 95, end: 98, kind: 'verb', label: 'past tense (put)', targetId: 'put-1', tooltip: 'put = past tense of "put" (same form!)' },
          { start: 120, end: 127, kind: 'verb', label: 'past tense (check)', targetId: 'checked-1', tooltip: 'checked = past tense of "check"' },
          { start: 161, end: 168, kind: 'verb', label: 'past tense (arrive)', targetId: 'arrived-2', tooltip: 'arrived = past tense of "arrive"' },
          { start: 217, end: 222, kind: 'verb', label: 'past tense (ask)', targetId: 'asked-1', tooltip: 'asked = past tense of "ask"' },
          { start: 272, end: 280, kind: 'verb', label: 'past tense (answer)', targetId: 'answered-1', tooltip: 'answered = past tense of "answer"' },
          { start: 299, end: 303, kind: 'verb', label: 'past tense (give)', targetId: 'gave-1', tooltip: 'gave = past tense of "give"' },
          { start: 341, end: 345, kind: 'verb', label: 'past tense (feel)', targetId: 'felt-2', tooltip: 'felt = past tense of "feel"' },
          { start: 381, end: 387, kind: 'verb', label: 'past tense (call)', targetId: 'called-1', tooltip: 'called = past tense of "call"' }
        ],
        audioUrl: undefined
      }
    ],
    exercises: [
      {
        id: 'ex-1',
        type: 'pattern-recognition',
        contextId: 'story-1',
        prompt: 'Look at the story above. Find the word that tells us Sarah traveled to the beach.',
        interaction: 'select-highlight',
        correctTargets: ['went-1'],
        hint: 'Look for a word that means "traveled" or "moved to a place"',
        successMessage: 'Great job! "Went" is the past tense of "go".'
      },
      {
        id: 'ex-2',
        type: 'pattern-recognition',
        contextId: 'story-1',
        prompt: 'Which words in the story end with "-ed"? These are regular past tense verbs.',
        interaction: 'select-highlight',
        correctTargets: ['arrived-1', 'played-1', 'watched-1', 'decorated-1', 'collected-1', 'started-1', 'packed-1'],
        hint: 'Regular past tense verbs add "-ed" to the base form',
        successMessage: 'Excellent! You found the regular past tense verbs!'
      },
      {
        id: 'ex-3',
        type: 'fill-blank',
        contextId: 'story-1',
        prompt: 'Complete: Yesterday, I _____ to the park. (go)',
        interaction: 'short-answer',
        correctAnswer: 'went',
        acceptedAnswers: ['went'],
        recastExamples: [
          { commonWrong: 'goed', recast: 'Almost! Native speakers say: "I went to the park." The past tense of "go" is "went" - it\'s irregular!' },
          { commonWrong: 'go', recast: 'Good try! But we need the past tense here. Native speakers say: "I went" for past actions.' },
          { commonWrong: 'gone', recast: 'Close! "Gone" is the past participle. For simple past, we say: "I went to the park."' }
        ],
        hint: 'Think about how Sarah traveled in the story...',
        successMessage: 'Perfect! "Went" is the correct past tense of "go".'
      },
      {
        id: 'ex-4',
        type: 'fill-blank',
        contextId: 'story-1',
        prompt: 'Complete: The children _____ in the sand all afternoon. (play)',
        interaction: 'short-answer',
        correctAnswer: 'played',
        acceptedAnswers: ['played'],
        recastExamples: [
          { commonWrong: 'plaied', recast: 'Almost there! For verbs ending in consonant + y, we change y to i and add -ed: "played"' },
          { commonWrong: 'play', recast: 'Good try! We need the past tense. Just add "-ed": "played"' },
          { commonWrong: 'plaid', recast: 'Close! The correct spelling is "played" (play + ed)' }
        ],
        hint: 'This is a regular verb - just add "-ed"',
        successMessage: 'Correct! "Played" follows the regular pattern.'
      },
      {
        id: 'ex-5',
        type: 'mcq',
        contextId: 'story-2',
        prompt: 'In the job interview story, which verb is the same in present and past tense?',
        interaction: 'mcq',
        options: ['woke', 'put', 'felt', 'gave'],
        correctAnswer: 'put',
        hint: 'Look for a verb that doesn\'t change its form',
        successMessage: 'Right! "Put" stays the same: I put (today), I put (yesterday).'
      },
      {
        id: 'ex-6',
        type: 'recast-practice',
        contextId: 'story-2',
        prompt: 'Rewrite this sentence correctly: "Yesterday, Tom waked up early."',
        interaction: 'short-answer',
        correctAnswer: 'Yesterday, Tom woke up early.',
        acceptedAnswers: ['Yesterday, Tom woke up early.', 'Yesterday Tom woke up early', 'Tom woke up early yesterday'],
        chunks: ['woke up'],
        recastExamples: [
          { commonWrong: 'waked', recast: 'Almost! "Wake" is irregular. Native speakers say: "Tom woke up early."' },
          { commonWrong: 'woken', recast: 'Close! "Woken" is the past participle. For simple past: "Tom woke up early."' }
        ],
        successMessage: 'Excellent! "Woke up" is the correct past tense chunk.'
      }
    ],
    chunks: ['woke up', 'put on', 'arrived at', 'went to'],
    quickRecap: 'You learned past tense naturally! Regular verbs add "-ed" (played, watched). Irregular verbs change form (go→went, swim→swam, feel→felt). Time expressions like "yesterday" and "last weekend" signal past tense.'
  }
];

// Component to render text with highlighted annotations
const HighlightedText: React.FC<{
  context: StoryContext;
  selectedTargets: string[];
  onAnnotationClick: (targetId: string) => void;
  showAllHighlights: boolean;
}> = ({ context, selectedTargets, onAnnotationClick, showAllHighlights }) => {
  const { text, annotations } = context;
  
  // Sort annotations by start position
  const sortedAnnotations = [...annotations].sort((a, b) => a.start - b.start);
  
  // Build segments with highlights
  const segments: { text: string; annotation?: Annotation }[] = [];
  let lastEnd = 0;
  
  for (const ann of sortedAnnotations) {
    // Add text before this annotation
    if (ann.start > lastEnd) {
      segments.push({ text: text.slice(lastEnd, ann.start) });
    }
    // Add the annotated text
    segments.push({ text: text.slice(ann.start, ann.end), annotation: ann });
    lastEnd = ann.end;
  }
  // Add remaining text
  if (lastEnd < text.length) {
    segments.push({ text: text.slice(lastEnd) });
  }
  
  return (
    <p className="text-lg leading-relaxed">
      {segments.map((segment, idx) => {
        if (!segment.annotation) {
          return <span key={idx}>{segment.text}</span>;
        }
        
        const ann = segment.annotation;
        const colors = ANNOTATION_COLORS[ann.kind as AnnotationKind] || ANNOTATION_COLORS.pattern;
        const isSelected = selectedTargets.includes(ann.targetId);
        const shouldHighlight = showAllHighlights || isSelected;
        
        return (
          <span
            key={idx}
            onClick={() => onAnnotationClick(ann.targetId)}
            className={`
              cursor-pointer rounded px-1 py-0.5 transition-all duration-200
              ${shouldHighlight ? `${colors.bg} ${colors.text} border ${colors.border}` : 'hover:bg-gray-100'}
              ${isSelected ? 'ring-2 ring-offset-1 ring-indigo-500 font-semibold' : ''}
            `}
            title={ann.tooltip || ann.label}
          >
            {segment.text}
          </span>
        );
      })}
    </p>
  );
};

// Audio Player Component
const AudioPlayer: React.FC<{ audioUrl?: string; title: string }> = ({ audioUrl, title }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    
    const updateProgress = () => {
      setProgress((audio.currentTime / audio.duration) * 100 || 0);
    };
    
    const handleEnded = () => {
      setIsPlaying(false);
      setProgress(0);
    };
    
    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('ended', handleEnded);
    
    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);
  
  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };
  
  if (!audioUrl) {
    return (
      <div className="flex items-center gap-2 text-gray-400 text-sm">
        <VolumeX className="h-4 w-4" />
        <span>Audio coming soon</span>
      </div>
    );
  }
  
  return (
    <div className="flex items-center gap-3 bg-indigo-50 rounded-lg p-3">
      <audio ref={audioRef} src={audioUrl} />
      <Button
        variant="ghost"
        size="sm"
        onClick={togglePlay}
        className="h-10 w-10 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white"
      >
        {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 ml-0.5" />}
      </Button>
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <Volume2 className="h-4 w-4 text-indigo-600" />
          <span className="text-sm font-medium text-indigo-800">Listen to: {title}</span>
        </div>
        <Progress value={progress} className="h-1.5" />
      </div>
    </div>
  );
};

// Recasting Feedback Component
const RecastFeedback: React.FC<{
  feedback: NaturalFeedback;
  onAction: () => void;
}> = ({ feedback, onAction }) => {
  const getStatusStyles = () => {
    switch (feedback.status) {
      case 'correct':
        return 'bg-green-50 border-green-200 text-green-800';
      case 'recast':
        return 'bg-amber-50 border-amber-200 text-amber-800';
      case 'hint':
        return 'bg-blue-50 border-blue-200 text-blue-800';
      case 'reveal':
        return 'bg-purple-50 border-purple-200 text-purple-800';
      default:
        return 'bg-gray-50 border-gray-200 text-gray-800';
    }
  };
  
  const getIcon = () => {
    switch (feedback.status) {
      case 'correct':
        return <CheckCircle2 className="h-5 w-5 text-green-600" />;
      case 'recast':
        return <MessageCircle className="h-5 w-5 text-amber-600" />;
      case 'hint':
        return <Lightbulb className="h-5 w-5 text-blue-600" />;
      case 'reveal':
        return <Eye className="h-5 w-5 text-purple-600" />;
      default:
        return null;
    }
  };
  
  return (
    <div className={`p-4 rounded-lg border ${getStatusStyles()} animate-in fade-in duration-300`}>
      <div className="flex items-start gap-3">
        {getIcon()}
        <div className="flex-1">
          <p className="font-medium mb-1">{feedback.message}</p>
          {feedback.recast && (
            <p className="text-sm opacity-90 italic">"{feedback.recast}"</p>
          )}
          {feedback.explanation && (
            <p className="text-sm mt-2 opacity-80">{feedback.explanation}</p>
          )}
        </div>
      </div>
      <div className="mt-3 flex justify-end">
        <Button size="sm" onClick={onAction} variant={feedback.status === 'correct' ? 'default' : 'outline'}>
          {feedback.nextAction}
          <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </div>
    </div>
  );
};

// Main Natural Grammar Page Component
export default function NaturalGrammarPage() {
  const [selectedLesson, setSelectedLesson] = useState<NaturalLesson | null>(null);
  const [currentContextIndex, setCurrentContextIndex] = useState(0);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [stage, setStage] = useState<'select' | 'story' | 'exercise' | 'results'>('select');
  const [selectedTargets, setSelectedTargets] = useState<string[]>([]);
  const [userAnswer, setUserAnswer] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [feedback, setFeedback] = useState<NaturalFeedback | null>(null);
  const [showAllHighlights, setShowAllHighlights] = useState(false);
  const [score, setScore] = useState(0);
  const [completedExercises, setCompletedExercises] = useState<string[]>([]);
  
  const currentContext = selectedLesson?.contexts[currentContextIndex];
  const currentExercise = selectedLesson?.exercises[currentExerciseIndex];
  
  // Start a lesson
  const startLesson = (lesson: NaturalLesson) => {
    setSelectedLesson(lesson);
    setCurrentContextIndex(0);
    setCurrentExerciseIndex(0);
    setStage('story');
    setSelectedTargets([]);
    setUserAnswer('');
    setAttempts(0);
    setFeedback(null);
    setShowAllHighlights(false);
    setScore(0);
    setCompletedExercises([]);
  };
  
  // Handle annotation click for pattern recognition
  const handleAnnotationClick = (targetId: string) => {
    if (stage !== 'exercise' || currentExercise?.interaction !== 'select-highlight') return;
    
    setSelectedTargets(prev => {
      if (prev.includes(targetId)) {
        return prev.filter(t => t !== targetId);
      }
      return [...prev, targetId];
    });
  };
  
  // Check pattern recognition answer
  const checkPatternRecognition = () => {
    if (!currentExercise?.correctTargets) return;
    
    const correct = currentExercise.correctTargets;
    const selected = selectedTargets;
    
    // Check if all correct targets are selected and no extras
    const allCorrect = correct.every(t => selected.includes(t));
    const noExtras = selected.every(t => correct.includes(t));
    
    if (allCorrect && noExtras) {
      setFeedback({
        status: 'correct',
        message: currentExercise.successMessage || 'Excellent! You found the right patterns!',
        nextAction: 'Continue'
      });
      setScore(score + 1);
      setCompletedExercises([...completedExercises, currentExercise.id]);
    } else if (selected.length === 0) {
      setFeedback({
        status: 'hint',
        message: 'Click on the highlighted words in the story that match the question.',
        explanation: currentExercise.hint,
        nextAction: 'Try Again'
      });
    } else {
      setAttempts(attempts + 1);
      if (attempts >= 2) {
        setFeedback({
          status: 'reveal',
          message: 'Let me show you the correct answers.',
          explanation: `The correct patterns are highlighted in the story.`,
          nextAction: 'Continue'
        });
        setSelectedTargets(correct);
        setShowAllHighlights(true);
      } else {
        setFeedback({
          status: 'recast',
          message: 'Not quite! Look more carefully at the story.',
          explanation: currentExercise.hint,
          nextAction: 'Try Again'
        });
      }
    }
  };
  
  // Check fill-blank or short-answer
  const checkAnswer = () => {
    if (!currentExercise) return;
    
    const normalizedAnswer = userAnswer.toLowerCase().trim();
    const correctAnswer = currentExercise.correctAnswer?.toLowerCase().trim();
    const acceptedAnswers = currentExercise.acceptedAnswers?.map(a => a.toLowerCase().trim()) || [];
    
    // Check for exact match or accepted answers
    const isCorrect = normalizedAnswer === correctAnswer || acceptedAnswers.includes(normalizedAnswer);
    
    if (isCorrect) {
      setFeedback({
        status: 'correct',
        message: currentExercise.successMessage || 'Perfect! That\'s exactly right!',
        nextAction: 'Continue'
      });
      setScore(score + 1);
      setCompletedExercises([...completedExercises, currentExercise.id]);
    } else {
      setAttempts(attempts + 1);
      
      // Check for recast examples
      const recastMatch = currentExercise.recastExamples?.find(
        r => r.commonWrong.toLowerCase() === normalizedAnswer
      );
      
      if (recastMatch) {
        setFeedback({
          status: 'recast',
          message: recastMatch.recast,
          explanation: recastMatch.explanation,
          nextAction: 'Try Again'
        });
      } else if (attempts >= 2) {
        setFeedback({
          status: 'reveal',
          message: 'Here\'s how native speakers say it:',
          recast: currentExercise.correctAnswer,
          nextAction: 'Continue'
        });
        setCompletedExercises([...completedExercises, currentExercise.id]);
      } else {
        setFeedback({
          status: 'recast',
          message: 'Almost there! Let me help you.',
          explanation: currentExercise.hint,
          nextAction: 'Try Again'
        });
      }
    }
  };
  
  // Check MCQ answer
  const checkMCQ = (selectedOption: string) => {
    if (!currentExercise) return;
    
    const isCorrect = selectedOption === currentExercise.correctAnswer;
    
    if (isCorrect) {
      setFeedback({
        status: 'correct',
        message: currentExercise.successMessage || 'Correct! Well done!',
        nextAction: 'Continue'
      });
      setScore(score + 1);
      setCompletedExercises([...completedExercises, currentExercise.id]);
    } else {
      setAttempts(attempts + 1);
      if (attempts >= 1) {
        setFeedback({
          status: 'reveal',
          message: `The correct answer is: ${currentExercise.correctAnswer}`,
          explanation: currentExercise.hint,
          nextAction: 'Continue'
        });
        setCompletedExercises([...completedExercises, currentExercise.id]);
      } else {
        setFeedback({
          status: 'recast',
          message: 'Not quite! Think about what you learned from the story.',
          explanation: currentExercise.hint,
          nextAction: 'Try Again'
        });
      }
    }
  };
  
  // Handle feedback action (continue or try again)
  const handleFeedbackAction = () => {
    if (feedback?.status === 'correct' || feedback?.status === 'reveal') {
      nextExercise();
    } else {
      setFeedback(null);
      if (feedback?.status !== 'hint') {
        setUserAnswer('');
      }
    }
  };
  
  // Move to next exercise
  const nextExercise = () => {
    setFeedback(null);
    setUserAnswer('');
    setSelectedTargets([]);
    setAttempts(0);
    setShowAllHighlights(false);
    
    // Find next exercise for current context
    const currentContextExercises = selectedLesson?.exercises.filter(
      ex => ex.contextId === currentContext?.id
    ) || [];
    const currentIndexInContext = currentContextExercises.findIndex(
      ex => ex.id === currentExercise?.id
    );
    
    if (currentIndexInContext < currentContextExercises.length - 1) {
      // More exercises for this context
      const nextEx = currentContextExercises[currentIndexInContext + 1];
      const globalIndex = selectedLesson?.exercises.findIndex(ex => ex.id === nextEx.id) || 0;
      setCurrentExerciseIndex(globalIndex);
    } else if (currentContextIndex < (selectedLesson?.contexts.length || 1) - 1) {
      // Move to next context
      setCurrentContextIndex(currentContextIndex + 1);
      const nextContextId = selectedLesson?.contexts[currentContextIndex + 1]?.id;
      const nextContextFirstEx = selectedLesson?.exercises.find(ex => ex.contextId === nextContextId);
      if (nextContextFirstEx) {
        const globalIndex = selectedLesson?.exercises.findIndex(ex => ex.id === nextContextFirstEx.id) || 0;
        setCurrentExerciseIndex(globalIndex);
      }
      setStage('story');
    } else {
      // All done
      setStage('results');
    }
  };
  
  // Proceed from story to exercises
  const startExercises = () => {
    setStage('exercise');
    // Find first exercise for current context
    const firstExercise = selectedLesson?.exercises.find(
      ex => ex.contextId === currentContext?.id
    );
    if (firstExercise) {
      const index = selectedLesson?.exercises.findIndex(ex => ex.id === firstExercise.id) || 0;
      setCurrentExerciseIndex(index);
    }
  };
  
  // Reset to lesson selection
  const resetToSelection = () => {
    setSelectedLesson(null);
    setStage('select');
    setScore(0);
    setCompletedExercises([]);
  };
  
  // Render lesson selection
  if (stage === 'select') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
        <div className="py-12 bg-indigo-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-4">
              <Sparkles className="h-10 w-10" />
              <h1 className="text-3xl font-bold">Natural Grammar Learning</h1>
            </div>
            <p className="text-lg opacity-90 max-w-2xl">
              Learn grammar the way native speakers do - through stories, patterns, and gentle guidance. 
              No rules to memorize, just natural language acquisition!
            </p>
            <div className="mt-4 flex items-center gap-2">
              <Badge className="bg-white/20 text-white">Inductive Approach</Badge>
              <Badge className="bg-white/20 text-white">Context-First</Badge>
              <Badge className="bg-white/20 text-white">Pattern Recognition</Badge>
            </div>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">How It Works</h2>
            <div className="grid md:grid-cols-4 gap-4">
              <div className="bg-white rounded-lg p-4 border shadow-sm">
                <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center mb-3">
                  <BookOpen className="h-5 w-5 text-indigo-600" />
                </div>
                <h3 className="font-medium mb-1">1. Read & Listen</h3>
                <p className="text-sm text-gray-600">Immerse yourself in a short story with highlighted patterns.</p>
              </div>
              <div className="bg-white rounded-lg p-4 border shadow-sm">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mb-3">
                  <Target className="h-5 w-5 text-green-600" />
                </div>
                <h3 className="font-medium mb-1">2. Spot Patterns</h3>
                <p className="text-sm text-gray-600">Identify grammar patterns naturally from the context.</p>
              </div>
              <div className="bg-white rounded-lg p-4 border shadow-sm">
                <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center mb-3">
                  <MessageCircle className="h-5 w-5 text-amber-600" />
                </div>
                <h3 className="font-medium mb-1">3. Gentle Feedback</h3>
                <p className="text-sm text-gray-600">Get friendly corrections, not harsh "wrong" messages.</p>
              </div>
              <div className="bg-white rounded-lg p-4 border shadow-sm">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mb-3">
                  <Award className="h-5 w-5 text-purple-600" />
                </div>
                <h3 className="font-medium mb-1">4. Natural Mastery</h3>
                <p className="text-sm text-gray-600">Build intuition for correct grammar usage.</p>
              </div>
            </div>
          </div>
          
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Available Lessons</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SAMPLE_NATURAL_LESSONS.map(lesson => (
              <Card 
                key={lesson.id}
                className="hover:shadow-lg transition-shadow cursor-pointer group"
                onClick={() => startLesson(lesson)}
              >
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge className={
                      lesson.level === 'beginner' ? 'bg-green-100 text-green-800' :
                      lesson.level === 'intermediate' ? 'bg-blue-100 text-blue-800' :
                      'bg-purple-100 text-purple-800'
                    }>
                      {lesson.level}
                    </Badge>
                    {lesson.is_premium && (
                      <Badge variant="outline" className="text-amber-600 border-amber-300">
                        Premium
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="text-lg group-hover:text-indigo-600 transition-colors">
                    {lesson.title}
                  </CardTitle>
                  <CardDescription>{lesson.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center gap-4">
                      <span>{lesson.contexts.length} stories</span>
                      <span>{lesson.exercises.length} exercises</span>
                    </div>
                    <span className="flex items-center gap-1 text-indigo-600 group-hover:translate-x-1 transition-transform">
                      Start
                      <ChevronRight className="h-4 w-4" />
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-4">Prefer traditional grammar exercises?</p>
            <Link to="/grammar/exercises">
              <Button variant="outline">
                <BookOpen className="h-4 w-4 mr-2" />
                Traditional Exercises
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
  
  // Render story view
  if (stage === 'story' && currentContext) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="mb-6 flex items-center justify-between">
            <Button variant="ghost" onClick={resetToSelection}>
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back to Lessons
            </Button>
            <div className="flex items-center gap-2">
              <Badge variant="outline">
                Story {currentContextIndex + 1} of {selectedLesson?.contexts.length}
              </Badge>
            </div>
          </div>
          
          <Card className="mb-6">
            <CardHeader>
              <div className="flex items-center gap-2 text-indigo-600 mb-2">
                <BookOpen className="h-5 w-5" />
                <span className="text-sm font-medium">Read & Listen</span>
              </div>
              <CardTitle className="text-2xl">{currentContext.title}</CardTitle>
              <CardDescription>
                Read the story below. Notice the highlighted patterns - they'll help you understand {selectedLesson?.topic}.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <AudioPlayer audioUrl={currentContext.audioUrl} title={currentContext.title} />
              
              <div className="bg-white rounded-lg p-6 border shadow-sm">
                <HighlightedText
                  context={currentContext}
                  selectedTargets={[]}
                  onAnnotationClick={() => {}}
                  showAllHighlights={true}
                />
              </div>
              
              <div className="bg-indigo-50 rounded-lg p-4">
                <h4 className="font-medium text-indigo-800 mb-2 flex items-center gap-2">
                  <Lightbulb className="h-4 w-4" />
                  Pattern Legend
                </h4>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(ANNOTATION_COLORS).map(([kind, colors]) => (
                    <span
                      key={kind}
                      className={`px-2 py-1 rounded text-xs ${colors.bg} ${colors.text} border ${colors.border}`}
                    >
                      {kind}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button onClick={startExercises} size="lg">
                  I've Read the Story
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }
  
  // Render exercise view
  if (stage === 'exercise' && currentExercise && currentContext) {
    const progressPercent = ((completedExercises.length) / (selectedLesson?.exercises.length || 1)) * 100;
    
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <Button variant="ghost" onClick={resetToSelection}>
                <ChevronLeft className="h-4 w-4 mr-1" />
                Back to Lessons
              </Button>
              <Badge variant="outline">
                Exercise {completedExercises.length + 1} of {selectedLesson?.exercises.length}
              </Badge>
            </div>
            <Progress value={progressPercent} className="h-2" />
          </div>
          
          {/* Story Context Reference */}
          <Card className="mb-4 bg-gray-50">
            <CardContent className="pt-4">
              <div className="flex items-center gap-2 text-gray-600 mb-2">
                <BookOpen className="h-4 w-4" />
                <span className="text-sm font-medium">{currentContext.title}</span>
              </div>
              <div className="text-sm">
                <HighlightedText
                  context={currentContext}
                  selectedTargets={selectedTargets}
                  onAnnotationClick={handleAnnotationClick}
                  showAllHighlights={showAllHighlights}
                />
              </div>
            </CardContent>
          </Card>
          
          {/* Exercise Card */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2 text-indigo-600 mb-2">
                <Target className="h-5 w-5" />
                <span className="text-sm font-medium capitalize">{currentExercise.type.replace('-', ' ')}</span>
              </div>
              <CardTitle className="text-xl">{currentExercise.prompt}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Pattern Recognition - Select Highlight */}
              {currentExercise.interaction === 'select-highlight' && (
                <div className="space-y-4">
                  <p className="text-gray-600 text-sm">
                    Click on the words in the story above that match the question.
                  </p>
                  {selectedTargets.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      <span className="text-sm text-gray-500">Selected:</span>
                      {selectedTargets.map(targetId => {
                        const ann = currentContext.annotations.find(a => a.targetId === targetId);
                        return ann ? (
                          <Badge key={targetId} variant="secondary">
                            {currentContext.text.slice(ann.start, ann.end)}
                          </Badge>
                        ) : null;
                      })}
                    </div>
                  )}
                  {!feedback && (
                    <Button onClick={checkPatternRecognition} disabled={selectedTargets.length === 0}>
                      Check My Selection
                    </Button>
                  )}
                </div>
              )}
              
              {/* Short Answer / Fill Blank */}
              {currentExercise.interaction === 'short-answer' && (
                <div className="space-y-4">
                  <Input
                    value={userAnswer}
                    onChange={(e) => setUserAnswer(e.target.value)}
                    placeholder="Type your answer..."
                    disabled={feedback?.status === 'correct' || feedback?.status === 'reveal'}
                    className="text-lg"
                    onKeyDown={(e) => e.key === 'Enter' && !feedback && userAnswer && checkAnswer()}
                  />
                  {!feedback && (
                    <Button onClick={checkAnswer} disabled={!userAnswer.trim()}>
                      Check Answer
                    </Button>
                  )}
                </div>
              )}
              
              {/* MCQ */}
              {currentExercise.interaction === 'mcq' && currentExercise.options && (
                <div className="space-y-2">
                  {currentExercise.options.map((option, idx) => (
                    <button
                      key={idx}
                      onClick={() => !feedback && checkMCQ(option)}
                      disabled={!!feedback}
                      className={`w-full text-left p-3 rounded-lg border transition-all ${
                        feedback?.status === 'correct' && option === currentExercise.correctAnswer
                          ? 'border-green-500 bg-green-50'
                          : feedback?.status === 'reveal' && option === currentExercise.correctAnswer
                            ? 'border-purple-500 bg-purple-50'
                            : 'border-gray-200 hover:border-indigo-300 hover:bg-indigo-50'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
              
              {/* Feedback */}
              {feedback && (
                <RecastFeedback feedback={feedback} onAction={handleFeedbackAction} />
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }
  
  // Render results
  if (stage === 'results' && selectedLesson) {
    const percentage = Math.round((score / selectedLesson.exercises.length) * 100);
    
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-2xl mx-auto px-4">
          <Card className="text-center">
            <CardHeader>
              <div className="mx-auto w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mb-4">
                <Award className="h-10 w-10 text-white" />
              </div>
              <CardTitle className="text-2xl">Lesson Complete!</CardTitle>
              <CardDescription>{selectedLesson.title}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-5xl font-bold text-indigo-600">{percentage}%</div>
              <p className="text-gray-600">
                You got {score} out of {selectedLesson.exercises.length} correct
              </p>
              <Progress value={percentage} className="h-3" />
              
              {selectedLesson.quickRecap && (
                <div className="bg-indigo-50 rounded-lg p-4 text-left">
                  <h4 className="font-semibold text-indigo-800 mb-2 flex items-center gap-2">
                    <Sparkles className="h-4 w-4" />
                    What You Learned
                  </h4>
                  <p className="text-sm text-indigo-700">{selectedLesson.quickRecap}</p>
                </div>
              )}
              
              {selectedLesson.chunks && selectedLesson.chunks.length > 0 && (
                <div className="bg-blue-50 rounded-lg p-4 text-left">
                  <h4 className="font-semibold text-blue-800 mb-2">Key Chunks to Remember</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedLesson.chunks.map((chunk, idx) => (
                      <Badge key={idx} className="bg-blue-100 text-blue-800">
                        {chunk}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="flex gap-4 justify-center">
                <Button variant="outline" onClick={() => startLesson(selectedLesson)}>
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Try Again
                </Button>
                <Button onClick={resetToSelection}>
                  Choose Another Lesson
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }
  
  return null;
}
