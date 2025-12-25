import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '@/contexts/AuthContext';
import { LessonProvider } from '@/contexts/LessonContext';
import { Layout } from '@/components/layout/Layout';
import { HomePage } from '@/pages/HomePage';
import { LibraryPage } from '@/pages/LibraryPage';
import { LessonPage } from '@/pages/LessonPage';
import { LoginPage } from '@/pages/LoginPage';
import { SignupPage } from '@/pages/SignupPage';
import { PricingPage } from '@/pages/PricingPage';
import { BookmarksPage } from '@/pages/BookmarksPage';
import { AdminPage } from '@/pages/AdminPage';
import { ForgotPasswordPage } from '@/pages/ForgotPasswordPage';
import { ResetPasswordPage } from '@/pages/ResetPasswordPage';
import { PaymentPage } from '@/pages/PaymentPage';
import { ProfilePage } from '@/pages/ProfilePage';
import './App.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <LessonProvider>
          <Routes>
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/signup" element={<SignupPage />} />
                        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                                    <Route path="/reset-password" element={<ResetPasswordPage />} />
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
                      <Route
                        path="/admin"
                        element={
                          <Layout>
                            <AdminPage />
                          </Layout>
                        }
                      />
                      <Route path="/profile" element={<ProfilePage />} />
                    </Routes>
        </LessonProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
