/* @ds-bundle: {"format":3,"namespace":"CrepelloDesignSystem_e5a7ae","components":[{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Eyebrow","sourcePath":"components/core/Eyebrow.jsx"},{"name":"Input","sourcePath":"components/core/Input.jsx"},{"name":"Tag","sourcePath":"components/core/Tag.jsx"},{"name":"Card","sourcePath":"components/menu/Card.jsx"},{"name":"MenuCategoryCard","sourcePath":"components/menu/MenuCategoryCard.jsx"},{"name":"NavBar","sourcePath":"components/site/NavBar.jsx"},{"name":"ScrollCue","sourcePath":"components/site/ScrollCue.jsx"},{"name":"SectionHeading","sourcePath":"components/site/SectionHeading.jsx"}],"sourceHashes":{"components/core/Button.jsx":"af7525f38367","components/core/Eyebrow.jsx":"ce445aa4869b","components/core/Input.jsx":"244df0e3e5f0","components/core/Tag.jsx":"ade3bb4c9ce2","components/menu/Card.jsx":"b6eee7bfa67e","components/menu/MenuCategoryCard.jsx":"54629a5eff58","components/site/NavBar.jsx":"1fb8df19f1d0","components/site/ScrollCue.jsx":"4b96ff4916e0","components/site/SectionHeading.jsx":"0cca922a2e64","ui_kits/website/copy.js":"03b41c3ffc30","ui_kits/website/sections.jsx":"d00e5fffd155"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.CrepelloDesignSystem_e5a7ae = window.CrepelloDesignSystem_e5a7ae || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Crepello primary action. Editorial, calm motion. Caramel fill is the single
 * "loud" moment in the system — use one primary per view.
 */
function Button({
  children,
  variant = 'primary',
  // 'primary' | 'secondary' | 'ghost'
  size = 'md',
  // 'sm' | 'md' | 'lg'
  href,
  iconLeft,
  iconRight,
  disabled = false,
  style,
  ...rest
}) {
  const sizes = {
    sm: {
      padding: '0.5rem 1rem',
      fontSize: 'var(--text-sm)'
    },
    md: {
      padding: '0.75rem 1.5rem',
      fontSize: 'var(--text-base)'
    },
    lg: {
      padding: '1rem 2rem',
      fontSize: 'var(--text-md)'
    }
  };
  const variants = {
    primary: {
      background: 'var(--accent)',
      color: 'var(--on-accent)',
      border: '1px solid transparent'
    },
    secondary: {
      background: 'transparent',
      color: 'var(--text-strong)',
      border: '1px solid var(--border-strong)'
    },
    ghost: {
      background: 'transparent',
      color: 'var(--text-strong)',
      border: '1px solid transparent'
    }
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
    ...style
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
  const tagProps = Tag === 'a' ? {
    href
  } : {
    type: 'button',
    disabled
  };
  return /*#__PURE__*/React.createElement(Tag, _extends({}, tagProps, {
    style: base,
    onMouseEnter: e => hover(e, true),
    onMouseLeave: e => {
      hover(e, false);
      press(e, false);
    },
    onMouseDown: e => press(e, true),
    onMouseUp: e => press(e, false)
  }, rest), iconLeft, children, iconRight);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Eyebrow.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Tracked mono eyebrow with an optional leading number — the Crepello signature
 * section label. e.g. <Eyebrow num="01">Drinks</Eyebrow>
 */
function Eyebrow({
  num,
  children,
  color = 'var(--accent)',
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: 'inline-flex',
      alignItems: 'baseline',
      gap: '0.7em',
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--text-xs)',
      letterSpacing: 'var(--ls-eyebrow)',
      textTransform: 'uppercase',
      color,
      ...style
    }
  }, rest), num != null && /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--accent)'
    }
  }, num), num != null && /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-faint)'
    }
  }, "\u2014"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: num != null ? 'var(--text-muted)' : color
    }
  }, children));
}
Object.assign(__ds_scope, { Eyebrow });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Eyebrow.jsx", error: String((e && e.message) || e) }); }

