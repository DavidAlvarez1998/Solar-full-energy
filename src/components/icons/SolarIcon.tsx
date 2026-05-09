const RAYS = [0, 45, 90, 135, 180, 225, 270, 315];

const SolarIcon = ({ size = 44 }: { size?: number }) => {
  const cx = size / 2;
  const innerR = size * 0.215;   // radio del sol
  const rayStart = size * 0.315; // donde empieza el rayo
  const rayEnd   = size * 0.46;  // donde termina el rayo
  const strokeW  = size * 0.055;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Halo exterior suave */}
      <circle cx={cx} cy={cx} r={size * 0.38} fill="#FFD70018" />
      <circle cx={cx} cy={cx} r={size * 0.28} fill="#FFB30022" />

      {/* Rayos */}
      {RAYS.map((deg) => {
        const rad = (deg * Math.PI) / 180;
        return (
          <line
            key={deg}
            x1={cx + rayStart * Math.cos(rad)}
            y1={cx + rayStart * Math.sin(rad)}
            x2={cx + rayEnd   * Math.cos(rad)}
            y2={cx + rayEnd   * Math.sin(rad)}
            stroke="#FFCA28"
            strokeWidth={strokeW}
            strokeLinecap="round"
          />
        );
      })}

      {/* Disco solar */}
      <circle cx={cx} cy={cx} r={innerR + 1.5} fill="#FF8C00" />
      <circle cx={cx} cy={cx} r={innerR}       fill="#FFD700" />

      {/* Destello interior */}
      <circle cx={cx - innerR * 0.38} cy={cx - innerR * 0.38} r={innerR * 0.28} fill="white" opacity="0.35" />
    </svg>
  );
};

export default SolarIcon;
