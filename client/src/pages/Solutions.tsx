import { ThirteenPointSeal } from "@/components/ThirteenPointSeal";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, ArrowRight, Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getIcon } from "@/lib/icons";
import type { Solution } from "@shared/schema";

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

export default function Solutions() {
  const { data: solutions = [], isLoading } = useQuery<Solution[]>({
    queryKey: ["/api/solutions"],
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-950/30 via-black to-black pt-20 flex items-center justify-center relative">
        <BackgroundStars />
        <div className="text-center relative z-10">
          <Loader2 className="h-12 w-12 text-amber-400 animate-spin mx-auto mb-4" />
          <p className="text-amber-200/80">Loading solutions...</p>
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
        
        <section className="relative min-h-[85vh] flex flex-col items-center justify-center py-20 px-4">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-15 mix-blend-screen w-[70vw] max-w-[600px] pointer-events-none">
            <ThirteenPointSeal size={600} />
          </div>

          <div className="relative z-10 text-center max-w-4xl mx-auto">
            <h1
              className="font-black bg-clip-text text-transparent bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-300 font-orbitron mb-6"
              style={{ fontSize: clamp("2.5rem", "8vw", "6rem") }}
            >
              Solutions
            </h1>
            <p
              className="text-amber-200/80 font-medium mb-12"
              style={{ fontSize: clamp("1.1rem", "2.5vw", "1.5rem") }}
            >
              Powering Your Digital Hegemony
            </p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
              {solutions.slice(0, 5).map((solution) => {
                const Icon = getIcon(solution.icon);
                return (
                  <Card
                    key={solution.id}
                    className="p-6 border border-amber-500/30 bg-gradient-to-br from-amber-950/20 via-black/60 to-black/80 backdrop-blur-xl hover:border-amber-400 hover:shadow-[0_0_30px_rgba(245,158,11,0.2)] transition-all duration-300 cursor-pointer group"
                    data-testid={`card-solution-${solution.id}`}
                  >
                    <Icon className="h-14 w-14 text-amber-300 mb-4 group-hover:scale-110 transition-transform duration-300" />
                    <h3 className="text-xl font-black text-amber-300 mb-2 font-orbitron">
                      {solution.name}
                    </h3>
                    <p className="text-sm text-amber-200/80 font-medium mb-3">{solution.tagline}</p>
                    <p className="text-sm text-amber-200/70 leading-relaxed">
                      {solution.description}
                    </p>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        <section className="py-20 px-4 bg-amber-500/5 relative z-10">
          <div className="max-w-7xl mx-auto">
            <div className="space-y-32">
              {solutions.map((solution, index) => {
                const Icon = getIcon(solution.icon);
                return (
                  <div
                    key={solution.id}
                    className={`grid lg:grid-cols-2 gap-12 items-center ${
                      index % 2 === 1 ? "lg:grid-flow-dense" : ""
                    }`}
                  >
                    <div className={index % 2 === 1 ? "lg:col-start-2" : ""}>
                      <Badge 
                        className="mb-4 bg-amber-500 text-black hover:bg-amber-400" 
                        data-testid={`badge-${solution.id}`}
                      >
                        Solution {index + 1}
                      </Badge>
                      <div className="flex items-center gap-4 mb-4">
                        <Icon className="h-16 w-16 text-amber-300" />
                        <h2 className="text-4xl md:text-5xl font-black font-orbitron text-amber-300">
                          {solution.name}
                        </h2>
                      </div>
                      <p className="text-xl text-amber-200/90 font-semibold mb-6">{solution.tagline}</p>
                      <p className="text-amber-200/80 leading-relaxed mb-8 text-lg">
                        {solution.longDescription}
                      </p>
                      <Button
                        size="lg"
                        className="gap-2 bg-gradient-to-r from-amber-500 to-yellow-400 text-black hover:from-amber-400 hover:to-yellow-300 font-bold"
                        data-testid={`button-learn-more-${solution.id}`}
                      >
                        Learn More
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className={index % 2 === 1 ? "lg:col-start-1 lg:row-start-1" : ""}>
                      <Card className="p-8 border-2 border-amber-500/30 bg-gradient-to-br from-amber-950/20 via-black/60 to-black/80 backdrop-blur-xl">
                        <h3 className="text-2xl font-bold mb-6 font-orbitron text-amber-300">Key Features</h3>
                        <ul className="space-y-3 mb-8">
                          {solution.features.map((feature, i) => (
                            <li key={i} className="flex items-start gap-3">
                              <CheckCircle2 className="h-5 w-5 text-amber-400 flex-shrink-0 mt-0.5" />
                              <span className="text-amber-200/80">{feature}</span>
                            </li>
                          ))}
                        </ul>

                        <h3 className="text-2xl font-bold mb-6 font-orbitron text-amber-300">Benefits</h3>
                        <ul className="space-y-3">
                          {solution.benefits.map((benefit, i) => (
                            <li key={i} className="flex items-start gap-3">
                              <CheckCircle2 className="h-5 w-5 text-amber-400 flex-shrink-0 mt-0.5" />
                              <span className="text-amber-200/80">{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </Card>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="py-20 px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-black mb-6 font-orbitron bg-clip-text text-transparent bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-300">
              Ready to Transform Your Business?
            </h2>
            <p className="text-xl text-amber-200/80 mb-12">
              Let's discuss how our solutions can drive your success
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button 
                size="lg" 
                className="text-base bg-gradient-to-r from-amber-500 to-yellow-400 text-black hover:from-amber-400 hover:to-yellow-300 font-bold"
                data-testid="button-get-started"
              >
                Get Started Today
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-base border-amber-400 text-amber-300 hover:bg-amber-500/10"
                data-testid="button-schedule-consultation"
              >
                Schedule Consultation
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}