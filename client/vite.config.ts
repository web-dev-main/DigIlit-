import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// Minimal Vite config inside the client folder so running `cd client && vite`
// picks up aliases relative to the client root.
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@shared': path.resolve(__dirname, '..', 'shared'),
      '@assets': path.resolve(__dirname, '..', 'attached_assets'),
    },
  },
});
