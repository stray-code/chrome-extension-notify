import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { crx, defineManifest } from "@crxjs/vite-plugin";

const manifest = defineManifest({
  manifest_version: 3,
  name: "指定時間に通知",
  description: "指定時間に通知します。",
  version: "1.1.1",
  icons: {
    16: "img/icon16.png",
    48: "img/icon48.png",
    128: "img/icon128.png",
  },
  action: {},
  background: {
    service_worker: "src/background.ts",
    type: "module",
  },
  options_page: "src/options/index.html",
  permissions: ["storage", "notifications", "alarms"],
});

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), crx({ manifest })],
  server: {
    port: 5173,
    strictPort: true,
    hmr: {
      port: 5173,
    },
  },
});
