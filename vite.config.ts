import { defineConfig } from 'vite';
import { resolve } from 'path';

// Library build: bundle EVERYTHING (Lit + Three.js) into one ES module file.
// HACS frontend resources must be a single file with no external runtime deps.
export default defineConfig({
  build: {
    target: 'esnext',
    lib: {
      entry: resolve(__dirname, 'src/ha-3d-floorplan-card.ts'),
      formats: ['es'],
      fileName: () => 'ha-3d-floorplan-card.js',
    },
    rollupOptions: {
      // Do NOT externalize anything — everything ships in the one bundle.
      external: [],
      output: {
        // Force a single chunk: inline all dynamic imports.
        inlineDynamicImports: true,
        entryFileNames: 'ha-3d-floorplan-card.js',
      },
    },
    minify: 'esbuild',
    sourcemap: false,
    // Keep output in dist/, committed for releases.
    outDir: 'dist',
    emptyOutDir: true,
  },
});
