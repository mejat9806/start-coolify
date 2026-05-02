import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import turboPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [react(), turboPaths()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
    server: {
      deps: {
        inline: ['@tanstack/react-router'],
      },
    },
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      include: ['src/**/*.{ts,tsx}'],
      exclude: [
        'node_modules',
        '**/*.d.ts',
        '**/vite.config.*',
        '**/routeTree.gen.*',
        'src/test/*',
      ],
    },
  },
});
