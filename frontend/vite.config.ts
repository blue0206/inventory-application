import path from 'path';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "shared": path.resolve(__dirname, "../shared")
    },
  },
  optimizeDeps: {
    exclude: [
      "lucide-react.js",
      "radix-ui_react-navigation-menu.js",
      "@radix-ui_react-dialog.js",
    ],
  },
});
