import React from 'react';
import type { SectionId } from '../../types';
import { NAV_ITEMS } from '../../data/navigation';
import WhatsAppIcon from '../icons/WhatsAppIcon';
import InstagramIcon from '../icons/InstagramIcon';
import FacebookIcon from '../icons/FacebookIcon';
import EmailIcon from '../icons/EmailIcon';
import { LayoutDashboard, Zap, Images, Share2, Sun, Settings2 } from 'lucide-react';

const NAV_ICONS: Record<string, React.ReactNode> = {
  dashboard:  <LayoutDashboard size={18} strokeWidth={1.75} />,
  servicios:  <Zap            size={18} strokeWidth={1.75} />,
  instalados: <Images         size={18} strokeWidth={1.75} />,
  redes:      <Share2         size={18} strokeWidth={1.75} />,
  chatbot:    <Sun            size={18} strokeWidth={1.75} />,
  admin:      <Settings2      size={18} strokeWidth={1.75} />,
};

interface SidebarProps {
  activeSection: SectionId;
  collapsed: boolean;
  isMobile: boolean;
  mobileOpen: boolean;
  onNavigate: (id: SectionId) => void;
  onToggle: () => void;
  onClose: () => void;
}

const SOCIAL_LINKS = [
  { href: 'https://wa.me/573217344209',                             title: 'WhatsApp',  Icon: WhatsAppIcon,  color: '#25D366', glow: 'rgba(37,211,102,0.35)' },
  { href: 'https://www.instagram.com/solar_full_energy_aj/',        title: 'Instagram', Icon: InstagramIcon, color: '#E1306C', glow: 'rgba(225,48,108,0.35)'  },
  { href: 'https://www.facebook.com/profile.php?id=61552494544943', title: 'Facebook',  Icon: FacebookIcon,  color: '#1877F2', glow: 'rgba(24,119,242,0.35)'  },
  { href: 'mailto:solarfullenergy@gmail.com',                       title: 'Email',     Icon: EmailIcon,     color: '#2563eb', glow: 'rgba(37,99,235,0.35)'   },
];

