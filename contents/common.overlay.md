<!-- markdownlint-disable MD024 MD060 -->
# Overlay System — Liquid Glass SaaS

The Overlay System handles **all floating UI layers** — UI that renders above the normal document flow and always appears correctly regardless of parent `overflow`, `z-index`, or `transform` context.

---

## Architecture

```text
Normal DOM Flow
────────────────────────────────────────────────
Portal Layer  →  createPortal(panel, document.body)
                  ↳ Modal      z-200
                  ↳ Drawer     z-200
                  ↳ Dropdown   z-40
                  ↳ Popover    z-100
                  ↳ Tooltip    z-9999
                  ↳ ContextMenu z-9999
```

### Why portals?

Without portals, overlays can be clipped by any ancestor with `overflow: hidden` or `overflow: clip`, or rendered below an ancestor's `z-index` stacking context. Portaling to `document.body` eliminates both problems permanently.

### Files

```text
src/components/overlay/
├── hooks/
│   ├── useFocusTrap.ts         ← tab cycle inside overlay, restore focus on close
│   ├── useScrollLock.ts        ← fix body position during modal/drawer
│   └── useOnClickOutside.ts    ← generic close-on-outside-click
├── Modal.tsx                   ← Modal, ConfirmationModal, ModalHeader/Body/Footer
├── Drawer.tsx                  ← Left / Right / Bottom sheet
├── Dropdown.tsx                ← portal-positioned, keyboard-navigable
├── Popover.tsx                 ← anchored, auto-flip, click or hover
├── Tooltip.tsx                 ← delayed, fade-only
├── ContextMenu.tsx             ← right-click, cursor-anchored
└── index.ts                    ← barrel export
```

---

## Z-Index Hierarchy

| Layer | Token | Value | Notes |
|-------|-------|-------|-------|
| Dropdown | `z-dropdown` | 40 | Below sticky headers |
| Popover | `z-overlay` | 100 | Above sticky nav |
| Modal / Drawer | `z-modal` | 200 | Full-screen, needs scroll lock |
| Toast | `z-toast` | 9000 | Notification layer, never blocked |
| Tooltip | `z-tooltip` | 9999 | Always topmost |

**Rule:** Never use a raw z-value. Always use named token classes (`z-modal`, `z-tooltip`, etc.).

---

## 1. Modal

### When to use

- Focused tasks requiring user input before continuing
- Confirmation of destructive actions
- Displaying detail without navigating away
- Immersive editors or onboarding flows (fullscreen variant)

### When NOT to use

- Passive notifications → use **Toast**
- Persistent contextual info → use **Popover**
- Multi-step flows → use **Drawer** or a dedicated page
- Never nest a modal inside a modal

### Variants

| Variant | Use case |
|---------|----------|
| `default` | Info, announcements, generic content |
| `form` | Edit forms with scrollable body |
| `confirmation` | Destructive / important confirmations |
| `fullscreen` | Document editors, immersive workflows |

### Sizes

```text
sm  → max-w-sm   (384px)   — short confirmations
md  → max-w-md   (448px)   — standard forms
lg  → max-w-lg   (512px)   — rich content
xl  → max-w-2xl  (672px)   — dashboards, complex forms
```

### Behavior

- Mounts to `document.body` via `createPortal`
- `useScrollLock` — body fixed during open, restores scroll on close
- `useFocusTrap` — Tab cycles inside the panel; focus returns to trigger on close
- ESC key closes the modal (via `keydown` listener, cleaned up on unmount)
- Backdrop click closes (disable with `closeOnBackdrop={false}`)
- `aria-modal="true"`, `role="dialog"`, `aria-labelledby` on the panel
- Animation: `animate-fade-in` (scale 0.97→1 + opacity, 150ms)

### API

