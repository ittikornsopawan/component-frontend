// ─── Design Token System — Liquid Glass SaaS ──────────────────────────────────
//
// Single source of truth for all visual decisions in TypeScript.
// This file provides Tailwind class strings — use these in component code
// instead of writing class names by hand.
//
// Color variables are defined as CSS custom properties in globals.css.
// The tailwind.config.ts references the same CSS vars so that Tailwind
// utility classes (bg-brand-300/50) and this file stay in sync.
//
// Usage:
//   import { color, glass, motion, radius, zIndex } from "@/styles/tokens";
//   className={cn(color.brand.bg.subtle, color.brand.text.DEFAULT)}
//
// ─────────────────────────────────────────────────────────────────────────────

// ─── Color Tokens ─────────────────────────────────────────────────────────────
// Each semantic color has: bg, text, border, ring sub-tokens.
// Variants follow a light→dark progression per tier.

export const color = {

  // ── Brand — Pastel Purple ──────────────────────────────────────────────────
  brand: {
    bg: {
      subtle:    "bg-brand-50",
      muted:     "bg-brand-100/70 dark:bg-brand-900/30",
      soft:      "bg-brand-200/60 dark:bg-brand-800/20",
      DEFAULT:   "bg-brand-500",
      strong:    "bg-brand-600 dark:bg-brand-500",
    },
    text: {
      muted:     "text-brand-400 dark:text-brand-500",
      DEFAULT:   "text-brand-700 dark:text-brand-300",
      strong:    "text-brand-800 dark:text-brand-200",
      accent:    "text-brand-600 dark:text-brand-400",
    },
    border: {
      subtle:    "border-brand-200/60 dark:border-brand-700/40",
      DEFAULT:   "border-brand-300/60 dark:border-brand-600/40",
      strong:    "border-brand-400/70 dark:border-brand-500/50",
    },
    ring: {
      focus:     "ring-brand-300/50 dark:ring-brand-400/40",
      DEFAULT:   "ring-brand-300/50",
    },
    divide:      "divide-brand-100/60 dark:divide-brand-800/30",
  },

  // ── Accent — Pastel Blue ───────────────────────────────────────────────────
  accent: {
    bg: {
      subtle:    "bg-accent-50",
      muted:     "bg-accent-100/70 dark:bg-accent-900/30",
      soft:      "bg-accent-200/60 dark:bg-accent-800/20",
      DEFAULT:   "bg-accent-500",
      strong:    "bg-accent-600 dark:bg-accent-500",
    },
    text: {
      muted:     "text-accent-400 dark:text-accent-500",
      DEFAULT:   "text-accent-700 dark:text-accent-300",
      strong:    "text-accent-800 dark:text-accent-200",
      accent:    "text-accent-600 dark:text-accent-400",
    },
    border: {
      subtle:    "border-accent-200/60 dark:border-accent-700/40",
      DEFAULT:   "border-accent-300/60 dark:border-accent-600/40",
    },
    ring: {
      focus:     "ring-accent-300/50 dark:ring-accent-400/40",
      DEFAULT:   "ring-accent-300/50",
    },
  },

  // ── Success — Pastel Emerald ──────────────────────────────────────────────
  success: {
    bg: {
      subtle:    "bg-success-50",
      muted:     "bg-success-100/70 dark:bg-success-900/30",
      soft:      "bg-success-200/60 dark:bg-success-800/20",
      DEFAULT:   "bg-success-500",
    },
    text: {
      muted:     "text-success-500 dark:text-success-400",
      DEFAULT:   "text-success-700 dark:text-success-300",
      strong:    "text-success-800 dark:text-success-200",
    },
    border: {
      subtle:    "border-success-200/60 dark:border-success-700/40",
      DEFAULT:   "border-success-300/60 dark:border-success-600/40",
    },
    ring:        "ring-success-300/50",
    dot:         "bg-success-400",
  },

  // ── Warning — Pastel Amber ────────────────────────────────────────────────
  warning: {
    bg: {
      subtle:    "bg-warning-50",
      muted:     "bg-warning-100/70 dark:bg-warning-900/30",
      soft:      "bg-warning-200/60 dark:bg-warning-800/20",
      DEFAULT:   "bg-warning-500",
    },
    text: {
      muted:     "text-warning-500 dark:text-warning-400",
      DEFAULT:   "text-warning-700 dark:text-warning-300",
      strong:    "text-warning-800 dark:text-warning-200",
    },
    border: {
      subtle:    "border-warning-200/60 dark:border-warning-700/40",
      DEFAULT:   "border-warning-300/60 dark:border-warning-600/40",
    },
    ring:        "ring-warning-300/50",
    dot:         "bg-warning-400",
  },

  // ── Error — Pastel Red ────────────────────────────────────────────────────
  error: {
    bg: {
      subtle:    "bg-error-50",
      muted:     "bg-error-100/70 dark:bg-error-900/30",
      soft:      "bg-error-200/60 dark:bg-error-800/20",
      DEFAULT:   "bg-error-500",
    },
    text: {
      muted:     "text-error-500 dark:text-error-400",
      DEFAULT:   "text-error-600 dark:text-error-300",
      strong:    "text-error-700 dark:text-error-200",
    },
    border: {
      subtle:    "border-error-200/60 dark:border-error-700/40",
      DEFAULT:   "border-error-300/60 dark:border-error-600/40",
    },
    ring:        "ring-error-300/50",
    dot:         "bg-error-400",
  },

  // ── Neutral — Glass-friendly Slate ────────────────────────────────────────
  neutral: {
    bg: {
      subtle:    "bg-neutral-50 dark:bg-neutral-900",
      muted:     "bg-neutral-100/70 dark:bg-white/8",
      soft:      "bg-neutral-200/60 dark:bg-white/5",
      DEFAULT:   "bg-neutral-500",
    },
    text: {
      placeholder: "text-neutral-400 dark:text-neutral-600",
      muted:     "text-neutral-400 dark:text-neutral-500",
      DEFAULT:   "text-neutral-600 dark:text-neutral-400",
      strong:    "text-neutral-700 dark:text-neutral-300",
      heading:   "text-neutral-800 dark:text-neutral-100",
    },
    border: {
      subtle:    "border-white/20 dark:border-white/10",
      DEFAULT:   "border-white/25 dark:border-white/12",
      strong:    "border-neutral-200 dark:border-white/15",
    },
    divide:      "divide-white/15 dark:divide-white/8",
  },
} as const;

