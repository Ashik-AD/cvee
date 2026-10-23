import { defineConfig } from 'lint-staged/config';

export default defineConfig({
  '*.{js,jsx,ts,tsx,test.js,test.jsx,test.ts,test.tsx}': [
    'pnpm run lint:fix',
    'pnpm run format',
  ],
  '*.{css,scss,sass}': ['pnpm run format'],
});
