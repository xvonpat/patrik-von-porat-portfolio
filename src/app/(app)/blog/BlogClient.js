'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import GlassCard from '@/components/GlassCard';

const getMediaUrl = (url) => {
  if (!url || typeof url !== 'string') return null;
  
  if (url.startsWith('/api/media/file/')) {
    const filename = url.replace('/api/media/file/', '');
    return `https://mjsaegfqipbrnapyleop.supabase.co/storage/v1/object/public/payload-media/${filename}`;
  }

  if (url.includes('storage.supabase.co/storage/v1/s3')) {
    return url.replace('storage.supabase.co/storage/v1/s3', 'supabase.co/storage/v1/object/public');
  }

  if (url.startsWith('http') || url.startsWith('//')) {
    return url.startsWith('//') ? `https:${url}` : url;
  }
  
  const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || '';
  const cleanServerUrl = serverUrl.endsWith('/') ? serverUrl.slice(0, -1) : serverUrl;
  const cleanUrl = url.startsWith('/') ? url : `/${url}`;
  
  return `${cleanServerUrl}${cleanUrl}`;
};

function getLexicalText(node) {
  if (!node) return '';
  if (Array.isArray(node)) {
    return node.map(getLexicalText).join(' ');
  }
  if (node.type === 'text') {
    return node.text || '';
  }
  if (node.children) {
    return getLexicalText(node.children);
  }
  return '';
}

function getReadingTime(content) {
  const text = getLexicalText(content?.root);
  const wordCount = text.split(/\s+/).filter(Boolean).length;
  return Math.ceil(wordCount / 200) || 1;
}