// components/core/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Dark text input with hairline border + caramel focus. Label optional. */
function Input({
  label,
  hint,
  id,
  style,
  type = 'text',
  ...rest
}) {
  const inputId = id || (label ? `in-${label.replace(/\s+/g, '-').toLowerCase()}` : undefined);
  return /*#__PURE__*/React.createElement("label", {
    htmlFor: inputId,
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.5rem'
    }
  }, label && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--text-xs)',
      letterSpacing: 'var(--ls-caps)',
      textTransform: 'uppercase',
      color: 'var(--text-faint)'
    }
  }, label), /*#__PURE__*/React.createElement("input", _extends({
    id: inputId,
    type: type,
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-base)',
      color: 'var(--text-strong)',
      background: 'var(--surface)',
      border: '1px solid var(--border-default)',
      borderRadius: 'var(--radius-md)',
      padding: '0.8rem 1rem',
      outline: 'none',
      transition: 'border-color var(--dur-fast) var(--ease-out), background var(--dur-fast) var(--ease-out)',
      ...style
    },
    onFocus: e => {
      e.currentTarget.style.borderColor = 'var(--border-accent)';
      e.currentTarget.style.background = 'var(--surface-raised)';
    },
    onBlur: e => {
      e.currentTarget.style.borderColor = 'var(--border-default)';
      e.currentTarget.style.background = 'var(--surface)';
    }
  }, rest)), hint && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-sm)',
      color: 'var(--text-faint)'
    }
  }, hint));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Input.jsx", error: String((e && e.message) || e) }); }

// components/core/Tag.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Small tracked label. Use `tone` for dessert/savory menu tagging and `outline`
 * for a quieter hairline pill. Numbered eyebrows should use <Eyebrow>, not this.
 */
