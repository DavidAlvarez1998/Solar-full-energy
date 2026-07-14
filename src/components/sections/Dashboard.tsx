import type { SectionId } from '../../types';

interface DashboardProps {
  onNavigate: (id: SectionId) => void;
}

/* ── Icons ── */
const SunIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" />
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
    <line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" />
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
  </svg>
);
const BoltIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);
const GalleryIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" />
  </svg>
);
const ShareIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
  </svg>
);
const ArrowIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
  </svg>
);

/* ── Data ── */
const metrics = [
  { value: '32',      label: 'Ciudades',       color: '#3b82f6' },
  { value: '847+',    label: 'Instalaciones',  color: '#FFD700' },
  { value: '25 años', label: 'Garantía',       color: '#10b981' },
  { value: '1.240 t', label: 'CO₂ evitado',    color: '#f97316' },
];

const actions = [
  {
    section:  'chatbot'   as SectionId,
    icon:     <BoltIcon />,
    color:    '#FFD700',
    gradient: 'linear-gradient(135deg, #FFD000 0%, #FF8C00 100%)',
    glow:     'rgba(255,160,0,0.25)',
    title:    'Cotizador Solar',
    desc:     'Ingresá tu factura y recibí en 2 minutos el cálculo exacto de paneles, costo y retorno.',
    cta:      'Cotizá gratis',
  },
  {
    section:  'instalados' as SectionId,
    icon:     <GalleryIcon />,
    color:    '#60a5fa',
    gradient: 'linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)',
    glow:     'rgba(37,99,235,0.25)',
    title:    'Galería de Obras',
    desc:     'Instalaciones reales en hogares y empresas de Colombia. Resultados verificables.',
    cta:      'Ver galería',
  },
  {
    section:  'redes'      as SectionId,
    icon:     <ShareIcon />,
    color:    '#34d399',
    gradient: 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
    glow:     'rgba(16,185,129,0.25)',
    title:    'Comunidad',
    desc:     'Seguinos en redes y enterate de promociones, novedades y casos de éxito.',
    cta:      'Ver redes',
  },
];

/* ── Hover helpers (inline) ── */
const hoverBtn = (el: HTMLButtonElement | HTMLDivElement, on: boolean, base: string, hover: string) => {
  el.style.transform = on ? 'translateY(-2px)' : '';
  el.style.boxShadow = on ? hover : base;
};

