import React from 'react';
import Link from 'next/link';
import { getPayload } from 'payload';
import configPromise from '../../../../payload.config.ts';
import GlassCard from '@/components/GlassCard';

export default async function BlogPage() {
  const payload = await getPayload({ config: configPromise });

  const posts = await payload.find({
    collection: 'posts',
    where: {
      status: {
        equals: 'published',
      },
    },
    sort: '-publishedDate',
  });

  // Category mapping to premium theme colors
  const categoryMap = {
    'music': { label: 'Music', accent: 'purple', textClass: 'text-accent-purple', bgClass: 'bg-accent-purple/10 border-accent-purple/20' },
    'art': { label: 'Visual Art', accent: 'orange', textClass: 'text-accent-orange', bgClass: 'bg-accent-orange/10 border-accent-orange/20' },
    'ai': { label: 'AI Projects', accent: 'cyan', textClass: 'text-accent-cyan', bgClass: 'bg-accent-cyan/10 border-accent-cyan/20' },
    'process-improvement': { label: 'Process Improvement', accent: 'purple', textClass: 'text-accent-purple', bgClass: 'bg-accent-purple/10 border-accent-purple/20' },
    'behind-the-scenes': { label: 'Behind The Scenes', accent: 'orange', textClass: 'text-accent-orange', bgClass: 'bg-accent-orange/10 border-accent-orange/20' },
    'website-build-log': { label: 'Website / Build Log', accent: 'cyan', textClass: 'text-accent-cyan', bgClass: 'bg-accent-cyan/10 border-accent-cyan/20' },
  };

  const getCategoryInfo = (category) => categoryMap[category] || { 
    label: category || 'General', 
    accent: 'purple', 
    textClass: 'text-accent-purple', 
    bgClass: 'bg-accent-purple/10 border-accent-purple/20' 
  };

  // Pluck the newest featured article (if any)
  const featuredPost = posts.docs.find(p => p.featured);
  
  // Filter remaining articles for the standard grid
  const gridPosts = featuredPost 
    ? posts.docs.filter(p => p.id !== featuredPost.id)
    : posts.docs;

  return (
    <>
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 md:py-24 relative z-10">
        {/* Header Section */}
        <div className="flex flex-col items-center text-center justify-center max-w-3xl mx-auto mb-16 relative">
          <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[60%] h-[50%] bg-accent-purple/5 blur-[80px] rounded-full pointer-events-none -z-10" />
          
          <div className="w-12 h-[1px] bg-gradient-to-r from-transparent via-accent-purple to-transparent mb-4" />
          
          <h1 className="text-4xl md:text-5xl font-medium tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white via-zinc-100 to-zinc-400 drop-shadow-sm font-sans mb-4">
            Chronicles & Insights
          </h1>
          
          <p className="text-xs font-mono tracking-[0.2em] uppercase text-accent-purple mb-4">
            Creative Musings & Technical Artifacts
          </p>
          
          <p className="text-sm md:text-base leading-7 text-zinc-400 font-light max-w-xl">
            A log of algorithmic journeys, symphonic compositions, tattoo design, and continuous optimization experiments.
          </p>
        </div>

        {posts.docs.length === 0 ? (
          /* Empty Archives State */
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <GlassCard accent="purple" className="max-w-md w-full">
              <p className="text-sm font-mono tracking-wider text-accent-purple uppercase mb-2">No Articles Found</p>
              <h3 className="text-lg font-medium text-zinc-200 mb-4">The Archives are Empty</h3>
              <p className="text-sm text-zinc-400 font-light mb-6">
                I am currently writing my very first articles. Log in to your Payload Admin panel to publish your first blog post!
              </p>
              <Link 
                href="/admin" 
                className="inline-flex px-6 py-2.5 rounded-full text-xs font-mono tracking-widest uppercase border border-white/10 hover:border-accent-purple/40 hover:bg-white/[0.02] text-zinc-300 hover:text-white transition-all duration-300"
              >
                Go to Admin UI
              </Link>
            </GlassCard>
          </div>
        ) : (
          <div className="flex flex-col gap-12">
            {/* 1. IMMERSIVE HERO ARTICLE (Featured Post) */}
            {featuredPost && (() => {
              const featuredFormattedDate = featuredPost.publishedDate 
                ? new Date(featuredPost.publishedDate).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })
                : 'Draft';

              const featuredCatInfo = getCategoryInfo(featuredPost.category);
              const featuredImgUrl = featuredPost.featuredImage?.url;
              const featuredImgAlt = featuredPost.featuredImage?.alt || featuredPost.title;

              return (
                <div className="w-full relative group">
                  <div className="flex items-center gap-2 mb-4 font-mono">
                    <span className="w-2 h-2 rounded-full bg-accent-purple animate-pulse" />
                    <span className="text-[10px] uppercase tracking-[0.25em] text-accent-purple font-bold">
                      Featured Entry
                    </span>
                  </div>

                  <GlassCard accent={featuredCatInfo.accent} className="overflow-hidden">
                    <div className={`grid grid-cols-1 ${featuredImgUrl ? 'lg:grid-cols-12' : ''} gap-8 items-center p-6 md:p-10`}>
                      {/* Text Column */}
                      <div className={`${featuredImgUrl ? 'lg:col-span-7' : ''} flex flex-col justify-between h-full`}>
                        <div>
                          <div className="flex flex-wrap items-center gap-3 mb-4">
                            <span className="text-xs font-mono tracking-widest text-zinc-500 uppercase">
                              {featuredFormattedDate}
                            </span>
                            <span className="w-1 h-1 rounded-full bg-zinc-700" />
                            <span className={`text-[10px] font-mono tracking-widest px-2.5 py-0.5 rounded border uppercase font-semibold ${featuredCatInfo.textClass} ${featuredCatInfo.bgClass}`}>
                              {featuredCatInfo.label}
                            </span>
                          </div>

                          <h2 className="text-2xl md:text-4xl font-semibold tracking-tight text-white hover:text-accent-purple transition-colors mb-4 font-gothic leading-tight">
                            <Link href={`/blog/${featuredPost.slug}`}>
                              {featuredPost.title}
                            </Link>
                          </h2>

                          <p className="text-zinc-400 font-light leading-7 text-sm md:text-base mb-6 line-clamp-4">
                            {featuredPost.excerpt}
                          </p>

                          {/* Dynamic Tags */}
                          {featuredPost.tags && featuredPost.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1.5 mb-6">
                              {featuredPost.tags.slice(0, 3).map((tagObj, tIdx) => (
                                <span 
                                  key={tIdx} 
                                  className="text-[9px] font-mono tracking-wider px-2.5 py-0.5 rounded-full bg-white/[0.03] backdrop-blur-sm border border-white/5 text-zinc-400 uppercase hover:text-zinc-300 transition-colors"
                                >
                                  #{tagObj.tag}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>

                        <div className="pt-4 border-t border-white/5 flex items-center justify-between mt-auto">
                          <Link 
                            href={`/blog/${featuredPost.slug}`} 
                            className="text-xs font-mono tracking-widest uppercase text-zinc-300 hover:text-accent-purple transition-colors flex items-center gap-1 group"
                          >
                            Read Featured Article 
                            <span className="transform group-hover:translate-x-1 transition-transform inline-block">&rarr;</span>
                          </Link>
                        </div>
                      </div>

                      {/* Image Column */}
                      {featuredImgUrl && (
                        <div className="lg:col-span-5 relative group">
                          {/* Backing Accent Glow */}
                          <div className={`absolute -inset-1 rounded-lg bg-gradient-to-r from-accent-${featuredCatInfo.accent}/20 to-transparent blur-xl opacity-75 group-hover:opacity-100 transition duration-1000 -z-10`} />
                          
                          <div className="relative aspect-[16/10] lg:aspect-[4/3] rounded-lg overflow-hidden border border-white/5 bg-obsidian-900/60 shadow-2xl">
                            <img 
                              src={featuredImgUrl} 
                              alt={featuredImgAlt} 
                              className="w-full h-full object-cover object-center grayscale group-hover:grayscale-0 transition-all duration-700 ease-out scale-100 group-hover:scale-[1.03]"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950/60 via-transparent to-transparent opacity-65 pointer-events-none" />
                          </div>
                        </div>
                      )}
                    </div>
                  </GlassCard>
                </div>
              );
            })()}

            {/* 2. REGULAR POSTS GRID */}
            {gridPosts.length > 0 && (
              <div className="flex flex-col gap-6">
                {featuredPost && (
                  <h3 className="text-xs font-mono uppercase tracking-[0.25em] text-zinc-500 mt-6 mb-2">
                    More Chronicles
                  </h3>
                )}
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {gridPosts.map((post) => {
                    const formattedDate = post.publishedDate 
                      ? new Date(post.publishedDate).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })
                      : 'Draft';

                    const catInfo = getCategoryInfo(post.category);

                    return (
                      <GlassCard key={post.id} accent={catInfo.accent} className="flex flex-col h-full justify-between">
                        <div>
                          <div className="flex items-center justify-between gap-4 mb-4">
                            <span className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase">
                              {formattedDate}
                            </span>
                            
                            {/* Small uppercase accent badge */}
                            <span className={`text-[10px] font-mono tracking-widest px-2.5 py-0.5 rounded border uppercase font-semibold ${catInfo.textClass} ${catInfo.bgClass}`}>
                              {catInfo.label}
                            </span>
                          </div>
                          
                          <h2 className="text-xl md:text-2xl font-medium tracking-tight text-zinc-100 hover:text-white transition-colors mb-3">
                            <Link href={`/blog/${post.slug}`}>
                              {post.title}
                            </Link>
                          </h2>
                          
                          <p className="text-sm leading-6 text-zinc-400 font-light line-clamp-3 mb-6">
                            {post.excerpt}
                          </p>

                          {/* Subtle Premium Glassy Tag Pills */}
                          {post.tags && post.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1.5 mb-6">
                              {post.tags.slice(0, 3).map((tagObj, tIdx) => (
                                <span 
                                  key={tIdx} 
                                  className="text-[9px] font-mono tracking-wider px-2 py-0.5 rounded-full bg-white/[0.02] backdrop-blur-sm border border-white/5 text-zinc-500 uppercase hover:text-zinc-300 transition-colors"
                                >
                                  #{tagObj.tag}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>

                        <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                          <Link 
                            href={`/blog/${post.slug}`} 
                            className="text-xs font-mono tracking-widest uppercase text-zinc-400 hover:text-accent-purple transition-colors flex items-center gap-1 group"
                          >
                            Read Article 
                            <span className="transform group-hover:translate-x-1 transition-transform inline-block">&rarr;</span>
                          </Link>
                        </div>
                      </GlassCard>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}

