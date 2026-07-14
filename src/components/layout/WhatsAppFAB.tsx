import WhatsAppIcon from '../icons/WhatsAppIcon';

const WhatsAppFAB = () => (
  <a
    href="https://wa.me/573217344209"
    target="_blank"
    rel="noopener noreferrer"
    title="Contactar por WhatsApp"
    aria-label="Contactar por WhatsApp"
    className="fixed z-[9999] flex items-center justify-center"
    style={{
      bottom: '1.5rem', right: '1.5rem',
      width: 44, height: 44,
      borderRadius: '50%',
      background: 'rgba(37,211,102,0.82)',
      boxShadow: '0 2px 10px rgba(37,211,102,0.28)',
      transition: 'transform 0.18s ease, box-shadow 0.18s ease, opacity 0.18s ease',
      opacity: 0.82,
    }}
    onMouseEnter={e => {
      const el = e.currentTarget as HTMLAnchorElement;
      el.style.transform = 'scale(1.1)';
      el.style.opacity = '1';
      el.style.boxShadow = '0 4px 18px rgba(37,211,102,0.5)';
    }}
    onMouseLeave={e => {
      const el = e.currentTarget as HTMLAnchorElement;
      el.style.transform = '';
      el.style.opacity = '0.82';
      el.style.boxShadow = '0 2px 10px rgba(37,211,102,0.28)';
    }}
  >
    <WhatsAppIcon width={20} height={20} fill="white" />
  </a>
);

export default WhatsAppFAB;
