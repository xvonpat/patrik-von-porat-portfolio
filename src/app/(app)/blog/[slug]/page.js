import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPayload } from 'payload';
import configPromise from '../../../../../payload.config.ts';
import GlassCard from '@/components/GlassCard';
import BlogShare from '@/components/BlogShare';

export const revalidate = 60; // Revalidate every 60 seconds

// Recursive Lexical JSON to JSX Parser
function renderLexical(node) {
  if (!node) return null;
  
  if (Array.isArray(node)) {
    return node.map((n, i) => <React.Fragment key={i}>{renderLexical(n)}</React.Fragment>);
  }

  // Text Nodes
  if (node.type === 'text') {
    let text = node.text;
    const format = node.format || 0;
    
    // Lexical formatting flags
    const isBold = (format & 1) === 1;
    const isItalic = (format & 2) === 2;
    const isStrikethrough = (format & 4) === 4;
    const isUnderline = (format & 8) === 8;
    const isCode = (format & 16) === 16;

    let el = text;
    if (isBold) el = <strong className="font-semibold text-white">{el}</strong>;
    if (isItalic) el = <em className="italic">{el}</em>;
    if (isUnderline) el = <u className="underline">{el}</u>;
    if (isStrikethrough) el = <span className="line-through">{el}</span>;
    if (isCode) el = <code className="bg-white/10 px-1.5 py-0.5 rounded font-mono text-xs text-accent-cyan">{el}</code>;
    
    return el;
  }

  // Children element nodes
  const children = node.children 
    ? node.children.map((c, i) => <React.Fragment key={i}>{renderLexical(c)}</React.Fragment>) 
    : null;

  switch (node.type) {
    case 'root':
      return <div className="space-y-6">{children}</div>;
    case 'paragraph':
      return <p className="text-lg leading-relaxed md:leading-9 text-zinc-300 font-light">{children}</p>;
    case 'heading':
      const level = node.tag || 'h2';
      const headingClasses = {
        h1: "text-4xl sm:text-5xl font-semibold tracking-tight text-white font-gothic mt-12 mb-4",
        h2: "text-3xl sm:text-4xl font-semibold tracking-tight text-white font-gothic mt-10 mb-4",
        h3: "text-2xl sm:text-3xl font-semibold tracking-tight text-white font-gothic mt-8 mb-3",
        h4: "text-xl sm:text-2xl font-semibold text-white font-gothic mt-6 mb-3",
      };
      const Tag = level;
      return <Tag className={headingClasses[level] || headingClasses.h2}>{children}</Tag>;
    case 'list':
      const listTag = node.tag === 'ol' ? 'ol' : 'ul';
      const listClasses = node.tag === 'ol' 
        ? 'list-decimal pl-6 space-y-3 text-lg text-zinc-300 font-light my-5 leading-relaxed md:leading-8' 
        : 'list-disc pl-6 space-y-3 text-lg text-zinc-300 font-light my-5 leading-relaxed md:leading-8';
      const ListTag = listTag;
      return <ListTag className={listClasses}>{children}</ListTag>;
    case 'listitem':
      return <li className="leading-relaxed md:leading-8">{children}</li>;
    case 'quote':
      return (
        <blockquote className="border-l-2 border-accent-purple pl-6 italic text-zinc-200 font-light my-8 bg-white/[0.02] py-6 pr-6 rounded-r text-lg leading-relaxed md:leading-8">
          {children}
        </blockquote>
      );
    default:
      return children;
  }
}

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

// Dynamic metadata generator for search engines and dynamic canonical links
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const payload = await getPayload({ config: configPromise });

  const response = await payload.find({
    collection: 'posts',
    where: {
      and: [
        {
          slug: {
            equals: slug,
          },
        },
        {
          status: {
            equals: 'published',
          },
        },
      ],
    },
  });

  const post = response.docs[0];

  if (!post) {
    return {
      title: 'Article Not Found | Patrik von Porat',
    };
  }

  // Safe SEO fallback mappings
  const seoTitle = post.seo?.seoTitle || post.title;
  const seoDescription = post.seo?.metaDescription || post.excerpt || 'Read the latest chronicle by Patrik von Porat.';
  
  // Custom canonical URL or dynamic fallback URL
  const customCanonical = post.seo?.canonicalUrl;
  const canonicalUrl = customCanonical 
    ? (customCanonical.startsWith('http') ? customCanonical : `https://vonporat.com${customCanonical.startsWith('/') ? '' : '/'}${customCanonical}`)
    : `https://vonporat.com/blog/${post.slug}`;

  // Custom OG Image or fallback to featuredImage
  const seoImage = post.seo?.ogImage || post.featuredImage;
  const rawImgUrl = typeof seoImage === 'object' && seoImage !== null ? seoImage.url : null;
  const resolvedImgUrl = rawImgUrl ? getMediaUrl(rawImgUrl) : 'https://vonporat.com/images/PvP2.png';

  return {
    title: `${seoTitle} | Chronicles`,
    description: seoDescription,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: seoTitle,
      description: seoDescription,
      url: `https://vonporat.com/blog/${post.slug}`,
      type: 'article',
      images: [
        {
          url: resolvedImgUrl,
          alt: post.title,
        }
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: seoTitle,
      description: seoDescription,
      images: [resolvedImgUrl],
    }
  };
}

