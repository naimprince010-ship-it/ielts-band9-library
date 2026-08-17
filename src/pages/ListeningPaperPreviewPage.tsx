import { useState } from 'react';
import { FullMockListeningPaper, type ListeningPaperSection } from '@/components/test/FullMockListeningPaper';
import { FULL_MOCK_FALLBACK_TESTS } from '@/data/fullMockFallback';

export default function ListeningPaperPreviewPage() {
  const sections = FULL_MOCK_FALLBACK_TESTS.listening.test_data.sections as ListeningPaperSection[];
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [activeSection, setActiveSection] = useState(0);
  const [flags, setFlags] = useState<Record<string, boolean>>({});
  const [played, setPlayed] = useState<Set<string>>(new Set());
  const [playing, setPlaying] = useState<string | null>(null);

  return (
    <FullMockListeningPaper
      sections={sections}
      answers={answers}
      activeSection={activeSection}
      setActiveSection={setActiveSection}
      setAnswer={(key, value) => setAnswers(previous => ({ ...previous, [key]: value }))}
      flaggedQuestions={flags}
      toggleFlag={(key) => setFlags(previous => ({ ...previous, [key]: !previous[key] }))}
      playedAudioIds={played}
      playingAudioId={playing}
      playSectionAudio={(_section, index) => {
        const id = `section-${sections[index]?.sectionNumber ?? index + 1}`;
        if (playing === id) {
          setPlaying(null);
          return;
        }
        if (played.has(id)) return;
        setPlayed(previous => new Set(previous).add(id));
        setPlaying(id);
      }}
      audioMessage="Preview mode: audio playback is simulated."
      audioSupported={true}
      timeDisplay="29:57"
      timeWarning={false}
      savedIndicator={false}
      onSubmit={() => undefined}
    />
  );
}
