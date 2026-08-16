import React from 'react';
import { getPayload } from 'payload';
import configPromise from '../../../../payload.config.ts';
import BlogClient from './BlogClient';

export const revalidate = 60; // Revalidate every 60 seconds

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

  return (
    <div className="max-w-5xl xl:max-w-6xl 2xl:max-w-[1240px] mx-auto px-6 lg:px-8 py-8 md:py-12 relative z-10">
      {/* Editorial Header Section */}
      <div className="flex flex-col items-center text-center justify-center max-w-3xl mx-auto mb-8 relative">
        <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[60%] h-[50%] bg-accent-purple/6 blur-[90px] rounded-full pointer-events-none -z-10" />
        
        <p className="text-xs md:text-sm font-mono tracking-[0.3em] uppercase text-zinc-400 font-medium mb-1.5">
          CHRONICLES &amp; INSIGHTS
        </p>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-white font-gothic mb-1.5 drop-shadow-sm select-none">
          Blog
        </h1>
        
        <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-accent-purple to-transparent mt-1 mb-2.5" />
        
        <p className="text-base md:text-lg leading-relaxed md:leading-8 text-zinc-300 font-light max-w-xl">
          Writing about music, visual art, technology and the systems behind my projects.
        </p>
      </div>

      <BlogClient posts={posts.docs} />
    </div>
  );
}
