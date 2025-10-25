
import React from 'react';
import { cn } from '@/lib/utils';

interface HeroLayoutProps extends React.HTMLAttributes<HTMLElement> {
  height?: 'sm' | 'md' | 'lg' | 'full';
  overlay?: boolean;
  children: React.ReactNode;
}

export function HeroLayout({
  height = 'lg',
  overlay = false,
  className,
  children,
  ...props
}: HeroLayoutProps) {
  const heights = {
    sm: 'min-h-[60vh]',
    md: 'min-h-[75vh]',
    lg: 'min-h-[85vh]',
    full: 'min-h-screen',
  };

  return (
    <section
      className={cn(
        'relative flex flex-col items-center justify-center',
        heights[height],
        overlay && 'bg-gradient-to-br from-amber-950/30 via-black to-black',
        className
      )}
      {...props}
    >
      {children}
    </section>
  );
}
