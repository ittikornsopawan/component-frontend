# Motion System — Liquid Glass SaaS

A complete motion language for the UI framework. Motion is functional communication — every animation explains a state change, guides attention, or confirms an interaction.

---

## Core Principles

| # | Principle | Meaning |
|---|-----------|---------|
| 1 | **Functional** | Every animation must earn its place by communicating something |
| 2 | **Subtle** | No aggressive bounce, no distracting effects, no large movements |
| 3 | **Fast** | Interactions feel instant — motion never blocks the user |
| 4 | **Accessible** | All motion respects `prefers-reduced-motion` without exception |

---

## Architecture

```text
tailwind.config.ts         ← transitionDuration, transitionTimingFunction, keyframes
src/styles/motion.ts       ← TypeScript token exports (durations, easings, variants, configs)
src/app/globals.css        ← CSS custom properties, prefers-reduced-motion, utility classes
```

---

## 1. Duration Tokens

All durations are defined in `src/styles/motion.ts` as `duration.*`.

| Name | ms | Tailwind | Framer (s) | Use case |
|------|----|----------|------------|----------|
| `instant` | 100ms | `duration-[100ms]` | 0.10 | Icon swap, color flash |
| `fast` | 150ms | `duration-150` | 0.15 | Hover bg, focus ring |
| `normal` | 200ms | `duration-200` | 0.20 | Dropdown open, card hover |
| `moderate` | 250ms | `duration-[250ms]` | 0.25 | Datepicker, rich popovers |
| `slow` | 300ms | `duration-300` | 0.30 | Modal open, panel slide |
| `slower` | 500ms | `duration-500` | 0.50 | Page-level transitions |

```ts
import { duration } from "@/styles/motion";

// In Tailwind className
className={duration.tw.fast}           // "duration-150"

// In Framer Motion
transition={{ duration: duration.s.normal }}   // 0.20

// In JavaScript
setTimeout(callback, duration.ms.slow)         // 300
```

---

## 2. Easing Tokens

All easings are in `easing.*` with three sub-namespaces: `fm` (Framer arrays), `css` (CSS strings), `tw` (Tailwind classes).

| Name | Curve | Best for |
|------|-------|----------|
| `default` | `ease-out` | Standard exits, most transitions |
| `smooth` | `cubic-bezier(0.4, 0, 0.2, 1)` | Material-style, feels polished |
| `soft` | `cubic-bezier(0.25, 0.1, 0.25, 1)` | Gentle transitions, floating surfaces |
| `spring` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Playful overshoot (use sparingly) |
| `decelerate` | `cubic-bezier(0, 0, 0.2, 1)` | Elements **entering** the screen |
| `accelerate` | `cubic-bezier(0.4, 0, 1, 1)` | Elements **exiting** the screen |

```ts
import { easing } from "@/styles/motion";

// Framer Motion
transition={{ ease: easing.fm.decelerate, duration: 0.2 }}

// CSS
style={{ transitionTimingFunction: easing.css.smooth }}

// Tailwind class
className={easing.tw.smooth}    // "ease-smooth"
```

**Rule:** Use `decelerate` for entering, `accelerate` for exiting. This matches how the human eye perceives natural movement.

---

## 3. Transition Presets

Pre-built `transition-*` class strings in `transition.*`.

```ts
import { transition } from "@/styles/motion";

transition.fast      // "transition-all duration-150 ease-out"
transition.base      // "transition-all duration-200 ease-out"       ← default
transition.smooth    // "transition-all duration-200 ease-smooth"
transition.slow      // "transition-all duration-300 ease-out"
transition.spring    // "transition-all duration-200 ease-spring"
transition.opacity   // "transition-opacity duration-150 ease-out"   ← GPU-friendly
transition.colors    // "transition-colors duration-150 ease-out"    ← GPU-friendly
transition.transform // "transition-transform duration-200 ease-out" ← GPU-friendly
```

Prefer property-specific transitions (`transition.opacity`, `transition.transform`) over `transition-all` on performance-critical paths (lists, tables, infinite scroll).

---

## 4. Micro Interactions

### Hover

```ts
import { interaction } from "@/styles/motion";

interaction.hover.surface   // translate-y + shadow + bg  ← cards
interaction.hover.lift      // stronger lift              ← featured cards
interaction.hover.scale     // scale-[1.02]               ← icon buttons
interaction.hover.glow      // brand shadow tint          ← primary CTAs
interaction.hover.bg        // bg only, no movement       ← list rows
interaction.hover.ring      // selection ring             ← grid items
```

### Focus

```ts
interaction.focus.ring      // brand-300/50 focus ring + offset-2
interaction.focus.ringInset // inset version for inputs
interaction.focus.scale     // scale-[1.01] lift
interaction.focus.shadow    // shadow-glass-lg on focus
interaction.focus.error     // red focus ring for invalid state
```

