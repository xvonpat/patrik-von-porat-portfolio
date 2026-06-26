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
    <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 md:py-24 relative z-10">
      {/* Editorial Header Section */}
      <div className="flex flex-col items-center text-center justify-center max-w-3xl mx-auto mb-12 relative">
        <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[60%] h-[50%] bg-accent-purple/5 blur-[80px] rounded-full pointer-events-none -z-10" />
        
        <p className="text-[10px] font-mono tracking-[0.3em] uppercase text-zinc-500 mb-2">
          CHRONICLES &amp; INSIGHTS
        </p>

        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-white font-gothic mb-4 drop-shadow-sm select-none">
          Blog
        </h1>
        
        <p className="text-sm md:text-base leading-7 text-zinc-400 font-light max-w-xl">
          Writing about music, visual art, technology and the systems behind my projects.
        </p>
      </div>

      <BlogClient posts={posts.docs} />
    </div>
  );
}
