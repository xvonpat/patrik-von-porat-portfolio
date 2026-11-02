'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import Link from 'next/link';
import styles from './SitemapView.module.css';

// Base architectural definition of vonporat.com (approved and locked structure)
const BASE_SITE_STRUCTURE = [
  {
    id: 'home',
    name: 'Home',
    path: '/',
    type: 'page',
    category: 'core',
    status: 'locked',
    statusLabel: 'Approved & Locked',
    file: 'src/app/(app)/page.js',
    description:
      'The creative hub and central orientation: Why → Proof → Expressions → How → Now → Journal → Contact. Establishes proof and identity early.',
    sections: [
      { name: 'Hero', anchor: '#top', detail: 'Eyebrow "PATRIK VON PORAT · CREATIVE HUB", headline "Creative instinct, given structure.", WebGL background & CTAs' },
      { name: 'Selected Work', anchor: '#selected-work', detail: 'Desktop carousel with 6 featured projects (Realmforged, Ashwrithe, The Butcher Bust, Conan the Barbarian, DMAIC Companion, Home Control Panel)' },
      { name: 'Core Expressions', anchor: '#expressions', detail: 'Three primary disciplines: Music & Worlds, Visual Practice, Systems & Digital Work' },
      { name: 'How I Work', anchor: '#how-i-work', detail: 'The conceptual bridge: Observe → Structure → Create → Refine with concrete examples' },
      { name: 'Currently', anchor: '#currently', detail: 'Three linked current-focus items and ongoing processes' },
      { name: 'Latest Journal', anchor: '#journal', detail: 'Latest published journal entry points dynamically served by Payload CMS' },
      { name: 'Closing Exit', anchor: '#contact', detail: 'Exit routes: Read Journal, Get in Touch, Instagram and Threads' },
    ],
    cmsConnections: [
      {
        name: 'Site Settings',
        slug: 'site-settings',
        type: 'global',
        desc: 'Selects the active WebGL background theme (Harmonic Nexus 3D, Chladni Plate, Ink in Water, Contour Flow)',
        link: '/admin/globals/site-settings',
      },
      {
        name: 'Posts',
        slug: 'posts',
        type: 'collection',
        desc: 'Fetches the 2 latest published journal articles for the homepage preview',
        link: '/admin/collections/posts',
      },
    ],
  },
  {
    id: 'projects',
    name: 'Projects (Selected Work)',
    path: '/projects',
    type: 'page',
    category: 'projects',
    status: 'locked',
    statusLabel: 'Approved & Locked',
    file: 'src/app/(app)/projects/page.js',
    description:
      'Curated Selected Work showcase connecting creative output with systems thinking. Each card answers: What is it? Why does it exist? Patrik\'s role & proof.',
    subpages: [
      {
        id: 'projects-dmaic',
        name: 'DMAIC Companion',
        path: '/projects/dmaic-companion',
        type: 'case-study',
        category: 'projects',
        status: 'live',
        statusLabel: 'Live · Invite only',
        file: 'src/app/(app)/projects/dmaic-companion/page.js',
        description:
          'Deep Case Study: Lean Six Sigma process intelligence companion. From initial observation to statistical process control.',
      },
      {
        id: 'projects-home-control',
        name: 'Home Control Panel',
        path: '/projects/home-control-panel',
        type: 'case-study',
        category: 'projects',
        status: 'dev',
        statusLabel: 'In Development',
        file: 'src/app/(app)/projects/home-control-panel/page.js',
        description:
          'Deep Case Study: Local IoT home automation ecosystem, resilient offline-first operation, and custom real-time dashboard.',
      },
    ],
    sections: [
      { name: 'Featured Work', detail: 'Primary active projects: Realmforged (Active) and Ashwrithe (In Development)' },
      { name: 'Case Studies', detail: 'In-depth systems studies: DMAIC Companion & Home Control Panel' },
      { name: 'Broader Practice', detail: 'The Butcher Bust, Conan the Barbarian, vonporat.com' },
    ],
    cmsConnections: [
      {
        name: 'Admin Links',
        slug: 'admin-links',
        type: 'collection',
        desc: 'Internal and external verified ecosystem destination links',
        link: '/admin/collections/admin-links',
      },
    ],
  },
  {
    id: 'music',
    name: 'Music & Discography',
    path: '/music',
    type: 'page',
    category: 'music',
    status: 'locked',
    statusLabel: 'Approved & Locked',
    file: 'src/app/(app)/music/page.js',
    description:
      '35+ years of guitar work and composition. Prioritizes active projects (Realmforged & Ashwrithe) with Freternia and Cromonic as selected legacy.',
    sections: [
      { name: 'Realmforged', detail: 'Active flagship: Symphonic / orchestral metal and cohesive worldbuilding (realmforged.com)' },
      { name: 'Ashwrithe', detail: 'In Development: Dark, atmospheric guitar-led studio craft (ashwrithe.com)' },
      { name: 'Freternia (1998–2023)', detail: 'Selected legacy: 4 studio albums, international releases and European festivals' },
      { name: 'Cromonic (2014–2017)', detail: 'Melodic power metal: Time (2017)' },
      { name: 'Listening Channels', detail: 'Direct platform links to Spotify, Bandcamp, and official project websites' },
    ],
    cmsConnections: [],
  },
  {
    id: 'art',
    name: 'Art & Visual Practice',
    path: '/art',
    type: 'page',
    category: 'art',
    status: 'locked',
    statusLabel: 'Approved & Locked',
    file: 'src/app/(app)/art/page.js',
    description:
      'Curated visual and physical practice: traditional studies, tattoo practice, and 3D miniature prints. AI-generated imagery is strictly excluded.',
    sections: [
      { name: 'Traditional Studies', detail: 'Graphite and charcoal on paper: eye studies and anatomical form' },
      { name: 'Tattoo Practice', detail: 'Synthetic Reelskin studies: linework, whip-shading, and depth consistency' },
      { name: 'Physical Craft', detail: 'Miniatures & 3D Prints: 8K resin prints, hand-painted busts and scale models' },
      { name: 'Interactive Lightbox', detail: 'Fullscreen viewer with zoom, medium metadata, and concise captions' },
    ],
    cmsConnections: [],
  },
  {
    id: 'gallery',
    name: 'Gallery',
    path: '/gallery',
    type: 'page',
    category: 'art',
    status: 'cms',
    statusLabel: 'CMS-Driven',
    file: 'src/app/(app)/gallery/page.js',
    description:
      'CMS-driven photo gallery with albums and categories. Equipped with a static fallback if the database or connection is offline.',
    sections: [
      { name: 'Album Navigator', detail: 'Filter by curated albums and photo series' },
      { name: 'Category Filtering', detail: 'Quick sorting across photographs, sketches, and studies' },
      { name: 'High-Res Wall', detail: 'Progressive image loading with captions, tags, and camera details' },
    ],
    cmsConnections: [
      {
        name: 'Gallery Images',
        slug: 'gallery-images',
        type: 'collection',
        desc: 'Collection of all photo items, captions, camera/EXIF metadata, and album links',
        link: '/admin/collections/gallery-images',
      },
      {
        name: 'Gallery Albums',
        slug: 'gallery-albums',
        type: 'collection',
        desc: 'Curated photo albums with cover photos and sorting order',
        link: '/admin/collections/gallery-albums',
      },
      {
        name: 'Gallery Categories',
        slug: 'gallery-categories',
        type: 'collection',
        desc: 'Structured category taxonomy for photo items',
        link: '/admin/collections/gallery-categories',
      },
    ],
  },
  {
    id: 'blog',
    name: 'Blog / Journal',
    path: '/blog',
    type: 'page',
    category: 'editorial',
    status: 'cms',
    statusLabel: 'CMS-Driven',
    file: 'src/app/(app)/blog/page.js',
    description:
      'Personal editorial journal. Only published posts are publicly visible; draft content remains strictly protected.',
    subpages: [
      {
        id: 'blog-post',
        name: 'Post Article Route',
        path: '/blog/[slug]',
        type: 'dynamic',
        category: 'editorial',
        status: 'cms',
        statusLabel: 'Dynamic CMS Route',
        file: 'src/app/(app)/blog/[slug]/page.js',
        description:
          'Individual post route rendered with Lexical rich text, cover hero image, reading time, and related reading.',
      },
    ],
    sections: [
      { name: 'Latest Note (Lead)', detail: 'Lead entry layout highlighting the latest published journal note' },
      { name: 'Categories (7 active)', detail: 'Music, Visual Art, Making, Technology, Process, Personal, Projects' },
      { name: 'Archive Feed', detail: 'Responsive card feed with typographic fallbacks for posts without images' },
    ],
    cmsConnections: [
      {
        name: 'Posts',
        slug: 'posts',
        type: 'collection',
        desc: 'Journal posts with Lexical RichText, excerpt, reading time, and publish status',
        link: '/admin/collections/posts',
      },
      {
        name: 'Categories',
        slug: 'categories',
        type: 'collection',
        desc: '7 editorial categories structuring the journal',
        link: '/admin/collections/categories',
      },
      {
        name: 'Media',
        slug: 'media',
        type: 'collection',
        desc: 'Uploaded media and cover images with mandatory alt text',
        link: '/admin/collections/media',
      },
    ],
  },
  {
    id: 'about',
    name: 'About Patrik',
    path: '/about',
    type: 'page',
    category: 'about',
    status: 'locked',
    statusLabel: 'Approved & Locked',
    file: 'src/app/(app)/about/page.js',
    description:
      'Connects music, visual craft, technology, and systems thinking into one coherent personal narrative: "The work changes. The underlying impulse does not."',
    sections: [
      { name: 'Hero & Studio Portrait', detail: 'Editorial split layout with personal introduction beside studio portrait' },
      { name: 'Core Facts Band', detail: 'Based in Sweden, Playing guitar 35+ years, Lean Six Sigma Green Belt, Realmforged & Ashwrithe' },
      { name: 'Background & Pull Quote', detail: '"Structure does not replace instinct. It gives instinct somewhere to go."' },
      { name: 'Same Hands, Different Materials', detail: 'Linked image triptych: Realmforged, Eye Study, DMAIC Companion' },
      { name: 'How I Work Matrix', detail: '4-step matrix (Observe → Structure → Create → Refine) across Music, Visual, and Systems' },
      { name: 'Capabilities', detail: 'Equal-height cards: Music & Audio, Visual Practice, Systems & Improvement, Web & Digital' },
      { name: 'Closing Chapter', detail: 'Current focus and direct pathways to get in touch' },
    ],
    cmsConnections: [],
  },
  {
    id: 'contact',
    name: 'Contact',
    path: '/contact',
    type: 'page',
    category: 'contact',
    status: 'locked',
    statusLabel: 'Approved & Locked',
    file: 'src/app/(app)/contact/page.js',
    description:
      'Deliberately minimal page laid out as a personal note. Form-free with verified direct email and social channels.',
    sections: [
      { name: 'Personal Letter', detail: 'Direct, personal, and calm introductory note' },
      { name: 'Reasons to Write', detail: 'Creative collaborations, Music & visual art, Systems & process work' },
      { name: 'Direct Line Panel', detail: 'Send Email button targeting configured mailto, visible address with copy button' },
      { name: 'Verified Channels', detail: 'Elsewhere links: LinkedIn, Threads, and Instagram' },
      { name: 'Sign-off', detail: 'Patrik\'s signature (no contact forms, Calendly, or booking widgets)' },
    ],
    cmsConnections: [],
  },
  {
    id: 'admin',
    name: 'Payload CMS Backend',
    path: '/admin',
    type: 'admin',
    category: 'system',
    status: 'internal',
    statusLabel: 'Admin Panel',
    file: 'src/app/(payload)/admin/[[...segments]]/page.js',
    description:
      'Studio administrative backend for editorial content, background theme selection, AI Workbench assistant, and site structure.',
    subpages: [
      {
        id: 'admin-dashboard',
        name: 'Dashboard Overview',
        path: '/admin',
        type: 'subpage',
        category: 'system',
        status: 'internal',
        statusLabel: 'Dashboard',
        file: 'payload.config.ts',
        description: 'Main admin dashboard with collection shortcuts, WebGL theme selector, and Vercel Analytics.',
      },
      {
        id: 'admin-sitemap',
        name: 'Visual Sitemap',
        path: '/admin/sitemap',
        type: 'subpage',
        category: 'system',
        status: 'internal',
        statusLabel: 'This View',
        file: 'src/components/SitemapView.js',
        description: 'Visual tree diagram, grid overview, and CMS data flow matrix across the entire site.',
      },
      {
        id: 'admin-workbench',
        name: 'Workbench Assistant',
        path: '/admin/workbench',
        type: 'subpage',
        category: 'system',
        status: 'internal',
        statusLabel: 'AI Assistant',
        file: 'src/components/WorkbenchView.js',
        description: 'Interactive AI assistant turning rough notes and photos into structured journal drafts.',
      },
    ],
    sections: [
      { name: 'Editorial Collections', detail: 'Posts, Categories, Media' },
      { name: 'Gallery Collections', detail: 'Gallery Images, Gallery Albums, Gallery Categories' },
      { name: 'Global Settings', detail: 'Site Settings (3D WebGL theme selector, etc.)' },
      { name: 'System & Authentication', detail: 'Google OAuth and administrator accounts' },
    ],
    cmsConnections: [
      {
        name: 'Site Settings',
        slug: 'site-settings',
        type: 'global',
        desc: 'Global configuration for WebGL background themes and site options',
        link: '/admin/globals/site-settings',
      },
      {
        name: 'Users',
        slug: 'users',
        type: 'collection',
        desc: 'Google OAuth strategies and authenticated admin sessions',
        link: '/admin/collections/users',
      },
    ],
  },
];

