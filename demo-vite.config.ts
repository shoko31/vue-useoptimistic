// vite.config.js
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig(({ mode }) => ({
  base: "/vue-useoptimistic/",
  plugins: [vue()],
  esbuild: {
    drop: mode === "production" ? ["console", "debugger"] : [],
  },
  build: {
    outDir: "dist-demo",
  },
}));
