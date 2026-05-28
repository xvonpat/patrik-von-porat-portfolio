import React from 'react';
import GlassCard from '@/components/GlassCard';

export default function Contact() {
  const groupedLinks = [
    {
      section: "Music & Streaming",
      links: [
        {
          name: "Spotify",
          url: "https://open.spotify.com/artist/1w5nRV4hbOrPFuYRYuvgnB?si=8IEsYIjORUi6ubXK_daH3g",
          subtext: "Stream my metal projects, from cinematic power metal to darker experimental sounds.",
          accent: "purple",
          iconPath: "M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.586 14.424c-.18.295-.565.387-.86.207-2.377-1.454-5.37-1.783-8.892-.983-.336.075-.67-.136-.75-.472-.075-.336.136-.67.472-.75 3.856-.882 7.15-.5 9.822 1.137.295.18.387.565.207.86zm1.224-2.723c-.226.367-.707.487-1.074.26-2.72-1.672-6.87-2.157-10.08-1.182-.413.125-.847-.107-.972-.52-.125-.413.107-.847.52-.972 3.67-1.114 8.243-.57 11.35 1.343.367.226.487.707.26 1.074zm.11-2.824C14.49 8.7 8.04 8.487 4.31 9.62c-.573.173-1.18-.154-1.354-.727-.173-.573.154-1.18.727-1.354 4.314-1.31 11.43-1.06 15.45 1.33.516.307.687.973.38 1.49-.307.515-.973.686-1.49.38z"
        },
        {
          name: "YouTube",
          url: "https://www.youtube.com/@creativeoverdrive",
          subtext: "Guitar videos, creative process, visual experiments and project updates.",
          accent: "orange",
          iconPath: "M23.498 6.163c-.272-1.022-1.074-1.826-2.099-2.099C19.544 3.5 12 3.5 12 3.5s-7.544 0-9.4.564C1.576 4.337.773 5.14.502 6.163 0 8.07 0 12 0 12s0 3.93.502 5.837c.271 1.022 1.074 1.826 2.099 2.099 1.856.564 9.4.564 9.4.564s7.544 0 9.4-.564c1.025-.273 1.827-1.077 2.099-2.099.502-1.907.502-5.837.502-5.837s0-3.93-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"
        },
        {
          name: "Bandcamp",
          url: "https://realmforged.bandcamp.com/",
          subtext: "Digital releases, independent music and selected project material.",
          accent: "cyan",
          iconPath: "M0 18.75h14.887L24 5.25H9.113L0 18.75z"
        }
      ]
    },
    {
      section: "Art & Behind the Scenes",
      links: [
        {
          name: "Instagram",
          url: "https://www.instagram.com/patrikvonporat/",
          subtext: "Sketches, tattoo practice, miniatures, AI visuals and studio fragments.",
          accent: "purple",
          iconPath: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"
        },
        {
          name: "Patreon",
          url: "https://www.patreon.com/c/realmforgedguild",
          subtext: "Behind-the-scenes posts, creative workflows, project notes and early ideas.",
          accent: "orange",
          iconPath: "M22.957 7.21c-.004-3.078-2.684-5.554-6.055-5.554-3.7 0-6.711 3.012-6.711 6.712 0 3.678 2.993 6.677 6.711 6.677 3.393 0 6.055-2.476 6.055-5.554v-2.28zM2.08 1.656H5.05v20.688H2.08V1.656z"
        }
      ]
    },
    {
      section: "Professional & Contact",
      links: [
        {
          name: "LinkedIn",
          url: "https://www.linkedin.com/in/patrikvonporat/",
          subtext: "Process improvement, Lean Six Sigma, operational thinking and professional work.",
          accent: "cyan",
          iconPath: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 23.271V1.729C24 .774 23.2 0 22.222 0z"
        },
        {
          name: "Email",
          url: "mailto:xvonpat@gmail.com",
          subtext: "For collaborations, music work, art inquiries or project-related questions.",
          accent: "purple",
          iconPath: "M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.428 5.268a2 2 0 01-2.144 0L1.5 8.67z M22.5 6.908V6.75a3 3 0 00-3-3H4.5a3 3 0 00-3 3v.158l9.714 6.072a1 1 0 001.072 0L22.5 6.908z"
        }
      ]
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-6 lg:px-8 py-16 md:py-24 flex flex-col gap-12 relative">
      
      {/* Page Header */}
      <div className="flex flex-col items-center text-center gap-4">
        <span className="text-xs font-mono tracking-[0.3em] text-accent-purple uppercase">Connect & Collaborate</span>
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-white font-gothic">Link Hub</h1>
        <div className="w-16 h-[2px] bg-accent-purple mt-2" />
        <p className="text-sm text-zinc-400 leading-6 mt-4 max-w-xl">
          Choose the path that fits the reason you're here — music, art, process work, or direct contact.
        </p>
      </div>

      {/* Links Hub Stack - Grouped */}
      <div className="flex flex-col gap-12 mt-6 relative z-10">
        {groupedLinks.map((group, gIdx) => (
          <div key={gIdx} className="flex flex-col gap-5">
            {/* Group Header */}
            <h3 className="text-[10px] font-mono uppercase tracking-[0.25em] text-zinc-500 pl-2">
              {group.section}
            </h3>
            
            {/* Links in Group */}
            <div className="flex flex-col gap-4">
              {group.links.map((link, lIdx) => {
                const isEmail = link.name === "Email";
                
                // Email gets a slightly more pronounced, but still elegant, base style
                const emailExtraClasses = isEmail 
                  ? "border-white/[0.08] bg-white/[0.02] shadow-[0_0_20px_rgba(139,92,246,0.05)]" 
                  : "";

                return (
                  <a 
                    key={lIdx} 
                    href={link.url}
                    target={isEmail ? "_self" : "_blank"}
                    rel={isEmail ? "" : "noopener noreferrer"}
                    className="group block w-full"
                  >
                    <GlassCard 
                      accent={link.accent} 
                      className={`p-5! md:p-6! flex items-center justify-between transition-all duration-500 ease-out hover:bg-white/[0.04] ${emailExtraClasses}`}
                    >
                      <div className="flex items-center gap-6">
                        {/* SVG Icon */}
                        <div className={`w-12 h-12 rounded-lg bg-obsidian-950 flex items-center justify-center border border-white/5 group-hover:border-accent-${link.accent}/40 group-hover:shadow-[0_0_12px_rgba(var(--accent-${link.accent}),0.2)] transition-all duration-500 ease-out`}>
                          <svg 
                            className={`w-6 h-6 text-zinc-400 group-hover:text-accent-${link.accent} group-hover:drop-shadow-[0_0_8px_currentColor] transition-all duration-500 ease-out`} 
                            fill="currentColor" 
                            viewBox="0 0 24 24"
                          >
                            <path d={link.iconPath} />
                          </svg>
                        </div>
                        
                        {/* Text details */}
                        <div className="flex flex-col items-start text-left">
                          <h2 className="text-lg font-semibold text-white tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-zinc-300 transition-colors duration-500 ease-out font-gothic">
                            {link.name}
                          </h2>
                          <p className="text-xs text-zinc-500 mt-1 uppercase tracking-wider font-light group-hover:text-zinc-400 transition-colors duration-500 ease-out">
                            {link.subtext}
                          </p>
                        </div>
                      </div>

                      {/* Arrow right indicator */}
                      <div className="text-zinc-500 group-hover:text-accent-purple transition-colors duration-500 ease-out">
                        <svg className="w-5 h-5 transform group-hover:translate-x-1.5 transition-transform duration-500 ease-out" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </GlassCard>
                  </a>
                );
              })}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