// ─── Glass Surface Tokens ─────────────────────────────────────────────────────
// These are the core visual building blocks of the Liquid Glass design language.
// Applied via className — not inline styles.

export const glass = {
  // Depth hierarchy (ascending opacity / shadow)
  float:    "bg-white/20 dark:bg-white/3 backdrop-blur-2xl border border-white/10 dark:border-white/8",
  base:     "bg-white/60 dark:bg-white/5 backdrop-blur-xl border border-white/20 dark:border-white/10 shadow-glass-md",
  raised:   "bg-white/70 dark:bg-white/7 backdrop-blur-xl border border-white/25 dark:border-white/12 shadow-glass-lg",
  elevated: "bg-white/80 dark:bg-white/8 backdrop-blur-xl border border-white/30 dark:border-white/15 shadow-glass-xl",
  overlay:  "bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl border border-white/25 dark:border-white/10 shadow-glass-xl",

  // Hover / interactive states
  hover:    "hover:bg-white/75 dark:hover:bg-white/8",
  active:   "active:bg-white/90 dark:active:bg-white/12",

  // Focus ring (applied via ring-*)
  focusRing: "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-300/50 focus-visible:ring-offset-2",
} as const;

// ─── Spacing Tokens ───────────────────────────────────────────────────────────
// Semantic names → Tailwind spacing utilities.
// Primitive values for use with non-Tailwind contexts.

export const spacing = {
  // Tailwind class strings
  tw: {
    xs:    "gap-1 p-1",      // 4px
    sm:    "gap-2 p-2",      // 8px
    md:    "gap-3 p-3",      // 12px
    lg:    "gap-4 p-4",      // 16px
    xl:    "gap-6 p-6",      // 24px
    "2xl": "gap-8 p-8",      // 32px
    "3xl": "gap-12 p-12",    // 48px
  },
  // Padding-only shortcuts
  pad: {
    xs:    "p-1",            // 4px
    sm:    "p-2",            // 8px
    md:    "p-3",            // 12px
    lg:    "p-4",            // 16px
    xl:    "p-6",            // 24px
    "2xl": "p-8",            // 32px
    "3xl": "p-12",           // 48px
    none:  "p-0",
  },
  // Rem values (for CSS-in-JS or inline style usage)
  rem: {
    xs:    "0.25rem",        // 4px
    sm:    "0.5rem",         // 8px
    md:    "0.75rem",        // 12px
    lg:    "1rem",           // 16px
    xl:    "1.5rem",         // 24px
    "2xl": "2rem",           // 32px
    "3xl": "3rem",           // 48px
  },
} as const;

// ─── Border Radius Tokens ─────────────────────────────────────────────────────
// DEFAULT is rounded-2xl (16px) — the system-wide standard.
// Only use sm for the smallest elements (dot badges, tag removal icons).

