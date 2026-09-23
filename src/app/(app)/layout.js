import { Unbounded, Manrope, DM_Mono } from "next/font/google";
import "../globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GlowEffect from "@/components/GlowEffect";
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import Script from 'next/script';

const unbounded = Unbounded({
  variable: "--font-unbounded",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const dmMono = DM_Mono({
  variable: "--font-dm-mono",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

export const metadata = {
  metadataBase: new URL('https://vonporat.com'),
  title: "Patrik von Porat | Creative Hub",
  description: "A creative hub for music, visual art, AI experiments, and process improvement.",
  alternates: {
    canonical: '/',
  },
  verification: {
    google: 'LpX34lV-qH05p85GS5PZIDg6gvKQyvjm3UaBwsF-hDc',
  },
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
      className={`${unbounded.variable} ${manrope.variable} ${dmMono.variable} h-full antialiased`}
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
        <main className="flex-grow relative">
          {children}
        </main>
        
        {/* Shared Footer */}
        <Footer />
        <Analytics />
        <SpeedInsights />
        
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-GKF3NL1Y43"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-GKF3NL1Y43');
          `}
        </Script>
      </body>
    </html>
  );
}
