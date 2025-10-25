
import React from 'react';
import { cn } from '@/lib/utils';

interface SectionContainerProps extends React.HTMLAttributes<HTMLElement> {
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  spacing?: 'sm' | 'md' | 'lg' | 'xl';
  children: React.ReactNode;
}

export function SectionContainer({
  size = 'lg',
  spacing = 'lg',
  className,
  children,
  ...props
}: SectionContainerProps) {
  const sizes = {
    sm: 'max-w-3xl',
    md: 'max-w-5xl',
    lg: 'max-w-6xl',
    xl: 'max-w-7xl',
    full: 'max-w-full',
  };

  const spacings = {
    sm: 'py-12 px-4',
    md: 'py-16 px-4 sm:px-6',
    lg: 'py-20 px-4 sm:px-6',
    xl: 'py-32 px-4 sm:px-6',
  };

  return (
    <section
      className={cn(
        'mx-auto',
        sizes[size],
        spacings[spacing],
        className
      )}
      {...props}
    >
      {children}
    </section>
  );
}
