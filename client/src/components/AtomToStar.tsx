import { useEffect, useState } from "react";

interface AtomToStarProps {
  delay?: number;
}

export function AtomToStar({ delay = 0 }: AtomToStarProps) {
  const [toStar, setToStar] = useState(false);

  useEffect(() => {
    const toggle = setInterval(() => setToStar((v) => !v), 3800);
    const initial = setTimeout(() => setToStar(true), delay);
    return () => {
      clearInterval(toggle);
      clearTimeout(initial);
    };
  }, [delay]);

  return (
    <div className="relative h-5 w-5">
      <svg
        viewBox="0 0 24 24"
        className={`absolute inset-0 transition-all duration-700 ${
          toStar ? "opacity-0 scale-50" : "opacity-100 scale-100"
        }`}
        style={{ filter: "drop-shadow(0 0 8px rgba(250,204,21,0.8))" }}
      >
        <circle cx="12" cy="12" r="1.5" fill="#fbbf24" />
        <ellipse
          cx="12"
          cy="12"
          rx="9"
          ry="4"
          stroke="#fbbf24"
          strokeWidth="1.3"
          fill="none"
        />
        <ellipse
          cx="12"
          cy="12"
          rx="9"
          ry="4"
          transform="rotate(60 12 12)"
          stroke="#fbbf24"
          strokeWidth="1.3"
          fill="none"
        />
        <ellipse
          cx="12"
          cy="12"
          rx="9"
          ry="4"
          transform="rotate(120 12 12)"
          stroke="#fbbf24"
          strokeWidth="1.3"
          fill="none"
        />
      </svg>
      <svg
        viewBox="0 0 24 24"
        className={`absolute inset-0 transition-all duration-700 ${
          toStar ? "opacity-100 scale-110" : "opacity-0 scale-50"
        }`}
        style={{ filter: "drop-shadow(0 0 12px rgba(250,204,21,1))" }}
      >
        <polygon
          points="12,2 14.9,8.2 22,9.2 16.8,13.8 18.3,20.8 12,17.2 5.7,20.8 7.2,13.8 2,9.2 9.1,8.2"
          fill="#fde047"
        />
      </svg>
    </div>
  );
}
