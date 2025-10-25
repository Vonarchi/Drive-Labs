import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./tests/unit/setup.ts'],
    coverage: { reporter: ['text', 'json', 'lcov'], lines: 0.8 },
    globals: true,
    exclude: ['**/node_modules/**', '**/dist/**', '**/tests/e2e/**', '**/tmp/**']
  },
  resolve: { alias: { '@': '/src' } }
});