export default function BlogClient({ posts = [] }) {
  const [activeFilter, setActiveFilter] = useState('All');

  const filters = ['All', 'Music', 'Visual Art', 'Making', 'Technology', 'Process', 'Personal'];

  const categoryMap = {
    'music': { label: 'Music', accent: 'purple', textClass: 'text-accent-purple', bgClass: 'bg-accent-purple/10 border-accent-purple/20' },
    'visual-art': { label: 'Visual Art', accent: 'purple', textClass: 'text-accent-purple', bgClass: 'bg-accent-purple/10 border-accent-purple/20' },
    'art': { label: 'Visual Art', accent: 'purple', textClass: 'text-accent-purple', bgClass: 'bg-accent-purple/10 border-accent-purple/20' },
    'making': { label: 'Making', accent: 'purple', textClass: 'text-accent-purple', bgClass: 'bg-accent-purple/10 border-accent-purple/20' },
    'technology': { label: 'Technology', accent: 'cyan', textClass: 'text-accent-cyan', bgClass: 'bg-accent-cyan/10 border-accent-cyan/20' },
    'ai': { label: 'Technology', accent: 'cyan', textClass: 'text-accent-cyan', bgClass: 'bg-accent-cyan/10 border-accent-cyan/20' },
    'website-build-log': { label: 'Technology', accent: 'cyan', textClass: 'text-accent-cyan', bgClass: 'bg-accent-cyan/10 border-accent-cyan/20' },
    'process': { label: 'Process', accent: 'cyan', textClass: 'text-accent-cyan', bgClass: 'bg-accent-cyan/10 border-accent-cyan/20' },
    'process-improvement': { label: 'Process', accent: 'cyan', textClass: 'text-accent-cyan', bgClass: 'bg-accent-cyan/10 border-accent-cyan/20' },
    'personal': { label: 'Personal', accent: 'purple', textClass: 'text-accent-purple', bgClass: 'bg-accent-purple/10 border-accent-purple/20' },
    'behind-the-scenes': { label: 'Personal', accent: 'purple', textClass: 'text-accent-purple', bgClass: 'bg-accent-purple/10 border-accent-purple/20' },
  };

  const getCategoryInfo = (category) => categoryMap[category] || { 
    label: category || 'General', 
    accent: 'purple', 
    textClass: 'text-accent-purple', 
    bgClass: 'bg-accent-purple/10 border-accent-purple/20' 
  };

  // Filter posts based on active category
  const filteredPosts = posts.filter(post => {
    if (activeFilter === 'All') return true;
    const info = getCategoryInfo(post.category);
    return info.label === activeFilter;
  });

  // When All is active, the first post is the Latest Note lead entry, and the rest are archive grid posts.
  // When a specific category is selected, all matching posts are displayed in the archive grid.
  const isAllActive = activeFilter === 'All';
  const leadPost = isAllActive ? filteredPosts[0] : null;
  const archivePosts = isAllActive ? filteredPosts.slice(1) : filteredPosts;

  const sectionHeading = isAllActive ? 'Latest notes.' : `${activeFilter} notes.`;

  return (
    <div className="flex flex-col gap-10 md:gap-14 w-full">
      
      {/* 1. Category Navigation Filter */}
      <div className="w-full border-y border-white/5 py-3">
        <div 
          role="region"
          aria-label="Filter blog notes by category"
          className="flex items-center gap-2 sm:gap-3 overflow-x-auto scrollbar-none py-1 px-1 max-w-full justify-start sm:justify-center"
        >
          {filters.map((filter) => {
            const isActive = activeFilter === filter;
            const isCyan = filter === 'Technology' || filter === 'Process';
            const activeColorClass = isCyan
              ? 'text-accent-cyan border-accent-cyan/40 bg-accent-cyan/10 shadow-[0_0_15px_rgba(6,182,212,0.12)]'
              : 'text-accent-purple border-accent-purple/40 bg-accent-purple/10 shadow-[0_0_15px_rgba(139,92,246,0.12)]';

            return (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveFilter(filter)}
                aria-pressed={isActive}
                className={`text-xs font-mono tracking-wider uppercase px-3.5 py-1.5 rounded-full border transition-all duration-300 whitespace-nowrap focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent-purple/50 ${
                  isActive 
                    ? `${activeColorClass} font-semibold` 
                    : 'text-zinc-400 hover:text-zinc-200 border-transparent hover:border-white/10 hover:bg-white/[0.03]'
                }`}
              >
                {filter}
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Empty State */}
      {filteredPosts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <GlassCard accent="purple" className="max-w-md w-full p-8 flex flex-col items-center text-center gap-4">
            <span className="text-[10px] font-mono tracking-[0.25em] text-accent-purple uppercase font-semibold">
              EMPTY CATEGORY
            </span>
            <h3 className="text-2xl sm:text-3xl font-semibold text-white font-gothic">
              No notes here yet.
            </h3>
            <p className="text-sm text-zinc-300 font-light leading-relaxed">
              This part of the journal is still taking shape.
            </p>
            <button
              type="button"
              onClick={() => setActiveFilter('All')}
              className="mt-2 px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/15 text-white font-mono text-xs uppercase tracking-wider font-semibold border border-white/20 hover:border-accent-purple/40 transition-premium"
            >
              View All Notes
            </button>
          </GlassCard>
        </div>
      ) : (
        <div className="flex flex-col gap-12 md:gap-16">
          
          {/* 3. LATEST NOTE (Shown when 'All' is selected) */}
          {leadPost && (() => {
            const dateStr = leadPost.publishedDate 
              ? new Date(leadPost.publishedDate).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })
              : 'Draft';
            
            const catInfo = getCategoryInfo(leadPost.category);
            const readingTime = getReadingTime(leadPost.content);
            const rawImgUrl = typeof leadPost.featuredImage === 'object' ? leadPost.featuredImage?.url : null;
            const imgUrl = getMediaUrl(rawImgUrl);
            const imgAlt = leadPost.featuredImage?.alt || leadPost.title;

            return (
              <div className="w-full relative group">
                <GlassCard accent={catInfo.accent} className="overflow-hidden p-6 md:p-8">
                  
                  {/* If lead post has a featured image, render balanced 2-column layout */}
                  {imgUrl ? (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 lg:gap-10 items-center">
                      
                      {/* Image Column (5 cols) */}
                      <div className="lg:col-span-5 relative w-full aspect-[16/10] rounded-xl overflow-hidden border border-white/[0.08] bg-obsidian-900/60 shadow-2xl">
                        <Image 
                          src={imgUrl} 
                          alt={imgAlt} 
                          fill
                          priority
                          sizes="(max-width: 768px) 100vw, 42vw"
                          className="w-full h-full object-cover object-center grayscale group-hover:grayscale-0 transition-all duration-700 ease-out scale-100 group-hover:scale-[1.02]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950/60 via-transparent to-transparent opacity-65 pointer-events-none" />
                      </div>

                      {/* Content Column (7 cols) */}
                      <div className="lg:col-span-7 flex flex-col justify-center">
                        <div className="flex flex-wrap items-center gap-2.5 mb-3 font-mono text-[11px]">
                          <span className="text-[10px] md:text-[11px] font-mono tracking-widest px-2.5 py-0.5 rounded bg-accent-purple/15 border border-accent-purple/30 text-accent-purple uppercase font-semibold">
                            LATEST NOTE
                          </span>
                          <span className="text-zinc-700 select-none">&middot;</span>
                          <span className={`px-2 py-0.5 rounded border uppercase font-semibold ${catInfo.textClass} ${catInfo.bgClass}`}>
                            {catInfo.label}
                          </span>
                          <span className="text-zinc-700 select-none">&middot;</span>
                          <span className="text-zinc-400 uppercase font-medium">
                            {dateStr}
                          </span>
                          <span className="text-zinc-700 select-none">&middot;</span>
                          <span className="text-zinc-400 uppercase font-medium">
                            {readingTime} min read
                          </span>
                        </div>

                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-white group-hover:text-accent-purple transition-colors mb-3.5 font-gothic leading-tight text-balance">
                          <Link href={`/blog/${leadPost.slug}`} className="hover:underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent-purple">
                            {leadPost.title}
                          </Link>
                        </h2>

                        <p className="text-zinc-300 font-light leading-relaxed md:leading-8 text-base md:text-lg mb-6 line-clamp-3 text-pretty">
                          {leadPost.excerpt}
                        </p>

                        <div className="pt-4 border-t border-white/5">
                          <Link 
                            href={`/blog/${leadPost.slug}`} 
                            className="text-xs md:text-sm font-mono tracking-wider uppercase text-zinc-100 hover:text-accent-purple transition-colors inline-flex items-center gap-2 font-semibold group/link"
                          >
                            <span>Read Note</span>
                            <span className="transform group-hover/link:translate-x-1 transition-transform inline-block">&rarr;</span>
                          </Link>
                        </div>
                      </div>

                    </div>
                  ) : (
                    /* If lead post has NO featured image, render intentional text-led full-width layout */
                    <div className="flex flex-col gap-4 max-w-4xl">
                      <div className="flex flex-wrap items-center gap-2.5 font-mono text-[11px]">
                        <span className="text-[10px] md:text-[11px] font-mono tracking-widest px-2.5 py-0.5 rounded bg-accent-purple/15 border border-accent-purple/30 text-accent-purple uppercase font-semibold">
                          LATEST NOTE
                        </span>
                        <span className="text-zinc-700 select-none">&middot;</span>
                        <span className={`px-2 py-0.5 rounded border uppercase font-semibold ${catInfo.textClass} ${catInfo.bgClass}`}>
                          {catInfo.label}
                        </span>
                        <span className="text-zinc-700 select-none">&middot;</span>
                        <span className="text-zinc-400 uppercase font-medium">
                          {dateStr}
                        </span>
                        <span className="text-zinc-700 select-none">&middot;</span>
                        <span className="text-zinc-400 uppercase font-medium">
                          {readingTime} min read
                        </span>
                      </div>

                      <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-white group-hover:text-accent-purple transition-colors font-gothic leading-tight text-balance">
                        <Link href={`/blog/${leadPost.slug}`} className="hover:underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent-purple">
                          {leadPost.title}
                        </Link>
                      </h2>

                      <p className="text-zinc-300 font-light leading-relaxed md:leading-8 text-base md:text-lg line-clamp-3 text-pretty max-w-3xl">
                        {leadPost.excerpt}
                      </p>

                      <div className="pt-4 border-t border-white/5 mt-2">
                        <Link 
                          href={`/blog/${leadPost.slug}`} 
                          className="text-xs md:text-sm font-mono tracking-wider uppercase text-zinc-100 hover:text-accent-purple transition-colors inline-flex items-center gap-2 font-semibold group/link"
                        >
                          <span>Read Note</span>
                          <span className="transform group-hover/link:translate-x-1 transition-transform inline-block">&rarr;</span>
                        </Link>
                      </div>
                    </div>
                  )}

                </GlassCard>
              </div>
            );
          })()}

          {/* 4. JOURNAL ARCHIVE SECTION */}
          {archivePosts.length > 0 && (
            <section className="flex flex-col gap-6 pt-2">
              
              {/* Section Header */}
              <div className="flex flex-col gap-1 pb-3 border-b border-white/5">
                <span className="text-xs font-mono uppercase tracking-[0.25em] text-accent-purple font-semibold">
                  ARCHIVE
                </span>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white font-gothic tracking-tight">
                  {sectionHeading}
                </h2>
              </div>
              
              {/* Archive Grid: 2-Column Responsive Collection */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                {archivePosts.map((post) => {
                  const dateStr = post.publishedDate 
                    ? new Date(post.publishedDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })
                    : 'Draft';

                  const catInfo = getCategoryInfo(post.category);
                  const readingTime = getReadingTime(post.content);
                  const rawImgUrl = typeof post.featuredImage === 'object' ? post.featuredImage?.url : null;
                  const imgUrl = getMediaUrl(rawImgUrl);
                  const imgAlt = post.featuredImage?.alt || post.title;

                  return (
                    <GlassCard 
                      key={post.id} 
                      accent={catInfo.accent} 
                      className="p-6 md:p-7 flex flex-col justify-between group h-full"
                    >
                      <div className="flex flex-col">
                        
                        {/* Featured Image: ONLY rendered when a verified image exists */}
                        {imgUrl && (
                          <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden border border-white/[0.08] bg-obsidian-900/60 shadow-md mb-5">
                            <Image 
                              src={imgUrl} 
                              alt={imgAlt} 
                              fill
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 45vw, 550px"
                              className="w-full h-full object-cover object-center grayscale group-hover:grayscale-0 transition-all duration-700 ease-out scale-100 group-hover:scale-[1.02]"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950/60 via-transparent to-transparent opacity-65 pointer-events-none" />
                          </div>
                        )}

                        {/* Metadata Bar */}
                        <div className="flex flex-wrap items-center gap-2 mb-3 font-mono text-[11px]">
                          <span className={`px-2 py-0.5 rounded border uppercase font-semibold ${catInfo.textClass} ${catInfo.bgClass}`}>
                            {catInfo.label}
                          </span>
                          <span className="text-zinc-700 select-none">&middot;</span>
                          <span className="text-zinc-400 uppercase font-medium">
                            {dateStr}
                          </span>
                          <span className="text-zinc-700 select-none">&middot;</span>
                          <span className="text-zinc-400 uppercase font-medium">
                            {readingTime} min read
                          </span>
                        </div>
                        
                        {/* Title */}
                        <h3 className="text-2xl md:text-3xl font-semibold tracking-tight text-white group-hover:text-accent-purple transition-colors mb-3 font-gothic leading-snug text-balance">
                          <Link href={`/blog/${post.slug}`} className="hover:underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent-purple">
                            {post.title}
                          </Link>
                        </h3>
                        
                        {/* Excerpt */}
                        <p className="text-sm md:text-base leading-relaxed md:leading-7 text-zinc-300 font-light line-clamp-3 mb-4 text-pretty">
                          {post.excerpt}
                        </p>
                      </div>

                      {/* Card Action Link */}
                      <div className="pt-3.5 border-t border-white/5 mt-auto">
                        <Link 
                          href={`/blog/${post.slug}`} 
                          className="text-xs font-mono tracking-wider uppercase text-zinc-200 hover:text-accent-purple transition-colors inline-flex items-center gap-1.5 font-semibold group/link"
                        >
                          <span>Read Note</span>
                          <span className="transform group-hover/link:translate-x-1 transition-transform inline-block">&rarr;</span>
                        </Link>
                      </div>

                    </GlassCard>
                  );
                })}
              </div>

            </section>
          )}

        </div>
      )}

    </div>
  );
}
