import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { AuthProvider } from '@/contexts/AuthContext';
import { LessonProvider } from '@/contexts/LessonContext';
import { ProgressProvider } from '@/contexts/ProgressContext';
import { Layout } from '@/components/layout/Layout';
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
const MockTestPage = lazy(() => import('@/pages/MockTestPage'));
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
const FullMockTestPage = lazy(() => import('@/pages/FullMockTestPage'));
const CoursesPage = lazy(() => import('@/pages/CoursesPage').then(module => ({ default: module.CoursesPage })));
const CourseDetailPage = lazy(() => import('@/pages/CourseDetailPage').then(module => ({ default: module.CourseDetailPage })));
const TypingPracticePage = lazy(() => import('@/pages/TypingPracticePage'));

function LoadingSpinner() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="animate-spin rounded-full h-10 w-10 border-2 border-muted border-t-foreground"></div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <ProgressProvider>
          <LessonProvider>
            <Suspense fallback={<LoadingSpinner />}>
              <Routes>
                {/* Auth pages without Layout */}
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                <Route path="/reset-password" element={<ResetPasswordPage />} />
                <Route path="/auth/callback" element={<AuthCallbackPage />} />
                <Route path="/payment" element={<PaymentPage />} />
                <Route path="/admin" element={<AdminPage />} />
                <Route path="/profile" element={<ProfilePage />} />

                {/* Main pages with Layout */}
                <Route path="/" element={<Layout><HomePage /></Layout>} />
                <Route path="/vocabulary" element={<Layout><LibraryPage type="vocabulary" /></Layout>} />
                <Route path="/grammar" element={<Layout><LibraryPage type="grammar" /></Layout>} />
                <Route path="/writing" element={<Layout><LibraryPage type="writing" /></Layout>} />
                <Route path="/speaking" element={<Layout><LibraryPage type="speaking" /></Layout>} />
                <Route path="/lesson/:slug" element={<Layout><LessonPage /></Layout>} />
                <Route path="/pricing" element={<Layout><PricingPage /></Layout>} />
                <Route path="/bookmarks" element={<Layout><BookmarksPage /></Layout>} />
                <Route path="/courses" element={<Layout><CoursesPage /></Layout>} />
                <Route path="/courses/:courseId" element={<Layout><CourseDetailPage /></Layout>} />
                <Route path="/quiz" element={<Layout><QuizPage /></Layout>} />
                <Route path="/quiz/:quizId" element={<Layout><QuizPage /></Layout>} />
                <Route path="/diagnostic" element={<Layout><DiagnosticTestPage /></Layout>} />
                <Route path="/flashcards" element={<Layout><FlashcardsPage /></Layout>} />
                <Route path="/speaking-practice" element={<Layout><SpeakingPracticePage /></Layout>} />
                <Route path="/writing-checker" element={<Layout><WritingCheckerPage /></Layout>} />
                <Route path="/achievements" element={<Layout><AchievementsPage /></Layout>} />
                <Route path="/reading-practice" element={<Layout><ReadingPracticePage /></Layout>} />
                <Route path="/practice/typing" element={<Layout><TypingPracticePage /></Layout>} />
                <Route path="/progress" element={<Layout><ProgressDashboardPage /></Layout>} />
                <Route path="/mock-test" element={<Layout><MockTestPage /></Layout>} />
                <Route path="/full-mock-test" element={<Layout><FullMockTestPage /></Layout>} />
                <Route path="/certificate" element={<Layout><CertificatePage /></Layout>} />
                <Route path="/grammar-exercises" element={<Layout><GrammarExercisesPage /></Layout>} />
                <Route path="/essay-bank" element={<Layout><EssayBankPage /></Layout>} />
                <Route path="/daily-plan" element={<Layout><DailyStudyPlanPage /></Layout>} />
                <Route path="/collections" element={<Layout><CollectionsPage /></Layout>} />
                <Route path="/collections/:collectionId" element={<Layout><CollectionDetailPage /></Layout>} />
                <Route path="/faq" element={<Layout><FAQPage /></Layout>} />
                <Route path="/contact" element={<Layout><ContactPage /></Layout>} />
                <Route path="/terms" element={<Layout><TermsPage /></Layout>} />
                <Route path="/privacy" element={<Layout><PrivacyPage /></Layout>} />
                <Route path="/natural-grammar" element={<Layout><NaturalGrammarPage /></Layout>} />
                <Route path="/results" element={<Layout><ResultDashboardPage /></Layout>} />

                {/* Test pages with Layout */}
                <Route path="/reading-test" element={<Layout><ReadingTestPage /></Layout>} />
                <Route path="/writing-test" element={<Layout><WritingTestPage /></Layout>} />
                <Route path="/listening-test" element={<Layout><ListeningTestPage /></Layout>} />
                <Route path="/speaking-test" element={<Layout><SpeakingTestPage /></Layout>} />

                {/* Catch all - redirect to home */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Suspense>
          </LessonProvider>
        </ProgressProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
