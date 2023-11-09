import { defineConfig } from "vite";
import { viteStaticCopy } from "vite-plugin-static-copy";
import { glob } from "glob";
import * as path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    root: path.join(__dirname, "src"),
    build: {
      rollupOptions: {
        input: glob.sync(path.resolve(__dirname, "src", "*.html")),
      },
      emptyOutDir: true,
      outDir: path.resolve(__dirname, `dist-${mode}`),
    },
    plugins: [
      viteStaticCopy({
        targets: [
          {
            src: "./assets/icons",
            dest: "",
          },
          {
            src: `./manifest/manifest-${mode}.json`,
            dest: ".",
            rename: "manifest.json",
          },
        ],
      }),
    ],
  };
});
