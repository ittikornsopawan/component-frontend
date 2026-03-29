# Design Token System — Liquid Glass SaaS

Single source of truth for all visual decisions across the Input System, Element System, and future Pattern System.

---

## Architecture

```text
globals.css          ← CSS custom properties (RGB triplets for opacity support)
tailwind.config.ts   ← Extends Tailwind theme using those CSS vars
src/styles/tokens.ts ← TypeScript class-string exports for component code
src/components/element/base/tokens.ts  ← Element-specific bridge (re-exports global)
```

**Rule:** Never write raw color values, z-numbers, or duration strings in component code. Always import from `@/styles/tokens` or use the Tailwind classes that correspond to a named token.

---

## 1. Color System

All color scales are defined as CSS custom properties in `globals.css` as **RGB triplets** (no `#`, no `rgb()` wrapper). This enables Tailwind opacity modifiers to work:

```css
/* globals.css */
--brand-300: 216 180 254;
```

```tsx
/* Component usage */
className="bg-brand-300/50"   /* →  rgb(216 180 254 / 0.50) */
```

### Brand — Pastel Purple (Primary)

Used for: focus rings, CTAs, primary badges, interactive highlights.

| Token        | Value     | Hex       | Use case              |
|-------------|-----------|-----------|----------------------|
| `brand-50`  | 250 245 255 | `#faf5ff` | Page tints, very subtle BG |
| `brand-100` | 243 232 255 | `#f3e8ff` | Badge backgrounds      |
| `brand-200` | 233 213 255 | `#e9d5ff` | Hover backgrounds      |
| `brand-300` | 216 180 254 | `#d8b4fe` | **Focus ring**         |
| `brand-400` | 192 132 252 | `#c084fc` | **Text accent**        |
| `brand-500` | 168  85 247 | `#a855f7` | **Strong fill/button** |
| `brand-600` | 147  51 234 | `#9333ea` | Dark accent            |
| `brand-700` | 126  34 206 | `#7e22ce` | **Dark text**          |
| `brand-900` |  88  28 135 | `#581c87` | Very dark bg / dark mode tints |

### Accent — Pastel Blue (Secondary)

Used for: info states, secondary highlights, hover accents.

| Token         | Value     | Hex       | Use case        |
|--------------|-----------|-----------|----------------|
| `accent-50`  | 239 246 255 | `#eff6ff` | Subtle tint    |
| `accent-100` | 219 234 254 | `#dbeafe` | Info badge BG  |
| `accent-300` | 147 197 253 | `#93c5fd` | Info ring      |
| `accent-400` |  96 165 250 | `#60a5fa` | Text accent    |
| `accent-500` |  59 130 246 | `#3b82f6` | Strong fill    |
| `accent-700` |  29  78 216 | `#1d4ed8` | Dark text      |

### Success — Pastel Emerald

| Token           | Hex       | Use case              |
|----------------|-----------|----------------------|
| `success-100`  | `#d1fae5` | Badge BG              |
| `success-300`  | `#6ee7b7` | Ring / border         |
| `success-500`  | `#10b981` | Icon / status dot     |
| `success-700`  | `#047857` | Dark text             |

### Warning — Pastel Amber

| Token           | Hex       | Use case              |
|----------------|-----------|----------------------|
| `warning-100`  | `#fef3c7` | Badge BG              |
| `warning-300`  | `#fcd34d` | Ring / border         |
| `warning-500`  | `#f59e0b` | Icon / status dot     |
| `warning-700`  | `#b45309` | Dark text             |

### Error — Pastel Red (soft, not saturated)

| Token         | Hex       | Use case              |
|--------------|-----------|----------------------|
| `error-100`  | `#fee2e2` | Badge BG              |
| `error-300`  | `#fca5a5` | Ring / border         |
| `error-500`  | `#ef4444` | Icon / status dot     |
| `error-700`  | `#b91c1c` | Dark text             |

### Neutral — Slate (Glass-friendly)

Slate's cool undertone works best with glass surfaces compared to warm gray.

| Token           | Hex       | Use case                  |
|----------------|-----------|--------------------------|
| `neutral-50`   | `#f8fafc` | Page background (light)   |
| `neutral-100`  | `#f1f5f9` | Subtle section bg         |
| `neutral-400`  | `#94a3b8` | Placeholder text          |
| `neutral-500`  | `#64748b` | Muted text                |
| `neutral-700`  | `#334155` | Body text                 |
| `neutral-800`  | `#1e293b` | Heading text              |
| `neutral-900`  | `#0f172a` | Page background (dark)    |
| `neutral-950`  | `#020617` | Deep dark bg              |

---

## 2. Dark Mode Strategy

- **Class-based** (`darkMode: "class"` in `tailwind.config.ts`)
- Applied by toggling `class="dark"` on the root `<html>` or a wrapping `<div>`
- Dark overrides are written inline using `dark:` prefix — never separate selectors
- CSS custom property values are **not** swapped in dark mode for this system; opacity adjustments handle the difference

```tsx
// Correct
className="bg-white/60 dark:bg-white/5"

// Wrong — hardcoded values
style={{ backgroundColor: "#ffffff99" }}
```

