import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ThirteenPointSeal } from "@/components/ThirteenPointSeal";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useMemo } from "react";

// Background Stars Component (EXACT same as home - 120 stars + 25 floaters)
function BackgroundStars() {
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

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function Login() {
  const { toast } = useToast();
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: LoginFormValues) => {
    toast({
      title: "Login Successful",
      description: `Welcome back, ${data.email}!`,
    });
  };

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

      <div className="min-h-screen bg-gradient-to-br from-amber-950/30 via-black to-black pt-20 flex items-center justify-center px-4 relative">
        <BackgroundStars />
        
        <div className="w-full max-w-md relative">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-10 pointer-events-none">
            <ThirteenPointSeal size={400} />
          </div>

          <Card className="p-8 border-2 border-amber-500/30 relative z-10 bg-gradient-to-br from-amber-950/20 via-black/60 to-black/80 backdrop-blur-xl hover:border-amber-400 hover:shadow-[0_0_30px_rgba(245,158,11,0.2)] transition-all duration-300">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-black font-orbitron text-amber-300 mb-2">Welcome Back</h1>
              <p className="text-amber-100/80">Sign in to access your account</p>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-amber-200 font-semibold">Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="you@example.com"
                          data-testid="input-email"
                          className="bg-black/50 border-amber-500/40 text-amber-100 placeholder-amber-400/50 focus:border-amber-400 focus:ring-amber-400 transition-colors"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-amber-300" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-amber-200 font-semibold">Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Enter your password"
                          data-testid="input-password"
                          className="bg-black/50 border-amber-500/40 text-amber-100 placeholder-amber-400/50 focus:border-amber-400 focus:ring-amber-400 transition-colors"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-amber-300" />
                    </FormItem>
                  )}
                />

                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-amber-500 to-yellow-400 text-black hover:from-amber-400 hover:to-yellow-300 font-bold shadow-lg hover:shadow-[0_10px_30px_rgba(245,158,11,0.4)] transition-all duration-300" 
                  size="lg" 
                  data-testid="button-login"
                >
                  Sign In
                </Button>

                <div className="text-center text-sm">
                  <a href="#" className="text-amber-300 hover:text-amber-200 hover:underline transition-colors font-medium">
                    Forgot your password?
                  </a>
                </div>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-amber-500/30" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-gradient-to-br from-amber-950/20 via-black/60 to-black/80 px-3 text-amber-400 font-semibold">Or continue with</span>
                  </div>
                </div>

                <div className="text-center">
                  <p className="text-sm text-amber-100/80">
                    Don't have an account?{" "}
                    <a href="#" className="text-amber-300 hover:text-amber-200 hover:underline font-semibold transition-colors">
                      Sign up
                    </a>
                  </p>
                </div>
              </form>
            </Form>
          </Card>
        </div>
      </div>
    </>
  );
}