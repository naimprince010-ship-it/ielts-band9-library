import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User as SupabaseUser, Session } from '@supabase/supabase-js';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { User, UserRole, SubscriptionStatus } from '@/types';
import { storeOAuthReturnPath } from '@/lib/funnel';

interface AuthContextType {
  user: User | null;
  supabaseUser: SupabaseUser | null;
  session: Session | null;
  loading: boolean;
  signUp: (email: string, password: string, name: string) => Promise<{ error: Error | null }>;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signInWithGoogle: (returnPath?: string) => Promise<{ error: Error | null }>;
  resetPassword: (email: string) => Promise<{ error: Error | null }>;
  updatePassword: (newPassword: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
  isAdmin: boolean;
  isInstructor: boolean;
  isPremium: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * Owner / staff emails: full access in UI even if `users.role` is not updated yet. Add more via VITE_ADMIN_EMAILS.
 * For Supabase RLS (mock_tests, etc.), duplicate new built-in addresses in `fix_users_rls_infinite_recursion.sql` → `is_admin()` allowlist array.
 */
const BUILTIN_FULL_ACCESS_EMAILS: readonly string[] = ['naimprince010@gmail.com'];

function fallbackUserFromSupabaseAuth(supabaseUserData: SupabaseUser): User {
  const userName =
    supabaseUserData.user_metadata?.full_name ||
    supabaseUserData.user_metadata?.name ||
    supabaseUserData.email?.split('@')[0] ||
    'User';
  return {
    id: supabaseUserData.id,
    email: supabaseUserData.email || '',
    name: userName,
    role: 'user',
    subscription_status: 'free',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
}

/**
 * Demo-only fallback users — only active when Supabase is NOT configured.
 * NEVER include real passwords or real production emails here.
 * Password for all demo accounts: "demo123"
 */
const DEMO_PASSWORD = 'demo123';
const DEMO_USERS: Record<string, User & { password: string }> = {
  'admin@ielts.com': {
    id: 'demo-admin-1',
    email: 'admin@ielts.com',
    name: 'Admin User',
    role: 'admin',
    subscription_status: 'premium',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    password: DEMO_PASSWORD,
  },
  'user@ielts.com': {
    id: 'demo-user-1',
    email: 'user@ielts.com',
    name: 'Demo User',
    role: 'user',
    subscription_status: 'free',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    password: DEMO_PASSWORD,
  },
  'instructor@ielts.com': {
    id: 'demo-instructor-1',
    email: 'instructor@ielts.com',
    name: 'Instructor Demo',
    role: 'instructor',
    subscription_status: 'premium',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    password: DEMO_PASSWORD,
  },
  // NOTE: Production users must authenticate via Supabase Auth.
  // Do NOT add real emails or passwords here.
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [supabaseUser, setSupabaseUser] = useState<SupabaseUser | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('demo_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error('Failed to parse stored user:', e);
        localStorage.removeItem('demo_user');
      }
    }

    if (isSupabaseConfigured() && supabase) {
      const supabaseClient = supabase;
      let initialized = false;

      const initAuth = async () => {
        try {
          const { data: { session }, error } = await supabaseClient.auth.getSession();
          if (error) {
            console.error('Failed to get session:', error);
          } else {
            setSession(session);
            setSupabaseUser(session?.user ?? null);
            if (session?.user) {
              try {
                await fetchUserProfile(session.user.id, session.user);
              } catch (profileErr) {
                console.error('Failed to load user profile on init:', profileErr);
                setUser(fallbackUserFromSupabaseAuth(session.user));
              }
            }
          }
        } catch (err) {
          console.error('Auth initialization error:', err);
        } finally {
          setLoading(false);
          initialized = true;
        }
      };

      initAuth();

      const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
        // Don't process events until initial session check is complete
        // This prevents race conditions during startup
        if (!initialized && event !== 'SIGNED_OUT') {
          return;
        }

        setSession(session);
        setSupabaseUser(session?.user ?? null);

        if (session?.user) {
          const su = session.user;
          fetchUserProfile(su.id, su).catch(err => {
            console.error('Failed to fetch user profile on auth change:', err);
            setUser(fallbackUserFromSupabaseAuth(su));
          });
        } else if (event === 'SIGNED_OUT') {
          // Only clear user on explicit sign-out, not on intermediate null states
          if (!localStorage.getItem('demo_user')) {
            setUser(null);
          }
        }
      });

      return () => subscription.unsubscribe();
    } else {
      setLoading(false);
    }
  }, []);

  const fetchUserProfile = async (userId: string, supabaseUserData?: SupabaseUser) => {
    if (!supabase) return;

    const { data } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .maybeSingle();

    if (data) {
      setUser(data as User);
    } else if (supabaseUserData) {
      const userName = supabaseUserData.user_metadata?.full_name ||
        supabaseUserData.user_metadata?.name ||
        supabaseUserData.email?.split('@')[0] ||
        'User';

      const { data: newUser, error: insertError } = await supabase
        .from('users')
        .insert({
          id: userId,
          email: supabaseUserData.email,
          name: userName,
          role: 'user',
          subscription_status: 'free',
        })
        .select()
        .single();

      if (!insertError && newUser) {
        setUser(newUser as User);
      } else {
        setUser(fallbackUserFromSupabaseAuth(supabaseUserData));
      }
    }
  };

  const signUp = async (email: string, password: string, name: string) => {
    if (!isSupabaseConfigured()) {
      const newUser = {
        id: `demo-${Date.now()}`,
        email,
        name,
        role: 'user' as UserRole,
        subscription_status: 'free' as SubscriptionStatus,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        password,
      };
      
      const localUsersStr = localStorage.getItem('demo_users_map');
      const localUsers = localUsersStr ? JSON.parse(localUsersStr) : {};
      localUsers[email] = newUser;
      localStorage.setItem('demo_users_map', JSON.stringify(localUsers));

      const { password: _, ...userWithoutPassword } = newUser;
      setUser(userWithoutPassword as User);
      localStorage.setItem('demo_user', JSON.stringify(userWithoutPassword));
      return { error: null };
    }

    if (!supabase) return { error: new Error('Supabase not configured') };

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name },
      },
    });

    if (!error && data.user) {
      const { error: insertError } = await supabase.from('users').insert({
        id: data.user.id,
        email,
        name,
        role: 'user',
        subscription_status: 'free',
      });
      if (insertError) {
        // Log the error but don't fail the signup outright, 
        // as a Postgres trigger might have already inserted the user row.
        console.warn('Profile insertion warning (might be handled by trigger):', insertError);
      }
    }

    return { error: error as Error | null };
  };

  const signIn = async (email: string, password: string) => {
    if (!isSupabaseConfigured() || !supabase) {
      const localUsersStr = localStorage.getItem('demo_users_map');
      const localUsers = localUsersStr ? JSON.parse(localUsersStr) : {};
      
      const demoUser = DEMO_USERS[email] || localUsers[email];
      if (demoUser && password === (demoUser.password || DEMO_PASSWORD)) {
        const { password: _, ...userWithoutPassword } = demoUser;
        setUser(userWithoutPassword as User);
        localStorage.setItem('demo_user', JSON.stringify(userWithoutPassword));
        return { error: null };
      }
      return { error: new Error('Invalid credentials. Please attempt with registered email and password.') };
    }

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    return { error: error as Error | null };
  };

  const signInWithGoogle = async (returnPath = '/dashboard') => {
    if (!isSupabaseConfigured() || !supabase) {
      return { error: new Error('Google sign-in requires Supabase configuration') };
    }

    storeOAuthReturnPath(returnPath);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
      },
    });

    return { error: error as Error | null };
  };

  const resetPassword = async (email: string) => {
    if (!isSupabaseConfigured() || !supabase) {
      return { error: new Error('Password reset requires Supabase configuration') };
    }

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    return { error: error as Error | null };
  };

  const updatePassword = async (newPassword: string) => {
    if (!isSupabaseConfigured() || !supabase) {
      return { error: new Error('Password update requires Supabase configuration') };
    }

    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    return { error: error as Error | null };
  };

  const signOut = async () => {
    if (!isSupabaseConfigured() || !supabase) {
      setUser(null);
      localStorage.removeItem('demo_user');
      return;
    }

    await supabase.auth.signOut();
    setUser(null);
  };

  const adminEmailAllowlist = new Set<string>([
    ...BUILTIN_FULL_ACCESS_EMAILS.map((e) => e.trim().toLowerCase()),
    ...(import.meta.env.VITE_ADMIN_EMAILS ?? '')
      .split(',')
      .map((e) => e.trim().toLowerCase())
      .filter(Boolean),
  ]);
  const authEmail =
    (user?.email || supabaseUser?.email || '').trim().toLowerCase() || null;
  const emailElevatesToAdmin =
    !!authEmail && adminEmailAllowlist.has(authEmail);

  const isPrivilegedRole =
    user?.role === 'admin' ||
    user?.role === 'instructor' ||
    emailElevatesToAdmin;

  let isPremiumStatus = false;
  if (isPrivilegedRole) {
    isPremiumStatus = true;
  } else if (user?.subscription_status === 'premium') {
    if (!user.premium_until || new Date(user.premium_until) >= new Date()) {
      isPremiumStatus = true;
    }
  }

  const value = {
    user,
    supabaseUser,
    session,
    loading,
    signUp,
    signIn,
    signInWithGoogle,
    resetPassword,
    updatePassword,
    signOut,
    isAdmin: user?.role === 'admin' || emailElevatesToAdmin,
    isInstructor: user?.role === 'instructor',
    isPremium: isPremiumStatus,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
