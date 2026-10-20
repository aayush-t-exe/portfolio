import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { RevealObserver } from "@/components/reveal-observer";
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
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    url: "/",
    siteName: site.name,
    title: site.title,
    description: site.description,
    locale: "en_IN",
    firstName: "Aayush",
    lastName: "Thakur",
    username: site.githubHandle,
  },
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
 * Runs before first paint: applies a saved theme (otherwise CSS follows the OS) and
 * flags that JS is available so scroll-reveal styles can arm themselves.
 */
const prePaint = `(function(){var d=document.documentElement;d.classList.add('js');try{var t=localStorage.getItem('theme');if(t==='light'||t==='dark')d.dataset.theme=t}catch(e){}})()`;

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
      <body className="min-h-dvh bg-bg text-fg">
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
        <RevealObserver />
      </body>
    </html>
  );
}
