import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getIcon } from "@/lib/icons";
import type { ServiceCategory } from "@shared/schema";

// Background Stars Component (same as home)
function BackgroundStars() {
  const stars = Array.from({ length: 80 }).map(() => ({
    left: Math.random() * 100,
    top: Math.random() * 100,
    size: 0.8 + Math.random() * 1.8,
    dur: 2 + Math.random() * 3,
    delay: Math.random() * 3,
  }));

  const floaters = Array.from({ length: 20 }).map(() => ({
    left: Math.random() * 100,
    top: Math.random() * 100,
    dur: 12 + Math.random() * 18,
    delay: Math.random() * 5,
  }));

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

function clamp(min: string, pref: string, max: string) {
  return `clamp(${min}, ${pref}, ${max})`;
}

export default function Services() {
  const [expandedServices, setExpandedServices] = useState<Set<string>>(new Set());
  
  const { data: services = [], isLoading } = useQuery<ServiceCategory[]>({
    queryKey: ["/api/services"],
  });

  const toggleService = (id: string) => {
    const newExpanded = new Set(expandedServices);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedServices(newExpanded);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-950/30 via-black to-black pt-20 flex items-center justify-center relative">
        <BackgroundStars />
        <div className="text-center relative z-10">
          <Loader2 className="h-12 w-12 text-amber-400 animate-spin mx-auto mb-4" />
          <p className="text-amber-200/80">Loading services...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes twinkle {
            0%, 100% { opacity: 0.3; transform: scale(1); }
            50% { opacity: 1; transform: scale(1.2); }
          }
          
          @keyframes float {
            0% { transform: translateY(0) translateX(0); }
            50% { transform: translateY(-40vh) translateX(45px); }
            100% { transform: translateY(-80vh) translateX(0); }
          }
        `
      }} />

      <div className="min-h-screen bg-gradient-to-br from-amber-950/30 via-black to-black relative">
        <BackgroundStars />
        
        <section className="py-20 px-4 relative z-10">
          <div className="max-w-6xl mx-auto text-center mb-16">
            <h1
              className="font-black bg-clip-text text-transparent bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-300 font-orbitron mb-6"
              style={{ fontSize: clamp("2.5rem", "8vw", "5rem") }}
            >
              Our Services
            </h1>
            <p
              className="text-amber-200/80 font-medium max-w-3xl mx-auto"
              style={{ fontSize: clamp("1rem", "2.5vw", "1.3rem") }}
            >
              Comprehensive solutions across 13 specialized categories designed to power every aspect
              of your business
            </p>
          </div>

          <div className="max-w-7xl mx-auto grid gap-6">
            {services.map((service) => {
              const isExpanded = expandedServices.has(service.id);
              const Icon = getIcon(service.icon);
              return (
                <Card
                  key={service.id}
                  className="border-2 border-amber-500/30 overflow-hidden bg-gradient-to-br from-amber-950/20 via-black/60 to-black/80 backdrop-blur-xl hover:border-amber-400 hover:shadow-[0_0_30px_rgba(245,158,11,0.2)] transition-all duration-300"
                  data-testid={`card-service-${service.id}`}
                >
                  <button
                    onClick={() => toggleService(service.id)}
                    className="w-full p-6 md:p-8 flex items-start gap-4 md:gap-6 text-left hover:bg-amber-500/5 transition-all duration-300"
                    data-testid={`button-toggle-${service.id}`}
                  >
                    <Icon className="h-12 w-12 md:h-14 md:w-14 text-amber-300 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2 flex-wrap">
                        <Badge variant="default" className="text-sm bg-amber-500 text-black hover:bg-amber-400">
                          {service.number}
                        </Badge>
                        <h3 className="text-2xl md:text-3xl font-black font-orbitron text-amber-300">
                          {service.name}
                        </h3>
                      </div>
                      <p className="text-amber-200/80 font-medium">{service.tagline}</p>
                    </div>
                    <div className="flex-shrink-0">
                      {isExpanded ? (
                        <ChevronUp className="h-6 w-6 text-amber-300" />
                      ) : (
                        <ChevronDown className="h-6 w-6 text-amber-300" />
                      )}
                    </div>
                  </button>

                  {isExpanded && (
                    <div
                      className="px-6 md:px-8 pb-6 md:pb-8 border-t border-amber-500/20"
                      data-testid={`content-${service.id}`}
                    >
                      <div className="pt-6">
                        <h4 className="text-lg font-bold mb-4 text-amber-200">Services Offered:</h4>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                          {service.services.map((item, index) => (
                            <div
                              key={index}
                              className="flex items-start gap-2 p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 hover:bg-amber-500/15 transition-colors"
                            >
                              <div className="h-2 w-2 rounded-full bg-amber-400 flex-shrink-0 mt-2" />
                              <span className="text-sm text-amber-200/80">{item}</span>
                            </div>
                          ))}
                        </div>
                        <div className="mt-6 flex gap-3">
                          <Button
                            size="default"
                            className="gap-2 bg-gradient-to-r from-amber-500 to-yellow-400 text-black hover:from-amber-400 hover:to-yellow-300 font-bold"
                            data-testid={`button-request-${service.id}`}
                          >
                            Request Service
                          </Button>
                          <Button
                            size="default"
                            variant="outline"
                            className="border-amber-400 text-amber-300 hover:bg-amber-500/10"
                            data-testid={`button-details-${service.id}`}
                          >
                            View Details
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </Card>
              );
            })}
          </div>
        </section>

        <section className="py-20 px-4 bg-amber-500/5 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-black mb-6 font-orbitron bg-clip-text text-transparent bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-300">
              Need a Custom Solution?
            </h2>
            <p className="text-xl text-amber-200/80 mb-12">
              Our team can create tailored service packages to match your specific requirements
            </p>
            <Button 
              size="lg" 
              className="text-base bg-gradient-to-r from-amber-500 to-yellow-400 text-black hover:from-amber-400 hover:to-yellow-300 font-bold"
              data-testid="button-contact-us"
            >
              Contact Us
            </Button>
          </div>
        </section>
      </div>
    </>
  );
}