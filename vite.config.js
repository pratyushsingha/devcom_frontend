import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/ecommerce": {
        target: "http://localhost:8080/api/v1",
        changeOrigin: true,
      },
      "/users": {
        target: "http://localhost:8080/api/v1",
        changeOrigin: true,
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
