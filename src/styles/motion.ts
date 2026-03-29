// ─── Motion System — Liquid Glass SaaS ───────────────────────────────────────
//
// Complete motion token system for the UI framework.
// Integrates with tailwind.config.ts (class strings) and provides raw values
// for Framer Motion, CSS animations, and JS-driven transitions.
//
// Principles:
//   1. Functional — every animation communicates state, not decoration
//   2. Subtle — no aggressive bounce, no distracting effects
//   3. Fast — interactions feel instant, never block the user
//   4. Accessible — all motion respects prefers-reduced-motion
//
// Usage:
//   import { transition, interaction, variants } from "@/styles/motion";
//   className={cn(transition.base, interaction.hover.surface)}
//
// ─────────────────────────────────────────────────────────────────────────────

// ─── Duration ─────────────────────────────────────────────────────────────────
// Raw ms values for Framer Motion / JS and Tailwind class strings.

export const duration = {
  // Raw values (ms) — use with Framer Motion `duration` prop (convert to seconds)
  ms: {
    instant:  100,   // icon swap, color flash — near-instant
    fast:     150,   // hover bg, focus ring fade-in
    normal:   200,   // dropdown open, card hover
    moderate: 250,   // datepicker, popovers
    slow:     300,   // modal open, panel slide
    slower:   500,   // page transitions
  },
  // Framer Motion values (seconds)
  s: {
    instant:  0.10,
    fast:     0.15,
    normal:   0.20,
    moderate: 0.25,
    slow:     0.30,
    slower:   0.50,
  },
  // Tailwind class strings
  tw: {
    instant:  "duration-[100ms]",
    fast:     "duration-150",
    normal:   "duration-200",
    moderate: "duration-[250ms]",
    slow:     "duration-300",
    slower:   "duration-500",
  },
} as const;

// ─── Easing ───────────────────────────────────────────────────────────────────
// Raw cubic-bezier arrays for Framer Motion, CSS strings for direct use,
// and Tailwind class strings for className composition.

export const easing = {
  // Framer Motion `ease` arrays
  fm: {
    default:    [0, 0, 0.58, 1],           // ease-out
    smooth:     [0.4, 0, 0.2, 1],          // Material standard
    soft:       [0.25, 0.1, 0.25, 1],      // gentle, CSS ease
    spring:     [0.34, 1.56, 0.64, 1],     // slight overshoot (use sparingly)
    decelerate: [0, 0, 0.2, 1],            // entering elements
    accelerate: [0.4, 0, 1, 1],            // exiting elements
  },
  // CSS string values
  css: {
    default:    "ease-out",
    smooth:     "cubic-bezier(0.4, 0, 0.2, 1)",
    soft:       "cubic-bezier(0.25, 0.1, 0.25, 1)",
    spring:     "cubic-bezier(0.34, 1.56, 0.64, 1)",
    decelerate: "cubic-bezier(0, 0, 0.2, 1)",
    accelerate: "cubic-bezier(0.4, 0, 1, 1)",
  },
  // Tailwind class strings
  tw: {
    default:    "ease-out",
    smooth:     "ease-smooth",
    soft:       "ease-soft",
    spring:     "ease-spring",
    decelerate: "ease-decelerate",
    accelerate: "ease-accelerate",
  },
} as const;

// ─── Transition Presets ───────────────────────────────────────────────────────
// Complete `transition-*` class combinations for className composition.
// Use `transition.base` for the vast majority of components.

export const transition = {
  // General purpose
  instant:   "transition-all duration-[100ms] ease-out",
  fast:      "transition-all duration-150 ease-out",
  base:      "transition-all duration-200 ease-out",
  smooth:    "transition-all duration-200 ease-smooth",
  slow:      "transition-all duration-300 ease-out",
  slower:    "transition-all duration-500 ease-out",
  spring:    "transition-all duration-200 ease-spring",
  soft:      "transition-all duration-200 ease-soft",

  // Property-specific (better GPU performance — prefer these for transforms)
  opacity:   "transition-opacity duration-150 ease-out",
  shadow:    "transition-shadow duration-200 ease-out",
  colors:    "transition-colors duration-150 ease-out",
  transform: "transition-transform duration-200 ease-out",
  scale:     "transition-[transform,opacity] duration-200 ease-out",
  none:      "transition-none",
} as const;

