# Logged-Out User QA Checklist

## Scope
This checklist validates what an unauthenticated (logged-out) user can view and which routes must redirect to login.

## Preconditions
1. User session is cleared (no active login).
2. App is running normally.
3. Test on desktop and mobile viewport.

## Priority Guide
- P0: Must-pass auth/security behavior
- P1: Core UX behavior
- P2: Secondary UX behavior

## Test Cases

| ID | Priority | Given | When | Then |
|---|---|---|---|---|
| TC-001 | P1 | User is logged out | Open `/` | Home page loads and Sign In/Get Started are visible |
| TC-002 | P1 | User is logged out | Open `/vocabulary` | Page loads without redirect |
| TC-003 | P1 | User is logged out | Open `/grammar` | Page loads without redirect |
| TC-004 | P1 | User is logged out | Open `/writing` | Page loads without redirect |
| TC-005 | P1 | User is logged out | Open `/speaking` | Page loads without redirect |
| TC-006 | P1 | User is logged out | Open `/lesson/:slug` | Lesson page loads without auth redirect |
| TC-007 | P1 | User is logged out | Open `/pricing` | Pricing page loads |
| TC-008 | P1 | User is logged out | Open `/courses` and `/courses/:courseId` | Both pages load |
| TC-009 | P0 | User is logged out | Open `/practice` | Redirect to `/login` |
| TC-010 | P0 | User is logged out | Open `/flashcards` | Redirect to `/login` |
| TC-011 | P0 | User is logged out | Open `/speaking-practice` | Redirect to `/login` |
| TC-012 | P0 | User is logged out | Open `/writing-checker` | Redirect to `/login` |
| TC-013 | P0 | User is logged out | Open `/mock-test` | Redirect to `/login` |
| TC-014 | P0 | User is logged out | Open `/grammar-exercises` | Redirect to `/login` |
| TC-015 | P0 | User is logged out | Open `/full-mock-test` | Redirect to `/login` |
| TC-016 | P0 | User is logged out | Open `/dashboard` | Redirect to `/login` |
| TC-017 | P0 | User is logged out | Open `/profile` | Redirect to `/login` |
| TC-018 | P0 | User is logged out | Open `/bookmarks` | Redirect to `/login` |
| TC-019 | P0 | User is logged out | Open `/quiz` and `/quiz/:quizId` | Redirect to `/login` |
| TC-020 | P0 | User is logged out | Open `/diagnostic` | Redirect to `/login` |
| TC-021 | P0 | User is logged out | Open `/progress` | Redirect to `/login` |
| TC-022 | P0 | User is logged out | Open `/achievements` | Redirect to `/login` |
| TC-023 | P0 | User is logged out | Open `/results` and `/results/:attemptId` | Redirect to `/login` |
| TC-024 | P0 | User is logged out | Open `/reading-test`, `/writing-test`, `/listening-test`, `/speaking-test` | Redirect to `/login` |
| TC-025 | P0 | User is logged out | Open `/payment` | Redirect to `/login` |
| TC-026 | P0 | User is logged out | Open `/certificate` | Redirect to `/login` |
| TC-027 | P0 | User is logged out | Open `/admin` | Redirect to `/login` |
| TC-028 | P2 | User is logged out on mobile | Check bottom navigation | Login label appears instead of Profile |
| TC-029 | P1 | User is logged out | Open `/login`, `/signup`, `/forgot-password`, `/reset-password` | Auth pages open normally |
| TC-030 | P0 | User is logged out | Open `/essay-bank` | Redirect to `/login` |
| TC-031 | P0 | User is logged out | Open `/daily-plan` | Redirect to `/login` |
| TC-032 | P0 | User is logged out | Open `/collections` and `/collections/:collectionId` | Redirect to `/login` |
| TC-033 | P0 | User is logged out | Open `/reading-practice` and `/practice/typing` | Redirect to `/login` |
| TC-034 | P1 | User is logged out | Open an invalid route | App redirects to `/` |

## Execution Notes
1. Record actual result as Pass/Fail for each test case.
2. For failures, capture route, screenshot, and redirect target.
3. If a protected route does not redirect to `/login`, treat as P0 defect.
