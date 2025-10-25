import type { Config } from 'tailwindcss';
import shared from '../../packages/tailwind-config';

export default {
  ...shared,
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    '../../packages/ui/src/**/*.{ts,tsx}'
  ]
} satisfies Config;