const Dashboard = ({ onNavigate }: DashboardProps) => (
  <section className="animate-fadeIn" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>

    {/* ── HERO ── */}
    <div style={{
      position: 'relative',
      borderRadius: 24,
      overflow: 'hidden',
      padding: 'clamp(1.5rem, 5vw, 3rem)',
      background: 'linear-gradient(135deg, #0b1527 0%, #0d1f3c 50%, #091220 100%)',
      border: '1px solid rgba(37,99,235,0.3)',
      boxShadow: '0 24px 64px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.06)',
    }}>
      {/* Dot-grid texture */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'radial-gradient(rgba(148,163,184,0.07) 1px, transparent 1px)',
        backgroundSize: '28px 28px',
      }} />
      {/* Gold glow */}
      <div style={{
        position: 'absolute', top: -100, right: -100, width: 360, height: 360, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255,200,0,0.18) 0%, transparent 65%)',
        pointerEvents: 'none',
      }} />
      {/* Blue glow */}
      <div style={{
        position: 'absolute', bottom: -80, left: 100, width: 240, height: 240, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(37,99,235,0.22) 0%, transparent 65%)',
        pointerEvents: 'none',
      }} />

      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* Badge */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
          background: 'rgba(255,208,0,0.12)', border: '1px solid rgba(255,208,0,0.3)',
          borderRadius: 20, padding: '0.28rem 0.9rem', marginBottom: '1.25rem',
          fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.08em',
          textTransform: 'uppercase' as const, color: '#FFD700',
          fontFamily: 'Rajdhani, sans-serif',
        }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#FFD700', display: 'inline-block', animation: 'blink 2s ease-in-out infinite' }} />
          Energía Solar · Pereira, Colombia
        </div>

        {/* Title */}
        <h1 style={{
          fontFamily: 'Orbitron, sans-serif', fontWeight: 900,
          fontSize: 'clamp(2rem, 5.5vw, 3.2rem)',
          lineHeight: 1.08, marginBottom: '1rem',
          color: '#ffffff',
          textShadow: '0 0 60px rgba(37,99,235,0.4)',
        }}>
          Solar Full{' '}
          <span style={{
            background: 'linear-gradient(135deg, #FFD700, #FF8C00)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
          }}>Energy</span>
        </h1>

        {/* Sub */}
        <p style={{
          color: '#94a3b8', fontSize: 'clamp(0.85rem, 1.6vw, 1rem)',
          lineHeight: 1.75, maxWidth: 520, marginBottom: '2rem',
        }}>
          Sistemas fotovoltaicos instalados en 32 ciudades de Colombia.
        </p>

        {/* CTAs */}
        <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: '0.75rem' }}>
          <button
            onClick={() => onNavigate('chatbot')}
            onMouseEnter={e => hoverBtn(e.currentTarget as HTMLButtonElement, true, '0 4px 24px rgba(255,140,0,0.4)', '0 8px 36px rgba(255,140,0,0.6)')}
            onMouseLeave={e => hoverBtn(e.currentTarget as HTMLButtonElement, false, '0 4px 24px rgba(255,140,0,0.4)', '')}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              padding: '0.85rem 1.75rem', borderRadius: 12, border: 'none',
              background: 'linear-gradient(135deg, #FFD000, #FF8C00)',
              color: '#0a0a0a', fontWeight: 800, fontSize: '0.92rem',
              cursor: 'pointer', transition: 'transform 0.18s ease, box-shadow 0.18s ease',
              boxShadow: '0 4px 24px rgba(255,140,0,0.4)',
            }}>
            <SunIcon /> Cotizá ahora — es gratis
          </button>
          <button
            onClick={() => onNavigate('instalados')}
            onMouseEnter={e => {
              (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.10)';
              (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.28)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.06)';
              (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.15)';
            }}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
              padding: '0.85rem 1.4rem', borderRadius: 12,
              background: 'rgba(255,255,255,0.06)', border: '1.5px solid rgba(255,255,255,0.15)',
              color: '#e2e8f0', fontWeight: 600, fontSize: '0.88rem',
              cursor: 'pointer', transition: 'background 0.18s ease, border-color 0.18s ease',
            }}>
            Ver instalaciones <ArrowIcon />
          </button>
        </div>
      </div>
    </div>

    {/* ── METRICS ── */}
    <div style={{
      display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
      background: 'var(--surface)',
      border: '1px solid var(--border)',
      borderRadius: 16, overflow: 'hidden',
    }}>
      {metrics.map((m, i) => (
        <div key={m.label} style={{
          padding: '1.25rem 0.75rem', textAlign: 'center',
          borderRight: i < metrics.length - 1 ? '1px solid var(--border)' : 'none',
          position: 'relative',
        }}>
          <div style={{
            position: 'absolute', top: 0, left: '20%', right: '20%', height: 2,
            background: m.color, borderRadius: '0 0 4px 4px', opacity: 0.8,
          }} />
          <div style={{
            fontFamily: 'Orbitron, sans-serif', fontWeight: 800,
            fontSize: 'clamp(1rem, 2.5vw, 1.4rem)', color: m.color,
            lineHeight: 1.15, marginTop: '0.5rem',
          }}>{m.value}</div>
          <div style={{
            fontSize: '0.63rem', color: 'var(--text-muted)',
            textTransform: 'uppercase' as const, letterSpacing: '0.09em', marginTop: '0.3rem',
          }}>{m.label}</div>
        </div>
      ))}
    </div>

    {/* ── ACTION CARDS ── */}
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
      gap: '0.9rem',
    }}>
      {actions.map((card) => (
        <button
          key={card.title}
          onClick={() => onNavigate(card.section)}
          onMouseEnter={e => {
            const el = e.currentTarget as HTMLButtonElement;
            el.style.transform = 'translateY(-4px)';
            el.style.boxShadow = `0 16px 48px ${card.glow}, 0 4px 16px rgba(0,0,0,0.3)`;
            el.style.borderColor = card.color + '55';
          }}
          onMouseLeave={e => {
            const el = e.currentTarget as HTMLButtonElement;
            el.style.transform = '';
            el.style.boxShadow = '0 4px 16px rgba(0,0,0,0.1)';
            el.style.borderColor = 'var(--border)';
          }}
          style={{
            display: 'flex', flexDirection: 'column', alignItems: 'flex-start',
            textAlign: 'left', padding: '0',
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: 18, overflow: 'hidden',
            cursor: 'pointer',
            transition: 'transform 0.22s ease, box-shadow 0.22s ease, border-color 0.22s ease',
            boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
          }}>
          {/* Color stripe */}
          <div style={{ width: '100%', height: 3, background: card.gradient }} />
          <div style={{ padding: '1.4rem', display: 'flex', flexDirection: 'column', flex: 1, width: '100%' }}>
            {/* Icon */}
            <div style={{
              width: 50, height: 50, borderRadius: 14,
              background: card.gradient, opacity: 0.15,
              position: 'absolute',
            }} />
            <div style={{
              width: 50, height: 50, borderRadius: 14,
              border: `1.5px solid ${card.color}40`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              marginBottom: '1rem', color: card.color,
              background: `${card.color}12`,
            }}>
              {card.icon}
            </div>
            <div style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text)', marginBottom: '0.45rem' }}>
              {card.title}
            </div>
            <div style={{ fontSize: '0.79rem', color: 'var(--text-muted)', lineHeight: 1.65, flex: 1, marginBottom: '1.1rem' }}>
              {card.desc}
            </div>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
              fontSize: '0.78rem', fontWeight: 700, color: card.color,
            }}>
              {card.cta} <ArrowIcon />
            </div>
          </div>
        </button>
      ))}
    </div>

    {/* ── SERVICES BANNER ── */}
    <button
      onClick={() => onNavigate('servicios')}
      onMouseEnter={e => {
        (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(37,99,235,0.35)';
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--border)';
      }}
      style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem',
        width: '100%', textAlign: 'left', padding: '1.1rem 1.4rem',
        background: 'var(--surface)', border: '1px solid var(--border)',
        borderRadius: 14, cursor: 'pointer',
        transition: 'border-color 0.18s ease',
        color: 'var(--text)',
      }}>
      <div>
        <div style={{ fontWeight: 700, fontSize: '0.92rem', color: 'var(--text)', marginBottom: '0.2rem' }}>
          Nuestros Servicios
        </div>
        <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
          Consultoría · Diseño · Instalación · Soporte post-venta
        </div>
      </div>
      <div style={{ color: '#3b82f6', flexShrink: 0 }}>
        <ArrowIcon />
      </div>
    </button>

  </section>
);

export default Dashboard;
