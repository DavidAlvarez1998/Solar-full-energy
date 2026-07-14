import { useState, useCallback, useEffect, useRef, lazy, Suspense } from 'react';
import type { SectionId } from './types';
import { useSidebar } from './hooks/useSidebar';
import AuroraBg from './components/layout/AuroraBg';
import Sidebar from './components/layout/Sidebar';
import Topbar from './components/layout/Topbar';
import WhatsAppFAB from './components/layout/WhatsAppFAB';
import Dashboard from './components/sections/Dashboard';
import Servicios from './components/sections/Servicios';
import Instalados from './components/sections/Instalados';
import Redes from './components/sections/Redes';
import Chatbot from './components/sections/Chatbot';

const Admin = lazy(() => import('./sections/Admin'));

const SIDEBAR_W         = 270;
const SIDEBAR_COLLAPSED = 80;

const VALID_SECTIONS: SectionId[] = ['dashboard', 'servicios', 'instalados', 'redes', 'chatbot', 'admin'];

const getSectionFromHash = (): SectionId => {
  const hash = window.location.hash.replace('#', '').split('/')[0];
  return VALID_SECTIONS.includes(hash as SectionId) ? (hash as SectionId) : 'dashboard';
};

const App = () => {
  const [activeSection, setActiveSection] = useState<SectionId>(getSectionFromHash);
  const currentSection = useRef<SectionId>(getSectionFromHash());

  const { collapsed, isMobile, mobileOpen, toggle, closeMobile } = useSidebar();
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const toggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark');

  useEffect(() => {
    const initial = getSectionFromHash();
    currentSection.current = initial;
    window.history.replaceState({ section: initial }, '', `#${initial}`);
    setActiveSection(initial);
  }, []);

  useEffect(() => {
    const onPopState = (e: PopStateEvent) => {
      const section: SectionId = e.state?.section ?? getSectionFromHash();
      currentSection.current = section;
      setActiveSection(section);
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const navigate = useCallback((id: SectionId) => {
    if (currentSection.current === id) return;
    currentSection.current = id;
    window.history.pushState({ section: id }, '', `#${id}`);
    setActiveSection(id);
    closeMobile();
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [closeMobile]);

  const marginLeft = isMobile ? 0 : (collapsed ? SIDEBAR_COLLAPSED : SIDEBAR_W);

  return (
    <div
      data-theme={theme}
      className="flex min-h-screen"
      style={{ background: 'var(--bg)', color: 'var(--text)', fontFamily: 'Inter, sans-serif', transition: 'background 0.3s ease, color 0.3s ease' }}
    >
      <AuroraBg />

      {/* Background watermark */}
      <div
        className="fixed inset-0 flex items-end justify-center pointer-events-none z-[-1]"
        style={{ paddingLeft: isMobile ? 0 : marginLeft, paddingBottom: '10vh', opacity: 0.07, transition: 'padding-left 0.35s ease' }}
        aria-hidden="true"
      >
        <img
          src="/logo-sfe.png"
          alt=""
          style={{ width: '50vh', maxWidth: '70%', filter: 'grayscale(1) brightness(1.5)' }}
          onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
        />
      </div>

      <Sidebar
        activeSection={activeSection}
        collapsed={collapsed}
        isMobile={isMobile}
        mobileOpen={mobileOpen}
        onNavigate={navigate}
        onToggle={toggle}
        onClose={closeMobile}
      /> 
      

      <div
        className="flex-1 min-w-0 relative z-[1]"
        style={{ marginLeft, transition: 'margin-left 0.35s cubic-bezier(0.4,0,0.2,1)' }}
      >
        <Topbar
          activeSection={activeSection}
          theme={theme}
          onThemeToggle={toggleTheme}
          onMenuToggle={toggle}
          isMobile={isMobile}
        />
        

        <main className="page-main px-8 py-7 pb-16" style={{ maxWidth: 1200 }}>
          {activeSection === 'dashboard'  && <Dashboard  onNavigate={navigate} />}
          {activeSection === 'servicios'  && <Servicios />}
          {activeSection === 'instalados' && <Instalados />}
          {activeSection === 'redes'      && <Redes />}
          {activeSection === 'chatbot'    && <Chatbot />}
          {activeSection === 'admin'      && (
            <Suspense fallback={<div style={{ color: '#94a3b8', padding: '2rem' }}>Cargando...</div>}>
              <Admin />
            </Suspense>
          )}
        </main>
      </div>

      <WhatsAppFAB />
    </div>
  );
};

export default App;
