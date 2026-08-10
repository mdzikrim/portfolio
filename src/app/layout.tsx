import type { Metadata } from "next";
import { JetBrains_Mono, Plus_Jakarta_Sans } from "next/font/google";
import { profile } from "@content/profile";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://example.vercel.app"), // TODO: replace after deploying
  title: {
    default: `${profile.name} — ${profile.role}`,
    template: `%s — ${profile.shortName}`,
  },
  description: profile.tagline,
  openGraph: {
    title: `${profile.name} — ${profile.role}`,
    description: profile.tagline,
    type: "website",
  },
};

/**
 * Applies the saved theme before first paint so the page never flashes light
 * then snaps to dark. Kept inline and tiny on purpose.
 */
const themeScript = `
(function () {
  try {
    var saved = localStorage.getItem("theme");
    var prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    document.documentElement.dataset.theme = saved || (prefersDark ? "dark" : "light");
  } catch (e) {
    document.documentElement.dataset.theme = "dark";
  }
})();
`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className={`${jakarta.variable} ${jetbrains.variable} font-sans antialiased`}>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:text-accent-ink"
        >
          Skip to content
        </a>
        <Nav />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
