import { useState } from 'react';
import { FullMockSpeakingPaper } from '@/components/test/FullMockSpeakingPaper';

export default function SpeakingPaperPreviewPage() {
  const [response, setResponse] = useState('');
  return <FullMockSpeakingPaper
    parts={[
      { title: 'Part 1 — Introduction and interview', instructions: 'Answer the examiner’s questions about yourself and familiar topics.', questions: [{ text: 'What do you like most about the place where you live?' }, { text: 'How often do you spend time with your friends?' }] },
      { title: 'Part 2 — Individual long turn', instructions: 'You have one minute to prepare before speaking.', cueCard: { topic: 'Describe a skill you would like to learn', bulletPoints: ['what the skill is', 'why you want to learn it', 'how you would learn it', 'how it would benefit you'] } },
      { title: 'Part 3 — Two-way discussion', instructions: 'Discuss more abstract ideas related to the Part 2 topic.', questions: [{ text: 'What skills are most important for young people today?' }, { text: 'How has technology changed the way people learn?' }] },
    ]}
    typedResponse={response} setTypedResponse={setResponse} clips={[]} isRecording={false}
    recordingSeconds={0} recordingError={null} timeDisplay="14:32" timeWarning={false}
    savedIndicator startRecording={() => undefined} stopRecording={() => undefined}
    deleteClip={() => undefined} onSubmit={() => undefined}
  />;
}
