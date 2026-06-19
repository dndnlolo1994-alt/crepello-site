/* Crepello homepage sections. Compose the bundled DS components.
   Exposed on window for index.html. */
const { Button, MenuCategoryCard, SectionHeading, Eyebrow, ScrollCue, Input, Tag } =
  window.CrepelloDesignSystem_e5a7ae;

/* Warm photographic placeholder — distinct hue per section.
   Swap the background for a real <img>/Next <Image> in production. */
function Placeholder({ hue = 'espresso', label, style }) {
  const hues = {
    espresso: 'radial-gradient(120% 90% at 70% 15%, #5a3a1f 0%, #2a1c10 48%, #0b0807 100%)',
    caramel:  'radial-gradient(120% 100% at 30% 20%, #7a4f24 0%, #3a2412 50%, #0b0807 100%)',
    berry:    'radial-gradient(120% 100% at 65% 20%, #5e2733 0%, #2a161b 50%, #0b0807 100%)',
    olive:    'radial-gradient(120% 100% at 35% 25%, #43471f 0%, #232612 52%, #0b0807 100%)',
    cream:    'radial-gradient(120% 100% at 60% 20%, #6b5230 0%, #2f2415 55%, #0b0807 100%)',
  };
  return (
    <div style={{ position: 'absolute', inset: 0, background: hues[hue], ...style }}>
      {label && (
        <span style={{
          position: 'absolute', top: 12, left: 12, fontFamily: 'var(--font-mono)',
          fontSize: 10, letterSpacing: '.16em', textTransform: 'uppercase',
          color: 'var(--text-faint)', background: 'var(--scrim)', padding: '4px 8px',
          borderRadius: 'var(--radius-sm)',
        }}>{label}</span>
      )}
    </div>
  );
}

/* ---------------- HERO ---------------- */
function Hero({ t }) {
  return (
    <section id="top" style={{ position: 'relative', minHeight: '92vh', display: 'flex', alignItems: 'flex-end', overflow: 'hidden' }}>
      <Placeholder hue="espresso" label="HERO · drop food photo" />
      <div style={{ position: 'absolute', inset: 0, background: 'var(--img-overlay)' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(5,5,5,.55), transparent 55%)' }} />

      <div style={{
        position: 'relative', zIndex: 2, width: '100%', maxWidth: 'var(--content-wide)',
        margin: '0 auto', padding: '0 var(--gutter) clamp(3rem, 6vw, 6rem)',
      }}>
        <div data-reveal style={{ marginBottom: 'var(--space-5)' }}><Eyebrow>{t.eyebrow}</Eyebrow></div>
        <h1 data-reveal style={{
          fontFamily: 'var(--font-display)', color: 'var(--text-strong)',
          fontSize: 'var(--text-4xl)', lineHeight: 1.02, letterSpacing: 'var(--ls-display)',
          margin: 0, maxWidth: '16ch',
        }}>
          {t.title[0]}<br /><em style={{ fontStyle: 'italic', color: 'var(--accent-soft)' }}>{t.title[1]}</em>
        </h1>
        <p data-reveal className="prose" style={{ marginTop: 'var(--space-5)', color: 'var(--text-body)', fontSize: 'var(--text-md)' }}>{t.lead}</p>
        <div data-reveal style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-4)', marginTop: 'var(--space-7)' }}>
          <Button variant="primary" size="lg" href="#order">{t.order}</Button>
          <Button variant="secondary" size="lg" href="#menu">{t.menu}</Button>
        </div>
      </div>

      <div style={{ position: 'absolute', bottom: 'var(--space-6)', insetInlineEnd: 'var(--gutter)', zIndex: 2 }}>
        <ScrollCue label={t.cue} />
      </div>
    </section>
  );
}

