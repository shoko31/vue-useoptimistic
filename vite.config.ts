// vite.config.js
import { resolve } from "path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import dts from "vite-plugin-dts";

const NAME = "vue-useoptimistic";

export default defineConfig(({ mode }) => ({
  publicDir: mode === "production" ? false : "public",
  plugins: [
    vue(),
    dts({ exclude: [resolve(__dirname, `src/demo/**`), "**/*.test.ts"] }),
  ],
  esbuild: {
    drop: mode === "production" ? ["console", "debugger"] : [],
  },
  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, `src/main.ts`),
      name: `${NAME}`,
      // the proper extensions will be added
      fileName: `${NAME}`,
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ["vue"],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          vue: "Vue",
        },
      },
    },
  },
}));
