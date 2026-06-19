The Crepello action button — use for any primary/secondary action; the caramel `primary` fill is the loudest moment in the system, so keep one per view.

```jsx
<Button variant="primary" size="lg" href="#order">Order</Button>
<Button variant="secondary">View the menu</Button>
<Button variant="ghost" iconRight={<span aria-hidden>→</span>}>Discover</Button>
```

Variants: `primary` (caramel fill, lifts + deepens on hover/press), `secondary` (hairline border → accent on hover), `ghost` (text only → accent-soft on hover). Sizes `sm | md | lg`. Pass `href` to render an `<a>`. Calm motion only — no bounce.
