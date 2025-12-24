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
import './App.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <LessonProvider>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route element={<Layout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/vocabulary" element={<LibraryPage type="vocabulary" />} />
              <Route path="/grammar" element={<LibraryPage type="grammar" />} />
              <Route path="/lesson/:slug" element={<LessonPage />} />
              <Route path="/pricing" element={<PricingPage />} />
              <Route path="/bookmarks" element={<BookmarksPage />} />
              <Route path="/admin" element={<AdminPage />} />
            </Route>
          </Routes>
        </LessonProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
