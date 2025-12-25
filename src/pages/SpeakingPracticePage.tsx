import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  Mic, 
  MicOff, 
  Play, 
  Pause, 
  RotateCcw, 
  Clock,
  MessageSquare,
  ChevronRight,
  Volume2,
  CheckCircle2,
  Flame
} from 'lucide-react';

interface SpeakingPrompt {
  id: string;
  part: 1 | 2 | 3;
  topic: string;
  question: string;
  followUps?: string[];
  thinkTime: number;
  speakTime: number;
  tips: string[];
}

const SPEAKING_PROMPTS: SpeakingPrompt[] = [
  // Part 1 - Introduction and Interview
  {
    id: 'p1-1',
    part: 1,
    topic: 'Work & Studies',
    question: 'Do you work or are you a student?',
    followUps: [
      'What do you like about your job/studies?',
      'Would you like to change your job/field of study in the future?',
      'What skills have you learned from your work/studies?'
    ],
    thinkTime: 0,
    speakTime: 30,
    tips: ['Keep answers brief (2-3 sentences)', 'Use present tense', 'Give reasons for your answers']
  },
  {
    id: 'p1-2',
    part: 1,
    topic: 'Hometown',
    question: 'Where is your hometown?',
    followUps: [
      'What do you like most about your hometown?',
      'Has your hometown changed much in recent years?',
      'Would you recommend tourists to visit your hometown?'
    ],
    thinkTime: 0,
    speakTime: 30,
    tips: ['Describe location briefly', 'Mention 1-2 key features', 'Express personal feelings']
  },
  {
    id: 'p1-3',
    part: 1,
    topic: 'Daily Routine',
    question: 'What is your typical daily routine?',
    followUps: [
      'Do you prefer mornings or evenings?',
      'Has your routine changed recently?',
      'What would you like to change about your daily routine?'
    ],
    thinkTime: 0,
    speakTime: 30,
    tips: ['Use time expressions', 'Include variety of activities', 'Show personality']
  },
  {
    id: 'p1-4',
    part: 1,
    topic: 'Technology',
    question: 'How often do you use the internet?',
    followUps: [
      'What do you mainly use the internet for?',
      'Do you think people spend too much time online?',
      'How has the internet changed your life?'
    ],
    thinkTime: 0,
    speakTime: 30,
    tips: ['Be specific about usage', 'Give examples', 'Express opinions']
  },
  // Part 2 - Long Turn (Cue Card)
  {
    id: 'p2-1',
    part: 2,
    topic: 'Describe a Person',
    question: 'Describe a person who has influenced you. You should say:\n• Who this person is\n• How you know them\n• What they have done to influence you\n• And explain why they have had such an influence on you',
    thinkTime: 60,
    speakTime: 120,
    tips: ['Use past and present tenses', 'Give specific examples', 'Show emotional connection', 'Structure your answer clearly']
  },
  {
    id: 'p2-2',
    part: 2,
    topic: 'Describe a Place',
    question: 'Describe a place you would like to visit. You should say:\n• Where it is\n• How you learned about it\n• What you would do there\n• And explain why you want to visit this place',
    thinkTime: 60,
    speakTime: 120,
    tips: ['Use descriptive language', 'Include sensory details', 'Express enthusiasm', 'Connect to personal interests']
  },
  {
    id: 'p2-3',
    part: 2,
    topic: 'Describe an Event',
    question: 'Describe a memorable event in your life. You should say:\n• What the event was\n• When and where it happened\n• Who was involved\n• And explain why it was memorable',
    thinkTime: 60,
    speakTime: 120,
    tips: ['Use narrative tenses', 'Build up the story', 'Include emotions', 'End with reflection']
  },
  // Part 3 - Discussion
  {
    id: 'p3-1',
    part: 3,
    topic: 'Education',
    question: 'How has education changed in your country over the past few decades?',
    followUps: [
      'Do you think online learning will replace traditional classrooms?',
      'What skills should schools focus on teaching?',
      'How can education be made more accessible to everyone?'
    ],
    thinkTime: 10,
    speakTime: 60,
    tips: ['Give balanced views', 'Use complex sentences', 'Support with examples', 'Show critical thinking']
  },
  {
    id: 'p3-2',
    part: 3,
    topic: 'Environment',
    question: 'What do you think are the biggest environmental challenges facing the world today?',
    followUps: [
      'Whose responsibility is it to protect the environment?',
      'How can individuals contribute to environmental protection?',
      'Do you think technology can solve environmental problems?'
    ],
    thinkTime: 10,
    speakTime: 60,
    tips: ['Discuss multiple perspectives', 'Use academic vocabulary', 'Give concrete examples', 'Propose solutions']
  },
  {
    id: 'p3-3',
    part: 3,
    topic: 'Technology & Society',
    question: 'How has technology changed the way people communicate?',
    followUps: [
      'Do you think social media has more positive or negative effects?',
      'How might communication change in the future?',
      'Should there be limits on technology use?'
    ],
    thinkTime: 10,
    speakTime: 60,
    tips: ['Compare past and present', 'Discuss advantages and disadvantages', 'Use conditional structures', 'Express nuanced opinions']
  },
];

