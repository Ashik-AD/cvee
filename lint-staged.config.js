import { defineConfig } from 'lint-staged/config';

export default defineConfig({
  '*.{js,jsx,ts,tsx,test.js,test.jsx,test.ts,test.tsx,css}': [
    'pnpm run lint:fix',
    'pnpm run format',
  ],
});
