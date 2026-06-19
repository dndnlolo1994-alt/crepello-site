# Crepello — "Atelier" Design System

A dark-luxury, editorial design system for **Crepello**, a premium restaurant-café
from Jordan (crepes, waffles, pancakes, bakery, coffee, desserts, brunch). Brand
positioning: **"Atelier"** — refined, editorial, near-black luxury. Bilingual **EN / AR**
with full RTL support.

This project is a reusable token + component + UI-kit library. Consumers link the
single root `styles.css`; the compiler bundles components into `window.<Namespace>`.

---

## Sources & provenance

> The original brief referenced a **live Next.js site** and a codebase to audit/patch
> (including a heading-spacing bug — "ASymphonyinEverySip"). **No codebase or Figma was
> attached to this project**, so this system was authored from the written brief + public
> brand research, *not* by importing source. If you have the repo/Figma, re-attach it and
> I can reconcile tokens with the real source and patch the bug at its origin.

Public references used for brand/menu context (not design source):
- Crepello (Irbid / Amman, Jordan) — Facebook `facebook.com/crepello`, `crepello.co`
- Menu breadth via Talabat Jordan listings (Crepes, Waffles, Pancakes, Bakery & Cakes,
  Ice Cream, Coffee, Smoothies, Brunch/Breakfast)
- Franchise expansion noted (Palestine, Istanbul, first US location in Orland Park)

The **near-black base `#050505`** and the **toasted-caramel accent** direction come from
the brief and are encoded as tokens (see `tokens/colors.css`).

---

## The heading-spacing bug (root cause + the fix this system bakes in)

Symptom: headings rendered with no spaces between words ("ASymphonyinEverySip",
"DelightinEveryBite"). This is the classic **split-text animation** failure — a component
splits a heading into per-word/per-letter `<span>`s and the inter-word whitespace text
nodes get dropped, **or** a flex/inline-block wrapper collapses the spaces, **or** an
aggressively negative `letter-spacing` visually fuses glyphs.

How this system prevents it:
- **Never** use tightly-negative tracking on display type. `--ls-display` is `-0.005em`
  (essentially neutral). See `tokens/typography.css`.
- Base styles set `word-spacing: normal; white-space: normal` on all headings
  (`tokens/base.css`) as a guard.
- If you must animate a heading word-by-word, split on a regex that **keeps the spaces**
  and render a real ` ` (or a `&nbsp;`-width inline) between word spans — do not
  `display:flex` the words without a `gap`. The static render must already read correctly
  with JS off (the animation only adds motion to the end-state).

---

## CONTENT FUNDAMENTALS — how Crepello writes

**Voice:** warm, indulgent, a little theatrical — food-as-craft. The Atelier positioning
pushes it toward *editorial restraint*: short, sensory, confident lines rather than
exclamation-heavy promo. Think "an atelier of crepes," not "🔥 BEST CREPES IN TOWN!!!".

- **Person:** speaks *to* the guest ("you"), *about* the craft ("we / our atelier").
  Invitational, never pushy. CTAs are quiet imperatives: *Order*, *View the menu*,
  *Become a partner*.
- **Casing:** Headlines in **Title Case** or sentence case set in the serif; **eyebrows/labels
  in UPPERCASE mono** with wide tracking and a number (`01 — DRINKS`). Avoid ALL-CAPS body.
- **Length:** headlines are short and evocative (3–7 words). Body kept to ~65ch, two to
  three sentences. White space does the talking.
- **Sensory nouns over adjectives stacks:** "toasted caramel, warm crepe, slow coffee" —
  concrete, not "amazing delicious incredible".
- **Bilingual:** every primary string has an Arabic counterpart. Arabic is set in a refined
  naskh serif for display (Amiri) — equally editorial, never an afterthought.
- **Emoji:** **not used** in the Atelier system. Numerals, the caramel accent, and the serif
  carry the personality instead.

**Example copy (tone reference):**
- Eyebrow: `01 — DRINKS` · `الحرفة / THE CRAFT`
- Hero: *"A symphony in every sip."* / *"Delight in every bite."*
- Section lead: *"Slow-pressed coffee and house syrups, served the way our atelier intended —
  unhurried, warm, and a little indulgent."*
- Franchise: *"Bring the atelier to your city."* (invitation, not a sales pitch)

---

## VISUAL FOUNDATIONS

**Mood:** a dark, candle-lit patisserie. Near-black canvas, warm caramel light, cream type,
generous negative space, big editorial serif headlines beside small tracked mono labels.

- **Color:** base `#050505`; warm-tinted neutral grays ("sand") for text; a single
  **toasted-caramel** accent (`--caramel-500 #C68A4E`) used with discipline — for one CTA,
  numerals, hairline highlights, and hover text. Rare warm-cream blocks invert to dark text.
  Support hues (berry, olive) used only for dessert/savory tagging, never decoration.