function Tag({
  children,
  tone = 'neutral',
  outline = false,
  style,
  ...rest
}) {
  const tones = {
    neutral: {
      fg: 'var(--text-muted)',
      bg: 'rgba(231,222,207,0.06)',
      bd: 'var(--border-default)'
    },
    accent: {
      fg: 'var(--accent-soft)',
      bg: 'rgba(198,138,78,0.12)',
      bd: 'var(--border-accent)'
    },
    dessert: {
      fg: '#e88a98',
      bg: 'rgba(181,72,91,0.14)',
      bd: 'rgba(181,72,91,0.4)'
    },
    savory: {
      fg: '#aeb38a',
      bg: 'rgba(110,115,80,0.16)',
      bd: 'rgba(110,115,80,0.45)'
    }
  };
  const t = tones[tone] || tones.neutral;
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
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
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Tag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Tag.jsx", error: String((e && e.message) || e) }); }

// components/menu/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Generic dark surface card — hairline border, tight radius, generous padding.
 * Leans on border + surface tint over shadow. Use `as` to render a link.
 */
function Card({
  children,
  padding = 'var(--pad-card)',
  raised = false,
  as = 'div',
  style,
  ...rest
}) {
  const El = as;
  return /*#__PURE__*/React.createElement(El, _extends({
    style: {
      background: raised ? 'var(--surface-raised)' : 'var(--surface-card)',
      border: '1px solid var(--border-subtle)',
      borderRadius: 'var(--radius-md)',
      padding,
      boxShadow: raised ? 'var(--shadow-md)' : 'none',
      transition: 'border-color var(--dur-med) var(--ease-out)',
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/menu/Card.jsx", error: String((e && e.message) || e) }); }

// components/menu/MenuCategoryCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Signature menu-category tile: numbered label (01–04), full-bleed warm image,
 * protection gradient, and a hover that zooms the image + reveals a one-line
 * description. Equal-height friendly (fixed aspect). Pass `image` (URL) or it
 * falls back to a warm espresso→caramel placeholder.
 */
function MenuCategoryCard({
  num,
  title,
  titleAr,
  desc,
  image,
  href = '#',
  tone = 'neutral',
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const accents = {
    neutral: 'var(--accent)',
    dessert: '#e88a98',
    savory: '#aeb38a'
  };
  const accent = accents[tone] || accents.neutral;
  return /*#__PURE__*/React.createElement("a", _extends({
    href: href,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      position: 'relative',
      display: 'block',
      aspectRatio: '3 / 4',
      borderRadius: 'var(--radius-md)',
      overflow: 'hidden',
      border: `1px solid ${hover ? 'var(--border-strong)' : 'var(--border-subtle)'}`,
      textDecoration: 'none',
      transition: 'border-color var(--dur-med) var(--ease-out)',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: !image ? 'radial-gradient(120% 90% at 70% 15%, #5a3a1f 0%, #2a1c10 48%, #0b0807 100%)' : /gradient/.test(image) ? image : `center/cover no-repeat url("${image}")`,
      transform: hover ? 'scale(1.06)' : 'scale(1)',
      transition: 'transform var(--dur-slow) var(--ease-out)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'var(--img-overlay)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 'var(--space-5)',
      left: 'var(--space-5)',
      zIndex: 2
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--text-sm)',
      color: accent,
      letterSpacing: '0.08em'
    }
  }, num)), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 'var(--space-5)',
      right: 'var(--space-5)',
      bottom: 'var(--space-5)',
      zIndex: 2
    }
  }, titleAr && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-ar-display)',
      fontSize: 'var(--text-base)',
      color: 'var(--text-faint)',
      display: 'block',
      marginBottom: '0.2em'
    }
  }, titleAr), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: 'var(--font-display)',
      color: 'var(--text-strong)',
      fontSize: 'var(--text-xl)',
      lineHeight: 1.1,
      margin: 0
    }
  }, title), desc && /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-sm)',
      color: 'var(--text-muted)',
      margin: '0.5em 0 0',
      maxWidth: '34ch',
      maxHeight: hover ? '4em' : '0',
      opacity: hover ? 1 : 0,
      overflow: 'hidden',
      transform: hover ? 'translateY(0)' : 'translateY(6px)',
      transition: 'opacity var(--dur-med) var(--ease-out), transform var(--dur-med) var(--ease-out), max-height var(--dur-med) var(--ease-out)'
    }
  }, desc), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.5em',
      marginTop: '0.7em',
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--text-2xs)',
      letterSpacing: 'var(--ls-caps)',
      textTransform: 'uppercase',
      color: accent
    }
  }, "Explore ", /*#__PURE__*/React.createElement("span", {
    "aria-hidden": true,
    style: {
      transform: hover ? 'translateX(3px)' : 'none',
      transition: 'transform var(--dur-med) var(--ease-out)'
    }
  }, "\u2192"))));
}
Object.assign(__ds_scope, { MenuCategoryCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/menu/MenuCategoryCard.jsx", error: String((e && e.message) || e) }); }

// components/site/NavBar.jsx
try { (() => {
/**
 * Crepello glass nav. Sticky, blurred scrim. Wordmark left, links center,
 * language toggle + Order right. Mirrors automatically under [dir="rtl"].
 */
function NavBar({
  links = [{
    label: 'Menu',
    href: '#menu'
  }, {
    label: 'Atelier',
    href: '#atelier'
  }, {
    label: 'Franchise',
    href: '#franchise'
  }],
  lang = 'EN',
  onToggleLang,
  onOrder,
  style
}) {
  return /*#__PURE__*/React.createElement("header", {
    style: {
      position: 'sticky',
      top: 0,
      zIndex: 50,
      background: 'var(--scrim)',
      backdropFilter: 'blur(var(--blur-md))',
      WebkitBackdropFilter: 'blur(var(--blur-md))',
      borderBottom: '1px solid var(--border-subtle)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("nav", {
    style: {
      maxWidth: 'var(--content-wide)',
      margin: '0 auto',
      padding: '0.9rem var(--gutter)',
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-6)'
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "#top",
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 'var(--text-lg)',
      fontWeight: 'var(--fw-medium)',
      color: 'var(--text-strong)',
      letterSpacing: '0.01em',
      textDecoration: 'none'
    }
  }, "Crepello", /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--accent)'
    }
  }, ".")), /*#__PURE__*/React.createElement("ul", {
    style: {
      display: 'flex',
      gap: 'var(--space-6)',
      listStyle: 'none',
      margin: 0,
      padding: 0,
      marginInline: 'auto'
    }
  }, links.map(l => /*#__PURE__*/React.createElement("li", {
    key: l.label
  }, /*#__PURE__*/React.createElement("a", {
    href: l.href,
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-sm)',
      color: 'var(--text-muted)',
      textDecoration: 'none',
      letterSpacing: '0.02em',
      transition: 'color var(--dur-fast) var(--ease-out)'
    },
    onMouseEnter: e => e.currentTarget.style.color = 'var(--accent-soft)',
    onMouseLeave: e => e.currentTarget.style.color = 'var(--text-muted)'
  }, l.label)))), /*#__PURE__*/React.createElement("button", {
    onClick: onToggleLang,
    "aria-label": "Toggle language",
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--text-2xs)',
      letterSpacing: '0.1em',
      color: 'var(--text-muted)',
      background: 'transparent',
      border: '1px solid var(--border-default)',
      borderRadius: 'var(--radius-pill)',
      padding: '0.4rem 0.7rem',
      cursor: 'pointer'
    }
  }, lang === 'EN' ? 'ع' : 'EN'), /*#__PURE__*/React.createElement(__ds_scope.Button, {
    size: "sm",
    onClick: onOrder
  }, "Order")));
}
Object.assign(__ds_scope, { NavBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/site/NavBar.jsx", error: String((e && e.message) || e) }); }

// components/site/ScrollCue.jsx
try { (() => {
/**
 * Subtle hero scroll cue — tracked label + a slow drifting line. Calm, no bounce;
 * the drift stills under prefers-reduced-motion (handled via keyframe injection).
 */
function ScrollCue({
  label = 'Scroll',
  style
}) {
  React.useEffect(() => {
    const id = 'crepello-scrollcue-kf';
    if (document.getElementById(id)) return;
    const s = document.createElement('style');
    s.id = id;
    s.textContent = '@keyframes crp-cue-drift{0%{transform:translateY(-40%);opacity:0}40%{opacity:1}100%{transform:translateY(120%);opacity:0}}' + '@media (prefers-reduced-motion: reduce){.crp-cue-line span{animation:none!important;transform:none!important;opacity:.7!important}}';
    document.head.appendChild(s);
  }, []);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'inline-flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 'var(--space-3)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--text-2xs)',
      letterSpacing: 'var(--ls-eyebrow)',
      textTransform: 'uppercase',
      color: 'var(--text-faint)',
      writingMode: 'vertical-rl'
    }
  }, label), /*#__PURE__*/React.createElement("span", {
    className: "crp-cue-line",
    style: {
      position: 'relative',
      display: 'block',
      width: 1,
      height: 48,
      background: 'var(--border-strong)',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'var(--accent)',
      animation: 'crp-cue-drift 2.4s var(--ease-inout) infinite'
    }
  })));
}
Object.assign(__ds_scope, { ScrollCue });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/site/ScrollCue.jsx", error: String((e && e.message) || e) }); }

