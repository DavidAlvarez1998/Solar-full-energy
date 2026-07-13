import { useEffect, useRef, useState, KeyboardEvent } from 'react';
import { useChatbot } from '../../hooks/useChatbot';
import QuoteCard from '../chatbot/QuoteCard';
import type { ChatMessage } from '../../types';

const Chatbot = () => {
  const { messages, chips, isTyping, handleInput, initWelcome } = useChatbot();
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      initWelcome();
    }
  }, [initWelcome]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const send = () => {
    if (!input.trim()) return;
    handleInput(input);
    setInput('');
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') send();
  };

  return (
    <section className="animate-fadeIn">
      <div className="text-center mb-10" style={{ maxWidth: 700, margin: '0 auto 2.5rem' }}>
        <h1 className="shimmer-text font-orbitron font-black tracking-wide mb-3" style={{ fontSize: 'clamp(1.5rem, 5vw, 2.2rem)' }}>☀️ Cotiza tu Sistema Solar</h1>
        <p className="text-text-muted font-medium" style={{ fontSize: 'clamp(0.85rem, 2vw, 1rem)' }}>
          Tu camino hacia la independencia energética comienza aquí. Obtén una cotización personalizada de nivel industrial en menos de 2 minutos.
        </p>
      </div>

      <div className="grid gap-6 chat-layout-grid" style={{ gridTemplateColumns: '1fr 340px', alignItems: 'start' }}>
        {/* Chat panel */}
        <div
          className="rounded-3xl overflow-hidden flex flex-col animate-panelGlow chat-panel-height"
          style={{
            height: 750,
            background: 'var(--glass)',
            backdropFilter: 'blur(20px)',
            border: '2px solid rgba(37,99,235,0.3)',
            boxShadow: '0 30px 90px rgba(0,0,0,0.6), 0 0 40px rgba(37,99,235,0.15)',
            position: 'relative',
          }}
        >
          {/* Mac-style topbar */}
          <div className="flex items-center gap-2 px-5 py-3" style={{ background: 'linear-gradient(90deg, rgba(255,179,0,0.12), rgba(37,99,235,0.08))', borderBottom: '1px solid var(--border)' }}>
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#FF5F57' }} />
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#FFBD2E' }} />
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#28CA41' }} />
            <span className="ml-auto font-rajdhani text-text-muted uppercase tracking-widest" style={{ fontSize: '0.8rem' }}>☀️ Cotizador Solar</span>
            <div className="flex items-center gap-1.5 text-xs ml-2 px-2 py-0.5 rounded-full" style={{ background: 'rgba(37,99,235,0.1)', border: '1px solid rgba(37,99,235,0.2)', color: '#2563eb' }}>
              <span className="w-1.5 h-1.5 rounded-full animate-blink" style={{ background: '#2563eb', display: 'inline-block' }} />
              En línea
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto flex flex-col gap-4 p-5 chat-scroll" style={{ scrollBehavior: 'smooth' }}>
            {messages.map((msg) => (
              <MessageBubble key={msg.id} msg={msg} />
            ))}

            {isTyping && (
              <div className="flex items-end gap-2">
                <div className="flex items-center justify-center text-base" style={{ width: 32, height: 32, background: 'rgba(255,140,0,0.12)', border: '1px solid rgba(255,140,0,0.25)', borderRadius: '50%' }}>☀️</div>
                <div className="flex gap-1 px-4 py-3 rounded-2xl" style={{ background: 'rgba(255,140,0,0.07)', border: '1px solid rgba(255,140,0,0.18)' }}>
                  {[0, 1, 2].map((i) => (
                    <div key={i} className="w-1.5 h-1.5 rounded-full" style={{ background: '#facc15', animation: `blink 1.4s ${i * 0.2}s ease-in-out infinite` }} />
                  ))}
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Chips */}
          {chips.length > 0 && (
            <div className="flex flex-wrap gap-2 px-4 pb-2">
              {chips.map((chip) => (
                <button
                  key={chip}
                  onClick={() => handleInput(chip)}
                  className="text-accent border font-medium transition-all hover:bg-teal/20 cursor-pointer"
                  style={{
                    fontSize: '0.78rem',
                    background: 'rgba(37,99,235,0.06)',
                    border: '1px solid rgba(37,99,235,0.25)',
                    borderRadius: 20,
                    padding: '0.3rem 0.85rem',
                  }}
                >
                  {chip}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="flex items-center gap-2 p-3" style={{ borderTop: '1px solid var(--border)' }}>
            <div className="flex-1 flex items-center gap-2 rounded-xl px-3" style={{ background: 'var(--glass)', border: '1px solid var(--glass-border)' }}>
              <span className="text-text-dim text-base">💬</span>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={onKeyDown}
                placeholder="Escribe tu mensaje aquí..."
                autoComplete="off"
                className="flex-1 bg-transparent outline-none py-3"
                style={{ fontSize: '0.88rem', border: 'none', color: 'var(--text)' }}
              />
            </div>
            <button
              onClick={send}
              className="flex items-center justify-center flex-shrink-0 cursor-pointer transition-all hover:scale-105"
              style={{ width: 44, height: 44, borderRadius: 12, background: 'linear-gradient(135deg, #FFD000, #FF8C00)', border: 'none', boxShadow: '0 4px 12px rgba(255,160,0,0.35)' }}
              aria-label="Enviar"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="#0a0a0a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </div>
        </div>

        {/* Sidebar info */}
        <ChatSidebar />
      </div>
    </section>
  );
};

const MessageBubble = ({ msg }: { msg: ChatMessage }) => {
  if (msg.type === 'user') {
    return (
      <div className="flex items-end justify-end gap-2">
        <div
          className="max-w-xs px-4 py-3 rounded-2xl rounded-br-sm text-white whitespace-pre-wrap"
          style={{ background: 'linear-gradient(135deg, #1e40af, #2563eb)', fontSize: '0.88rem', boxShadow: '0 4px 12px rgba(37,99,235,0.25)' }}
        >
          {msg.content}
        </div>
        <div className="flex items-center justify-center flex-shrink-0 text-base rounded-full" style={{ width: 32, height: 32, background: 'rgba(37,99,235,0.15)', border: '1px solid rgba(37,99,235,0.3)' }}>👤</div>
      </div>
    );
  }

  if (msg.quoteData) {
    return (
      <div className="flex items-start gap-2">
        <div className="flex items-center justify-center flex-shrink-0 text-base rounded-full" style={{ width: 32, height: 32, background: 'rgba(255,140,0,0.12)', border: '1px solid rgba(255,140,0,0.25)' }}>☀️</div>
        <QuoteCard {...msg.quoteData} />
      </div>
    );
  }

  return (
    <div className="flex items-end gap-2">
      <div className="flex items-center justify-center flex-shrink-0 text-base rounded-full" style={{ width: 32, height: 32, background: 'rgba(255,140,0,0.12)', border: '1px solid rgba(255,140,0,0.25)' }}>☀️</div>
      <div
        className="max-w-xs px-4 py-3 rounded-2xl rounded-bl-sm whitespace-pre-wrap"
        style={{ background: 'rgba(255,140,0,0.10)', border: '1px solid rgba(255,140,0,0.22)', fontSize: '0.88rem', color: 'var(--text)' }}
      >
        {msg.content}
      </div>
    </div>
  );
};

const InfoCard = ({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) => (
  <div
    className="rounded-2xl p-5"
    style={{ background: 'var(--glass)', border: '1px solid rgba(59,130,246,0.2)', ...style }}
  >
    {children}
  </div>
);

const ChatSidebar = () => (
  <div className="flex flex-col gap-4" style={{ position: 'sticky', top: '90px' }}>
    <InfoCard>
      <h3 className="font-bold mb-3" style={{ fontSize: '0.9rem', color: 'var(--text)' }}>📊 ¿Cómo funciona?</h3>
      <ul className="space-y-2">
        {['Indica tu factura', 'Selecciona tu departamento', 'Selecciona tu ciudad', 'Recibe tu cotización ✅', 'Comparte tu contacto', 'Un asesor te llama'].map((step, i) => (
          <li key={step} className="flex items-center gap-2 text-text-muted" style={{ fontSize: '0.82rem' }}>
            <span className="text-base">{['1️⃣','2️⃣','3️⃣','4️⃣','5️⃣','6️⃣'][i]}</span>
            {step}
          </li>
        ))}
      </ul>
    </InfoCard>

    <InfoCard>
      <h3 className="font-bold mb-3" style={{ fontSize: '0.9rem', color: 'var(--text)' }}>💡 Datos del Sistema</h3>
      <div className="space-y-2">
        <InfoRow label="Garantía sistema" value="25 años" green />
        <InfoRow label="Ciudades cubiertas" value="32 ciudades" />
        <InfoRow label="Recuperación" value="3-7 años" accent />
      </div>
    </InfoCard>

    <InfoCard style={{ background: 'linear-gradient(135deg,rgba(37,211,102,0.08),rgba(18,140,126,0.04))', borderColor: 'rgba(37,211,102,0.2)' }}>
      <h3 className="font-bold mb-2" style={{ fontSize: '0.9rem', color: 'var(--text)' }}>📲 ¿Prefieres hablar?</h3>
      <p className="text-text-muted leading-relaxed mb-3" style={{ fontSize: '0.8rem' }}>Contáctanos directamente por WhatsApp y uno de nuestros asesores te atenderá personalmente.</p>
      <div className="flex flex-col gap-2">
        <WAButton href="https://wa.me/573217344209" label="Hablar con Asesor 1" gradient="linear-gradient(135deg,#2563eb,#60a5fa)" />
        <WAButton href="https://wa.me/573022885999" label="Hablar con Asesor 2" gradient="linear-gradient(135deg,#128C7E,#075E54)" />
      </div>
    </InfoCard>

    <InfoCard>
      <h3 className="font-bold mb-3" style={{ fontSize: '0.9rem', color: 'var(--text)' }}>🌟 ¿El sistema incluye?</h3>
      <ul className="space-y-1.5">
        {['Paneles alta eficiencia', 'Inversor profesional', 'Sistema de montaje', 'Cableado completo', 'Instalación profesional', 'Garantía fabricante', 'Asesoría 6 meses'].map((item) => (
          <li key={item} className="flex items-center gap-2 text-text-muted" style={{ fontSize: '0.82rem' }}>
            <span>✅</span> {item}
          </li>
        ))}
      </ul>
    </InfoCard>
  </div>
);

const InfoRow = ({ label, value, green, accent }: { label: string; value: string; green?: boolean; accent?: boolean }) => (
  <div className="flex items-center justify-between" style={{ fontSize: '0.82rem' }}>
    <span className="text-text-muted">{label}</span>
    <span style={{ color: green ? '#4ade80' : accent ? '#facc15' : 'var(--text)', fontWeight: 600 }}>{value}</span>
  </div>
);

const WAButton = ({ href, label, gradient }: { href: string; label: string; gradient: string }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center justify-center gap-2 no-underline text-white font-bold py-2.5 rounded-xl transition-all hover:-translate-y-0.5"
    style={{ background: gradient, fontSize: '0.85rem' }}
  >
    💬 {label}
  </a>
);

export default Chatbot;
