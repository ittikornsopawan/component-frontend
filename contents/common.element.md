# Element System — common.element.md

## Design Philosophy

The Element System is the **surface and display layer** of the Liquid Glass UI framework.
It operates one level above the Input System, providing containers, feedback, navigation, and data
display primitives that feel cohesive, premium, and alive.

Core principles:

- **Liquid Glass** — every surface uses `backdrop-blur`, semi-transparent background, and soft borders
- **Depth through opacity** — shadow and blur replace harsh borders for visual separation
- **Spacing over borders** — whitespace communicates hierarchy; borders are secondary
- **Micro-interactions required** — every clickable element must lift, glow, or scale
- **Accessibility first** — ARIA roles, keyboard navigation, and focus rings are non-negotiable
- **Portal-rendered overlays** — Tooltip, Popover, and Toast render to `document.body` to prevent z-index and overflow clipping

---

## Architecture

```
src/components/element/
  base/
    tokens.ts         — Design tokens (surface, color, radius, spacing, z-index, transition)
    BaseSurface.tsx   — Foundation primitive used by all surface components
  utility/
    Portal.tsx        — createPortal wrapper for overlay rendering
  feedback/
    InlineMessage.tsx — Compact inline feedback (no background)
  Alert.tsx
  Avatar.tsx
  Badge.tsx
  Banner.tsx
  Breadcrumb.tsx
  Card.tsx
  EmptyState.tsx
  List.tsx
  LoadingOverlay.tsx
  Pagination.tsx
  Panel.tsx
  Popover.tsx         — Portal-based, auto-flip, viewport-clamped
  Skeleton.tsx
  Spinner.tsx
  StatCard.tsx
  Stepper.tsx
  Tabs.tsx
  Toast.tsx           — Portal-based, stacking, progress bar
  Tooltip.tsx         — Portal-based, auto-flip, viewport-clamped
  index.ts            — Barrel exports
```

---

## Layer 1 — Base Surface System

### `BaseSurface`

Foundation primitive. All visual surface components extend it.

```tsx
<BaseSurface variant="default" rounded="lg" padding="default" hoverable>
  Content
</BaseSurface>
```

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `default \| elevated \| flat \| glass \| overlay \| tooltip` | `default` | Visual weight |
| `rounded` | `sm \| md \| lg \| full` | `lg` | Border radius |
| `padding` | `none \| compact \| default \| spacious` | `none` | Inner padding |
| `hoverable` | `boolean` | `false` | Lift + brighten on hover |
| `interactive` | `boolean` | `false` | Purple ring glow on hover |
| `clickable` | `boolean` | `false` | Full press behavior + keyboard activation |
| `disabled` | `boolean` | `false` | Reduces opacity, blocks interaction |
| `as` | `div \| article \| section \| aside \| li` | `div` | HTML tag |

### Style Tokens (`base/tokens.ts`)

Shared constants — import and reference instead of hardcoding.

```ts
import { surface, color, radius, zIndex, transition, spacing } from "@/components/element/base/tokens";
```

---

## Layer 2 — Z-Index System

| Token | Value | Usage |
|-------|-------|-------|
| `zIndex.base` | `z-10` | Default stacking |
| `zIndex.hover` | `z-20` | Hovered elements |
| `zIndex.active` | `z-30` | Active/pressed |
| `zIndex.dropdown` | `z-40` | Popover, Select dropdowns |
| `zIndex.sticky` | `z-50` | Sticky headers |
| `zIndex.overlay` | `z-[100]` | Loading overlays |
| `zIndex.modal` | `z-[200]` | Modals, dialogs |
| `zIndex.toast` | `z-[9000]` | Toast notifications |
| `zIndex.tooltip` | `z-[9999]` | Tooltips (always on top) |

---

## Component Catalog

### Card System

```tsx
<Card variant="default | elevated | glass | clickable | interactive | flat" padding="default">
  <CardHeader>
    <div>
      <CardTitle>Title</CardTitle>
      <CardDescription>Description</CardDescription>
    </div>
    <CardAction><Badge>New</Badge></CardAction>
  </CardHeader>
  <CardContent>…</CardContent>
  <CardFooter divider>…</CardFooter>
</Card>
```

**Variants:** `default` · `elevated` · `glass` · `clickable` · `interactive` · `flat`
**Padding:** `none` · `compact` · `default` · `spacious`

---

### Badge System

```tsx
<Badge variant="primary" size="md" dot>Label</Badge>
<Tag variant="primary" onRemove={() => {}}>Removable</Tag>
<StatusBadge status="online" showLabel />
<DotBadge count={5} variant="error"><IconButton /></DotBadge>
```

**Badge variants:** `primary` · `secondary` · `success` · `warning` · `error` · `neutral`
**Status values:** `online` · `away` · `busy` · `offline`

---

### Panel & Layout

```tsx
<Panel variant="default | transparent | bordered" padding="default">
  <SectionHeader>
    <SectionTitleGroup>
      <SectionTitle>Title</SectionTitle>
      <SectionSubtitle>Sub</SectionSubtitle>
    </SectionTitleGroup>
    <SectionAction>…</SectionAction>
  </SectionHeader>
  <SectionContent>…</SectionContent>
  <SectionFooter>…</SectionFooter>
</Panel>

<Divider variant="solid | gradient | dashed" label="OR" spacing="md" />
<Spacer size="4" axis="y" />
```

---

### Feedback

```tsx
<Alert variant="info | success | warning | error | neutral" title="Title" dismissible>
  Message body
</Alert>

<Banner variant="info | warning | error | announcement" dismissible action={{ label: "CTA", href: "/" }}>
  Text
</Banner>

<InlineMessage variant="info | success | warning | error" size="sm | md">
  Field-level message
</InlineMessage>

<InfoBox variant="info | tip | warning | error" title="Title" dismissible>
  Body text
</InfoBox>
```