const Sidebar = ({ activeSection, collapsed, isMobile, mobileOpen, onNavigate, onToggle, onClose }: SidebarProps) => {
  // On mobile: fixed drawer width; on desktop: collapsed / expanded
  const desktopWidth = collapsed ? '80px' : '270px';
  const mobileWidth  = 'min(280px, 88vw)';

  const sidebarStyle: React.CSSProperties = isMobile
    ? {
        width: mobileWidth,
        transform: mobileOpen ? 'translateX(0)' : 'translateX(-100%)',
        transition: 'transform 0.32s cubic-bezier(0.4,0,0.2,1)',
        boxShadow: mobileOpen ? '4px 0 40px rgba(0,0,0,0.5)' : 'none',
      }
    : {
        width: desktopWidth,
        transition: 'width 0.4s cubic-bezier(0.4,0,0.2,1)',
        boxShadow: '10px 0 30px rgba(0,0,0,0.2)',
      };

  // On mobile the sidebar is never "collapsed" visually; treat as expanded
  const isCollapsed = isMobile ? false : collapsed;

  return (
    <>
      {/* ── Mobile backdrop ── */}
      {isMobile && mobileOpen && (
        <div
          onClick={onClose}
          style={{
            position: 'fixed', inset: 0,
            background: 'rgba(0,0,0,0.55)',
            backdropFilter: 'blur(3px)',
            zIndex: 999,
          }}
          aria-hidden="true"
        />
      )}

      {/* ── Sidebar panel ── */}
      <aside
        className="fixed left-0 top-0 bottom-0 flex flex-col overflow-hidden"
        style={{
          ...sidebarStyle,
          background: 'var(--surface)',
          borderRight: '1px solid var(--border)',
          transition: [sidebarStyle.transition, 'background 0.3s ease'].join(', '),
          zIndex: isMobile ? 1000 : 1000,
        }}
      >
        {/* ── Desktop toggle button (protruding) ── */}
        {!isMobile && (
          <button
            onClick={onToggle}
            className="absolute z-[101] flex items-center justify-center cursor-pointer"
            style={{
              top: '1.25rem', right: '-15px',
              width: 30, height: 30,
              borderRadius: 8,
              background: isCollapsed
                ? 'linear-gradient(135deg, #2563eb, #1e40af)'
                : 'linear-gradient(135deg, #1e293b, #0f172a)',
              border: isCollapsed
                ? '1.5px solid rgba(96,165,250,0.5)'
                : '1.5px solid rgba(255,255,255,0.12)',
              boxShadow: isCollapsed
                ? '0 0 12px rgba(37,99,235,0.6), 0 2px 8px rgba(0,0,0,0.4)'
                : '0 0 10px rgba(0,0,0,0.5), 0 2px 8px rgba(0,0,0,0.4)',
              transition: 'background 0.3s ease, border 0.3s ease, box-shadow 0.3s ease',
            }}
            title={isCollapsed ? 'Expandir menú' : 'Colapsar menú'}
            aria-label={isCollapsed ? 'Expandir menú' : 'Colapsar menú'}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              {isCollapsed ? (
                <>
                  <path d="M5 3.5L8.5 8 5 12.5"  stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M8.5 3.5L12 8l-3.5 4.5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />
                </>
              ) : (
                <>
                  <path d="M11 3.5L7.5 8 11 12.5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M7.5 3.5L4 8l3.5 4.5"  stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />
                </>
              )}
            </svg>
          </button>
        )}

        {/* ── Mobile × close button ── */}
        {isMobile && (
          <button
            onClick={onClose}
            className="absolute z-[101] flex items-center justify-center cursor-pointer"
            style={{
              top: 10, right: 10,
              width: 34, height: 34, borderRadius: 8,
              background: 'rgba(255,255,255,0.07)',
              border: '1px solid rgba(255,255,255,0.12)',
              color: 'var(--text-muted)',
            }}
            aria-label="Cerrar menú"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M2 2l12 12M14 2L2 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        )}

        {/* ── Brand header — navigates to Dashboard ── */}
        <div
          className="flex items-center justify-center flex-shrink-0 cursor-pointer overflow-hidden"
          style={{
            background: 'var(--surface)',
            padding: isCollapsed ? '0.75rem 0.5rem' : '0.9rem 1rem',
            minHeight: isCollapsed ? '75px' : '130px',
            borderBottom: '1px solid var(--border)',
            transition: 'min-height 0.4s ease, filter 0.2s ease, padding 0.4s ease',
          }}
          onClick={() => onNavigate('dashboard')}
          title="Ir al Dashboard"
          onMouseEnter={e => (e.currentTarget.style.filter = 'brightness(1.1)')}
          onMouseLeave={e => (e.currentTarget.style.filter = 'none')}
        >
          <img
            src="/logo-sfe.png"
            alt="Solar Full Energy"
            style={{
              height: isCollapsed ? 52 : 112,
              width: 'auto',
              maxWidth: '100%',
              objectFit: 'contain',
              transition: 'height 0.4s cubic-bezier(0.4,0,0.2,1)',
              display: 'block',
            }}
            onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
          />
        </div>

        {/* ── Navigation ── */}
        <nav
          className="flex-1 overflow-y-auto overflow-x-hidden flex flex-col"
          style={{ padding: '0.8rem 0', scrollbarWidth: 'thin', scrollbarColor: 'rgba(37,99,235,0.2) transparent' }}
          role="navigation"
          aria-label="Menú principal"
        >
          {!isCollapsed && (
            <div className="font-bold text-text-dim uppercase tracking-widest px-6 pt-6 pb-2" style={{ fontSize: '0.65rem' }}>
              MENU
            </div>
          )}

          {NAV_ITEMS.slice(0, 3).map((item) => (
            <NavButton
              key={item.id}
              item={item}
              active={activeSection === item.id}
              collapsed={isCollapsed}
              onClick={() => onNavigate(item.id)}
            />
          ))}

          {!isCollapsed && (
            <div className="font-bold text-text-dim uppercase tracking-widest px-6 pt-6 pb-2" style={{ fontSize: '0.65rem' }}>
              SISTEMA
            </div>
          )}

          {NAV_ITEMS.slice(3, 5).map((item) => (
            <NavButton
              key={item.id}
              item={item}
              active={activeSection === item.id}
              collapsed={isCollapsed}
              onClick={() => onNavigate(item.id)}
            />
          ))}

          {/* Spacer — empuja Admin hacia abajo */}
          <div style={{ flex: 1, minHeight: '4rem' }} />

          {!isCollapsed && (
            <div className="font-bold text-text-dim uppercase tracking-widest px-6 pb-2" style={{ fontSize: '0.65rem', borderTop: '1px solid var(--border)', paddingTop: '1rem' }}>
              ADMIN
            </div>
          )}

          <NavButton
            item={NAV_ITEMS[5]}
            active={activeSection === 'admin'}
            collapsed={isCollapsed}
            onClick={() => onNavigate('admin')}
          />
        </nav>

        {/* ── Social links ── */}
        {!isCollapsed && (
          <div className="flex gap-2 flex-wrap px-4 py-3">
            {SOCIAL_LINKS.map((link) => (
              <SocialBtn key={link.title} {...link} />
            ))}
          </div>
        )}

        {/* ── Footer ── */}
        {!isCollapsed && (
          <div className="flex-shrink-0 px-5 py-3" style={{ borderTop: '1px solid rgba(0,0,0,0.05)' }}>
            <p className="text-text-dim leading-relaxed" style={{ fontSize: '0.64rem', letterSpacing: '0.08em' }}>
              ☀️ <span className="text-accent">Solar Full Energy</span> v2.0
              <br />Pereira · Colombia · 2026
            </p>
          </div>
        )}
      </aside>
    </>
  );
};

