import type { CSSProperties, ReactNode } from "react";

// Splits text into per-word spans for the `.word-reveal` stagger animation
// (see app/globals.css) -- word-level movement, not letter-level (which
// stays off-limits everywhere on this site). Real space characters sit
// between the spans as separate text nodes, not inside them, so normal
// line-wrapping and `text-wrap: balance` still work exactly as before.
export function splitWords(text: string, startIndex = 0): ReactNode[] {
  const words = text.split(" ").filter(Boolean);
  const nodes: ReactNode[] = [];
  words.forEach((word, i) => {
    if (i > 0) nodes.push(" ");
    nodes.push(
      <span
        key={i}
        className="word-reveal"
        style={{ "--word-index": startIndex + i } as CSSProperties}
      >
        {word}
      </span>
    );
  });
  return nodes;
}
