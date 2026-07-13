import type { SectionId } from '../../types';
import { SECTION_META } from '../../data/navigation';
import SolarIcon from '../icons/SolarIcon';

interface TopbarProps {
  activeSection: SectionId;
  theme: 'dark' | 'light';
  onThemeToggle: () => void;
  onMenuToggle: () => void;
  isMobile: boolean;
}

const MoonIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);

const HamburgerIcon = () => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
    <path d="M2 5h18M2 11h18M2 17h18" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
  </svg>
);

const Topbar = ({ activeSection, theme, onThemeToggle, onMenuToggle, isMobile }: TopbarProps) => {
  const meta = SECTION_META[activeSection];
  const isLight = theme === 'light';

  return (
    <header
      className="flex items-center justify-between gap-3 sticky top-0 z-50"
      style={{
        padding: isMobile ? '0.75rem 1rem' : '1rem 2rem',
        background: 'var(--topbar-bg)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid var(--border)',
        transition: 'background 0.3s ease, padding 0.3s ease',
      }}
    >
      <div className="flex items-center gap-3 min-w-0">
        {/* Hamburger — mobile only */}
        {isMobile && (
          <button
            onClick={onMenuToggle}
            className="flex-shrink-0 flex items-center justify-center cursor-pointer transition-all hover:scale-105"
            style={{
              width: 40, height: 40, borderRadius: 10,
              background: 'rgba(37,99,235,0.1)',
              border: '1px solid rgba(37,99,235,0.25)',
              color: '#60a5fa',
            }}
            aria-label="Abrir menú"
          >
            <HamburgerIcon />
          </button>
        )}

        <div className="min-w-0">
          <h2
            className="font-orbitron font-bold gradient-gold tracking-widest truncate"
            style={{ fontSize: isMobile ? '0.78rem' : '0.85rem' }}
          >
            {meta.title}
          </h2>
          {!isMobile && (
            <p className="text-text-muted mt-0.5" style={{ fontSize: '0.72rem' }}>
              {meta.subtitle}
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2 flex-shrink-0">
        {/* Email chip — mobile only */}
        {isMobile && (
          <a
            href="mailto:solarfullenergy@gmail.com"
            title="solarfullenergy@gmail.com"
            style={{
              display: 'flex', alignItems: 'center', gap: '0.3rem',
              padding: '0.25rem 0.6rem',
              borderRadius: 20,
              fontSize: '0.72rem',
              textDecoration: 'none',
              color: '#60a5fa',
              background: 'rgba(37,99,235,0.08)',
              border: '1px solid rgba(37,99,235,0.2)',
              whiteSpace: 'nowrap',
            }}
          >
            ✉️ Email
          </a>
        )}

        {/* Active indicator — hidden on very small screens */}
        <div
          className="hidden sm:flex items-center gap-1.5"
          style={{
            fontSize: '0.72rem',
            background: isLight ? 'rgba(16,185,129,0.08)' : 'rgba(16,185,129,0.1)',
            border: '1px solid rgba(16,185,129,0.25)',
            borderRadius: 20,
            padding: '0.25rem 0.75rem',
            color: '#10B981',
          }}
        >
          <span className="animate-blink rounded-full" style={{ width: 7, height: 7, background: '#10B981', display: 'inline-block', flexShrink: 0 }} />
          Sistema Activo
        </div>

        {/* Theme toggle */}
        <button
          onClick={onThemeToggle}
          title={isLight ? 'Cambiar a modo oscuro' : 'Cambiar a modo claro'}
          className="flex-shrink-0 flex items-center justify-center cursor-pointer transition-all duration-200 hover:scale-110"
          style={{
            width: 40, height: 40, borderRadius: 12,
            border: isLight ? '2px solid rgba(99,102,241,0.35)' : '2px solid rgba(255,208,0,0.35)',
            background: isLight ? 'rgba(99,102,241,0.1)' : 'rgba(255,208,0,0.08)',
            color: isLight ? '#818cf8' : '#FFD700',
          }}
        >
          {isLight ? <MoonIcon /> : <SolarIcon size={24} />}
        </button>
      </div>
    </header>
  );
};

export default Topbar;