// ─── Micro Interaction States ─────────────────────────────────────────────────
// Compose these with transition presets on interactive elements.

export const interaction = {

  // ── Hover ─────────────────────────────────────────────────────────────────
  hover: {
    // Surface lift — default for cards
    surface:   "hover:-translate-y-0.5 hover:shadow-glass-lg hover:bg-white/75 dark:hover:bg-white/8",
    // Stronger lift — elevated cards, stat cards
    lift:      "hover:-translate-y-1 hover:shadow-glass-xl",
    // Scale only — for icon buttons, badges
    scale:     "hover:scale-[1.02]",
    // Subtle scale — for large surfaces
    scaleSm:   "hover:scale-[1.01]",
    // Brand glow — primary CTAs
    glow:      "hover:shadow-brand-md",
    // Brightness — for media, avatars
    bright:    "hover:brightness-105",
    // Background only — for list items, rows
    bg:        "hover:bg-white/75 dark:hover:bg-white/8",
    // Ring highlight — for selectable grid items
    ring:      "hover:ring-2 hover:ring-brand-300/30 dark:hover:ring-brand-400/20",
  },

  // ── Focus ─────────────────────────────────────────────────────────────────
  focus: {
    // Standard accessible focus ring
    ring:      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-300/50 focus-visible:ring-offset-2",
    // Inset ring for inputs
    ringInset: "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand-300/50",
    // Scale lift — for inputs (subtle, communicates "active")
    scale:     "focus-visible:scale-[1.01]",
    // Shadow lift on focus
    shadow:    "focus-visible:shadow-glass-lg",
    // Error state ring
    error:     "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-error-300/50",
  },

  // ── Active / Press ────────────────────────────────────────────────────────
  active: {
    // Default press — cards, buttons
    press:     "active:scale-[0.98] active:shadow-glass-sm active:translate-y-0",
    // Subtle press — list items, menu items
    subtle:    "active:scale-[0.99]",
    // Brightness dip — icon buttons
    dim:       "active:brightness-90",
  },

  // ── Disabled ──────────────────────────────────────────────────────────────
  disabled:    "disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none disabled:saturate-50",

} as const;

// ─── Component Motion Configs ─────────────────────────────────────────────────
// Ready-to-apply className bundles for each component category.
// Combine transition + interaction for complete motion behavior.

// ── Cards / Surfaces ──────────────────────────────────────────────────────────
export const cardMotion = {
  // Hoverable but not clickable
  hoverable:   `${transition.base} ${interaction.hover.surface}`,
  // Clickable card (full press behavior)
  clickable:   `${transition.base} cursor-pointer ${interaction.hover.lift} ${interaction.active.press}`,
  // Interactive (ring-based selection)
  interactive: `${transition.fast} ${interaction.hover.ring} hover:shadow-glass-lg`,
  // Stat/metric card
  stat:        `${transition.base} ${interaction.hover.surface} hover:shadow-brand-sm`,
} as const;

// ── Buttons ───────────────────────────────────────────────────────────────────
export const buttonMotion = {
  // Primary brand button
  primary:  `${transition.fast} ${interaction.hover.glow} ${interaction.active.press} ${interaction.focus.ring}`,
  // Secondary / ghost button
  ghost:    `${transition.fast} ${interaction.hover.bg} ${interaction.active.subtle} ${interaction.focus.ring}`,
  // Icon button
  icon:     `${transition.fast} ${interaction.hover.scale} ${interaction.active.dim} ${interaction.focus.ring}`,
  // Danger button
  danger:   `${transition.fast} hover:shadow-[0_4px_16px_0_rgb(248_113_113_/_0.20)] ${interaction.active.press} ${interaction.focus.error}`,
} as const;

// ── Inputs ────────────────────────────────────────────────────────────────────
export const inputMotion = {
  // Standard glass input
  base:      `${transition.base} ${interaction.focus.ringInset} focus:shadow-glass-md focus:scale-[1.01]`,
  // Error shake (applied temporarily via JS)
  error:     "animate-shake-sm",
  // Clear/icon button inside input
  clearBtn:  `${transition.fast} opacity-0 group-hover:opacity-100 group-focus-within:opacity-100`,
  // Prefix/suffix icon color shift
  icon:      `${transition.colors} text-neutral-400 group-focus-within:text-brand-400`,
} as const;

