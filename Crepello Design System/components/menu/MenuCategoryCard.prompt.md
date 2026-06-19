The signature numbered menu-category tile (Drinks / Dessert / Bakery / Brunch). Full-bleed warm image, `01` label, and a hover that zooms the image and reveals a one-line description. Equal-height by fixed 3:4 aspect — drop several in a responsive grid.

```jsx
<div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 'var(--space-5)' }}>
  <MenuCategoryCard num="01" title="Drinks" titleAr="المشروبات" desc="Slow coffee and house syrups." image="/img/drinks.jpg" />
  <MenuCategoryCard num="02" title="Dessert" tone="dessert" desc="Toasted caramel, warm crepe." />
</div>
```

`tone` (`neutral | dessert | savory`) colors the number + CTA. Omit `image` for a warm placeholder. Respects reduced-motion via token durations.
