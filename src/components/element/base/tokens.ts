// ─── Element System Design Tokens ────────────────────────────────────────────
// Bridges the global token system (@/styles/tokens) to the Element component API.
// All values now derive from the single source of truth — no hardcoded strings.
//
// Public API is intentionally preserved so no component code needs to change.
// ─────────────────────────────────────────────────────────────────────────────

import { glass, motion, focus as globalFocus, zIndex as globalZIndex, semanticColor } from "@/styles/tokens";

// ─── Surface Variants ─────────────────────────────────────────────────────────
// Maps Element surface variant names → global glass token strings.

export const surface = {
  default:  glass.base,
  elevated: glass.elevated,
  flat:     "bg-white/40 dark:bg-white/[0.04] border border-white/20 dark:border-white/10",
  glass:    glass.float,
  overlay:  glass.overlay,
  tooltip:  "bg-gray-900/90 dark:bg-gray-800/95 backdrop-blur-md shadow-glass-lg",
} as const;

// ─── Border Radius ────────────────────────────────────────────────────────────

export const radius = {
  sm:   "rounded-xl",    // 12px — badges, chips
  md:   "rounded-2xl",   // 16px — cards, inputs (DEFAULT)
  lg:   "rounded-3xl",   // 24px — large panels
  full: "rounded-full",  // pills, avatars
} as const;

// ─── Transitions ──────────────────────────────────────────────────────────────

export const transition = {
  fast:   motion.fast,
  base:   motion.base,
  slow:   motion.slow,
  spring: motion.spring,
} as const;

// ─── Focus Ring ───────────────────────────────────────────────────────────────

export const focus = globalFocus.DEFAULT;

// ─── Color Palette ────────────────────────────────────────────────────────────
// Mapped from global semanticColor — provides bg/text/border/ring per variant.

export const color = {
  primary:   { bg: semanticColor.primary.bg,   text: semanticColor.primary.text,   border: semanticColor.primary.border,   ring: semanticColor.primary.ring },
  secondary: { bg: semanticColor.secondary.bg, text: semanticColor.secondary.text, border: semanticColor.secondary.border, ring: semanticColor.secondary.ring },
  success:   { bg: semanticColor.success.bg,   text: semanticColor.success.text,   border: semanticColor.success.border,   ring: semanticColor.success.ring },
  warning:   { bg: semanticColor.warning.bg,   text: semanticColor.warning.text,   border: semanticColor.warning.border,   ring: semanticColor.warning.ring },
  error:     { bg: semanticColor.error.bg,     text: semanticColor.error.text,     border: semanticColor.error.border,     ring: semanticColor.error.ring },
  neutral:   { bg: semanticColor.neutral.bg,   text: semanticColor.neutral.text,   border: semanticColor.neutral.border,   ring: semanticColor.neutral.ring },
} as const;

// ─── Z-Index ──────────────────────────────────────────────────────────────────

export const zIndex = {
  base:     globalZIndex.base,
  hover:    globalZIndex.hover,
  active:   globalZIndex.active,
  dropdown: globalZIndex.dropdown,
  sticky:   globalZIndex.sticky,
  overlay:  globalZIndex.overlay,
  modal:    globalZIndex.modal,
  toast:    globalZIndex.toast,
  tooltip:  globalZIndex.tooltip,
} as const;

// ─── Component Padding ────────────────────────────────────────────────────────

export const spacing = {
  none:     "",
  compact:  "p-4",
  default:  "p-6",
  spacious: "p-8",
} as const;

// ─── Type Exports ─────────────────────────────────────────────────────────────

export type ColorVariant   = keyof typeof color;
export type SurfaceVariant = keyof typeof surface;
export type RadiusVariant  = keyof typeof radius;