// components/site/SectionHeading.jsx
try { (() => {
/**
 * Editorial section header: numbered eyebrow + serif heading + optional lead.
 * `align` controls text alignment; lead stays inside a ~46ch measure.
 */
function SectionHeading({
  num,
  eyebrow,
  title,
  lead,
  align = 'left',
  as = 'h2',
  style
}) {
  const Heading = as;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-4)',
      alignItems: align === 'center' ? 'center' : 'flex-start',
      textAlign: align,
      ...style
    }
  }, (eyebrow || num) && /*#__PURE__*/React.createElement(__ds_scope.Eyebrow, {
    num: num
  }, eyebrow), /*#__PURE__*/React.createElement(Heading, {
    style: {
      fontFamily: 'var(--font-display)',
      color: 'var(--text-strong)',
      fontSize: 'var(--text-2xl)',
      lineHeight: 'var(--lh-snug)',
      letterSpacing: 'var(--ls-display)',
      margin: 0,
      maxWidth: '18ch'
    }
  }, title), lead && /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-md)',
      color: 'var(--text-muted)',
      lineHeight: 'var(--lh-relaxed)',
      maxWidth: 'var(--measure-narrow)',
      margin: 0
    }
  }, lead));
}
Object.assign(__ds_scope, { SectionHeading });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/site/SectionHeading.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/copy.js
try { (() => {
// Crepello homepage — bilingual copy (EN / AR). Every primary string is paired.
window.CREPELLO_COPY = {
  EN: {
    dir: 'ltr',
    nav: {
      menu: 'Menu',
      atelier: 'Atelier',
      franchise: 'Franchise',
      order: 'Order',
      lang: 'ع'
    },
    hero: {
      eyebrow: 'The Atelier — Amman',
      title: ['A symphony', 'in every sip.'],
      lead: 'Crepes, waffles and slow coffee, composed by hand. An atelier of small indulgences — unhurried, warm, and a little theatrical.',
      order: 'Order now',
      menu: 'View the menu',
      cue: 'Scroll'
    },
    menu: {
      eyebrow: 'The Menu',
      title: 'Four ways to indulge',
      items: [{
        num: '01',
        title: 'Drinks',
        titleAlt: 'المشروبات',
        desc: 'Slow-pressed coffee and house syrups.',
        tone: 'neutral'
      }, {
        num: '02',
        title: 'Dessert',
        titleAlt: 'الحلويات',
        desc: 'Toasted caramel, warm crepe, slow cream.',
        tone: 'dessert'
      }, {
        num: '03',
        title: 'Bakery',
        titleAlt: 'المخبوزات',
        desc: 'Pulled-from-the-oven pastry, daily.',
        tone: 'neutral'
      }, {
        num: '04',
        title: 'Brunch',
        titleAlt: 'الفطور',
        desc: 'Savory crepes and plates till noon.',
        tone: 'savory'
      }]
    },
    signature: [{
      num: '02',
      eyebrow: 'Dessert',
      tone: 'dessert',
      title: 'Delight in every bite',
      body: 'The sweet side of the atelier: French-style crepes folded over toasted caramel, Belgian waffles crowned with slow cream, and a cabinet of cakes built for sharing. Each plate is made to order — never before you ask.',
      tag: 'Made to order'
    }, {
      num: '04',
      eyebrow: 'Savory',
      tone: 'savory',
      flip: true,
      title: 'A quiet kind of brunch',
      body: 'Savory crepes, eggs and warm plates served till noon, alongside coffee pressed the slow way. Unhurried mornings are the whole point — stay a while, the second cup is on the house.',
      tag: 'Till noon'
    }],
    franchise: {
      eyebrow: 'Franchise',
      title: 'Bring the atelier to your city',
      body: 'From Amman to Palestine and Istanbul — Crepello travels well. If you believe in slow coffee and small indulgences, we should talk.',
      cta: 'Become a partner',
      meta: ['Amman · 2 ateliers', 'Palestine', 'Istanbul', 'Orland Park · soon']
    },
    footer: {
      tagline: 'An atelier of crepes, waffles & slow coffee.',
      rights: '© Crepello — Amman, Jordan',
      links: ['Menu', 'Locations', 'Franchise', 'Instagram']
    }
  },
  AR: {
    dir: 'rtl',
    nav: {
      menu: 'القائمة',
      atelier: 'المرسم',
      franchise: 'الامتياز',
      order: 'اطلب',
      lang: 'EN'
    },
    hero: {
      eyebrow: 'المرسم — عمّان',
      title: ['سيمفونية', 'في كل رشفة'],
      lead: 'كريب ووافل وقهوة محضّرة على مهل، تُصنع باليد. مرسمٌ للملذّات الصغيرة — أنيق، دافئ، وقليل من المسرح.',
      order: 'اطلب الآن',
      menu: 'تصفّح القائمة',
      cue: 'مرّر'
    },
    menu: {
      eyebrow: 'القائمة',
      title: 'أربع طرقٍ للتدليل',
      items: [{
        num: '٠١',
        title: 'المشروبات',
        titleAlt: 'Drinks',
        desc: 'قهوة محضّرة على مهل وشراب البيت.',
        tone: 'neutral'
      }, {
        num: '٠٢',
        title: 'الحلويات',
        titleAlt: 'Dessert',
        desc: 'كراميل محمّص، كريب دافئ، كريمة هادئة.',
        tone: 'dessert'
      }, {
        num: '٠٣',
        title: 'المخبوزات',
        titleAlt: 'Bakery',
        desc: 'معجّنات طازجة من الفرن، يوميًا.',
        tone: 'neutral'
      }, {
        num: '٠٤',
        title: 'الفطور',
        titleAlt: 'Brunch',
        desc: 'كريب مالح وأطباق حتى الظهر.',
        tone: 'savory'
      }]
    },
    signature: [{
      num: '٠٢',
      eyebrow: 'الحلويات',
      tone: 'dessert',
      title: 'لذّة في كل قضمة',
      body: 'الجانب الحلو من المرسم: كريب على الطريقة الفرنسية يُطوى على كراميل محمّص، ووافل بلجيكي بكريمة هادئة، وخزانة كعكٍ للمشاركة. كل طبقٍ يُحضَّر عند الطلب — لا قبل أن تطلبه.',
      tag: 'يُحضَّر عند الطلب'
    }, {
      num: '٠٤',
      eyebrow: 'المالح',
      tone: 'savory',
      flip: true,
      title: 'فطورٌ على مهل',
      body: 'كريب مالح وبيض وأطباق دافئة حتى الظهر، إلى جانب قهوة محضّرة على مهل. الصباح غير المستعجل هو المقصد — ابقَ قليلًا، الفنجان الثاني علينا.',
      tag: 'حتى الظهر'
    }],
    franchise: {
      eyebrow: 'الامتياز',
      title: 'احمل المرسم إلى مدينتك',
      body: 'من عمّان إلى فلسطين وإسطنبول — كريبيلو يسافر جيدًا. إن كنت تؤمن بالقهوة الهادئة والملذّات الصغيرة، فلنتحدّث.',
      cta: 'كن شريكًا',
      meta: ['عمّان · مرسمان', 'فلسطين', 'إسطنبول', 'أورلاند بارك · قريبًا']
    },
    footer: {
      tagline: 'مرسمٌ للكريب والوافل والقهوة الهادئة.',
      rights: '© كريبيلو — عمّان، الأردن',
      links: ['القائمة', 'الفروع', 'الامتياز', 'إنستغرام']
    }
  }
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/copy.js", error: String((e && e.message) || e) }); }

// ui_kits/website/sections.jsx
try { (() => {
/* Crepello homepage sections. Compose the bundled DS components.
   Exposed on window for index.html. */
const {
  Button,
  MenuCategoryCard,
  SectionHeading,
  Eyebrow,
  ScrollCue,
  Input,
  Tag
} = window.CrepelloDesignSystem_e5a7ae;

/* Warm photographic placeholder — distinct hue per section.
   Swap the background for a real <img>/Next <Image> in production. */
function Placeholder({
  hue = 'espresso',
  label,
  style
}) {
  const hues = {
    espresso: 'radial-gradient(120% 90% at 70% 15%, #5a3a1f 0%, #2a1c10 48%, #0b0807 100%)',
    caramel: 'radial-gradient(120% 100% at 30% 20%, #7a4f24 0%, #3a2412 50%, #0b0807 100%)',
    berry: 'radial-gradient(120% 100% at 65% 20%, #5e2733 0%, #2a161b 50%, #0b0807 100%)',
    olive: 'radial-gradient(120% 100% at 35% 25%, #43471f 0%, #232612 52%, #0b0807 100%)',
    cream: 'radial-gradient(120% 100% at 60% 20%, #6b5230 0%, #2f2415 55%, #0b0807 100%)'
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: hues[hue],
      ...style
    }
  }, label && /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      top: 12,
      left: 12,
      fontFamily: 'var(--font-mono)',
      fontSize: 10,
      letterSpacing: '.16em',
      textTransform: 'uppercase',
      color: 'var(--text-faint)',
      background: 'var(--scrim)',
      padding: '4px 8px',
      borderRadius: 'var(--radius-sm)'
    }
  }, label));
}

/* ---------------- HERO ---------------- */
function Hero({
  t
}) {
  return /*#__PURE__*/React.createElement("section", {
    id: "top",
    style: {
      position: 'relative',
      minHeight: '92vh',
      display: 'flex',
      alignItems: 'flex-end',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement(Placeholder, {
    hue: "espresso",
    label: "HERO \xB7 drop food photo"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'var(--img-overlay)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'linear-gradient(90deg, rgba(5,5,5,.55), transparent 55%)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      zIndex: 2,
      width: '100%',
      maxWidth: 'var(--content-wide)',
      margin: '0 auto',
      padding: '0 var(--gutter) clamp(3rem, 6vw, 6rem)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    "data-reveal": true,
    style: {
      marginBottom: 'var(--space-5)'
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, null, t.eyebrow)), /*#__PURE__*/React.createElement("h1", {
    "data-reveal": true,
    style: {
      fontFamily: 'var(--font-display)',
      color: 'var(--text-strong)',
      fontSize: 'var(--text-4xl)',
      lineHeight: 1.02,
      letterSpacing: 'var(--ls-display)',
      margin: 0,
      maxWidth: '16ch'
    }
  }, t.title[0], /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("em", {
    style: {
      fontStyle: 'italic',
      color: 'var(--accent-soft)'
    }
  }, t.title[1])), /*#__PURE__*/React.createElement("p", {
    "data-reveal": true,
    className: "prose",
    style: {
      marginTop: 'var(--space-5)',
      color: 'var(--text-body)',
      fontSize: 'var(--text-md)'
    }
  }, t.lead), /*#__PURE__*/React.createElement("div", {
    "data-reveal": true,
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: 'var(--space-4)',
      marginTop: 'var(--space-7)'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "lg",
    href: "#order"
  }, t.order), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    size: "lg",
    href: "#menu"
  }, t.menu))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      bottom: 'var(--space-6)',
      insetInlineEnd: 'var(--gutter)',
      zIndex: 2
    }
  }, /*#__PURE__*/React.createElement(ScrollCue, {
    label: t.cue
  })));
}