- **Type:** editorial pairing — **Bodoni Moda** (high-contrast didone) for display, **Hanken
  Grotesk** for body/UI, **Space Mono** for numbered eyebrows. Arabic: **Amiri** (display) +
  **IBM Plex Sans Arabic** (body). Fluid clamp scale; display tracking is *relaxed*, never crammed.
- **Spacing:** strict 8px scale; section padding is fluid and **generous** (`--section-y`
  64→144px). Vertical rhythm is the primary luxury signal.
- **Backgrounds:** predominantly flat near-black. Imagery is **full-bleed** and **warm-toned**
  (espresso shadows, caramel highlights) with a bottom-up **protection gradient** (`--img-overlay`)
  so cream type stays legible. Optional subtle film **grain** and a soft **duotone** wash
  (`--img-duotone`). No bluish-purple gradients. No busy patterns.
- **Motion:** calm and editorial. Fade + slide-up on scroll, **reveal once**. Image **zoom on
  hover** (scale ~1.05, `--ease-out`, 320–620ms). No bounce, no spin, no infinite loops on
  content. Everything respects `prefers-reduced-motion`.
- **Hover:** images zoom + caption reveals; text links shift to `--accent-soft`; buttons
  lighten the caramel and lift slightly. **Press:** deepen the caramel (`--accent-press`),
  no shrink-bounce (a 1px settle at most).
- **Borders:** hairlines in low-alpha cream (`--border-subtle/-default/-strong`). Architectural,
  thin. Accent borders (`--border-accent`) reserved for focus/selected.
- **Radius:** **tight** — `--radius-md 8px` default, `--radius-sm 4px` for chips. Atelier, not
  bubbly. Pills only for tags/toggles.
- **Shadows:** deep, warm-black, used sparingly on dark (`--shadow-md/-lg`); a caramel glow
  (`--shadow-accent`) for the single elevated/primary moment. Cards lean on **borders + surface
  tint** more than shadow.
- **Transparency / blur:** the sticky nav is a **glass** bar (scrim + `--blur-md`). Scrims
  (`--scrim`) sit under text over imagery. Blur is for chrome, not content.
- **Cards:** dark surface (`--surface-card`), 1px hairline border, 8px radius, generous
  padding, a numbered mono label; hover lifts the border to `--border-strong` and zooms any
  image. Equal heights in grids.

---

## ICONOGRAPHY

The Atelier system uses a **thin, line-based** icon language to match the hairline borders and
editorial restraint. No source icon set was available in a codebase, so the system standardises on
**Lucide** (1.5px stroke, rounded — open-source, CDN-available) as the closest match. *(Flagged
substitution — swap for Crepello's own set if one exists.)*

- **Delivery:** real-world ordering flows on **Talabat**; link out with a wordmark/text label, not
  a faux logo.
- **Emoji:** never used as UI.
- **Numerals as icons:** the mono numbered labels (`01–04`) are a signature motif and do more
  identity work than pictographs — prefer a number + word over an icon where possible.
- **Logo:** Crepello is a **wordmark** (serif). Rendered as live type in `assets/logo.html` /
  the components; no raster logo was provided. Replace with the official lockup when available.

Usage: `<script src="https://unpkg.com/lucide@latest"></script>` then `lucide.createIcons()`,
or inline the specific SVGs. Keep stroke 1.5px, color `currentColor`, size 18–22px in UI.

---

## INDEX — what's in this project

**Foundations**
- `styles.css` — root entry (consumers link this); `@import`s the tokens below.
- `tokens/fonts.css` — webfont loading (Bodoni Moda, Hanken Grotesk, Space Mono, Amiri, IBM Plex Sans Arabic).
- `tokens/colors.css` — raw scales + semantic color aliases.
- `tokens/typography.css` — families, fluid scale, weights, tracking, measure.
- `tokens/spacing.css` — 8px scale + section/gutter tokens.
- `tokens/effects.css` — radius, borders, shadows, blur, motion, image treatments.
- `tokens/base.css` — resets, heading guards, `.eyebrow`, `.prose`, `[data-reveal]`.

**Specimen cards** (`guidelines/`) — populate the Design System tab (Colors, Type, Spacing, Brand).

**Components** (`components/core/`) — Button, ButtonGhost via variants, Tag, Badge, Card,
MenuCategoryCard, Input, NavBar, SectionHeading, ScrollCue. See each `*.prompt.md`.

**UI kit** (`ui_kits/website/`) — the Atelier homepage redesign: hero, menu categories,
signature alternating section, franchise invitation; EN + RTL demonstration. `index.html` is
the interactive recreation.

**Meta**
- `SKILL.md` — Agent-Skills wrapper so this system is usable from Claude Code.
- `readme.md` — this file.
