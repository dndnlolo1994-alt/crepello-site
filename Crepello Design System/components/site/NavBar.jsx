import React from 'react';
import { Button } from '../core/Button.jsx';

/**
 * Crepello glass nav. Sticky, blurred scrim. Wordmark left, links center,
 * language toggle + Order right. Mirrors automatically under [dir="rtl"].
 */
export function NavBar({
  links = [
    { label: 'Menu', href: '#menu' },
    { label: 'Atelier', href: '#atelier' },
    { label: 'Franchise', href: '#franchise' },
  ],
  lang = 'EN',
  onToggleLang,
  onOrder,
  style,
}) {
  return (
    <header
      style={{
        position: 'sticky', top: 0, zIndex: 50,
        background: 'var(--scrim)',
        backdropFilter: 'blur(var(--blur-md))',
        WebkitBackdropFilter: 'blur(var(--blur-md))',
        borderBottom: '1px solid var(--border-subtle)',
        ...style,
      }}
    >
      <nav style={{
        maxWidth: 'var(--content-wide)', margin: '0 auto',
        padding: '0.9rem var(--gutter)',
        display: 'flex', alignItems: 'center', gap: 'var(--space-6)',
      }}>
        <a href="#top" style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)', fontWeight: 'var(--fw-medium)', color: 'var(--text-strong)', letterSpacing: '0.01em', textDecoration: 'none' }}>
          Crepello<span style={{ color: 'var(--accent)' }}>.</span>
        </a>

        <ul style={{ display: 'flex', gap: 'var(--space-6)', listStyle: 'none', margin: 0, padding: 0, marginInline: 'auto' }}>
          {links.map((l) => (
            <li key={l.label}>
              <a
                href={l.href}
                style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', color: 'var(--text-muted)', textDecoration: 'none', letterSpacing: '0.02em', transition: 'color var(--dur-fast) var(--ease-out)' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent-soft)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
              >{l.label}</a>
            </li>
          ))}
        </ul>

        <button
          onClick={onToggleLang}
          aria-label="Toggle language"
          style={{
            fontFamily: 'var(--font-mono)', fontSize: 'var(--text-2xs)', letterSpacing: '0.1em',
            color: 'var(--text-muted)', background: 'transparent',
            border: '1px solid var(--border-default)', borderRadius: 'var(--radius-pill)',
            padding: '0.4rem 0.7rem', cursor: 'pointer',
          }}
        >
          {lang === 'EN' ? 'ع' : 'EN'}
        </button>

        <Button size="sm" onClick={onOrder}>Order</Button>
      </nav>
    </header>
  );
}
