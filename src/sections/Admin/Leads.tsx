import { useState, useEffect } from 'react';
import { listLeads, updateLeadStatus } from '../../lib/leads';
import type { LeadStatus } from '../../types';
import type { Database } from '../../lib/supabase';
import { fmtCOP } from '../../utils/chatbot';

type LeadRow = Database['public']['Tables']['leads']['Row'];

const STATUS_OPTIONS: LeadStatus[] = [
  'nuevo',
  'contactado',
  'en_seguimiento',
  'convertido',
  'descartado',
];

const STATUS_LABELS: Record<LeadStatus, string> = {
  nuevo: 'Nuevo',
  contactado: 'Contactado',
  en_seguimiento: 'En seguimiento',
  convertido: 'Convertido',
  descartado: 'Descartado',
};

const STATUS_COLORS: Record<LeadStatus, string> = {
  nuevo: '#3b82f6',
  contactado: '#f59e0b',
  en_seguimiento: '#8b5cf6',
  convertido: '#22c55e',
  descartado: '#6b7280',
};

const PAGE_SIZE = 10;

const Leads = () => {
  const [leads, setLeads] = useState<LeadRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    listLeads()
      .then(data => {
        setLeads(data);
        setLoading(false);
      })
      .catch(() => {
        setError('No se pudieron cargar los prospectos.');
        setLoading(false);
      });
  }, []);

  const handleStatusChange = async (id: number, newStatus: LeadStatus) => {
    // Optimistic update
    setLeads(prev =>
      prev.map(l => (l.id === id ? { ...l, status: newStatus } : l))
    );
    await updateLeadStatus(id, newStatus);
  };

  const totalPages = Math.ceil(leads.length / PAGE_SIZE);
  const paginated = leads.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  const fmt = (dt: string) =>
    new Date(dt).toLocaleDateString('es-CO', { day: '2-digit', month: '2-digit', year: '2-digit' });

  if (loading) {
    return (
      <div style={{ padding: '2rem', color: '#94a3b8', textAlign: 'center' }}>
        Cargando prospectos...
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: '2rem', color: '#f87171', textAlign: 'center' }}>
        {error}
      </div>
    );
  }

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <h2 style={{ color: '#f1f5f9', fontSize: '1.1rem', fontWeight: 700, margin: 0 }}>
          Prospectos ({leads.length})
        </h2>
        <span style={{ color: '#64748b', fontSize: '0.8rem' }}>
          Página {page + 1} de {Math.max(1, totalPages)}
        </span>
      </div>

      <div style={{ overflowX: 'auto', borderRadius: 10, border: '1px solid rgba(255,255,255,0.08)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem' }}>
          <thead>
            <tr style={{ background: 'rgba(255,255,255,0.04)' }}>
              {['Fecha', 'Email', 'Teléfono', 'Depto.', 'Ciudad', 'Factura', 'Paneles', 'Costo Sistema', 'Estado'].map(col => (
                <th
                  key={col}
                  style={{
                    padding: '0.65rem 0.8rem',
                    textAlign: 'left',
                    color: '#64748b',
                    fontWeight: 600,
                    fontSize: '0.72rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    whiteSpace: 'nowrap',
                    borderBottom: '1px solid rgba(255,255,255,0.08)',
                  }}
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginated.length === 0 ? (
              <tr>
                <td colSpan={9} style={{ padding: '2rem', textAlign: 'center', color: '#64748b' }}>
                  No hay prospectos aún.
                </td>
              </tr>
            ) : (
              paginated.map((lead, idx) => (
                <tr
                  key={lead.id}
                  style={{
                    background: idx % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.02)',
                    borderBottom: '1px solid rgba(255,255,255,0.05)',
                  }}
                >
                  <td style={{ padding: '0.65rem 0.8rem', color: '#94a3b8', whiteSpace: 'nowrap' }}>
                    {fmt(lead.created_at)}
                  </td>
                  <td style={{ padding: '0.65rem 0.8rem', color: '#cbd5e1' }}>
                    {lead.email ?? '—'}
                  </td>
                  <td style={{ padding: '0.65rem 0.8rem', color: '#cbd5e1', whiteSpace: 'nowrap' }}>
                    {lead.phone ?? '—'}
                  </td>
                  <td style={{ padding: '0.65rem 0.8rem', color: '#94a3b8' }}>
                    {lead.department ?? '—'}
                  </td>
                  <td style={{ padding: '0.65rem 0.8rem', color: '#cbd5e1' }}>
                    {lead.city}
                  </td>
                  <td style={{ padding: '0.65rem 0.8rem', color: '#cbd5e1', whiteSpace: 'nowrap' }}>
                    {fmtCOP(lead.bill)}
                  </td>
                  <td style={{ padding: '0.65rem 0.8rem', color: '#94a3b8', textAlign: 'center' }}>
                    {lead.panels}
                  </td>
                  <td style={{ padding: '0.65rem 0.8rem', color: '#cbd5e1', whiteSpace: 'nowrap' }}>
                    {fmtCOP(lead.system_cost)}
                  </td>
                  <td style={{ padding: '0.65rem 0.8rem' }}>
                    <select
                      value={lead.status}
                      onChange={e => handleStatusChange(lead.id, e.target.value as LeadStatus)}
                      style={{
                        background: '#0d121f',
                        border: `1px solid ${STATUS_COLORS[lead.status as LeadStatus] ?? '#334155'}`,
                        borderRadius: 6,
                        color: STATUS_COLORS[lead.status as LeadStatus] ?? '#94a3b8',
                        fontSize: '0.78rem',
                        padding: '0.25rem 0.5rem',
                        cursor: 'pointer',
                        fontWeight: 600,
                      }}
                    >
                      {STATUS_OPTIONS.map(s => (
                        <option key={s} value={s}>{STATUS_LABELS[s]}</option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', marginTop: '1rem' }}>
          <button
            onClick={() => setPage(p => Math.max(0, p - 1))}
            disabled={page === 0}
            style={{
              padding: '0.4rem 0.9rem',
              borderRadius: 6,
              background: page === 0 ? 'rgba(255,255,255,0.04)' : 'rgba(37,99,235,0.15)',
              border: '1px solid rgba(37,99,235,0.3)',
              color: page === 0 ? '#475569' : '#60a5fa',
              cursor: page === 0 ? 'not-allowed' : 'pointer',
              fontSize: '0.85rem',
            }}
          >
            ← Anterior
          </button>
          <button
            onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))}
            disabled={page >= totalPages - 1}
            style={{
              padding: '0.4rem 0.9rem',
              borderRadius: 6,
              background: page >= totalPages - 1 ? 'rgba(255,255,255,0.04)' : 'rgba(37,99,235,0.15)',
              border: '1px solid rgba(37,99,235,0.3)',
              color: page >= totalPages - 1 ? '#475569' : '#60a5fa',
              cursor: page >= totalPages - 1 ? 'not-allowed' : 'pointer',
              fontSize: '0.85rem',
            }}
          >
            Siguiente →
          </button>
        </div>
      )}
    </div>
  );
};

export default Leads;
