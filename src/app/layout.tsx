import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BackToTop from "@/components/ui/BackToTop";
import CommandPalette from "@/components/ui/CommandPalette";
import ThemeProvider from "@/components/providers/ThemeProvider";

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
    default: "Sahan Nimnaka | Software Engineer Portfolio",
    template: "%s | Sahan Nimnaka",
  },
  description:
    "Software Engineer portfolio showcasing projects, skills, and experience in web, mobile, and software development.",
  metadataBase: new URL("https://sahannimnaka.dev"),
  openGraph: {
    title: "Sahan Nimnaka | Software Engineer Portfolio",
    description:
      "Software Engineer portfolio showcasing projects, skills, and experience in web, mobile, and software development.",
    type: "website",
    locale: "en_US",
    url: "https://sahannimnaka.dev",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sahan Nimnaka | Software Engineer Portfolio",
    description:
      "Software Engineer portfolio showcasing projects, skills, and experience in web, mobile, and software development.",
  },
  robots: {
    index: true,
    follow: true,
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
          <BackToTop />
          <CommandPalette />
        </ThemeProvider>
      </body>
    </html>
  );
}