/* ---------------- MENU GRID ---------------- */
const HUE_GRADIENTS = {
  caramel: 'radial-gradient(120% 100% at 30% 20%, #7a4f24 0%, #3a2412 50%, #0b0807 100%)',
  berry: 'radial-gradient(120% 100% at 65% 20%, #5e2733 0%, #2a161b 50%, #0b0807 100%)',
  cream: 'radial-gradient(120% 100% at 60% 20%, #6b5230 0%, #2f2415 55%, #0b0807 100%)',
  olive: 'radial-gradient(120% 100% at 35% 25%, #43471f 0%, #232612 52%, #0b0807 100%)'
};
function MenuGrid({
  t
}) {
  const hues = ['caramel', 'berry', 'cream', 'olive'];
  return /*#__PURE__*/React.createElement("section", {
    id: "menu",
    style: {
      padding: 'var(--section-y) var(--gutter)',
      maxWidth: 'var(--content-wide)',
      margin: '0 auto'
    }
  }, /*#__PURE__*/React.createElement("div", {
    "data-reveal": true,
    style: {
      marginBottom: 'var(--space-8)'
    }
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    num: "01",
    eyebrow: t.eyebrow,
    title: t.title,
    as: "h2"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
      gap: 'var(--space-5)'
    }
  }, t.items.map((it, i) => /*#__PURE__*/React.createElement("div", {
    "data-reveal": true,
    key: it.num,
    style: {
      transitionDelay: `${i * 70}ms`
    }
  }, /*#__PURE__*/React.createElement(MenuCategoryCard, {
    num: it.num,
    title: it.title,
    titleAr: it.titleAlt,
    desc: it.desc,
    tone: it.tone,
    href: "#order",
    image: HUE_GRADIENTS[hues[i]]
  })))));
}

