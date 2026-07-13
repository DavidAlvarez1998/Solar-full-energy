import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';

interface ContentBlock {
  key: string;
  label: string;
  value: string;
}

const CONTENT_KEYS: Array<{ key: string; label: string }> = [
  { key: 'hero.title', label: 'Título principal (hero)' },
  { key: 'services.list', label: 'Descripción de servicios' },
];

const Content = () => {
  const [blocks, setBlocks] = useState<ContentBlock[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
  const [saved, setSaved] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const keys = CONTENT_KEYS.map(k => k.key);
    supabase
      .from('content_blocks' as never)
      .select('key, value')
      .in('key', keys)
      .then(({ data, error: err }) => {
        if (err) {
          setError('No se pudieron cargar los bloques de contenido.');
          setLoading(false);
          return;
        }
        const rows = (data ?? []) as Array<{ key: string; value: { text: string } }>;
        const merged = CONTENT_KEYS.map(ck => {
          const row = rows.find(r => r.key === ck.key);
          return {
            key: ck.key,
            label: ck.label,
            value: row?.value?.text ?? '',
          };
        });
        setBlocks(merged);
        setLoading(false);
      });
  }, []);

  const handleChange = (key: string, newVal: string) => {
    setBlocks(prev =>
      prev.map(b => (b.key === key ? { ...b, value: newVal } : b))
    );
  };

  const handleSave = async (key: string, value: string) => {
    setSaving(key);
    setSaved(null);
    setError(null);
    const { error: err } = await supabase
      .from('content_blocks' as never)
      .upsert({ key, value: { text: value }, updated_at: new Date().toISOString() } as never);
    setSaving(null);
    if (err) {
      setError(`No se pudo guardar "${key}": ${err.message}`);
    } else {
      setSaved(key);
      setTimeout(() => setSaved(null), 2000);
    }
  };

  if (loading) {
    return (
      <div style={{ padding: '2rem', color: '#94a3b8', textAlign: 'center' }}>
        Cargando contenido...
      </div>
    );
  }

  return (
    <div>
      <h2 style={{ color: '#f1f5f9', fontSize: '1.1rem', fontWeight: 700, marginBottom: '1.5rem' }}>
        Bloques de Contenido
      </h2>

      {error && (
        <div
          style={{
            marginBottom: '1rem',
            padding: '0.65rem 0.9rem',
            borderRadius: 8,
            background: 'rgba(239,68,68,0.1)',
            border: '1px solid rgba(239,68,68,0.3)',
            color: '#f87171',
            fontSize: '0.85rem',
          }}
        >
          {error}
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {blocks.map(block => (
          <div
            key={block.key}
            style={{
              padding: '1.25rem',
              borderRadius: 10,
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.08)',
            }}
          >
            <label
              style={{
                display: 'block',
                color: '#94a3b8',
                fontSize: '0.75rem',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                marginBottom: '0.6rem',
              }}
            >
              {block.label}
              <span style={{ color: '#475569', fontWeight: 400, marginLeft: '0.4rem', textTransform: 'none' }}>
                ({block.key})
              </span>
            </label>
            <textarea
              value={block.value}
              onChange={e => handleChange(block.key, e.target.value)}
              rows={3}
              style={{
                width: '100%',
                padding: '0.65rem 0.8rem',
                borderRadius: 7,
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: '#e2e8f0',
                fontSize: '0.88rem',
                resize: 'vertical',
                fontFamily: 'Inter, sans-serif',
                outline: 'none',
                boxSizing: 'border-box',
              }}
            />
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginTop: '0.6rem' }}>
              <button
                onClick={() => handleSave(block.key, block.value)}
                disabled={saving === block.key}
                style={{
                  padding: '0.4rem 1rem',
                  borderRadius: 6,
                  background: saving === block.key ? '#1e3a8a' : '#2563eb',
                  border: 'none',
                  color: '#fff',
                  fontWeight: 600,
                  fontSize: '0.82rem',
                  cursor: saving === block.key ? 'not-allowed' : 'pointer',
                  transition: 'background 0.2s',
                }}
              >
                {saving === block.key ? 'Guardando...' : 'Guardar'}
              </button>
              {saved === block.key && (
                <span style={{ color: '#22c55e', fontSize: '0.82rem' }}>Guardado ✓</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Content;
