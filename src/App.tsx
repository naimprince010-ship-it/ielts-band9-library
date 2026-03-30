import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { AuthProvider } from '@/contexts/AuthContext';
import { LessonProvider } from '@/contexts/LessonContext';
import { ProgressProvider } from '@/contexts/ProgressContext';
import { Layout } from '@/components/layout/Layout';
import './App.css';

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
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/signup" element={<SignupPage />} />
                        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                                    <Route path="/reset-password" element={<ResetPasswordPage />} />
                        <Route path="/auth/callback" element={<AuthCallbackPage />} />
                        <Route path="/payment" element={<PaymentPage />} />
                        <Route
              path="/"
              element={
                <Layout>
                  <HomePage />
                </Layout>
              }
            />
            <Route
              path="/vocabulary"
              element={
                <Layout>
                  <LibraryPage type="vocabulary" />
                </Layout>
              }
            />
            <Route
              path="/grammar"
              element={
                <Layout>
                  <LibraryPage type="grammar" />
                </Layout>
              }
            />
            <Route
              path="/writing"
              element={
                <Layout>
                  <LibraryPage type="writing" />
                </Layout>
              }
            />
            <Route
              path="/speaking"
              element={
                <Layout>
                  <LibraryPage type="speaking" />
                </Layout>
              }
            />
            <Route
              path="/lesson/:slug"
              element={
                <Layout>
                  <LessonPage />
                </Layout>
              }
            />
            <Route
              path="/pricing"
              element={
                <Layout>
                  <PricingPage />
                </Layout>
              }
            />
            <Route
              path="/bookmarks"
              element={
                <Layout>
                  <BookmarksPage />
                </Layout>
              }
            />
                      <Route path="/admin" element={<AdminPage />} />
                                          <Route path="/profile" element={<ProfilePage />} />
                                            <Route
                                              path="/courses"
                                              element={
                                                <Layout>
                                                  <Suspense fallback={<LoadingSpinner />}>
                                                    <CoursesPage />
                                                  </Suspense>
                                                </Layout>
                                              }
                                            />
                                            <Route
                                              path="/courses/:courseId"
                                              element={
                                                <Layout>
                                                  <Suspense fallback={<LoadingSpinner />}>
                                                    <CourseDetailPage />
                                                  </Suspense>
                                                </Layout>
                                              }
                                            />
                                          <Route
                                            path="/quiz"
                                            element={
                                              <Layout>
                                                <QuizPage />
                                              </Layout>
                                            }
                                          />
                                          <Route
                                            path="/quiz/:quizId"
                                            element={
                                              <Layout>
                                                <QuizPage />
                                              </Layout>
                                            }
                                          />
                                          <Route
                                            path="/diagnostic"
                                            element={
                                              <Layout>
                                                <Suspense fallback={<LoadingSpinner />}>
                                                  <DiagnosticTestPage />
                                                </Suspense>
                                              </Layout>
                                            }
                                          />
                                          <Route
                                            path="/flashcards"
                                            element={
                                              <Layout>
                                                <Suspense fallback={<LoadingSpinner />}>
                                                  <FlashcardsPage />
                                                </Suspense>
                                              </Layout>
                                            }
                                          />
                                          <Route
                                            path="/speaking-practice"
                                            element={
                                              <Layout>
                                                <Suspense fallback={<LoadingSpinner />}>
                                                  <SpeakingPracticePage />
                                                </Suspense>
                                              </Layout>
                                            }
                                          />
                                          <Route
                                            path="/writing-checker"
                                            element={
                                              <Layout>
                                                <Suspense fallback={<LoadingSpinner />}>
                                                  <WritingCheckerPage />
                                                </Suspense>
                                              </Layout>
                                            }
                                          />
                                                                                  <Route
                                                                                    path="/achievements"
                                                                                    element={
                                                                                      <Layout>
                                                                                        <Suspense fallback={<LoadingSpinner />}>
                                                                                          <AchievementsPage />
                                                                                        </Suspense>
                                                                                      </Layout>
                                                                                    }
                                                                                  />
                                                                                                                                                                    <Route
                                                                                                                                                                      path="/reading-practice"
                                                                                                                                                                      element={
                                                                                                                                                                        <Layout>
                                                                                                                                                                          <Suspense fallback={<LoadingSpinner />}>
                                                                                                                                                                            <ReadingPracticePage />
                                                                                                                                                                          </Suspense>
                                                                                                                                                                        </Layout>
                                                                                                                                                                      }
                                                                                                                                                                    />
                                                                                                                                                                    <Route
                                                                                                                                                                      path="/practice/typing"
                                                                                                                                                                      element={
                                                                                                                                                                        <Layout>
                                                                                                                                                                          <Suspense fallback={<LoadingSpinner />}>
                                                                                                                                                                            <TypingPracticePage />
                                                                                                                                                                          </Suspense>
                                                                                                                                                                        </Layout>
                                                                                                                                                                      }
                                                                                                                                                                    />
                                                                                                                                                                    <Route
                                                                                                                                                                      path="/progress"
                                                                                    element={
                                                                                      <Layout>
                                                                                        <Suspense fallback={<LoadingSpinner />}>
                                                                                          <ProgressDashboardPage />
                                                                                        </Suspense>
                                                                                      </Layout>
                                                                                    }
                                                                                  />
                                                                                  <Route
                                                                                    path="/mock-test"
                                                                                    element={
                                                                                      <Layout>
                                                                                        <Suspense fallback={<LoadingSpinner />}>
                                                                                          <MockTestPage />
                                                                                        </Suspense>
                                                                                      </Layout>
                                                                                    }
                                                                                  />
                                                                                                                                                                  <Route
                                                                                                                                                                    path="/certificate"
                                                                                                                                                                    element={
                                                                                                                                                                      <Layout>
                                                                                                                                                                        <Suspense fallback={<LoadingSpinner />}>
                                                                                                                                                                          <CertificatePage />
                                                                                                                                                                        </Suspense>
                                                                                                                                                                      </Layout>
                                                                                                                                                                    }
                                                                                                                                                                  />
                                                                                                                                                                  <Route
                                                                                                                                                                    path="/grammar-exercises"
                                                                                                                                                                    element={
                                                                                                                                                                      <Layout>
                                                                                                                                                                        <Suspense fallback={<LoadingSpinner />}>
                                                                                                                                                                          <GrammarExercisesPage />
                                                                                                                                                                        </Suspense>
                                                                                                                                                                      </Layout>
                                                                                                                                                                    }
                                                                                                                                                                  />
                                                                                                                                                                                                                                                                                                                                  <Route
                                                                                                                                                                                                                                                                                                                                    path="/essay-bank"
                                                                                                                                                                                                                                                                                                                                    element={
                                                                                                                                                                                                                                                                                                                                      <Layout>
                                                                                                                                                                                                                                                                                                                                        <Suspense fallback={<LoadingSpinner />}>
                                                                                                                                                                                                                                                                                                                                          <EssayBankPage />
                                                                                                                                                                                                                                                                                                                                        </Suspense>
                                                                                                                                                                                                                                                                                                                                      </Layout>
                                                                                                                                                                                                                                                                                                                                    }
                                                                                                                                                                                                                                                                                                                                  />
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  <Route
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    path="/daily-plan"
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    element={
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      <Layout>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        <Suspense fallback={<LoadingSpinner />}>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          <DailyStudyPlanPage />
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        </Suspense>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      </Layout>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    }
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  />
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  <Route
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    path="/collections"
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    element={
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      <Layout>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        <Suspense fallback={<LoadingSpinner />}>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          <CollectionsPage />
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        </Suspense>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      </Layout>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    }
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  />
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  <Route
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    path="/collections/:collectionId"
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    element={
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      <Layout>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        <Suspense fallback={<LoadingSpinner />}>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          <CollectionDetailPage />
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        </Suspense>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      </Layout>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    }
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  />
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                <Route path="/faq" element={<Layout><Suspense fallback={<LoadingSpinner />}><FAQPage /></Suspense></Layout>} />
            <Route path="/contact" element={<Layout><Suspense fallback={<LoadingSpinner />}><ContactPage /></Suspense></Layout>} />
            <Route path="/terms" element={<Layout><Suspense fallback={<LoadingSpinner />}><TermsPage /></Suspense></Layout>} />
                                                <Route path="/privacy" element={<Layout><Suspense fallback={<LoadingSpinner />}><PrivacyPage /></Suspense></Layout>} />
                                                                                                <Route
                                                                                                  path="/grammar/natural"
                                                                                                  element={
                                                                                                    <Layout>
                                                                                                      <Suspense fallback={<LoadingSpinner />}>
                                                                                                        <NaturalGrammarPage />
                                                                                                      </Suspense>
                                                                                                    </Layout>
                                                                                                  }
                                                                                                />
                                                                                                                                                                                                <Route
                                                                                                                                                                                                  path="/reading-test"
                                                                                                                                                                                                  element={
                                                                                                                                                                                                    <Suspense fallback={<LoadingSpinner />}>
                                                                                                                                                                                                      <ReadingTestPage />
                                                                                                                                                                                                    </Suspense>
                                                                                                                                                                                                  }
                                                                                                                                                                                                />
                                                                                                                                                                                                <Route
                                                                                                                                                                                                  path="/writing-test"
                                                                                                                                                                                                  element={
                                                                                                                                                                                                    <Suspense fallback={<LoadingSpinner />}>
                                                                                                                                                                                                      <WritingTestPage />
                                                                                                                                                                                                    </Suspense>
                                                                                                                                                                                                  }
                                                                                                                                                                                                />
                                                                                                                                                                                                <Route
                                                                                                                                                                                                  path="/listening-test"
                                                                                                                                                                                                  element={
                                                                                                                                                                                                    <Suspense fallback={<LoadingSpinner />}>
                                                                                                                                                                                                      <ListeningTestPage />
                                                                                                                                                                                                    </Suspense>
                                                                                                                                                                                                  }
                                                                                                                                                                                                />
                                                                                                                                                                                                <Route
                                                                                                                                                                                                  path="/speaking-test"
                                                                                                                                                                                                  element={
                                                                                                                                                                                                    <Suspense fallback={<LoadingSpinner />}>
                                                                                                                                                                                                      <SpeakingTestPage />
                                                                                                                                                                                                    </Suspense>
                                                                                                                                                                                                  }
                                                                                                                                                                                                />
                                                                                                                                                                                                <Route
                                                                                                                                                                                                  path="/results"
                                                                                                                                                                                                  element={
                                                                                                                                                                                                    <Suspense fallback={<LoadingSpinner />}>
                                                                                                                                                                                                      <ResultDashboardPage />
                                                                                                                                                                                                    </Suspense>
                                                                                                                                                                                                  }
                                                                                                                                                                                                />
                                                                                                                                                                                                <Route path="/daily-study-plan" element={<Navigate to="/daily-plan" replace />} />
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
