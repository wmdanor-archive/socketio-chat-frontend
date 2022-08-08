import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import checker from 'vite-plugin-checker';

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
      include: '**/*.{tsx}',
    }),
    checker({
      typescript: true,
    }),
  ]
});
