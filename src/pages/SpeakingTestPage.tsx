import { useState, useEffect, useCallback, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Mic,
  MicOff,
  Clock,
  Play,
  CheckCircle2,
  AlertTriangle,
  Home,
  Volume2,
  Loader2,
  Upload,
  MessageSquare
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  SpeakingTest,
  SpeakingTestSession,
  SpeakingRecording,
  SpeakingTestResult
} from '@/types';

// ============================================
// Sample Speaking Test Data
// ============================================
const SAMPLE_SPEAKING_TEST: SpeakingTest = {
  id: 'speaking-test-1',
  title: 'IELTS Speaking Test 1',
  is_premium: false,
  instructions: 'This speaking test has 3 parts. Please speak clearly into your microphone.',
  parts: [
    {
      id: 'part1',
      partNumber: 1,
      partType: 'part1',
      title: 'Part 1: Introduction & Interview',
      instructions: 'In this part, the examiner will ask you general questions about yourself and familiar topics.',
      questions: [
        {
          id: 'p1q1',
          questionNumber: 1,
          text: "Let's talk about your hometown. Where is your hometown?",
          thinkTime: 3,
          recordTime: 30
        },
        {
          id: 'p1q2',
          questionNumber: 2,
          text: "What do you like most about living there?",
          thinkTime: 3,
          recordTime: 30
        },
        {
          id: 'p1q3',
          questionNumber: 3,
          text: "Has your hometown changed much in recent years?",
          thinkTime: 3,
          recordTime: 45
        },
        {
          id: 'p1q4',
          questionNumber: 4,
          text: "Do you think you will continue to live there in the future?",
          thinkTime: 3,
          recordTime: 45
        }
      ]
    },
    {
      id: 'part2',
      partNumber: 2,
      partType: 'part2',
      title: 'Part 2: Individual Long Turn',
      instructions: 'You will be given a topic card. You have 1 minute to prepare, then speak for 1-2 minutes.',
      cueCard: {
        id: 'p2cue',
        topic: 'Describe a skill you would like to learn',
        bulletPoints: [
          'What the skill is',
          'Why you want to learn it',
          'How you would learn it',
          'And explain how this skill would benefit you'
        ],
        prepTime: 60,
        recordTime: 120
      }
    },
    {
      id: 'part3',
      partNumber: 3,
      partType: 'part3',
      title: 'Part 3: Two-way Discussion',
      instructions: 'The examiner will ask you more abstract questions related to the Part 2 topic.',
      questions: [
        {
          id: 'p3q1',
          questionNumber: 1,
          text: "What skills do you think are most important for young people to learn today?",
          thinkTime: 5,
          recordTime: 60
        },
        {
          id: 'p3q2',
          questionNumber: 2,
          text: "How has technology changed the way people learn new skills?",
          thinkTime: 5,
          recordTime: 60
        },
        {
          id: 'p3q3',
          questionNumber: 3,
          text: "Do you think traditional skills are still valuable in modern society?",
          thinkTime: 5,
          recordTime: 60
        }
      ]
    }
  ]
};

// ============================================
// Helper Functions
// ============================================
const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

// Simulated upload function (replace with actual API call)
const uploadRecording = async (_blob: Blob, questionId: string): Promise<string> => {
  // Simulate upload delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  // In production, this would upload to your server/cloud storage
  // For now, return a mock URL
  return `https://storage.example.com/recordings/${questionId}-${Date.now()}.webm`;
};

