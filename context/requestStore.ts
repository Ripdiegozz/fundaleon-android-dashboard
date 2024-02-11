import { create } from 'zustand';
import { Session } from '@supabase/supabase-js';

type AuthStore = {
    session: Session | null;
};
  
export const RequestStore = create<AuthStore>((set) => ({
    session: null,
    setSession: (session: Session) => set({ session }),
}));
