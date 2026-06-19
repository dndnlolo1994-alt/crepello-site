import React from 'react';

/**
 * Subtle hero scroll cue — tracked label + a slow drifting line. Calm, no bounce;
 * the drift stills under prefers-reduced-motion (handled via keyframe injection).
 */
export function ScrollCue({ label = 'Scroll', style }) {
  React.useEffect(() => {
    const id = 'crepello-scrollcue-kf';
    if (document.getElementById(id)) return;
    const s = document.createElement('style');
    s.id = id;
    s.textContent =
      '@keyframes crp-cue-drift{0%{transform:translateY(-40%);opacity:0}40%{opacity:1}100%{transform:translateY(120%);opacity:0}}' +
      '@media (prefers-reduced-motion: reduce){.crp-cue-line span{animation:none!important;transform:none!important;opacity:.7!important}}';
    document.head.appendChild(s);
  }, []);

  return (
    <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-3)', ...style }}>
      <span style={{
        fontFamily: 'var(--font-mono)', fontSize: 'var(--text-2xs)', letterSpacing: 'var(--ls-eyebrow)',
        textTransform: 'uppercase', color: 'var(--text-faint)', writingMode: 'vertical-rl',
      }}>{label}</span>
      <span className="crp-cue-line" style={{ position: 'relative', display: 'block', width: 1, height: 48, background: 'var(--border-strong)', overflow: 'hidden' }}>
        <span style={{ position: 'absolute', inset: 0, background: 'var(--accent)', animation: 'crp-cue-drift 2.4s var(--ease-inout) infinite' }} />
      </span>
    </div>
  );
}
