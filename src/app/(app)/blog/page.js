import React from 'react';
import { getPayload } from 'payload';
import configPromise from '../../../../payload.config.ts';
import BlogClient from './BlogClient';

export const revalidate = 60; // Revalidate every 60 seconds

export const metadata = {
  title: "Journal | Patrik von Porat",
  description: "Notes on music, visual practice, technology, learning and the systems behind the projects.",
  alternates: {
    canonical: '/blog',
  },
  openGraph: {
    title: "Journal | Patrik von Porat",
    description: "Notes on music, visual practice, technology, learning and the systems behind the projects.",
    url: 'https://vonporat.com/blog',
  }
};

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
    limit: 100,
  });

  return (
    <div className="max-w-5xl xl:max-w-6xl 2xl:max-w-[1240px] mx-auto px-6 lg:px-8 py-8 md:py-14 flex flex-col gap-10 md:gap-14 relative z-10">
      {/* 1. Restrained Editorial Hero */}
      <section className="flex flex-col items-center text-center justify-center gap-3.5 max-w-3xl mx-auto relative pt-2 pb-2">
        <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[70%] h-[60%] bg-accent-purple/8 blur-[100px] rounded-full pointer-events-none -z-10" />

        <p className="text-xs md:text-sm font-mono tracking-[0.3em] uppercase text-zinc-400 font-medium">
          JOURNAL
        </p>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-white font-gothic text-balance">
          Notes from the work as it develops.
        </h1>

        <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-accent-purple to-transparent mt-0.5 mb-0.5" />

        <p className="text-base md:text-lg leading-relaxed md:leading-8 text-zinc-300 font-light max-w-2xl text-balance text-pretty">
          Writing about music, visual practice, technology, learning and the systems behind the projects.
        </p>
      </section>

      {/* 2. Blog Client: Interactive Filtering, Latest Note & Archive */}
      <BlogClient posts={posts.docs} />
    </div>
  );
}
