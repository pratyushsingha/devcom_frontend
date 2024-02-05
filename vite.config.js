import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/ecommerce": {
        target: "https://devcombackend-33y7.onrender.com/api/v1",
        changeOrigin: true,
      },
      "/users": {
        target: "https://devcombackend-33y7.onrender.com/api/v1",
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
