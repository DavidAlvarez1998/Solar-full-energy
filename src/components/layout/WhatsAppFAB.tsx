import WhatsAppIcon from '../icons/WhatsAppIcon';

const WhatsAppFAB = () => (
  <a
    href="https://wa.me/573217344209"
    target="_blank"
    rel="noopener noreferrer"
    title="Contactar por WhatsApp"
    aria-label="Contactar por WhatsApp"
    className="fixed z-[9999] flex items-center gap-2 font-semibold text-white no-underline"
    style={{
      bottom: '2rem', right: '2rem',
      background: 'linear-gradient(135deg, #25D366, #128C7E)',
      borderRadius: '50px',
      padding: '0.7rem 1.2rem',
      fontSize: '0.88rem',
      boxShadow: '0 4px 20px rgba(37,211,102,0.45), 0 0 0 4px rgba(37,211,102,0.1)',
      animation: 'logoPulse 3s ease-in-out infinite',
    }}
  >
    <WhatsAppIcon width={22} height={22} fill="white" />
    WhatsApp
  </a>
);

export default WhatsAppFAB;
