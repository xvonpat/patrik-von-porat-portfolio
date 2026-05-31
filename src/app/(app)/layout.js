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
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Patrik von Porat",
    "url": "https://vonporat.com",
    "image": "https://vonporat.com/images/PvP2.png",
    "sameAs": [
      "https://open.spotify.com/artist/1w5nRV4hbOrPFuYRYuvgnB?si=8IEsYIjORUi6ubXK_daH3g",
      "https://www.youtube.com/@creativeoverdrive",
      "https://realmforged.bandcamp.com/",
      "https://www.instagram.com/patrikvonporat/",
      "https://www.patreon.com/c/realmforgedguild",
      "https://www.linkedin.com/in/patrikvonporat/"
    ],
    "jobTitle": "Lead Guitarist, Visual Artist & Process Engineer",
    "knowsAbout": [
      "Symphonic Power Metal",
      "Guitar Orchestration",
      "Graphite Drawing",
      "Generative AI",
      "Lean Six Sigma",
      "DMAIC Workflow Optimization"
    ]
  };

  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${outfit.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
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