// Single Article Server Component
export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  
  const payload = await getPayload({ config: configPromise });

  const response = await payload.find({
    collection: 'posts',
    where: {
      and: [
        {
          slug: {
            equals: slug,
          },
        },
        {
          status: {
            equals: 'published',
          },
        },
      ],
    },
  });


  const post = response.docs[0];

  if (!post) {
    notFound();
  }

  const formattedDate = post.publishedDate 
    ? new Date(post.publishedDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : 'Draft';

  // Category mapping to premium theme colors
  const categoryMap = {
    'music': { label: 'Music', accent: 'purple', textClass: 'text-accent-purple', bgClass: 'bg-accent-purple/10 border-accent-purple/20' },
    'visual-art': { label: 'Visual Art', accent: 'purple', textClass: 'text-accent-purple', bgClass: 'bg-accent-purple/10 border-accent-purple/20' },
    'art': { label: 'Visual Art', accent: 'purple', textClass: 'text-accent-purple', bgClass: 'bg-accent-purple/10 border-accent-purple/20' },
    'technology': { label: 'Technology', accent: 'cyan', textClass: 'text-accent-cyan', bgClass: 'bg-accent-cyan/10 border-accent-cyan/20' },
    'ai': { label: 'Technology', accent: 'cyan', textClass: 'text-accent-cyan', bgClass: 'bg-accent-cyan/10 border-accent-cyan/20' },
    'website-build-log': { label: 'Technology', accent: 'cyan', textClass: 'text-accent-cyan', bgClass: 'bg-accent-cyan/10 border-accent-cyan/20' },
    'process': { label: 'Process', accent: 'cyan', textClass: 'text-accent-cyan', bgClass: 'bg-accent-cyan/10 border-accent-cyan/20' },
    'process-improvement': { label: 'Process', accent: 'cyan', textClass: 'text-accent-cyan', bgClass: 'bg-accent-cyan/10 border-accent-cyan/20' },
    'personal': { label: 'Personal', accent: 'purple', textClass: 'text-accent-purple', bgClass: 'bg-accent-purple/10 border-accent-purple/20' },
    'behind-the-scenes': { label: 'Personal', accent: 'purple', textClass: 'text-accent-purple', bgClass: 'bg-accent-purple/10 border-accent-purple/20' },
  };

  const catInfo = categoryMap[post.category] || { 
    label: post.category || 'General', 
    accent: 'purple', 
    textClass: 'text-accent-purple', 
    bgClass: 'bg-accent-purple/10 border-accent-purple/20' 
  };

  const canonicalUrl = `https://vonporat.com/blog/${post.slug}`;

  return (
    <>
      <article className="max-w-3xl lg:max-w-4xl mx-auto px-6 py-8 md:py-12 relative z-10">
        
        {/* Navigation Breadcrumb */}
        <Link 
          href="/blog" 
          className="inline-flex items-center gap-2 text-xs md:text-sm font-mono tracking-widest uppercase text-zinc-400 hover:text-accent-purple mb-6 transition-colors group font-medium"
        >
          <span className="transform group-hover:-translate-x-1 transition-transform inline-block">&larr;</span> 
          Back to Chronicles
        </Link>

        {/* Article Header */}
        <header className="mb-8 relative pb-6 border-b border-white/5">
          <div className="absolute top-[20%] left-1/4 w-[50%] h-[60%] bg-accent-purple/6 blur-[90px] rounded-full pointer-events-none -z-10" />
          
          <div className="flex items-center gap-3 mb-3">
            <span className="text-xs font-mono tracking-widest text-zinc-400 uppercase font-medium">
              {formattedDate}
            </span>
            <span className="w-1 h-1 rounded-full bg-zinc-600" />
            
            {/* Category badge */}
            <span className={`text-[10px] md:text-xs font-mono tracking-widest px-2.5 py-0.5 rounded border uppercase font-semibold ${catInfo.textClass} ${catInfo.bgClass}`}>
              {catInfo.label}
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-white font-gothic leading-tight mb-5">
            {post.title}
          </h1>

          <p className="text-lg md:text-xl leading-relaxed md:leading-9 text-zinc-300 font-light italic">
            {post.excerpt}
          </p>

          {/* Premium Glassy Tag Pills */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-5">
              {post.tags.map((tagObj, tIdx) => (
                <span 
                  key={tIdx} 
                  className="text-xs font-mono tracking-wider px-3 py-1 rounded-full bg-white/[0.04] backdrop-blur-sm border border-white/[0.08] text-zinc-300 hover:text-white hover:border-white/20 transition-all duration-300 uppercase font-medium cursor-default"
                >
                  #{tagObj.tag}
                </span>
              ))}
            </div>
          )}
        </header>

        {/* Rich Text content with matching accent glow */}
        <GlassCard accent={catInfo.accent} className="p-6 md:p-10 mb-0">
          <div className="prose prose-invert max-w-none">
            {renderLexical(post.content?.root)}
          </div>
        </GlassCard>

        {/* Share Section */}
        <BlogShare title={post.title} url={canonicalUrl} />

        {/* Footer Navigation */}
        <footer className="pt-8 flex items-center justify-between">
          <Link 
            href="/blog" 
            className="text-xs md:text-sm font-mono tracking-widest uppercase text-zinc-300 hover:text-accent-purple transition-colors font-semibold"
          >
            &larr; View All Articles
          </Link>
          <span className="w-2.5 h-2.5 rounded-full bg-accent-purple/50" />
        </footer>

      </article>
    </>
  );
}
