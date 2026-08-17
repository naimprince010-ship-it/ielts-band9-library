import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Toaster } from '@/components/ui/sonner';
import { AuthProvider } from '@/contexts/AuthContext';
import { LessonProvider } from '@/contexts/LessonContext';
import { ProgressProvider } from '@/contexts/ProgressContext';
import { NavProvider } from '@/contexts/NavContext';
import { Layout } from '@/components/layout/Layout';
import { useSiteSettings } from '@/hooks/useSiteSettings';
import { PageTitleManager } from '@/components/layout/PageTitleManager';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import './App.css';

// Lazy load pages
const HomePage = lazy(() => import('@/pages/HomePage').then(module => ({ default: module.HomePage })));
const LibraryPage = lazy(() => import('@/pages/LibraryPage').then(module => ({ default: module.LibraryPage })));
const LessonPage = lazy(() => import('@/pages/LessonPage').then(module => ({ default: module.LessonPage })));
const LoginPage = lazy(() => import('@/pages/LoginPage').then(module => ({ default: module.LoginPage })));
const SignupPage = lazy(() => import('@/pages/SignupPage').then(module => ({ default: module.SignupPage })));
const PricingPage = lazy(() => import('@/pages/PricingPage').then(module => ({ default: module.PricingPage })));
const BookmarksPage = lazy(() => import('@/pages/BookmarksPage').then(module => ({ default: module.BookmarksPage })));
const AdminPage = lazy(() => import('@/pages/AdminPage').then(module => ({ default: module.AdminPage })));
const ForgotPasswordPage = lazy(() => import('@/pages/ForgotPasswordPage').then(module => ({ default: module.ForgotPasswordPage })));
const ResetPasswordPage = lazy(() => import('@/pages/ResetPasswordPage').then(module => ({ default: module.ResetPasswordPage })));
const AuthCallbackPage = lazy(() => import('@/pages/AuthCallbackPage').then(module => ({ default: module.AuthCallbackPage })));
const PaymentPage = lazy(() => import('@/pages/PaymentPage').then(module => ({ default: module.PaymentPage })));
const ProfilePage = lazy(() => import('@/pages/ProfilePage').then(module => ({ default: module.ProfilePage })));
const QuizPage = lazy(() => import('@/pages/QuizPage').then(module => ({ default: module.QuizPage })));
const DiagnosticTestPage = lazy(() => import('@/pages/DiagnosticTestPage'));
const FlashcardsPage = lazy(() => import('@/pages/FlashcardsPage'));
const SpeakingPracticePage = lazy(() => import('@/pages/SpeakingPracticePage'));
const WritingCheckerPage = lazy(() => import('@/pages/WritingCheckerPage'));
const AchievementsPage = lazy(() => import('@/pages/AchievementsPage'));
const ReadingPracticePage = lazy(() => import('@/pages/ReadingPracticePage'));
const ProgressDashboardPage = lazy(() => import('@/pages/ProgressDashboardPage'));
const DashboardPage = lazy(() => import('@/pages/DashboardPage'));
const PracticeHubPage = lazy(() => import('@/pages/PracticeHubPage'));
const MockTestPage = lazy(() => import('@/pages/MockTestPage'));
const FullMockTestPage = lazy(() => import('@/pages/FullMockTestPage'));
const CertificatePage = lazy(() => import('@/pages/CertificatePage'));
const GrammarExercisesPage = lazy(() => import('@/pages/GrammarExercisesPage'));
const EssayBankPage = lazy(() => import('@/pages/EssayBankPage'));
const DailyStudyPlanPage = lazy(() => import('@/pages/DailyStudyPlanPage'));
const CollectionsPage = lazy(() => import('@/pages/CollectionsPage'));
const CollectionDetailPage = lazy(() => import('@/pages/CollectionDetailPage'));
const FAQPage = lazy(() => import('@/pages/FAQPage'));
const ContactPage = lazy(() => import('@/pages/ContactPage'));
const TermsPage = lazy(() => import('@/pages/TermsPage'));
const PrivacyPage = lazy(() => import('@/pages/PrivacyPage'));
const NaturalGrammarPage = lazy(() => import('@/pages/NaturalGrammarPage'));
const ReadingTestPage = lazy(() => import('@/pages/ReadingTestPage'));
const WritingTestPage = lazy(() => import('@/pages/WritingTestPage'));
const ListeningTestPage = lazy(() => import('@/pages/ListeningTestPage'));
const SpeakingTestPage = lazy(() => import('@/pages/SpeakingTestPage'));
const ResultDashboardPage = lazy(() => import('@/pages/ResultDashboardPage'));
const FullMockAttemptDetailPage = lazy(() => import('@/pages/FullMockAttemptDetailPage'));
const CoursesPage = lazy(() => import('@/pages/CoursesPage').then(module => ({ default: module.CoursesPage })));
const CourseDetailPage = lazy(() => import('@/pages/CourseDetailPage').then(module => ({ default: module.CourseDetailPage })));
const TypingPracticePage = lazy(() => import('@/pages/TypingPracticePage'));
const ReadingPaperPreviewPage = import.meta.env.DEV ? lazy(() => import('@/pages/ReadingPaperPreviewPage')) : null;
const ListeningPaperPreviewPage = import.meta.env.DEV ? lazy(() => import('@/pages/ListeningPaperPreviewPage')) : null;
const WritingPaperPreviewPage = import.meta.env.DEV ? lazy(() => import('@/pages/WritingPaperPreviewPage')) : null;
const SpeakingPaperPreviewPage = import.meta.env.DEV ? lazy(() => import('@/pages/SpeakingPaperPreviewPage')) : null;

