export function normalizeQuestionType(rawType: string, questionText: string, validTypes: string[]): string {
  const value = (rawType ?? '').toLowerCase().replace(/[\s_]/g, '-');
  if (validTypes.includes(value)) return value;

  const aliases: Record<string, string> = {
    'table-completion': 'fill-blank', 'note-completion': 'fill-blank',
    'flow-chart-completion': 'fill-blank', 'flowchart-completion': 'fill-blank',
    'form-completion': 'fill-blank', 'matching-names': 'matching-features',
    'matching-endings': 'sentence-completion', 'plan-labeling': 'map-labeling',
    'multiple-choice': 'mcq', 'multiple-choice-question': 'mcq',
    'true/false/not-given': 'true-false-not-given', 'true-false': 'true-false-not-given',
    'yes/no/not-given': 'yes-no-not-given', 'yes-no': 'yes-no-not-given',
    'diagram-labelling': 'diagram-labeling', 'map-labelling': 'map-labeling',
  };
  if (aliases[value] && validTypes.includes(aliases[value])) return aliases[value];

  const text = questionText.toLowerCase();
  if (/(table|note|flow|chart|form)/.test(text)) return validTypes.includes('fill-blank') ? 'fill-blank' : validTypes[0];
  if (text.includes('summary')) return validTypes.includes('summary-completion') ? 'summary-completion' : 'fill-blank';
  if (text.includes('sentence')) return validTypes.includes('sentence-completion') ? 'sentence-completion' : 'fill-blank';
  if (text.includes('heading')) return validTypes.includes('matching-headings') ? 'matching-headings' : validTypes[0];
  if (text.includes('true') || text.includes('false')) return validTypes.includes('true-false-not-given') ? 'true-false-not-given' : validTypes[0];
  if (text.includes('yes') || text.includes('no')) return validTypes.includes('yes-no-not-given') ? 'yes-no-not-given' : validTypes[0];
  if (text.includes('diagram') || text.includes('label')) return validTypes.includes('diagram-labeling') ? 'diagram-labeling' : validTypes[0];
  if (text.includes('map') || text.includes('plan')) return validTypes.includes('map-labeling') ? 'map-labeling' : validTypes[0];
  if (text.includes('match')) return validTypes.includes('matching-information') ? 'matching-information' : validTypes[0];
  return validTypes[0];
}

export function isQuestionTypeInvalid(rawType: string | undefined, questionText: string | undefined, validTypes: string[]): boolean {
  return !rawType?.trim() || !validTypes.includes(normalizeQuestionType(rawType, questionText ?? '', validTypes));
}

export function isGenericQuestionText(text: string): boolean {
  const value = (text ?? '').trim().toLowerCase();
  return !value || /^complete the (table|summary|notes?|form|flow[- ]?chart|diagram)\b/i.test(value)
    || /^fill in the (blank|gap)s?\b/i.test(value) || /^answer the following\b/i.test(value)
    || /^write (your )?answer\b/i.test(value);
}