/* ── Sub-components ── */

interface SocialBtnProps {
  href: string; title: string;
  Icon: React.ComponentType<{ width?: number; height?: number; fill?: string }>;
  color: string; glow: string;
}

const SocialBtn = ({ href, title, Icon, color, glow }: SocialBtnProps) => {
  const [hovered, setHovered] = React.useState(false);
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      title={title}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: 36, height: 36, borderRadius: 10,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        textDecoration: 'none',
        transition: 'all 0.22s ease',
        background: hovered ? `${color}18` : 'rgba(0,0,0,0.03)',
        border: `1px solid ${hovered ? color + '55' : 'rgba(0,0,0,0.05)'}`,
        color: hovered ? color : '#64748b',
        boxShadow: hovered ? `0 0 12px ${glow}` : 'none',
        transform: hovered ? 'translateY(-2px)' : 'none',
      }}
    >
      <Icon width={18} height={18} fill={hovered ? color : 'currentColor'} />
    </a>
  );
};

interface NavButtonProps {
  item: (typeof NAV_ITEMS)[number];
  active: boolean;
  collapsed: boolean;
  onClick: () => void;
}

const NavButton = ({ item, active, collapsed, onClick }: NavButtonProps) => (
  <div
    className={`nav-item ${active ? 'active' : ''}`}
    style={collapsed ? { justifyContent: 'center', padding: '0.6rem', margin: '0.1rem 0.3rem' } : {}}
    onClick={onClick}
    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onClick(); }}
    role="button"
    tabIndex={0}
    aria-label={item.label}
    aria-current={active ? 'page' : undefined}
  >
    <div className="flex justify-center flex-shrink-0" style={{ width: 24 }}>{NAV_ICONS[item.id] ?? item.icon}</div>
    {!collapsed && <span>{item.label}</span>}
    {!collapsed && item.badge && (
      <span
        className="ml-auto text-black font-bold rounded-full flex-shrink-0"
        style={{ background: '#facc15', fontSize: '0.6rem', padding: '2px 6px', borderRadius: 10 }}
      >
        {item.badge}
      </span>
    )}
  </div>
);

export default Sidebar;
