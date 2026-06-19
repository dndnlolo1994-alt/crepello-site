# Website UI Kit — Crepello "Atelier" Homepage

A high-fidelity recreation of the redesigned Crepello homepage, built entirely from the
design-system tokens and components. This is the reference implementation of the Atelier
direction described in the root `readme.md`.

## Run
Open `index.html`. It loads `../../styles.css`, the compiled `_ds_bundle.js`, `copy.js`
(bilingual strings) and `sections.jsx` (the section components).

## What it demonstrates
- **Hero** — full-bleed warm image (placeholder), editorial serif headline with correct
  word spacing, primary `Order` + secondary `Menu` CTAs, and a subtle scroll cue.
- **Menu categories (01–04)** — `MenuCategoryCard` grid: numbered labels, image-zoom +
  description reveal on hover, equal heights, responsive `auto-fit` grid.
- **Signature sections** — alternating image/text (Dessert, Savory) on a sunken surface,
  body copy held to ~40ch for readability.
- **Franchise** — centered invitation block with location meta.
- **Footer** — wordmark, tagline, links.

## Interactions
- **EN ⇄ AR toggle** in the nav swaps all copy and flips `dir` to `rtl`; the layout mirrors
  via logical properties (`marginInline`, `insetInlineStart`, `borderBlock`).
- **Mobile nav** collapses to a hamburger sheet below 760px.
- **Scroll reveal** fades/slides content in once (IntersectionObserver + `[data-reveal]`),
  and stills under `prefers-reduced-motion`.
- **Order** shows a toast (stands in for the real Talabat hand-off).

## Files
- `index.html` — app shell: language state, RTL, nav, reveal observer, order toast.
- `sections.jsx` — `Hero`, `MenuGrid`, `Signature`, `Franchise`, `Footer`, `Placeholder`.
- `copy.js` — `window.CREPELLO_COPY` with full `EN` and `AR` content.

## Imagery
All photographs are warm gradient **placeholders** (labeled in the corner). Swap each for a
real `<img>` / Next `<Image>` — `MenuCategoryCard` accepts an `image` URL, and the hero /
signature blocks are single positioned layers. Keep the protection gradient + duotone over
photos so cream type stays AA-legible.
