Sticky, blurred glass top navigation for the Crepello site.

```jsx
<NavBar
  lang="EN"
  onToggleLang={() => setLang(l => l === 'EN' ? 'AR' : 'EN')}
  onOrder={() => scrollTo('#order')}
/>
```

Wordmark left, links centered, language toggle + caramel `Order` button right. Composes `Button`. Mirrors cleanly inside `[dir="rtl"]` (logical properties). On mobile, collapse `links` into a sheet (kit demonstrates this).
