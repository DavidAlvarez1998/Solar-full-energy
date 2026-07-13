import { supabase } from './supabase';
import type { LeadStatus } from '../types';

export type { LeadStatus };

export interface InsertLeadPayload {
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
}

const USE_SUPABASE = import.meta.env.VITE_USE_SUPABASE !== 'false';

const mirrorToLocalStorage = (payload: InsertLeadPayload): void => {
  try {
    const raw = localStorage.getItem('solar_leads');
    const leads: (InsertLeadPayload & { id: number; timestamp: string })[] = raw
      ? JSON.parse(raw)
      : [];
    leads.push({ ...payload, id: Date.now(), timestamp: new Date().toISOString() });
    localStorage.setItem('solar_leads', JSON.stringify(leads));
  } catch {
    // localStorage not available — silent fail
  }
};

export const insertLead = async (payload: InsertLeadPayload): Promise<void> => {
  if (!USE_SUPABASE) {
    mirrorToLocalStorage(payload);
    return;
  }

  const { error } = await supabase.from('leads').insert({
    email: payload.email,
    phone: payload.phone,
    department: payload.department,
    city: payload.city,
    bill: payload.bill,
    panels: payload.panels,
    system_cost: payload.system_cost,
    payback: payload.payback,
    saving_25y: payload.saving_25y,
    interested: payload.interested,
    // status defaults to 'nuevo' server-side
  });

  if (error) {
    console.error('[leads] Supabase insert failed, falling back to localStorage', error);
    mirrorToLocalStorage(payload);
  }
};

export const listLeads = async (opts?: { status?: string; limit?: number }) => {
  let query = supabase
    .from('leads')
    .select('*')
    .order('created_at', { ascending: false });

  if (opts?.status) {
    query = query.eq('status', opts.status);
  }
  if (opts?.limit) {
    query = query.limit(opts.limit);
  }

  const { data, error } = await query;
  if (error) {
    console.error('[leads] listLeads failed', error);
    return [];
  }
  return data ?? [];
};

export const updateLeadStatus = async (
  id: number,
  status: LeadStatus,
  notes?: string,
): Promise<void> => {
  const patch = notes !== undefined ? { status, notes } : { status };

  const { error } = await supabase.from('leads').update(patch).eq('id', id);
  if (error) {
    console.error('[leads] updateLeadStatus failed', error);
  }
};

export const deleteLead = async (id: number): Promise<void> => {
  const { error } = await supabase.from('leads').delete().eq('id', id);
  if (error) {
    console.error('[leads] deleteLead failed', error);
  }
};
