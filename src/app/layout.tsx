import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Motion } from "@/components/motion";
import { openGraph } from "@/lib/metadata";
import { site } from "@/lib/site";
import "./globals.css";

/*
 * Self-hosted, subset fonts (src/assets/fonts/web): only the characters this site uses
 * (Latin, Latin-1, punctuation, ₹ and arrows). Geist and Geist Mono are variable, so one
 * file each covers every weight. Three preloaded files, ~60 kB total, versus four files and
 * ~86 kB with the Google Fonts subsets (one of them discovered late, which delayed paint).
 */
const geist = localFont({
  src: "../assets/fonts/web/geist.woff2",
  weight: "100 900",
  variable: "--font-geist",
  display: "swap",
  adjustFontFallback: "Arial",
});
const geistMono = localFont({
  src: "../assets/fonts/web/geist-mono.woff2",
  weight: "100 900",
  variable: "--font-geist-mono",
  display: "swap",
  adjustFontFallback: false,
});
// The serif is only ever used in italic for accent words.
const instrument = localFont({
  src: "../assets/fonts/web/instrument-serif-italic.woff2",
  weight: "400",
  style: "italic",
  variable: "--font-instrument",
  display: "swap",
  adjustFontFallback: "Times New Roman",
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
    "founder-engineer",
    "full-stack developer",
    "React Native developer",
    "Next.js developer",
    "Supabase",
    "Zen-Z",
    "PrelimsDaily",
    "AI-native developer",
    "Claude Code",
    "Jaipur",
    "India",
  ],
  // canonical and og:url are set on the home page itself, so the 404 doesn't inherit them.
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
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f4f2ed" },
    { media: "(prefers-color-scheme: dark)", color: "#0e0e0c" },
  ],
  colorScheme: "light dark",
};

/**
 * Runs before first paint: applies a saved theme (otherwise CSS follows the OS), marks
 * that JS runs (`js`, used by the theme toggle and never removed) and arms the scroll
 * reveal (`reveal-armed`). Failsafe: if the app bundle hasn't started the reveal observer
 * within 4s (blocked, failed, ancient browser), disarm the reveal so no content stays
 * hidden. The failsafe only ever touches `reveal-armed`. A URL hash renders every section up
 * front (`cv-off`) so the initial anchor scroll lands where it should.
 */
const prePaint = `(function(){var d=document.documentElement;d.classList.add('js','reveal-armed');if(location.hash)d.classList.add('cv-off');try{var t=localStorage.getItem('theme');if(t==='light'||t==='dark')d.dataset.theme=t}catch(e){}setTimeout(function(){if(!d.hasAttribute('data-reveal-ready'))d.classList.remove('reveal-armed')},4000)})()`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      dir="ltr"
      suppressHydrationWarning
      className={`${geist.variable} ${geistMono.variable} ${instrument.variable} antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: prePaint }} />
      </head>
      <body id="top" className="min-h-dvh bg-bg text-fg">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-full focus:bg-fg focus:px-4 focus:py-2 focus:text-bg"
        >
          Skip to content
        </a>
        <Header />
        <main id="main" tabIndex={-1} className="outline-none">
          {children}
        </main>
        <Footer />
        <Motion />
      </body>
    </html>
  );
}
