const stats = [
  { emoji: '📋', value: '12', label: 'Servicios activos' },
  { emoji: '⭐', value: '4.9/5', label: 'Calificación' },
  { emoji: '🏆', value: '1,240', label: 'Clientes atendidos' },
  { emoji: '⏱️', value: '48h', label: 'Tiempo respuesta' },
];

type BadgeVariant = 'success' | 'gold' | 'cyan' | 'violet';

const services: { name: string; description: string; badge: { text: string; variant: BadgeVariant } }[] = [
  { name: '☀️ Instalación de Paneles Solares', description: 'Montaje profesional de sistemas fotovoltaicos completos', badge: { text: '✅ Activo', variant: 'success' } },
  { name: '🛒 Venta de Paneles Fotovoltaicos', description: 'Equipos de alta eficiencia con garantía certificada', badge: { text: '✅ Activo', variant: 'success' } },
  { name: '📐 Diseño del Sistema', description: 'Diseño profesional del sistema adaptado a su necesidad', badge: { text: '✅ Activo', variant: 'success' } },
  { name: '📊 Cotización Detallada', description: 'Asesoría personalizada con desglose de ahorro', badge: { text: '✅ Activo', variant: 'success' } },
  { name: '🔌 Asesoría Eléctrica', description: 'Revisión de instalaciones para optimización solar', badge: { text: '⚡ Premium', variant: 'gold' } },
  { name: '🛡️ Mantenimiento', description: 'Plan preventivo para asegurar máxima producción', badge: { text: '💜 Popular', variant: 'violet' } },
  { name: '🌐 Trámites UPME', description: 'Gestión de permisos ante entes reguladores', badge: { text: '✅ Activo', variant: 'success' } },
];

const featureCards = [
  { icon: '🌞', bg: 'rgba(255,208,0,0.12)', title: 'Energía Fotovoltaica', desc: 'Sistemas de generación solar para hogares y empresas. Tecnología de última generación con máxima eficiencia energética.', tag: '🔆 Desde 1kW hasta 1MW' },
  { icon: '🔋', bg: 'rgba(37,99,235,0.12)', title: 'Sistemas con Baterías', desc: 'Almacenamiento de energía para independencia total de la red eléctrica. Autonomía 24/7.', tag: '⚡ Off-grid & On-grid' },
  { icon: '🏭', bg: 'rgba(59,130,246,0.12)', title: 'Proyectos Industriales', desc: 'Grandes instalaciones para industrias y parques solares. Asesoría completa desde diseño hasta puesta en marcha.', tag: '🏆 Proyectos +100kW' },
];

const badgeClass: Record<BadgeVariant, string> = {
  success: 'badge-success',
  gold: 'badge-gold',
  cyan: 'badge-cyan',
  violet: 'badge-violet',
};

const Servicios = () => (
  <section className="animate-fadeIn">
    <div className="mb-6">
      <h1 className="shimmer-text font-orbitron font-black text-2xl tracking-wide">⚡ Servicios Prestados</h1>
      <p className="text-text-muted mt-1 text-sm">Catálogo completo de servicios de consultoría y diseño solar</p>
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

    {/* Table */}
    <div className="glass-card mb-6 services-table-wrap" style={{ padding: 0, overflow: 'hidden' }}>
      <table className="w-full" style={{ borderCollapse: 'separate', borderSpacing: '0 0.4rem', minWidth: 480 }}>
        <thead>
          <tr>
            {['Servicio', 'Descripción', 'Estado'].map((h) => (
              <th key={h} className="text-left text-text-dim uppercase tracking-widest px-4 py-2" style={{ fontSize: '0.68rem' }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {services.map((row) => (
            <tr key={row.name} className="services-table-row">
              <td className="rounded-l-lg">{row.name}</td>
              <td>{row.description}</td>
              <td className="rounded-r-lg">
                <span className={`badge ${badgeClass[row.badge.variant]}`}>{row.badge.text}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    {/* Feature cards */}
    <div className="grid gap-5" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}>
      {featureCards.map((c) => (
        <div key={c.title} className="glass-card p-5">
          <div className="flex items-center justify-center rounded-xl text-2xl mb-4" style={{ width: 50, height: 50, background: c.bg }}>{c.icon}</div>
          <div className="font-bold text-white mb-1" style={{ fontSize: '0.95rem' }}>{c.title}</div>
          <div className="text-text-muted leading-relaxed mb-2" style={{ fontSize: '0.8rem' }}>{c.desc}</div>
          <span className="inline-flex items-center gap-1 text-teal" style={{ fontSize: '0.7rem', background: 'rgba(37,99,235,0.1)', border: '1px solid rgba(37,99,235,0.2)', borderRadius: 20, padding: '0.18rem 0.6rem' }}>{c.tag}</span>
        </div>
      ))}
    </div>
  </section>
);

export default Servicios;
