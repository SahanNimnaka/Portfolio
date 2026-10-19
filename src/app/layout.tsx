import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BackToTop from "@/components/ui/BackToTop";
import CommandPalette from "@/components/ui/CommandPalette";
import ThemeProvider from "@/components/providers/ThemeProvider";
import { siteName, siteUrl } from "@/lib/site";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Sahan Nimnaka | Software Developer Portfolio",
    template: "%s | Sahan Nimnaka",
  },
  description:
    "Portfolio of Sahan Nimnaka Pinnagaspitiya, a Computer Science undergraduate at APIIT building web, mobile, and backend projects.",
  applicationName: siteName,
  authors: [{ name: "Sahan Nimnaka Pinnagaspitiya" }],
  creator: "Sahan Nimnaka Pinnagaspitiya",
  publisher: "Sahan Nimnaka Pinnagaspitiya",
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: "Sahan Nimnaka | Software Developer Portfolio",
    description:
      "Portfolio of Sahan Nimnaka Pinnagaspitiya, a Computer Science undergraduate at APIIT building web, mobile, and backend projects.",
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName,
  },
  twitter: {
    card: "summary_large_image",
    title: "Sahan Nimnaka | Software Developer Portfolio",
    description:
      "Portfolio of Sahan Nimnaka Pinnagaspitiya, a Computer Science undergraduate at APIIT building web, mobile, and backend projects.",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#020617" },
    { media: "(prefers-color-scheme: light)", color: "#f8fafc" },
  ],
};

const themeInitScript = `(function(){try{var s=localStorage.getItem("theme");var d=s==="dark"||(s!=="light"&&window.matchMedia("(prefers-color-scheme: dark)").matches);var c=document.documentElement.classList;d?c.add("dark"):c.remove("dark");document.documentElement.style.colorScheme=d?"dark":"light";}catch(e){document.documentElement.classList.add("dark");document.documentElement.style.colorScheme="dark";}})();`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable}`}
      >
        <ThemeProvider>
          <a href="#main" className="skip-link">
            Skip to content
          </a>
          <Navbar />
          {children}
          <Footer />
          {/* Netlify Forms registration — server-rendered into every page's
              static HTML so the build can detect it. Field names must stay in
              sync with the contact form in src/sections/Contact.tsx. */}
          <form
            name="contact"
            method="POST"
            action="/"
            data-netlify="true"
            data-netlify-honeypot="bot-field"
            hidden
          >
            <input type="hidden" name="form-name" value="contact" />
            <input type="text" name="name" />
            <input type="email" name="email" />
            <textarea name="message" />
            <input type="text" name="bot-field" />
          </form>
          <BackToTop />
          <CommandPalette />
        </ThemeProvider>
      </body>
    </html>
  );
}
