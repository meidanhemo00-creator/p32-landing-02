import Image from "next/image";
import { assetPath } from "@/lib/basePath";

// Real NASA photography (see ASSET_CREDITS.md): true grayscale plus a
// directional darkening gradient for text legibility only. No color tint --
// the client's explicit direction is that photographs stay strictly
// black-and-white, with the pale signal blue reserved for UI accents
// (numbers, lines, focus states), never applied to imagery.
export function NasaPhoto({
  src,
  alt,
  objectPosition = "center",
  priority = false,
  gradient = "180deg, rgba(0,0,0,0.15), rgba(2,8,10,0.6)",
  contrast = 1.15,
  sizes = "100vw",
  reveal = false,
}: {
  src: string;
  alt: string;
  objectPosition?: string;
  priority?: boolean;
  gradient?: string;
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
    </div>
  );
}
