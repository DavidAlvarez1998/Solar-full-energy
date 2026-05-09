import { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { GALLERY_IMAGES } from '../../data/gallery';

const stats = [
  { emoji: '⚡', value: '847', label: 'Instalaciones' },
  { emoji: '🏙️', value: '32', label: 'Ciudades' },
  { emoji: '🌿', value: '1,240 t', label: 'CO₂ evitado' },
  { emoji: '☀️', value: '4.2 MW', label: 'Potencia instalada' },
  { emoji: '💰', value: '$12B', label: 'Ahorros generados' },
];

const posts = [
  { emoji: '🌞', text: 'Instalación residencial Pereira · 4 paneles · Ahorro garantizado', time: 'Hace 2 días · Instagram' },
  { emoji: '⚡', text: 'Sistema industrial 50kW Medellín completo · Empresa textil', time: 'Hace 5 días · Facebook' },
];

const Instalados = () => {
  const [lightbox, setLightbox] = useState<{ open: boolean; index: number }>({ open: false, index: 0 });

  const openLb = (i: number) => setLightbox({ open: true, index: i });
  const closeLb = () => setLightbox((prev) => ({ ...prev, open: false }));
  const navigate = useCallback((dir: number) => {
    setLightbox((prev) => ({
      open: true,
      index: (prev.index + dir + GALLERY_IMAGES.length) % GALLERY_IMAGES.length,
    }));
  }, []);

  useEffect(() => {
    if (!lightbox.open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') navigate(1);
      if (e.key === 'ArrowLeft') navigate(-1);
      if (e.key === 'Escape') closeLb();
    };
    window.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
    };
  }, [lightbox.open, navigate]);

  const current = GALLERY_IMAGES[lightbox.index];

  return (
    <>
    <section className="animate-fadeIn">
      <div className="mb-6">
        <h1 className="shimmer-text font-orbitron font-black text-2xl tracking-wide">🔆 Servicios Instalados</h1>
        <p className="text-text-muted mt-1 text-sm">Historial de instalaciones completadas a lo largo de Colombia</p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 mb-6" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))' }}>
        {stats.map((s) => (
          <div key={s.label} className="stat-chip">
            <span className="block text-2xl mb-1">{s.emoji}</span>
            <div className="font-orbitron font-bold text-accent" style={{ fontSize: '0.95rem' }}>{s.value}</div>
            <div className="text-text-muted uppercase tracking-widest mt-0.5" style={{ fontSize: '0.68rem' }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Gallery label */}
      <GalLabel emoji="📸" text="Galería de instalaciones reales · Solar Full Energy" color="rgba(255,208,0,0.3)" />

      {/* Gallery — columnas CSS para acomodar cualquier proporción */}
      <div className="mb-8" style={{ columns: '280px', columnGap: '1.25rem' }}>
        {GALLERY_IMAGES.map((img, i) => (
          <GalleryItem key={img.src} img={img} index={i} onOpen={openLb} />
        ))}
      </div>

      {/* Video label */}
      <GalLabel emoji="🎬" text="Video · Solar Full Energy en acción" color="rgba(16,185,129,0.3)" />

      {/* Video */}
      <div
        className="rounded-2xl overflow-hidden relative"
        style={{
          border: '1.5px solid rgba(16,185,129,0.25)',
          boxShadow: '0 0 40px rgba(16,185,129,0.12), 0 10px 40px rgba(0,0,0,0.55)',
          background: '#000',
          animation: 'panelGlow 4s ease-in-out infinite',
        }}
      >
        <span
          className="absolute top-4 left-4 z-10 flex items-center gap-1.5 font-semibold font-rajdhani uppercase tracking-widest"
          style={{
            background: 'rgba(16,185,129,0.2)',
            border: '1px solid rgba(16,185,129,0.4)',
            borderRadius: 20,
            padding: '0.3rem 0.85rem',
            fontSize: '0.72rem',
            color: '#2563eb',
            backdropFilter: 'blur(8px)',
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full animate-blink" style={{ background: '#2563eb', display: 'inline-block' }} />
          ▶ Instalación real
        </span>
        <video controls preload="metadata" style={{ width: '100%', display: 'block', maxHeight: 520, objectFit: 'contain', background: '#000' }}>
          <source src="/video1.mp4" type="video/mp4" />
          Tu navegador no soporta reproducción de video.
        </video>
      </div>

      {/* Posts preview */}
      <div
        className="glass-card mt-8 p-5"
        style={{ background: 'linear-gradient(135deg,rgba(255,140,0,0.07),rgba(16,185,129,0.04))', borderColor: 'rgba(255,208,0,0.18)' }}
      >
        <div className="font-orbitron font-bold text-accent tracking-widest mb-4" style={{ fontSize: '0.8rem' }}>📣 NUESTRAS PUBLICACIONES</div>
        <div className="grid gap-3" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))' }}>
          {posts.map((p) => (
            <div key={p.text} className="rounded-xl p-4 text-center" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
              <div className="text-3xl mb-1">{p.emoji}</div>
              <div className="text-text-muted" style={{ fontSize: '0.78rem' }}>{p.text}</div>
              <div className="text-text-dim mt-2" style={{ fontSize: '0.65rem' }}>{p.time}</div>
            </div>
          ))}
          {GALLERY_IMAGES.slice(4).map((img) => (
            <div key={img.src} className="rounded-xl overflow-hidden" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', padding: '0.5rem' }}>
              <img
                src={img.src}
                alt={img.alt}
                className="w-full rounded-lg mb-1"
                onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
              />
              <div className="text-text-muted text-center" style={{ fontSize: '0.78rem' }}>{img.subtitle}</div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Lightbox — portal a document.body para escapar del stacking context del sidebar */}
    {lightbox.open && createPortal(
      <div
        className="fixed inset-0 z-[9998]"
        style={{ background: 'rgba(2,6,16,0.96)', backdropFilter: 'blur(14px)' }}
        onClick={closeLb}
      >
        <button
          className="absolute z-[9999] flex items-center justify-center cursor-pointer transition-all hover:scale-110"
          onClick={closeLb}
          style={{ top: '1.2rem', right: '1.5rem', width: 44, height: 44, borderRadius: '50%', background: 'rgba(255,208,0,0.12)', border: '1.5px solid rgba(255,208,0,0.35)', color: '#FFD000', fontSize: '1.2rem' }}
        >✕</button>

        <button
          className="absolute z-[9999] flex items-center justify-center cursor-pointer"
          style={{ left: '1.2rem', top: '50%', transform: 'translateY(-50%)', width: 46, height: 46, borderRadius: '50%', background: 'rgba(255,208,0,0.12)', border: '1.5px solid rgba(255,208,0,0.3)', color: '#FFD000', fontSize: '1.5rem' }}
          onClick={(e) => { e.stopPropagation(); navigate(-1); }}
        >❮</button>

        <div
          style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 9999 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div
            className="animate-lbPop overflow-hidden"
            style={{ borderRadius: 20, border: '1.5px solid rgba(255,208,0,0.25)', boxShadow: '0 0 80px rgba(255,140,0,0.22), 0 30px 80px rgba(0,0,0,0.75)' }}
          >
            <img
              src={current.src}
              alt={current.alt}
              style={{ display: 'block', maxWidth: 'calc(100vw - 8rem)', maxHeight: 'calc(100vh - 7rem)', width: 'auto', height: 'auto' }}
              onError={(e) => { (e.currentTarget as HTMLImageElement).src = ''; }}
            />
          </div>
        </div>

        <button
          className="absolute z-[9999] flex items-center justify-center cursor-pointer"
          style={{ right: '1.2rem', top: '50%', transform: 'translateY(-50%)', width: 46, height: 46, borderRadius: '50%', background: 'rgba(255,208,0,0.12)', border: '1.5px solid rgba(255,208,0,0.3)', color: '#FFD000', fontSize: '1.5rem' }}
          onClick={(e) => { e.stopPropagation(); navigate(1); }}
        >❯</button>

        <div
          className="absolute z-[9999] font-rajdhani tracking-widest whitespace-nowrap"
          style={{ bottom: '1.4rem', left: '50%', transform: 'translateX(-50%)', background: 'rgba(8,16,36,0.88)', border: '1px solid rgba(255,208,0,0.2)', borderRadius: 30, padding: '0.42rem 1.4rem', fontSize: '0.78rem', color: 'rgba(255,208,0,0.88)', backdropFilter: 'blur(8px)' }}
        >
          {lightbox.index + 1} / {GALLERY_IMAGES.length} · {current.title}
        </div>
      </div>,
      document.body
    )}
    </>
  );
};

const GalLabel = ({ emoji, text, color }: { emoji: string; text: string; color: string }) => (
  <div className="flex items-center gap-3 font-orbitron font-bold text-accent uppercase tracking-widest mb-5" style={{ fontSize: '0.72rem' }}>
    {emoji} {text}
    <span className="flex-1 h-px" style={{ background: `linear-gradient(90deg, ${color}, transparent)` }} />
  </div>
);

interface GalleryItemProps {
  img: (typeof GALLERY_IMAGES)[number];
  index: number;
  onOpen: (i: number) => void;
}

const GalleryItem = ({ img, index, onOpen }: GalleryItemProps) => (
  <div
    className="relative overflow-hidden cursor-pointer group"
    style={{
      breakInside: 'avoid',
      display: 'inline-block',
      width: '100%',
      marginBottom: '1.25rem',
      borderRadius: 18,
      border: '1px solid rgba(255,208,0,0.12)',
      background: 'rgba(10,20,40,0.6)',
      boxShadow: '0 6px 28px rgba(0,0,0,0.45)',
      transition: 'transform 0.35s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.35s ease, border-color 0.35s ease',
    }}
    onClick={() => onOpen(index)}
    title="Ampliar"
  >
    <img
      src={img.src}
      alt={img.alt}
      style={{ display: 'block', width: '100%', height: 'auto', borderRadius: 18 }}
      className="transition-transform duration-500 group-hover:scale-105"
      onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
    />
    <div className="absolute top-3 right-3 flex items-center justify-center w-8 h-8 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: 'rgba(255,208,0,0.18)', border: '1px solid rgba(255,208,0,0.4)', backdropFilter: 'blur(6px)' }}>
      🔍
    </div>
    <div className="absolute bottom-0 left-0 right-0 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: 'linear-gradient(180deg, transparent 0%, rgba(4,10,25,0.88) 100%)' }}>
      <div className="font-bold text-white" style={{ fontSize: '0.9rem' }}>{img.title}</div>
      <div className="font-rajdhani tracking-wide" style={{ fontSize: '0.72rem', color: 'rgba(255,208,0,0.85)' }}>{img.subtitle}</div>
    </div>
  </div>
);

export default Instalados;
