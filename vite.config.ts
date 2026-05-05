import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        assetFileNames: "assets/[name]-[hash][extname]",
        chunkFileNames: "assets/[name]-[hash].js",
        entryFileNames: "assets/[name]-[hash].js",
        manualChunks: {
          vendor: ["react", "react-dom", "react-router-dom"],
          // Split framer-motion to its own chunk so the landing page (which no
          // longer imports it) doesn't pay for it on first paint.
          motion: ["framer-motion"],
          icons: ["lucide-react"],
          supabase: ["@supabase/supabase-js"],
        },
      },
    },
  },
}));