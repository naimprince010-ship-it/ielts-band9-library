export function cleanEnv(value: string | undefined): string {
  return (value ?? '').trim().replace(/^(?:\uFEFF|\\uFEFF)/, '').trim();
}
