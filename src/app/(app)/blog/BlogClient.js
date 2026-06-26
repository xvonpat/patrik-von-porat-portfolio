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

  const filters = ['All', 'Music', 'Visual Art', 'Technology', 'Process', 'Personal'];

  const filterAccents = {
    'All': 'text-accent-purple border-accent-purple/30 bg-accent-purple/5',
    'Music': 'text-accent-purple border-accent-purple/30 bg-accent-purple/5',
    'Visual Art': 'text-accent-orange border-accent-orange/30 bg-accent-orange/5',
    'Technology': 'text-accent-cyan border-accent-cyan/30 bg-accent-cyan/5',
    'Process': 'text-accent-cyan border-accent-cyan/30 bg-accent-cyan/5',
    'Personal': 'text-accent-purple border-accent-purple/30 bg-accent-purple/5'
  };

  const categoryMap = {
    'music': { label: 'Music', accent: 'purple', textClass: 'text-accent-purple', bgClass: 'bg-accent-purple/10 border-accent-purple/20' },
    'visual-art': { label: 'Visual Art', accent: 'orange', textClass: 'text-accent-orange', bgClass: 'bg-accent-orange/10 border-accent-orange/20' },
    'art': { label: 'Visual Art', accent: 'orange', textClass: 'text-accent-orange', bgClass: 'bg-accent-orange/10 border-accent-orange/20' },
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

  // Filter posts based on category mapping
  const filteredPosts = posts.filter(post => {
    if (activeFilter === 'All') return true;
    const info = getCategoryInfo(post.category);
    return info.label === activeFilter;
  });

  const featuredPost = filteredPosts[0];
  const gridPosts = filteredPosts.slice(1);

  const renderPlaceholder = (accent) => {
    const gradients = {
      purple: 'from-purple-950/20 via-obsidian-900/60 to-obsidian-950',
      orange: 'from-orange-950/20 via-obsidian-900/60 to-obsidian-950',
      cyan: 'from-cyan-950/20 via-obsidian-900/60 to-obsidian-950'
    };
    const gradient = gradients[accent] || gradients.purple;
    return (
      <div className={`w-full h-full bg-gradient-to-br ${gradient} flex flex-col items-center justify-center p-8 border border-white/5 rounded-lg select-none`}>
        <svg className="w-8 h-8 text-zinc-800 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
        <span className="text-[10px] font-mono tracking-widest text-zinc-600 uppercase">Chronicle Archive</span>
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-12 mt-6">
      
      {/* Subtle Category Navigation Filter */}
      <div className="flex flex-wrap justify-center items-center gap-x-3 gap-y-2 text-[10px] md:text-xs font-mono py-2 border-y border-white/5 max-w-4xl mx-auto w-full">
        {filters.map((filter, idx) => {
          const isActive = activeFilter === filter;
          return (
            <React.Fragment key={filter}>
              {idx > 0 && <span className="text-zinc-700 select-none">&middot;</span>}
              <button
                onClick={() => setActiveFilter(filter)}
                className={`transition-all duration-300 uppercase tracking-widest px-2.5 py-1 rounded font-medium ${
                  isActive 
                    ? `${filterAccents[filter]} border` 
                    : 'text-zinc-500 hover:text-zinc-300 bg-transparent border border-transparent'
                }`}
              >
                {filter}
              </button>
            </React.Fragment>
          );
        })}
      </div>

      {filteredPosts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <GlassCard accent="purple" className="max-w-md w-full">
            <p className="text-xs font-mono tracking-widest text-accent-purple uppercase mb-2">Empty Category</p>
            <h3 className="text-lg font-medium text-zinc-300 mb-4 font-gothic">No Articles Found</h3>
            <p className="text-sm text-zinc-500 font-light leading-6">
              There are currently no published articles under the &quot;{activeFilter}&quot; category.
            </p>
          </GlassCard>
        </div>
      ) : (
        <div className="flex flex-col gap-16">
          
          {/* 1. FEATURED ARTICLE */}
          {featuredPost && (() => {
            const dateStr = featuredPost.publishedDate 
              ? new Date(featuredPost.publishedDate).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })
              : 'Draft';
            
            const catInfo = getCategoryInfo(featuredPost.category);
            const readingTime = getReadingTime(featuredPost.content);
            const rawImgUrl = typeof featuredPost.featuredImage === 'object' ? featuredPost.featuredImage?.url : null;
            const imgUrl = getMediaUrl(rawImgUrl);
            const imgAlt = featuredPost.featuredImage?.alt || featuredPost.title;

            return (
              <div className="w-full relative group">
                <GlassCard accent={catInfo.accent} className="overflow-hidden">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10 items-center p-2 md:p-4">
                    {/* Image Column */}
                    <div className="lg:col-span-5 relative w-full aspect-[16/10] rounded-lg overflow-hidden border border-white/5 bg-obsidian-900/60 shadow-2xl">
                      {imgUrl ? (
                        <Image 
                          src={imgUrl} 
                          alt={imgAlt} 
                          fill
                          priority
                          sizes="(max-width: 768px) 100vw, 40vw"
                          className="w-full h-full object-cover object-center grayscale group-hover:grayscale-0 transition-all duration-700 ease-out scale-100 group-hover:scale-[1.02]"
                        />
                      ) : (
                        renderPlaceholder(catInfo.accent)
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950/60 via-transparent to-transparent opacity-65 pointer-events-none" />
                    </div>

                    {/* Content Column */}
                    <div className="lg:col-span-7 flex flex-col justify-center h-full">
                      <div className="flex items-center gap-3 mb-4">
                        <span className={`text-[10px] font-mono tracking-widest px-2.5 py-0.5 rounded border uppercase font-semibold ${catInfo.textClass} ${catInfo.bgClass}`}>
                          {catInfo.label}
                        </span>
                        <span className="text-zinc-700 select-none">&middot;</span>
                        <span className="text-xs font-mono tracking-widest text-zinc-500 uppercase">
                          {dateStr}
                        </span>
                        <span className="text-zinc-700 select-none">&middot;</span>
                        <span className="text-xs font-mono tracking-widest text-zinc-500 uppercase">
                          {readingTime} min read
                        </span>
                      </div>

                      <h2 className="text-2xl md:text-4xl font-semibold tracking-tight text-white hover:text-accent-purple transition-colors mb-4 font-gothic leading-tight">
                        <Link href={`/blog/${featuredPost.slug}`}>
                          {featuredPost.title}
                        </Link>
                      </h2>

                      <p className="text-zinc-400 font-light leading-7 text-sm md:text-base mb-6 line-clamp-3">
                        {featuredPost.excerpt}
                      </p>

                      <div className="pt-4 border-t border-white/5">
                        <Link 
                          href={`/blog/${featuredPost.slug}`} 
                          className="text-xs font-mono tracking-widest uppercase text-zinc-300 hover:text-accent-purple transition-colors inline-flex items-center gap-1.5"
                        >
                          Read Article 
                          <span className="transform group-hover:translate-x-1 transition-transform inline-block">&rarr;</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </GlassCard>
              </div>
            );
          })()}

          {/* 2. LATEST ARTICLES GRID */}
          {gridPosts.length > 0 && (
            <div className="flex flex-col gap-8">
              <h3 className="text-sm font-mono uppercase tracking-[0.25em] text-zinc-500 mt-6 pb-2 border-b border-white/5">
                Latest Articles
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {gridPosts.map((post) => {
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
                    <Link href={`/blog/${post.slug}`} key={post.id} className="block group">
                      <GlassCard accent={catInfo.accent} className="flex flex-col h-full justify-between">
                        <div>
                          {/* Card Cover Image */}
                          <div className="relative w-full aspect-[16/10] rounded-lg overflow-hidden border border-white/5 bg-obsidian-900/60 shadow-md mb-6">
                            {imgUrl ? (
                              <Image 
                                src={imgUrl} 
                                alt={imgAlt} 
                                fill
                                sizes="(max-width: 768px) 100vw, 30vw"
                                className="w-full h-full object-cover object-center grayscale group-hover:grayscale-0 transition-all duration-700 ease-out scale-100 group-hover:scale-[1.02]"
                              />
                            ) : (
                              renderPlaceholder(catInfo.accent)
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950/60 via-transparent to-transparent opacity-65 pointer-events-none" />
                          </div>

                          {/* Metadata */}
                          <div className="flex items-center gap-2 mb-3 font-mono text-[10px]">
                            <span className={`px-2 py-0.5 rounded border uppercase font-semibold ${catInfo.textClass} ${catInfo.bgClass}`}>
                              {catInfo.label}
                            </span>
                            <span className="text-zinc-700 select-none">&middot;</span>
                            <span className="text-zinc-500 uppercase">
                              {dateStr}
                            </span>
                            <span className="text-zinc-700 select-none">&middot;</span>
                            <span className="text-zinc-500 uppercase">
                              {readingTime} min read
                            </span>
                          </div>
                          
                          <h4 className="text-lg md:text-xl font-medium tracking-tight text-zinc-100 group-hover:text-white transition-colors mb-3 font-sans">
                            {post.title}
                          </h4>
                          
                          <p className="text-xs leading-6 text-zinc-400 font-light line-clamp-3 mb-4">
                            {post.excerpt}
                          </p>
                        </div>
                      </GlassCard>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