### Active / Press

```ts
interaction.active.press    // scale-[0.98] + translate-y-0 reset
interaction.active.subtle   // scale-[0.99] for light press
interaction.active.dim      // brightness-90 for icon buttons
```

### Disabled

```ts
interaction.disabled        // opacity-50 + cursor-not-allowed + saturate-50
```

---

## 5. Component Motion Configs

Complete motion className bundles for each component type.

### Cards / Surfaces

```ts
import { cardMotion } from "@/styles/motion";

cardMotion.hoverable    // surface hover, no click press
cardMotion.clickable    // full hover + press for clickable cards
cardMotion.interactive  // ring-based selection for grid/list cards
cardMotion.stat         // stat card with brand glow on hover
```

### Buttons

```ts
import { buttonMotion } from "@/styles/motion";

buttonMotion.primary   // glow shadow + press + focus ring
buttonMotion.ghost     // bg only + subtle press + focus ring
buttonMotion.icon      // scale hover + brightness press + focus ring
buttonMotion.danger    // red glow + press + error focus ring
```

### Inputs

```ts
import { inputMotion } from "@/styles/motion";

inputMotion.base       // focus ring + shadow lift + scale-[1.01]
inputMotion.error      // "animate-shake-sm" — apply on validation failure
inputMotion.clearBtn   // opacity-0 → visible on hover/focus-within
inputMotion.icon       // text color shift to brand on focus
```

### Overlays (Dropdown / Popover)

```ts
import { overlayMotion } from "@/styles/motion";

overlayMotion.enter    // "animate-slide-down"
overlayMotion.exit     // "animate-fade-out"
```

### Modal / Dialog

```ts
import { modalMotion } from "@/styles/motion";

modalMotion.backdrop.enter  // "animate-fade-in"
modalMotion.backdrop.exit   // "animate-fade-out"
modalMotion.panel.enter     // "animate-fade-in"
modalMotion.panel.exit      // "animate-fade-out"
```

### Toast

```ts
import { toastMotion } from "@/styles/motion";

toastMotion.enter     // "animate-slide-up"
toastMotion.exit      // "animate-fade-out"
toastMotion.progress  // "animate-progress"
toastMotion.shift     // smooth position shift when toasts stack
```

### Loading

```ts
import { loadingMotion } from "@/styles/motion";

loadingMotion.spinner   // "animate-spin"
loadingMotion.skeleton  // "animate-shimmer"
loadingMotion.pulse     // "animate-glow-pulse"
loadingMotion.bounce    // "animate-bounce-subtle"
```

### Navigation

```ts
import { navMotion } from "@/styles/motion";

navMotion.tabIndicator  // smooth absolute indicator for tab underlines
navMotion.pageEnter     // "animate-fade-in" for page-level content
navMotion.page          // pagination button hover + press
```

---

## 6. Framer Motion Variants

Pre-built variant objects for `<motion.div variants={...}>` usage.

```tsx
import { variants, spring, duration, easing } from "@/styles/motion";
import { motion, AnimatePresence } from "framer-motion";

// ── Fade ──────────────────────────────────────────────────────────────────
<motion.div variants={variants.fade} initial="hidden" animate="visible" exit="exit" />

// ── Scale Fade (dropdown / popover) ──────────────────────────────────────
<motion.div variants={variants.scaleFade} initial="hidden" animate="visible" exit="exit" />

// ── Slide Down (command palette, select menu) ──────────────────────────
<motion.div variants={variants.slideDown} initial="hidden" animate="visible" exit="exit" />

// ── Modal ─────────────────────────────────────────────────────────────────
<AnimatePresence>
  {open && (
    <>
      <motion.div
        className="fixed inset-0 glass-overlay"
        variants={variants.backdrop}
        initial="hidden" animate="visible" exit="exit"
      />
      <motion.div
        className="fixed inset-0 flex items-center justify-center"
        variants={variants.modal}
        initial="hidden" animate="visible" exit="exit"
      >
        {children}
      </motion.div>
    </>
  )}
</AnimatePresence>

// ── Stagger list items ────────────────────────────────────────────────────
<motion.ul variants={variants.staggerContainer} initial="hidden" animate="visible">
  {items.map(item => (
    <motion.li key={item.id} variants={variants.staggerItem}>{item.label}</motion.li>
  ))}
</motion.ul>

// ── Card with hover + tap ────────────────────────────────────────────────
<motion.div
  initial="rest"
  whileHover="hover"
  whileTap="tap"
  variants={variants.cardHover}
/>
```

### Spring Configs

```tsx
import { spring } from "@/styles/motion";

// Gentle — card hover lift
<motion.div whileHover={{ y: -2 }} transition={spring.gentle} />

// Snappy — toggle switch, button tap
<motion.button whileTap={{ scale: 0.97 }} transition={spring.snappy} />

// Stiff — tab indicator sliding under active tab
<motion.div layout transition={spring.stiff} />
```

