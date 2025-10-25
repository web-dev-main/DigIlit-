
import React from 'react';
import { cn } from '@/lib/utils';

interface GradientTextProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'silver' | 'gold' | 'amber';
  children: React.ReactNode;
}

export function GradientText({
  variant = 'gold',
  className,
  children,
  ...props
}: GradientTextProps) {
  const variants = {
    silver: 'bg-gradient-to-b from-gray-200 via-slate-300 to-slate-400',
    gold: 'bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400',
    amber: 'bg-gradient-to-br from-amber-200 via-yellow-300 to-amber-400',
  };

  return (
    <span
      className={cn(
        'bg-clip-text text-transparent',
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
