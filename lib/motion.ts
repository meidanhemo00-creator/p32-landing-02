// GSAP cannot resolve CSS custom properties in its `ease` option, so these
// mirror the tokens defined in app/globals.css (--ease-out, --ease-in-out,
// --ease-drawer) as literal values GSAP can consume. Keep both in sync.
export const EASE_OUT = "cubic-bezier(0.23, 1, 0.32, 1)";
export const EASE_IN_OUT = "cubic-bezier(0.77, 0, 0.175, 1)";
export const EASE_DRAWER = "cubic-bezier(0.32, 0.72, 0, 1)";
