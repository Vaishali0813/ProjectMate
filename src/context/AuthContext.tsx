import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import type { AdminUser } from '../types';

interface AuthContextType {
  user: AdminUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const LOCAL_ADMIN_KEY = 'projectmate_admin_session';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function initAuth() {
      if (isSupabaseConfigured && supabase) {
        try {
          const { data: { session } } = await supabase.auth.getSession();
          if (session?.user) {
            setUser({
              id: session.user.id,
              email: session.user.email || '',
              role: 'admin',
            });
          } else {
            setUser(null);
          }

          const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            if (session?.user) {
              setUser({
                id: session.user.id,
                email: session.user.email || '',
                role: 'admin',
              });
            } else {
              setUser(null);
            }
          });

          setLoading(false);
          return () => {
            subscription.unsubscribe();
          };
        } catch (err) {
          console.warn('Supabase auth initialization error:', err);
        }
      }

      // Local fallback session
      try {
        const stored = localStorage.getItem(LOCAL_ADMIN_KEY);
        if (stored) {
          const parsed = JSON.parse(stored);
          setUser(parsed);
        }
      } catch (e) {
        console.warn('Error reading admin session', e);
      } finally {
        setLoading(false);
      }
    }

    initAuth();
  }, []);

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password,
        });

        if (error) {
          return { success: false, error: error.message };
        }

        if (data.user) {
          setUser({
            id: data.user.id,
            email: data.user.email || '',
            role: 'admin',
          });
          return { success: true };
        }
      } catch (err: any) {
        return { success: false, error: err?.message || 'Authentication error' };
      }
    }

    // Default administrator credential support for evaluation or initial setup
    const normalizedEmail = email.trim().toLowerCase();
    if (
      (normalizedEmail === 'admin@projectmate.lk' || normalizedEmail === 'admin@projectmate.com') &&
      password === 'Admin@ProjectMate2026'
    ) {
      const adminData: AdminUser = {
        id: 'admin-pm-01',
        email: normalizedEmail,
        role: 'admin',
      };
      setUser(adminData);
      localStorage.setItem(LOCAL_ADMIN_KEY, JSON.stringify(adminData));
      return { success: true };
    }

    return {
      success: false,
      error: 'Invalid administrator credentials. Please check your email and password.',
    };
  };

  const logout = async () => {
    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.auth.signOut();
      } catch (err) {
        console.warn('Supabase logout error:', err);
      }
    }
    setUser(null);
    localStorage.removeItem(LOCAL_ADMIN_KEY);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, isAdmin: Boolean(user) }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
