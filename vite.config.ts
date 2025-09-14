import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import dts from "vite-plugin-dts";



const __dirname = dirname(fileURLToPath(import.meta.url));
// https://vite.dev/config/

export default defineConfig({
  plugins: [react(), tailwindcss(),dts({ rollupTypes: false, entryRoot: 'Lib' })],
  build: {
    lib: {
      entry: resolve(__dirname, "Lib/index.tsx"),
      name: "latifis-lib",
      // the proper extensions will be added
      fileName: "latifis-lib",
    },
    rollupOptions: {
      external: ["react", "react-dom", "react/jsx-runtime"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDom",
          "react/jsx-runtime": "react/jsx-runtime",
        },
      },
    },
  },
});
