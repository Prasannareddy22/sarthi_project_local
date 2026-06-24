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
});