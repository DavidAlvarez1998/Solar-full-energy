import { createClient } from '@supabase/supabase-js';

export type Database = {
  public: {
    Tables: {
      leads: {
        Row: {
          id: number;
          created_at: string;
          name: string | null;
          email: string | null;
          phone: string | null;
          department: string | null;
          city: string;
          bill: number;
          panels: number;
          system_cost: number;
          payback: number;
          saving_25y: number;
          interested: boolean;
          status: string;
          notes: string | null;
          last_contact: string | null;
        };
        Insert: {
          name?: string | null;
          email?: string | null;
          phone?: string | null;
          department?: string | null;
          city: string;
          bill: number;
          panels: number;
          system_cost: number;
          payback: number;
          saving_25y: number;
          interested?: boolean;
          status?: string;
        };
        Update: {
          name?: string | null;
          email?: string | null;
          phone?: string | null;
          department?: string | null;
          city?: string;
          bill?: number;
          panels?: number;
          system_cost?: number;
          payback?: number;
          saving_25y?: number;
          interested?: boolean;
          status?: string;
          notes?: string | null;
          last_contact?: string | null;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
  };
};

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_KEY);