function LoadingSpinner() {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Loading page"
      className="min-h-screen flex items-center justify-center bg-background"
    >
      <div className="animate-spin rounded-full h-10 w-10 border-2 border-muted border-t-foreground" aria-hidden="true" />
      <span className="sr-only">Loading…</span>
    </div>
  );
}

function RouteErrorFallback({ error, resetErrorBoundary }: { error: Error; resetErrorBoundary: () => void }) {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 text-center">
      <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mb-4">
        <svg className="w-8 h-8 text-destructive" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
            d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
        </svg>
      </div>
      <h2 className="text-xl font-bold text-foreground mb-2">Page failed to load</h2>
      <p className="text-muted-foreground mb-6 max-w-sm">
        {import.meta.env.DEV ? error.message : 'An unexpected error occurred on this page.'}
      </p>
      <div className="flex gap-3">
        <button
          onClick={resetErrorBoundary}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 transition-colors"
        >
          Try Again
        </button>
        <button
          onClick={() => { window.location.href = '/'; }}
          className="px-4 py-2 bg-muted text-foreground rounded-md text-sm font-medium hover:bg-muted/80 transition-colors"
        >
          Go Home
        </button>
      </div>
    </div>
  );
}

function AppInner() {
  useSiteSettings();
  return null;
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <ProgressProvider>
          <LessonProvider>
            <NavProvider>
              <AppInner />
              <PageTitleManager />
              <ErrorBoundary FallbackComponent={RouteErrorFallback}>
              <Suspense fallback={<LoadingSpinner />}>
                <Routes>
                  {/* Auth pages without Layout */}
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/signup" element={<SignupPage />} />
                  <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                  <Route path="/reset-password" element={<ResetPasswordPage />} />
                  <Route path="/auth/callback" element={<AuthCallbackPage />} />
                  <Route path="/payment" element={
                    <ProtectedRoute requireAuth>
                      <PaymentPage />
                    </ProtectedRoute>
                  } />
                  <Route path="/admin" element={
                    <ProtectedRoute requireAdmin>
                      <AdminPage />
                    </ProtectedRoute>
                  } />
                  <Route path="/profile" element={
                    <ProtectedRoute requireAuth>
                      <ProfilePage />
                    </ProtectedRoute>
                  } />

                  {/* Main pages with Layout */}
                  <Route path="/" element={<Layout><HomePage /></Layout>} />
                  <Route path="/dashboard" element={
                    <ProtectedRoute requireAuth>
                      <Layout mode="focused"><DashboardPage /></Layout>
                    </ProtectedRoute>
                  } />
                  <Route path="/vocabulary" element={<Layout><LibraryPage type="vocabulary" /></Layout>} />
                  <Route path="/practice" element={
                    <ProtectedRoute requireAuth>
                      <Layout mode="focused"><PracticeHubPage /></Layout>
                    </ProtectedRoute>
                  } />
                  <Route path="/grammar" element={<Layout><LibraryPage type="grammar" /></Layout>} />
                  <Route path="/writing" element={<Layout><LibraryPage type="writing" /></Layout>} />
                  <Route path="/speaking" element={<Layout><LibraryPage type="speaking" /></Layout>} />
                  <Route path="/lesson/:slug" element={<Layout><LessonPage /></Layout>} />
                  <Route path="/pricing" element={<Layout><PricingPage /></Layout>} />
                  <Route path="/bookmarks" element={
                    <ProtectedRoute requireAuth>
                      <Layout><BookmarksPage /></Layout>
                    </ProtectedRoute>
                  } />
                  <Route path="/courses" element={<Layout><CoursesPage /></Layout>} />
                  <Route path="/courses/:courseId" element={<Layout><CourseDetailPage /></Layout>} />
                  <Route path="/quiz" element={
                    <ProtectedRoute requireAuth>
                      <Layout mode="focused"><QuizPage /></Layout>
                    </ProtectedRoute>
                  } />
                  <Route path="/quiz/:quizId" element={
                    <ProtectedRoute requireAuth>
                      <Layout mode="focused"><QuizPage /></Layout>
                    </ProtectedRoute>
                  } />
                  <Route path="/diagnostic" element={
                    <ProtectedRoute requireAuth>
                      <Layout mode="focused"><DiagnosticTestPage /></Layout>
                    </ProtectedRoute>
                  } />
                  <Route path="/flashcards" element={
                    <ProtectedRoute requireAuth>
                      <Layout mode="tool"><FlashcardsPage /></Layout>
                    </ProtectedRoute>
                  } />
                  <Route path="/speaking-practice" element={
                    <ProtectedRoute requireAuth>
                      <Layout mode="focused"><SpeakingPracticePage /></Layout>
                    </ProtectedRoute>
                  } />
                  <Route path="/writing-checker" element={
                    <ProtectedRoute requireAuth>
                      <Layout mode="focused"><WritingCheckerPage /></Layout>
                    </ProtectedRoute>
                  } />
                  <Route path="/achievements" element={
                    <ProtectedRoute requireAuth>
                      <Layout mode="focused"><AchievementsPage /></Layout>
                    </ProtectedRoute>
                  } />
                  <Route path="/reading-practice" element={
                    <ProtectedRoute requireAuth>
                      <Layout mode="focused"><ReadingPracticePage /></Layout>
                    </ProtectedRoute>
                  } />
                  <Route path="/practice/typing" element={
                    <ProtectedRoute requireAuth>
                      <Layout mode="focused"><TypingPracticePage /></Layout>
                    </ProtectedRoute>
                  } />
                  <Route path="/progress" element={
                    <ProtectedRoute requireAuth>
                      <Layout mode="focused"><ProgressDashboardPage /></Layout>
                    </ProtectedRoute>
                  } />
                  <Route path="/mock-test" element={
                    <ProtectedRoute requireAuth>
                      <Layout><MockTestPage /></Layout>
                    </ProtectedRoute>
                  } />
                  {ReadingPaperPreviewPage && <Route path="/__dev/reading-paper" element={<ReadingPaperPreviewPage />} />}
                  {ListeningPaperPreviewPage && <Route path="/__dev/listening-paper" element={<ListeningPaperPreviewPage />} />}
                  {WritingPaperPreviewPage && <Route path="/__dev/writing-paper" element={<WritingPaperPreviewPage />} />}
                  {SpeakingPaperPreviewPage && <Route path="/__dev/speaking-paper" element={<SpeakingPaperPreviewPage />} />}
                  <Route path="/full-mock-test" element={
                    <ProtectedRoute requireAuth>
                      <Layout mode="exam"><FullMockTestPage /></Layout>
                    </ProtectedRoute>
                  } />
                  <Route path="/certificate" element={
                    <ProtectedRoute requireAuth>
                      <Layout><CertificatePage /></Layout>
                    </ProtectedRoute>
                  } />
                  <Route path="/grammar-exercises" element={
                    <ProtectedRoute requireAuth>
                      <Layout><GrammarExercisesPage /></Layout>
                    </ProtectedRoute>
                  } />
                  <Route path="/essay-bank" element={
                    <ProtectedRoute requireAuth>
                      <Layout><EssayBankPage /></Layout>
                    </ProtectedRoute>
                  } />
                  <Route path="/daily-plan" element={
                    <ProtectedRoute requireAuth>
                      <Layout><DailyStudyPlanPage /></Layout>
                    </ProtectedRoute>
                  } />
                  <Route path="/collections" element={
                    <ProtectedRoute requireAuth>
                      <Layout><CollectionsPage /></Layout>
                    </ProtectedRoute>
                  } />
                  <Route path="/collections/:collectionId" element={
                    <ProtectedRoute requireAuth>
                      <Layout><CollectionDetailPage /></Layout>
                    </ProtectedRoute>
                  } />
                  <Route path="/faq" element={<Layout><FAQPage /></Layout>} />
                  <Route path="/contact" element={<Layout><ContactPage /></Layout>} />
                  <Route path="/terms" element={<Layout><TermsPage /></Layout>} />
                  <Route path="/privacy" element={<Layout><PrivacyPage /></Layout>} />
                  <Route path="/natural-grammar" element={<Layout><NaturalGrammarPage /></Layout>} />
                  <Route path="/results" element={
                    <ProtectedRoute requireAuth>
                      <Layout><ResultDashboardPage /></Layout>
                    </ProtectedRoute>
                  } />

                  {/* Test pages — require login */}
                  <Route path="/results/:attemptId" element={
                    <ProtectedRoute requireAuth>
                      <Layout><FullMockAttemptDetailPage /></Layout>
                    </ProtectedRoute>
                  } />
                  <Route path="/reading-test" element={
                    <ProtectedRoute requireAuth>
                      <Layout mode="exam"><ReadingTestPage /></Layout>
                    </ProtectedRoute>
                  } />
                  <Route path="/writing-test" element={
                    <ProtectedRoute requireAuth>
                      <Layout mode="exam"><WritingTestPage /></Layout>
                    </ProtectedRoute>
                  } />
                  <Route path="/listening-test" element={
                    <ProtectedRoute requireAuth>
                      <Layout mode="exam"><ListeningTestPage /></Layout>
                    </ProtectedRoute>
                  } />
                  <Route path="/speaking-test" element={
                    <ProtectedRoute requireAuth>
                      <Layout mode="exam"><SpeakingTestPage /></Layout>
                    </ProtectedRoute>
                  } />

                  {/* Catch all - redirect to home */}
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </Suspense>
              </ErrorBoundary>
            </NavProvider>
          </LessonProvider>
        </ProgressProvider>
      </AuthProvider>
      <Toaster position="bottom-center" richColors />
    </Router>
  );
}

export default App;
