export function cleanEnv(value: string | undefined): string {
  let cleaned = (value ?? '').trim();
  cleaned = cleaned.replace(/^['"]+|['"]+$/g, '');
  cleaned = cleaned.replace(/^(?:\uFEFF|\u00EF\u00BB\u00BF|\\uFEFF)+/, '');
  return cleaned.replace(/(?:\\r\\n|\\n|\\r)+$/g, '').trim();
}
