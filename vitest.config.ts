import { defineConfig } from "vitest/config";
import viteConfig from "./vite.config";

export default defineConfig({
  ...viteConfig,
  test: {
    include: ["vitest/**/*.test.ts", "vitest/**/*.test.tsx"],
    environment: "jsdom",
    globals: true,
  },
});
