import { useId } from 'react';

interface LogoSFEProps {
  size?: number;
  /** icon = sun+SFE only; full = arc text + sun + SFE + solar panel */
  variant?: 'icon' | 'full';
}

const LogoSFE = ({ size = 80, variant = 'icon' }: LogoSFEProps) => {
  const uid = useId();
  const isIcon = variant === 'icon';

  // Sun geometry (in SVG user units)
  const cx = 200, cy = 182, r = 84;
  const rayTip = r + 56;   // tip of each ray from center = 140

  // viewBox: icon crops to square showing sun + all rays (5u padding);
  //          full shows the entire logo including arc text and panel
  const pad = 5;
  const vbIcon = `${cx - rayTip - pad} ${cy - rayTip - pad} ${(rayTip + pad) * 2} ${(rayTip + pad) * 2}`;
  const vbFull = '10 14 380 472';
  const viewBox = isIcon ? vbIcon : vbFull;
  const svgHeight = isIcon ? size : Math.round(size * 472 / 380);

  // Unique element IDs (avoids conflicts when component is mounted twice)
  const sunId   = `${uid}sun`;
  const panelId = `${uid}pnl`;
  const arcId   = `${uid}arc`;

  // Teardrop ray path — points straight up, rotated per-ray around (cx,cy)
  const ty = cy - rayTip;           // tip y
  const by = cy - r;                // base y (on sun edge)
  const cm = ty + (by - ty) * 0.42; // mid control point
  const rayD = [
    `M ${cx} ${ty}`,
    `C ${cx + 12} ${cm} ${cx + 16} ${by - 6} ${cx} ${by}`,
    `C ${cx - 16} ${by - 6} ${cx - 12} ${cm} ${cx} ${ty}`,
    'Z',
  ].join(' ');

  // Panel corners (perspective view, panel rendered over lower rays)
  const panel = '73,306 330,288 330,402 73,422';

  return (
    <svg
      viewBox={viewBox}
      width={size}
      height={svgHeight}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        {/* Sun radial gradient: bright yellow center → deep orange edge */}
        <radialGradient id={sunId} cx="42%" cy="34%" r="60%">
          <stop offset="0%"   stopColor="#FFF9C4" />
          <stop offset="22%"  stopColor="#FFD600" />
          <stop offset="60%"  stopColor="#FFA000" />
          <stop offset="100%" stopColor="#E65100" />
        </radialGradient>

        {/* Panel gradient: dark blue → cyan */}
        <linearGradient id={panelId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor="#1565C0" />
          <stop offset="30%"  stopColor="#1976D2" />
          <stop offset="65%"  stopColor="#26C6DA" />
          <stop offset="100%" stopColor="#0D47A1" />
        </linearGradient>

        {/* Invisible arc path for textPath — upper semicircle, r=155 */}
        <path id={arcId} d={`M ${cx - 155},${cy} A 155,155 0 0,1 ${cx + 155},${cy}`} />
      </defs>

      {/* ── Sun rays (14 teardrop shapes, rendered BEFORE disc) ── */}
      {Array.from({ length: 14 }, (_, i) => (
        <path
          key={i}
          d={rayD}
          fill={i % 2 === 0 ? '#FFD700' : '#FFB300'}
          transform={`rotate(${(i * 360) / 14}, ${cx}, ${cy})`}
        />
      ))}

      {/* ── Sun disc ── */}
      <circle cx={cx} cy={cy} r={r} fill={`url(#${sunId})`} />

      {/* ── SFE monogram (white stroke gives the outlined look) ── */}
      <text
        x={cx}
        y={cy + 26}
        textAnchor="middle"
        fontFamily="Georgia, 'Times New Roman', serif"
        fontSize="72"
        fontWeight="bold"
        fontStyle="italic"
        letterSpacing="2"
        paintOrder="stroke"
        stroke="rgba(255,255,255,0.6)"
        strokeWidth="3.5"
        strokeLinejoin="round"
        fill="#0A7EA4"
      >
        SFE
      </text>

      {/* ══ FULL VARIANT ONLY ══ */}

      {/* ── "SOLAR FULL ENERGY" arc text ── */}
      {!isIcon && (
        <text
          fontFamily="Georgia, 'Times New Roman', serif"
          fontSize="23"
          fontWeight="bold"
          letterSpacing="5"
          paintOrder="stroke"
          stroke="rgba(255,255,255,0.35)"
          strokeWidth="1"
          fill="#0A7EA4"
        >
          <textPath href={`#${arcId}`} startOffset="50%" textAnchor="middle">
            SOLAR FULL ENERGY
          </textPath>
        </text>
      )}

      {/* ── Solar panel (renders on top of lower rays) ── */}
      {!isIcon && (
        <g>
          {/* Panel face */}
          <polygon points={panel} fill={`url(#${panelId})`} />

          {/* Panel border */}
          <polygon points={panel} fill="none" stroke="#64B5F6" strokeWidth="2" />

          {/* Horizontal cell dividers (6 lines → 7 rows) */}
          {Array.from({ length: 6 }, (_, i) => {
            const t = (i + 1) / 7;
            return (
              <line
                key={`h${i}`}
                x1={73}  y1={306 + t * 116}
                x2={330} y2={288 + t * 114}
                stroke="#90CAF945" strokeWidth="0.9"
              />
            );
          })}

          {/* Vertical cell dividers (9 lines → 10 columns) */}
          {Array.from({ length: 9 }, (_, i) => {
            const t = (i + 1) / 10;
            const x    = 73 + t * 257;
            const yTop = 306 + t * (288 - 306);  // top edge lerp
            const yBot = 422 + t * (402 - 422);  // bottom edge lerp
            return (
              <line
                key={`v${i}`}
                x1={x} y1={yTop}
                x2={x} y2={yBot}
                stroke="#90CAF945" strokeWidth="0.9"
              />
            );
          })}

          {/* Panel right-edge highlight */}
          <line x1={330} y1={288} x2={330} y2={402} stroke="#90CAF9" strokeWidth="2.5" />

          {/* Stand post */}
          <polygon
            points="184,422 216,422 223,460 177,460"
            fill="#78909C" stroke="#546E7A" strokeWidth="1"
          />
          {/* Base foot */}
          <polygon
            points="150,457 250,457 262,472 138,472"
            fill="#607D8B" stroke="#455A64" strokeWidth="1"
          />
        </g>
      )}
    </svg>
  );
};

export default LogoSFE;
