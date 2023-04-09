// import { resolve as _resolve } from 'path';
import { defineConfig } from 'vitest/config';

// const resolve = (p: string) => _resolve(__dirname, p)

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    // setupFiles: resolve('test/vitest.setup.ts')
  }
});
