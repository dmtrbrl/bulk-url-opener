import { defineConfig } from "vite";
import { viteStaticCopy } from "vite-plugin-static-copy";
import { glob } from "glob";
import * as path from "path";
import { fileURLToPath } from "url";

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
    resolve: {
      alias: [
        { find: "@", replacement: fileURLToPath(new URL("./src", import.meta.url)) },
        { find: "@assets", replacement: fileURLToPath(new URL("./src/assets", import.meta.url)) },
        { find: "@components", replacement: fileURLToPath(new URL("./src/components", import.meta.url)) },
        { find: "@mocks", replacement: fileURLToPath(new URL("./src/mocks", import.meta.url)) },
        { find: "@services", replacement: fileURLToPath(new URL("./src/services", import.meta.url)) },
      ],
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
    define: {
      APP_VERSION: JSON.stringify(process.env.npm_package_version),
    },
    test: {
      environment: "happy-dom",
    },
  };
});
