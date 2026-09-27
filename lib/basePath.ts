// next/image does not auto-prefix a hardcoded `src="/media/..."` string with
// `basePath` when `images.unoptimized: true` (the GitHub Pages static-export
// build only, see next.config.ts) -- only framework-managed assets (_next/*,
// fonts) get that treatment automatically. Route every local asset path
// through this so it resolves correctly under a GitHub Pages project
// subpath without affecting the normal (non-static-export) build, where
// NEXT_PUBLIC_BASE_PATH is unset and this is a no-op.
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function assetPath(path: string): string {
  return `${BASE_PATH}${path}`;
}