/* ---------------- SIGNATURE (alternating) ---------------- */
function Signature({
  rows
}) {
  return /*#__PURE__*/React.createElement("section", {
    id: "atelier",
    style: {
      background: 'var(--bg-sunken)',
      borderBlock: '1px solid var(--border-subtle)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--content-wide)',
      margin: '0 auto',
      padding: '0 var(--gutter)'
    }
  }, rows.map((r, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    "data-reveal": true,
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: 'clamp(2rem, 5vw, 5rem)',
      alignItems: 'center',
      padding: 'var(--section-y-sm) 0',
      borderBottom: i < rows.length - 1 ? '1px solid var(--border-subtle)' : 'none',
      direction: 'ltr'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      aspectRatio: '5 / 4',
      borderRadius: 'var(--radius-md)',
      overflow: 'hidden',
      border: '1px solid var(--border-subtle)',
      order: r.flip ? 2 : 1
    }
  }, /*#__PURE__*/React.createElement(Placeholder, {
    hue: r.tone === 'dessert' ? 'berry' : 'olive',
    label: `${r.eyebrow.toUpperCase()} · photo`
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'var(--img-duotone)',
      mixBlendMode: 'multiply'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      order: r.flip ? 1 : 2,
      maxWidth: '40ch'
    }
  }, /*#__PURE__*/React.createElement(Tag, {
    tone: r.tone,
    style: {
      marginBottom: 'var(--space-4)'
    }
  }, r.tag), /*#__PURE__*/React.createElement(SectionHeading, {
    num: r.num,
    eyebrow: r.eyebrow,
    title: r.title,
    lead: r.body,
    as: "h2"
  }))))));
}