export const radius = {
  none:  "rounded-none",
  sm:    "rounded-xl",        // 12px — badges, chips, small buttons
  md:    "rounded-2xl",       // 16px — inputs, cards (DEFAULT)
  lg:    "rounded-3xl",       // 24px — large cards, panels
  xl:    "rounded-4xl",       // 32px — modals, sheets
  full:  "rounded-full",      // 9999px — pills, avatars, status dots
  DEFAULT: "rounded-2xl",
} as const;

// ─── Shadow Tokens ────────────────────────────────────────────────────────────

export const shadow = {
  // Glass shadows (with inset white highlight)
  xs:    "shadow-glass-xs",
  sm:    "shadow-glass-sm",
  md:    "shadow-glass-md",   // default card
  lg:    "shadow-glass-lg",   // elevated card
  xl:    "shadow-glass-xl",   // floating panel, popover

  // Brand-tinted glow
  brand: {
    sm:   "shadow-brand-sm",
    md:   "shadow-brand-md",
    glow: "shadow-brand-glow",
  },

  // Neutral soft shadows (for non-glass contexts)
  soft: {
    sm:   "shadow-soft-sm",
    md:   "shadow-soft-md",
    lg:   "shadow-soft-lg",
    xl:   "shadow-soft-xl",
  },
  none:  "shadow-none",
} as const;

// ─── Motion Tokens ────────────────────────────────────────────────────────────
// All animations MUST use these — no hardcoded duration/easing values.

export const motion = {
  // Transition shorthands (the most commonly used)
  fast:   "transition-all duration-150 ease-out",
  base:   "transition-all duration-200 ease-out",
  slow:   "transition-all duration-300 ease-out",
  spring: "transition-all duration-200 ease-[cubic-bezier(0.34,1.56,0.64,1)]",
  smooth: "transition-all duration-200 ease-[cubic-bezier(0.4,0,0.2,1)]",

  // Duration classes
  duration: {
    fast:   "duration-150",
    normal: "duration-200",
    slow:   "duration-300",
    slower: "duration-500",
  },

  // Easing classes
  ease: {
    out:        "ease-out",
    smooth:     "ease-[cubic-bezier(0.4,0,0.2,1)]",
    spring:     "ease-[cubic-bezier(0.34,1.56,0.64,1)]",
    decelerate: "ease-[cubic-bezier(0,0,0.2,1)]",
    accelerate: "ease-[cubic-bezier(0.4,0,1,1)]",
  },

  // Named animation classes
  animate: {
    fadeIn:      "animate-fade-in",
    fadeOut:     "animate-fade-out",
    slideDown:   "animate-slide-down",
    slideUp:     "animate-slide-up",
    slideRight:  "animate-slide-right",
    slideLeft:   "animate-slide-left",
    shakeSm:     "animate-shake-sm",
    glowPulse:   "animate-glow-pulse",
    shimmer:     "animate-shimmer",
    spin:        "animate-spin",
    spinSlow:    "animate-spin-slow",
    bounceSub:   "animate-bounce-subtle",
    pingSm:      "animate-ping-sm",
    progress:    "animate-progress",
  },
} as const;

// ─── Z-Index Tokens ───────────────────────────────────────────────────────────
// Use named tiers — never write raw z-[number] outside this file.

export const zIndex = {
  base:     "z-base",        // 10 — normal stacking
  hover:    "z-hover",       // 20 — hovered elements
  active:   "z-active",      // 30 — pressed / active
  dropdown: "z-dropdown",    // 40 — dropdowns, select menus
  sticky:   "z-sticky",      // 50 — sticky headers
  overlay:  "z-overlay",     // 100 — drawer backdrops, inline overlays
  modal:    "z-modal",       // 200 — modals, dialogs
  toast:    "z-toast",       // 9000 — toasts (portal-rendered)
  tooltip:  "z-tooltip",     // 9999 — tooltips (portal-rendered)
} as const;

// ─── Typography Tokens ────────────────────────────────────────────────────────

