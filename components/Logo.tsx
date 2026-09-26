import Image from "next/image";

// The official P32 lockup (wordmark + star), used unmodified wherever the
// brand name appears visually. No reversed/white version exists yet, so this
// black lockup is used only where the surrounding surface keeps it legible.
// Source aspect ratio: 1301 x 492.

const ASPECT_W = 1301;
const ASPECT_H = 492;

export function P32Logo({
  height = 28,
  className,
  priority = false,
}: {
  height?: number;
  className?: string;
  priority?: boolean;
}) {
  const width = Math.round((height * ASPECT_W) / ASPECT_H);
  return (
    <Image
      src="/brand/p32-lockup-black.png"
      alt="P32"
      width={width}
      height={height}
      priority={priority}
      className={className}
    />
  );
}

// No reversed/white lockup exists yet. On a dark section the black glyph is
// kept fully legible by resting it on a small white plate rather than by
// recoloring or redrawing the mark itself.
export function P32LogoOnDark({
  height = 28,
  priority = false,
}: {
  height?: number;
  priority?: boolean;
}) {
  return (
    <span
      className="inline-flex items-center bg-p32-white px-3 py-2"
      style={{ lineHeight: 0 }}
    >
      <P32Logo height={height} priority={priority} />
    </span>
  );
}