/* ---------------- FRANCHISE ---------------- */
function Franchise({
  t
}) {
  return /*#__PURE__*/React.createElement("section", {
    id: "franchise",
    style: {
      position: 'relative',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement(Placeholder, {
    hue: "caramel",
    style: {
      opacity: 0.5
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'linear-gradient(180deg, var(--bg-base), rgba(5,5,5,.82))'
    }
  }), /*#__PURE__*/React.createElement("div", {
    "data-reveal": true,
    style: {
      position: 'relative',
      zIndex: 2,
      maxWidth: 'var(--content-max)',
      margin: '0 auto',
      padding: 'var(--section-y) var(--gutter)',
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 'var(--space-5)'
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, null, t.eyebrow), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-display)',
      color: 'var(--text-strong)',
      fontSize: 'var(--text-3xl)',
      lineHeight: 'var(--lh-snug)',
      letterSpacing: 'var(--ls-display)',
      margin: 0,
      maxWidth: '16ch'
    }
  }, t.title), /*#__PURE__*/React.createElement("p", {
    className: "prose",
    style: {
      textAlign: 'center',
      margin: '0 auto',
      color: 'var(--text-muted)',
      fontSize: 'var(--text-md)'
    }
  }, t.body), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 'var(--space-3)'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "lg",
    href: "#order"
  }, t.cta)), /*#__PURE__*/React.createElement("ul", {
    style: {
      listStyle: 'none',
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      gap: 'var(--space-3) var(--space-6)',
      padding: 0,
      margin: 'var(--space-6) 0 0'
    }
  }, t.meta.map(m => /*#__PURE__*/React.createElement("li", {
    key: m,
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--text-2xs)',
      letterSpacing: 'var(--ls-caps)',
      textTransform: 'uppercase',
      color: 'var(--text-faint)'
    }
  }, m)))));
}

