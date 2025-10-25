import { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import { AtomToStar } from "./AtomToStar";
import { Search, Home, ShoppingCart, Users, Briefcase, LogIn } from "lucide-react";

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const nav = [
    { label: "Solutions", icon: Briefcase, href: "/solutions" },
    { label: "Services", icon: Users, href: "/services" },
    { label: "Shop", icon: ShoppingCart, href: "/shop" },
    { label: "Login", icon: LogIn, href: "/login" },
  ];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 border-b ${
        scrolled
          ? "backdrop-blur-2xl bg-black/75 border-primary/40 shadow-[0_8px_40px_rgba(245,158,11,0.15)]"
          : "backdrop-blur-md bg-black/25 border-primary/20"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="relative flex items-center rounded-lg border border-primary/30 bg-black/30 backdrop-blur px-2 py-1 h-9">
            <Search className="h-4 w-4 text-primary" />
            <input
              readOnly
              placeholder="Search..."
              className="ml-2 bg-transparent outline-none text-primary-foreground text-xs w-20 placeholder-primary/60"
              data-testid="input-search"
            />
          </div>
          <Link href="/">
            <button
              className="flex items-center justify-center h-9 w-9 rounded-lg border border-primary/30 hover:border-primary hover:bg-primary/10 hover-elevate active-elevate-2 transition-all duration-300"
              aria-label="Home"
              data-testid="link-home"
            >
              <Home className="h-4 w-4 text-primary" />
            </button>
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-2 w-full max-w-xs justify-center">
          {Array.from({ length: 9 }).map((_, i) => (
            <AtomToStar key={i} delay={i * 160} />
          ))}
        </div>

        <nav className="hidden md:flex items-center gap-2">
          {nav.map((item) => {
            const Icon = item.icon;
            const isActive = location === item.href;
            return (
              <Link key={item.label} href={item.href}>
                <button
                  className={`relative h-9 w-9 grid place-items-center rounded-lg border transition-all duration-300 hover-elevate active-elevate-2 ${
                    isActive
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-primary/30 text-primary-foreground/90 hover:text-primary hover:border-primary hover:bg-primary/5"
                  }`}
                  aria-label={item.label}
                  title={item.label}
                  data-testid={`link-${item.label.toLowerCase()}`}
                >
                  <Icon className="h-4 w-4" />
                </button>
              </Link>
            );
          })}
        </nav>

        <div className="md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg border border-primary/30 hover:border-primary hover:bg-primary/10 hover-elevate active-elevate-2 transition-all duration-300"
            aria-label="Menu"
            data-testid="button-menu"
          >
            <div className="w-6 h-6 flex flex-col justify-center gap-1">
              <span
                className={`w-full h-0.5 bg-primary transition-all duration-300 ${
                  mobileMenuOpen ? "rotate-45 translate-y-1.5" : ""
                }`}
              />
              <span
                className={`w-full h-0.5 bg-primary transition-all duration-300 ${
                  mobileMenuOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`w-full h-0.5 bg-primary transition-all duration-300 ${
                  mobileMenuOpen ? "-rotate-45 -translate-y-1.5" : ""
                }`}
              />
            </div>
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t border-primary/20 bg-black/95 backdrop-blur-2xl">
          <div className="px-4 py-3 grid grid-cols-4 gap-2">
            {nav.map((item) => {
              const Icon = item.icon;
              const isActive = location === item.href;
              return (
                <Link key={item.label} href={item.href}>
                  <button
                    className={`flex flex-col items-center gap-1 py-2 rounded-lg border transition-colors hover-elevate w-full ${
                      isActive
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-primary/20 text-primary-foreground/90 hover:border-primary hover:bg-primary/5"
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                    data-testid={`mobile-link-${item.label.toLowerCase()}`}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="text-xs">{item.label}</span>
                  </button>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
