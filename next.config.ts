import type { NextConfig } from "next";

// GITHUB_PAGES=true switches to a static export for the client-preview
// GitHub Pages deployment only. The normal `npm run build` / `npm run dev`
// path (no env var set) is untouched -- next/image optimization and a
// server-capable output stay available for the real deployment later.
const isGithubPages = process.env.GITHUB_PAGES === "true";

const nextConfig: NextConfig = {
  ...(isGithubPages
    ? {
        output: "export" as const,
        basePath: "/p32-landing-02",
        assetPrefix: "/p32-landing-02/",
        images: { unoptimized: true },
      }
    : {}),
};

export default nextConfig;