/* ---------------- FOOTER ---------------- */
function Footer({
  t
}) {
  return /*#__PURE__*/React.createElement("footer", {
    style: {
      borderTop: '1px solid var(--border-subtle)',
      padding: 'var(--section-y-sm) var(--gutter)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--content-wide)',
      margin: '0 auto',
      display: 'flex',
      flexWrap: 'wrap',
      gap: 'var(--space-6)',
      alignItems: 'flex-end',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 'var(--text-2xl)',
      color: 'var(--text-strong)'
    }
  }, "Crepello", /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--accent)'
    }
  }, ".")), /*#__PURE__*/React.createElement("p", {
    style: {
      color: 'var(--text-faint)',
      fontSize: 'var(--text-sm)',
      marginTop: 'var(--space-2)',
      maxWidth: '32ch'
    }
  }, t.tagline)), /*#__PURE__*/React.createElement("ul", {
    style: {
      listStyle: 'none',
      display: 'flex',
      flexWrap: 'wrap',
      gap: 'var(--space-5)',
      padding: 0,
      margin: 0
    }
  }, t.links.map(l => /*#__PURE__*/React.createElement("li", {
    key: l
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-sm)',
      color: 'var(--text-muted)'
    }
  }, l))))), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--content-wide)',
      margin: 'var(--space-7) auto 0',
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--text-2xs)',
      letterSpacing: '.1em',
      color: 'var(--text-faint)'
    }
  }, t.rights));
}
Object.assign(window, {
  Hero,
  MenuGrid,
  Signature,
  Franchise,
  Footer,
  Placeholder
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/sections.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Eyebrow = __ds_scope.Eyebrow;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Tag = __ds_scope.Tag;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.MenuCategoryCard = __ds_scope.MenuCategoryCard;

__ds_ns.NavBar = __ds_scope.NavBar;

__ds_ns.ScrollCue = __ds_scope.ScrollCue;

__ds_ns.SectionHeading = __ds_scope.SectionHeading;

})();