// ── Overlays: Dropdown / Popover / Select ────────────────────────────────────
export const overlayMotion = {
  // Panel animation classes
  enter:     "animate-slide-down",
  exit:      "animate-fade-out",
  // For Tailwind data-state patterns (Radix / Headless UI compatible)
  "data-enter": "data-[state=open]:animate-slide-down data-[state=closed]:animate-fade-out",
} as const;

// ── Modal / Dialog ────────────────────────────────────────────────────────────
export const modalMotion = {
  backdrop: {
    enter: "animate-fade-in",
    exit:  "animate-fade-out",
  },
  panel: {
    enter: "animate-fade-in",
    exit:  "animate-fade-out",
  },
} as const;

// ── Toast / Notification ──────────────────────────────────────────────────────
export const toastMotion = {
  enter:    "animate-slide-up",
  exit:     "animate-fade-out",
  progress: "animate-progress",
  // Position shift when stacking
  shift:    `${transition.smooth}`,
} as const;

// ── Loading States ────────────────────────────────────────────────────────────
export const loadingMotion = {
  spinner:  "animate-spin",
  spinSlow: "animate-spin-slow",
  skeleton: "animate-shimmer",
  pulse:    "animate-glow-pulse",
  ping:     "animate-ping-sm",
  bounce:   "animate-bounce-subtle",
} as const;

// ── Navigation ────────────────────────────────────────────────────────────────
export const navMotion = {
  // Tab active indicator
  tabIndicator: `${transition.smooth} absolute inset-x-0 bottom-0`,
  // Page enter
  pageEnter:    "animate-fade-in",
  // Breadcrumb separator
  separator:    `${transition.colors} text-neutral-300 dark:text-neutral-700`,
  // Pagination button
  page:         `${transition.fast} ${interaction.hover.scale} ${interaction.active.subtle}`,
} as const;

// ─── Framer Motion Variants ───────────────────────────────────────────────────
// Pre-built variant objects for use with <motion.div variants={...} />.
// Requires framer-motion to be installed: npm i framer-motion

