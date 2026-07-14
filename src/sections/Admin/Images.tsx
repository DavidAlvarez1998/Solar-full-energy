import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { supabase } from '../../lib/supabase';

interface StorageItem {
  name: string;
  publicUrl: string;
}

const BUCKET = 'site-assets';

const Images = () => {
  const [items, setItems] = useState<StorageItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [confirmItem, setConfirmItem] = useState<StorageItem | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const loadItems = async () => {
    setLoading(true);
    const { data, error: err } = await supabase.storage.from(BUCKET).list('', { limit: 50, sortBy: { column: 'created_at', order: 'desc' } });
    if (err) { setError('No se pudieron cargar las imágenes.'); setLoading(false); return; }
    const files = (data ?? []).filter(f => f.name !== '.emptyFolderPlaceholder');
    setItems(files.map(f => ({
      name: f.name,
      publicUrl: supabase.storage.from(BUCKET).getPublicUrl(f.name).data.publicUrl,
    })));
    setLoading(false);
  };

  useEffect(() => { loadItems(); }, []);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true); setUploadedUrl(null); setError(null);
    const { error: err } = await supabase.storage.from(BUCKET).upload(file.name, file, { upsert: true });
    if (err) { setError(`Error al subir "${file.name}": ${err.message}`); setUploading(false); return; }
    const { data } = supabase.storage.from(BUCKET).getPublicUrl(file.name);
    setUploadedUrl(data.publicUrl);
    setUploading(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
    await loadItems();
  };

  const confirmDelete = async () => {
    if (!confirmItem) return;
    setDeleting(confirmItem.name);
    setConfirmItem(null);
    const { error: err } = await supabase.storage.from(BUCKET).remove([confirmItem.name]);
    if (err) setError(`Error al eliminar "${confirmItem.name}": ${err.message}`);
    else setItems(prev => prev.filter(i => i.name !== confirmItem.name));
    setDeleting(null);
  };

  return (
    <div>
      <h2 style={{ color: '#f1f5f9', fontSize: '1.1rem', fontWeight: 700, marginBottom: '1.5rem' }}>
        Gestor de Imágenes
      </h2>

      {/* Upload */}
      <div style={{ padding: '1.5rem', borderRadius: 10, border: '2px dashed rgba(37,99,235,0.3)', background: 'rgba(37,99,235,0.04)', marginBottom: '1.5rem', textAlign: 'center' }}>
        <div style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '0.75rem' }}>
          Subir imagen al bucket <code style={{ color: '#60a5fa' }}>site-assets</code>
        </div>
        <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} disabled={uploading} style={{ display: 'none' }} id="image-upload" />
        <label htmlFor="image-upload" style={{ display: 'inline-block', padding: '0.5rem 1.25rem', borderRadius: 8, background: uploading ? '#1e3a8a' : '#2563eb', color: '#fff', fontWeight: 600, fontSize: '0.88rem', cursor: uploading ? 'not-allowed' : 'pointer', transition: 'background 0.2s' }}>
          {uploading ? 'Subiendo...' : '+ Seleccionar imagen'}
        </label>
        {error && <div style={{ color: '#f87171', fontSize: '0.82rem', marginTop: '0.75rem' }}>{error}</div>}
        {uploadedUrl && (
          <div style={{ marginTop: '0.75rem' }}>
            <span style={{ color: '#22c55e', fontSize: '0.82rem' }}>Subida correctamente: </span>
            <a href={uploadedUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#60a5fa', fontSize: '0.78rem', wordBreak: 'break-all' }}>{uploadedUrl}</a>
          </div>
        )}
      </div>

      {/* Gallery */}
      {loading ? (
        <div style={{ color: '#94a3b8', textAlign: 'center', padding: '1rem' }}>Cargando imágenes...</div>
      ) : items.length === 0 ? (
        <div style={{ color: '#475569', textAlign: 'center', padding: '1rem' }}>No hay imágenes en el bucket todavía.</div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '0.75rem' }}>
          {items.map(item => (
            <div key={item.name} style={{ borderRadius: 8, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.03)', position: 'relative' }}>
              <img src={item.publicUrl} alt={item.name} style={{ width: '100%', height: 100, objectFit: 'cover', display: 'block' }} onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }} />
              <button
                onClick={() => setConfirmItem(item)}
                disabled={deleting === item.name}
                title="Eliminar imagen"
                style={{ position: 'absolute', top: 6, right: 6, width: 26, height: 26, borderRadius: 6, background: 'rgba(239,68,68,0.85)', border: 'none', color: '#fff', fontSize: '0.75rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: deleting === item.name ? 0.5 : 1 }}
              >
                ✕
              </button>
              <div style={{ padding: '0.4rem 0.5rem' }}>
                <p style={{ color: '#94a3b8', fontSize: '0.7rem', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={item.name}>{item.name}</p>
                <a href={item.publicUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#60a5fa', fontSize: '0.65rem' }}>Ver URL</a>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal confirmación */}
      {confirmItem && createPortal(
        <div
          onClick={() => setConfirmItem(null)}
          style={{ position: 'fixed', inset: 0, zIndex: 9999, background: 'rgba(2,6,16,0.85)', backdropFilter: 'blur(6px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{ background: '#0d121f', border: '1px solid rgba(239,68,68,0.3)', borderRadius: 16, padding: '2rem', maxWidth: 380, width: '90%', boxShadow: '0 0 40px rgba(239,68,68,0.15)' }}
          >
            <div style={{ fontSize: '2rem', textAlign: 'center', marginBottom: '0.75rem' }}>🗑️</div>
            <h3 style={{ color: '#f1f5f9', fontSize: '1rem', fontWeight: 700, margin: '0 0 0.5rem', textAlign: 'center' }}>
              ¿Eliminar imagen?
            </h3>
            <p style={{ color: '#94a3b8', fontSize: '0.82rem', textAlign: 'center', margin: '0 0 1.5rem', wordBreak: 'break-all' }}>
              {confirmItem.name}
            </p>
            <img src={confirmItem.publicUrl} alt={confirmItem.name} style={{ width: '100%', height: 140, objectFit: 'cover', borderRadius: 8, marginBottom: '1.5rem', display: 'block' }} onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }} />
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button
                onClick={() => setConfirmItem(null)}
                style={{ flex: 1, padding: '0.6rem', borderRadius: 8, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: '#94a3b8', fontWeight: 600, fontSize: '0.88rem', cursor: 'pointer' }}
              >
                Cancelar
              </button>
              <button
                onClick={confirmDelete}
                style={{ flex: 1, padding: '0.6rem', borderRadius: 8, background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.4)', color: '#f87171', fontWeight: 700, fontSize: '0.88rem', cursor: 'pointer' }}
              >
                Sí, eliminar
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};

export default Images;
