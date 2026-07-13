import { useEffect, useRef } from 'react';
import {
  Chart,
  LineElement,
  PointElement,
  LineController,
  CategoryScale,
  LinearScale,
  Legend,
  Tooltip,
  Filler,
} from 'chart.js';
import type { QuoteResult } from '../../types';
import { fmtCOP } from '../../utils/chatbot';
import { BASE_CITY, WA_NUMBER } from '../../data/cities';

Chart.register(LineElement, PointElement, LineController, CategoryScale, LinearScale, Legend, Tooltip, Filler);

interface Props {
  quote: QuoteResult;
  cityName: string;
  clientEmail: string | null;
}

const QuoteCard = ({ quote: q, cityName, clientEmail }: Props) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);
  const pbRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartRef.current) return;
    if (chartInstance.current) chartInstance.current.destroy();

    const labels: string[] = [];
    const invested: number[] = [];
    const saved: number[] = [];

    for (let yr = 1; yr <= 25; yr++) {
      labels.push(`Año ${yr}`);
      invested.push(Math.round(q.systemCost));
      saved.push(Math.round(q.yearlySaving * yr));
    }

    chartInstance.current = new Chart(chartRef.current, {
      type: 'line',
      data: {
        labels,
        datasets: [
          {
            label: 'Ahorro acumulado',
            data: saved,
            borderColor: '#1E40AF',
            backgroundColor: 'rgba(30,64,175,0.1)',
            borderWidth: 2,
            pointRadius: 2,
            fill: true,
            tension: 0.4,
          },
          {
            label: 'Inversión inicial',
            data: invested,
            borderColor: '#FFD700',
            backgroundColor: 'rgba(255,215,0,0.05)',
            borderWidth: 2,
            pointRadius: 0,
            fill: false,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { labels: { color: 'rgba(240,244,255,0.6)', font: { family: 'Rajdhani', size: 11 } } },
        },
        scales: {
          x: {
            ticks: { color: 'rgba(240,244,255,0.35)', font: { size: 9 }, maxTicksLimit: 6 },
            grid: { color: 'rgba(255,255,255,0.04)' },
          },
          y: {
            ticks: { color: 'rgba(240,244,255,0.35)', font: { size: 9 }, callback: (v) => fmtCOP(Number(v)) },
            grid: { color: 'rgba(255,255,255,0.04)' },
          },
        },
      },
    });

    return () => { chartInstance.current?.destroy(); };
  }, [q]);

  useEffect(() => {
    if (!pbRef.current) return;
    const pct = Math.max(5, Math.min(100, (1 / q.payback) * 100));
    setTimeout(() => {
      if (pbRef.current) pbRef.current.style.width = `${pct}%`;
    }, 300);
  }, [q.payback]);

  const today = new Date().toLocaleDateString('es-CO', { year: 'numeric', month: 'long', day: 'numeric' });
  const waMsg = encodeURIComponent(`¡Hola! 👋 Vi la cotización solar en ${cityName}.\nInversión estimada: ${fmtCOP(q.systemCost)} COP\nMe gustaría más información. 🌞`);

  return (
    <div
      className="rounded-2xl overflow-hidden w-full"
      style={{
        maxWidth: 520,
        background: 'linear-gradient(160deg, rgba(13,18,31,0.98) 0%, rgba(20,28,50,0.98) 100%)',
        border: '1px solid rgba(255,208,0,0.2)',
        boxShadow: '0 20px 60px rgba(0,0,0,0.6)',
      }}
    >
      {/* Header */}
      <div className="flex items-center gap-3 px-5 py-3" style={{ background: 'linear-gradient(90deg, rgba(255,179,0,0.15), rgba(37,99,235,0.1))', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <span className="text-xl">🌞</span>
        <span className="font-orbitron font-bold text-white tracking-wide" style={{ fontSize: '0.82rem' }}>Cotización Solar Personalizada</span>
        <span className="ml-auto text-xs px-2 py-0.5 rounded-full" style={{ background: 'rgba(255,208,0,0.12)', color: '#facc15', border: '1px solid rgba(255,208,0,0.25)' }}>📍 {cityName}</span>
      </div>

      <div className="p-5 space-y-4">
        {/* Client data */}
        <Section title="👤 Datos del cliente">
          {clientEmail && <Row label="Correo" value={clientEmail} />}
          <Row label="Ciudad" value={cityName} />
          <Row label="Fecha" value={today} />
        </Section>

        {/* Energy */}
        <Section title="⚡ Consumo energético">
          <Row label="Consumo mensual" value={`${Math.round(q.kwh)} kWh`} highlight />
          <Row label={`Tarifa kWh en ${cityName}`} value={fmtCOP(q.costKwh)} />
          <Row label="Factura mensual actual" value={fmtCOP(q.monthly)} />
        </Section>

        {/* System */}
        <Section title="☀️ Sistema Solar">
          <Row label="Paneles requeridos" value={`${q.panels} paneles`} highlight />
          <Row label="Costo paneles" value={fmtCOP(q.panelCost)} />
          <Row label="Mano de obra" value={fmtCOP(q.labor)} />
        </Section>

        {/* Installation */}
        <Section title={`🔧 Instalación (desde ${BASE_CITY})`}>
          {cityName !== BASE_CITY ? (
            <>
              <Row label="Logística y Desplazamiento" value={fmtCOP(q.transport + q.lodging + q.food)} />
              <Row label="Tiempo estimado" value={`${q.days} días, ${q.techs} técnicos`} />
            </>
          ) : (
            <>
              <Row label="Transporte" value="$0 — Instalación local ✓" green />
              <Row label="Tiempo estimado" value={`${q.days} días`} />
            </>
          )}
        </Section>

        {/* Total */}
        <div className="rounded-xl px-4 py-3 text-center" style={{ background: 'rgba(255,208,0,0.08)', border: '1px solid rgba(255,208,0,0.2)' }}>
          <div className="text-text-muted mb-1" style={{ fontSize: '0.75rem' }}>💵 Inversión total del sistema</div>
          <div className="font-orbitron font-black text-accent" style={{ fontSize: '1.4rem' }}>{fmtCOP(q.systemCost)} COP</div>
        </div>

        {/* Benefits */}
        <Section title="💚 Beneficios económicos">
          <Row label="Ahorro mensual" value={fmtCOP(q.monthly)} green />
          <Row label="Ahorro anual" value={fmtCOP(q.yearlySaving)} green />
          <Row label="Recuperación de inversión" value={`${q.payback.toFixed(1)} años`} highlight />
          <div className="mt-2 rounded-full overflow-hidden" style={{ height: 6, background: 'rgba(255,255,255,0.06)' }}>
            <div ref={pbRef} className="h-full rounded-full transition-all duration-700" style={{ width: '0%', background: 'linear-gradient(90deg, #2563eb, #facc15)' }} />
          </div>
          <Row label="💡 Ahorro total a 25 años" value={fmtCOP(q.saving25y)} green bold />
        </Section>

        {/* Chart */}
        <Section title="📈 Proyección ahorro acumulado (25 años)">
          <div style={{ height: 180 }}>
            <canvas ref={chartRef} />
          </div>
        </Section>

        {/* What's included */}
        <Section title="📋 El sistema incluye">
          <div className="grid gap-1" style={{ gridTemplateColumns: '1fr 1fr', fontSize: '0.8rem', color: '#94a3b8' }}>
            {['Paneles alta eficiencia', 'Inversor profesional', 'Sistema de montaje', 'Cableado completo', 'Transporte desde Pereira', 'Garantía fabricante', 'Instalación profesional', 'Asesoría 6 meses'].map((item) => (
              <span key={item}>✅ {item}</span>
            ))}
          </div>
        </Section>

        {/* WhatsApp CTA */}
        <div className="pt-2">
          <a
            href={`https://wa.me/${WA_NUMBER}?text=${waMsg}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 no-underline text-white font-bold w-full py-3 rounded-xl transition-all hover:-translate-y-0.5"
            style={{ background: 'linear-gradient(135deg, #25D366, #128C7E)', fontSize: '0.9rem', boxShadow: '0 4px 16px rgba(37,211,102,0.35)' }}
          >
            💬 Ir a WhatsApp · Hablar con un asesor
          </a>
          {clientEmail && (
            <div className="text-center mt-2" style={{ fontSize: '0.72rem', color: '#64748b', fontFamily: 'Rajdhani, sans-serif', letterSpacing: '0.1em' }}>
              📧 Cotización enviada a · {clientEmail}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="pb-3" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
    <div className="font-semibold text-cyan mb-2" style={{ fontSize: '0.78rem', letterSpacing: '0.06em' }}>{title}</div>
    <div className="space-y-1">{children}</div>
  </div>
);

interface RowProps { label: string; value: string; highlight?: boolean; green?: boolean; bold?: boolean; }

const Row = ({ label, value, highlight, green, bold }: RowProps) => (
  <div className="flex items-center justify-between gap-2" style={{ fontSize: '0.82rem' }}>
    <span className="text-text-muted">{label}</span>
    <span
      className={bold ? 'font-extrabold' : 'font-medium'}
      style={{
        color: highlight ? '#60a5fa' : green ? '#4ade80' : '#f8fafc',
        fontSize: bold ? '0.95rem' : undefined,
      }}
    >
      {value}
    </span>
  </div>
);

export default QuoteCard;
