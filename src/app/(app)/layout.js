import { Cormorant_Garamond, Outfit } from "next/font/google";
import "../globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GlowEffect from "@/components/GlowEffect";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata = {
  metadataBase: new URL('https://vonporat.com'),
  title: "Patrik von Porat | Creative Hub",
  description: "A creative hub for music, visual art, AI experiments, and process improvement.",
  openGraph: {
    title: "Patrik von Porat | Creative Hub",
    description: "A creative hub for music, visual art, AI experiments, and process improvement.",
    url: 'https://vonporat.com',
    siteName: 'Patrik von Porat',
    images: [
      {
        url: '/images/PvP2.png',
        width: 1200,
        height: 630,
        alt: 'Patrik von Porat - Creative Hub',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Patrik von Porat | Creative Hub",
    description: "A creative hub for music, visual art, AI experiments, and process improvement.",
    images: ['/images/PvP2.png'],
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${outfit.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-obsidian-950 font-sans text-zinc-200">
        {/* Background ambient animations */}
        <GlowEffect />
        
        {/* Shared Navbar */}
        <Navbar />
        
        {/* Main interactive content */}
        <main className="flex-grow relative z-10">
          {children}
        </main>
        
        {/* Shared Footer */}
        <Footer />
      </body>
    </html>
  );
}
