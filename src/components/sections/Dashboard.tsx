import type { SectionId } from '../../types';

interface DashboardProps {
  onNavigate: (id: SectionId) => void;
}

const stats = [
  { emoji: '🏙️', value: '32', label: 'Ciudades cubiertas' },
  { emoji: '⚡', value: '847', label: 'Instalaciones' },
  { emoji: '🛡️', value: '25 años', label: 'Garantía sistema' },
  { emoji: '💰', value: '100%', label: 'Energía renovable' },
  { emoji: '🌿', value: '1,240 t', label: 'CO₂ evitado' },
];

const cards: { icon: string; iconBg: string; title: string; desc: string; value: string; tag: string; section: SectionId }[] = [
  { icon: '⚡', iconBg: 'rgba(255,208,0,0.12)', title: 'Servicios Prestados', desc: 'Consultoría, diseño de sistemas y asesoría técnica personalizada para cada cliente.', value: '1,240+', tag: '✅ Activo', section: 'servicios' },
  { icon: '🔆', iconBg: 'rgba(37,99,235,0.12)', title: 'Instalaciones Completadas', desc: 'Sistemas fotovoltaicos instalados en residencias, empresas e industrias de Colombia.', value: '847', tag: '🔆 En crecimiento', section: 'instalados' },
  { icon: '📡', iconBg: 'rgba(59,130,246,0.12)', title: 'Comunidad Digital', desc: 'Síguenos en nuestras redes sociales y mantente al tanto de promociones y novedades.', value: '12.5K', tag: '📈 Seguidores', section: 'redes' },
  { icon: '🤖', iconBg: 'rgba(30,58,138,0.12)', title: 'Cotizador IA', desc: 'Obtén una cotización personalizada en minutos con nuestro asistente inteligente.', value: 'Gratis', tag: '🚀 Disponible 24/7', section: 'chatbot' },
];

const Dashboard = ({ onNavigate }: DashboardProps) => (
  <section className="animate-fadeIn">
    <div className="mb-6">
      <h1 className="shimmer-text font-orbitron font-black text-2xl tracking-wide">☀️ Panel de Control</h1>
      <p className="text-text-muted mt-1 text-sm">Bienvenido al sistema de gestión de energía solar — Pereira, Colombia</p>
    </div>

    {/* Cards */}
    <div className="grid gap-5 mb-6" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}>
      {cards.map((c) => (
        <div
          key={c.title}
          className="glass-card p-5 cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:border-blue-500"
          style={{ userSelect: 'none' }}
          onClick={() => onNavigate(c.section)}
        >
          <div className="flex items-center justify-center rounded-xl text-2xl mb-4" style={{ width: 50, height: 50, background: c.iconBg }}>
            {c.icon}
          </div>
          <div className="font-bold text-white mb-1" style={{ fontSize: '0.95rem' }}>{c.title}</div>
          <div className="text-text-muted leading-relaxed" style={{ fontSize: '0.8rem' }}>{c.desc}</div>
          <div className="font-orbitron font-bold text-accent mt-2" style={{ fontSize: '1.2rem' }}>{c.value}</div>
          <span
            className="inline-flex items-center gap-1 mt-2 text-teal"
            style={{ fontSize: '0.7rem', background: 'rgba(37,99,235,0.1)', border: '1px solid rgba(37,99,235,0.2)', borderRadius: 20, padding: '0.18rem 0.6rem' }}
          >
            {c.tag}
          </span>
        </div>
      ))}
    </div>

    {/* CTA */}
    <div
      className="glass-card p-5 mb-6"
      style={{ background: 'linear-gradient(135deg,rgba(255,140,0,0.08),rgba(255,208,0,0.04))', borderColor: 'rgba(255,208,0,0.2)' }}
    >
      <div className="flex items-center gap-4 flex-wrap">
        <div className="flex-1" style={{ minWidth: 200 }}>
          <div className="font-orbitron font-bold text-accent tracking-widest mb-1" style={{ fontSize: '0.8rem' }}>
            ¿LISTO PARA INSTALAR?
          </div>
          <p className="text-text-muted leading-relaxed" style={{ fontSize: '0.85rem' }}>
            Usa nuestro chatbot para obtener una cotización instantánea personalizada. Sin compromisos, 100% gratuito.
          </p>
        </div>
        <button
          onClick={() => onNavigate('chatbot')}
          className="font-bold text-black cursor-pointer transition-all hover:-translate-y-0.5"
          style={{
            background: 'linear-gradient(135deg,#FFD000,#FF8C00)',
            border: 'none',
            padding: '0.75rem 1.5rem',
            borderRadius: 12,
            fontSize: '0.9rem',
            boxShadow: '0 4px 16px rgba(255,140,0,0.35)',
          }}
        >
          🤖 Iniciar Cotización
        </button>
      </div>
    </div>

    {/* Stats */}
    <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))' }}>
      {stats.map((s) => (
        <div key={s.label} className="stat-chip">
          <span className="block text-2xl mb-1">{s.emoji}</span>
          <div className="font-orbitron font-bold text-accent" style={{ fontSize: '0.95rem' }}>{s.value}</div>
          <div className="text-text-muted uppercase tracking-widest mt-0.5" style={{ fontSize: '0.68rem' }}>{s.label}</div>
        </div>
      ))}
    </div>
  </section>
);

export default Dashboard;