// Fallback CMS collections data
const BASE_CMS_COLLECTIONS = [
  {
    name: 'Posts',
    slug: 'posts',
    type: 'collection',
    description: 'Journal posts with Lexical RichText, excerpt, reading time, and draft/published status.',
    routes: ['/blog', '/blog/[slug]', '/'],
    editLink: '/admin/collections/posts',
    scope: 'Primary editorial CMS collection. Only published posts are visible on public routes.',
  },
  {
    name: 'Categories',
    slug: 'categories',
    type: 'collection',
    description: '7 curated categories: Music, Visual Art, Making, Technology, Process, Personal, Projects.',
    routes: ['/blog', '/blog/[slug]'],
    editLink: '/admin/collections/categories',
    scope: 'Structures the journal archive and navigation filters.',
  },
  {
    name: 'Media',
    slug: 'media',
    type: 'collection',
    description: 'Uploaded images with mandatory alt text stored via S3/Supabase storage.',
    routes: ['/blog', '/blog/[slug]'],
    editLink: '/admin/collections/media',
    scope: 'Cover images and inline Lexical post uploads.',
  },
  {
    name: 'Gallery Images',
    slug: 'gallery-images',
    type: 'collection',
    description: 'High-res photos with captions, camera/EXIF metadata, and album relationships.',
    routes: ['/gallery'],
    editLink: '/admin/collections/gallery-images',
    scope: 'Visual photo gallery items. Backed by resilient static fallback data.',
  },
  {
    name: 'Gallery Albums',
    slug: 'gallery-albums',
    type: 'collection',
    description: 'Album groupings with cover images and display order.',
    routes: ['/gallery'],
    editLink: '/admin/collections/gallery-albums',
    scope: 'Powers album tabs on the photo gallery route.',
  },
  {
    name: 'Gallery Categories',
    slug: 'gallery-categories',
    type: 'collection',
    description: 'Categorization taxonomy for gallery photo items.',
    routes: ['/gallery'],
    editLink: '/admin/collections/gallery-categories',
    scope: 'Powers photo category filters.',
  },
  {
    name: 'Site Settings',
    slug: 'site-settings',
    type: 'global',
    description: 'Global site configuration selecting the active 3D WebGL background theme for the homepage.',
    routes: ['/'],
    editLink: '/admin/globals/site-settings',
    scope: 'Switch between Harmonic Nexus 3D, Chladni Plate, Ink in Water, or Contour Flow.',
  },
  {
    name: 'Admin Links',
    slug: 'admin-links',
    type: 'collection',
    description: 'Verified ecosystem destinations and external reference URLs.',
    routes: ['/admin', '/projects'],
    editLink: '/admin/collections/admin-links',
    scope: 'Quick reference links to external sister projects (e.g. realmforged.com).',
  },
];