```tsx
<Modal
  open={open}
  onClose={onClose}
  variant="form"          // default | form | confirmation | fullscreen
  size="md"               // sm | md | lg | xl
  title="Edit Project"
  description="Update project details"
  icon={<Settings />}     // optional — shown in header
  showCloseButton         // default true
  closeOnBackdrop         // default true
  primaryAction={{ label: "Save", onClick: save, variant: "primary" }}
  secondaryAction={{ label: "Cancel", onClick: onClose, variant: "ghost" }}
>
  {/* body content */}
</Modal>
```

### ConfirmationModal

```tsx
<ConfirmationModal
  open={open}
  onClose={onClose}
  onConfirm={handleDelete}
  variant="danger"          // danger | warning | info
  title="Delete Project"
  description='Are you sure you want to delete "Brand Refresh"?'
  confirmLabel="Delete permanently"
  loading={isDeleting}
/>
```

### Composable sub-components

```tsx
<Modal open={open} onClose={onClose}>
  <ModalHeader title="Title" onClose={onClose} />
  <ModalBody scrollable>
    {/* form fields */}
  </ModalBody>
  <ModalFooter>
    <button onClick={onClose}>Cancel</button>
    <button onClick={save}>Save</button>
  </ModalFooter>
</Modal>
```

### Do / Don't

```text
✅ Name the item in destructive confirmations ("Delete "Project X"?")
✅ Show loading state on the confirm button during async operations
✅ Return focus to trigger after close
✅ Keep form modals to max 4–5 fields (otherwise use a page)

❌ Nest modal inside modal
❌ Use modal for passive information — use Toast or Alert
❌ Remove the cancel action from any destructive modal
```

---

## 2. Drawer

### When to use

- Navigation panels (left drawer)
- Detail views / inspector panels (right drawer)
- Mobile-style action sheets (bottom sheet)
- Settings / filter panels

### Positions

| Position | Use case | Animation |
|----------|----------|-----------|
| `left` | Navigation, menu | `animate-slide-right` |
| `right` | Detail view, settings | `animate-slide-left` |
| `bottom` | Action sheet, mobile filters | `animate-slide-up` |

### Sizes

```text
side drawers:   sm=288px  md=320px  lg=384px  full=100vw
bottom sheet:   sm=256px  md=320px  lg=448px  full=90vh
```

### Behavior

- Portal-rendered, focus-trapped, scroll-locked
- Bottom sheet shows a drag handle when no title is set
- ESC and backdrop click close
- Footer slot for persistent action buttons

### API

```tsx
<Drawer
  open={open}
  onClose={onClose}
  position="right"    // left | right | bottom
  size="md"           // sm | md | lg | full
  title="Project Details"
  description="Brand Identity Refresh"
  footer={<SaveButtons />}
>
  {/* drawer body */}
</Drawer>
```

### Do / Don't

```text
✅ Use left drawer for primary navigation
✅ Use right drawer for contextual detail (opens from a table row click)
✅ Use bottom sheet for mobile-first action lists

❌ Put complex multi-step forms in a drawer — use a page
❌ Open more than one drawer at a time
```

---

## 3. Dropdown

### When to use

- Action menus on buttons, table rows, card headers
- Select-like menus where options need icons or descriptions

### Features

- Portal-rendered via `createPortal` — **never clipped**
- Auto-repositions on scroll and resize
- Keyboard navigation: `↑ ↓` to move, `Enter` to select, `Escape` to close
- Supports checked state, disabled items, separators, keyboard shortcuts
- Placement: `bottom-start | bottom-end | top-start | top-end`

### API

```tsx
<Dropdown
  trigger={<button>Actions ▾</button>}
  placement="bottom-start"
  items={[
    { id: "edit",   label: "Edit",   icon: <Edit2 />, shortcut: "⌘E" },
    { id: "copy",   label: "Copy",   icon: <Copy />,  checked: true },
    "separator",
    { id: "delete", label: "Delete", icon: <Trash2 />, danger: true },
  ]}
/>
```

