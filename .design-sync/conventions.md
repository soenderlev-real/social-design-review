## Setup

No provider or context wrapper is required — none of the synced components read from React context. Import directly and render:

```jsx
import { Header, ConceptCard } from 'social-design-review';

<Header onLogoClick={() => {}} onInstructionsClick={() => {}} showBack={false} />
```

Load `styles.css` once at the app root — it pulls in the compiled Tailwind utilities and the two `@font-face` rules for Space Mono (regular 400, bold 700). Nothing else needs to be loaded or configured.

## Styling idiom

This is a Tailwind utility-class system with a small custom palette layered on top of Tailwind's defaults — there is no CSS-variable theming and no styling props on the components. Compose new layout/glue elements with the same utility classes the library itself uses, from this real vocabulary (not Tailwind's stock colors):

| Class family | Use |
|---|---|
| `bg-dark` / `text-dark` / `border-dark` | primary ink — near-black navy, the default text and border color |
| `bg-darker` / `text-darker` | secondary ink, one step lighter than `dark` |
| `bg-muted` / `text-muted` | tertiary/label text, placeholders |
| `bg-light` / `text-light` | page background, and text-on-dark |
| `bg-lighter` / `border-lighter` | subtle backgrounds, hairline dividers |
| `bg-rb-{red,orange,green,blue}` + `-tint` | semantic status fills (error/warning/success/info tint backgrounds) |
| `text-rb-{red,orange,green,blue}` (+ `-shade` variants) | semantic status text, e.g. `text-rb-green-shade` for success copy on a `bg-rb-green-tint` panel |
| `border-rb-{red,orange,green,blue}` | semantic status borders, always paired with the matching bg/text |

Structural convention: **2px borders everywhere, no rounded corners** (`border-2 border-dark`, never `rounded-*`). This is a deliberately flat, bordered, "spec-sheet" visual language — square badges (`w-8 h-8 border-2 border-dark flex items-center justify-center`), sharp-edged cards, no shadows or gradients. Don't soften it with rounding or drop shadows; that would read as off-brand.

Type is Space Mono throughout — headings and body both — with tight letter-spacing (`tracking-tight`/`-0.02em` territory) and uppercase, letter-spaced labels for eyebrows (`text-xs font-bold uppercase tracking-widest text-muted`).

## Where the truth lives

- `styles.css` — the full compiled utility set + font-faces; read it directly for exact class output rather than guessing Tailwind config values.
- `components/general/<Name>/<Name>.prompt.md` — per-component usage notes and the real prop shapes used in the authored previews.
- `components/general/<Name>/<Name>.d.ts` — the prop contract. Note: this repo has no TypeScript source, so these interfaces were hand-written from the real destructured props at the call site, not extracted from types — trust them as accurate, but they won't carry JSDoc beyond what's here.

## Build example

`ConceptCard` is the core reusable primitive — an accordion-style status card, styled entirely through the classes above:

```jsx
<ConceptCard
  concept={{
    id: 'identity',
    title: 'Identity',
    icon: 'User',
    shortDesc: 'How users reveal, manage, and control who they are',
    promptContext: '…',
    darkPatterns: ['…'],
    lightPatterns: ['…'],
    keyQuestions: ['…'],
  }}
  result={{ status: 'done', score: 4, strengths: '- …', assessment: '…', recommendations: '- …', europeanPerspective: '…' }}
  isExpanded={true}
  onToggle={() => {}}
  mode="review"
/>
```

`result.status` drives the whole visual state machine (`idle` / `pending` / `done` / `error`) — always pass a real status rather than an empty object, or the card renders its bare idle header only.