---

## 3. Spacing System

Built on Tailwind's 4px base scale. Semantic names map to standard Tailwind steps.

| Name  | Tailwind class | px  | rem    | Use case                        |
|-------|---------------|-----|--------|--------------------------------|
| xs    | `p-1` / `gap-1` | 4   | 0.25   | Icon padding, dot badges        |
| sm    | `p-2` / `gap-2` | 8   | 0.50   | Tag padding, tight list items   |
| md    | `p-3` / `gap-3` | 12  | 0.75   | Input padding (vertical)        |
| lg    | `p-4` / `gap-4` | 16  | 1.00   | Card content gap                |
| xl    | `p-6` / `gap-6` | 24  | 1.50   | Card padding, section gap       |
| 2xl   | `p-8` / `gap-8` | 32  | 2.00   | Panel padding, page sections    |
| 3xl   | `p-12` / `gap-12` | 48 | 3.00  | Large section spacing           |

Additional mid-steps added to Tailwind config: `4.5` (18px), `13` (52px), `15` (60px), `18` (72px).

---

## 4. Border Radius

**Default = `rounded-2xl` (16px)** — applied to cards, inputs, panels, buttons.

| Token   | Class          | px  | Use case                           |
|--------|----------------|-----|-----------------------------------|
| sm     | `rounded-xl`   | 12  | Badges, chips, small buttons       |
| md     | `rounded-2xl`  | 16  | **DEFAULT** — cards, inputs, tabs  |
| lg     | `rounded-3xl`  | 24  | Large cards, panels, drawers       |
| xl     | `rounded-4xl`  | 32  | Modals, bottom sheets              |
| full   | `rounded-full` | 9999 | Pills, avatars, status dots       |

Never use `rounded` (4px) or `rounded-lg` (8px) — they are too sharp for the Liquid Glass aesthetic.

---

## 5. Shadow System (Glass Depth)

All `glass-*` shadows include an **inner top highlight** (`inset 0 1px 0 0 rgb(255 255 255 / X)`) that creates the glass material illusion on light surfaces.

| Token       | Outer blur | Inner highlight | Use case                       |
|------------|-----------|-----------------|-------------------------------|
| `glass-xs` | 4px / 5%  | 70% white       | Input fields, subtle elements  |
| `glass-sm` | 8px / 8%  | 60% white       | Badges, tags, tooltips         |
| `glass-md` | 16px / 10%| 50% white       | **Default** card shadow        |
| `glass-lg` | 32px / 12%| 40% white       | Elevated cards, panels         |
| `glass-xl` | 48px / 15%| 30% white       | Popovers, modals, dropdowns    |

Brand glow shadows for interactive states:

| Token          | Use case                            |
|---------------|-------------------------------------|
| `brand-sm`    | Subtle brand tint on hover           |
| `brand-md`    | CTA buttons, primary interactions    |
| `brand-glow`  | Pulsing glow animations              |

Soft shadows (non-glass contexts, e.g. print or reduced-motion):

`soft-sm` · `soft-md` · `soft-lg` · `soft-xl`

---

## 6. Glass Surface System

The core visual primitives of the Liquid Glass design language. Use the CSS class or TypeScript token.

| Level      | CSS class         | TS token           | Opacity  | Blur    |
|-----------|-------------------|-------------------|---------|--------|
| Float     | `.glass-float`    | `glass.float`     | 20/3%   | 2xl    |
| Base      | `.glass-surface`  | `glass.base`      | 60/5%   | xl     |
| Raised    | `.glass-raised`   | `glass.raised`    | 70/7%   | xl     |
| Elevated  | `.glass-elevated` | `glass.elevated`  | 80/8%   | xl     |
| Overlay   | `.glass-overlay`  | `glass.overlay`   | 80/80%  | xl     |

Format: `light% / dark%`

```tsx
// Using CSS class
<div className="glass-surface rounded-3xl p-6">...</div>

// Using TypeScript token
import { glass } from "@/styles/tokens";
<div className={cn(glass.base, "rounded-3xl p-6")}>...</div>
```

---

## 7. Motion Tokens

All animations MUST use these tokens. No hardcoded `150ms` or `cubic-bezier(...)` strings.

### Duration

| Name    | Value | CSS var                | Use case                         |
|--------|-------|------------------------|----------------------------------|
| fast   | 150ms | `--duration-fast`      | Hover BG, icon swap              |
| normal | 200ms | `--duration-normal`    | Default UI transitions           |
| slow   | 300ms | `--duration-slow`      | Panel slides, expansions         |
| slower | 500ms | `--duration-slower`    | Page-level transitions           |

### Easing

| Name        | Value                            | CSS var               | Use case                 |
|------------|----------------------------------|-----------------------|--------------------------|
| out        | `ease-out`                       | —                     | Default (most common)    |
| smooth     | `cubic-bezier(0.4, 0, 0.2, 1)`  | `--ease-smooth`       | Material-style transitions|
| spring     | `cubic-bezier(0.34, 1.56, 0.64, 1)` | `--ease-spring`  | Playful, slight overshoot|
| decelerate | `cubic-bezier(0, 0, 0.2, 1)`    | `--ease-decelerate`   | Entering elements        |
| accelerate | `cubic-bezier(0.4, 0, 1, 1)`    | `--ease-accelerate`   | Exiting elements         |

