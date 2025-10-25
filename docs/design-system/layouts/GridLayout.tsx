
import React from 'react';
import { cn } from '@/lib/utils';

interface GridLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  cols?: {
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
  gap?: 'sm' | 'md' | 'lg' | 'xl';
  children: React.ReactNode;
}

export function GridLayout({
  cols = { sm: 1, md: 2, lg: 3 },
  gap = 'md',
  className,
  children,
  ...props
}: GridLayoutProps) {
  const gaps = {
    sm: 'gap-4',
    md: 'gap-6',
    lg: 'gap-8',
    xl: 'gap-12',
  };

  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-4',
    5: 'grid-cols-5',
    6: 'grid-cols-6',
  };

  return (
    <div
      className={cn(
        'grid',
        gaps[gap],
        cols.sm && gridCols[cols.sm],
        cols.md && `md:${gridCols[cols.md]}`,
        cols.lg && `lg:${gridCols[cols.lg]}`,
        cols.xl && `xl:${gridCols[cols.xl]}`,
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
