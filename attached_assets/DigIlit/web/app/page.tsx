"use client";
import React, { useEffect, useMemo, useState } from "react";

// Utility
const clamp = (min: string, pref: string, max: string) =>
  `clamp(${min}, ${pref}, ${max})`;

// ========= Feather Search Component =========
function FeatherSearch() {
  return (
    <div className="relative flex items-center rounded-xl border border-amber-500/40 bg-black/40 backdrop-blur-md px-3 py-2">
      <span className="text-xl">🪶</span>
      <input
        readOnly
        value="search"
        className="ml-2 bg-transparent outline-none text-amber-100 text-sm w-full"
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
        style={{
          filter: "drop-shadow(0 0 8px rgba(250,204,21,0.8))",
        }}
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
        style={{
          filter: "drop-shadow(0 0 12px rgba(250,204,21,1))",
        }}
      >
        <polygon
          points="12,2 14.9,8.2 22,9.2 16.8,13.8 18.3,20.8 12,17.2 5.7,20.8 7.2,13.8 2,9.2 9.1,8.2"
          fill="#fde047"
        />
      </svg>
    </div>
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

  const navLinks = ["Solutions", "Services", "Shop", "Partner", "Login"];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 border-b ${
        scrolled
          ? "backdrop-blur-2xl bg-black/80 border-amber-500/60 shadow-[0_8px_40px_rgba(245,158,11,0.3)]"
          : "backdrop-blur-md bg-black/30 border-amber-500/30"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <FeatherSearch />
          <a
            href="#home"
            className="flex items-center justify-center h-11 w-11 rounded-xl border border-amber-500/40 hover:border-amber-300 hover:bg-amber-500/10 transition-all duration-300"
            aria-label="Home"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m3 9 9-7 9 7" />
              <path d="M9 22V12h6v10" />
              <path d="M4 10v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V10" />
            </svg>
          </a>
        </div>

        <div className="hidden md:flex items-center gap-2.5">
          {Array.from({ length: 9 }).map((_, i) => (
            <AtomToStar key={i} delay={i * 160} />
          ))}
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-3 sm:gap-5">
          {navLinks.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="relative text-sm sm:text-base font-bold tracking-wide text-amber-100/90 hover:text-yellow-200 transition-colors group"
            >
              {link}
              <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-gradient-to-r from-amber-400 to-yellow-500 transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* Mobile Hamburger Menu */}
        <div className="md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl border border-amber-500/40 hover:border-amber-300 hover:bg-amber-500/10 transition-all duration-300"
          >
            <div className="w-6 h-6 flex flex-col justify-center gap-1">
              <span
                className={`w-full h-0.5 bg-amber-300 transition-all duration-300 ${
                  mobileMenuOpen ? "rotate-45 translate-y-1.5" : ""
                }`}
              />
              <span
                className={`w-full h-0.5 bg-amber-300 transition-all duration-300 ${
                  mobileMenuOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`w-full h-0.5 bg-amber-300 transition-all duration-300 ${
                  mobileMenuOpen ? "-rotate-45 -translate-y-1.5" : ""
                }`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-amber-500/30 bg-black/95 backdrop-blur-2xl">
          <div className="px-4 py-3 space-y-3">
            {navLinks.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="block py-2 text-lg font-bold text-amber-100/90 hover:text-yellow-200 transition-colors border-b border-amber-500/20"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

// ========= 13-point star seal =========
function ThirteenPointSeal({
  size = 520,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  const { points, center } = useMemo(() => {
    const cx = size / 2;
    const cy = size / 2;
    const r = size * 0.44;
    const n = 13;
    const pts = [];
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
          <stop offset="0%" stopColor="rgba(251,191,36,0.4)" />
          <stop offset="70%" stopColor="rgba(251,191,36,0.15)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0)" />
        </radialGradient>
      </defs>
      <circle
        cx={center.x}
        cy={center.y}
        r={size * 0.48}
        fill="url(#sealGlow)"
      />
      <g stroke="#fbbf24" strokeWidth={1.4} strokeOpacity="0.85">
        {points.map((p, i) => {
          const j = (i + 5) % points.length;
          const q = points[j];
          return <line key={`l-${i}`} x1={p.x} y1={p.y} x2={q.x} y2={q.y} />;
        })}
      </g>
      {points.map((p, i) => (
        <circle key={`c-${i}`} cx={p.x} cy={p.y} r={3.5} fill="#fbbf24" />
      ))}
      <g
        style={{
          transformOrigin: "50% 50%",
          animation: "rotateSlow 30s linear infinite",
        }}
      >
        <circle
          cx={center.x}
          cy={center.y}
          r={size * 0.36}
          fill="none"
          stroke="#06b6d4"
          strokeOpacity="0.75"
          strokeWidth="2"
          strokeDasharray="8 12"
        />
      </g>
    </svg>
  );
}

// ========= HERO =========
function Hero() {
  const titleSize = clamp("2.5rem", "10vw", "11rem");

  const letterStyle = {
    background:
      "linear-gradient(180deg, #fef3c7 0%, #fbbf24 30%, #d97706 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    filter: "drop-shadow(0 0 32px rgba(251,191,36,0.4))",
    fontSize: titleSize,
    lineHeight: 0.85,
    fontFamily: "'Orbitron', sans-serif",
    fontWeight: 900,
    letterSpacing: "-0.02em",
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center pt-24 pb-12"
    >
      {/* Enhanced Star with stronger presence */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-95 mix-blend-overlay w-80 h-80 sm:w-[500px] sm:h-[500px]">
        <ThirteenPointSeal size={500} />
      </div>

      {/* Premium Typography Lockup */}
      <div className="relative z-10 text-center w-full max-w-7xl px-4">
        <div className="relative flex items-center justify-center gap-1 sm:gap-3 mb-8">
          {/* DIG */}
          <div className="flex items-end gap-[0.08em] sm:gap-[0.15em] z-20">
            {"DIG".split("").map((c, i) => (
              <span
                key={i}
                style={letterStyle}
                className="hover:scale-105 transition-transform duration-300"
              >
                {c}
              </span>
            ))}
          </div>

          {/* Blinking | with enhanced glow */}
          <span
            className="animate-blink z-20 mx-1 sm:mx-2"
            style={{
              fontSize: `calc(${titleSize} * 0.8)`,
              lineHeight: 0.85,
              fontFamily: "'Orbitron', sans-serif",
              fontWeight: 900,
              color: "#fde047",
              filter: "drop-shadow(0 0 24px rgba(250,204,21,0.9))",
              textShadow: "0 0 30px rgba(251,191,36,0.8)",
            }}
          >
            |
          </span>

          {/* LIT */}
          <div className="flex items-end gap-[0.08em] sm:gap-[0.15em] z-20">
            {"LIT".split("").map((c, i) => (
              <span
                key={i}
                style={letterStyle}
                className="hover:scale-105 transition-transform duration-300"
              >
                {c}
              </span>
            ))}
          </div>
        </div>

        {/* Enhanced Tagline */}
        <p
          className="mt-8 bg-clip-text text-transparent bg-gradient-to-r from-amber-200 via-yellow-300 to-amber-400 font-black tracking-widest uppercase z-20 relative"
          style={{
            fontSize: clamp("1.1rem", "4.5vw", "2.5rem"),
            letterSpacing: "0.2em",
            textShadow: "0 4px 20px rgba(251,191,36,0.3)",
          }}
        >
          Your Vision + Our Mission = Hegemony
        </p>

        {/* CTA Button */}
        <div className="mt-12 z-20 relative">
          <button className="group px-12 py-4 rounded-2xl bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-black font-black text-lg tracking-wider uppercase transition-all duration-300 hover:scale-105 hover:shadow-[0_20px_60px_rgba(245,158,11,0.6)] border-2 border-amber-300/50">
            Begin Your Ascent
            <span className="block h-0.5 w-0 group-hover:w-full bg-black/20 transition-all duration-500 mt-1" />
          </button>
        </div>
      </div>
    </section>
  );
}

// ========= Strategic Vision =========
function StrategicVision() {
  const tabs = {
    force: {
      title: "Elite Force",
      icon: "⚔️",
      body: "As the world can now see the tapped power of Digital revolution, we still can't ignore the importance of a self organized, skilled workforce. We aim to deliver you a mainframe which surpass your expectations.",
    },
    innovation: {
      title: "Innovation Mindset",
      icon: "🧠",
      body: "Traditional business models are being disrupted. Those who embrace AI-driven transformation will dominate the market, while others become obsolete. The future belongs to intelligent enterprises.",
    },
    results: {
      title: "Results-Driven Approach",
      icon: "🎯",
      body: "Every system I architect is designed with one goal: measurable business impact. We don't just implement technology. We engineer competitive advantages.",
    },
  };

  const [active, setActive] = useState<keyof typeof tabs>("force");

  return (
    <section className="relative py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <h2
          className="text-center text-4xl sm:text-5xl md:text-6xl font-black bg-clip-text text-transparent bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-300"
          style={{ fontFamily: "'Orbitron', sans-serif" }}
        >
          Strategic Vision
        </h2>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          {(Object.keys(tabs) as Array<keyof typeof tabs>).map((k) => (
            <button
              key={k}
              onClick={() => setActive(k)}
              className={`relative px-6 py-3 rounded-2xl border font-bold text-base transition-all duration-300 ${
                active === k
                  ? "bg-gradient-to-r from-amber-500 to-yellow-400 text-black border-amber-300 shadow-[0_10px_50px_rgba(245,158,11,0.4)]"
                  : "border-amber-500/40 text-amber-100 bg-amber-900/20 hover:border-amber-300 hover:bg-amber-900/30"
              }`}
            >
              <span className="mr-2">{tabs[k].icon}</span>
              {tabs[k].title}
            </button>
          ))}
        </div>

        <div className="mt-10 rounded-3xl border border-amber-500/50 bg-gradient-to-br from-amber-950/30 via-yellow-950/20 to-amber-950/30 backdrop-blur-2xl p-8 sm:p-12 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
          <p className="text-lg sm:text-xl md:text-2xl text-amber-100/95 leading-relaxed">
            {tabs[active].body}
          </p>
        </div>
      </div>
    </section>
  );
}

// ========= 9D Framework =========
function Framework9D({ onContactClick }: { onContactClick: () => void }) {
  const steps = [
    { name: "Dream", desc: "Envision the impossible", icon: "💭" },
    { name: "Design", desc: "Architect perfection", icon: "🎨" },
    { name: "Develop", desc: "Code excellence", icon: "⚙️" },
    { name: "Deploy", desc: "Launch globally", icon: "🚀" },
    { name: "Detect", desc: "Monitor everything", icon: "🔍" },
    { name: "Delegate", desc: "Automate workflows", icon: "🤖" },
    { name: "Discover", desc: "Uncover insights", icon: "💡" },
    { name: "Decide", desc: "Data-driven choices", icon: "📊" },
    { name: "Disrupt", desc: "Transform industries", icon: "⚡" },
  ];

  return (
    <section className="relative py-16 sm:py-24 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
        <h2
          className="text-3xl sm:text-5xl md:text-6xl font-black bg-clip-text text-transparent bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-300"
          style={{ fontFamily: "'Orbitron', sans-serif" }}
        >
          The 9D Framework
        </h2>
        <p className="mt-4 text-amber-100/85 text-base sm:text-xl max-w-3xl mx-auto">
          Nine synchronized dimensions that turn vision into reality.
        </p>

        {/* Mobile: Stack layout */}
        <div className="block sm:hidden mt-8">
          <div className="grid grid-cols-2 gap-3 mb-6">
            {steps.slice(0, 4).map((s) => (
              <div
                key={s.name}
                className="rounded-xl border border-amber-500/40 bg-amber-900/20 p-3 text-center"
              >
                <div className="text-2xl mb-1">{s.icon}</div>
                <div className="text-xs font-bold text-amber-200">{s.name}</div>
              </div>
            ))}
          </div>

          {/* Center Button */}
          <button
            onClick={onContactClick}
            className="w-32 h-32 rounded-full bg-gradient-to-r from-amber-500 to-yellow-400 text-black font-black text-lg mx-auto mb-6 shadow-[0_10px_40px_rgba(245,158,11,0.5)]"
          >
            Let's Dig
          </button>

          <div className="grid grid-cols-2 gap-3">
            {steps.slice(4).map((s) => (
              <div
                key={s.name}
                className="rounded-xl border border-amber-500/40 bg-amber-900/20 p-3 text-center"
              >
                <div className="text-2xl mb-1">{s.icon}</div>
                <div className="text-xs font-bold text-amber-200">{s.name}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Desktop: Circular layout */}
        <div className="hidden sm:block relative mx-auto mt-16 w-full max-w-[600px] aspect-square">
          <button
            onClick={onContactClick}
            className="group absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 sm:w-48 sm:h-48 rounded-full overflow-hidden z-10"
          >
            <span className="absolute inset-0 rounded-full bg-gradient-to-br from-amber-400 via-yellow-500 to-amber-600 animate-spin-slow" />
            <span className="absolute inset-2 rounded-full bg-gradient-to-br from-yellow-200 via-amber-300 to-yellow-400 animate-spin-reverse" />
            <span className="absolute inset-4 rounded-full bg-black/70 backdrop-blur-md border-2 border-amber-400/70 flex items-center justify-center hover:bg-black/80 transition-colors">
              <span className="text-xl sm:text-2xl font-black tracking-wider text-amber-200">
                Let's Dig
              </span>
            </span>
          </button>

          {steps.map((s, idx) => {
            const angle = (idx / steps.length) * Math.PI * 2 - Math.PI / 2;
            const radius = 25;
            const x = 50 + radius * Math.cos(angle);
            const y = 50 + radius * Math.sin(angle);

            return (
              <div
                key={s.name}
                className="absolute -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${x}%`, top: `${y}%` }}
              >
                <div className="px-3 py-2 rounded-xl bg-gradient-to-br from-amber-900/50 to-yellow-900/40 border border-amber-500/70 text-amber-100 text-sm font-bold backdrop-blur-xl">
                  <span className="mr-1">{s.icon}</span>
                  {s.name}
                </div>
              </div>
            );
          })}
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
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-black bg-clip-text text-transparent bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-300 mb-6"
            style={{ fontFamily: "'Orbitron', sans-serif" }}
          >
            Why Choose DIG|LIT?
          </h2>
          <p className="text-lg sm:text-xl text-amber-100/90 leading-relaxed">
            We don't just build systems. We architect dominance. Our elite force
            combines cutting-edge AI with human expertise to deliver results
            that redefine what's possible. When you partner with DIG|LIT, you're
            not just adopting technology—you're claiming your position at the
            forefront of the digital revolution.
          </p>
        </div>
      </div>
    </section>
  );
}

