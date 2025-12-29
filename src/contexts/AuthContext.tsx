import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User as SupabaseUser, Session } from '@supabase/supabase-js';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { User, UserRole, SubscriptionStatus } from '@/types';

interface AuthContextType {
  user: User | null;
  supabaseUser: SupabaseUser | null;
  session: Session | null;
  loading: boolean;
  signUp: (email: string, password: string, name: string) => Promise<{ error: Error | null }>;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signInWithGoogle: () => Promise<{ error: Error | null }>;
  resetPassword: (email: string) => Promise<{ error: Error | null }>;
  updatePassword: (newPassword: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
  isAdmin: boolean;
  isPremium: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DEMO_USERS: Record<string, User> = {
  'admin@ielts.com': {
    id: 'demo-admin-1',
    email: 'admin@ielts.com',
    name: 'Admin User',
    role: 'admin',
    subscription_status: 'premium',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  'user@ielts.com': {
    id: 'demo-user-1',
    email: 'user@ielts.com',
    name: 'Demo User',
    role: 'user',
    subscription_status: 'free',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  'premium@ielts.com': {
    id: 'demo-premium-1',
    email: 'premium@ielts.com',
    name: 'Premium User',
    role: 'user',
    subscription_status: 'premium',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [supabaseUser, setSupabaseUser] = useState<SupabaseUser | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('demo_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    
    if (isSupabaseConfigured() && supabase) {
      supabase.auth.getSession().then(async ({ data: { session } }) => {
        setSession(session);
        setSupabaseUser(session?.user ?? null);
        if (session?.user) {
          await fetchUserProfile(session.user.id, session.user);
        }
        setLoading(false);
      });

      const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
        setSession(session);
        setSupabaseUser(session?.user ?? null);
        if (session?.user) {
          await fetchUserProfile(session.user.id, session.user);
        } else if (!localStorage.getItem('demo_user')) {
          setUser(null);
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
        const fallbackUser: User = {
          id: userId,
          email: supabaseUserData.email || '',
          name: userName,
          role: 'user' as UserRole,
          subscription_status: 'free' as SubscriptionStatus,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };
        setUser(fallbackUser);
      }
    }
  };

  const signUp = async (email: string, password: string, name: string) => {
    if (!isSupabaseConfigured()) {
      const newUser: User = {
        id: `demo-${Date.now()}`,
        email,
        name,
        role: 'user' as UserRole,
        subscription_status: 'free' as SubscriptionStatus,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      setUser(newUser);
      localStorage.setItem('demo_user', JSON.stringify(newUser));
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
      await supabase.from('users').insert({
        id: data.user.id,
        email,
        name,
        role: 'user',
        subscription_status: 'free',
      });
    }

    return { error: error as Error | null };
  };

  const signIn = async (email: string, password: string) => {
    if (!isSupabaseConfigured() || !supabase) {
      const demoUser = DEMO_USERS[email];
      if (demoUser && password === 'password123') {
        setUser(demoUser);
        localStorage.setItem('demo_user', JSON.stringify(demoUser));
        return { error: null };
      }
      return { error: new Error('Invalid credentials. Try admin@ielts.com or user@ielts.com with password123') };
    }

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    return { error: error as Error | null };
  };

  const signInWithGoogle = async () => {
    if (!isSupabaseConfigured() || !supabase) {
      return { error: new Error('Google sign-in requires Supabase configuration') };
    }

    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin,
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
    isAdmin: user?.role === 'admin',
    isPremium: user?.subscription_status === 'premium',
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
