# Full Mock Test Production Plan

Status: **Code hardening in progress; production release blocked by content, database, and deployment gates.**

## Release gates

### 1. Application correctness

- [x] Require 4 Listening sections and exactly 40 questions.
- [x] Require 3 Reading passages and exactly 40 questions.
- [x] Require exactly 2 Writing tasks and 3 Speaking parts.
- [x] Fall back safely when the Supabase query fails.
- [x] Warn admins when fallback sample content is active.
- [x] Preserve answers and protect active attempts from accidental reload.
- [x] Add automated readiness tests.
- [ ] Add browser E2E coverage for login, all four sections, result save, attempt history, and retake.
  - The E2E script (`scripts/e2e-full-mock-complete-journey.mjs`) now includes the retake flow, but has not been executed successfully against a live environment.

### 2. Content readiness

- [ ] Publish at least 3 complete Listening tests, each with 4 sections, 40 questions, transcripts, and real section audio.
- [ ] Publish at least 3 complete Reading tests, each with 3 passages and 40 questions.
- [ ] Ensure every Academic Writing Task 1 has a renderable visual.
- [ ] Complete a human editorial review of answers, distractors, spelling variants, and scoring.

Current live-data baseline (2026-08-02):

| Module | Published | Full-mock usable |
|---|---:|---:|
| Listening | 4 | 1 |
| Reading | 4 | 1 |
| Writing | 4 | 4 |
| Speaking | 5 | 5 |

The only complete Listening set has transcripts but no real global or section audio.

### 3. Supabase readiness

- [x] Add migration constraints for allowed module types and non-empty JSON test data.
- [x] Make the migration fail clearly when invalid legacy rows exist.
- [ ] Link the repository to the production Supabase project.
- [ ] Apply and verify all pending migrations.
- [ ] Verify RLS as anonymous user, authenticated student, admin, and wrong-user result access.
- [ ] Verify speaking recording upload, read, and update policies.
- [ ] Run database security/performance advisors.

### 4. Quality and security

- [x] Production build passes.
- [x] Unit tests pass.
- [x] Lint has zero errors.
- [ ] Resolve Full Mock/Admin warnings and prioritize hook-dependency warnings.
- [ ] Upgrade React Router through a dedicated compatibility pass; current major-version fix cannot be applied safely as a blind audit fix.
- [ ] Add failure-path tests for AI feedback, transcription, storage, and result persistence.
  - [x] Result-save fallback chain (isMissingColumnError, all 4 attempts, non-retriable errors)
  - [x] Retake feedback isolation (new attempt never writes to previous attempt's row)
  - [ ] AI feedback and transcription error paths

### 5. Deployment and release

- [ ] Confirm the Vercel account/project that owns `www.ieltstree.com`.
- [ ] Configure production environment variables and API secrets in that project.
- [ ] Deploy a preview from the release branch.
- [ ] Run desktop Chrome, Android Chrome, and iPhone Safari smoke tests.
- [ ] Apply the database migration before promoting the matching frontend build.
- [ ] Promote to production and verify the deployed asset contains the readiness fixes.
- [ ] Monitor Supabase and Vercel errors during the first production test attempts.

## Production go/no-go rule

Release is **GO** only when every unchecked item in Content readiness, Supabase readiness, and Deployment and release is complete. Browser TTS may remain an emergency fallback, but it must not be the primary audio source for a production Listening mock.
