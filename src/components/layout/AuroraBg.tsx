import { useEffect, useRef } from 'react';

const AuroraBg = () => {
  const starsRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<boolean>(false);

  useEffect(() => {
    if (!starsRef.current) return;
    const container = starsRef.current;
    for (let i = 0; i < 100; i++) {
      const star = document.createElement('div');
      const sz = Math.random() * 2.5 + 0.5;
      star.style.cssText = `
        position:absolute;
        width:${sz}px;height:${sz}px;
        top:${Math.random() * 100}vh;
        left:${Math.random() * 100}vw;
        background:white;border-radius:50%;
        --dur:${(Math.random() * 4 + 2).toFixed(1)}s;
        animation-delay:${(Math.random() * 5).toFixed(1)}s;
        opacity:${(Math.random() * 0.5 + 0.1).toFixed(2)};
        animation:twinkle var(--dur,3s) ease-in-out infinite;
      `;
      container.appendChild(star);
    }
  }, []);

  useEffect(() => {
    if (particlesRef.current) return;
    particlesRef.current = true;
    const colors = [
      'rgba(255,208,0,VAL)', 'rgba(255,140,0,VAL)',
      'rgba(0,255,179,VAL)', 'rgba(6,182,212,VAL)',
    ];
    for (let i = 0; i < 20; i++) {
      const p = document.createElement('div');
      const sz = Math.random() * 6 + 2;
      const cl = colors[Math.floor(Math.random() * colors.length)].replace(
        'VAL',
        (Math.random() * 0.4 + 0.2).toFixed(2)
      );
      p.style.cssText = `
        position:fixed;border-radius:50%;pointer-events:none;z-index:1;
        width:${sz}px;height:${sz}px;background:${cl};
        left:${(Math.random() * 100).toFixed(1)}vw;
        animation:pFloat ${(Math.random() * 14 + 8).toFixed(1)}s linear infinite;
        animation-delay:-${(Math.random() * 6).toFixed(1)}s;
        box-shadow:0 0 ${sz * 2}px ${cl};
      `;
      document.body.appendChild(p);
    }
    return () => {
      document.querySelectorAll('[style*="pFloat"]').forEach((el) => el.remove());
    };
  }, []);

  return (
    <>
      {/* Aurora blobs */}
      <div
        className="fixed inset-0 z-0 pointer-events-none overflow-hidden"
        aria-hidden="true"
      >
        <div
          className="absolute animate-aurora1"
          style={{
            width: '75vw', height: '75vw', top: '-30vw', left: '-10vw',
            background: 'radial-gradient(ellipse, rgba(255,215,0,0.08) 0%, rgba(255,179,0,0.03) 45%, transparent 70%)',
            borderRadius: '50%', filter: 'blur(50px)',
          }}
        />
        <div
          className="absolute animate-aurora2"
          style={{
            width: '65vw', height: '65vw', bottom: '-25vw', right: '-15vw',
            background: 'radial-gradient(ellipse, rgba(37,99,235,0.06) 0%, rgba(59,130,246,0.03) 50%, transparent 70%)',
            borderRadius: '50%', filter: 'blur(60px)',
          }}
        />
        <div
          className="absolute"
          style={{
            width: '50vw', height: '50vw', top: '25%', left: '35%',
            background: 'radial-gradient(ellipse, rgba(30,64,175,0.05) 0%, transparent 65%)',
            borderRadius: '50%', filter: 'blur(70px)',
          }}
        />
      </div>

      {/* Stars */}
      <div ref={starsRef} className="fixed inset-0 z-0 pointer-events-none" aria-hidden="true" />
    </>
  );
};

export default AuroraBg;