// ============================================
// Main Component
// ============================================
export default function SpeakingTestPage() {
  const location = useLocation();
  const stateData = location.state as { testData?: SpeakingTest; testId?: string; testTitle?: string } | null;
  const hasValidData = stateData?.testData && Array.isArray(stateData.testData.parts) && stateData.testData.parts.length > 0;
  const [test] = useState<SpeakingTest>(hasValidData ? (stateData!.testData as SpeakingTest) : SAMPLE_SPEAKING_TEST);
  const [phase, setPhase] = useState<SpeakingTestSession['phase']>('system-check');
  const [currentPartIndex, setCurrentPartIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [recordings, setRecordings] = useState<SpeakingRecording[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [result, setResult] = useState<SpeakingTestResult | null>(null);
  const [startedAt] = useState<number>(Date.now());

  // Microphone state
  const [hasMicPermission, setHasMicPermission] = useState<boolean | null>(null);
  const [micStream, setMicStream] = useState<MediaStream | null>(null);
  const [volumeLevel, setVolumeLevel] = useState(0);
  const [isRecording, setIsRecording] = useState(false);

  // MediaRecorder refs
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  const currentPart = test.parts[currentPartIndex];
  const currentQuestion = currentPart.questions?.[currentQuestionIndex];
  const currentCueCard = currentPart.cueCard;

  // ============================================
  // Request Microphone Permission
  // ============================================
  const requestMicPermission = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setMicStream(stream);
      setHasMicPermission(true);

      // Setup audio analyser for volume meter
      const audioContext = new AudioContext();
      const source = audioContext.createMediaStreamSource(stream);
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 256;
      source.connect(analyser);
      analyserRef.current = analyser;

      // Start volume monitoring
      const updateVolume = () => {
        if (analyserRef.current) {
          const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
          analyserRef.current.getByteFrequencyData(dataArray);
          const average = dataArray.reduce((a, b) => a + b) / dataArray.length;
          setVolumeLevel(Math.min(100, average * 1.5));
        }
        animationFrameRef.current = requestAnimationFrame(updateVolume);
      };
      updateVolume();

    } catch (error) {
      console.error('Microphone permission denied:', error);
      setHasMicPermission(false);
    }
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (micStream) {
        micStream.getTracks().forEach(track => track.stop());
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [micStream]);

  // ============================================
  // Start Recording
  // ============================================
  const startRecording = useCallback(() => {
    if (!micStream) return;

    audioChunksRef.current = [];
    const mediaRecorder = new MediaRecorder(micStream, {
      mimeType: 'audio/webm;codecs=opus'
    });

    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        audioChunksRef.current.push(event.data);
      }
    };

    mediaRecorder.onstop = async () => {
      const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
      const audioUrl = URL.createObjectURL(audioBlob);

      // Get current question ID
      const questionId = currentPart.partNumber === 2
        ? currentCueCard?.id || 'unknown'
        : currentQuestion?.id || 'unknown';

      // Create recording entry
      const newRecording: SpeakingRecording = {
        questionId,
        partNumber: currentPart.partNumber,
        audioBlob,
        audioUrl,
        duration: currentPart.partNumber === 2
          ? (currentCueCard?.recordTime || 120) - timeRemaining
          : (currentQuestion?.recordTime || 30) - timeRemaining,
        uploadStatus: 'uploading'
      };

      setRecordings(prev => [...prev, newRecording]);

      // Auto-upload
      try {
        const uploadedUrl = await uploadRecording(audioBlob, questionId);
        setRecordings(prev => prev.map(r =>
          r.questionId === questionId
            ? { ...r, uploadStatus: 'uploaded', uploadedUrl }
            : r
        ));
      } catch (error) {
        console.error('Upload failed:', error);
        setRecordings(prev => prev.map(r =>
          r.questionId === questionId
            ? { ...r, uploadStatus: 'failed' }
            : r
        ));
      }
    };

    mediaRecorderRef.current = mediaRecorder;
    mediaRecorder.start(1000); // Collect data every second
    setIsRecording(true);
  }, [micStream, currentPart, currentQuestion, currentCueCard, timeRemaining]);

  // ============================================
  // Stop Recording
  // ============================================
  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  }, []);

  // ============================================
  // Timer Logic
  // ============================================
  useEffect(() => {
    if (phase !== 'think' && phase !== 'prep' && phase !== 'recording') return;
    if (timeRemaining <= 0) return;

    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          clearInterval(timer);

          // Handle phase transitions
          if (phase === 'think') {
            // After think time, start recording
            setPhase('recording');
            const recordTime = currentPart.partNumber === 2
              ? currentCueCard?.recordTime || 120
              : currentQuestion?.recordTime || 30;
            setTimeRemaining(recordTime);
            startRecording();
          } else if (phase === 'prep') {
            // After prep time (Part 2), start recording
            setPhase('recording');
            setTimeRemaining(currentCueCard?.recordTime || 120);
            startRecording();
          } else if (phase === 'recording') {
            // After recording, move to next question or part
            stopRecording();
            moveToNext();
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [phase, timeRemaining, currentPart, currentQuestion, currentCueCard, startRecording, stopRecording]);

  // ============================================
  // Move to Next Question/Part
  // ============================================
  const moveToNext = useCallback(() => {
    const currentPartData = test.parts[currentPartIndex];

    if (currentPartData.partNumber === 2) {
      // Part 2 only has one cue card, move to Part 3
      if (currentPartIndex < 2) {
        setCurrentPartIndex(prev => prev + 1);
        setCurrentQuestionIndex(0);
        setPhase('instructions');
      } else {
        // Test complete
        handleSubmit();
      }
    } else {
      // Part 1 or Part 3 - check if more questions
      const questions = currentPartData.questions || [];
      if (currentQuestionIndex < questions.length - 1) {
        // More questions in this part
        setCurrentQuestionIndex(prev => prev + 1);
        setPhase('between');
        setTimeout(() => {
          setPhase('think');
          setTimeRemaining(questions[currentQuestionIndex + 1]?.thinkTime || 3);
        }, 1500);
      } else if (currentPartIndex < 2) {
        // Move to next part
        setCurrentPartIndex(prev => prev + 1);
        setCurrentQuestionIndex(0);
        setPhase('instructions');
      } else {
        // Test complete
        handleSubmit();
      }
    }
  }, [currentPartIndex, currentQuestionIndex, test.parts]);

  // ============================================
  // Start Part
  // ============================================
  const startPart = useCallback(() => {
    const part = test.parts[currentPartIndex];

    if (part.partNumber === 2) {
      // Part 2: Start with prep time
      setPhase('prep');
      setTimeRemaining(part.cueCard?.prepTime || 60);
    } else {
      // Part 1 or 3: Start with think time
      setPhase('think');
      setTimeRemaining(part.questions?.[0]?.thinkTime || 3);
    }
  }, [currentPartIndex, test.parts]);

  // ============================================
  // Submit Test
  // ============================================
  const handleSubmit = useCallback(() => {
    const timeTaken = Math.floor((Date.now() - startedAt) / 1000);

    const testResult: SpeakingTestResult = {
      testId: test.id,
      timeTaken,
      recordings: recordings.map(r => ({
        partNumber: r.partNumber,
        questionId: r.questionId,
        duration: r.duration,
        uploadedUrl: r.uploadedUrl
      }))
    };

    setResult(testResult);
    setIsSubmitted(true);
    setPhase('completed');

    // Stop mic stream
    if (micStream) {
      micStream.getTracks().forEach(track => track.stop());
    }
  }, [test.id, startedAt, recordings, micStream]);

  // ============================================
  // System Check Screen
  // ============================================
  if (phase === 'system-check') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-lg">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mic className="h-8 w-8 text-indigo-600" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">System Check</h1>
              <p className="text-gray-600">
                Before we begin, let's make sure your microphone is working properly.
              </p>
            </div>

            {hasMicPermission === null && (
              <div className="space-y-4">
                <Button
                  onClick={requestMicPermission}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 gap-2"
                  size="lg"
                >
                  <Mic className="h-5 w-5" />
                  Allow Microphone Access
                </Button>
                <p className="text-sm text-gray-500 text-center">
                  Click the button above and allow microphone access when prompted.
                </p>
              </div>
            )}

            {hasMicPermission === false && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
                <MicOff className="h-8 w-8 text-red-600 mx-auto mb-2" />
                <p className="text-red-700 font-medium">Microphone Access Denied</p>
                <p className="text-red-600 text-sm mt-1">
                  Please enable microphone access in your browser settings and refresh the page.
                </p>
              </div>
            )}

            {hasMicPermission === true && (
              <div className="space-y-6">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 text-green-700 mb-3">
                    <CheckCircle2 className="h-5 w-5" />
                    <span className="font-medium">Microphone Connected</span>
                  </div>

                  {/* Volume Meter */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span>Volume Level</span>
                      <span>{Math.round(volumeLevel)}%</span>
                    </div>
                    <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all duration-100 ${volumeLevel > 60 ? 'bg-green-500' :
                            volumeLevel > 30 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                        style={{ width: `${volumeLevel}%` }}
                      />
                    </div>
                    <p className="text-sm text-gray-500">
                      Speak into your microphone to test. The bar should move when you talk.
                    </p>
                  </div>
                </div>

                <Button
                  onClick={() => setPhase('instructions')}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 gap-2"
                  size="lg"
                >
                  <Play className="h-5 w-5" />
                  Start Speaking Test
                </Button>
              </div>
            )}

            <div className="mt-6 pt-6 border-t">
              <Link to="/" className="text-gray-500 hover:text-gray-700 text-sm flex items-center justify-center gap-1">
                <Home className="h-4 w-4" />
                Back to Home
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // ============================================
  // Results Screen
  // ============================================
  if (isSubmitted && result) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 md:p-8">
        <div className="max-w-3xl mx-auto">
          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="h-8 w-8 text-green-600" />
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Test Complete!</h1>
                <p className="text-gray-600">{test.title}</p>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">
                    {formatTime(result.timeTaken)}
                  </div>
                  <div className="text-sm text-gray-500">Total Time</div>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <h2 className="font-semibold text-gray-900">Your Recordings</h2>
                {result.recordings.map((rec, idx) => (
                  <div key={idx} className="flex items-center justify-between bg-white border rounded-lg p-3">
                    <div className="flex items-center gap-3">
                      <Badge variant="outline">Part {rec.partNumber}</Badge>
                      <span className="text-sm text-gray-600">
                        {formatTime(rec.duration)} recorded
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      {rec.uploadedUrl ? (
                        <span className="text-green-600 text-sm flex items-center gap-1">
                          <CheckCircle2 className="h-4 w-4" />
                          Uploaded
                        </span>
                      ) : (
                        <span className="text-amber-600 text-sm flex items-center gap-1">
                          <AlertTriangle className="h-4 w-4" />
                          Upload pending
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-center gap-4">
                <Link to="/">
                  <Button className="gap-2">
                    <Home className="h-4 w-4" />
                    Back to Home
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // ============================================
  // Instructions Screen
  // ============================================
  if (phase === 'instructions') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <Badge className="mb-4" variant="outline">
                Part {currentPart.partNumber} of 3
              </Badge>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">{currentPart.title}</h1>
              <p className="text-gray-600">{currentPart.instructions}</p>
            </div>

            {currentPart.partNumber === 2 && currentCueCard && (
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 mb-6">
                <h3 className="font-semibold text-amber-800 mb-2">Cue Card Topic:</h3>
                <p className="text-lg font-medium text-gray-900 mb-4">{currentCueCard.topic}</p>
                <p className="text-sm text-gray-600 mb-2">You should say:</p>
                <ul className="space-y-1">
                  {currentCueCard.bulletPoints.map((point, idx) => (
                    <li key={idx} className="text-gray-700 flex items-start gap-2">
                      <span className="text-amber-600">•</span>
                      {point}
                    </li>
                  ))}
                </ul>
                <div className="mt-4 pt-4 border-t border-amber-200 text-sm text-amber-700">
                  <p>You will have <strong>1 minute</strong> to prepare, then <strong>2 minutes</strong> to speak.</p>
                </div>
              </div>
            )}

            <Button
              onClick={startPart}
              className="w-full bg-indigo-600 hover:bg-indigo-700 gap-2"
              size="lg"
            >
              <Play className="h-5 w-5" />
              {currentPart.partNumber === 2 ? 'Start Preparation' : 'Start Part ' + currentPart.partNumber}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // ============================================
  // Main Test Interface (Think/Prep/Recording)
  // ============================================
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b shadow-sm px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Badge variant="outline">Part {currentPart.partNumber}</Badge>
          <span className="text-gray-600">{currentPart.title}</span>
        </div>

        <div className="flex items-center gap-4">
          {/* Recording Indicator */}
          {isRecording && (
            <div className="flex items-center gap-2 px-3 py-1.5 bg-red-100 text-red-700 rounded-full">
              <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse" />
              <span className="text-sm font-medium">Recording</span>
            </div>
          )}

          {/* Timer */}
          <div className={`flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-lg ${phase === 'recording' ? 'bg-red-100 text-red-700' :
              phase === 'prep' ? 'bg-amber-100 text-amber-700' :
                'bg-indigo-100 text-indigo-700'
            }`}>
            <Clock className="h-5 w-5" />
            <span>{formatTime(timeRemaining)}</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl">
          <CardContent className="p-8">
            {/* Phase Indicator */}
            <div className="text-center mb-6">
              {phase === 'think' && (
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full">
                  <MessageSquare className="h-5 w-5" />
                  <span className="font-medium">Think Time</span>
                </div>
              )}
              {phase === 'prep' && (
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-100 text-amber-700 rounded-full">
                  <Clock className="h-5 w-5" />
                  <span className="font-medium">Preparation Time</span>
                </div>
              )}
              {phase === 'recording' && (
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-100 text-red-700 rounded-full">
                  <Mic className="h-5 w-5" />
                  <span className="font-medium">Recording - Speak Now</span>
                </div>
              )}
              {phase === 'between' && (
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-full">
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span className="font-medium">Next Question...</span>
                </div>
              )}
            </div>

            {/* Question/Cue Card Display */}
            {currentPart.partNumber === 2 && currentCueCard ? (
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{currentCueCard.topic}</h3>
                <p className="text-sm text-gray-600 mb-2">You should say:</p>
                <ul className="space-y-2">
                  {currentCueCard.bulletPoints.map((point, idx) => (
                    <li key={idx} className="text-gray-700 flex items-start gap-2">
                      <span className="text-amber-600">•</span>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            ) : currentQuestion ? (
              <div className="text-center">
                <div className="text-sm text-gray-500 mb-2">
                  Question {currentQuestionIndex + 1} of {currentPart.questions?.length || 0}
                </div>
                <p className="text-xl text-gray-900 font-medium">
                  "{currentQuestion.text}"
                </p>
              </div>
            ) : null}

            {/* Volume Meter (during recording) */}
            {phase === 'recording' && (
              <div className="mt-8">
                <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                  <span className="flex items-center gap-1">
                    <Volume2 className="h-4 w-4" />
                    Microphone Level
                  </span>
                  <span>{Math.round(volumeLevel)}%</span>
                </div>
                <Progress value={volumeLevel} className="h-3" />
              </div>
            )}

            {/* Progress Bar */}
            <div className="mt-8">
              <div className="flex justify-between text-sm text-gray-500 mb-2">
                <span>
                  {phase === 'prep' ? 'Preparation' : phase === 'think' ? 'Think' : 'Recording'} Progress
                </span>
                <span>{formatTime(timeRemaining)} remaining</span>
              </div>
              <Progress
                value={(() => {
                  const totalTime = phase === 'prep'
                    ? currentCueCard?.prepTime || 60
                    : phase === 'think'
                      ? currentQuestion?.thinkTime || 3
                      : currentPart.partNumber === 2
                        ? currentCueCard?.recordTime || 120
                        : currentQuestion?.recordTime || 30;
                  return ((totalTime - timeRemaining) / totalTime) * 100;
                })()}
                className="h-2"
              />
            </div>

            {/* Upload Status */}
            {recordings.length > 0 && (
              <div className="mt-6 pt-6 border-t">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Recordings saved:</span>
                  <div className="flex items-center gap-2">
                    {recordings.filter(r => r.uploadStatus === 'uploaded').length > 0 && (
                      <span className="text-green-600 flex items-center gap-1">
                        <CheckCircle2 className="h-4 w-4" />
                        {recordings.filter(r => r.uploadStatus === 'uploaded').length} uploaded
                      </span>
                    )}
                    {recordings.filter(r => r.uploadStatus === 'uploading').length > 0 && (
                      <span className="text-amber-600 flex items-center gap-1">
                        <Upload className="h-4 w-4 animate-pulse" />
                        {recordings.filter(r => r.uploadStatus === 'uploading').length} uploading
                      </span>
                    )}
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
