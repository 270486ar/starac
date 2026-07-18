import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { supabase, type AppUser, type UserRole } from '../lib/supabase';
import type { Session } from '@supabase/supabase-js';

interface AuthContextValue {
  user: AppUser | null;
  session: Session | null;
  loading: boolean;
  signUp: (email: string, password: string, metadata: {
    fullName: string;
    role: UserRole;
    className?: string;
    board?: string;
    phone?: string;
  }) => Promise<{ error: string | null }>;
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AppUser | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      if (data.session) {
        fetchProfile(data.session.user.id, data.session.user.email || '');
      } else {
        setLoading(false);
      }
    });

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
      if (newSession) {
        (async () => {
          await fetchProfile(newSession.user.id, newSession.user.email || '');
        })();
      } else {
        setUser(null);
        setLoading(false);
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const fetchProfile = async (userId: string, email: string) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .maybeSingle();

    if (error) {
      setLoading(false);
      return;
    }

    if (data) {
      setUser({
        id: data.id,
        email: data.email || email,
        fullName: data.full_name,
        role: data.role,
        className: data.class_name,
        board: data.board,
        phone: data.phone,
        createdAt: data.created_at,
      });
    } else {
      setUser({
        id: userId,
        email,
        fullName: email.split('@')[0],
        role: 'student',
        createdAt: new Date().toISOString(),
      });
    }
    setLoading(false);
  };

  const signUp: AuthContextValue['signUp'] = async (email, password, metadata) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: metadata.fullName,
          role: metadata.role,
          class_name: metadata.className,
          board: metadata.board,
          phone: metadata.phone,
        },
      },
    });

    if (error) return { error: error.message };

    if (data.user) {
      await supabase.from('profiles').upsert({
        id: data.user.id,
        email,
        full_name: metadata.fullName,
        role: metadata.role,
        class_name: metadata.className,
        board: metadata.board,
        phone: metadata.phone,
      });
    }

    return { error: null };
  };

  const signIn: AuthContextValue['signIn'] = async (email, password) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return { error: error.message };
    return { error: null };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
  };

  return (
    <AuthContext.Provider value={{ user, session, loading, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