export const variants = {

  // ── Fade In / Out ──────────────────────────────────────────────────────────
  fade: {
    hidden:  { opacity: 0 },
    visible: { opacity: 1, transition: { duration: duration.s.fast, ease: easing.fm.default } },
    exit:    { opacity: 0, transition: { duration: duration.s.fast, ease: easing.fm.accelerate } },
  },

  // ── Scale Fade (dropdown / popover) ───────────────────────────────────────
  scaleFade: {
    hidden:  { opacity: 0, scale: 0.97 },
    visible: { opacity: 1, scale: 1,    transition: { duration: duration.s.normal, ease: easing.fm.decelerate } },
    exit:    { opacity: 0, scale: 0.97, transition: { duration: duration.s.fast,   ease: easing.fm.accelerate } },
  },

  // ── Slide Down (dropdown, command palette) ─────────────────────────────────
  slideDown: {
    hidden:  { opacity: 0, y: -8 },
    visible: { opacity: 1, y: 0,  transition: { duration: duration.s.normal, ease: easing.fm.decelerate } },
    exit:    { opacity: 0, y: -8, transition: { duration: duration.s.fast,   ease: easing.fm.accelerate } },
  },

  // ── Slide Up (toast, bottom sheet) ────────────────────────────────────────
  slideUp: {
    hidden:  { opacity: 0, y: 8  },
    visible: { opacity: 1, y: 0,  transition: { duration: duration.s.normal, ease: easing.fm.decelerate } },
    exit:    { opacity: 0, y: 8,  transition: { duration: duration.s.fast,   ease: easing.fm.accelerate } },
  },

  // ── Slide Right (side drawer) ──────────────────────────────────────────────
  slideRight: {
    hidden:  { opacity: 0, x: -16 },
    visible: { opacity: 1, x: 0,   transition: { duration: duration.s.slow, ease: easing.fm.decelerate } },
    exit:    { opacity: 0, x: -16, transition: { duration: duration.s.normal, ease: easing.fm.accelerate } },
  },

  // ── Modal Panel ───────────────────────────────────────────────────────────
  modal: {
    hidden:  { opacity: 0, scale: 0.96, y: 8  },
    visible: { opacity: 1, scale: 1,    y: 0,  transition: { duration: duration.s.slow,   ease: easing.fm.decelerate } },
    exit:    { opacity: 0, scale: 0.96, y: 8,  transition: { duration: duration.s.normal, ease: easing.fm.accelerate } },
  },

  // ── Modal Backdrop ────────────────────────────────────────────────────────
  backdrop: {
    hidden:  { opacity: 0 },
    visible: { opacity: 1, transition: { duration: duration.s.normal, ease: easing.fm.default } },
    exit:    { opacity: 0, transition: { duration: duration.s.fast,   ease: easing.fm.default } },
  },

  // ── Stagger children (list items, grid cards) ─────────────────────────────
  staggerContainer: {
    hidden:  { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.04,
        delayChildren:   0.02,
      },
    },
  },

  staggerItem: {
    hidden:  { opacity: 0, y: 6  },
    visible: { opacity: 1, y: 0,  transition: { duration: duration.s.normal, ease: easing.fm.decelerate } },
  },

  // ── Card hover (use with whileHover) ──────────────────────────────────────
  cardHover: {
    rest:  { y: 0,    boxShadow: "0 4px 16px 0 rgb(0 0 0 / 0.10)" },
    hover: { y: -2,   boxShadow: "0 8px 32px 0 rgb(0 0 0 / 0.12)", transition: { duration: duration.s.fast, ease: easing.fm.soft } },
    tap:   { scale: 0.99, y: 0,                                     transition: { duration: duration.s.instant } },
  },

  // ── Button tap (use with whileTap) ────────────────────────────────────────
  buttonTap: {
    tap: { scale: 0.98, transition: { duration: duration.s.instant } },
  },

  // ── Shake (validation error) ──────────────────────────────────────────────
  shake: {
    hidden:  { x: 0 },
    visible: {
      x: [0, -3, 3, -2, 2, 0],
      transition: { duration: 0.4, ease: "easeOut" },
    },
  },

  // ── Content state swap (loading → data) ──────────────────────────────────
  contentSwap: {
    hidden:  { opacity: 0, scale: 0.98 },
    visible: { opacity: 1, scale: 1,    transition: { duration: duration.s.normal, ease: easing.fm.decelerate } },
    exit:    { opacity: 0, scale: 0.98, transition: { duration: duration.s.fast,   ease: easing.fm.accelerate } },
  },

} as const;

// ─── Reduced Motion Utilities ─────────────────────────────────────────────────
// Apply these to override animations when prefers-reduced-motion is active.
// The CSS in globals.css handles the system-level disable.
// These utilities let you conditionally apply motion in JS.

export const reducedMotion = {
  // Tailwind classes that are safe even with reduced motion (opacity only)
  safeTransition: "transition-opacity duration-150 ease-out",
  safeFade:       "animate-fade-in",

  // Framer Motion transition override for reduced motion
  fmSafe: {
    duration: duration.s.instant,
    ease:     "linear" as const,
  },
} as const;

// ─── Spring Configs (Framer Motion) ──────────────────────────────────────────
// Use `type: "spring"` for the most natural feel on drag / interactive elements.

export const spring = {
  // Gentle — card hovers, tooltips
  gentle: {
    type:        "spring" as const,
    stiffness:   260,
    damping:     30,
    mass:        0.8,
  },
  // Snappy — button taps, toggle switches
  snappy: {
    type:        "spring" as const,
    stiffness:   400,
    damping:     28,
    mass:        0.6,
  },
  // Bouncy — use very sparingly (confetti, success states)
  bouncy: {
    type:        "spring" as const,
    stiffness:   300,
    damping:     18,
    mass:        1.0,
  },
  // Stiff — tab indicators, sliders (should feel rigid)
  stiff: {
    type:        "spring" as const,
    stiffness:   500,
    damping:     40,
    mass:        0.5,
  },
} as const;

// ─── Re-export as default bundle ─────────────────────────────────────────────

const motion = {
  duration,
  easing,
  transition,
  interaction,
  cardMotion,
  buttonMotion,
  inputMotion,
  overlayMotion,
  modalMotion,
  toastMotion,
  loadingMotion,
  navMotion,
  variants,
  spring,
  reducedMotion,
} as const;

export default motion;
