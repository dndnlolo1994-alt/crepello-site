import React from 'react';

/** Dark text input with hairline border + caramel focus. Label optional. */
export function Input({ label, hint, id, style, type = 'text', ...rest }) {
  const inputId = id || (label ? `in-${label.replace(/\s+/g, '-').toLowerCase()}` : undefined);
  return (
    <label htmlFor={inputId} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      {label && (
        <span style={{
          fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)',
          letterSpacing: 'var(--ls-caps)', textTransform: 'uppercase',
          color: 'var(--text-faint)',
        }}>{label}</span>
      )}
      <input
        id={inputId}
        type={type}
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--text-base)',
          color: 'var(--text-strong)',
          background: 'var(--surface)',
          border: '1px solid var(--border-default)',
          borderRadius: 'var(--radius-md)',
          padding: '0.8rem 1rem',
          outline: 'none',
          transition: 'border-color var(--dur-fast) var(--ease-out), background var(--dur-fast) var(--ease-out)',
          ...style,
        }}
        onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--border-accent)'; e.currentTarget.style.background = 'var(--surface-raised)'; }}
        onBlur={(e) => { e.currentTarget.style.borderColor = 'var(--border-default)'; e.currentTarget.style.background = 'var(--surface)'; }}
        {...rest}
      />
      {hint && (
        <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', color: 'var(--text-faint)' }}>{hint}</span>
      )}
    </label>
  );
}
