import { defineConfig } from 'vite';

export default defineConfig({
  optimizeDeps: {
    exclude: ['ng2-pdf-viewer'], // don’t pre-bundle this lib
  },
});
