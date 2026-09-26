import Image from "next/image";

// The official P32 lockup (wordmark + star), used unmodified wherever the
// brand name appears visually. Two confirmed source files exist: the black
// lockup for light surfaces, and the official reversed/white lockup for dark
// surfaces. Neither is recolored or redrawn; each is used as supplied.
// Source aspect ratio: 1301 x 492 (black) / 1301 x 493 (white).

const ASPECT_W = 1301;
const ASPECT_H = 492;

function P32LogoBase({
  src,
  height,
  className,
  priority,
}: {
  src: string;
  height: number;
  className?: string;
  priority: boolean;
}) {
  const width = Math.round((height * ASPECT_W) / ASPECT_H);
  return (
    <Image
      src={src}
      alt="P32"
      width={width}
      height={height}
      priority={priority}
      className={className}
    />
  );
}

export function P32Logo({
  height = 28,
  className,
  priority = false,
}: {
  height?: number;
  className?: string;
  priority?: boolean;
}) {
  return (
    <P32LogoBase
      src="/brand/p32-lockup-black.png"
      height={height}
      className={className}
      priority={priority}
    />
  );
}

// The official reversed/white lockup, for use on dark sections.
export function P32LogoOnDark({
  height = 28,
  className,
  priority = false,
}: {
  height?: number;
  className?: string;
  priority?: boolean;
}) {
  return (
    <P32LogoBase
      src="/brand/p32-lockup-white.png"
      height={height}
      className={className}
      priority={priority}
    />
  );
}
