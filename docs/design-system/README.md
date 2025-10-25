
# DIG|LIT Design System

Complete UI/UX design system for the DIG|LIT platform.

## Structure

```
design-system/
├── foundations/          # Design tokens and primitives
│   ├── colors.ts        # Color palette
│   ├── typography.ts    # Font system
│   ├── spacing.ts       # Spacing scale
│   ├── shadows.ts       # Shadow system
│   ├── animations.ts    # Animation tokens
│   └── index.ts         # Barrel export
├── components/          # Reusable UI components
│   ├── GlassCard.tsx    # Glass morphism cards
│   ├── GradientText.tsx # Gradient text component
│   └── SectionContainer.tsx # Section wrapper
├── layouts/            # Layout components
│   ├── HeroLayout.tsx  # Hero section layout
│   └── GridLayout.tsx  # Responsive grid
├── animations/         # Animation utilities
└── assets/            # Design assets
```

## Usage

### Foundations

Import design tokens:

```tsx
import { colors, typography, spacing } from '@/design-system/foundations';

const myStyle = {
  color: colors.primary[400],
  fontSize: typography.sizes.h1,
  padding: spacing[8],
};
```

### Components

Use pre-built components:

```tsx
import { GlassCard, GradientText } from '@/design-system/components';

<GlassCard variant="premium" glow>
  <GradientText variant="gold">
    Digital Hegemony
  </GradientText>
</GlassCard>
```

### Layouts

Build sections with layouts:

```tsx
import { HeroLayout, GridLayout } from '@/design-system/layouts';

<HeroLayout height="lg">
  <GridLayout cols={{ sm: 1, md: 2, lg: 3 }} gap="lg">
    {items.map(item => <Card key={item.id} {...item} />)}
  </GridLayout>
</HeroLayout>
```

## Design Principles

1. **Premium Aesthetic** - High-end dark theme with golden accents
2. **Fluid Typography** - Responsive text sizing using clamp()
3. **Glass Morphism** - Translucent cards with backdrop blur
4. **Purposeful Animation** - Smooth, meaningful transitions
5. **Accessibility** - WCAG 2.1 AA compliant contrast ratios

## Color Palette

- **Primary**: Amber/Gold (#fbbf24)
- **Background**: Pure black (#000000)
- **Text**: Light gray (#e5e7eb)
- **Accents**: Golden glow effects

## Typography

- **Headers**: Orbitron (900 weight)
- **Body**: Inter (300-700 weights)
- **Mono**: Menlo

## Spacing Scale

Based on 4px increments (1, 2, 3, 4, 6, 8, 12, 16, 20, 24, 32...)