**Toast (via provider):**

```tsx
// Wrap app:
<ToastProvider position="bottom-right">
  <App />
</ToastProvider>

// Inside any component:
const toast = useToast();
toast.show({ variant: "success", title: "Saved!", description: "Your changes were saved." });
```

---

### Loading & Empty States

```tsx
<Spinner size="xs | sm | md | lg | xl" variant="default | white | colored" />

<Skeleton height="h-4" width="w-full" />
<Skeleton.Text lines={3} />
<Skeleton.Card />
<Skeleton.Avatar size="md" />
<Skeleton.ListItem />

<EmptyState variant="default | search | error | permissions"
  action={{ label: "Add item", onClick: fn }}
/>

<LoadingOverlay visible message="Saving…" blur="md" />
```

---

### Overlays (Portal-Rendered)

**Tooltip** — renders to `document.body`, auto-flip, 400ms delay default:

```tsx
<Tooltip content="Help text" position="top | bottom | left | right" delay={400}>
  <button>Hover me</button>
</Tooltip>
```

**Popover** — portal, click-toggle, auto-flip, closes on outside click / Escape:

```tsx
<Popover trigger={<button>Open</button>} position="bottom-start" width="md">
  <PopoverContent>
    <PopoverItem icon={<Edit />} label="Edit" onClick={fn} />
    <PopoverDivider />
    <PopoverItem icon={<Trash2 />} label="Delete" destructive onClick={fn} />
  </PopoverContent>
</Popover>
```

---

### Navigation

```tsx
<Tabs
  value={tab} onChange={setTab}
  variant="default | pills | underline | glass"
  tabs={[{ value: "a", label: "Tab", icon: <Icon />, badge: <Badge>3</Badge> }]}
  fullWidth
/>
<TabPanel value="a" activeValue={tab}>Content</TabPanel>

<Breadcrumb>
  <BreadcrumbItem href="/">Home</BreadcrumbItem>
  <BreadcrumbItem current>Page</BreadcrumbItem>
</Breadcrumb>

<Pagination page={3} totalPages={12} onPageChange={fn}
  variant="default | compact | minimal"
  showFirstLast showPageInput
/>

<Stepper steps={["A","B","C"]} currentStep={1}
  variant="horizontal | vertical"
  onStepClick={fn}
/>
```

---

### Data Display

```tsx
<StatCard label="Revenue" value="$12,400"
  trend={{ direction: "up", value: "+8%", label: "vs last month" }}
  icon={<DollarSign />}
/>

<MetricCard title="Users" primary={{ value: "8,492", delta: "+3%", deltaDirection: "up" }}
  secondary={[{ label: "New", value: "124" }]}
/>

<KeyValueDisplay items={[{ key: "Status", value: <Badge>Active</Badge> }]}
  layout="horizontal | vertical | grid"
/>
```

---

### List System

```tsx
<List variant="default | flush | bordered | separated">
  <ListItem
    leading={<Avatar />}
    title="Name"
    subtitle="Sub"
    trailing={<Badge />}
    selected disabled
    onClick={fn}
  />
  <ListGroup label="Section" collapsible>
    <ListItem … />
  </ListGroup>
</List>

<ListItemCard title="Task" subtitle="Due tomorrow" badge={<Badge />}
  trailing={<Popover … />} onClick={fn}
/>
```

---

### Media

```tsx
<Avatar src="/photo.jpg" fallback="AL" size="xs|sm|md|lg|xl|2xl"
  shape="circle | square" ring
  status={<StatusBadge status="online" />}
/>

<AvatarGroup
  avatars={[{ fallback: "AL" }, { fallback: "BM" }]}
  max={4} size="md"
/>
```

---

## Accessibility

| Component | ARIA / Behavior |
|-----------|-----------------|
| `Tabs` | `role="tablist"`, `role="tab"`, `aria-selected`, arrow key navigation |
| `Tooltip` | `role="tooltip"`, delay, keyboard (focus/blur) |
| `Popover` | `role="dialog"`, `aria-haspopup`, `aria-expanded`, Escape to close |
| `Toast` | `role="alert"`, `aria-live="assertive"` |
| `Alert` | `role="alert"` |
| `EmptyState` | Semantic `<h3>` |
| `Stepper` | `aria-current="step"` |
| `Pagination` | `aria-label` on nav buttons |
| `LoadingOverlay` | `aria-busy="true"` |
| `Spinner` | `role="status"`, `aria-label`, `.sr-only` text |
| `InlineMessage` | `role="status"`, `aria-live="polite"` |
| `BaseSurface` | `role="button"` + keyboard activation when `clickable` |

---

## Do / Don't

### Do

- Use `BaseSurface` as the foundation for any new surface component
- Use `Tooltip` from portal — never position floating elements relative to parent
- Use `color` tokens from `base/tokens` for consistent variant colors
- Stack badges inside `DotBadge` for notification counters
- Use `Skeleton.Card` / `Skeleton.Text` presets for loading states
- Use `InlineMessage` for form field errors/hints — not `Alert`

### Don't

- Don't hardcode `z-index` values — use `zIndex` tokens
- Don't render Tooltip/Popover inside `overflow: hidden` containers — use Portal
- Don't use `Alert` for every message — use `InlineMessage` for inline field feedback
- Don't skip `aria` props on interactive elements
- Don't mix `Card` padding and external margin — let the Card define its own spacing
- Don't use `Banner` for transient messages — use `Toast`
