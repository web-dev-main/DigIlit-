
import React from 'react';
import { cn } from '@/lib/utils';

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'premium' | 'minimal';
  glow?: boolean;
  children: React.ReactNode;
}

export function GlassCard({
  variant = 'default',
  glow = false,
  className,
  children,
  ...props
}: GlassCardProps) {
  const variants = {
    default: 'rounded-2xl border border-amber-500/30 bg-gradient-to-br from-amber-950/20 via-black/40 to-black/50 backdrop-blur-xl',
    premium: 'rounded-2xl border-2 border-amber-500/40 bg-gradient-to-br from-amber-950/30 via-black/60 to-black/80 backdrop-blur-xl',
    minimal: 'rounded-xl border border-amber-500/20 bg-black/30 backdrop-blur-md',
  };

  const glowStyles = glow ? 'hover:border-amber-400 hover:shadow-[0_0_50px_rgba(251,191,36,0.3)]' : '';

  return (
    <div
      className={cn(
        variants[variant],
        glowStyles,
        'transition-all duration-300',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
