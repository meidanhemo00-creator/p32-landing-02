import type { Metadata } from "next";
import { Instrument_Sans, JetBrains_Mono } from "next/font/google";
import { assetPath } from "@/lib/basePath";
import "./globals.css";

// Primary face: Instrument Sans -- body copy, interactive elements, names,
// and the large statements (it replaces both Inter and the former Archivo
// display substitute, so the site runs on exactly two families). Loaded as a
// variable font through next/font: self-hosted, preloaded, and paired with
// an automatically metric-matched fallback so the swap causes no layout
// shift.
const instrumentSans = Instrument_Sans({
  variable: "--font-instrument",
  subsets: ["latin"],
  display: "swap",
});

// Technical voice: section titles, indexes, numbers, metadata, small nav.
const jbMono = JetBrains_Mono({
  variable: "--font-jbmono",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = "https://p32.ltd";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "P32",
  description:
    "P32: Defense Solution Architects. An objective, trusted executor operating without conflict of interest across the full defense technology lifecycle.",
  icons: {
    icon: assetPath("/icon.png"),
    apple: assetPath("/apple-icon.png"),
  },
  openGraph: {
    title: "P32",
    description:
      "P32: Defense Solution Architects. An objective, trusted executor operating without conflict of interest across the full defense technology lifecycle.",
    url: siteUrl,
    siteName: "P32",
    images: [{ url: "/og/p32-og.png", width: 1200, height: 630, alt: "P32" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "P32",
    description:
      "P32: Defense Solution Architects. An objective, trusted executor operating without conflict of interest across the full defense technology lifecycle.",
    images: ["/og/p32-og.png"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${instrumentSans.variable} ${jbMono.variable}`}
      suppressHydrationWarning
    >
      <body>
        {/* Synchronous, before-paint: adds `js-reveal` to <html> unless the
            visitor prefers reduced motion. CSS in globals.css only hides
            [data-reveal] elements when this class is present, so content
            stays fully visible if JS fails to load or run, and reduced-
            motion visitors never see anything wait to appear. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches){document.documentElement.classList.add('js-reveal')}}catch(e){}",
          }}
        />
        {children}
      </body>
    </html>
  );
}
