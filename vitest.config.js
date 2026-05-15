import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,   // 🔥 THIS IS THE FIX
    environment: "jsdom",
    setupFiles: "./src/setupTests.js",
  },
});