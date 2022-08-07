import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  root: 'src',
  build: {
    outDir: '../dist',
  },
  publicDir: './public',
  envDir: '../',
  css: {
    modules: {
      localsConvention: 'camelCaseOnly',
    }
  },
  plugins: [
    react({
      include: '**/*.{jsx,tsx}',
    })
  ]
});
