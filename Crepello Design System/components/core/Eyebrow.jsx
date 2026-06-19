import React from 'react';

/**
 * Tracked mono eyebrow with an optional leading number — the Crepello signature
 * section label. e.g. <Eyebrow num="01">Drinks</Eyebrow>
 */
export function Eyebrow({ num, children, color = 'var(--accent)', style, ...rest }) {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'baseline',
        gap: '0.7em',
        fontFamily: 'var(--font-mono)',
        fontSize: 'var(--text-xs)',
        letterSpacing: 'var(--ls-eyebrow)',
        textTransform: 'uppercase',
        color,
        ...style,
      }}
      {...rest}
    >
      {num != null && (
        <span style={{ color: 'var(--accent)' }}>{num}</span>
      )}
      {num != null && <span style={{ color: 'var(--text-faint)' }}>—</span>}
      <span style={{ color: num != null ? 'var(--text-muted)' : color }}>{children}</span>
    </span>
  );
}
