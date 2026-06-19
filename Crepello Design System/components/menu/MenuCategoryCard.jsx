import React from 'react';

/**
 * Signature menu-category tile: numbered label (01–04), full-bleed warm image,
 * protection gradient, and a hover that zooms the image + reveals a one-line
 * description. Equal-height friendly (fixed aspect). Pass `image` (URL) or it
 * falls back to a warm espresso→caramel placeholder.
 */
export function MenuCategoryCard({
  num, title, titleAr, desc, image, href = '#', tone = 'neutral', style, ...rest
}) {
  const [hover, setHover] = React.useState(false);

  const accents = {
    neutral: 'var(--accent)',
    dessert: '#e88a98',
    savory: '#aeb38a',
  };
  const accent = accents[tone] || accents.neutral;

  return (
    <a
      href={href}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: 'relative',
        display: 'block',
        aspectRatio: '3 / 4',
        borderRadius: 'var(--radius-md)',
        overflow: 'hidden',
        border: `1px solid ${hover ? 'var(--border-strong)' : 'var(--border-subtle)'}`,
        textDecoration: 'none',
        transition: 'border-color var(--dur-med) var(--ease-out)',
        ...style,
      }}
      {...rest}
    >
      {/* Image / placeholder */}
      <div
        style={{
          position: 'absolute', inset: 0,
          background: !image
            ? 'radial-gradient(120% 90% at 70% 15%, #5a3a1f 0%, #2a1c10 48%, #0b0807 100%)'
            : /gradient/.test(image)
              ? image
              : `center/cover no-repeat url("${image}")`,
          transform: hover ? 'scale(1.06)' : 'scale(1)',
          transition: 'transform var(--dur-slow) var(--ease-out)',
        }}
      />
      {/* Protection gradient */}
      <div style={{ position: 'absolute', inset: 0, background: 'var(--img-overlay)' }} />

      {/* Top: number */}
      <div style={{ position: 'absolute', top: 'var(--space-5)', left: 'var(--space-5)', zIndex: 2 }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-sm)', color: accent, letterSpacing: '0.08em' }}>{num}</span>
      </div>

      {/* Bottom: title + reveal */}
      <div style={{ position: 'absolute', left: 'var(--space-5)', right: 'var(--space-5)', bottom: 'var(--space-5)', zIndex: 2 }}>
        {titleAr && (
          <span style={{ fontFamily: 'var(--font-ar-display)', fontSize: 'var(--text-base)', color: 'var(--text-faint)', display: 'block', marginBottom: '0.2em' }}>{titleAr}</span>
        )}
        <h3 style={{ fontFamily: 'var(--font-display)', color: 'var(--text-strong)', fontSize: 'var(--text-xl)', lineHeight: 1.1, margin: 0 }}>{title}</h3>
        {desc && (
          <p style={{
            fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', color: 'var(--text-muted)',
            margin: '0.5em 0 0', maxWidth: '34ch',
            maxHeight: hover ? '4em' : '0',
            opacity: hover ? 1 : 0,
            overflow: 'hidden',
            transform: hover ? 'translateY(0)' : 'translateY(6px)',
            transition: 'opacity var(--dur-med) var(--ease-out), transform var(--dur-med) var(--ease-out), max-height var(--dur-med) var(--ease-out)',
          }}>{desc}</p>
        )}
        <span style={{
          display: 'inline-flex', alignItems: 'center', gap: '0.5em', marginTop: '0.7em',
          fontFamily: 'var(--font-mono)', fontSize: 'var(--text-2xs)', letterSpacing: 'var(--ls-caps)',
          textTransform: 'uppercase', color: accent,
        }}>
          Explore <span aria-hidden style={{ transform: hover ? 'translateX(3px)' : 'none', transition: 'transform var(--dur-med) var(--ease-out)' }}>→</span>
        </span>
      </div>
    </a>
  );
}
