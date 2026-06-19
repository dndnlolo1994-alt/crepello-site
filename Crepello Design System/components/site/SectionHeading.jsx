import React from 'react';
import { Eyebrow } from '../core/Eyebrow.jsx';

/**
 * Editorial section header: numbered eyebrow + serif heading + optional lead.
 * `align` controls text alignment; lead stays inside a ~46ch measure.
 */
export function SectionHeading({ num, eyebrow, title, lead, align = 'left', as = 'h2', style }) {
  const Heading = as;
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', gap: 'var(--space-4)',
      alignItems: align === 'center' ? 'center' : 'flex-start',
      textAlign: align,
      ...style,
    }}>
      {(eyebrow || num) && <Eyebrow num={num}>{eyebrow}</Eyebrow>}
      <Heading style={{
        fontFamily: 'var(--font-display)', color: 'var(--text-strong)',
        fontSize: 'var(--text-2xl)', lineHeight: 'var(--lh-snug)',
        letterSpacing: 'var(--ls-display)', margin: 0, maxWidth: '18ch',
      }}>{title}</Heading>
      {lead && (
        <p style={{
          fontFamily: 'var(--font-body)', fontSize: 'var(--text-md)',
          color: 'var(--text-muted)', lineHeight: 'var(--lh-relaxed)',
          maxWidth: 'var(--measure-narrow)', margin: 0,
        }}>{lead}</p>
      )}
    </div>
  );
}
