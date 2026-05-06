/**
 * ============================================================
 * USG LOGO — Vector reproducible (SVG inline)
 * ============================================================
 *
 *  Reproduce el lockup oficial: "USG" en tipografía bold +
 *  monograma de 3 paneles (claro / GINDA / oscuro) con TM.
 *
 *  - variant="dark"  → para fondos claros (texto charcoal)
 *  - variant="light" → para fondos oscuros (texto blanco)
 *
 *  En AMBAS variantes el panel central del monograma conserva
 *  el color ginda corporativo (#C8102E) — solicitud explícita
 *  del cliente.
 * ============================================================
 */

type Props = {
  variant?: "dark" | "light";
  className?: string;
  ariaLabel?: string;
};

export default function UsgLogo({
  variant = "dark",
  className = "",
  ariaLabel = "USG",
}: Props) {
  const isLight = variant === "light";

  // Paleta — el ginda se preserva siempre
  const textColor = isLight ? "#FFFFFF" : "#3F4244";
  const monoLight = isLight ? "#FFFFFF" : "#B5B7BA"; // panel izquierdo (claro)
  const monoGinda = "#C8102E";                       // panel central — GINDA (siempre)
  const monoDark  = isLight ? "#9CA0A4" : "#54585A"; // panel derecho (oscuro)
  const tmColor   = isLight ? "rgba(255,255,255,0.85)" : "#3F4244";

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 360 130"
      role="img"
      aria-label={ariaLabel}
      className={className}
      preserveAspectRatio="xMidYMid meet"
    >
      {/* ─── "USG" wordmark — paths estilo Helvetica Black ─── */}
      <g fill={textColor}>
        {/* U — lados rectos, base semicircular */}
        <path d="
          M 6 12
          L 32 12
          L 32 80
          C 32 91, 39 98, 52 98
          C 65 98, 72 91, 72 80
          L 72 12
          L 98 12
          L 98 82
          C 98 106, 80 122, 52 122
          C 24 122, 6 106, 6 82
          Z" />
        {/* S — curvas balanceadas */}
        <path d="
          M 108 102
          L 122 84
          C 132 93, 144 98, 156 98
          C 167 98, 173 94, 173 87
          C 173 81, 167 77, 152 73
          C 130 67, 114 59, 114 39
          C 114 20, 130 4, 156 4
          C 177 4, 192 11, 202 22
          L 188 40
          C 179 32, 169 28, 156 28
          C 147 28, 141 32, 141 38
          C 141 44, 147 48, 162 52
          C 184 58, 200 67, 200 86
          C 200 108, 183 122, 156 122
          C 132 122, 117 114, 108 102
          Z" />
        {/* G — circular con barra horizontal */}
        <path d="
          M 286 30
          C 276 14, 262 4, 243 4
          C 209 4, 186 28, 186 64
          C 186 99, 209 122, 243 122
          C 263 122, 280 114, 290 100
          L 290 50
          L 244 50
          L 244 70
          L 266 70
          L 266 84
          C 261 90, 254 96, 243 96
          C 224 96, 212 82, 212 64
          C 212 46, 224 30, 243 30
          C 254 30, 263 36, 269 44
          Z" />
      </g>

      {/* ─── Monograma USG — "U" estilizada con 3 paneles ─── */}
      <g transform="translate(304, 6)">
        {/* Panel izquierdo (vertical — color claro) */}
        <polygon
          points="0,4 16,0 16,118 0,118"
          fill={monoLight}
        />
        {/* Panel central — GINDA (preservado en ambas variantes) */}
        <polygon
          points="16,0 38,6 38,112 16,118"
          fill={monoGinda}
        />
        {/* Panel derecho (vertical — color oscuro, ligeramente más alto) */}
        <polygon
          points="38,6 56,0 56,118 38,112"
          fill={monoDark}
        />
      </g>

      {/* TM */}
      <text
        x="358"
        y="22"
        textAnchor="end"
        fontFamily="Helvetica, Arial, sans-serif"
        fontSize="11"
        fontWeight="700"
        fill={tmColor}
      >
        TM
      </text>
    </svg>
  );
}
