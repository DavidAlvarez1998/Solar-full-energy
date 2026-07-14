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

const SUPABASE_URL = 'https://jcozdyumnnrorswlmbmy.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impjb3pkeXVtbm5yb3Jzd2xtYm15Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM5NjI4NjMsImV4cCI6MjA5OTUzODg2M30.WY6yGinJRUZhYiPAxABT2jhdnuMiskIL02ZanB8UH-A';

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_KEY);
