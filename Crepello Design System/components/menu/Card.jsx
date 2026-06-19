import React from 'react';

/**
 * Generic dark surface card — hairline border, tight radius, generous padding.
 * Leans on border + surface tint over shadow. Use `as` to render a link.
 */
export function Card({ children, padding = 'var(--pad-card)', raised = false, as = 'div', style, ...rest }) {
  const El = as;
  return (
    <El
      style={{
        background: raised ? 'var(--surface-raised)' : 'var(--surface-card)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-md)',
        padding,
        boxShadow: raised ? 'var(--shadow-md)' : 'none',
        transition: 'border-color var(--dur-med) var(--ease-out)',
        ...style,
      }}
      {...rest}
    >
      {children}
    </El>
  );
}
