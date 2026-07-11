/** Flat line-art semi-truck silhouette — no photography in this design, so
 *  this is hand-coded SVG rather than a stock/generated image. Body uses
 *  currentColor so it can be tinted via CSS `color`. */
export function TruckGraphic({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 620 200"
      className={className}
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      {/* trailer */}
      <rect x="200" y="55" width="380" height="95" rx="4" fill="currentColor" opacity="0.9" />
      <line x1="200" y1="75" x2="580" y2="75" stroke="var(--asphalt)" strokeWidth="1" opacity="0.25" />

      {/* cab */}
      <path
        d="M60 150 V95 Q60 80 78 80 H130 L168 55 H185 V150 H60 Z"
        fill="currentColor"
      />
      {/* windshield */}
      <path d="M133 80 L166 60 V80 H133 Z" fill="var(--asphalt)" opacity="0.55" />
      {/* exhaust stack */}
      <rect x="66" y="45" width="8" height="38" rx="2" fill="currentColor" />

      {/* wheels */}
      {[95, 165, 470, 520].map((cx) => (
        <g key={cx}>
          <circle cx={cx} cy="152" r="24" fill="var(--asphalt)" />
          <circle cx={cx} cy="152" r="10" fill="currentColor" opacity="0.6" />
        </g>
      ))}

      {/* ground line */}
      <line x1="0" y1="176" x2="620" y2="176" stroke="currentColor" strokeWidth="1" opacity="0.3" />
    </svg>
  );
}