### Item shape

```ts
interface DropdownItem {
  id: string;
  label: string;
  description?: string;   // sub-label line
  icon?: React.ReactNode;
  shortcut?: string;      // keyboard shortcut hint
  checked?: boolean;      // shows checkmark
  disabled?: boolean;
  danger?: boolean;       // red text + red hover
  onClick?: () => void;
}
```

### Do / Don't

```text
✅ Use portal-based Dropdown for all trigger-anchored menus
✅ Keep items to max 8 — add a search if list grows larger
✅ Use separators to group related actions

❌ Use a native <select> for action menus
❌ Put more than 2 levels of nesting (use a Settings page instead)
```

---

## 4. Popover

### When to use

- Rich contextual UI anchored to a trigger (notifications, settings, info cards)
- Hover previews and quick-access panels

### Placements

`top | bottom | left | right | top-start | top-end | bottom-start | bottom-end`

Auto-flips when near the viewport edge.

### Trigger modes

- `click` (default) — toggle on click, close on outside click or ESC
- `hover` — open on `mouseenter`/`focus`, close on `mouseleave`/`blur`

### API

```tsx
<Popover
  trigger={<button>Notifications</button>}
  title="Notifications"
  placement="bottom-start"
  triggerOn="click"       // click | hover
  showClose               // default true
  content={
    <div className="min-w-[220px]">
      {/* rich content */}
    </div>
  }
/>
```

### Do / Don't

```text
✅ Use Popover for rich contextual content (forms, lists, settings)
✅ Use hover trigger for quick previews / info cards
✅ Keep popover content focused — max one task or concept

❌ Use Popover for plain text labels — use Tooltip instead
❌ Open multiple popovers simultaneously
❌ Put destructive actions in a hover popover
```

---

## 5. Tooltip

### When to use

- Label icon buttons that have no visible text
- Show keyboard shortcuts
- Brief clarifications (max one sentence)

### Rules

- **Plain text only** — for rich content, use Popover
- **300ms delay** — prevents tooltip flash during fast mouse sweeps
- Placements: `top | bottom | left | right` (auto-flip)
- Sizes: `sm` (small, default) | `md` (slightly larger)
- Hidden from pointer events — never blocks interaction

### API

```tsx
<Tooltip
  content="Delete project"
  placement="top"
  delay={300}
  size="sm"
>
  <button aria-label="Delete project">
    <Trash2 />
  </button>
</Tooltip>
```

### Accessibility note

The `aria-describedby` attribute is added to the trigger element only while the tooltip is visible, keeping the accessibility tree clean.

### Do / Don't

```text
✅ Use tooltip on icon-only buttons
✅ Show keyboard shortcut hints in tooltips
✅ Wrap disabled elements in a <span> before applying Tooltip

❌ Put interactive content (buttons, links) in a Tooltip — use Popover
❌ Use tooltip on elements that already have visible text labels
❌ Remove the delay — it creates tooltip flash on mouse movement
```

---

## 6. Context Menu

### When to use

- Secondary action menus triggered by right-click on file items, table rows, canvas elements, and other "content regions"

### Behavior

- Triggered by `contextmenu` event (`onContextMenu`)
- Positioned near the cursor, clamped to viewport edges
- Closes on: outside click, ESC, scroll, resize
- Keyboard: `↑ ↓` to navigate, `Enter` to select, `Escape` to close

### API

```tsx
<ContextMenu
  items={[
    { id: "open",   label: "Open",          icon: <Eye /> },
    { id: "edit",   label: "Edit",          icon: <Edit2 />, shortcut: "⌘E" },
    "separator",
    { id: "delete", label: "Move to Trash", icon: <Trash2 />, danger: true, shortcut: "⌫" },
  ]}
>
  <div>Right-click this area</div>
</ContextMenu>
```

### Do / Don't

