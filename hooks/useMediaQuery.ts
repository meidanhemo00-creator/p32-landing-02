"use client";

import { useSyncExternalStore } from "react";

// External-system subscription (a MediaQueryList), so this uses
// useSyncExternalStore rather than an effect + setState.
export function useMediaQuery(query: string, serverSnapshot = false): boolean {
  return useSyncExternalStore(
    (callback) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", callback);
      return () => mql.removeEventListener("change", callback);
    },
    () => window.matchMedia(query).matches,
    () => serverSnapshot
  );
}
