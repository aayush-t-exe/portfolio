import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Header } from "@/components/site/header";
import { SiteFooter } from "@/components/site/footer";
import { MotionGate } from "@/components/site/motion-gate";
import { SiteBehavior } from "@/components/site/site-behavior";
import { openGraph } from "@/lib/metadata";
import { site } from "@/lib/site";
import "./globals.css";

/*
 * Self-hosted, subset fonts (src/assets/fonts/web): only the characters this site uses.
 * Archivo (display) is variable in weight (600–900) and width (75–125%), 33 kB; Geist (body) and
 * Geist Mono (labels, counters) are variable in weight. Archivo and Geist are preloaded.
 */
const archivo = localFont({
  src: "../assets/fonts/web/archivo.woff2",
  weight: "600 900",
  variable: "--font-archivo",
  display: "swap",
  declarations: [{ prop: "font-stretch", value: "75% 125%" }],
  adjustFontFallback: "Arial",
});
const geist = localFont({
  src: "../assets/fonts/web/geist.woff2",
  weight: "100 900",
  variable: "--font-geist",
  display: "swap",
  adjustFontFallback: "Arial",
});
// Not preloaded: mono only sets small labels and numbers, which swap in harmlessly.
const geistMono = localFont({
  src: "../assets/fonts/web/geist-mono.woff2",
  weight: "100 900",
  variable: "--font-geist-mono",
  display: "swap",
  preload: false,
  adjustFontFallback: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.title, template: `%s · ${site.name}` },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  keywords: [
    "Aayush Thakur",
    "Zen-Z",
    "founder",
    "full-stack developer",
    "mobile developer",
    "React Native developer",
    "Next.js developer",
    "Supabase",
    "PrelimsDaily",
    "internship",
    "Jaipur",
    "India",
  ],
  // canonical and og:url are set on each page, so the 404 doesn't inherit them.
  openGraph,
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  formatDetection: { telephone: false, email: false, address: false },
  category: "technology",
};

export const viewport: Viewport = {
  themeColor: "#0a0908",
  colorScheme: "dark",
};

/**
 * Runs before first paint. Marks that JS runs (`js`). On the home page, the first time in a
 * session, on wide screens and only when motion is allowed, it sets `intro`: CSS then plays the ≤1.5 s intro over
 * the already-painted hero. Any key, click, wheel or touch skips it.
 */
const prePaint = `(function(){var d=document.documentElement;d.classList.add('js');try{if(location.pathname==='/'&&matchMedia('(min-width: 768px) and (prefers-reduced-motion: no-preference)').matches&&!sessionStorage.getItem('intro-seen')){sessionStorage.setItem('intro-seen','1');d.classList.add('intro');var ev=['keydown','pointerdown','wheel','touchstart'],off=function(){ev.forEach(function(e){removeEventListener(e,skip,true)})},skip=function(){d.classList.remove('intro');off()};ev.forEach(function(e){addEventListener(e,skip,{capture:true,passive:true})});setTimeout(off,1800);setTimeout(function(){d.classList.remove('intro')},3500)}}catch(e){}})()`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      dir="ltr"
      suppressHydrationWarning
      className={`${archivo.variable} ${geist.variable} ${geistMono.variable} antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: prePaint }} />
      </head>
      <body id="top" className="min-h-dvh bg-ink text-fg">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[300] focus:rounded-full focus:bg-fg focus:px-4 focus:py-2 focus:text-ink"
        >
          Skip to content
        </a>
        <div className="progress" aria-hidden />
        <Header />
        <main id="main" tabIndex={-1} className="outline-none">
          {children}
        </main>
        <SiteFooter />
        <div className="grain" aria-hidden />
        <SiteBehavior />
        <MotionGate />
      </body>
    </html>
  );
}
