import React from 'react';
import Link from 'next/link';

export default function CtaButton({
  href,
  onClick,
  children,
  className = '',
  variant = 'primary',
  target,
  rel,
  ariaLabel,
  ...props
}) {
  const isExternal = target === '_blank' || (href && (href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('#')));
  const isSecondary = variant === 'secondary';

  const content = (
    <>
      {/* Layer 1: Atmospheric Bloom */}
      <span className={`aurora-cta-bloom ${isSecondary ? 'aurora-cta-bloom--secondary' : ''}`} aria-hidden="true" />

      {/* Layer 2: Base Surface Background & Base Border */}
      <span className={`aurora-cta-surface ${isSecondary ? 'aurora-cta-surface--secondary' : ''}`} aria-hidden="true" />

      {/* Layer 3: Aurora Orbit Light Sweep Border */}
      <span className={`aurora-cta-border-orbit ${isSecondary ? 'aurora-cta-border-orbit--secondary' : ''}`} aria-hidden="true" />

      {/* Content */}
      <span className="relative z-[3] flex items-center justify-center gap-2">
        {children}
      </span>
    </>
  );

  const variantClass = isSecondary ? 'aurora-cta-btn--secondary btn-secondary' : 'aurora-cta-btn--primary btn-primary';
  const focusRing = isSecondary ? 'focus-visible:ring-accent-purple' : 'focus-visible:ring-accent-cyan';

  const baseClasses = `aurora-cta-btn ${variantClass} group relative inline-flex items-center justify-center rounded-full text-white font-semibold uppercase tracking-wider font-mono text-center backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.3)] transition-premium isolate overflow-visible hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-none focus-visible:ring-1 ${focusRing} focus-visible:ring-offset-2 focus-visible:ring-offset-obsidian-950 ${className}`;

  if (!href) {
    return (
      <button
        type={props.type || 'button'}
        onClick={onClick}
        aria-label={ariaLabel}
        className={baseClasses}
        {...props}
      >
        {content}
      </button>
    );
  }

  if (isExternal) {
    return (
      <a
        href={href}
        onClick={onClick}
        target={target}
        rel={rel || (target === '_blank' ? 'noopener noreferrer' : undefined)}
        aria-label={ariaLabel}
        className={baseClasses}
        {...props}
      >
        {content}
      </a>
    );
  }

  return (
    <Link
      href={href}
      onClick={onClick}
      aria-label={ariaLabel}
      className={baseClasses}
      {...props}
    >
      {content}
    </Link>
  );
}
