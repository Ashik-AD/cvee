import path from 'node:path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    pool: 'forks',
    setupFiles: ['./src/test/extends.ts'],
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