// ========= Solutions Section =========
function SolutionsSection() {
  const solutions = [
    {
      name: "Virtual Assistant",
      icon: "🤵",
      desc: "24/7 intelligent support that scales with your needs",
      gradient: "from-blue-500/20 to-cyan-500/20",
    },
    {
      name: "AI Assistant",
      icon: "🤖",
      desc: "Advanced automation powered by machine learning",
      gradient: "from-purple-500/20 to-pink-500/20",
    },
    {
      name: "Expert Team",
      icon: "👥",
      desc: "Dedicated specialists driving your success",
      gradient: "from-green-500/20 to-emerald-500/20",
    },
    {
      name: "Digital Transformation",
      icon: "🚀",
      desc: "Complete modernization of your business systems",
      gradient: "from-orange-500/20 to-red-500/20",
    },
    {
      name: "Quantum ERP",
      icon: "⚡",
      desc: "Next-generation enterprise resource planning",
      gradient: "from-indigo-500/20 to-purple-500/20",
    },
  ];

  return (
    <section id="solutions" className="relative py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <h2
            className="text-5xl sm:text-7xl md:text-8xl font-black bg-clip-text text-transparent bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-300 mb-6"
            style={{ fontFamily: "'Orbitron', sans-serif" }}
          >
            SOLUTIONS
          </h2>
          <p className="text-xl text-amber-100/80 max-w-3xl mx-auto leading-relaxed">
            Elite digital services engineered for market dominance and
            operational excellence
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {solutions.map((solution, index) => (
            <div
              key={solution.name}
              className="group relative rounded-3xl border border-amber-500/30 bg-gradient-to-br from-black/60 via-black/40 to-black/60 backdrop-blur-xl p-8 hover:border-amber-400/60 hover:shadow-[0_20px_80px_rgba(245,158,11,0.3)] transition-all duration-500 hover:-translate-y-2"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Background Glow */}
              <div
                className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${solution.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
              />

              <div className="relative z-10">
                <div className="text-6xl mb-6 transform group-hover:scale-110 transition-transform duration-300">
                  {solution.icon}
                </div>
                <h3 className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-br from-amber-200 via-yellow-300 to-amber-400 mb-4">
                  {solution.name}
                </h3>
                <p className="text-amber-100/80 text-lg leading-relaxed">
                  {solution.desc}
                </p>

                {/* Hover Arrow */}
                <div className="mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-8 h-8 rounded-full border border-amber-400/50 flex items-center justify-center">
                    <span className="text-amber-300">→</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ========= Footer =========
function Footer() {
  const [quoteIdx, setQuoteIdx] = useState(0);
  const quotes = [
    {
      text: "The best way to predict the future is to create it.",
      author: "Peter Drucker",
    },
    {
      text: "Innovation distinguishes between a leader and a follower.",
      author: "Steve Jobs",
    },
    {
      text: "Success is not final. Failure is not fatal.",
      author: "Winston Churchill",
    },
    {
      text: "Simplicity is the ultimate sophistication.",
      author: "Leonardo da Vinci",
    },
  ];

  useEffect(() => {
    const timer = setInterval(
      () => setQuoteIdx((p) => (p + 1) % quotes.length),
      5500
    );
    return () => clearInterval(timer);
  }, []);

  const socials = [
    {
      name: "Twitter",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
        </svg>
      ),
      href: "https://twitter.com/digilit",
    },
    {
      name: "LinkedIn",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
      href: "https://linkedin.com/company/digilit",
    },
    {
      name: "Instagram",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      ),
      href: "https://instagram.com/digilit",
    },
    {
      name: "Facebook",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
      href: "https://facebook.com/digilit",
    },
  ];

  const utilities = [
    { name: "Music", icon: "🎵" },
    { name: "Games", icon: "🎮" },
    { name: "Chatbox", icon: "💬" },
    { name: "Psychotherapy", icon: "🧘" },
    { name: "Donate", icon: "💝" },
  ];

  return (
    <footer className="relative border-t border-amber-500/40 bg-black/90 backdrop-blur-2xl">
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "linear-gradient(rgba(251,191,36,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(251,191,36,0.03) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid md:grid-cols-3 gap-10">
          <div className="text-center md:text-left">
            <h4 className="text-xl font-black text-amber-300 flex items-center justify-center md:justify-start gap-2">
              <span>🌐</span> Connect
            </h4>
            <div className="mt-5 flex flex-wrap justify-center md:justify-start gap-3">
              {socials.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  className="rounded-xl border border-amber-500/40 p-3 hover:border-amber-300 hover:bg-amber-500/15 transition-all duration-300 text-amber-300 hover:text-amber-200"
                  aria-label={s.name}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          <div className="text-center">
            <h4 className="text-xl font-black text-amber-300 flex items-center justify-center gap-2">
              <span>💡</span> Inspiration
            </h4>
            <div className="mt-5 rounded-2xl border border-amber-500/40 bg-amber-950/20 backdrop-blur-xl px-5 py-7 min-h-[150px] relative">
              {quotes.map((q, i) => (
                <div
                  key={i}
                  className={`transition-all duration-700 ${
                    i === quoteIdx
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 absolute inset-0 translate-y-4 px-5 py-7"
                  }`}
                >
                  <p className="text-base sm:text-lg text-amber-100/95 italic leading-relaxed">
                    "{q.text}"
                  </p>
                  <p className="mt-3 text-amber-300 text-sm font-semibold">
                    {q.author}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center md:text-right">
            <h4 className="text-xl font-black text-amber-300 flex items-center justify-center md:justify-end gap-2">
              <span>🆘</span> Support
            </h4>
            <div className="mt-5">
              <a
                href="mailto:support@digIlit.com"
                className="text-amber-200 hover:text-amber-100 font-semibold text-lg transition-colors"
              >
                support@digIlit.com
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          {utilities.map((u) => (
            <a
              key={u.name}
              href="#"
              className="rounded-xl border border-amber-500/40 px-4 py-2 hover:border-amber-300 hover:bg-amber-500/15 transition-all duration-300 text-base text-amber-100/90 font-medium"
            >
              <span className="mr-2 text-lg">{u.icon}</span>
              {u.name}
            </a>
          ))}
        </div>

        <div className="mt-10 pt-8 border-t border-amber-500/30 text-center">
          <h3
            className="text-3xl sm:text-4xl font-black tracking-tight"
            style={{ fontFamily: "'Orbitron', sans-serif" }}
          >
            <span className="text-white">DIG</span>
            <span className="text-amber-400 mx-3">|</span>
            <span className="text-white">LIT</span>
          </h3>
          <p className="mt-3 text-sm sm:text-base text-amber-200/80">
            Architecting autonomous systems for visionary leaders.
          </p>
          <p className="mt-5 text-xs text-amber-200/60">
            © 2025 DIG|LIT. ALL RIGHTS RESERVED. | Z - Founder Dig|lit
          </p>
        </div>
      </div>
    </footer>
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

  const solutionOptions = [
    { name: "Virtual Assistant", icon: "🤵" },
    { name: "AI Assistant", icon: "🤖" },
    { name: "Expert Team", icon: "👥" },
    { name: "Digital Transformation", icon: "🚀" },
    { name: "Quantum ERP", icon: "⚡" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Thank you for reaching out! We will contact you soon.");
  };

  const handleSolutionToggle = (solution: string) => {
    setFormData((prev) => ({
      ...prev,
      solutions: prev.solutions.includes(solution)
        ? prev.solutions.filter((s) => s !== solution)
        : [...prev.solutions, solution],
    }));
  };

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={onBack}
          className="mb-8 flex items-center gap-2 text-amber-300 hover:text-amber-200 transition-colors font-semibold"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to Home
        </button>

        <div className="flex justify-center mb-12">
          <div className="w-full max-w-[180px] sm:max-w-[200px]">
            <ThirteenPointSeal size={200} />
          </div>
        </div>

        <h1
          className="text-4xl sm:text-5xl font-black text-center bg-clip-text text-transparent bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-300 mb-12"
          style={{ fontFamily: "'Orbitron', sans-serif" }}
        >
          Let's Build the Future
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-amber-200 font-semibold mb-2">
                Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full px-4 py-3 rounded-xl bg-black/50 border border-amber-500/40 text-amber-100 focus:border-amber-400 focus:outline-none transition-colors"
                placeholder="Your full name"
              />
            </div>

            <div>
              <label className="block text-amber-200 font-semibold mb-2">
                Company Name *
              </label>
              <input
                type="text"
                required
                value={formData.company}
                onChange={(e) =>
                  setFormData({ ...formData, company: e.target.value })
                }
                className="w-full px-4 py-3 rounded-xl bg-black/50 border border-amber-500/40 text-amber-100 focus:border-amber-400 focus:outline-none transition-colors"
                placeholder="Company or organization"
              />
            </div>

            <div>
              <label className="block text-amber-200 font-semibold mb-2">
                Designation *
              </label>
              <input
                type="text"
                required
                value={formData.designation}
                onChange={(e) =>
                  setFormData({ ...formData, designation: e.target.value })
                }
                className="w-full px-4 py-3 rounded-xl bg-black/50 border border-amber-500/40 text-amber-100 focus:border-amber-400 focus:outline-none transition-colors"
                placeholder="Your role or title"
              />
            </div>

            <div>
              <label className="block text-amber-200 font-semibold mb-2">
                Best Contact *
              </label>
              <input
                type="text"
                required
                value={formData.contact}
                onChange={(e) =>
                  setFormData({ ...formData, contact: e.target.value })
                }
                className="w-full px-4 py-3 rounded-xl bg-black/50 border border-amber-500/40 text-amber-100 focus:border-amber-400 focus:outline-none transition-colors"
                placeholder="Email or phone"
              />
            </div>
          </div>

          <div>
            <label className="block text-amber-200 font-semibold mb-2">
              Best Time to Contact
            </label>
            <input
              type="text"
              value={formData.bestTime}
              onChange={(e) =>
                setFormData({ ...formData, bestTime: e.target.value })
              }
              className="w-full px-4 py-3 rounded-xl bg-black/50 border border-amber-500/40 text-amber-100 focus:border-amber-400 focus:outline-none transition-colors"
              placeholder="e.g., Weekdays 9-5 PM EST"
            />
          </div>

          <div>
            <label className="block text-amber-200 font-semibold mb-3">
              Solutions You're Interested In *
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {solutionOptions.map((solution) => (
                <button
                  key={solution.name}
                  type="button"
                  onClick={() => handleSolutionToggle(solution.name)}
                  className={`px-4 py-3 rounded-xl border font-medium transition-all duration-300 flex items-center gap-2 ${
                    formData.solutions.includes(solution.name)
                      ? "bg-gradient-to-r from-amber-500 to-yellow-400 text-black border-amber-300"
                      : "bg-black/30 border-amber-500/40 text-amber-100 hover:border-amber-300"
                  }`}
                >
                  <span className="text-xl">{solution.icon}</span>
                  <span>{solution.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-amber-200 font-semibold mb-2">
              Smart Goal - Tell us about your needs *
            </label>
            <p className="text-amber-200/70 text-sm mb-3">
              Describe your specific, measurable goals and what you hope to
              achieve
            </p>
            <textarea
              required
              value={formData.smartGoal}
              onChange={(e) =>
                setFormData({ ...formData, smartGoal: e.target.value })
              }
              rows={6}
              className="w-full px-4 py-3 rounded-xl bg-black/50 border border-amber-500/40 text-amber-100 focus:border-amber-400 focus:outline-none transition-colors resize-none"
              placeholder="Share your vision, challenges, and objectives..."
            />
          </div>

          <button
            type="submit"
            className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-400 text-black font-black text-lg hover:shadow-[0_10px_50px_rgba(245,158,11,0.5)] transition-all duration-300"
          >
            Submit & Start Your Journey
          </button>
        </form>
      </div>
    </div>
  );
}

// ========= Background Scene =========
function BackgroundScene() {
  const stars = useMemo(
    () =>
      Array.from({ length: 120 }).map(() => ({
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: 0.8 + Math.random() * 1.8,
        dur: 2 + Math.random() * 3,
        delay: Math.random() * 3,
      })),
    []
  );

  const floaters = useMemo(
    () =>
      Array.from({ length: 25 }).map(() => ({
        left: Math.random() * 100,
        top: Math.random() * 100,
        dur: 12 + Math.random() * 18,
        delay: Math.random() * 5,
      })),
    []
  );

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#020617] via-[#000] to-[#000]" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 40%, rgba(59,130,246,0.12) 0%, transparent 60%), radial-gradient(ellipse at 60% 60%, rgba(251,191,36,0.10) 0%, transparent 65%)",
        }}
      />
      {stars.map((s, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-white/90"
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
          className="absolute w-[3px] h-[3px] rounded-full bg-amber-400/50"
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
export default function QuantumCommanderLanding() {
  const [showContact, setShowContact] = useState(false);

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
          @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&display=swap');
          
          html { scroll-behavior: smooth; }
          body { background: #000; overflow-x: hidden; }
          
          @keyframes blink {
            0%, 100% { opacity: 1; transform: scale(1); }
            50% { opacity: 0.3; transform: scale(0.9); }
          }
          
          @keyframes pulse-wave {
            0% { transform: scale(1); opacity: 0.8; }
            100% { transform: scale(2.8); opacity: 0; }
          }
          
          @keyframes twinkle {
            0%, 100% { opacity: 0.3; transform: scale(1); }
            50% { opacity: 1; transform: scale(1.2); }
          }
          
          @keyframes float {
            0% { transform: translateY(0) translateX(0); }
            50% { transform: translateY(-40vh) translateX(45px); }
            100% { transform: translateY(-80vh) translateX(0); }
          }
          
          @keyframes rotateSlow {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          
          @keyframes spin-slow {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          
          @keyframes spin-reverse {
            from { transform: rotate(360deg); }
            to { transform: rotate(0deg); }
          }
          
          .animate-blink { animation: blink 1.3s ease-in-out infinite; }
          .animate-spin-slow { animation: spin-slow 12s linear infinite; }
          .animate-spin-reverse { animation: spin-reverse 9s linear infinite; }
          
          ::-webkit-scrollbar { width: 8px; height: 8px; }
          ::-webkit-scrollbar-track { background: #000; }
          ::-webkit-scrollbar-thumb {
            background: linear-gradient(180deg, #f59e0b, #fbbf24);
            border-radius: 4px;
          }
          ::-webkit-scrollbar-thumb:hover {
            background: linear-gradient(180deg, #fbbf24, #f59e0b);
          }
          
          @media (prefers-reduced-motion: reduce) {
            *, *::before, *::after {
              animation-duration: 0.01ms !important;
              animation-iteration-count: 1 !important;
              transition-duration: 0.01ms !important;
            }
            html { scroll-behavior: auto; }
          }
        `,
        }}
      />

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
              <StrategicVision />
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
