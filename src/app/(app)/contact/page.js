import React from 'react';
import ContactLinks from '@/components/ContactLinks';

export const metadata = {
  title: "Contact | Patrik von Porat",
  description: "Start a conversation with Patrik von Porat. Inquiries for creative collaborations, music, visual art, or systems and process work.",
  alternates: {
    canonical: '/contact',
  },
  openGraph: {
    title: "Contact | Patrik von Porat",
    description: "Start a conversation with Patrik von Porat. Inquiries for creative collaborations, music, visual art, or systems and process work.",
    url: 'https://vonporat.com/contact',
  }
};

export default function Contact() {
  return (
    <div className="max-w-4xl mx-auto px-5 sm:px-6 lg:px-8 py-10 sm:py-14 md:py-16 flex flex-col gap-8 md:gap-10 relative items-center text-center justify-center min-h-[60vh] z-10">
      
      {/* 1. Page Header */}
      <div className="flex flex-col items-center text-center gap-2.5 sm:gap-3 max-w-2xl w-full">
        <span className="text-xs md:text-sm font-mono tracking-[0.3em] text-accent-purple uppercase font-semibold">
          CONTACT
        </span>
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-white font-gothic leading-tight text-balance">
          Start a conversation.
        </h1>
        <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-accent-purple to-transparent mt-1 mb-1" />
        <p className="text-base md:text-[17px] lg:text-lg leading-relaxed md:leading-8 text-zinc-300 font-light max-w-2xl text-balance text-pretty">
          If the work here connects with you—through music, visual practice, digital systems or process—email is the best place to start. You can also follow the projects and ongoing work through the channels below.
        </p>
      </div>

      {/* 2. Primary Email CTA & External Elsewhere Destinations */}
      <ContactLinks />

    </div>
  );
}
