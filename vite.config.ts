import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import devtools from 'solid-devtools/vite';
import path from "node:path";

export default defineConfig({
  optimizeDeps: {
    exclude: ["solid-icons"]
  },
  // https://stackoverflow.com/a/77249075
  resolve: {
    alias: {
      "@style": path.resolve(__dirname, "./styled-system"),
    }
  },
  plugins: [devtools(), solidPlugin()],
  server: {
    port: 3000,
  },
  build: {
    target: 'esnext',
  },
});
