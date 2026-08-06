export type FullMockModule = 'listening' | 'reading' | 'writing' | 'speaking';

export interface FullMockRow {
  test_data?: Record<string, unknown> | null;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
}

function recordArray(value: unknown): Record<string, unknown>[] {
  return Array.isArray(value) ? value.filter(isRecord) : [];
}

export function getFullMockReadiness(test: FullMockRow | undefined, module: FullMockModule) {
  const data = test?.test_data;
  if (!data || !isRecord(data)) return { usable: false, reason: 'Test data is missing.' };

  if (module === 'listening') {
    const sections = recordArray(data.sections);
    const questionCount = sections.reduce(
      (sum, section) => sum + (Array.isArray(section.questions) ? section.questions.length : 0),
      0,
    );
    const hasGlobalAudio = typeof data.audioUrl === 'string' && /^https:\/\//.test(data.audioUrl.trim());
    const sectionsReady = sections.every((section) => {
      const questions = recordArray(section.questions);
      const hasTranscript = typeof section.transcript === 'string' && section.transcript.trim().length > 0;
      const hasPersistentAudio = typeof section.sectionAudioUrl === 'string' && /^https:\/\//.test(section.sectionAudioUrl.trim());
      const answersReady = questions.every(
        (question) => typeof question.correctAnswer === 'string' && question.correctAnswer.trim().length > 0,
      );
      return questions.length === 10 && hasTranscript && answersReady && (hasGlobalAudio || hasPersistentAudio);
    });
    const usable = sections.length === 4 && questionCount === 40 && sectionsReady;
    return {
      usable,
      reason: usable
        ? ''
        : `Listening requires 4 sections, 40 answered questions, transcripts, and persistent HTTPS audio; found ${sections.length} sections and ${questionCount} questions.`,
    };
  }

  if (module === 'reading') {
    const passages = recordArray(data.passages);
    const questionCount = passages.reduce(
      (sum, passage) => sum + (Array.isArray(passage.questions) ? passage.questions.length : 0),
      0,
    );
    const passagesReady = passages.every((passage) => {
      const questions = recordArray(passage.questions);
      const hasPassageText = typeof passage.textContent === 'string' && passage.textContent.trim().length > 0;
      const answersReady = questions.every(
        (question) => typeof question.correctAnswer === 'string' && question.correctAnswer.trim().length > 0,
      );
      return hasPassageText && questions.length > 0 && answersReady;
    });
    const usable = passages.length === 3 && questionCount === 40 && passagesReady;
    return {
      usable,
      reason: usable ? '' : `Reading requires exactly 3 passages, 40 questions, passage text, and correct answers; found ${passages.length} passages and ${questionCount} questions.`,
    };
  }

  if (module === 'writing') {
    const tasks = recordArray(data.tasks);
    const task1 = tasks.find(task => task.taskNumber === 1 || task.taskType === 'task1' || task.task_type === 'task1') ?? tasks[0];
    const task2 = tasks.find(task => task.taskNumber === 2 || task.taskType === 'task2' || task.task_type === 'task2') ?? tasks[1];
    const hasPrompt = (task: Record<string, unknown> | undefined) => typeof task?.prompt === 'string' && task.prompt.trim().length > 0;
    const hasTask1Visual = Boolean(task1 && [
      task1.imageUrl, task1.image_url, task1.chartData, task1.chart_data, task1.tableData, task1.table_data,
      task1.processData, task1.process_data, task1.mapData, task1.map_data,
    ].some(Boolean));
    const usable = tasks.length === 2 && hasPrompt(task1) && hasPrompt(task2) && hasTask1Visual;
    return { usable, reason: usable ? '' : `Writing requires exactly 2 prompted tasks and one renderable Task 1 visual; found ${tasks.length} tasks and visual=${hasTask1Visual}.` };
  }

  const parts = recordArray(data.parts);
  const part1Questions = parts[0] ? recordArray(parts[0].questions) : [];
  const part3Questions = parts[2] ? recordArray(parts[2].questions) : [];
  const cueCard = parts[1] && isRecord(parts[1].cueCard) ? parts[1].cueCard : undefined;
  const hasQuestionText = (question: Record<string, unknown>) =>
    [question.text, question.questionText].some(value => typeof value === 'string' && value.trim().length > 0);
  const hasCueCard = Boolean(cueCard && typeof cueCard.topic === 'string' && cueCard.topic.trim() && Array.isArray(cueCard.bulletPoints) && cueCard.bulletPoints.length > 0);
  const usable = parts.length === 3 && part1Questions.length > 0 && part1Questions.every(hasQuestionText) && hasCueCard && part3Questions.length > 0 && part3Questions.every(hasQuestionText);
  return { usable, reason: usable ? '' : `Speaking requires 3 complete parts: Part 1 questions, a Part 2 cue card, and Part 3 questions; found ${parts.length} parts and cueCard=${hasCueCard}.` };
}

export function isUsableFullMockTest(test: FullMockRow | undefined, module: FullMockModule): boolean {
  return getFullMockReadiness(test, module).usable;
}
