import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // Ensures assets load correctly on both local dev and GitHub Pages
  server: {
    port: 3000,
    open: false
  }
});
