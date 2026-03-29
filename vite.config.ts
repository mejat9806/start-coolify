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
      server: {
        // Tell Nitro that the public assets are in dist/client
        publicAssets: [
          {
            dir: './dist/client',
            maxAge: 31536000,
          },
        ],
        serveStatic: true,
      } as any,
    }),
    viteReact(),
  ],
});