### Transition Shorthands

```ts
import { motion } from "@/styles/tokens";

motion.fast     // "transition-all duration-150 ease-out"
motion.base     // "transition-all duration-200 ease-out"
motion.slow     // "transition-all duration-300 ease-out"
motion.spring   // "transition-all duration-200 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
```

### Animation Classes

```ts
motion.animate.fadeIn      // "animate-fade-in"
motion.animate.slideDown   // "animate-slide-down"
motion.animate.shimmer     // "animate-shimmer"
motion.animate.glowPulse   // "animate-glow-pulse"
motion.animate.shakeSm     // "animate-shake-sm"   (validation error)
```

---

## 8. Z-Index System

Named tiers prevent arbitrary `z-[number]` proliferation. Portal-rendered overlays (Toast, Tooltip) always sit above page content.

| Name       | Value  | TS token           | Tailwind class   | Use case                    |
|-----------|--------|-------------------|------------------|-----------------------------|
| base      | 10     | `zIndex.base`     | `z-base`         | Normal stacking context     |
| hover     | 20     | `zIndex.hover`    | `z-hover`        | Hovered / focused elements  |
| active    | 30     | `zIndex.active`   | `z-active`       | Pressed / active elements   |
| dropdown  | 40     | `zIndex.dropdown` | `z-dropdown`     | Select menus, autocomplete  |
| sticky    | 50     | `zIndex.sticky`   | `z-sticky`       | Sticky headers, navbars     |
| overlay   | 100    | `zIndex.overlay`  | `z-overlay`      | Drawer backdrops, in-place overlays |
| modal     | 200    | `zIndex.modal`    | `z-modal`        | Dialogs, full-screen modals |
| toast     | 9000   | `zIndex.toast`    | `z-toast`        | Toast notifications (portal)|
| tooltip   | 9999   | `zIndex.tooltip`  | `z-tooltip`      | Tooltips (portal-rendered)  |

---

## 9. Typography

| Preset         | Size  | Weight   | Leading  | Use case                      |
|---------------|-------|----------|----------|-------------------------------|
| `page-title`  | 2xl   | bold     | tight    | Page H1                       |
| `section-title` | lg  | semibold | snug     | Section headings              |
| `card-title`  | base  | semibold | snug     | Card / widget titles          |
| `label`       | sm    | medium   | normal   | Form labels, list headers     |
| `body`        | sm    | regular  | relaxed  | Descriptions, paragraphs      |
| `caption`     | xs    | regular  | normal   | Timestamps, metadata          |
| `overline`    | 11px  | semibold | —        | Section labels (uppercase)    |
| `code`        | xs    | mono     | —        | Inline code snippets          |

```tsx
import { typography } from "@/styles/tokens";

<h1 className={typography.preset["page-title"]}>Dashboard</h1>
<p  className={typography.preset.body}>Lorem ipsum...</p>
<span className={typography.preset.overline}>Last 30 days</span>
```

---

## 10. Token Usage Rules

### MUST

- Use semantic token names (never raw Tailwind color names like `purple-700`)
- Use glass surface classes from `@/styles/tokens` or CSS component classes
- Use motion tokens for all animation/transition durations and easings
- Use named z-index tiers — never write `z-[99]` or `z-40` directly

### MUST NOT

```tsx
// ❌ Hardcoded hex
style={{ backgroundColor: "#c084fc" }}

// ❌ Arbitrary opacity without token intent
className="bg-[#ffffff99]"

// ❌ Raw z-number
className="z-[9999]"

// ❌ Raw duration
style={{ transitionDuration: "200ms" }}

// ❌ Brand colors via non-semantic Tailwind names
className="bg-purple-100 text-purple-700"
```

```tsx
// ✅ Semantic token
import { color } from "@/styles/tokens";
className={color.brand.bg.muted}

// ✅ Tailwind semantic class (from token scale)
className="bg-brand-100/70 dark:bg-brand-900/30 text-brand-700 dark:text-brand-300"

// ✅ Named z-index
className="z-tooltip"

// ✅ Motion token
import { motion } from "@/styles/tokens";
className={motion.base}
```

---

## 11. Token Import Paths

| Import | What you get |
|-------|-------------|
| `import tokens from "@/styles/tokens"` | All tokens as default bundle |
| `import { color, glass, motion, ... } from "@/styles/tokens"` | Named exports |
| `import { color, surface, focus } from "@/components/element/base/tokens"` | Element-specific bridge (same values) |

---

## 12. Adding New Tokens

1. **CSS vars** — add to `:root` in `globals.css` as RGB triplet
2. **Tailwind** — add to corresponding `extend` key in `tailwind.config.ts` using `rgb(var(--name) / <alpha-value>)` pattern
3. **TypeScript** — add to the relevant object in `src/styles/tokens.ts`
4. **Document** — add row to the relevant table in this file

Never skip step 1 — without the CSS variable, the Tailwind opacity modifier won't work.
