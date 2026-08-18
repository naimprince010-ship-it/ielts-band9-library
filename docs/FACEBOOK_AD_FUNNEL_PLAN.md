# Facebook Ad to Premium Funnel

Owner: IELTS Tree
Status: Implementation complete; production configuration and campaign launch remain
Primary funnel: Facebook Ad -> campaign landing -> account -> plan -> bKash -> approval -> premium dashboard

## Delivery checklist

- [x] Audit current auth, pricing, payment, premium and route behavior.
- [x] Define a reusable attribution and safe return-path contract.
- [x] Add campaign-specific landing route and initial conversion events.
- [x] Preserve destination, offer and attribution through email signup/login.
- [x] Preserve destination through Google OAuth callback.
- [x] Preserve selected plan through pricing and authentication.
- [x] Move payment creation to a server-validated API.
- [x] Add payment request status route with pending/approved/rejected states.
- [x] Add secure payment schema migration, grants and RLS policies.
- [x] Redirect approved users to the campaign-relevant first action.
- [x] Add onboarding for first login.
- [x] Add consent-safe Meta Pixel configuration and funnel events.
- [x] Add admin operational and campaign-link documentation.
- [x] Add regression tests and complete desktop/mobile QA.
- [x] Run typecheck, tests, production build and deploy.

## Canonical campaign links

- Full Mock: `/offer/full-mock-test?utm_source=facebook&utm_medium=paid_social&utm_campaign=full_mock_launch`
- Vocabulary: `/offer/vocabulary-mastery?utm_source=facebook&utm_medium=paid_social&utm_campaign=vocabulary_launch`
- Grammar: `/offer/grammar-upgrade?utm_source=facebook&utm_medium=paid_social&utm_campaign=grammar_launch`
- General: `/offer/ielts-band-7?utm_source=facebook&utm_medium=paid_social&utm_campaign=band7_launch`

## Required conversion events

1. `ad_landing_view`
2. `signup_started`
3. `signup_completed`
4. `login_completed`
5. `plan_selected`
6. `payment_started`
7. `payment_submitted`
8. `payment_approved`
9. `lesson_started`
10. `mock_test_started`

## Screen-by-screen journey

1. Facebook ad opens one of the canonical `/offer/:campaign` links.
2. The landing page records first-touch UTM data and explains one focused offer.
3. A logged-out visitor is sent to signup with the original destination preserved.
4. Email signup returns through login; Google signup/login returns through `/auth/callback`.
5. The learner completes onboarding and is sent to the intended lesson, mock, or pricing page.
6. Pricing preserves the selected plan and validated coupon through authentication.
7. Payment submission goes only through `/api/create-payment-request`; the server verifies the user, package price, course price, coupon and transaction format.
8. The learner lands on `/payment/status/:requestId`, which polls pending/approved/rejected status.
9. Staff review the request in Admin > Payments. Approval activates Premium access.
10. The approved CTA performs a full page load to refresh the user profile, then returns the learner to the campaign-relevant action.

## Payment operations

- Review pending requests at least every business hour during active campaigns.
- Verify bKash sender number, transaction ID and the exact discounted amount before approval.
- Never approve the same transaction ID twice; the database unique constraint also blocks duplicate submission.
- Reject mismatched payments with an actionable admin note and direct the learner back to Pricing.
- Browser clients can only read their own payment requests. Inserts and staff updates use trusted server/admin paths.

## Production configuration

- Add `VITE_META_PIXEL_ID` in Vercel Production only after the Meta Pixel is created. Without it, the consent banner works but no Meta script is loaded.
- In Supabase Auth URL Configuration, keep the production site URL and allow `https://www.ieltstree.com/auth/callback`; keep the localhost callback only for development.
- Confirm these Vercel secrets remain present: `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`.
- Test all four canonical links in an incognito browser before publishing ads.
- External payment-approved email/SMS is not enabled; the in-app status page is the current learner notification channel.

## Launch QA

- [ ] Add the real `VITE_META_PIXEL_ID` to Vercel.
- [ ] Confirm production Google OAuth callback allow-list.
- [ ] Submit and approve one real low-value internal bKash test transaction.
- [ ] Verify Meta Test Events after granting marketing consent.
- [ ] Publish ads only after the production smoke test passes.
