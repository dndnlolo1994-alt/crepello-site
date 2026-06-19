---
name: crepello-design
description: Use this skill to generate well-branded interfaces and assets for Crepello — a premium "Atelier" restaurant-café from Jordan (crepes, waffles, bakery, slow coffee). Dark-luxury, editorial, bilingual EN/AR. Contains design tokens, colors, type, fonts, assets, and UI-kit components for production or throwaway prototypes/mocks.
user-invocable: true
---

Read the `readme.md` file within this skill, and explore the other available files
(`styles.css` + `tokens/`, `components/`, `ui_kits/`, `guidelines/`).

If creating visual artifacts (slides, mocks, throwaway prototypes, etc.), copy assets out
and create static HTML files for the user to view — link `styles.css`, load `_ds_bundle.js`,
and read components from `window.<Namespace>` (run the design-system check to get the exact
namespace). If working on production code, copy assets and read the rules here to become an
expert in designing with this brand.

Core rules to honor every time:
- Near-black `#050505` base; one toasted-caramel accent used sparingly; warm "sand" neutrals.
- Editorial serif (Bodoni Moda) display + Hanken Grotesk body + Space Mono numbered eyebrows;
  Amiri + IBM Plex Sans Arabic for Arabic. **Never** crush display letter-spacing — and never
  drop the spaces between heading words (the original site's bug).
- Generous 8px-based spacing, tight radii, deep warm shadows, calm fade/slide motion that
  respects `prefers-reduced-motion`.
- Bilingual EN/AR with correct RTL mirroring (logical CSS properties). No emoji as UI.

If the user invokes this skill without other guidance, ask what they want to build or design,
ask a few focused questions, and act as an expert designer who outputs HTML artifacts _or_
production code depending on the need.
