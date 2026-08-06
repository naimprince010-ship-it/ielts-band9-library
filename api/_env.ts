export function cleanEnv(value: string | undefined): string {
  return (value ?? '').replace(/^\uFEFF/, '').trim();
}
