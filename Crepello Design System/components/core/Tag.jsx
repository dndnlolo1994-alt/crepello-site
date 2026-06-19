import React from 'react';

/**
 * Small tracked label. Use `tone` for dessert/savory menu tagging and `outline`
 * for a quieter hairline pill. Numbered eyebrows should use <Eyebrow>, not this.
 */
export function Tag({ children, tone = 'neutral', outline = false, style, ...rest }) {
  const tones = {
    neutral: { fg: 'var(--text-muted)', bg: 'rgba(231,222,207,0.06)', bd: 'var(--border-default)' },
    accent:  { fg: 'var(--accent-soft)', bg: 'rgba(198,138,78,0.12)', bd: 'var(--border-accent)' },
    dessert: { fg: '#e88a98', bg: 'rgba(181,72,91,0.14)', bd: 'rgba(181,72,91,0.4)' },
    savory:  { fg: '#aeb38a', bg: 'rgba(110,115,80,0.16)', bd: 'rgba(110,115,80,0.45)' },
  };
  const t = tones[tone] || tones.neutral;
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.4em',
        fontFamily: 'var(--font-mono)',
        fontSize: 'var(--text-2xs)',
        letterSpacing: 'var(--ls-caps)',
        textTransform: 'uppercase',
        color: t.fg,
        background: outline ? 'transparent' : t.bg,
        border: `1px solid ${t.bd}`,
        padding: '0.34em 0.7em',
        borderRadius: 'var(--radius-pill)',
        lineHeight: 1,
        ...style,
      }}
      {...rest}
    >
      {children}
    </span>
  );
}
