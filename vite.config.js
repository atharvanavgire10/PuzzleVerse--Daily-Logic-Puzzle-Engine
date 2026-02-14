import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./src/setupTests.js",
    coverage: {
      reporter: ["text", "html"],
      statements: 90,
      branches: 90,
      functions: 90,
      lines: 90
    }
  }
});