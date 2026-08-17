import { useState, useCallback, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useNavConfig } from '@/contexts/NavContext';
import { Mic, MicOff, CheckCircle2, Home, Play, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { SpeakingTest, SpeakingTestResult } from '@/types';
import { FullMockSpeakingPaper } from '@/components/test/FullMockSpeakingPaper';
import type { SpeakingPaperPart, SpeakingPaperClip } from '@/components/test/FullMockSpeakingPaper';
import { useExamTimer, formatTimerDisplay } from '@/hooks/useExamTimer';

// ── Sample data (fallback when no test is passed via navigation state) ────────
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
        { id: 'p1q1', questionNumber: 1, text: "Let's talk about your hometown. Where is your hometown?", thinkTime: 3, recordTime: 30 },
        { id: 'p1q2', questionNumber: 2, text: 'What do you like most about living there?', thinkTime: 3, recordTime: 30 },
        { id: 'p1q3', questionNumber: 3, text: 'Has your hometown changed much in recent years?', thinkTime: 3, recordTime: 45 },
        { id: 'p1q4', questionNumber: 4, text: 'Do you think you will continue to live there in the future?', thinkTime: 3, recordTime: 45 },
      ],
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
          'And explain how this skill would benefit you',
        ],
        prepTime: 60,
        recordTime: 120,
      },
    },
    {
      id: 'part3',
      partNumber: 3,
      partType: 'part3',
      title: 'Part 3: Two-way Discussion',
      instructions: 'The examiner will ask you more abstract questions related to the Part 2 topic.',
      questions: [
        { id: 'p3q1', questionNumber: 1, text: 'What skills do you think are most important for young people to learn today?', thinkTime: 5, recordTime: 60 },
        { id: 'p3q2', questionNumber: 2, text: 'How has technology changed the way people learn new skills?', thinkTime: 5, recordTime: 60 },
        { id: 'p3q3', questionNumber: 3, text: 'Do you think traditional skills are still valuable in modern society?', thinkTime: 5, recordTime: 60 },
      ],
    },
  ],
};

// ── Adapter: SpeakingTest parts → FullMockSpeakingPaper format ───────────────
// Exported so it can be tested in isolation.
export function toSpeakingPaperParts(parts: SpeakingTest['parts']): SpeakingPaperPart[] {
  return parts.map(p => ({
    title: p.title,
    instructions: p.instructions,
    questions: p.questions?.map(q => ({ text: q.text, recordTime: q.recordTime })),
    cueCard: p.cueCard
      ? {
          topic: p.cueCard.topic,
          bulletPoints: p.cueCard.bulletPoints,
          prepTime: p.cueCard.prepTime,
          recordTime: p.cueCard.recordTime,
        }
      : undefined,
  }));
}

const formatTime = (seconds: number) => formatTimerDisplay(seconds);

