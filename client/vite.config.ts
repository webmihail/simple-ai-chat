import { defineConfig } from "vite";
import path from "path";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

// https://vite.dev/config/
export default defineConfig({
  plugins: [svgr(), react()],
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx", ".json"],
    alias: {
      assets: path.resolve(__dirname, "./src/assets"),
      modules: path.resolve(__dirname, "./src/modules"),
      helpers: path.resolve(__dirname, "./src/helpers"),
    },
  },
  server: {
    host: "localhost",
    port: 3000,
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: "modern-compiler",
      },
    },
  },
});
