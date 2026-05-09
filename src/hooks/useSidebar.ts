import { useState, useEffect } from 'react';

const MOBILE_BP = 768;   // < 768  → sidebar is an overlay drawer
const TABLET_BP = 1024;  // < 1024 → sidebar starts collapsed

export const useSidebar = () => {
  const [isMobile,   setIsMobile]   = useState(() => window.innerWidth < MOBILE_BP);
  const [collapsed,  setCollapsed]  = useState(() => window.innerWidth < TABLET_BP);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onResize = () => {
      const mobile = window.innerWidth < MOBILE_BP;
      setIsMobile(mobile);
      if (!mobile) setMobileOpen(false);
    };
    window.addEventListener('resize', onResize, { passive: true });
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const toggle = () => {
    if (isMobile) setMobileOpen(prev => !prev);
    else          setCollapsed(prev => !prev);
  };

  const closeMobile = () => setMobileOpen(false);

  return { collapsed, isMobile, mobileOpen, toggle, closeMobile };
};
