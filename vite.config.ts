import { defineConfig } from 'vite';
import { devtools } from '@tanstack/devtools-vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import { tanstackStart } from '@tanstack/react-start/plugin/vite';
import viteReact from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    devtools(),
    tsconfigPaths({ projects: ['./tsconfig.json'] }),
    tailwindcss(),
    tanstackStart({
      // We cast to any because the TanStack Start types
      // sometimes hide the underlying Nitro server options
      server: {
        preset: 'node-server',
        serveStatic: true,
        routeRules: {
          '/assets/**': {
            headers: {
              'cache-control': 'public, max-age=31536000, immutable',
            },
          },
        },
      } as any,
    }),
    viteReact(),
  ],
});
