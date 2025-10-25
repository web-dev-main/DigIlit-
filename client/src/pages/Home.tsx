import { ThirteenPointSeal } from "../components/ThirteenPointSeal";
import { Link } from "wouter";
import { ArrowRight, Sparkles, Users, Bot, UsersRound, ShoppingCart, Target, Zap, Brain, Shield, Rocket, Twitter, Instagram, Facebook, Linkedin, HomeIcon } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { useMemo, useState } from "react";

function clamp(min: string, pref: string, max: string) {
  return `clamp(${min}, ${pref}, ${max})`;
}

function BackgroundScene() {
  const stars = useMemo(
    () =>
      Array.from({ length: 200 }).map(() => ({
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: 0.5 + Math.random() * 2.5,
        dur: 1.5 + Math.random() * 4,
        delay: Math.random() * 5,
      })),
    []
  );

  const shootingStars = useMemo(
    () =>
      Array.from({ length: 5 }).map((_, i) => ({
        delay: i * 8 + Math.random() * 3,
      })),
    []
  );

  const floaters = useMemo(
    () =>
      Array.from({ length: 40 }).map(() => ({
        left: Math.random() * 100,
        top: 100 + Math.random() * 20,
        dur: 8 + Math.random() * 12,
        delay: Math.random() * 8,
        size: 2 + Math.random() * 4,
      })),
    []
  );

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0118] via-[#000000] to-[#000000]" />
      
      <div
        className="absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(ellipse at 30% 20%, rgba(59,130,246,0.25) 0%, transparent 50%), radial-gradient(ellipse at 70% 60%, rgba(251,191,36,0.20) 0%, transparent 50%), radial-gradient(ellipse at 50% 80%, rgba(168,85,247,0.15) 0%, transparent 50%)",
        }}
      />
      
      {stars.map((s, i) => (
        <span
          key={`star-${i}`}
          className="absolute rounded-full"
          style={{
            width: `${s.size}px`,
            height: `${s.size}px`,
            left: `${s.left}%`,
            top: `${s.top}%`,
            background: i % 3 === 0 ? '#fbbf24' : i % 3 === 1 ? '#60a5fa' : '#ffffff',
            opacity: 0.8,
            boxShadow: `0 0 ${s.size * 3}px ${i % 3 === 0 ? 'rgba(251,191,36,0.8)' : i % 3 === 1 ? 'rgba(96,165,250,0.8)' : 'rgba(255,255,255,0.6)'}`,
            animation: `twinkle ${s.dur}s ease-in-out ${s.delay}s infinite`,
          }}
        />
      ))}
      
      {shootingStars.map((s, i) => (
        <span
          key={`shoot-${i}`}
          className="absolute h-[2px] w-[100px] bg-gradient-to-r from-transparent via-amber-200 to-transparent"
          style={{
            top: `${20 + i * 15}%`,
            left: '-100px',
            transform: 'rotate(-45deg)',
            animation: `shoot ${3}s linear ${s.delay}s infinite`,
            opacity: 0,
          }}
        />
      ))}
      
      {floaters.map((f, i) => (
        <span
          key={`float-${i}`}
          className="absolute rounded-full bg-gradient-to-br from-amber-400 to-yellow-500"
          style={{
            width: `${f.size}px`,
            height: `${f.size}px`,
            left: `${f.left}%`,
            top: `${f.top}%`,
            boxShadow: '0 0 20px rgba(251,191,36,0.9)',
            animation: `float ${f.dur}s ease-in-out ${f.delay}s infinite`,
          }}
        />
      ))}
      
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: 'radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.8) 100%)',
        }}
      />
    </div>
  );
}

