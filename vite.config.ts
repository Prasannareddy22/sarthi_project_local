import { tanstackStart } from '@tanstack/react-start/plugin/vite';
import { defineConfig } from 'vite';
import viteReact from '@vitejs/plugin-react';
import { nitro } from 'nitro/vite'; // <--- Add this import

export default defineConfig({
  plugins: [
    tanstackStart(),
    nitro(), // <--- Add this to your plugins array
    viteReact(),
  ],
});