---

## 7. State Transitions (Content Swap)

When content changes state (loading → data, empty → filled), never abruptly replace it.

```tsx
import { variants } from "@/styles/motion";
import { motion, AnimatePresence } from "framer-motion";

<AnimatePresence mode="wait">
  {isLoading ? (
    <motion.div key="loading" variants={variants.contentSwap} initial="hidden" animate="visible" exit="exit">
      <Skeleton />
    </motion.div>
  ) : (
    <motion.div key="content" variants={variants.contentSwap} initial="hidden" animate="visible" exit="exit">
      <DataTable />
    </motion.div>
  )}
</AnimatePresence>
```

---

## 8. CSS Utility Classes

Available globally from `globals.css`:

```html
<!-- Hover lifts -->
<div class="motion-hover-lift-sm">...</div>   <!-- translateY(-2px) + glass-lg shadow -->
<div class="motion-hover-lift">...</div>       <!-- translateY(-4px) + glass-xl shadow -->

<!-- Press -->
<button class="motion-press">...</button>      <!-- scale(0.98) on active -->
<button class="motion-press-sm">...</button>   <!-- scale(0.99) on active -->

<!-- Focus ring -->
<button class="motion-focus-ring">...</button> <!-- brand-300/50 focus-visible ring -->

<!-- Reduced-motion safe opacity transition -->
<div class="motion-safe">...</div>
```

---

## 9. Accessibility — prefers-reduced-motion

**This is non-negotiable.** The global CSS collapses all animation durations to `0.01ms` when the user has enabled reduced motion in their OS settings.

### What gets disabled automatically

- All `transition-*` and `animation-*` properties collapse to `0.01ms`
- `animate-spin`, `animate-glow-pulse`, `animate-shimmer`, `animate-bounce-subtle`, `animate-ping-sm` are fully paused
- Skeleton shimmer falls back to a static muted fill

### What stays active

- Opacity transitions (`0.01ms` — still triggers `transitionend` for JS hooks)
- Static layout and color states

### Framer Motion

Always wrap Framer Motion components with the `useReducedMotion` hook:

```tsx
import { useReducedMotion } from "framer-motion";
import { variants, reducedMotion } from "@/styles/motion";

function AnimatedCard() {
  const prefersReduced = useReducedMotion();

  return (
    <motion.div
      variants={prefersReduced ? undefined : variants.scaleFade}
      transition={prefersReduced ? reducedMotion.fmSafe : undefined}
      initial="hidden"
      animate="visible"
    >
      ...
    </motion.div>
  );
}
```

---

## 10. Do / Don't

### Do

```tsx
// ✅ Use transition presets
import { transition, interaction } from "@/styles/motion";
className={cn(transition.base, interaction.hover.surface)}

// ✅ Use named animation classes
className="animate-fade-in"

// ✅ Use easing tokens in Framer Motion
transition={{ duration: duration.s.normal, ease: easing.fm.decelerate }}

// ✅ Check for reduced motion in Framer components
const prefersReduced = useReducedMotion();

// ✅ Use property-specific transitions on perf-critical paths
className={transition.transform}
```

### Don't

```tsx
// ❌ Hardcoded duration
style={{ transitionDuration: "200ms" }}

// ❌ Hardcoded cubic-bezier
style={{ transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)" }}

// ❌ Large movement
className="hover:-translate-y-4"   // too much — max is -translate-y-1

// ❌ Bounce on functional UI
transition={{ type: "spring", bounce: 0.6 }}  // only for celebratory moments

// ❌ Transition-all on large lists
// (triggers layout recalculation on every frame)
className="transition-all"   // use transition-transform or transition-opacity

// ❌ Skipping reduced-motion support
// every animated component must handle prefers-reduced-motion
```

---

## 11. Quick Reference — When to Use What

| Situation | Token / Variant | Duration |
|-----------|----------------|----------|
| Button hover bg change | `transition.fast` + `interaction.hover.bg` | 150ms |
| Card hover lift | `cardMotion.hoverable` | 200ms |
| Input focus ring | `inputMotion.base` | 150ms |
| Input validation error | `inputMotion.error` (shake) | 400ms |
| Dropdown open | `overlayMotion.enter` | 200ms |
| Modal open | `variants.modal` | 300ms |
| Toast enter | `toastMotion.enter` | 200ms |
| Skeleton shimmer | `loadingMotion.skeleton` | 2s loop |
| Tab indicator slide | `navMotion.tabIndicator` + layout | 200ms |
| Page content enter | `navMotion.pageEnter` | 150ms |
| List stagger | `variants.staggerContainer` | 40ms per item |
| Content state swap | `variants.contentSwap` + AnimatePresence | 200ms |
