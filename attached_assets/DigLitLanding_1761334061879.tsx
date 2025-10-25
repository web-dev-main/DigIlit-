// DigLitLanding.tsx
"use client";
import React, { useEffect, useMemo, useState } from "react";

// Utility
const clamp = (min: string, pref: string, max: string) => `clamp(${min}, ${pref}, ${max})`;

// ========= Feather Search Component (compact) =========
function FeatherSearch() {
  return (
    <div className="relative flex items-center rounded-lg border border-amber-500/30 bg-black/30 backdrop-blur px-2 py-1 h-8">
      <span className="text-base">🪶</span>
      <input
        readOnly
        value="search"
        className="ml-2 bg-transparent outline-none text-amber-100 text-xs w-20 placeholder-amber-300/60"
        placeholder="Search"
      />
    </div>
  );
}

// ========= Atom to Star morphing =========
function AtomToStar({ delay = 0 }: { delay?: number }) {
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
        <ellipse cx="12" cy="12" rx="9" ry="4" stroke="#fbbf24" strokeWidth="1.3" fill="none" />
        <ellipse cx="12" cy="12" rx="9" ry="4" transform="rotate(60 12 12)" stroke="#fbbf24" strokeWidth="1.3" fill="none" />
        <ellipse cx="12" cy="12" rx="9" ry="4" transform="rotate(120 12 12)" stroke="#fbbf24" strokeWidth="1.3" fill="none" />
      </svg>
      <svg
        viewBox="0 0 24 24"
        className={`absolute inset-0 transition-all duration-700 ${
          toStar ? "opacity-100 scale-110" : "opacity-0 scale-50"
        }`}
        style={{ filter: "drop-shadow(0 0 12px rgba(250,204,21,1))" }}
      >
        <polygon points="12,2 14.9,8.2 22,9.2 16.8,13.8 18.3,20.8 12,17.2 5.7,20.8 7.2,13.8 2,9.2 9.1,8.2" fill="#fde047" />
      </svg>
    </div>
  );
}

// ========= 13-point star seal =========
function ThirteenPointSeal({ size = 520, className = "" }: { size?: number; className?: string }) {
  const { points, center } = useMemo(() => {
    const cx = size / 2;
    const cy = size / 2;
    const r = size * 0.44;
    const n = 13;
    const pts: { x: number; y: number }[] = [];
    for (let i = 0; i < n; i++) {
      const a = (i / n) * Math.PI * 2 - Math.PI / 2; // point 0 at top
      pts.push({ x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) });
    }
    return { points: pts, center: { x: cx, y: cy } };
  }, [size]);

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className={`pointer-events-none ${className}`} style={{ maxWidth: "100%", height: "auto" }}>
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
      <circle cx={center.x} cy={center.y} r={size * 0.18} fill="none" stroke="#fde047" strokeOpacity={0.35} strokeWidth={1} />
    </svg>
  );
}