/* ---------------- MENU GRID ---------------- */
const HUE_GRADIENTS = {
  caramel: 'radial-gradient(120% 100% at 30% 20%, #7a4f24 0%, #3a2412 50%, #0b0807 100%)',
  berry:   'radial-gradient(120% 100% at 65% 20%, #5e2733 0%, #2a161b 50%, #0b0807 100%)',
  cream:   'radial-gradient(120% 100% at 60% 20%, #6b5230 0%, #2f2415 55%, #0b0807 100%)',
  olive:   'radial-gradient(120% 100% at 35% 25%, #43471f 0%, #232612 52%, #0b0807 100%)',
};
function MenuGrid({ t }) {
  const hues = ['caramel', 'berry', 'cream', 'olive'];
  return (
    <section id="menu" style={{ padding: 'var(--section-y) var(--gutter)', maxWidth: 'var(--content-wide)', margin: '0 auto' }}>
      <div data-reveal style={{ marginBottom: 'var(--space-8)' }}>
        <SectionHeading num="01" eyebrow={t.eyebrow} title={t.title} as="h2" />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 'var(--space-5)' }}>
        {t.items.map((it, i) => (
          <div data-reveal key={it.num} style={{ transitionDelay: `${i * 70}ms` }}>
            <MenuCategoryCard
              num={it.num}
              title={it.title}
              titleAr={it.titleAlt}
              desc={it.desc}
              tone={it.tone}
              href="#order"
              image={HUE_GRADIENTS[hues[i]]}
            />
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------------- SIGNATURE (alternating) ---------------- */
function Signature({ rows }) {
  return (
    <section id="atelier" style={{ background: 'var(--bg-sunken)', borderBlock: '1px solid var(--border-subtle)' }}>
      <div style={{ maxWidth: 'var(--content-wide)', margin: '0 auto', padding: '0 var(--gutter)' }}>
        {rows.map((r, i) => (
          <div key={i} data-reveal style={{
            display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 'clamp(2rem, 5vw, 5rem)', alignItems: 'center',
            padding: 'var(--section-y-sm) 0',
            borderBottom: i < rows.length - 1 ? '1px solid var(--border-subtle)' : 'none',
            direction: 'ltr',
          }}>
            <div style={{ position: 'relative', aspectRatio: '5 / 4', borderRadius: 'var(--radius-md)', overflow: 'hidden', border: '1px solid var(--border-subtle)', order: r.flip ? 2 : 1 }}>
              <Placeholder hue={r.tone === 'dessert' ? 'berry' : 'olive'} label={`${r.eyebrow.toUpperCase()} · photo`} />
              <div style={{ position: 'absolute', inset: 0, background: 'var(--img-duotone)', mixBlendMode: 'multiply' }} />
            </div>
            <div style={{ order: r.flip ? 1 : 2, maxWidth: '40ch' }}>
              <Tag tone={r.tone} style={{ marginBottom: 'var(--space-4)' }}>{r.tag}</Tag>
              <SectionHeading num={r.num} eyebrow={r.eyebrow} title={r.title} lead={r.body} as="h2" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------------- FRANCHISE ---------------- */
function Franchise({ t }) {
  return (
    <section id="franchise" style={{ position: 'relative', overflow: 'hidden' }}>
      <Placeholder hue="caramel" style={{ opacity: 0.5 }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, var(--bg-base), rgba(5,5,5,.82))' }} />
      <div data-reveal style={{
        position: 'relative', zIndex: 2, maxWidth: 'var(--content-max)', margin: '0 auto',
        padding: 'var(--section-y) var(--gutter)', textAlign: 'center',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-5)',
      }}>
        <Eyebrow>{t.eyebrow}</Eyebrow>
        <h2 style={{ fontFamily: 'var(--font-display)', color: 'var(--text-strong)', fontSize: 'var(--text-3xl)', lineHeight: 'var(--lh-snug)', letterSpacing: 'var(--ls-display)', margin: 0, maxWidth: '16ch' }}>{t.title}</h2>
        <p className="prose" style={{ textAlign: 'center', margin: '0 auto', color: 'var(--text-muted)', fontSize: 'var(--text-md)' }}>{t.body}</p>
        <div style={{ marginTop: 'var(--space-3)' }}><Button variant="primary" size="lg" href="#order">{t.cta}</Button></div>
        <ul style={{ listStyle: 'none', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 'var(--space-3) var(--space-6)', padding: 0, margin: 'var(--space-6) 0 0' }}>
          {t.meta.map((m) => (
            <li key={m} style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-2xs)', letterSpacing: 'var(--ls-caps)', textTransform: 'uppercase', color: 'var(--text-faint)' }}>{m}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ---------------- FOOTER ---------------- */
function Footer({ t }) {
  return (
    <footer style={{ borderTop: '1px solid var(--border-subtle)', padding: 'var(--section-y-sm) var(--gutter)' }}>
      <div style={{ maxWidth: 'var(--content-wide)', margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: 'var(--space-6)', alignItems: 'flex-end', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-2xl)', color: 'var(--text-strong)' }}>Crepello<span style={{ color: 'var(--accent)' }}>.</span></div>
          <p style={{ color: 'var(--text-faint)', fontSize: 'var(--text-sm)', marginTop: 'var(--space-2)', maxWidth: '32ch' }}>{t.tagline}</p>
        </div>
        <ul style={{ listStyle: 'none', display: 'flex', flexWrap: 'wrap', gap: 'var(--space-5)', padding: 0, margin: 0 }}>
          {t.links.map((l) => (
            <li key={l}><a href="#" style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', color: 'var(--text-muted)' }}>{l}</a></li>
          ))}
        </ul>
      </div>
      <div style={{ maxWidth: 'var(--content-wide)', margin: 'var(--space-7) auto 0', fontFamily: 'var(--font-mono)', fontSize: 'var(--text-2xs)', letterSpacing: '.1em', color: 'var(--text-faint)' }}>{t.rights}</div>
    </footer>
  );
}

Object.assign(window, { Hero, MenuGrid, Signature, Franchise, Footer, Placeholder });
