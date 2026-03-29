import { defineConfig } from 'vite';
import { devtools } from '@tanstack/devtools-vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import { nitro } from 'nitro/vite';

import { tanstackStart } from '@tanstack/react-start/plugin/vite';

import viteReact from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig(({ mode }) => ({
  plugins: [
    devtools(),
    tsconfigPaths({ projects: ['./tsconfig.json'] }),
    tailwindcss(),
    tanstackStart(),
    mode === 'production'
      ? nitro({
          serveStatic: true,
          routeRules: {
            '/assets/**': {
              headers: {
                'cache-control': 'public, max-age=31536000, immutable',
              },
            },
          },
        })
      : null,
    viteReact(),
  ],
}));