function NavigationBar() {
  const navItems = [
    { name: "Home", href: "/", icon: Home },
    { name: "Solutions", href: "/solutions", icon: Sparkles },
    { name: "Services", href: "/services", icon: Users },
    { name: "Shop", href: "/shop", icon: ShoppingCart },
    { name: "Contact", href: "/contact", icon: Rocket },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-2xl border-b border-amber-500/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="flex items-center ml-8 md:ml-2">
              <span className="text-xl font-black bg-gradient-to-r from-slate-200 via-gray-100 to-slate-300 bg-clip-text text-transparent">DIG</span>
              <span className="text-amber-400 mx-1">|</span>
              <span className="text-xl font-black bg-gradient-to-r from-slate-200 via-gray-100 to-slate-300 bg-clip-text text-transparent">LIT</span>
            </div>
          </Link>

          {/* Desktop Navigation - ORANGE/WHITE ICONS */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className="flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg transition-all duration-300 group"
                >
                  <Icon className="h-5 w-5 text-white group-hover:text-white" />
                  <span className="font-medium">{item.name}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}

function NineDFramework() {
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);
  
  const steps = [
    { name: "Dream", desc: "Envision the impossible", icon: "💭", color: "from-purple-500 to-pink-500" },
    { name: "Design", desc: "Architect perfection", icon: "🎨", color: "from-blue-500 to-cyan-500" },
    { name: "Develop", desc: "Code excellence", icon: "⚙️", color: "from-green-500 to-emerald-500" },
    { name: "Deploy", desc: "Launch globally", icon: "🚀", color: "from-amber-500 to-orange-500" },
    { name: "Detect", desc: "Monitor everything", icon: "🔍", color: "from-red-500 to-rose-500" },
    { name: "Delegate", desc: "Automate workflows", icon: "🤖", color: "from-violet-500 to-purple-500" },
    { name: "Discover", desc: "Uncover insights", icon: "💡", color: "from-yellow-500 to-amber-500" },
    { name: "Decide", desc: "Data-driven choices", icon: "📊", color: "from-indigo-500 to-blue-500" },
    { name: "Disrupt", desc: "Transform industries", icon: "⚡", color: "from-pink-500 to-rose-500" },
  ];

  return (
    <section className="py-20 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-amber-950/5 to-black" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-7xl font-black bg-clip-text text-transparent bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-300 mb-6" style={{ fontFamily: "'Orbitron', sans-serif" }}>
            The 9D Framework
          </h2>
          <p className="text-amber-100/80 text-lg md:text-xl max-w-3xl mx-auto">
            Nine synchronized dimensions that transform vision into market dominance
          </p>
        </div>

        <div className="relative mx-auto max-w-5xl">
          <div className="relative aspect-square max-w-[600px] mx-auto">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 via-transparent to-purple-500/20 rounded-full blur-3xl animate-pulse" />
            
            <Link href="/contact">
              <button className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 group z-20">
                <div className="relative w-48 h-48 rounded-full overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-400 via-yellow-500 to-amber-600 animate-spin-slow" />
                  <div className="absolute inset-2 bg-gradient-to-br from-yellow-300 via-amber-400 to-yellow-500 rounded-full animate-spin-reverse" />
                  <div className="absolute inset-4 rounded-full bg-black/90 backdrop-blur-md border-4 border-amber-400/70 flex items-center justify-center hover:bg-black/95 transition-all hover:scale-105">
                    <div className="text-center">
                      <div className="text-3xl font-black tracking-wider text-amber-300 mb-1">Let's</div>
                      <div className="text-4xl font-black tracking-wider text-yellow-400">DIG</div>
                    </div>
                  </div>
                  
                  {[0, 1, 2, 3].map((i) => (
                    <span
                      key={i}
                      className="absolute inset-0 rounded-full border-4 border-amber-300/40"
                      style={{ animation: `pulse-wave 4s ease-out ${i * 0.8}s infinite` }}
                    />
                  ))}
                </div>
              </button>
            </Link>

            {steps.map((step, idx) => {
              const angle = (idx / steps.length) * Math.PI * 2 - Math.PI / 2;
              const radius = 42;
              const x = 50 + radius * Math.cos(angle);
              const y = 50 + radius * Math.sin(angle);
              
              return (
                <div
                  key={step.name}
                  className="absolute -translate-x-1/2 -translate-y-1/2 transition-all duration-500"
                  style={{ 
                    left: `${x}%`, 
                    top: `${y}%`,
                    transform: hoveredStep === idx ? 'translate(-50%, -50%) scale(1.15)' : 'translate(-50%, -50%) scale(1)',
                  }}
                  onMouseEnter={() => setHoveredStep(idx)}
                  onMouseLeave={() => setHoveredStep(null)}
                >
                  <div className={`relative w-20 h-20 rounded-full font-bold border-2 flex flex-col items-center justify-center backdrop-blur-xl transition-all duration-300 whitespace-nowrap cursor-pointer bg-gradient-to-br ${step.color} text-white shadow-2xl`}>
                    <span className="text-2xl mr-3">{step.icon}<span className="text-xs mt-1 text-white">{step.name}</span></span>
                    
                    
                    {hoveredStep === idx && (
                      <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-4 py-2 bg-black/95 border border-amber-500/50 rounded-lg text-sm text-amber-200 whitespace-nowrap z-50">
                        {step.desc}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-20 text-center">
          <p className="text-amber-100/70 text-lg max-w-2xl mx-auto">
            Each dimension builds upon the last, creating an unstoppable momentum that propels your vision from concept to market leadership.
          </p>
        </div>
      </div>
    </section>
  );
}

function FounderSection() {
  return (
    <section className="py-20 px-4 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-amber-950/10 via-black to-black" />
      
      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <div className="inline-block mb-6">
            <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-amber-400 via-yellow-500 to-amber-600 p-1 shadow-[0_0_50px_rgba(251,191,36,0.5)]">
              <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
              </div>
            </div>
          </div>
          
          <h3 className="text-4xl md:text-5xl font-black text-amber-300 mb-4" style={{ fontFamily: "'Orbitron', sans-serif" }}>
            Words from the Founder
          </h3>
        </div>

        <Card className="relative rounded-3xl border-2 border-amber-500/40 bg-gradient-to-br from-amber-950/30 via-black/60 to-black/80 backdrop-blur-2xl p-8 shadow-[0_0_80px_rgba(245,158,11,0.3)] overflow-hidden">
          <div className="absolute top-0 left-0 w-32 h-32 bg-amber-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-yellow-500/10 rounded-full blur-3xl" />
          
          <div className="relative z-10">
            <div className="text-6xl text-amber-400/30 mb-6">"</div>
            <p className="text-lg md:text-xl text-amber-100/95 leading-relaxed mb-8 italic">
              In a world illuminated by the lighthouse of disciplined innovation, we navigate complexity with precision and courage. Our craft transcends mere technology—we architect <span className="text-amber-300 font-bold">digital hegemony</span>: ethical, resilient, and unmistakably human-centered.
            </p>
            <p className="text-lg md:text-xl text-amber-200/90 leading-relaxed">
              Every system we build, every team we deploy, every solution we craft is designed with one unwavering purpose: to establish your <span className="text-yellow-400 font-bold">dominance</span> in the digital arena.
            </p>
            <div className="text-6xl text-amber-400/30 text-right mt-6">"</div>

            <div className="text-center mt-8">
              <p className="text-amber-400/80 text-xl font-bold">S.Z</p>
            
            </div>
          </div>
        </Card>

        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-4 px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-500/20 to-yellow-500/20 border border-amber-500/40">
            <div className="text-4xl">⚡</div>
            <div className="text-left">
              <div className="text-amber-300 font-black text-lg">The Mission</div>
              <div className="text-amber-100/80">Transform Businesses Into Unstoppable Forces</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const socialLinks = [
    { icon: Twitter, href: "https://twitter.com/digilit", label: "Twitter" },
    { icon: Instagram, href: "https://instagram.com/digilit", label: "Instagram" },
    { icon: Facebook, href: "https://facebook.com/digilit", label: "Facebook" },
    { icon: Linkedin, href: "https://linkedin.com/company/digilit", label: "LinkedIn" },
  ];

  return (
    <footer className="relative border-t border-amber-500/30 bg-black/95 backdrop-blur-2xl py-12">
      <div className="relative z-10 max-w-6xl mx-auto px-4">
        <div className="text-center">
          <div className="mb-8">
            <h3 className="text-3xl font-black tracking-tight mb-4" style={{ fontFamily: "'Orbitron', sans-serif" }}>
              <span className="text-white">DIG</span>
              <span className="text-amber-400 mx-3">|</span>
              <span className="text-white">LIT</span>
            </h3>
            <p className="text-amber-200/70 text-base mb-6 max-w-md mx-auto">
              Architecting autonomous systems for visionary leaders who refuse to settle for mediocrity.
            </p>
            
            <div className="flex justify-center space-x-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl border border-amber-500/40 bg-amber-500/10 hover:bg-amber-500/20 hover:border-amber-400 hover:scale-110 transition-all duration-300"
                    aria-label={social.label}
                  >
                    <Icon className="h-6 w-6 text-amber-300" />
                  </a>
                );
              })}
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-8 mb-8 text-base">
            {["Solutions", "Services", "Shop", "Contact", "About"].map((item) => (
              <a key={item} href={`/${item.toLowerCase()}`} className="text-amber-200/80 hover:text-amber-300 font-medium transition-colors">
                {item}
              </a>
            ))}
          </div>

          <div className="pt-8 border-t border-amber-500/20">
            <p className="text-sm text-amber-200/60">
              © 2025 DIG|LIT. ALL RIGHTS RESERVED. | Z - Founder Dig|lit
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function Home() {
  function NavigationBar() {
  const navItems = [
    { name: "Home", href: "/", icon: Home },
    { name: "Solutions", href: "/solutions", icon: Sparkles },
    { name: "Services", href: "/services", icon: Users },
    { name: "Shop", href: "/shop", icon: ShoppingCart },
    { name: "Contact", href: "/contact", icon: Rocket },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-2xl border-b border-amber-500/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="flex items-center ml-8 md:ml-2">
              <span className="text-xl font-black bg-gradient-to-r from-slate-200 via-gray-100 to-slate-300 bg-clip-text text-transparent">DIG</span>
              <span className="text-amber-400 mx-1">|</span>
              <span className="text-xl font-black bg-gradient-to-r from-slate-200 via-gray-100 to-slate-300 bg-clip-text text-transparent">LIT</span>
            </div>
          </Link>

          {/* Desktop Navigation - ORANGE/WHITE ICONS */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className="flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg transition-all duration-300 group"
                >
                  <Icon className="h-5 w-5 text-white group-hover:text-white" />
                  <span className="font-medium">{item.name}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
  const titleSize = clamp("3rem", "10vw", "8rem");
  const pipeSize = clamp("2.5rem", "8vw", "6rem");

  const letterStyle: React.CSSProperties = {
    background: "linear-gradient(180deg, #fef3c7 0%, #fde047 45%, #facc15 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    filter: "drop-shadow(0 0 28px rgba(250,204,21,0.8))",
    fontSize: titleSize,
    lineHeight: 0.92,
    fontFamily: "'Orbitron', sans-serif",
    fontWeight: 900,
  };

  const quickLinks = [
    { title: "Virtual Assistance", desc: "Global talent marketplace", href: "/solutions", icon: Users },
    { title: "AI Solutions", desc: "Intelligent automation", href: "/solutions", icon: Bot },
    { title: "Expert Teams", desc: "Guaranteed delivery", href: "/solutions", icon: UsersRound },
    { title: "Browse Shop", desc: "22+ premium services", href: "/shop", icon: ShoppingCart },
  ];

  const strategicVision = [
    { title: "Elite Force", icon: Shield, description: "Self-organized, skilled workforce delivering exceptional results" },
    { title: "Innovation Mindset", icon: Brain, description: "Embracing AI-driven transformation for market dominance" },
    { title: "Results-Driven", icon: Target, description: "Measurable business impact through engineered advantages" },
    { title: "Cutting-Edge", icon: Zap, description: "Leveraging latest technologies for competitive edge" },
  ];

  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
          @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&display=swap');
          
          @keyframes twinkle {
            0%, 100% { opacity: 0.3; transform: scale(1); }
            50% { opacity: 1; transform: scale(1.4); }
          }
          
          @keyframes float {
            0% { transform: translateY(0) translateX(0); opacity: 0.3; }
            50% { transform: translateY(-60vh) translateX(60px); opacity: 1; }
            100% { transform: translateY(-120vh) translateX(-30px); opacity: 0; }
          }
          
          @keyframes shoot {
            0% { left: -100px; opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { left: 120%; opacity: 0; }
          }
          
          @keyframes blink {
            0%, 100% { opacity: 1; transform: scale(1); }
            50% { opacity: 0.4; transform: scale(0.95); }
          }
          
          @keyframes pulse-wave {
            0% { transform: scale(1); opacity: 0.8; }
            100% { transform: scale(3.5); opacity: 0; }
          }
          
          @keyframes spin-slow {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          
          @keyframes spin-reverse {
            from { transform: rotate(360deg); }
            to { transform: rotate(0deg); }
          }
          
          .animate-blink { animation: blink 1.4s ease-in-out infinite; }
          .animate-spin-slow { animation: spin-slow 15s linear infinite; }
          .animate-spin-reverse { animation: spin-reverse 10s linear infinite; }
        `
      }} />

      <div className="min-h-screen relative">
        <BackgroundScene />
        
        {/* Hero Section */}
        <section className="relative min-h-screen flex flex-col items-center justify-center pt-20 px-4">
          <div className="relative w-full max-w-5xl mx-auto text-center">
            <div className="relative mx-auto mb-12 w-72 h-72 md:w-96 md:h-96">
              <div className="absolute inset-0 opacity-90 animate-pulse">
                <ThirteenPointSeal size={384} />
              </div>
              
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex items-center gap-3 md:gap-5">
                  <div className="flex items-end">
                    {"DIG".split("").map((c, i) => (
                      <span key={i} style={letterStyle}>
                        {c}
                      </span>
                    ))}
                  </div>

                  <span
                    className="animate-blink"
                    style={{
                      fontSize: pipeSize,
                      lineHeight: 0.92,
                      fontFamily: "'Orbitron', sans-serif",
                      fontWeight: 919,
                      color: "#fde047",
                      filter: "drop-shadow(0 0 30px rgba(250,204,21,1)) drop-shadow(0 0 60px rgba(250,204,21,0.5))",
                    }}
                  >
                    |
                  </span>

                  <div className="flex items-end">
                    {"LIT".split("").map((c, i) => (
                      <span key={i} style={letterStyle}>
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <p className="mt-9 bg-clip-text text-transparent bg-gradient-to-r from-amber-200 via-yellow-300 to-amber-200 font-black tracking-wide text-3xl md:text-4xl lg:text-5xl drop-shadow-[0_0_30px_rgba(250,204,21,0.5)]">
              Your Vision + Our Mission = Hegemony
            </p>

            <div className="mt-16 flex flex-wrap items-center justify-center gap-6">
              <Link href="/solutions">
                <Button
                  size="lg"
                  className="gap-3 text-lg px-10 py-7 bg-gradient-to-r from-amber-500 to-yellow-400 text-black hover:from-amber-400 hover:to-yellow-300 font-black shadow-[0_0_40px_rgba(251,191,36,0.6)] hover:shadow-[0_0_60px_rgba(251,191,36,0.8)] hover:scale-105 transition-all duration-300"
                >
                  <Sparkles className="h-6 w-6" />
                  Explore Solutions
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="gap-3 text-lg px-10 py-7 border-2 border-amber-400 text-amber-300 hover:bg-amber-500/20 hover:border-amber-300 font-bold hover:scale-105 transition-all duration-300"
                >
                  <Rocket className="h-6 w-6" />
                  Start Your Journey
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Vision & Mission */}
        <section className="py-20 px-4 relative">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-10">
              <Card className="rounded-3xl border-2 border-amber-500/40 bg-gradient-to-br from-amber-950/30 via-black/70 to-black/90 backdrop-blur-2xl p-10 hover:border-amber-400 hover:shadow-[0_0_60px_rgba(245,158,11,0.4)] transition-all duration-500 hover:scale-105">
                <div className="flex items-center gap-5 mb-8">
                  <div className="p-4 rounded-2xl bg-amber-500/25 border-2 border-amber-500/40">
                    <Target className="h-10 w-10 text-amber-300" />
                  </div>
                  <h3 className="text-4xl font-black text-amber-300" style={{ fontFamily: "'Orbitron', sans-serif" }}>Vision</h3>
                </div>
                <p className="text-amber-100/90 leading-relaxed text-xl">
                  To architect autonomous systems that amplify human potential and establish digital supremacy for visionary leaders.
                </p>
              </Card>

              <Card className="rounded-3xl border-2 border-cyan-500/40 bg-gradient-to-br from-cyan-950/30 via-black/70 to-black/90 backdrop-blur-2xl p-10 hover:border-cyan-400 hover:shadow-[0_0_60px_rgba(34,211,238,0.4)] transition-all duration-500 hover:scale-105">
                <div className="flex items-center gap-5 mb-8">
                  <div className="p-4 rounded-2xl bg-cyan-500/25 border-2 border-cyan-500/40">
                    <Rocket className="h-10 w-10 text-cyan-300" />
                  </div>
                  <h3 className="text-4xl font-black text-cyan-300" style={{ fontFamily: "'Orbitron', sans-serif" }}>Mission</h3>
                </div>
                <p className="text-cyan-100/90 leading-relaxed text-xl">
                  Deploy cutting-edge AI and elite teams to transform businesses into unstoppable market forces through innovation and excellence.
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* Quick Access */}
        <section className="py-20 px-4 relative">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-black text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-300" style={{ fontFamily: "'Orbitron', sans-serif" }}>
              Quick Access
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {quickLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link key={link.title} href={link.href}>
                    <Card className="p-8 hover:scale-110 active:scale-95 transition-all duration-300 border-2 border-amber-500/40 bg-gradient-to-br from-amber-950/30 via-black/70 to-black/90 backdrop-blur-xl group hover:border-amber-400 hover:shadow-[0_0_50px_rgba(245,158,11,0.4)] cursor-pointer">
                      <Icon className="h-16 w-16 text-amber-300 mb-6 group-hover:scale-125 transition-transform group-hover:text-amber-200" />
                      <h3 className="text-xl font-bold mb-3 text-amber-100 group-hover:text-amber-300 transition-colors">
                        {link.title}
                      </h3>
                      <p className="text-amber-100/70">{link.desc}</p>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* 9D Framework */}
        <NineDFramework />

        {/* Strategic Vision */}
        <section className="py-20 px-4 relative">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-black text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-300" style={{ fontFamily: "'Orbitron', sans-serif" }}>
              Strategic Vision
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {strategicVision.map((item) => {
                const Icon = item.icon;
                return (
                  <Card key={item.title} className="p-8 border-2 border-amber-500/40 bg-gradient-to-br from-amber-950/30 via-black/70 to-black/90 backdrop-blur-2xl hover:border-amber-400 hover:shadow-[0_0_50px_rgba
_0_50px_rgba(245,158,11,0.4)] transition-all duration-500 hover:scale-105">
                    <Icon className="h-16 w-16 text-amber-300 mb-6" />
                    <h3 className="text-2xl font-black text-amber-300 mb-4" style={{ fontFamily: "'Orbitron', sans-serif" }}>{item.title}</h3>
                    <p className="text-amber-100/80 leading-relaxed">{item.description}</p>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Founder Section */}
        <FounderSection />

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
}