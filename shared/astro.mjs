import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "astro/config";

export function butcherConfig(configFile, port) {
  const siteDir = path.dirname(fileURLToPath(configFile));
  const repoRoot = path.resolve(siteDir, "../..");

  return defineConfig({
    site: process.env.SITE || undefined,
    base: process.env.BASE
      ? process.env.BASE.endsWith("/")
        ? process.env.BASE
        : `${process.env.BASE}/`
      : "/",
    server: { port, host: true },
    publicDir: path.resolve(repoRoot, "shared/public"),
    devToolbar: { enabled: false },
    vite: {
      server: {
        fs: { allow: [repoRoot] },
      },
      resolve: {
        alias: {
          "@shared": path.resolve(repoRoot, "shared"),
        },
      },
    },
  });
}
