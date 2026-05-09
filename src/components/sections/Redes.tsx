import WhatsAppIcon from '../icons/WhatsAppIcon';
import InstagramIcon from '../icons/InstagramIcon';
import FacebookIcon from '../icons/FacebookIcon';
import TikTokIcon from '../icons/TikTokIcon';

const stats = [
  { emoji: '👥', value: '12.5K', label: 'Seguidores totales' },
  { emoji: '📱', value: '4', label: 'Redes activas' },
  { emoji: '💬', value: '98%', label: 'Tasa respuesta' },
  { emoji: '📸', value: '340+', label: 'Publicaciones' },
];

const prominentButtons = [
  {
    href: 'https://www.instagram.com/solar_full_energy_aj/',
    icon: '📸',
    title: 'SÍGUENOS EN INSTAGRAM',
    sub: 'Galería de proyectos y novedades diarias',
    gradient: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)',
  },
  {
    href: 'https://www.facebook.com/people/SOLAR-FULL-Energy/61552494544943/',
    icon: '📘',
    title: 'VISÍTANOS EN FACEBOOK',
    sub: 'Comunidad solar y testimonios reales',
    gradient: 'linear-gradient(45deg, #1877F2, #0052D4)',
  },
  {
    href: 'https://www.tiktok.com/@solar.full.energy',
    icon: '🎵',
    title: 'SÍGUENOS EN TIKTOK',
    sub: '@solar.full.energy · Videos de instalaciones',
    gradient: 'linear-gradient(45deg, #010101, #2d2d2d, #69C9D0)',
  },
];

interface SocialCard {
  href: string;
  Icon: React.ComponentType<{ width?: number; height?: number; fill?: string }>;
  name: string;
  handle: string;
  tag: string;
  color: string;
}

const socialCards: SocialCard[] = [
  { href: 'https://wa.me/573217344209',   Icon: WhatsAppIcon,  name: 'WhatsApp · Asesor 1', handle: '+57 321 734 4209',       tag: 'Respuesta inmediata',     color: '#25D366' },
  { href: 'https://wa.me/573022885999',   Icon: WhatsAppIcon,  name: 'WhatsApp · Asesor 2', handle: '+57 302 288 5999',       tag: 'Respuesta inmediata',     color: '#25D366' },
  { href: 'https://www.instagram.com/solar_full_energy_aj/',                       Icon: InstagramIcon, name: 'Instagram',           handle: '@solar_full_energy_aj', tag: 'Fotos y proyectos',        color: '#E1306C' },
  { href: 'https://www.facebook.com/people/SOLAR-FULL-Energy/61552494544943/',     Icon: FacebookIcon,  name: 'Facebook',            handle: 'Solar Full Energy',     tag: 'Noticias y comunidad',     color: '#1877F2' },
  { href: 'https://www.tiktok.com/@solar.full.energy',                             Icon: TikTokIcon,    name: 'TikTok',              handle: '@solar.full.energy',    tag: 'Videos de instalaciones',  color: '#69C9D0' },
];

const Redes = () => (
  <section className="animate-fadeIn">
    <div className="mb-6">
      <h1 className="shimmer-text font-orbitron font-black text-2xl tracking-wide">📡 Redes Sociales</h1>
      <p className="text-text-muted mt-1 text-sm">Síguenos y mantente conectado con la comunidad solar</p>
    </div>

    {/* Prominent buttons */}
    <div className="grid gap-5 mb-8" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
      {prominentButtons.map((btn) => (
        <a
          key={btn.href}
          href={btn.href}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-5 no-underline text-white font-bold font-orbitron transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02]"
          style={{
            background: btn.gradient,
            padding: '1.5rem',
            borderRadius: 20,
            border: '1.5px solid rgba(255,255,255,0.1)',
            boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
            fontSize: '1rem',
            letterSpacing: '0.05em',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div className="text-4xl flex-shrink-0">{btn.icon}</div>
          <div className="flex flex-col">
            <span>{btn.title}</span>
            <span className="font-normal font-inter mt-1 opacity-85" style={{ fontSize: '0.75rem' }}>{btn.sub}</span>
          </div>
        </a>
      ))}
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

    {/* Social cards */}
    <div className="grid gap-5 mb-6" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))' }}>
      {socialCards.map((card) => (
        <a
          key={card.handle}
          href={card.href}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center no-underline text-center transition-all duration-300 hover:-translate-y-1.5"
          style={{
            background: 'var(--glass)',
            border: `1.5px solid ${card.color}33`,
            borderRadius: 16,
            padding: '1.8rem 1rem',
            gap: '0.6rem',
            color: 'var(--text)',
          }}
        >
          <div style={{ color: card.color, filter: `drop-shadow(0 0 10px ${card.color}66)` }}>
            <card.Icon width={44} height={44} fill={card.color} />
          </div>
          <div className="font-bold" style={{ fontSize: '0.9rem', color: 'var(--text)' }}>{card.name}</div>
          <div className="text-text-muted" style={{ fontSize: '0.75rem' }}>{card.handle}</div>
          <span
            className="rounded-full px-3 py-1"
            style={{ background: `${card.color}18`, border: `1px solid ${card.color}44`, fontSize: '0.68rem', color: card.color }}
          >
            {card.tag}
          </span>
        </a>
      ))}

      {/* Email */}
      <div
        className="flex flex-col items-center text-center"
        style={{ background: 'var(--glass)', border: '1.5px solid rgba(99,102,241,0.3)', borderRadius: 16, padding: '1.8rem 1rem', gap: '0.6rem' }}
      >
        <div style={{ color: '#818cf8', filter: 'drop-shadow(0 0 10px #818cf866)', fontSize: '2.75rem', lineHeight: 1 }}>📧</div>
        <div className="font-bold" style={{ fontSize: '0.9rem', color: 'var(--text)' }}>Email</div>
        <div className="text-text-muted" style={{ fontSize: '0.72rem' }}>solarfullenergy40@gmail.com</div>
        <span className="rounded-full px-3 py-1" style={{ background: '#818cf818', border: '1px solid #818cf844', fontSize: '0.68rem', color: '#818cf8' }}>
          Respuesta &lt; 24h
        </span>
      </div>
    </div>
  </section>
);

export default Redes;