// ── Main Component ────────────────────────────────────────────────────────────
export default function SpeakingTestPage() {
  const location = useLocation();
  const stateData = location.state as { testData?: SpeakingTest; testId?: string } | null;
  const hasValidData =
    stateData?.testData &&
    Array.isArray(stateData.testData.parts) &&
    stateData.testData.parts.length > 0;
  const [test] = useState<SpeakingTest>(
    hasValidData ? (stateData!.testData as SpeakingTest) : SAMPLE_SPEAKING_TEST,
  );

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [result, setResult] = useState<SpeakingTestResult | null>(null);
  const [startedAt] = useState(Date.now());

  // ── Mic / recording state ─────────────────────────────────────────────────
  const [hasMicPermission, setHasMicPermission] = useState<boolean | null>(null);
  const [volumeLevel, setVolumeLevel] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [recordingError, setRecordingError] = useState<string | null>(null);
  const [clips, setClips] = useState<SpeakingPaperClip[]>([]);
  const [typedResponse, setTypedResponse] = useState('');
  const [savedIndicator, setSavedIndicator] = useState(false);

  // Refs
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const streamRef = useRef<MediaStream | null>(null);
  const recordingTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const recordingStartedAtRef = useRef(0);
  const analyserAnimRef = useRef<number | null>(null);
  const micStreamRef = useRef<MediaStream | null>(null);

  // ── Overall session timer (15 min, matching full mock speaking section) ───
  const onExpireRef = useRef<(() => void) | null>(null);
  const timer = useExamTimer({
    initialSeconds: 15 * 60,
    onExpire: () => onExpireRef.current?.(),
  });

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (streamRef.current) streamRef.current.getTracks().forEach(t => t.stop());
      if (recordingTimerRef.current) clearInterval(recordingTimerRef.current);
      if (micStreamRef.current) micStreamRef.current.getTracks().forEach(t => t.stop());
      if (analyserAnimRef.current) cancelAnimationFrame(analyserAnimRef.current);
    };
  }, []);

  // Flash savedIndicator whenever responses or clips change
  const savedTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    if (!typedResponse && clips.length === 0) return;
    if (savedTimerRef.current) clearTimeout(savedTimerRef.current);
    setSavedIndicator(true);
    savedTimerRef.current = setTimeout(() => setSavedIndicator(false), 2000);
  }, [typedResponse, clips.length]);

  // ── Mic permission ────────────────────────────────────────────────────────
  const requestMicPermission = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      micStreamRef.current = stream;
      setHasMicPermission(true);
      // Volume-meter for the system-check preview
      const ctx = new AudioContext();
      const src = ctx.createMediaStreamSource(stream);
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 256;
      src.connect(analyser);
      const update = () => {
        const data = new Uint8Array(analyser.frequencyBinCount);
        analyser.getByteFrequencyData(data);
        setVolumeLevel(Math.min(100, (data.reduce((a, b) => a + b, 0) / data.length) * 1.5));
        analyserAnimRef.current = requestAnimationFrame(update);
      };
      update();
    } catch {
      setHasMicPermission(false);
    }
  }, []);

  // ── Recording ─────────────────────────────────────────────────────────────
  const stopRecording = () => {
    if (recordingTimerRef.current) {
      clearInterval(recordingTimerRef.current);
      recordingTimerRef.current = null;
    }
    if (mediaRecorderRef.current?.state === 'recording') {
      mediaRecorderRef.current.stop();
    }
  };

  const startRecording = async (label: string) => {
    setRecordingError(null);
    if (!navigator.mediaDevices?.getUserMedia) {
      setRecordingError('Microphone access is not supported in this browser. Please use Chrome, Firefox, or Edge.');
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      audioChunksRef.current = [];

      const mimeType =
        ['audio/webm;codecs=opus', 'audio/webm', 'audio/ogg;codecs=opus', 'audio/mp4', ''].find(
          t => !t || MediaRecorder.isTypeSupported(t),
        ) ?? '';
      const recorder = new MediaRecorder(stream, mimeType ? { mimeType } : {});
      mediaRecorderRef.current = recorder;

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) audioChunksRef.current.push(e.data);
      };
      recorder.onstop = () => {
        const blob = new Blob(audioChunksRef.current, { type: mimeType || 'audio/webm' });
        const url = URL.createObjectURL(blob);
        const duration = Math.round((Date.now() - recordingStartedAtRef.current) / 1000);
        const id = `clip-${Date.now()}`;
        setClips(prev => [
          ...prev,
          { id, url, duration, label, size: blob.size, uploadStatus: 'local' },
        ]);
        setIsRecording(false);
        setRecordingSeconds(0);
        stream.getTracks().forEach(t => t.stop());
      };
      recorder.onerror = () => {
        setRecordingError('Recording failed. Please try again.');
        setIsRecording(false);
        setRecordingSeconds(0);
        stream.getTracks().forEach(t => t.stop());
      };

      setIsRecording(true);
      setRecordingSeconds(0);
      recordingStartedAtRef.current = Date.now();
      recorder.start(100);

      let secs = 0;
      recordingTimerRef.current = setInterval(() => {
        secs++;
        setRecordingSeconds(secs);
        if (secs >= 180) stopRecording();
      }, 1000);
    } catch (err: unknown) {
      const e = err as { name?: string; message?: string };
      if (e.name === 'NotAllowedError' || e.name === 'PermissionDeniedError') {
        setRecordingError('Microphone permission denied. Please allow microphone access and try again.');
      } else {
        setRecordingError(`Could not access microphone: ${e.message ?? 'Unknown error'}`);
      }
    }
  };

  const deleteClip = (id: string) => {
    setClips(prev => {
      const clip = prev.find(c => c.id === id);
      if (clip) URL.revokeObjectURL(clip.url);
      return prev.filter(c => c.id !== id);
    });
  };

  // ── Submit ────────────────────────────────────────────────────────────────
  const handleSubmit = useCallback(() => {
    timer.stop();
    if (isRecording) stopRecording();
    setResult({
      testId: test.id,
      timeTaken: Math.floor((Date.now() - startedAt) / 1000),
      recordings: clips.map(c => ({
        partNumber: 1 as 1 | 2 | 3,
        questionId: c.label,
        duration: c.duration,
        uploadedUrl: undefined,
      })),
    });
    setIsSubmitted(true);
  }, [timer, isRecording, test.id, startedAt, clips]);

  onExpireRef.current = handleSubmit;

  // ── Nav context / exit guard ──────────────────────────────────────────────
  // mode: 'exam' matches what the route already sets via <Layout mode="exam">
  // — Navbar/Footer/MobileNav are already hidden, this doesn't change the
  // visible chrome. What it adds: Layout's useNavExitGuard now catches the
  // browser Back button and tab close/refresh while the test is in progress.
  // Guarded only once past the mic-permission system-check screen — nothing
  // is recorded yet before that, so there's nothing to lose.
  const handleExitAttempt = useCallback(() => {
    if (isSubmitted || hasMicPermission !== true) return true;
    return window.confirm('Leave the Speaking test? Your recordings and progress will be lost.');
  }, [isSubmitted, hasMicPermission]);

  useNavConfig({ mode: 'exam', title: test.title, onExitAttempt: handleExitAttempt });

  // ── Data adapter ──────────────────────────────────────────────────────────
  const paperParts = toSpeakingPaperParts(test.parts);

  // ── System-check screen ───────────────────────────────────────────────────
  if (!isSubmitted && hasMicPermission !== true) {
    return (
      <div className="min-h-screen bg-[#eceef3] flex items-center justify-center p-4">
        <Card className="w-full max-w-lg">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-[#d98e2b]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mic className="h-8 w-8 text-[#d98e2b]" />
              </div>
              <h1 className="text-2xl font-bold text-[#182644] mb-2">Check your microphone</h1>
              <p className="text-[#3c4a6b]">
                Before starting, confirm your microphone is working correctly.
              </p>
            </div>

            {hasMicPermission === null && (
              <div className="space-y-4">
                <Button
                  onClick={requestMicPermission}
                  className="w-full gap-2 rounded-none bg-[#182644] text-white hover:bg-[#0f1930]"
                  size="lg"
                >
                  <Mic className="h-5 w-5" />
                  Allow Microphone Access
                </Button>
                <p className="text-sm text-[#67718b] text-center">
                  Click above and allow microphone access when prompted by your browser.
                </p>
              </div>
            )}

            {hasMicPermission === false && (
              <div className="bg-red-50 border border-red-200 rounded p-4 text-center">
                <MicOff className="h-8 w-8 text-red-600 mx-auto mb-2" />
                <p className="text-red-700 font-medium">Microphone Access Denied</p>
                <p className="text-red-600 text-sm mt-1">
                  Enable microphone access in your browser settings and refresh the page.
                </p>
              </div>
            )}

            {hasMicPermission === true && (
              <div className="space-y-6">
                <div className="bg-green-50 border border-green-200 rounded p-4">
                  <div className="flex items-center gap-2 text-green-700 mb-3">
                    <CheckCircle2 className="h-5 w-5" />
                    <span className="font-medium">Microphone Connected</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm text-[#3c4a6b]">
                      <span>Volume Level</span>
                      <span>{Math.round(volumeLevel)}%</span>
                    </div>
                    <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all duration-100 rounded-full ${volumeLevel > 60 ? 'bg-green-500' : volumeLevel > 30 ? 'bg-yellow-500' : 'bg-red-500'}`}
                        style={{ width: `${volumeLevel}%` }}
                      />
                    </div>
                    <p className="text-sm text-[#67718b]">
                      Speak into your microphone — the bar should move.
                    </p>
                  </div>
                </div>
                <Button
                  onClick={() => {
                    // Stop the system-check volume-meter stream; recording will
                    // open a fresh stream when the student starts each question.
                    if (micStreamRef.current) {
                      micStreamRef.current.getTracks().forEach(t => t.stop());
                      micStreamRef.current = null;
                    }
                    if (analyserAnimRef.current) {
                      cancelAnimationFrame(analyserAnimRef.current);
                      analyserAnimRef.current = null;
                    }
                    // Explicitly mark permission as true to show the paper
                    setHasMicPermission(true);
                  }}
                  className="w-full gap-2 rounded-none bg-[#d98e2b] text-[#182644] hover:bg-[#c67f21] font-bold"
                  size="lg"
                >
                  <Play className="h-5 w-5" />
                  Start Speaking Test
                </Button>
              </div>
            )}

            <div className="mt-6 pt-6 border-t border-[#c7cbd8]">
              <Link to="/" className="text-[#67718b] hover:text-[#182644] text-sm flex items-center justify-center gap-1">
                <Home className="h-4 w-4" />
                Back to Home
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // ── Results screen ────────────────────────────────────────────────────────
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

              <div className="bg-gray-50 rounded-lg p-4 mb-6 text-center">
                <div className="text-2xl font-bold text-gray-900">{formatTime(result.timeTaken)}</div>
                <div className="text-sm text-gray-500">Total Time</div>
              </div>

              {clips.length > 0 && (
                <div className="space-y-4 mb-8">
                  <h2 className="font-semibold text-gray-900">Your Recordings ({clips.length})</h2>
                  {clips.map(clip => (
                    <div key={clip.id} className="flex items-center justify-between bg-white border rounded-lg p-3">
                      <div className="flex items-center gap-3">
                        <Badge variant="outline">{clip.label}</Badge>
                        <span className="text-sm text-gray-600">{formatTime(clip.duration)} recorded</span>
                      </div>
                      <span className="text-green-600 text-sm flex items-center gap-1">
                        <CheckCircle2 className="h-4 w-4" />
                        Saved locally
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {clips.length === 0 && (
                <div className="mb-8 p-4 bg-amber-50 border border-amber-200 rounded-lg flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
                  <p className="text-amber-800 text-sm">
                    No audio recordings were saved. If you typed your responses, they have been recorded above.
                  </p>
                </div>
              )}

              <div className="flex justify-center">
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

  // ── Exam interface (FullMockSpeakingPaper) ────────────────────────────────
  return (
    <FullMockSpeakingPaper
      parts={paperParts}
      typedResponse={typedResponse}
      setTypedResponse={setTypedResponse}
      clips={clips}
      isRecording={isRecording}
      recordingSeconds={recordingSeconds}
      recordingError={recordingError}
      timeDisplay={timer.display}
      timeWarning={timer.warning}
      savedIndicator={savedIndicator}
      startRecording={startRecording}
      stopRecording={stopRecording}
      deleteClip={deleteClip}
      onSubmit={handleSubmit}
      submitLabel="Submit Speaking Test"
    />
  );
}
