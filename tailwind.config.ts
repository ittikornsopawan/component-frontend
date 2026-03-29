import type { Config } from "tailwindcss";

// ─── Design Token System — Liquid Glass SaaS ──────────────────────────────────
//
// Color scales use CSS custom properties so that:
//  1. Tailwind opacity modifiers work  (e.g. bg-brand-200/50)
//  2. Dark-mode can swap values at runtime without a rebuild
//  3. JS/TS tokens file can reference the same semantic names
//
// Variables are set in globals.css as RGB triplets:
//   --brand-300: 216 180 254;
//
// ─────────────────────────────────────────────────────────────────────────────

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {

      // ─── Color System ───────────────────────────────────────────────────────
      // All scales use CSS-variable RGB triplets for full opacity-modifier support.
      // Existing Tailwind `purple`, `blue`, `red`, `emerald`, `amber` scales are
      // kept intact — these semantic aliases layer on top.

      colors: {

        // Brand — Pastel Purple (primary, focus, CTAs)
        brand: {
          50:  "rgb(var(--brand-50)  / <alpha-value>)",
          100: "rgb(var(--brand-100) / <alpha-value>)",
          200: "rgb(var(--brand-200) / <alpha-value>)",
          300: "rgb(var(--brand-300) / <alpha-value>)",   // focus ring
          400: "rgb(var(--brand-400) / <alpha-value>)",   // text accent
          500: "rgb(var(--brand-500) / <alpha-value>)",   // strong fill
          600: "rgb(var(--brand-600) / <alpha-value>)",
          700: "rgb(var(--brand-700) / <alpha-value>)",   // dark text
          800: "rgb(var(--brand-800) / <alpha-value>)",
          900: "rgb(var(--brand-900) / <alpha-value>)",
          950: "rgb(var(--brand-950) / <alpha-value>)",
        },

        // Accent — Pastel Blue (secondary, info, hover highlights)
        accent: {
          50:  "rgb(var(--accent-50)  / <alpha-value>)",
          100: "rgb(var(--accent-100) / <alpha-value>)",
          200: "rgb(var(--accent-200) / <alpha-value>)",
          300: "rgb(var(--accent-300) / <alpha-value>)",
          400: "rgb(var(--accent-400) / <alpha-value>)",
          500: "rgb(var(--accent-500) / <alpha-value>)",
          600: "rgb(var(--accent-600) / <alpha-value>)",
          700: "rgb(var(--accent-700) / <alpha-value>)",
        },

        // Success — Pastel Emerald
        success: {
          50:  "rgb(var(--success-50)  / <alpha-value>)",
          100: "rgb(var(--success-100) / <alpha-value>)",
          200: "rgb(var(--success-200) / <alpha-value>)",
          300: "rgb(var(--success-300) / <alpha-value>)",
          400: "rgb(var(--success-400) / <alpha-value>)",
          500: "rgb(var(--success-500) / <alpha-value>)",
          600: "rgb(var(--success-600) / <alpha-value>)",
          700: "rgb(var(--success-700) / <alpha-value>)",
        },

        // Warning — Pastel Amber
        warning: {
          50:  "rgb(var(--warning-50)  / <alpha-value>)",
          100: "rgb(var(--warning-100) / <alpha-value>)",
          200: "rgb(var(--warning-200) / <alpha-value>)",
          300: "rgb(var(--warning-300) / <alpha-value>)",
          400: "rgb(var(--warning-400) / <alpha-value>)",
          500: "rgb(var(--warning-500) / <alpha-value>)",
          600: "rgb(var(--warning-600) / <alpha-value>)",
          700: "rgb(var(--warning-700) / <alpha-value>)",
        },

        // Error — Pastel Red (soft, not saturated)
        error: {
          50:  "rgb(var(--error-50)  / <alpha-value>)",
          100: "rgb(var(--error-100) / <alpha-value>)",
          200: "rgb(var(--error-200) / <alpha-value>)",
          300: "rgb(var(--error-300) / <alpha-value>)",
          400: "rgb(var(--error-400) / <alpha-value>)",
          500: "rgb(var(--error-500) / <alpha-value>)",
          600: "rgb(var(--error-600) / <alpha-value>)",
          700: "rgb(var(--error-700) / <alpha-value>)",
        },

        // Neutral — Slate-based glass-friendly grays
        neutral: {
          0:   "#ffffff",
          50:  "rgb(var(--neutral-50)  / <alpha-value>)",
          100: "rgb(var(--neutral-100) / <alpha-value>)",
          200: "rgb(var(--neutral-200) / <alpha-value>)",
          300: "rgb(var(--neutral-300) / <alpha-value>)",
          400: "rgb(var(--neutral-400) / <alpha-value>)",
          500: "rgb(var(--neutral-500) / <alpha-value>)",
          600: "rgb(var(--neutral-600) / <alpha-value>)",
          700: "rgb(var(--neutral-700) / <alpha-value>)",
          800: "rgb(var(--neutral-800) / <alpha-value>)",
          900: "rgb(var(--neutral-900) / <alpha-value>)",
          950: "rgb(var(--neutral-950) / <alpha-value>)",
        },
      },

      // ─── Spacing ────────────────────────────────────────────────────────────
      // Extends Tailwind's default 4px-base scale with semantic names and
      // a few missing mid-steps useful for glass UI.
      spacing: {
        "4.5": "1.125rem",   // 18px — between p-4 and p-5
        "13":  "3.25rem",    // 52px
        "15":  "3.75rem",    // 60px
        "18":  "4.5rem",     // 72px
        "22":  "5.5rem",     // 88px
        "26":  "6.5rem",     // 104px
        "30":  "7.5rem",     // 120px
      },

      // ─── Border Radius ──────────────────────────────────────────────────────
      // Default for this system: rounded-2xl (16px).
      // Use rounded-xl for tighter elements (badges, chips, inputs).
      // Use rounded-3xl for large cards, panels, modals.
      borderRadius: {
        "4xl": "2rem",     // 32px — extra-large modal/sheet corners
        "5xl": "2.5rem",   // 40px — full-bleed rounded containers
      },

      // ─── Box Shadow — Glass Depth System ───────────────────────────────────
      // "glass-*" shadows add a subtle inner highlight (top inset white line)
      // that reinforces the glass material on light backgrounds.
      // "brand-*" shadows carry the brand hue for glow effects.
      boxShadow: {
        // Glass depth hierarchy
        "glass-xs": "0 1px 4px 0 rgb(0 0 0 / 0.05), inset 0 1px 0 0 rgb(255 255 255 / 0.70)",
        "glass-sm": "0 2px 8px 0 rgb(0 0 0 / 0.08), inset 0 1px 0 0 rgb(255 255 255 / 0.60)",
        "glass-md": "0 4px 16px 0 rgb(0 0 0 / 0.10), inset 0 1px 0 0 rgb(255 255 255 / 0.50)",
        "glass-lg": "0 8px 32px 0 rgb(0 0 0 / 0.12), inset 0 1px 0 0 rgb(255 255 255 / 0.40)",
        "glass-xl": "0 16px 48px 0 rgb(0 0 0 / 0.15), inset 0 1px 0 0 rgb(255 255 255 / 0.30)",
        // Brand glow shadows
        "brand-sm":   "0 2px 8px 0 rgb(var(--brand-400) / 0.15)",
        "brand-md":   "0 4px 16px 0 rgb(var(--brand-400) / 0.20)",
        "brand-glow": "0 0 24px 0 rgb(var(--brand-300) / 0.40)",
        // Semantic overrides (softer than Tailwind defaults)
        "soft-sm": "0 1px 3px 0 rgb(0 0 0 / 0.08), 0 1px 2px -1px rgb(0 0 0 / 0.08)",
        "soft-md": "0 4px 6px -1px rgb(0 0 0 / 0.08), 0 2px 4px -2px rgb(0 0 0 / 0.08)",
        "soft-lg": "0 10px 15px -3px rgb(0 0 0 / 0.10), 0 4px 6px -4px rgb(0 0 0 / 0.08)",
        "soft-xl": "0 20px 25px -5px rgb(0 0 0 / 0.12), 0 8px 10px -6px rgb(0 0 0 / 0.08)",
      },

      // ─── Z-Index Scale ──────────────────────────────────────────────────────
      // Named tiers prevent arbitrary z-value proliferation.
      // Toast (9000) and tooltip (9999) are portal-rendered — always on top.
      zIndex: {
        "base":     "10",
        "hover":    "20",
        "active":   "30",
        "dropdown": "40",
        "sticky":   "50",
        "overlay":  "100",
        "modal":    "200",
        "toast":    "9000",
        "tooltip":  "9999",
      },

      // ─── Typography ─────────────────────────────────────────────────────────
      fontFamily: {
        sans: ["var(--font-geist-sans, var(--font-sans))", "system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
        mono: ["var(--font-geist-mono, var(--font-mono))", "ui-monospace", "Menlo", "Monaco", "monospace"],
      },
      fontSize: {
        "2xs": ["0.625rem", { lineHeight: "0.875rem", letterSpacing: "0.01em" }], // 10px
      },

      // ─── Backdrop Blur ──────────────────────────────────────────────────────
      backdropBlur: {
        "2xs": "1px",
        xs:    "2px",
      },

      // ─── Motion — Duration ──────────────────────────────────────────────────
      transitionDuration: {
        "instant": "100",  // near-instant feedback (icon swap, color flash)
        "fast":    "150",  // micro-interactions (hover bg, focus ring)
        "normal":  "200",  // default UI transitions (dropdown, card hover)
        "moderate":"250",  // slightly heavier transitions
        "slow":    "300",  // panel slides, modal open
        "slower":  "500",  // page-level transitions
      },

      // ─── Motion — Easing ────────────────────────────────────────────────────
      transitionTimingFunction: {
        "default":    "ease-out",                          // standard exit curve
        "smooth":     "cubic-bezier(0.4, 0, 0.2, 1)",     // Material standard
        "soft":       "cubic-bezier(0.25, 0.1, 0.25, 1)", // gentler ease
        "spring":     "cubic-bezier(0.34, 1.56, 0.64, 1)",// slight overshoot
        "decelerate": "cubic-bezier(0, 0, 0.2, 1)",       // entering elements
        "accelerate": "cubic-bezier(0.4, 0, 1, 1)",       // exiting elements
      },

      // ─── Keyframes ──────────────────────────────────────────────────────────
      keyframes: {
        // ── Enter / Exit ──
        "fade-in": {
          from: { opacity: "0", transform: "scale(0.97)" },
          to:   { opacity: "1", transform: "scale(1)" },
        },
        "fade-out": {
          from: { opacity: "1", transform: "scale(1)" },
          to:   { opacity: "0", transform: "scale(0.97)" },
        },
        "slide-down": {
          from: { opacity: "0", transform: "translateY(-8px)" },
          to:   { opacity: "1", transform: "translateY(0)" },
        },
        "slide-up": {
          from: { opacity: "0", transform: "translateY(8px)" },
          to:   { opacity: "1", transform: "translateY(0)" },
        },
        "slide-right": {
          from: { opacity: "0", transform: "translateX(-8px)" },
          to:   { opacity: "1", transform: "translateX(0)" },
        },
        "slide-left": {
          from: { opacity: "0", transform: "translateX(8px)" },
          to:   { opacity: "1", transform: "translateX(0)" },
        },
        // ── Feedback ──
        "shake-sm": {
          "0%, 100%": { transform: "translateX(0)" },
          "20%":      { transform: "translateX(-3px)" },
          "40%":      { transform: "translateX(3px)" },
          "60%":      { transform: "translateX(-2px)" },
          "80%":      { transform: "translateX(2px)" },
        },
        // ── Continuous ──
        "glow-pulse": {
          "0%, 100%": { boxShadow: "0 0 0 0 rgb(var(--brand-300) / 0)" },
          "50%":      { boxShadow: "0 0 14px 3px rgb(var(--brand-300) / 0.30)" },
        },
        "shimmer": {
          "0%":   { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
        "spin": {
          to: { transform: "rotate(360deg)" },
        },
        "bounce-subtle": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%":      { transform: "translateY(-4px)" },
        },
        "ping-sm": {
          "75%, 100%": { transform: "scale(1.6)", opacity: "0" },
        },
        "progress": {
          from: { width: "100%" },
          to:   { width: "0%" },
        },
      },

      // ─── Animation Shorthands ────────────────────────────────────────────────
      animation: {
        // Enter / Exit
        "fade-in":      "fade-in 0.15s ease-out",
        "fade-out":     "fade-out 0.15s ease-out",
        "slide-down":   "slide-down 0.2s ease-out",
        "slide-up":     "slide-up 0.2s ease-out",
        "slide-right":  "slide-right 0.2s ease-out",
        "slide-left":   "slide-left 0.2s ease-out",
        // Feedback
        "shake-sm":     "shake-sm 0.4s ease-out",
        // Continuous
        "glow-pulse":   "glow-pulse 2s ease-in-out infinite",
        "shimmer":      "shimmer 2s linear infinite",
        "spin":         "spin 0.8s linear infinite",
        "spin-slow":    "spin 2s linear infinite",
        "bounce-subtle":"bounce-subtle 2s ease-in-out infinite",
        "ping-sm":      "ping-sm 1.2s cubic-bezier(0, 0, 0.2, 1) infinite",
        "progress":     "progress linear forwards",
      },
    },
  },
  plugins: [],
};

export default config;
