import { defineConfig } from 'vite';
import { resolve } from 'path';
import { copyFileSync, mkdirSync } from 'fs';

// After the bundle is written, copy it into the custom integration so the
// integration ships and serves the exact same frontend build.
function copyToIntegration() {
  return {
    name: 'copy-to-integration',
    closeBundle() {
      const src = resolve(__dirname, 'dist/ha-3d-floorplan-card.js');
      const destDir = resolve(__dirname, 'custom_components/ha_3d_floorplan/frontend');
      mkdirSync(destDir, { recursive: true });
      copyFileSync(src, resolve(destDir, 'ha-3d-floorplan-card.js'));
    },
  };
}

// Library build: bundle EVERYTHING (Lit + Three.js) into one ES module file.
// HACS frontend resources must be a single file with no external runtime deps.
export default defineConfig({
  plugins: [copyToIntegration()],
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
