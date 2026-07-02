import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite'; // The v4 plugin
import { tanstackStart } from '@tanstack/react-start/plugin/vite';
import { nitro } from 'nitro/vite';
import viteReact from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    tailwindcss(), // Must be first
    tanstackStart(),
    nitro(),
    viteReact(),
  ],
  resolve: {
    alias: {
      // Mirrors the "@/*" path mapping in tsconfig.json so it also resolves
      // at build time, not just for the TypeScript language server.
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});