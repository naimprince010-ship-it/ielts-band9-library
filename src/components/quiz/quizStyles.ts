/**
 * Shared category/difficulty → brand-color mappings for the quiz flow
 * (browse cards, session intro, active session status bar). Pure
 * presentational helpers — no state, no side effects — so they're safe to
 * import from multiple quiz components without any behavior risk.
 */

export function getCategoryBadgeClass(category: string): string {
  switch (category) {
    case 'vocabulary':
      return 'border-blue-200 bg-blue-50 text-blue-700';
    case 'grammar':
      return 'border-violet-200 bg-violet-50 text-violet-700';
    case 'writing':
      return 'border-emerald-200 bg-emerald-50 text-emerald-700';
    case 'speaking':
      return 'border-amber-200 bg-amber-50 text-amber-700';
    default:
      return 'border-slate-200 bg-slate-100 text-slate-700';
  }
}

export function getDifficultyBadgeClass(difficulty: string): string {
  switch (difficulty) {
    case 'beginner':
      return 'border-emerald-200 bg-emerald-50 text-emerald-700';
    case 'intermediate':
      return 'border-amber-200 bg-amber-50 text-amber-700';
    case 'advanced':
      return 'border-rose-200 bg-rose-50 text-rose-700';
    default:
      return 'border-slate-200 bg-slate-100 text-slate-700';
  }
}
