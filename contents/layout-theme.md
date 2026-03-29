# Layout Theme Specification — Liquid Glass SaaS

> **Purpose:** Centralized visual foundation for the entire application.  
> **Scope:** Layout components (Sidenav, ContextPanel, Topnav, Content) + reusable tokens for all UI.  
> **Guideline:** Transparency, blur, pastel CI (purple + blue), soft depth, breathable spacing.

---

## 🎨 Brand Color (CI)

### 💜 Primary — Pastel Purple

| Token | Hex | Usage |
|-------|-----|-------|
| `purple-50`  | `#faf5ff` | subtle bg |
| `purple-100` | `#f3e8ff` | muted bg |
| `purple-200` | `#e9d5ff` | soft bg |
| `purple-300` | `#d8b4fe` | border, focus ring |
| `purple-400` | `#c084fc` | hover/active border |
| `purple-500` | `#a855f7` | active icon, selected |
| `purple-600` | `#9333ea` | strong active, primary actions |

---

### 💙 Secondary — Pastel Blue

| Token | Hex | Usage |
|-------|-----|-------|
| `blue-50`  | `#eff6ff` | subtle bg |
| `blue-100` | `#dbeafe` | muted bg |
| `blue-200` | `#bfdbfe` | soft bg |
| `blue-300` | `#93c5fd` | hover highlights |
| `blue-400` | `#60a5fa` | hover icons, assistive |
| `blue-500` | `#3b82f6` | strong hover, secondary actions |

---

## 🌫️ Global Glass System

### Base Glass (apply everywhere)

| Mode | Background | Border | Blur |
|------|------------|--------|------|
| Light | `bg-white/60` | `border-white/30` | `backdrop-blur-xl` |
| Dark  | `bg-white/5`  | `border-white/10` | `backdrop-blur-xl` |

---

### Glass Variants

| Variant | Light | Dark | Use |
|---------|-------|------|-----|
| `glass.float` | `bg-white/20` | `bg-white/3` | Very light overlays |
| `glass.base`  | `bg-white/60` | `bg-white/5` | Default panels |
| `glass.raised`| `bg-white/70` | `bg-white/7` | Elevated cards |
| `glass.overlay`| `bg-white/80` | `bg-neutral-900/80` | Modals, dropdowns |

---

## 🌗 Background System (Content Area)

### Light Mode
```css
bg-gradient-to-br from-purple-50/60 via-white/40 to-blue-50/60
```

### Dark Mode
```css
bg-gradient-to-br from-[#0b0f1a] via-[#0f172a] to-[#020617]
```

---

## 🧱 Layout Theme Mapping

### 🧊 4.1 Sidenav (Primary Navigation)

| State | Classes |
|-------|---------|
| Base | `bg-black/30 backdrop-blur-xl border-r border-white/10` |
| Active Item | `bg-purple-500/15 text-purple-300 ring-1 ring-purple-400/30 shadow-[0_0_20px_rgba(168,85,247,0.25)]` |
| Hover | `hover:bg-blue-500/10 transition-all duration-150` |
| Text | `text-white/60` (inactive) → `text-white` (active) |
| Icon | `text-white/60` → `text-purple-300` (active) |

---

### 🪟 4.2 Context Panel (Secondary Navigation)

| State | Classes |
|-------|---------|
| Base | `bg-white/60 dark:bg-white/5 backdrop-blur-xl border-r border-white/20` |
| Header | `border-b border-white/15 dark:border-white/8` |
| Active Item | `bg-brand-100/70 dark:bg-brand-900/30 text-brand-700 dark:text-brand-300` |
| Hover | `hover:bg-white/60 dark:hover:bg-white/8 hover:text-neutral-800 dark:hover:text-neutral-200` |

---

### 🧭 4.3 Topnav (Global Header)

