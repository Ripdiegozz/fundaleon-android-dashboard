// authContext.tsx
import React, { createContext, useContext } from 'react';
import { Session } from '@supabase/supabase-js';
import { create } from 'zustand';
import { supabase } from '../lib/supabase';

type AuthStore = {
  session: Session | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

const useAuthStore = create<AuthStore>((set) => ({
    session: null,
    login: async (email, password) => {
        const { error, data } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          throw error;
        }

        const session = data?.session

        set({ session });
    },
    logout: async () => {
        await supabase.auth.signOut();
        set({ session: null });
    },
}));

const AuthContext = createContext<AuthStore | undefined>(undefined);

export const AuthProvider = ({ children } : { children: React.ReactNode }) => {
    const authStore = useAuthStore();

    return (
            <AuthContext.Provider value={authStore}>
                {children}
            </AuthContext.Provider>
    );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de AuthProvider');
  }
  return context;
};
