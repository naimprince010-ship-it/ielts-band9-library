import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  /** Requires user to be logged in */
  requireAuth?: boolean;
  /** Requires user to be admin or instructor */
  requireAdmin?: boolean;
  /** Requires active premium subscription */
  requirePremium?: boolean;
  /** Redirect destination when access is denied (default: /login) */
  redirectTo?: string;
}

/**
 * Centralized route guard.
 *
 * Usage in App.tsx:
 *   <Route path="/profile" element={<ProtectedRoute requireAuth><ProfilePage /></ProtectedRoute>} />
 *   <Route path="/admin"   element={<ProtectedRoute requireAdmin><AdminPage /></ProtectedRoute>} />
 */
export function ProtectedRoute({
  children,
  requireAuth = false,
  requireAdmin = false,
  requirePremium = false,
  redirectTo,
}: ProtectedRouteProps) {
  const { user, isAdmin, isInstructor, isPremium, loading } = useAuth();
  const location = useLocation();

  // Still initialising — show nothing (avoids flash of redirect)
  if (loading) return null;

  // Must be logged in
  if ((requireAuth || requireAdmin || requirePremium) && !user) {
    return (
      <Navigate
        to={redirectTo ?? '/login'}
        state={{ from: location }}
        replace
      />
    );
  }

  // Must be admin or instructor
  if (requireAdmin && !isAdmin && !isInstructor) {
    return <Navigate to="/" replace />;
  }

  // Must be premium
  if (requirePremium && !isPremium) {
    return (
      <Navigate
        to={redirectTo ?? '/pricing'}
        state={{ from: location }}
        replace
      />
    );
  }

  return <>{children}</>;
}
