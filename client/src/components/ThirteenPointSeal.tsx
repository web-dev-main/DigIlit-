import { useMemo } from "react";

interface ThirteenPointSealProps {
  size?: number;
  className?: string;
}

export function ThirteenPointSeal({ size = 520, className = "" }: ThirteenPointSealProps) {
  const { points, center } = useMemo(() => {
    const cx = size / 2;
    const cy = size / 2;
    const r = size * 0.44;
    const n = 13;
    const pts: { x: number; y: number }[] = [];
    for (let i = 0; i < n; i++) {
      const a = (i / n) * Math.PI * 2 - Math.PI / 2;
      pts.push({ x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) });
    }
    return { points: pts, center: { x: cx, y: cy } };
  }, [size]);

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className={`pointer-events-none ${className}`}
      style={{ maxWidth: "100%", height: "auto" }}
    >
      <defs>
        <radialGradient id="sealGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(251,191,36,0.35)" />
          <stop offset="70%" stopColor="rgba(251,191,36,0.12)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0)" />
        </radialGradient>
      </defs>
      <circle cx={center.x} cy={center.y} r={size * 0.48} fill="url(#sealGlow)" />
      <g stroke="#fbbf24" strokeWidth={1.2} strokeOpacity="0.7">
        {points.map((p, i) => {
          const j = (i + 5) % points.length;
          const q = points[j];
          return <line key={`l-${i}`} x1={p.x} y1={p.y} x2={q.x} y2={q.y} />;
        })}
      </g>
      {points.map((p, i) => (
        <circle key={`c-${i}`} cx={p.x} cy={p.y} r={3} fill="#fbbf24" />
      ))}
      <circle
        cx={center.x}
        cy={center.y}
        r={size * 0.18}
        fill="none"
        stroke="#fde047"
        strokeOpacity={0.35}
        strokeWidth={1}
      />
    </svg>
  );
}
