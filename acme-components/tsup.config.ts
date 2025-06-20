import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts', 'src/navbar.tsx', 'src/prefetch-cross-zone-links.tsx'],
  format: ['esm', 'cjs'],
  dts: true,
  external: ['react', 'react-dom', 'next'],
  clean: true,
  sourcemap: true,
}) 