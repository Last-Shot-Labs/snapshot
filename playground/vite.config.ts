import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "node:path";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@lastshotlabs/snapshot/ui": path.resolve(__dirname, "../src/ui.ts"),
      "@lastshotlabs/snapshot": path.resolve(__dirname, "../src/index.ts"),
      "@lib/snapshot": path.resolve(__dirname, "src/lib/snapshot.ts"),
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3001",
        changeOrigin: true,
      },
    },
  },
  build: {
    chunkSizeWarningLimit: 3500,
  },
});
