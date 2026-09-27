import type { Metadata } from "next";
import { Inter, Archivo, JetBrains_Mono } from "next/font/google";
import { assetPath } from "@/lib/basePath";
import "./globals.css";

// Body copy: Inter, as specified in the approved brief.
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

// Display face: Key Grotesk was specified but no licensed files were supplied.
// Archivo is used as the documented substitute — a grotesk with the same
// controlled, technical character (tight apertures, engineered proportions,
// a true black weight for maximum statements). See DESIGN.md.
const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  display: "swap",
});

// Technical metadata only: step indices, coordinates, system labels.
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
      className={`${inter.variable} ${archivo.variable} ${jbMono.variable}`}
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
