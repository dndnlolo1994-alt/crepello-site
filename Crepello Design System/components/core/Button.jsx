import React from 'react';

/**
 * Crepello primary action. Editorial, calm motion. Caramel fill is the single
 * "loud" moment in the system — use one primary per view.
 */
export function Button({
  children,
  variant = 'primary',   // 'primary' | 'secondary' | 'ghost'
  size = 'md',           // 'sm' | 'md' | 'lg'
  href,
  iconLeft,
  iconRight,
  disabled = false,
  style,
  ...rest
}) {
  const sizes = {
    sm: { padding: '0.5rem 1rem', fontSize: 'var(--text-sm)' },
    md: { padding: '0.75rem 1.5rem', fontSize: 'var(--text-base)' },
    lg: { padding: '1rem 2rem', fontSize: 'var(--text-md)' },
  };

  const variants = {
    primary: {
      background: 'var(--accent)',
      color: 'var(--on-accent)',
      border: '1px solid transparent',
    },
    secondary: {
      background: 'transparent',
      color: 'var(--text-strong)',
      border: '1px solid var(--border-strong)',
    },
    ghost: {
      background: 'transparent',
      color: 'var(--text-strong)',
      border: '1px solid transparent',
    },
  };

  const base = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 'var(--gap-inline)',
    fontFamily: 'var(--font-body)',
    fontWeight: 'var(--fw-semibold)',
    letterSpacing: '0.01em',
    lineHeight: 1,
    borderRadius: 'var(--radius-pill)',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.45 : 1,
    textDecoration: 'none',
    transition: 'transform var(--dur-fast) var(--ease-out), background var(--dur-fast) var(--ease-out), border-color var(--dur-fast) var(--ease-out), color var(--dur-fast) var(--ease-out)',
    whiteSpace: 'nowrap',
    ...sizes[size],
    ...variants[variant],
    ...style,
  };

  const hover = (e, on) => {
    if (disabled) return;
    const el = e.currentTarget;
    if (variant === 'primary') {
      el.style.background = on ? 'var(--accent-hover)' : 'var(--accent)';
      el.style.transform = on ? 'translateY(-1px)' : 'none';
    } else if (variant === 'secondary') {
      el.style.borderColor = on ? 'var(--border-accent)' : 'var(--border-strong)';
      el.style.color = on ? 'var(--accent-soft)' : 'var(--text-strong)';
    } else {
      el.style.color = on ? 'var(--accent-soft)' : 'var(--text-strong)';
    }
  };
  const press = (e, on) => {
    if (disabled || variant !== 'primary') return;
    e.currentTarget.style.background = on ? 'var(--accent-press)' : 'var(--accent-hover)';
  };

  const Tag = href && !disabled ? 'a' : 'button';
  const tagProps = Tag === 'a'
    ? { href }
    : { type: 'button', disabled };

  return (
    <Tag
      {...tagProps}
      style={base}
      onMouseEnter={(e) => hover(e, true)}
      onMouseLeave={(e) => { hover(e, false); press(e, false); }}
      onMouseDown={(e) => press(e, true)}
      onMouseUp={(e) => press(e, false)}
      {...rest}
    >
      {iconLeft}
      {children}
      {iconRight}
    </Tag>
  );
}