| State | Classes |
|-------|---------|
| Base | `bg-white/50 dark:bg-white/5 backdrop-blur-lg border-b border-white/20 shadow-sm` |
| Hover Icon | `hover:bg-blue-500/10 text-blue-500` |
| Search Expanded | `bg-white/80 dark:bg-white/10 border-brand-300/40 dark:border-brand-500/30 shadow-glass-sm` |
| Dropdown Trigger | `hover:bg-white/40 dark:hover:bg-white/8` |

---

### 📄 4.4 Content Area

| State | Classes |
|-------|---------|
| Base | `p-6 lg:p-8 overflow-y-auto` |
| Background Gradient | `from-slate-50/80 via-purple-50/30 to-blue-50/50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950` |
| Glow Layer (optional) | `absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/10 blur-3xl -z-10` |

---

### 🧊 4.5 Card / Panel (Inside Content)

| State | Classes |
|-------|---------|
| Base | `bg-white/60 dark:bg-white/5 backdrop-blur-lg border border-white/20 rounded-2xl shadow-lg` |
| Hover | `hover:bg-white/75 dark:hover:bg-white/8 hover:shadow-xl transition-all duration-150` |
| Interactive | `hover:bg-white/75 dark:hover:bg-white/8 hover:shadow-xl hover:border-blue-300/40` |

---

## ✨ Interaction System

| Interaction | Color | Effect |
|-------------|-------|--------|
| Hover (soft) | `blue-300/40` | `bg-blue-500/10` + `text-blue-500` |
| Active (selected) | `purple-500/15` | `ring-purple-400/30` + `shadow-purple-500/25` |
| Focus | `ring-purple-300/50` | `ring-2 ring-offset-2` |
| Disabled | `opacity-50` | `pointer-events-none` |

---

## 🧠 Layering Rules (Z-Index)

1. Background (`z-0`)  
2. Content (`z-base`)  
3. Context Panel (`z-sticky`)  
4. Sidenav (`z-sticky`)  
5. Topnav (`z-sticky`)  
6. Overlay (`z-overlay` → `z-modal` → `z-tooltip`)

> **Never** use raw `z-[number]`. Use named tokens from `@/styles/tokens`.

---

## 🚨 Rules

### ✅ MUST

- Use transparency (`/XX`) everywhere  
- Apply `backdrop-blur-xl` on all glass surfaces  
- Stick to pastel CI: purple for active/focus, blue for hover/assistive  
- Keep spacing generous (`gap-6`, `p-6`) — avoid dense UI  
- Use `transition-all duration-150 ease-out` for micro-interactions  

### ❌ NEVER

- Use solid black/white backgrounds  
- Use hard borders (`border-2`) — prefer `border-white/20`  
- Use saturated/harsh colors for errors (use `red-300/40`)  
- Override glass tokens with arbitrary values  

---

## 📦 Usage Examples

### Sidenav Item
```tsx
className={cn(
  "group relative w-full flex items-center gap-3 rounded-2xl outline-none transition-all duration-150 ease-out",
  isActive
    ? "bg-purple-500/15 text-purple-300 ring-1 ring-purple-400/30 shadow-[0_0_20px_rgba(168,85,247,0.25)]"
    : "text-white/60 hover:bg-blue-500/10 hover:text-white",
)}
```

### Topnav Search
```tsx
className={cn(
  "flex items-center gap-2 rounded-2xl px-3 h-9 border transition-all duration-200 ease-out",
  focused
    ? "bg-white/80 dark:bg-white/10 border-brand-300/40 dark:border-brand-500/30 shadow-glass-sm"
    : "bg-white/40 dark:bg-white/5 border-white/25 dark:border-white/10",
)}
```

### Content Card
```tsx
className="bg-white/60 dark:bg-white/5 backdrop-blur-lg border border-white/20 rounded-2xl shadow-lg hover:bg-white/75 dark:hover:bg-white/8 hover:shadow-xl transition-all duration-150"
```

---

## 🎯 Goal

After applying this theme:
- Layout feels **floating** and layered
- UI is **soft, airy, premium**
- **Consistent** across every component
- **Readable** in both light and dark modes  
- **Accessible** with proper focus rings and contrast

---
