Generic dark surface card — the base container for content blocks.

```jsx
<Card>
  <Eyebrow num="01">Drinks</Eyebrow>
  <p className="prose">Slow-pressed coffee and house syrups.</p>
</Card>
<Card raised>Elevated variant with soft shadow.</Card>
```

Defaults to `--surface-card` with a hairline border; `raised` brightens it and adds `--shadow-md`. For the numbered hover-zoom menu tiles use `MenuCategoryCard` instead.