const STORAGE_KEY = 'ielts_speaking_practice';

interface PracticeSession {
  date: string;
  promptId: string;
  duration: number;
  recordings: number;
}

function getPracticeHistory(): PracticeSession[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function savePracticeSession(session: PracticeSession): void {
  try {
    const history = getPracticeHistory();
    history.push(session);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history.slice(-100)));
  } catch (e) {
    console.error('Failed to save practice session:', e);
  }
}

export default function SpeakingPracticePage() {
  const [selectedPart, setSelectedPart] = useState<1 | 2 | 3 | null>(null);
  const [currentPrompt, setCurrentPrompt] = useState<SpeakingPrompt | null>(null);
  const [stage, setStage] = useState<'select' | 'prepare' | 'speak' | 'review'>('select');
  const [isRecording, setIsRecording] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [audioURL, setAudioURL] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentFollowUp, setCurrentFollowUp] = useState(0);
  const [practiceCount, setPracticeCount] = useState(0);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const history = getPracticeHistory();
    const today = new Date().toISOString().split('T')[0];
    const todayCount = history.filter(s => s.date === today).length;
    setPracticeCount(todayCount);
  }, []);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (audioURL) URL.revokeObjectURL(audioURL);
    };
  }, [audioURL]);

  const startTimer = (seconds: number, onComplete: () => void) => {
    setTimeLeft(seconds);
    if (timerRef.current) clearInterval(timerRef.current);
    
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          onComplete();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const selectPrompt = (prompt: SpeakingPrompt) => {
    setCurrentPrompt(prompt);
    setCurrentFollowUp(0);
    setAudioURL(null);
    
    if (prompt.thinkTime > 0) {
      setStage('prepare');
      startTimer(prompt.thinkTime, () => {
        setStage('speak');
        startTimer(prompt.speakTime, stopRecording);
        startRecording();
      });
    } else {
      setStage('speak');
      startTimer(prompt.speakTime, stopRecording);
      startRecording();
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];
      
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };
      
      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const url = URL.createObjectURL(audioBlob);
        setAudioURL(url);
        stream.getTracks().forEach(track => track.stop());
      };
      
      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error accessing microphone:', error);
      alert('Could not access microphone. Please ensure you have granted permission.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      if (timerRef.current) clearInterval(timerRef.current);
      setStage('review');
      
      if (currentPrompt) {
        savePracticeSession({
          date: new Date().toISOString().split('T')[0],
          promptId: currentPrompt.id,
          duration: currentPrompt.speakTime - timeLeft,
          recordings: 1
        });
        setPracticeCount(prev => prev + 1);
      }
    }
  };

  const togglePlayback = () => {
    if (!audioRef.current || !audioURL) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const nextFollowUp = () => {
    if (currentPrompt?.followUps && currentFollowUp < currentPrompt.followUps.length - 1) {
      setCurrentFollowUp(prev => prev + 1);
      setAudioURL(null);
      setStage('speak');
      startTimer(currentPrompt.speakTime, stopRecording);
      startRecording();
    }
  };

  const resetPractice = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (audioURL) URL.revokeObjectURL(audioURL);
    setCurrentPrompt(null);
    setStage('select');
    setAudioURL(null);
    setIsRecording(false);
    setCurrentFollowUp(0);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const filteredPrompts = selectedPart 
    ? SPEAKING_PROMPTS.filter(p => p.part === selectedPart)
    : SPEAKING_PROMPTS;

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {stage === 'select' && (
          <div className="space-y-6">
            <Card className="border-2 border-orange-100">
              <CardHeader className="text-center">
                <div className="mx-auto w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                  <Mic className="h-8 w-8 text-orange-600" />
                </div>
                <CardTitle className="text-2xl">Speaking Practice</CardTitle>
                <CardDescription>
                  Practice IELTS Speaking with recording and playback
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-center gap-4 p-4 bg-orange-50 rounded-lg">
                  <Flame className="h-6 w-6 text-orange-500" />
                  <div>
                    <p className="font-medium">{practiceCount} sessions today</p>
                    <p className="text-sm text-gray-500">Keep practicing to improve!</p>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-3">Select Part</h3>
                  <div className="grid grid-cols-4 gap-2">
                    <Button
                      variant={selectedPart === null ? 'default' : 'outline'}
                      onClick={() => setSelectedPart(null)}
                    >
                      All
                    </Button>
                    <Button
                      variant={selectedPart === 1 ? 'default' : 'outline'}
                      onClick={() => setSelectedPart(1)}
                    >
                      Part 1
                    </Button>
                    <Button
                      variant={selectedPart === 2 ? 'default' : 'outline'}
                      onClick={() => setSelectedPart(2)}
                    >
                      Part 2
                    </Button>
                    <Button
                      variant={selectedPart === 3 ? 'default' : 'outline'}
                      onClick={() => setSelectedPart(3)}
                    >
                      Part 3
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-3">
                  {filteredPrompts.map(prompt => (
                    <Card 
                      key={prompt.id}
                      className="cursor-pointer hover:border-orange-300 transition-colors"
                      onClick={() => selectPrompt(prompt)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <Badge variant={
                                prompt.part === 1 ? 'default' :
                                prompt.part === 2 ? 'secondary' : 'outline'
                              }>
                                Part {prompt.part}
                              </Badge>
                              <Badge variant="outline">{prompt.topic}</Badge>
                            </div>
                            <p className="text-sm line-clamp-2">{prompt.question.split('\n')[0]}</p>
                            <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                              {prompt.thinkTime > 0 && (
                                <span className="flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  {prompt.thinkTime}s prep
                                </span>
                              )}
                              <span className="flex items-center gap-1">
                                <Mic className="h-3 w-3" />
                                {prompt.speakTime}s speak
                              </span>
                            </div>
                          </div>
                          <ChevronRight className="h-5 w-5 text-gray-400" />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {stage === 'prepare' && currentPrompt && (
          <Card className="border-2 border-blue-100">
            <CardHeader className="text-center">
              <Badge className="mx-auto mb-4">Part {currentPrompt.part}</Badge>
              <CardTitle>Preparation Time</CardTitle>
              <CardDescription>Read the question and prepare your answer</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <div className="text-6xl font-bold text-blue-600 mb-2">
                  {formatTime(timeLeft)}
                </div>
                <Progress value={(timeLeft / currentPrompt.thinkTime) * 100} className="h-2" />
              </div>
              
              <div className="p-6 bg-blue-50 rounded-lg">
                <h3 className="font-medium mb-3">{currentPrompt.topic}</h3>
                <p className="whitespace-pre-line">{currentPrompt.question}</p>
              </div>
              
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <h4 className="font-medium text-amber-800 mb-2">Tips:</h4>
                <ul className="text-sm text-amber-700 space-y-1">
                  {currentPrompt.tips.map((tip, index) => (
                    <li key={index}>• {tip}</li>
                  ))}
                </ul>
              </div>
              
              <Button 
                onClick={() => {
                  if (timerRef.current) clearInterval(timerRef.current);
                  setStage('speak');
                  startTimer(currentPrompt.speakTime, stopRecording);
                  startRecording();
                }}
                className="w-full"
                size="lg"
              >
                <Mic className="mr-2 h-5 w-5" />
                Start Speaking Now
              </Button>
            </CardContent>
          </Card>
        )}

        {stage === 'speak' && currentPrompt && (
          <Card className="border-2 border-red-100">
            <CardHeader className="text-center">
              <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4 animate-pulse">
                <Mic className="h-8 w-8 text-red-600" />
              </div>
              <CardTitle>Recording...</CardTitle>
              <CardDescription>Speak clearly and naturally</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <div className={`text-6xl font-bold mb-2 ${timeLeft < 10 ? 'text-red-600' : 'text-gray-800'}`}>
                  {formatTime(timeLeft)}
                </div>
                <Progress 
                  value={(timeLeft / currentPrompt.speakTime) * 100} 
                  className="h-2"
                />
              </div>
              
              <div className="p-6 bg-gray-50 rounded-lg">
                <h3 className="font-medium mb-3">{currentPrompt.topic}</h3>
                {currentPrompt.followUps && currentFollowUp > 0 ? (
                  <p className="text-lg">{currentPrompt.followUps[currentFollowUp - 1]}</p>
                ) : (
                  <p className="whitespace-pre-line">{currentPrompt.question}</p>
                )}
              </div>
              
              <div className="flex gap-3">
                <Button 
                  variant="outline"
                  onClick={resetPractice}
                  className="flex-1"
                >
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Cancel
                </Button>
                <Button 
                  onClick={stopRecording}
                  className="flex-1 bg-red-600 hover:bg-red-700"
                >
                  <MicOff className="mr-2 h-4 w-4" />
                  Stop Recording
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {stage === 'review' && currentPrompt && (
          <Card className="border-2 border-green-100">
            <CardHeader className="text-center">
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <CheckCircle2 className="h-8 w-8 text-green-600" />
              </div>
              <CardTitle>Recording Complete!</CardTitle>
              <CardDescription>Listen to your answer and review</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {audioURL && (
                <div className="p-4 bg-gray-50 rounded-lg">
                  <audio 
                    ref={audioRef} 
                    src={audioURL}
                    onEnded={() => setIsPlaying(false)}
                    className="hidden"
                  />
                  <div className="flex items-center justify-center gap-4">
                    <Button
                      variant="outline"
                      size="lg"
                      onClick={togglePlayback}
                      className="w-32"
                    >
                      {isPlaying ? (
                        <>
                          <Pause className="mr-2 h-5 w-5" />
                          Pause
                        </>
                      ) : (
                        <>
                          <Play className="mr-2 h-5 w-5" />
                          Play
                        </>
                      )}
                    </Button>
                    <Volume2 className="h-5 w-5 text-gray-400" />
                  </div>
                </div>
              )}
              
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-medium mb-2">Question:</h4>
                {currentPrompt.followUps && currentFollowUp > 0 ? (
                  <p>{currentPrompt.followUps[currentFollowUp - 1]}</p>
                ) : (
                  <p className="whitespace-pre-line">{currentPrompt.question}</p>
                )}
              </div>
              
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <h4 className="font-medium text-amber-800 mb-2">Self-Assessment Checklist:</h4>
                <ul className="text-sm text-amber-700 space-y-2">
                  <li className="flex items-start gap-2">
                    <input type="checkbox" className="mt-1" />
                    <span>Did I answer all parts of the question?</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <input type="checkbox" className="mt-1" />
                    <span>Did I use a variety of vocabulary?</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <input type="checkbox" className="mt-1" />
                    <span>Did I speak fluently without long pauses?</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <input type="checkbox" className="mt-1" />
                    <span>Did I use correct grammar structures?</span>
                  </li>
                </ul>
              </div>
              
              <div className="flex gap-3">
                <Button 
                  variant="outline"
                  onClick={() => {
                    setAudioURL(null);
                    setStage('speak');
                    startTimer(currentPrompt.speakTime, stopRecording);
                    startRecording();
                  }}
                  className="flex-1"
                >
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Try Again
                </Button>
                
                {currentPrompt.followUps && currentFollowUp < currentPrompt.followUps.length ? (
                  <Button 
                    onClick={nextFollowUp}
                    className="flex-1"
                  >
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Next Follow-up
                  </Button>
                ) : (
                  <Button 
                    onClick={resetPractice}
                    className="flex-1"
                  >
                    <ChevronRight className="mr-2 h-4 w-4" />
                    New Question
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
