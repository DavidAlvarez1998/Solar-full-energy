const EmailIcon = ({ width = 18, height = 18, fill = 'currentColor' }: { width?: number; height?: number; fill?: string }) => (
  <svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="4" width="20" height="16" rx="3" stroke={fill} strokeWidth="1.8" />
    <path d="M2 8l8.586 5.657a2 2 0 002.828 0L22 8" stroke={fill} strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

export default EmailIcon;