export function SitemapView() {
  const [viewMode, setViewMode] = useState('tree'); // 'tree' | 'grid' | 'matrix'
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedNode, setSelectedNode] = useState(null);
  const [copiedPath, setCopiedPath] = useState(null);

  // Live auto-discovery state
  const [liveData, setLiveData] = useState(null);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncStatus, setSyncStatus] = useState('idle'); // 'idle' | 'live' | 'fallback'

  // Fetch live route and CMS content
  const performScan = useCallback(async () => {
    setIsSyncing(true);
    try {
      const res = await fetch('/api/sitemap/live');
      if (res.ok) {
        const data = await res.json();
        setLiveData(data);
        setSyncStatus('live');
      } else {
        setSyncStatus('fallback');
      }
    } catch (err) {
      console.warn('[Sitemap] Could not connect to live route scanner:', err);
      setSyncStatus('fallback');
    } finally {
      setIsSyncing(false);
    }
  }, []);

  useEffect(() => {
    let ignore = false;
    async function load() {
      try {
        const res = await fetch('/api/sitemap/live');
        if (res.ok && !ignore) {
          const data = await res.json();
          setLiveData(data);
          setSyncStatus('live');
        } else if (!ignore) {
          setSyncStatus('fallback');
        }
      } catch (err) {
        if (!ignore) {
          console.warn('[Sitemap] Could not connect to live route scanner:', err);
          setSyncStatus('fallback');
        }
      }
    }
    load();
    return () => {
      ignore = true;
    };
  }, []);

  // Merge static architectural structure with live discovered routes and CMS posts
  const siteStructure = useMemo(() => {
    // Clone base structure
    const cloned = JSON.parse(JSON.stringify(BASE_SITE_STRUCTURE));

    if (!liveData) {
      return cloned;
    }

    // 1. Inject live published blog posts under Blog
    if (liveData.publishedPosts && liveData.publishedPosts.length > 0) {
      const blogNode = cloned.find((n) => n.id === 'blog');
      if (blogNode) {
        if (!blogNode.subpages) blogNode.subpages = [];
        liveData.publishedPosts.forEach((post) => {
          blogNode.subpages.push({
            id: `post-${post.id}`,
            name: post.title,
            path: post.path,
            type: 'article',
            category: 'editorial',
            status: 'cms',
            statusLabel: 'Published Post',
            description: `Live published journal post. Published: ${post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : 'Active'}.`,
          });
        });
      }
    }

    // 2. Inject live gallery albums under Gallery
    if (liveData.galleryAlbums && liveData.galleryAlbums.length > 0) {
      const galleryNode = cloned.find((n) => n.id === 'gallery');
      if (galleryNode) {
        if (!galleryNode.sections) galleryNode.sections = [];
        galleryNode.sections.push({
          name: `Live Albums (${liveData.galleryAlbums.length})`,
          detail: liveData.galleryAlbums.map((a) => a.title).join(', '),
        });
      }
    }

    // 3. Auto-discover newly added Next.js page routes not in BASE_SITE_STRUCTURE
    if (liveData.scannedRoutes && liveData.scannedRoutes.length > 0) {
      // Collect all known paths
      const knownPaths = new Set();
      cloned.forEach((n) => {
        knownPaths.add(n.path);
        n.subpages?.forEach((sp) => knownPaths.add(sp.path));
      });

      // Find any route not yet mapped
      liveData.scannedRoutes.forEach((scanned) => {
        if (!knownPaths.has(scanned.route)) {
          // Check if it belongs as a subpage of an existing parent (e.g. /projects/something)
          const segments = scanned.route.split('/').filter(Boolean);
          const parentPath = segments.length > 1 ? `/${segments[0]}` : null;
          const parentNode = parentPath ? cloned.find((n) => n.path === parentPath) : null;

          const newSub = {
            id: `auto-${scanned.route.replace(/[^a-zA-Z0-9]/g, '-')}`,
            name: segments[segments.length - 1]
              .replace(/[-_]/g, ' ')
              .replace(/\b\w/g, (c) => c.toUpperCase()),
            path: scanned.route,
            type: 'subpage',
            category: parentNode?.category || 'core',
            status: 'dev',
            statusLabel: 'Auto-Discovered',
            file: scanned.file,
            description: 'Newly detected Next.js route in codebase. Automatically registered by live scanner.',
          };

          if (parentNode) {
            if (!parentNode.subpages) parentNode.subpages = [];
            parentNode.subpages.push(newSub);
          } else {
            // New top-level route
            cloned.push({
              ...newSub,
              type: 'page',
              sections: [],
              cmsConnections: [],
            });
          }
          knownPaths.add(scanned.route);
        }
      });
    }

    return cloned;
  }, [liveData]);

  // Copy route helper
  const handleCopy = (path, e) => {
    e?.stopPropagation();
    navigator.clipboard?.writeText(path);
    setCopiedPath(path);
    setTimeout(() => setCopiedPath(null), 2000);
  };

  // Filtered nodes
  const filteredNodes = useMemo(() => {
    return siteStructure.filter((node) => {
      // Category filter
      if (selectedCategory !== 'all' && node.category !== selectedCategory) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = node.name.toLowerCase().includes(q);
        const matchesPath = node.path.toLowerCase().includes(q);
        const matchesDesc = node.description?.toLowerCase().includes(q);
        const matchesSubpages = node.subpages?.some(
          (sp) => sp.name.toLowerCase().includes(q) || sp.path.toLowerCase().includes(q)
        );
        const matchesSections = node.sections?.some(
          (s) => s.name.toLowerCase().includes(q) || s.detail.toLowerCase().includes(q)
        );
        const matchesCMS = node.cmsConnections?.some((c) => c.name.toLowerCase().includes(q));

        return matchesName || matchesPath || matchesDesc || matchesSubpages || matchesSections || matchesCMS;
      }
      return true;
    });
  }, [siteStructure, searchQuery, selectedCategory]);

  // Statistics
  const stats = useMemo(() => {
    let totalRoutes = 0;
    let subroutesCount = 0;
    let cmsConnectionsCount = 0;

    siteStructure.forEach((node) => {
      totalRoutes += 1;
      if (node.subpages) {
        subroutesCount += node.subpages.length;
      }
      if (node.cmsConnections) {
        cmsConnectionsCount += node.cmsConnections.length;
      }
    });

    return {
      primaryRoutes: siteStructure.length,
      subroutes: subroutesCount,
      totalPaths: totalRoutes + subroutesCount,
      cmsCount: BASE_CMS_COLLECTIONS.length,
      publishedPostsCount: liveData?.publishedPosts?.length || 0,
    };
  }, [siteStructure, liveData]);

  return (
    <div className={styles.container}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.topNavRow}>
          <Link href="/admin" className={styles.backLink}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="15 18 9 12 15 6" />
            </svg>
            Dashboard
          </Link>
          <span className={styles.breadcrumbSeparator}>/</span>
          <span className={styles.breadcrumbCurrent}>Site Architecture & Map</span>
        </div>

        <div className={styles.headerMain}>
          <div className={styles.titleArea}>
            <div className={styles.badgeRow}>
              {syncStatus === 'live' ? (
                <span className={styles.badgeLive} title="Live sync connected: real-time filesystem & Payload CMS auto-discovery">
                  <span className={styles.badgeLiveDot} />
                  Auto-Sync Active
                </span>
              ) : (
                <span className={styles.badgePill}>
                  <span className={styles.badgeDot} />
                  Site Architecture
                </span>
              )}
              <span className={styles.badgeSecondary}>Next.js App Router + Payload CMS v3</span>
              <span className={styles.badgeSecondary}>Obsidian Noir</span>
            </div>
            <h1 className={styles.title}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="2">
                <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" />
                <line x1="8" y1="2" x2="8" y2="18" />
                <line x1="16" y1="6" x2="16" y2="22" />
              </svg>
              Site Architecture & Visual Map
            </h1>
            <p className={styles.subtitle}>
              Visual map of vonporat.com. Auto-discovers newly created Next.js routes, dynamically lists
              published CMS articles, and maps Payload CMS collection dependencies in real-time.
            </p>
          </div>

          <div className={styles.headerActions}>
            <button
              type="button"
              className={styles.actionBtn}
              onClick={performScan}
              disabled={isSyncing}
              title="Re-scan codebase and CMS collections for newly added pages"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                style={{ animation: isSyncing ? 'spin 1s linear infinite' : 'none' }}
              >
                <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
              </svg>
              {isSyncing ? 'Scanning...' : 'Rescan Routes'}
            </button>
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.actionBtn} ${styles.actionBtnPrimary}`}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
              Visit Live Site ↗
            </a>
          </div>
        </div>
      </header>

      {/* Stats Ribbon */}
      <section className={styles.statsRibbon} aria-label="Website Architecture Metrics">
        <div className={styles.statCard}>
          <span className={styles.statLabel}>Primary Routes</span>
          <span className={styles.statValue}>{stats.primaryRoutes}</span>
          <span className={styles.statMeta}>Top-level navigation destinations</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statLabel}>Subpages & Articles</span>
          <span className={styles.statValue}>{stats.subroutes}</span>
          <span className={styles.statMeta}>
            {stats.publishedPostsCount > 0 ? `${stats.publishedPostsCount} CMS posts live` : 'Case studies & subroutes'}
          </span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statLabel}>CMS Collections & Globals</span>
          <span className={styles.statValue}>{stats.cmsCount}</span>
          <span className={styles.statMeta}>Posts, Gallery, Media, Settings</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statLabel}>Auto-Discovery</span>
          <span className={styles.statValue} style={{ color: '#4ade80' }}>
            {syncStatus === 'live' ? 'Dynamic' : 'Curated'}
          </span>
          <span className={styles.statMeta}>Filesystem & CMS live scan</span>
        </div>
      </section>

      {/* Controls Bar */}
      <section className={styles.controlsBar}>
        <div className={styles.viewModeTabs}>
          <button
            type="button"
            className={`${styles.tabBtn} ${viewMode === 'tree' ? styles.tabBtnActive : ''}`}
            onClick={() => setViewMode('tree')}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="6" y1="3" x2="6" y2="15" />
              <circle cx="18" cy="6" r="3" />
              <circle cx="6" cy="18" r="3" />
              <path d="M18 9a9 9 0 0 1-9 9" />
            </svg>
            Tree View
          </button>
          <button
            type="button"
            className={`${styles.tabBtn} ${viewMode === 'grid' ? styles.tabBtnActive : ''}`}
            onClick={() => setViewMode('grid')}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="7" height="7" rx="1" />
              <rect x="14" y="3" width="7" height="7" rx="1" />
              <rect x="14" y="14" width="7" height="7" rx="1" />
              <rect x="3" y="14" width="7" height="7" rx="1" />
            </svg>
            Grid Cards
          </button>
          <button
            type="button"
            className={`${styles.tabBtn} ${viewMode === 'matrix' ? styles.tabBtnActive : ''}`}
            onClick={() => setViewMode('matrix')}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <ellipse cx="12" cy="5" rx="9" ry="3" />
              <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
              <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
            </svg>
            CMS & Data Flow
          </button>
        </div>

        <div className={styles.filterControls}>
          <div className={styles.searchBox}>
            <svg className={styles.searchIcon} width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              placeholder="Filter routes, sections, CMS collections..."
              className={styles.searchInput}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <select
            className={styles.categorySelect}
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="all">All Categories</option>
            <option value="core">Core (Home)</option>
            <option value="projects">Projects & Case Studies</option>
            <option value="music">Music & Discography</option>
            <option value="art">Art & Visual Practice</option>
            <option value="editorial">Blog & Journal</option>
            <option value="about">About Patrik</option>
            <option value="contact">Contact</option>
            <option value="system">System & Admin</option>
          </select>
        </div>
      </section>

      {/* Category Chips Bar */}
      <div className={styles.chipsRow}>
        {[
          { id: 'all', label: 'All Routes' },
          { id: 'core', label: 'Core (Home)' },
          { id: 'projects', label: 'Projects & Case Studies' },
          { id: 'music', label: 'Music' },
          { id: 'art', label: 'Art & Gallery' },
          { id: 'editorial', label: 'Blog / Journal' },
          { id: 'about', label: 'About' },
          { id: 'contact', label: 'Contact' },
          { id: 'system', label: 'System & Admin' },
        ].map((chip) => (
          <button
            key={chip.id}
            type="button"
            className={`${styles.chip} ${selectedCategory === chip.id ? styles.chipActive : ''}`}
            onClick={() => setSelectedCategory(chip.id)}
          >
            {chip.label}
          </button>
        ))}
      </div>

      {/* VIEW 1: TREE VIEW */}
      {viewMode === 'tree' && (
        <div className={styles.treeContainer}>
          {/* Root Card */}
          <div className={styles.rootNodeCard}>
            <div className={styles.rootNodeLeft}>
              <div className={styles.rootIconBox}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
              </div>
              <div>
                <h2 className={styles.rootTitle}>
                  vonporat.com
                  <span className={styles.rootUrlBadge}>Root /</span>
                </h2>
                <p className={styles.rootDesc}>
                  Patrik von Porat — guitarist, visual artist and systems-minded creator. One identity. Many expressions.
                </p>
              </div>
            </div>

            <div className={styles.rootNodeRight}>
              <span className={`${styles.nodeStatusBadge} ${styles.statusLive}`}>
                Production: Vercel
              </span>
              <a
                href="/"
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.smallBtn} ${styles.smallBtnCyan}`}
              >
                Visit Live ↗
              </a>
            </div>
          </div>

          {/* Branches (Grid of primary nodes) */}
          <div className={styles.branchesWrapper}>
            {filteredNodes.map((node) => {
              const isSelected = selectedNode?.id === node.id;
              const hasSubpages = node.subpages && node.subpages.length > 0;
              const hasCMS = node.cmsConnections && node.cmsConnections.length > 0;

              return (
                <div
                  key={node.id}
                  className={`${styles.nodeCard} ${isSelected ? styles.nodeCardSelected : ''}`}
                  onClick={() => setSelectedNode(node)}
                >
                  <div className={styles.nodeHeader}>
                    <div className={styles.nodeInfo}>
                      <div className={styles.nodeIconBox}>
                        {node.id === 'home' && (
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="2">
                            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                          </svg>
                        )}
                        {node.id === 'projects' && (
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="2">
                            <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                            <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                          </svg>
                        )}
                        {node.id === 'music' && (
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="2">
                            <path d="M9 18V5l12-2v13" />
                            <circle cx="6" cy="18" r="3" />
                            <circle cx="18" cy="16" r="3" />
                          </svg>
                        )}
                        {node.id === 'art' && (
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f472b6" strokeWidth="2">
                            <circle cx="12" cy="12" r="10" />
                            <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                            <path d="M2 12h20" />
                          </svg>
                        )}
                        {node.id === 'gallery' && (
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#c084fc" strokeWidth="2">
                            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                            <circle cx="8.5" cy="8.5" r="1.5" />
                            <polyline points="21 15 16 10 5 21" />
                          </svg>
                        )}
                        {node.id === 'blog' && (
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#e879f9" strokeWidth="2">
                            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                          </svg>
                        )}
                        {node.id === 'about' && (
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="2">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                            <circle cx="12" cy="7" r="4" />
                          </svg>
                        )}
                        {node.id === 'contact' && (
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2">
                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                            <polyline points="22,6 12,13 2,6" />
                          </svg>
                        )}
                        {node.id === 'admin' && (
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#a1a1aa" strokeWidth="2">
                            <circle cx="12" cy="12" r="3" />
                            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                          </svg>
                        )}
                        {!['home', 'projects', 'music', 'art', 'gallery', 'blog', 'about', 'contact', 'admin'].includes(node.id) && (
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2">
                            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                          </svg>
                        )}
                      </div>
                      <div className={styles.nodeHeadingGroup}>
                        <h3 className={styles.nodeTitle}>{node.name}</h3>
                        <span className={styles.nodePathPill}>
                          {node.path}
                          <button
                            type="button"
                            title="Copy path"
                            onClick={(e) => handleCopy(node.path, e)}
                            style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', color: 'inherit' }}
                          >
                            {copiedPath === node.path ? '✓' : '⧉'}
                          </button>
                        </span>
                      </div>
                    </div>

                    <span
                      className={`${styles.nodeStatusBadge} ${
                        node.status === 'locked'
                          ? styles.statusLocked
                          : node.status === 'cms'
                          ? styles.statusCms
                          : node.status === 'live'
                          ? styles.statusLive
                          : node.status === 'dev'
                          ? styles.statusDev
                          : styles.statusInternal
                      }`}
                    >
                      {node.statusLabel}
                    </span>
                  </div>

                  <p className={styles.nodeDescription}>{node.description}</p>

                  {/* Subpages / Case Studies if any */}
                  {hasSubpages && (
                    <div className={styles.subpagesContainer}>
                      <span className={styles.subpagesHeader}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polyline points="9 18 15 12 9 6" />
                        </svg>
                        Subpages & Articles ({node.subpages.length}):
                      </span>
                      {node.subpages.map((sp) => (
                        <div key={sp.id} className={styles.subpageItem}>
                          <div className={styles.subpageTop}>
                            <span className={styles.subpageName}>{sp.name}</span>
                            <span className={styles.subpagePath}>{sp.path}</span>
                          </div>
                          <p className={styles.subpageDesc}>{sp.description}</p>
                          <div style={{ display: 'flex', gap: '0.4rem', marginTop: '0.25rem' }}>
                            <a
                              href={sp.path.replace('[slug]', 'sample')}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={styles.smallBtn}
                              style={{ fontSize: '10.5px', padding: '2px 6px' }}
                            >
                              Visit Live ↗
                            </a>
                            <button
                              type="button"
                              onClick={(e) => handleCopy(sp.path, e)}
                              className={styles.smallBtn}
                              style={{ fontSize: '10.5px', padding: '2px 6px' }}
                            >
                              {copiedPath === sp.path ? 'Copied!' : 'Copy Route'}
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Key Sections Accordion / Preview */}
                  {node.sections && node.sections.length > 0 && (
                    <div className={styles.sectionsContainer}>
                      <div className={styles.sectionsHeader}>
                        <span>Key Sections & Architecture</span>
                        <span>{node.sections.length} parts</span>
                      </div>
                      <ul className={styles.sectionsList}>
                        {node.sections.slice(0, 4).map((sec, idx) => (
                          <li key={idx} className={styles.sectionItem}>
                            <span className={styles.sectionDot} />
                            <div>
                              <strong style={{ color: '#ffffff' }}>{sec.name}</strong>
                              {sec.anchor && (
                                <span style={{ fontFamily: 'monospace', color: '#7dd3fc', marginLeft: '6px' }}>
                                  {sec.anchor}
                                </span>
                              )}
                              <span style={{ color: '#a1a1aa', marginLeft: '4px' }}>— {sec.detail}</span>
                            </div>
                          </li>
                        ))}
                        {node.sections.length > 4 && (
                          <li style={{ fontSize: '11px', color: '#71717a', fontStyle: 'italic', paddingLeft: '8px' }}>
                            + {node.sections.length - 4} additional sections... (click to inspect)
                          </li>
                        )}
                      </ul>
                    </div>
                  )}

                  {/* CMS Connections */}
                  {hasCMS && (
                    <div className={styles.cmsConnectionRow}>
                      <span className={styles.cmsLabel}>CMS Connections:</span>
                      {node.cmsConnections.map((cms, idx) => (
                        <Link key={idx} href={cms.link} className={styles.cmsPill} title={cms.desc}>
                          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <ellipse cx="12" cy="5" rx="9" ry="3" />
                            <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
                          </svg>
                          {cms.name}
                        </Link>
                      ))}
                    </div>
                  )}

                  {/* Footer & Actions */}
                  <div className={styles.nodeFooter}>
                    <span className={styles.nodeFilePath} title={node.file}>
                      📄 {node.file || 'Dynamic route'}
                    </span>
                    <div className={styles.nodeActionButtons}>
                      <button
                        type="button"
                        className={styles.smallBtn}
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedNode(node);
                        }}
                      >
                        Inspect
                      </button>
                      {node.type !== 'admin' && (
                        <a
                          href={node.path}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`${styles.smallBtn} ${styles.smallBtnCyan}`}
                          onClick={(e) => e.stopPropagation()}
                        >
                          Open ↗
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* VIEW 2: GRID CARDS VIEW */}
      {viewMode === 'grid' && (
        <div className={styles.gridWrapper}>
          {filteredNodes.map((node) => (
            <div
              key={node.id}
              className={styles.nodeCard}
              style={{ cursor: 'pointer' }}
              onClick={() => setSelectedNode(node)}
            >
              <div className={styles.nodeHeader}>
                <div>
                  <h3 className={styles.nodeTitle}>{node.name}</h3>
                  <span className={styles.nodePathPill}>{node.path}</span>
                </div>
                <span
                  className={`${styles.nodeStatusBadge} ${
                    node.status === 'locked' ? styles.statusLocked : styles.statusCms
                  }`}
                >
                  {node.statusLabel}
                </span>
              </div>

              <p className={styles.nodeDescription}>{node.description}</p>

              <div className={styles.sectionsContainer}>
                <div className={styles.sectionsHeader}>
                  <span>Content Summary</span>
                  <span>{node.sections?.length || 0} parts</span>
                </div>
                <ul className={styles.sectionsList}>
                  {node.sections?.map((sec, idx) => (
                    <li key={idx} className={styles.sectionItem}>
                      <span className={styles.sectionDot} />
                      <span>
                        <strong style={{ color: '#f4f4f5' }}>{sec.name}:</strong> {sec.detail}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {node.cmsConnections?.length > 0 && (
                <div className={styles.cmsConnectionRow}>
                  <span className={styles.cmsLabel}>CMS:</span>
                  {node.cmsConnections.map((cms, i) => (
                    <Link key={i} href={cms.link} className={styles.cmsPill} onClick={(e) => e.stopPropagation()}>
                      {cms.name}
                    </Link>
                  ))}
                </div>
              )}

              <div className={styles.nodeFooter}>
                <span className={styles.nodeFilePath}>{node.file || 'Dynamic'}</span>
                <a
                  href={node.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${styles.smallBtn} ${styles.smallBtnCyan}`}
                  onClick={(e) => e.stopPropagation()}
                >
                  Live ↗
                </a>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* VIEW 3: CMS & DATA MATRIX VIEW */}
      {viewMode === 'matrix' && (
        <div className={styles.matrixContainer}>
          <div className={styles.matrixCard}>
            <div className={styles.matrixHeader}>
              <div className={styles.matrixTitleGroup}>
                <div className={styles.matrixIcon}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <ellipse cx="12" cy="5" rx="9" ry="3" />
                    <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
                    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
                  </svg>
                </div>
                <div>
                  <h3 className={styles.matrixTitle}>Payload CMS Collections & Data Flow</h3>
                  <span style={{ fontSize: '12px', color: '#a1a1aa' }}>
                    How database collections and globals power public-facing frontend routes
                  </span>
                </div>
              </div>
              <span className={styles.badgeSecondary}>
                {BASE_CMS_COLLECTIONS.length} Registered Collections
              </span>
            </div>

            <div className={styles.matrixTableWrapper}>
              <table className={styles.matrixTable}>
                <thead>
                  <tr>
                    <th>CMS Collection / Global</th>
                    <th>Type</th>
                    <th>Target Frontend Routes</th>
                    <th>Scope & Governance</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {BASE_CMS_COLLECTIONS.map((col, idx) => (
                    <tr key={idx}>
                      <td>
                        <div className={styles.matrixCollectionName}>
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polygon points="12 2 2 7 12 12 22 7 12 2" />
                            <polyline points="2 17 12 22 22 17" />
                            <polyline points="2 12 12 17 22 12" />
                          </svg>
                          {col.name}
                          <span style={{ fontSize: '11px', color: '#71717a' }}>({col.slug})</span>
                        </div>
                      </td>
                      <td>
                        <span className={styles.matrixTypeBadge}>{col.type}</span>
                      </td>
                      <td>
                        <div className={styles.matrixTargetRoutes}>
                          {col.routes.map((r, ri) => (
                            <span key={ri} className={styles.matrixRoutePill}>
                              {r}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td style={{ color: '#d4d4d8', maxWidth: '380px' }}>
                        <div>{col.description}</div>
                        <div style={{ fontSize: '11.5px', color: '#71717a', marginTop: '3px' }}>{col.scope}</div>
                      </td>
                      <td>
                        <Link href={col.editLink} className={`${styles.smallBtn} ${styles.smallBtnCyan}`}>
                          Manage in CMS ↗
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* INSPECT DRAWER / MODAL */}
      {selectedNode && (
        <div className={styles.drawerOverlay} onClick={() => setSelectedNode(null)}>
          <div className={styles.drawerContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.drawerHeader}>
              <div>
                <span className={styles.badgePill}>{(selectedNode.category || 'ROUTE').toUpperCase()}</span>
                <h2 style={{ margin: '0.4rem 0 0 0', fontSize: '1.4rem', color: '#ffffff' }}>
                  {selectedNode.name}
                </h2>
                <span className={styles.nodePathPill} style={{ marginTop: '0.35rem' }}>
                  {selectedNode.path}
                </span>
              </div>
              <button
                type="button"
                className={styles.drawerCloseBtn}
                onClick={() => setSelectedNode(null)}
                title="Close"
              >
                ✕
              </button>
            </div>

            <div className={styles.drawerBody}>
              <div className={styles.drawerSection}>
                <span className={styles.drawerSectionTitle}>Description & Purpose</span>
                <p style={{ margin: 0, fontSize: '13.5px', lineHeight: 1.6, color: '#d4d4d8' }}>
                  {selectedNode.description}
                </p>
              </div>

              {selectedNode.file && (
                <div className={styles.drawerSection}>
                  <span className={styles.drawerSectionTitle}>Source File (Next.js App Router)</span>
                  <div className={styles.drawerCodeBox}>{selectedNode.file}</div>
                </div>
              )}

              <div className={styles.drawerSection}>
                <span className={styles.drawerSectionTitle}>Governance & Status</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span className={`${styles.nodeStatusBadge} ${styles.statusLocked}`}>
                    {selectedNode.statusLabel}
                  </span>
                  <span style={{ fontSize: '12px', color: '#a1a1aa' }}>
                    {selectedNode.status === 'locked'
                      ? 'Approved and locked in AGENTS.md — composition and copy preserved.'
                      : 'CMS-driven or dynamically detected route.'}
                  </span>
                </div>
              </div>

              {selectedNode.subpages && selectedNode.subpages.length > 0 && (
                <div className={styles.drawerSection}>
                  <span className={styles.drawerSectionTitle}>Subpages & Articles</span>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {selectedNode.subpages.map((sp) => (
                      <div key={sp.id} className={styles.subpageItem}>
                        <div className={styles.subpageTop}>
                          <span className={styles.subpageName}>{sp.name}</span>
                          <span className={styles.subpagePath}>{sp.path}</span>
                        </div>
                        <p className={styles.subpageDesc}>{sp.description}</p>
                        {sp.file && (
                          <span style={{ fontSize: '10.5px', fontFamily: 'monospace', color: '#71717a' }}>
                            📄 {sp.file}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {selectedNode.sections && selectedNode.sections.length > 0 && (
                <div className={styles.drawerSection}>
                  <span className={styles.drawerSectionTitle}>All Sections & Anchors</span>
                  <ul className={styles.sectionsList} style={{ gap: '0.5rem' }}>
                    {selectedNode.sections.map((sec, idx) => (
                      <li key={idx} className={styles.sectionItem} style={{ background: 'rgba(255,255,255,0.02)', padding: '6px 8px', borderRadius: '4px' }}>
                        <span className={styles.sectionDot} style={{ background: '#38bdf8' }} />
                        <div>
                          <strong style={{ color: '#ffffff' }}>{sec.name}</strong>
                          {sec.anchor && (
                            <span style={{ fontFamily: 'monospace', color: '#7dd3fc', marginLeft: '6px' }}>
                              {sec.anchor}
                            </span>
                          )}
                          <div style={{ fontSize: '12px', color: '#a1a1aa', marginTop: '2px' }}>
                            {sec.detail}
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {selectedNode.cmsConnections && selectedNode.cmsConnections.length > 0 && (
                <div className={styles.drawerSection}>
                  <span className={styles.drawerSectionTitle}>CMS Connections</span>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {selectedNode.cmsConnections.map((cms, idx) => (
                      <div key={idx} style={{ background: 'rgba(168,85,247,0.06)', border: '1px solid rgba(168,85,247,0.2)', padding: '8px 10px', borderRadius: '6px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <span style={{ fontWeight: 600, color: '#d8b4fe', fontSize: '13px' }}>
                            {cms.name} ({cms.slug})
                          </span>
                          <Link href={cms.link} className={styles.smallBtn} style={{ fontSize: '11px' }}>
                            Open Collection ↗
                          </Link>
                        </div>
                        <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: '#c4b5fd' }}>
                          {cms.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className={styles.drawerActions}>
                {selectedNode.type !== 'admin' && (
                  <a
                    href={selectedNode.path}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${styles.actionBtn} ${styles.actionBtnPrimary}`}
                    style={{ flex: 1, justifyContent: 'center' }}
                  >
                    Visit Live Page ↗
                  </a>
                )}
                <button
                  type="button"
                  className={styles.actionBtn}
                  onClick={(e) => handleCopy(selectedNode.path, e)}
                  style={{ flex: 1, justifyContent: 'center' }}
                >
                  {copiedPath === selectedNode.path ? '✓ Route Copied!' : 'Copy Route Path'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SitemapView;
