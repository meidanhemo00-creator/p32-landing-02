import Image from "next/image";
import { assetPath } from "@/lib/basePath";

// Real NASA photography (see ASSET_CREDITS.md), treated as one cohesive
// duotone system rather than shown in raw stock color: grayscale base,
// a directional darkening gradient for text legibility, and a low-opacity
// pale-blue color tint (mix-blend-mode: color) -- the same restrained
// signal blue used everywhere else on the page, applied to a photograph
// instead of invented as a gradient.
export function NasaPhoto({
  src,
  alt,
  objectPosition = "center",
  priority = false,
  gradient = "180deg, rgba(0,0,0,0.15), rgba(2,8,10,0.6)",
  tint = true,
  contrast = 1.15,
  sizes = "100vw",
  reveal = false,
}: {
  src: string;
  alt: string;
  objectPosition?: string;
  priority?: boolean;
  gradient?: string;
  tint?: boolean;
  contrast?: number;
  sizes?: string;
  reveal?: boolean;
}) {
  return (
    <div className="absolute inset-0 overflow-hidden" data-reveal={reveal ? "image" : undefined}>
      <Image
        src={assetPath(src)}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        style={{
          objectFit: "cover",
          objectPosition,
          filter: `grayscale(1) contrast(${contrast}) brightness(0.85)`,
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{ background: `linear-gradient(${gradient})` }}
      />
      {tint && (
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{ backgroundColor: "#9dd2e2", mixBlendMode: "color", opacity: 0.18 }}
        />
      )}
    </div>
  );
}
