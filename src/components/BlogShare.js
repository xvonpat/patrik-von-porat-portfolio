'use client';

import React, { useState, useEffect } from 'react';

// SVGs
const CopyIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>);
const CheckIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>);
const LinkedInIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>);
const XIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4l11.733 16h4.267l-11.733 -16z" /><path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" /></svg>);
const FacebookIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>);
const EmailIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>);
const ShareIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>);

export default function BlogShare({ title, url }) {
  const [copied, setCopied] = useState(false);
  const [canShare, setCanShare] = useState(false);

  useEffect(() => {
    // Only enable native share if supported
    if (typeof navigator !== 'undefined' && navigator.share) {
      setCanShare(true);
    }
  }, []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  const handleNativeShare = async () => {
    try {
      await navigator.share({
        title: title,
        url: url,
      });
    } catch (err) {
      console.error('Error sharing', err);
    }
  };

  const shareLinks = {
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    email: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`Read this article: ${url}`)}`
  };

  const buttonClass = "flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-white/[0.02] border border-white/10 hover:border-accent-purple/40 hover:bg-white/[0.05] text-zinc-400 hover:text-white transition-all duration-300 text-[10px] font-mono uppercase tracking-widest group";

  return (
    <div className="py-8 my-8 border-t border-white/5">
      <h3 className="text-xs font-mono uppercase tracking-[0.25em] text-zinc-500 mb-6 text-center md:text-left">
        Share this article
      </h3>
      
      <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
        {canShare && (
          <button 
            onClick={handleNativeShare}
            className={`${buttonClass} md:hidden`}
          >
            <ShareIcon /> Share
          </button>
        )}

        <button 
          onClick={handleCopy}
          className={`${buttonClass} ${canShare ? 'hidden md:flex' : 'flex'}`}
        >
          {copied ? (
            <><CheckIcon /> Copied!</>
          ) : (
            <><CopyIcon /> Copy Link</>
          )}
        </button>

        <a 
          href={shareLinks.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className={`${buttonClass} ${canShare ? 'hidden md:flex' : 'flex'}`}
        >
          <LinkedInIcon /> LinkedIn
        </a>

        <a 
          href={shareLinks.twitter}
          target="_blank"
          rel="noopener noreferrer"
          className={`${buttonClass} ${canShare ? 'hidden md:flex' : 'flex'}`}
        >
          <XIcon /> X
        </a>

        <a 
          href={shareLinks.facebook}
          target="_blank"
          rel="noopener noreferrer"
          className={`${buttonClass} ${canShare ? 'hidden md:flex' : 'flex'}`}
        >
          <FacebookIcon /> Facebook
        </a>

        <a 
          href={shareLinks.email}
          className={`${buttonClass} ${canShare ? 'hidden md:flex' : 'flex'}`}
        >
          <EmailIcon /> Email
        </a>
      </div>
    </div>
  );
}
