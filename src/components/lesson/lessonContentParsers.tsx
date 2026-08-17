import type { ReactNode } from 'react';
import { Lightbulb } from 'lucide-react';

/**
 * Parses **bold** markdown-style segments into <strong> tags.
 * Shared by the grammar lesson template and the legacy vocabulary/generic
 * rendering path in LessonPage.tsx so the bold-text behavior stays
 * identical across lesson types.
 */
export function parseMarkdownText(text: string): ReactNode {
  if (!text) return null;

  const parts = text.split(/(\*\*[^*]+\*\*)/g);

  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      const boldText = part.slice(2, -2);
      return (
        <strong key={index} className="font-semibold text-foreground">
          {boldText}
        </strong>
      );
    }
    return <span key={index}>{part}</span>;
  });
}

/**
 * Generic markdown-lite block renderer: splits text into blank-line
 * separated paragraphs, then renders each as a bold-only header callout, a
 * "key principle" highlight, a numbered/bulleted list, or a plain
 * paragraph with inline **bold** parsing. This is the same block-parsing
 * strategy `LessonPage.tsx` already uses successfully for `coreExplanation`
 * and grammar's `grammarUse` — extracted here so it can be reused by the
 * writing lesson template (core explanation + examples) without
 * duplicating the logic or hardcoding any lesson-specific keywords beyond
 * the two generic structural cues (a lone bold line, and the literal
 * phrase "key principle") that the original renderer already relied on.
 *
 * Unlike `parseWritingExample`/`parseExampleContent` (LessonPage.tsx),
 * this never matches on specific section-header vocabulary (e.g. "MODEL
 * ANSWER", "Task:") — it only reacts to structure (blank lines, leading
 * `**bold**`, numbers, dashes/bullets), so it renders any current or
 * future markdown-lite content correctly without per-format regexes.
 */
export function parseRichTextBlocks(text: string): ReactNode {
  if (!text) return null;

  const paragraphs = text.split('\n\n');

  return (
    <div className="space-y-4">
      {paragraphs.map((paragraph, paragraphIndex) => {
        const lines = paragraph.split('\n');
        const hasNumberedList = lines.some((line) => /^\d+\./.test(line.trim()));
        const hasBulletList = !hasNumberedList && lines.some((line) => /^[-•]\s+/.test(line.trim()));
        const isBoldHeaderOnly = lines.length === 1 && paragraph.trim().startsWith('**') && paragraph.trim().endsWith('**');
        const isKeyPrinciple = paragraph.toLowerCase().includes('key principle');

        if (isKeyPrinciple) {
          const cleanText = paragraph.replace(/\*\*/g, '');
          return (
            <div key={paragraphIndex} className="flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4">
              <Lightbulb className="mt-0.5 h-5 w-5 flex-shrink-0 text-amber-500" />
              <p className="font-medium text-amber-900">{cleanText}</p>
            </div>
          );
        }

        if (isBoldHeaderOnly) {
          const cleanText = paragraph.replace(/\*\*/g, '');
          return (
            <div key={paragraphIndex} className="rounded-r-lg border-l-4 border-accent bg-accent/5 p-4">
              <p className="font-semibold text-foreground">{cleanText}</p>
            </div>
          );
        }

        if (hasNumberedList || hasBulletList) {
          return (
            <div key={paragraphIndex} className="space-y-2">
              {lines.map((line, lineIndex) => {
                const trimmed = line.trim();
                if (!trimmed) return null;

                const numberedMatch = trimmed.match(/^(\d+)\.\s*(.+)/);
                if (numberedMatch) {
                  const [, num, lineText] = numberedMatch;
                  return (
                    <div key={lineIndex} className="flex items-start gap-3 rounded-lg bg-muted/50 p-3 transition-colors hover:bg-muted">
                      <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-accent text-sm font-bold text-white">
                        {num}
                      </span>
                      <span className="pt-0.5 font-medium text-foreground">{parseMarkdownText(lineText)}</span>
                    </div>
                  );
                }

                const bulletMatch = trimmed.match(/^[-•]\s*(.+)/);
                if (bulletMatch) {
                  return (
                    <div key={lineIndex} className="flex items-start gap-2 py-1 pl-1">
                      <span className="mt-1 text-accent">•</span>
                      <span className="text-muted-foreground">{parseMarkdownText(bulletMatch[1])}</span>
                    </div>
                  );
                }

                if (trimmed.startsWith('**') && trimmed.endsWith('**')) {
                  return (
                    <p key={lineIndex} className="mb-1 font-semibold text-foreground">
                      {trimmed.replace(/\*\*/g, '')}
                    </p>
                  );
                }

                return (
                  <p key={lineIndex} className="text-muted-foreground">
                    {parseMarkdownText(trimmed)}
                  </p>
                );
              })}
            </div>
          );
        }

        return (
          <div key={paragraphIndex} className="space-y-1">
            {lines
              .filter((line) => line.trim())
              .map((line, lineIndex) => (
                <p key={lineIndex} className="leading-relaxed text-muted-foreground">
                  {parseMarkdownText(line)}
                </p>
              ))}
          </div>
        );
      })}
    </div>
  );
}
