import { Cinzel, Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GlowEffect from "@/components/GlowEffect";

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata = {
  title: "Patrik von Porat | Creative Hub",
  description: "Guitarist, Artist, Creator, and Process Improvement Nerd. A gothic-inspired dark portfolio showcasing music projects, visual art, AI tools, and process optimization work.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${cinzel.variable} ${outfit.variable} h-full antialiased`}
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