export const typography = {
  size: {
    "2xs": "text-[10px] leading-[0.875rem]",
    xs:    "text-xs",         // 12px
    sm:    "text-sm",         // 14px
    base:  "text-base",       // 16px
    lg:    "text-lg",         // 18px
    xl:    "text-xl",         // 20px
    "2xl": "text-2xl",        // 24px
    "3xl": "text-3xl",        // 30px
    "4xl": "text-4xl",        // 36px
  },
  weight: {
    regular:  "font-normal",
    medium:   "font-medium",
    semibold: "font-semibold",
    bold:     "font-bold",
  },
  leading: {
    tight:   "leading-tight",    // 1.25
    snug:    "leading-snug",     // 1.375
    normal:  "leading-normal",   // 1.5
    relaxed: "leading-relaxed",  // 1.625
  },
  tracking: {
    tight:  "tracking-tight",
    normal: "tracking-normal",
    wide:   "tracking-wide",
    widest: "tracking-widest",
  },

  // Preset combinations (used in component code)
  preset: {
    "page-title":    "text-2xl font-bold leading-tight tracking-tight text-neutral-800 dark:text-neutral-100",
    "section-title": "text-lg font-semibold leading-snug text-neutral-800 dark:text-neutral-100",
    "card-title":    "text-base font-semibold leading-snug text-neutral-800 dark:text-neutral-100",
    "label":         "text-sm font-medium leading-normal text-neutral-700 dark:text-neutral-300",
    "body":          "text-sm leading-relaxed text-neutral-600 dark:text-neutral-400",
    "caption":       "text-xs leading-normal text-neutral-400 dark:text-neutral-500",
    "overline":      "text-[11px] font-semibold uppercase tracking-widest text-neutral-400 dark:text-neutral-500",
    "code":          "text-xs font-mono text-neutral-700 dark:text-neutral-300 bg-neutral-100/60 dark:bg-white/8 rounded-lg px-1.5 py-0.5",
  },
} as const;

// ─── Focus Token ─────────────────────────────────────────────────────────────
// Always use these — never write focus styles by hand.

export const focus = {
  DEFAULT: "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-300/50 focus-visible:ring-offset-2",
  inset:   "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand-300/50",
  brand:   "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-300/50",
  error:   "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-error-300/50",
  none:    "focus:outline-none focus-visible:outline-none",
} as const;

// ─── Interaction Tokens ───────────────────────────────────────────────────────
// Pre-built interaction state combinations for common patterns.

export const interaction = {
  // Full clickable surface
  clickable: [
    "cursor-pointer select-none",
    "hover:-translate-y-0.5 hover:shadow-glass-lg",
    "active:scale-[0.99] active:translate-y-0 active:shadow-glass-sm",
    motion.base,
  ].join(" "),

  // Hover-only highlight (no lift)
  hoverable: [
    "hover:bg-white/75 dark:hover:bg-white/8",
    "hover:shadow-glass-lg",
    motion.fast,
  ].join(" "),

  // Ring-on-hover (for selectable grid items)
  interactive: [
    "hover:ring-2 hover:ring-brand-300/30 dark:hover:ring-brand-400/20",
    "hover:shadow-glass-lg",
    motion.fast,
  ].join(" "),

  // Disabled state
  disabled: "opacity-50 cursor-not-allowed pointer-events-none",
} as const;

// ─── Semantic Palette Maps ────────────────────────────────────────────────────
// Maps variant names to their color token groups.
// Used by Badge, Alert, InlineMessage, Tag, etc.

export type SemanticVariant = "primary" | "secondary" | "success" | "warning" | "error" | "neutral";

export const semanticColor: Record<SemanticVariant, {
  bg:     string;
  text:   string;
  border: string;
  ring:   string;
  dot:    string;
}> = {
  primary:   { bg: color.brand.bg.muted,   text: color.brand.text.DEFAULT,   border: color.brand.border.subtle,   ring: color.brand.ring.DEFAULT,   dot: "bg-brand-400" },
  secondary: { bg: color.accent.bg.muted,  text: color.accent.text.DEFAULT,  border: color.accent.border.subtle,  ring: color.accent.ring.DEFAULT,  dot: "bg-accent-400" },
  success:   { bg: color.success.bg.muted, text: color.success.text.DEFAULT, border: color.success.border.subtle, ring: color.success.ring,         dot: color.success.dot },
  warning:   { bg: color.warning.bg.muted, text: color.warning.text.DEFAULT, border: color.warning.border.subtle, ring: color.warning.ring,         dot: color.warning.dot },
  error:     { bg: color.error.bg.muted,   text: color.error.text.DEFAULT,   border: color.error.border.subtle,   ring: color.error.ring,           dot: color.error.dot },
  neutral:   { bg: color.neutral.bg.muted, text: color.neutral.text.DEFAULT, border: color.neutral.border.subtle, ring: "ring-neutral-300/50",      dot: "bg-neutral-400" },
};

// ─── Re-export all as default bundle ─────────────────────────────────────────

const tokens = {
  color,
  glass,
  spacing,
  radius,
  shadow,
  motion,
  zIndex,
  typography,
  focus,
  interaction,
  semanticColor,
} as const;

export default tokens;
