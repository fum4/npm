import { defineConfig } from 'vitest/config';
import { resolve } from 'path';

export default defineConfig({
  test: {
    environment: 'jsdom',
    setupFiles: resolve(__dirname, 'test/vitest.setup.ts')
  }
});
