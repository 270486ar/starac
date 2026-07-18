import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});

export type UserRole = 'student' | 'teacher' | 'admin';

export interface AppUser {
  id: string;
  email: string;
  fullName: string;
  role: UserRole;
  className?: string;
  board?: string;
  phone?: string;
  createdAt: string;
}