// ========= Top Bar =========
function TopBar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const nav = [
    { label: "Solutions", icon: "🧩", href: "#solutions" },
    { label: "Services", icon: "🛠️", href: "#services" },
    { label: "Shop", icon: "🛒", href: "#shop" },
    { label: "Partner", icon: "🤝", href: "#partner" },
    { label: "Login", icon: "🔐", href: "#login" },
  ];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 border-b ${
        scrolled ? "backdrop-blur-2xl bg-black/75 border-amber-500/40 shadow-[0_8px_40px_rgba(245,158,11,0.15)]" : "backdrop-blur-md bg-black/25 border-amber-500/20"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <FeatherSearch />
          <a
            href="#home"
            className="flex items-center justify-center h-10 w-10 rounded-lg border border-amber-500/30 hover:border-amber-300 hover:bg-amber-500/10 transition-all duration-300"
            aria-label="Home"
            title="Home"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m3 9 9-7 9 7" />
              <path d="M9 22V12h6v10" />
              <path d="M4 10v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V10" />
            </svg>
          </a>
        </div>

        {/* Nine stars row (5th aligns to hero center visually) */}
        <div className="hidden md:flex items-center gap-2 w-full max-w-xs justify-center">
          {Array.from({ length: 9 }).map((_, i) => (
            <AtomToStar key={i} delay={i * 160} />
          ))}
        </div>

        {/* Icon Navigation with tooltips */}
        <nav className="hidden md:flex items-center gap-2">
          {nav.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="relative h-10 w-10 grid place-items-center rounded-lg border border-amber-500/30 text-amber-100/90 hover:text-yellow-200 hover:border-amber-300 hover:bg-amber-500/10 transition-all duration-300"
              aria-label={item.label}
            >
              <span className="text-lg" title={item.label}>
                {item.icon}
              </span>
            </a>
          ))}
        </nav>

        {/* Mobile */}
        <div className="md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg border border-amber-500/30 hover:border-amber-300 hover:bg-amber-500/10 transition-all duration-300"
            aria-label="Menu"
            title="Menu"
          >
            <div className="w-6 h-6 flex flex-col justify-center gap-1">
              <span className={`w-full h-0.5 bg-amber-300 transition-all duration-300 ${mobileMenuOpen ? "rotate-45 translate-y-1.5" : ""}`} />
              <span className={`w-full h-0.5 bg-amber-300 transition-all duration-300 ${mobileMenuOpen ? "opacity-0" : ""}`} />
              <span className={`w-full h-0.5 bg-amber-300 transition-all duration-300 ${mobileMenuOpen ? "-rotate-45 -translate-y-1.5" : ""}`} />
            </div>
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t border-amber-500/20 bg-black/95 backdrop-blur-2xl">
          <div className="px-4 py-3 grid grid-cols-5 gap-2">
            {nav.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="flex flex-col items-center gap-1 py-2 rounded-lg border border-amber-500/20 text-amber-100/90 hover:border-amber-300 hover:bg-amber-500/10 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="text-xl">{item.icon}</span>
                <span className="text-xs">{item.label}</span>
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

// ========= HERO =========
function Hero() {
  const titleSize = clamp("2.8rem", "9.5vw", "9rem");

  const letterStyle: React.CSSProperties = {
    background: "linear-gradient(180deg, #e5e7eb 0%, #cbd5e1 45%, #94a3b8 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    filter: "drop-shadow(0 0 18px rgba(255,255,255,0.25))",
    fontSize: titleSize,
    lineHeight: 0.92,
    fontFamily: "'Orbitron', sans-serif",
    fontWeight: 900,
  };

  return (
    <section id="home" className="relative min-h-[92vh] flex flex-col items-center justify-center pt-28 pb-12">
      <div className="relative z-10 text-center w-full max-w-7xl px-4">
        {/* Star Behind Title */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-90 mix-blend-screen w-[75vw] max-w-[520px]">
          <ThirteenPointSeal size={520} />
        </div>

        {/* DIG | LIT */}
        <div className="relative flex items-center justify-center gap-2 sm:gap-4">
          <div className="flex items-end gap-[0.1em] sm:gap-[0.25em] z-20">
            {"DIG".split("").map((c, i) => (
              <span key={i} style={letterStyle}>
                {c}
              </span>
            ))}
          </div>

          {/* Blinking bar centered to seal ring */}
          <span
            className="animate-blink z-20"
            style={{
              fontSize: titleSize,
              lineHeight: 0.92,
              fontFamily: "'Orbitron', sans-serif",
              fontWeight: 900,
              color: "#fde047",
              filter: "drop-shadow(0 0 16px rgba(250,204,21,0.8))",
            }}
          >
            |
          </span>

          <div className="flex items-end gap-[0.1em] sm:gap-[0.25em] z-20">
            {"LIT".split("").map((c, i) => (
              <span key={i} style={letterStyle}>
                {c}
              </span>
            ))}
          </div>
        </div>

        <p className="mt-6 bg-clip-text text-transparent bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-300 font-semibold tracking-wide z-20 relative" style={{ fontSize: clamp("1rem", "3.2vw", "2.6rem") }}>
          Your Vision + Our Mission = Hegemony
        </p>
      </div>

      {/* Vision & Mission boxes — pulled further down */}
      <div className="relative z-10 mt-24 max-w-5xl w-full px-4 mx-auto">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-amber-500/30 bg-gradient-to-br from-amber-950/20 via-black/40 to-black/50 backdrop-blur-xl p-6">
            <h3 className="text-2xl font-black text-amber-300 mb-3">Vision</h3>
            <p className="text-amber-100/80 leading-relaxed">
              To architect autonomous systems that amplify human potential and establish digital supremacy for visionary leaders.
            </p>
          </div>
          <div className="rounded-2xl border border-amber-500/30 bg-gradient-to-br from-amber-950/20 via-black/40 to-black/50 backdrop-blur-xl p-6">
            <h3 className="text-2xl font-black text-amber-300 mb-3">Mission</h3>
            <p className="text-amber-100/80 leading-relaxed">
              Deploy cutting-edge AI and elite teams to transform businesses into unstoppable market forces through innovation and excellence.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ========= Solutions Section =========
function SolutionsSection() {
  const solutions = [
    { name: "Virtual Assistant", icon: "🤵", desc: "24/7 intelligent support that scales with your needs" },
    { name: "AI Assistant", icon: "🤖", desc: "Advanced automation powered by machine learning" },
    { name: "Expert Team", icon: "👥", desc: "Dedicated specialists driving your success" },
    { name: "Digital Transformation", icon: "🚀", desc: "Complete modernization of your business systems" },
    { name: "Quantum ERP", icon: "⚡", desc: "Next-generation enterprise resource planning" },
  ];

  return (
    <section id="solutions" className="relative py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <h2 className="text-center text-4xl sm:text-5xl md:text-6xl font-black bg-clip-text text-transparent bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-300 mb-4" style={{ fontFamily: "'Orbitron', sans-serif" }}>
          Our Solutions
        </h2>
        <p className="text-center text-amber-100/80 text-lg max-w-2xl mx-auto mb-12">Comprehensive services designed to elevate your digital presence</p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {solutions.map((solution) => (
            <div key={solution.name} className="group relative rounded-2xl border border-amber-500/40 bg-gradient-to-br from-amber-950/30 via-black/40 to-black/50 backdrop-blur-xl p-6 hover:border-amber-400 hover:shadow-[0_0_50px_rgba(245,158,11,0.3)] transition-all duration-300">
              <div className="text-5xl mb-4">{solution.icon}</div>
              <h3 className="text-xl font-black bg-clip-text text-transparent bg-gradient-to-br from-amber-200 via-yellow-300 to-amber-400 mb-2">{solution.name}</h3>
              <p className="text-amber-100/80 text-sm leading-relaxed">{solution.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ========= 9D Framework (pixel precise) =========
function Framework9D({ onContactClick }: { onContactClick: () => void }) {
  const nodes = [
    { name: "Dream", icon: "💭" },
    { name: "Design", icon: "🎨" },
    { name: "Develop", icon: "⚙️" },
    { name: "Deploy", icon: "🚀" },
    { name: "Detect", icon: "🔍" },
    { name: "Delegate", icon: "🤖" },
    { name: "Discover", icon: "💡" },
    { name: "Decide", icon: "📊" },
    { name: "Disrupt", icon: "⚡" },
  ];

  return (
    <section id="framework9d" className="relative py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <h2 className="text-center text-4xl sm:text-5xl md:text-6xl font-black bg-clip-text text-transparent bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-300" style={{ fontFamily: "'Orbitron', sans-serif" }}>
          The 9D Framework
        </h2>
        <p className="mt-3 text-center text-amber-100/80 max-w-2xl mx-auto">Precision-crafted radial interface. Hover for labels; click center to contact.</p>

        <div className="mt-14 mx-auto w-full max-w-[680px] aspect-square">
          <svg viewBox="0 0 680 680" className="w-full h-full">
            <defs>
              <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="8" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <g transform="translate(340,340)">
              {[100, 170, 240].map((r, i) => (
                <circle key={r} r={r} fill="none" stroke="#fbbf24" strokeOpacity={0.12 + i * 0.06} strokeWidth={1} />
              ))}
              {nodes.map((_, i) => {
                const a = (i / nodes.length) * Math.PI * 2 - Math.PI / 2;
                const x = Math.cos(a) * 240;
                const y = Math.sin(a) * 240;
                return <line key={i} x1={0} y1={0} x2={x} y2={y} stroke="#fbbf24" strokeOpacity={0.15} strokeWidth={1} />;
              })}
              {nodes.map((n, i) => {
                const a = (i / nodes.length) * Math.PI * 2 - Math.PI / 2;
                const r = 240;
                const x = Math.cos(a) * r;
                const y = Math.sin(a) * r;
                return (
                  <g key={n.name} transform={`translate(${x},${y})`}>
                    <circle r={24} fill="#0b0b0b" stroke="#fbbf24" strokeOpacity={0.55} strokeWidth={1.5} />
                    <text textAnchor="middle" y={6} fontSize="18" filter="url(#softGlow)">
                      {n.icon}
                    </text>
                    <title>{n.name}</title>
                  </g>
                );
              })}
              <g onClick={onContactClick} style={{ cursor: "pointer" }}>
                <circle r={68} fill="#0b0b0bdd" stroke="#fbbf24" strokeWidth={2} />
                <circle r={84} fill="none" stroke="#fbbf24" strokeOpacity={0.35} strokeDasharray="6 10" />
                <text textAnchor="middle" y={6} fontWeight={800} fontSize="18" fill="#fde047">
                  LET'S DIG
                </text>
              </g>
            </g>
          </svg>
        </div>
      </div>
    </section>
  );
}

// ========= Vision Statement =========
function VisionStatement() {
  return (
    <section className="relative py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="rounded-3xl border border-amber-500/50 bg-gradient-to-br from-amber-950/40 via-yellow-950/30 to-amber-950/40 backdrop-blur-2xl p-8 sm:p-12 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black bg-clip-text text-transparent bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-300 mb-6" style={{ fontFamily: "'Orbitron', sans-serif" }}>
            Why Choose DIG|LIT?
          </h2>
          <p className="text-lg sm:text-xl text-amber-100/90 leading-relaxed">
            We don't just build systems. We architect dominance. Our elite force combines cutting-edge AI with human expertise to deliver results that redefine what's possible. When you partner with DIG|LIT, you're not just adopting technology—you
            're claiming your position at the forefront of the digital revolution.
          </p>
        </div>
      </div>
    </section>
  );
}

// ========= Footer (toned down) =========
function Footer() {
  const [quoteIdx, setQuoteIdx] = useState(0);
  const quotes = [
    { text: "The best way to predict the future is to create it.", author: "Peter Drucker" },
    { text: "Innovation distinguishes between a leader and a follower.", author: "Steve Jobs" },
    { text: "Success is not final. Failure is not fatal.", author: "Winston Churchill" },
    { text: "Simplicity is the ultimate sophistication.", author: "Leonardo da Vinci" },
  ];
  useEffect(() => {
    const timer = setInterval(() => setQuoteIdx((p) => (p + 1) % quotes.length), 5500);
    return () => clearInterval(timer);
  }, []);
  const socials = [
    { name: "Twitter", icon: "𝕏", href: "https://twitter.com/digilit" },
    { name: "LinkedIn", icon: "in", href: "https://linkedin.com/company/digilit" },
    { name: "Instagram", icon: "◎", href: "https://instagram.com/digilit" },
    { name: "Facebook", icon: "f", href: "https://facebook.com/digilit" },
  ];
  return (
    <footer className="relative border-t border-amber-500/20 bg-black/85 backdrop-blur-xl">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid md:grid-cols-3 gap-10">
          <div className="text-center md:text-left">
            <h4 className="text-base font-bold text-amber-300/90 flex items-center justify-center md:justify-start gap-2">
              <span>🌐</span> Connect
            </h4>
            <div className="mt-4 flex flex-wrap justify-center md:justify-start gap-2">
              {socials.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  className="rounded-lg border border-amber-500/20 px-3 py-2 hover:border-amber-300 hover:bg-amber-500/10 transition-all duration-300 text-amber-300/90 hover:text-amber-200 text-sm"
                  target="_blank"
                  rel="noopener noreferrer"
                  title={s.name}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
          <div className="text-center">
            <h4 className="text-base font-bold text-amber-300/90 flex items-center justify-center gap-2">
              <span>💡</span> Inspiration
            </h4>
            <div className="mt-4 rounded-xl border border-amber-500/20 bg-amber-950/10 backdrop-blur px-4 py-6 min-h-[120px] relative text-amber-100/90">
              {quotes.map((q, i) => (
                <div key={i} className={`transition-all duration-700 ${i === quoteIdx ? "opacity-100 translate-y-0" : "opacity-0 absolute inset-0 translate-y-4 px-4 py-6"}`}>
                  <p className="text-sm italic">"{q.text}"</p>
                  <p className="mt-2 text-amber-300 text-xs font-semibold">{q.author}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="text-center md:text-right">
            <h4 className="text-base font-bold text-amber-300/90 flex items-center justify-center md:justify-end gap-2">
              <span>🆘</span> Support
            </h4>
            <div className="mt-4">
              <a href="mailto:support@digIlit.com" className="text-amber-200/90 hover:text-amber-100 font-semibold text-sm transition-colors">
                support@digIlit.com
              </a>
            </div>
          </div>
        </div>
        <div className="mt-10 pt-8 border-t border-amber-500/20 text-center">
          <h3 className="text-2xl sm:text-3xl font-black tracking-tight" style={{ fontFamily: "'Orbitron', sans-serif" }}>
            <span className="text-white">DIG</span>
            <span className="text-amber-400 mx-3">|</span>
            <span className="text-white">LIT</span>
          </h3>
          <p className="mt-3 text-sm text-amber-200/70">Architecting autonomous systems for visionary leaders.</p>
          <p className="mt-4 text-[10px] text-amber-200/50">© 2025 DIG|LIT. ALL RIGHTS RESERVED. | Z - Founder Dig|lit</p>
        </div>
      </div>
    </footer>
  );
}

// ========= Background Scene (subtle + aligned) =========
function BackgroundScene() {
  const stars = useMemo(
    () =>
      Array.from({ length: 90 }).map(() => ({
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: 0.8 + Math.random() * 1.4,
        dur: 2.5 + Math.random() * 2.5,
        delay: Math.random() * 3,
      })),
    []
  );
  const floaters = useMemo(
    () =>
      Array.from({ length: 14 }).map(() => ({
        left: Math.random() * 100,
        top: Math.random() * 100,
        dur: 16 + Math.random() * 16,
        delay: Math.random() * 6,
      })),
    []
  );
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_20%,rgba(59,130,246,0.10)_0%,transparent_60%),radial-gradient(ellipse_at_60%_70%,rgba(251,191,36,0.08)_0%,transparent_65%)] from-[#020617] via-[#000] to-[#000]" />
      {stars.map((s, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-white/80"
          style={{
            width: `${s.size}px`,
            height: `${s.size}px`,
            left: `${s.left}%`,
            top: `${s.top}%`,
            opacity: 0.7,
            animation: `twinkle ${s.dur}s ease-in-out ${s.delay}s infinite`,
          }}
        />
      ))}
      {floaters.map((f, i) => (
        <span
          key={`f-${i}`}
          className="absolute w-[3px] h-[3px] rounded-full bg-amber-400/40"
          style={{
            left: `${f.left}%`,
            top: `${f.top}%`,
            animation: `float ${f.dur}s linear ${f.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

// ========= Main App =========
export default function DigLitLanding() {
  const [showContact, setShowContact] = useState(false);
  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&display=swap');
      html { scroll-behavior: smooth; }
      body { background: #000; overflow-x: hidden; }
      @keyframes blink { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.3; transform: scale(0.9); } }
      @keyframes twinkle { 0%, 100% { opacity: 0.3; transform: scale(1); } 50% { opacity: 1; transform: scale(1.2); } }
      @keyframes float { 0% { transform: translateY(0) translateX(0); } 50% { transform: translateY(-40vh) translateX(45px); } 100% { transform: translateY(-80vh) translateX(0); } }
      .animate-blink { animation: blink 1.3s ease-in-out infinite; }
      ::-webkit-scrollbar { width: 8px; height: 8px; }
      ::-webkit-scrollbar-track { background: #000; }
      ::-webkit-scrollbar-thumb { background: linear-gradient(180deg, #f59e0b, #fbbf24); border-radius: 4px; }
      ::-webkit-scrollbar-thumb:hover { background: linear-gradient(180deg, #fbbf24, #f59e0b); }
    `;
    document.head.appendChild(style);
    return () => { document.head.removeChild(style); };
  }, []);

  return (
    <>
      <div className="relative min-h-screen text-white">
        <BackgroundScene />
        {showContact ? (
          <ContactForm onBack={() => setShowContact(false)} />
        ) : (
          <>
            <TopBar />
            <main className="pt-20">
              <Hero />
              <SolutionsSection />
              <Framework9D onContactClick={() => setShowContact(true)} />
              <VisionStatement />
            </main>
            <Footer />
          </>
        )}
      </div>
    </>
  );
}

// ========= Contact Form =========
function ContactForm({ onBack }: { onBack: () => void }) {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    designation: "",
    contact: "",
    bestTime: "",
    solutions: [] as string[],
    smartGoal: "",
  });
  const options = ["Virtual Assistant", "AI Assistant", "Expert Team", "Digital Transformation", "Quantum ERP"];
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Thank you for reaching out! We will contact you soon.");
  };
  const toggle = (s: string) =>
    setFormData((p) => ({
      ...p,
      solutions: p.solutions.includes(s) ? p.solutions.filter((x) => x !== s) : [...p.solutions, s],
    }));
  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-4xl mx-auto">
        <button onClick={onBack} className="mb-8 flex items-center gap-2 text-amber-300 hover:text-amber-200 transition-colors font-semibold">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Home
        </button>
        <div className="flex justify-center mb-12">
          <div className="w-full max-w-[180px] sm:max-w-[200px]">
            <ThirteenPointSeal size={200} />
          </div>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-center bg-clip-text text-transparent bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-300 mb-12" style={{ fontFamily: "'Orbitron', sans-serif" }}>
          Let's Build the Future
        </h1>
        <form onSubmit={submit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {["Name *", "Company Name *", "Designation *", "Best Contact *"].map((label, idx) => (
              <div key={label}>
                <label className="block text-amber-200 font-semibold mb-2">{label}</label>
                <input
                  type="text"
                  required
                  value={[formData.name, formData.company, formData.designation, formData.contact][idx] as string}
                  onChange={(e) =>
                    setFormData((p) => {
                      const keys = ["name", "company", "designation", "contact"] as const;
                      const next: any = { ...p };
                      next[keys[idx]] = e.target.value;
                      return next;
                    })
                  }
                  className="w-full px-4 py-3 rounded-xl bg-black/50 border border-amber-500/40 text-amber-100 focus:border-amber-400 focus:outline-none transition-colors"
                  placeholder={label.replace(" *", "")}
                />
              </div>
            ))}
          </div>
          <div>
            <label className="block text-amber-200 font-semibold mb-2">Best Time to Contact</label>
            <input
              type="text"
              value={formData.bestTime}
              onChange={(e) => setFormData({ ...formData, bestTime: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-black/50 border border-amber-500/40 text-amber-100 focus:border-amber-400 focus:outline-none transition-colors"
              placeholder="e.g., Weekdays 9–5 PM EST"
            />
          </div>
          <div>
            <label className="block text-amber-200 font-semibold mb-3">Solutions You're Interested In *</label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {options.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => toggle(s)}
                  className={`px-4 py-3 rounded-xl border font-medium transition-all duration-300 flex items-center gap-2 ${
                    formData.solutions.includes(s) ? "bg-gradient-to-r from-amber-500 to-yellow-400 text-black border-amber-300" : "bg-black/30 border-amber-500/40 text-amber-100 hover:border-amber-300"
                  }`}
                >
                  <span className="text-xl">★</span>
                  <span>{s}</span>
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-amber-200 font-semibold mb-2">Smart Goal - Tell us about your needs *</label>
            <p className="text-amber-200/70 text-sm mb-3">Describe your specific, measurable goals and what you hope to achieve</p>
            <textarea
              required
              value={formData.smartGoal}
              onChange={(e) => setFormData({ ...formData, smartGoal: e.target.value })}
              rows={6}
              className="w-full px-4 py-3 rounded-xl bg-black/50 border border-amber-500/40 text-amber-100 focus:border-amber-400 focus:outline-none transition-colors resize-none"
              placeholder="Share your vision, challenges, and objectives..."
            />
          </div>
          <button type="submit" className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-400 text-black font-black text-lg hover:shadow-[0_10px_50px_rgba(245,158,11,0.5)] transition-all duration-300">
            Submit & Start Your Journey
          </button>
        </form>
      </div>
    </div>
  );
}