```text
✅ Use for secondary/power-user actions on content items
✅ Mirror the most common items in a primary Dropdown for discoverability
✅ Put destructive actions at the bottom after a separator

❌ Use as the only way to access critical actions — always have a primary CTA too
❌ Trigger on regular button clicks — that is a Dropdown's job
```

---

## Accessibility

All overlay components implement the following:

| Feature | Modal | Drawer | Dropdown | Popover | Tooltip | ContextMenu |
|---------|-------|--------|----------|---------|---------|-------------|
| `role` | `dialog` | `dialog` | `listbox` | `dialog` | `tooltip` | `menu` |
| `aria-modal` | ✅ | ✅ | — | — | — | — |
| Focus trap | ✅ | ✅ | — | — | — | — |
| ESC to close | ✅ | ✅ | ✅ | ✅ | — | ✅ |
| Return focus | ✅ | ✅ | — | — | — | — |
| Keyboard nav | — | — | ✅ | — | — | ✅ |
| `aria-describedby` | — | — | — | — | ✅ | — |

### Focus trap algorithm

1. Collect all focusable elements inside the panel
2. On `Tab`: if at last, loop to first
3. On `Shift+Tab`: if at first, loop to last
4. On mount: auto-focus the first focusable element
5. On unmount: return focus to the previously focused element

### Scroll lock algorithm

```ts
// Lock
body.style.position = "fixed";
body.style.top      = `-${scrollY}px`;
body.style.width    = "100%";

// Unlock
body.style.position = "";
body.style.top      = "";
window.scrollTo(0, savedScrollY);  // restore exact position
```

---

## Motion

| Component | Enter | Exit |
|-----------|-------|------|
| Modal panel | `animate-fade-in` (scale 0.97→1, opacity, 150ms) | — (instant unmount) |
| Modal backdrop | `animate-fade-in` (opacity, 150ms) | — |
| Drawer left | `animate-slide-right` (translateX -8px→0) | — |
| Drawer right | `animate-slide-left` (translateX +8px→0) | — |
| Drawer bottom | `animate-slide-up` (translateY +8px→0) | — |
| Dropdown | `animate-slide-down` (translateY -8px→0) | — |
| Popover | `animate-fade-in` (scale 0.97→1) | — |
| Tooltip | `animate-fade-in` | — |
| ContextMenu | `animate-fade-in` | — |

All animations respect `prefers-reduced-motion` via the global CSS reset in `globals.css`.

---

## Import Paths

```ts
// Named imports from barrel
import {
  Modal, ModalHeader, ModalBody, ModalFooter,
  ConfirmationModal,
  Drawer,
  Dropdown,
  Popover,
  Tooltip,
  ContextMenu,
} from "@/components/overlay";

// Or specific files
import { Modal }       from "@/components/overlay/Modal";
import { Drawer }      from "@/components/overlay/Drawer";
import { Dropdown }    from "@/components/overlay/Dropdown";
import { Popover }     from "@/components/overlay/Popover";
import { Tooltip }     from "@/components/overlay/Tooltip";
import { ContextMenu } from "@/components/overlay/ContextMenu";

// Hooks (if needed independently)
import { useFocusTrap }      from "@/components/overlay/hooks/useFocusTrap";
import { useScrollLock }     from "@/components/overlay/hooks/useScrollLock";
import { useOnClickOutside } from "@/components/overlay/hooks/useOnClickOutside";
```

---

## Decision Guide

```text
Need to confirm a destructive action?     → ConfirmationModal
Need user to complete a form?             → Modal (form variant)
Need to show a navigation sidebar?        → Drawer (left)
Need a detail/inspector panel?            → Drawer (right)
Need a mobile action sheet?              → Drawer (bottom)
Need an action menu on a button?          → Dropdown
Need rich contextual UI on a trigger?     → Popover
Need a plain text label on hover?         → Tooltip
Need secondary actions on a content item? → ContextMenu
```
