import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@food-app/hooks': '/src/hooks/index.ts',
      '@food-app/hooks/*': '/src/hooks/*',
      '@food-app/components': '/src/components/index.ts',
    },
  },
  optimizeDeps: {
    force: true,
    esbuildOptions: {
      loader: {
        '.ts': 'tsx',
      },
    },
  },
});
