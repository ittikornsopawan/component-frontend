# 💎 Element System — Design Specification
> Surface & Display Layer · Liquid Glass Design Language · SaaS Platform

---

## 🌐 Design Foundation

### Token Reference (matches Input System exactly)

| Token | Value | Usage |
| ----- | ----- | ----- |
| `radius-sm` | `rounded-xl` (12px) | Badges, chips, small surfaces |
| `radius-md` | `rounded-2xl` (16px) | Cards, panels, inputs |
| `radius-lg` | `rounded-3xl` (24px) | Modal, full cards, drawers |
| `glass-surface` | `bg-white/60 dark:bg-white/5 backdrop-blur-lg border border-white/20 dark:border-white/10 shadow-lg shadow-black/10` | Any glass container |
| `glass-elevated` | `bg-white/80 dark:bg-white/8 backdrop-blur-xl border border-white/30 shadow-xl shadow-black/15` | Raised cards, popovers |
| `glass-subtle` | `bg-white/30 dark:bg-white/3 backdrop-blur-md border border-white/10` | Background panels, sections |
| `shadow-rest` | `shadow-lg shadow-black/10` | Default state |
| `shadow-hover` | `shadow-xl shadow-black/15` | Hovered element |
| `shadow-active` | `shadow-md shadow-black/8` | Pressed/active element |
| `focus-ring` | `ring-2 ring-purple-300/50` | Focus indicator |
| `color-primary` | `purple-400 / purple-300` | Active, selected, highlight |
| `color-secondary` | `blue-400 / blue-300` | Hover, assistive |
| `color-success` | `emerald-400 / emerald-300` | Positive feedback |
| `color-warning` | `amber-400 / amber-300` | Caution feedback |
| `color-error` | `red-400 / red-300` | Destructive feedback |
| `color-neutral` | `gray-400 / gray-500` | Metadata, secondary text |
| `transition` | `transition-all duration-200 ease-out` | All interactive states |
| `lift-hover` | `hover:-translate-y-0.5 hover:shadow-xl` | Card hover lift |
| `scale-active` | `active:scale-[0.98]` | Click feedback |

---

---

# 🧊 1. CARD SYSTEM

## Purpose

The **primary surface container** of the entire platform. Every module, feature block, content section, and data panel lives inside a Card. Cards establish depth and visual hierarchy. They must feel like frosted glass floating above the page.

---

## Component Breakdown

### `Card`
Root container. Manages padding, radius, shadow, and interactive behavior.

```
<Card variant="default | elevated | flat | glass | clickable | interactive">
  <CardHeader>
    <CardTitle />
    <CardDescription />
    <CardAction />        ← optional: right-side action (button, badge, menu)
  </CardHeader>
  <CardContent />
  <CardFooter />
</Card>
```

### `CardHeader`
Top zone: contains title, description, and optional actions. Flex row, space-between.

### `CardTitle`
Primary heading. `text-base font-semibold text-gray-800 dark:text-gray-100`

### `CardDescription`
Secondary label below title. `text-sm text-gray-500 dark:text-gray-400`

### `CardAction`
Slot on the right of `CardHeader`. Any React node — badge, icon button, dropdown trigger.

### `CardContent`
Body area. Auto padding. Holds any content.

### `CardFooter`
Bottom zone. Flex row, typically holds action buttons or meta info.

---

## Variants

| Variant | Description | Visual |
| ------- | ----------- | ------ |
| `default` | Standard glass card | `bg-white/60` + blur + border + shadow-lg |
| `elevated` | Stronger depth, prominent widget | `bg-white/80` + blur-xl + border-white/30 + shadow-xl |
| `flat` | No shadow, subtle border only | `bg-white/40` + border + no shadow |
| `glass` | Maximum transparency | `bg-white/20` + blur-2xl + border-white/10 |
| `clickable` | Full-card click target | default + hover lift + cursor-pointer + focus ring |
| `interactive` | Hover with inner highlight | default + hover scale + glow-pulse ring |

---

## Visual Rules

- Default radius: `rounded-3xl`
- Background: `bg-white/60 dark:bg-white/5`
- Blur: `backdrop-blur-xl`
- Border: `border border-white/25 dark:border-white/10`
- Shadow: `shadow-lg shadow-black/8 dark:shadow-black/20`
- Inner padding: `p-6` (default), `p-4` (compact), `p-8` (spacious)
- Gap between header/content/footer: `gap-4`

---

## UX Behavior

- **default / flat / glass:** Static. No hover transform.
- **elevated:** Slight hover lift `hover:-translate-y-1 hover:shadow-2xl`
- **clickable:** `hover:-translate-y-0.5 hover:shadow-xl hover:bg-white/70 active:scale-[0.99] active:shadow-md cursor-pointer`
- **interactive:** `hover:ring-2 hover:ring-purple-300/30 hover:bg-white/70 transition-all duration-200`
- Focus on clickable: `focus-visible:ring-2 focus-visible:ring-purple-300/50`
- All transitions: `transition-all duration-200 ease-out`

---

---

# 🧾 2. PANEL / SECTION SYSTEM

## Purpose

**Structural containers** for page layout. Panels group logical units (a form section, a settings group, a dashboard zone). They feel lighter than Cards — more like page scaffolding than floating modules.

---

## Component Breakdown

### `Panel`
Outermost section boundary. Can be full-width or constrained.

```
<Panel>
  <SectionHeader>
    <SectionTitle />
    <SectionSubtitle />
    <SectionAction />
  </SectionHeader>
  <SectionContent />
  <SectionFooter />
</Panel>
```

### `SectionContainer`
Inner grouping within a Panel. Used to separate logical sub-areas. `flex flex-col gap-6`

### `SectionHeader`
Title zone of a section. Flex row, vertically centered. Contains title, optional subtitle, optional right-side action.

### `SectionTitle`
`text-lg font-bold text-gray-800 dark:text-gray-100`

### `SectionSubtitle`
`text-sm text-gray-500 dark:text-gray-400 mt-0.5`

### `SectionAction`
Right-aligned slot in header. Accepts any node.

### `SectionContent`
Main body. `flex flex-col gap-4` or `grid` layout.

### `SectionFooter`
Bottom action zone. Flex row end-aligned.

### `Divider`
Visual separator. **No harsh lines** — uses opacity gradient or spacing.

---

## Variants

| Variant | Usage |
| ------- | ----- |
| `Panel.default` | `bg-white/30 dark:bg-white/3 backdrop-blur-sm border border-white/15 rounded-3xl` |
| `Panel.transparent` | No background, spacing only |
| `Panel.bordered` | `border-l-2 border-purple-300/40 pl-4` (left accent) |
| `Divider.solid` | `border-t border-white/20 dark:border-white/10` |
| `Divider.gradient` | Gradient fade both sides, fully transparent center |
| `Divider.spaced` | Pure `my-8` spacing, no visual line |

---

## Visual Rules

- Panel padding: `p-0` (let children handle padding) or `p-6`
- SectionHeader margin-bottom: `mb-6`
- SectionContent gap: `gap-4` to `gap-8` depending on density
- Divider: always `opacity-50` or softer. Never a harsh solid line.
- No background on transparent panels, just structured spacing

---

## UX Behavior

- Panels are not interactive by default
- `Panel.bordered` can subtly highlight `hover:border-purple-400/50`
- SectionHeader with action: action reveals on `hover` if secondary
- Divider.gradient: always decorative, no interaction

---

---

# 🏷️ 3. BADGE / TAG SYSTEM

## Purpose

**Compact information chips** — status, labels, counts, categories, roles. Must be instantly readable, visually distinct but never overpowering. They float on surfaces, so they inherit Liquid Glass feel.

---

## Component Breakdown

### `Badge`
General-purpose label chip. Inline element.

```
<Badge variant="primary | secondary | success | warning | error | neutral" size="sm | md | lg" dot={true|false}>
  Content
</Badge>
```

### `Tag`
User-created or system-assigned label. Optionally removable (has `×` icon).

```
<Tag onRemove={() => {}} icon={<Icon />}>
  Label
</Tag>
```

### `StatusBadge`
Animated presence/status indicator (online, offline, away, busy).

```
<StatusBadge status="online | offline | away | busy" />
```

### `DotBadge`
Notification dot overlaid on another element (avatar, icon).

```
<DotBadge count={3} max={99} position="top-right | top-left">
  <Avatar />
</DotBadge>
```

---

## Variants

| Variant | Background | Text | Border |
| ------- | ---------- | ---- | ------ |
| `primary` | `bg-purple-100/70 dark:bg-purple-900/30` | `text-purple-700 dark:text-purple-300` | `border-purple-200/60` |
| `secondary` | `bg-blue-100/70 dark:bg-blue-900/30` | `text-blue-700 dark:text-blue-300` | `border-blue-200/60` |
| `success` | `bg-emerald-100/70 dark:bg-emerald-900/30` | `text-emerald-700 dark:text-emerald-300` | `border-emerald-200/60` |
| `warning` | `bg-amber-100/70 dark:bg-amber-900/30` | `text-amber-700 dark:text-amber-300` | `border-amber-200/60` |
| `error` | `bg-red-100/70 dark:bg-red-900/30` | `text-red-600 dark:text-red-300` | `border-red-200/60` |
| `neutral` | `bg-gray-100/70 dark:bg-white/8` | `text-gray-600 dark:text-gray-400` | `border-gray-200/60` |

---

## Visual Rules

- **Shape:** Pill (`rounded-full`)
- **Font:** `text-xs font-semibold tracking-wide`
- **Padding:** `px-2.5 py-0.5` (sm), `px-3 py-1` (md), `px-4 py-1.5` (lg)
- **Border:** `border` at low opacity (matching variant)
- **Background:** Always semi-transparent, no solid fills
- **Dot in Badge:** 6px circle, same color as text, `mr-1.5`
- **StatusBadge online:** `bg-emerald-400` with `animate-pulse` ring
- **StatusBadge offline:** `bg-gray-400`
- **DotBadge:** `bg-red-400 text-white text-[10px] font-bold min-w-[18px] rounded-full`

---

## UX Behavior

- Badge: static, no interaction
- Tag: `hover:bg-opacity-90`; remove button `hover:text-red-400 transition-colors`
- StatusBadge: online pulses with `ring-2 ring-emerald-300/50 animate-pulse`
- DotBadge: count updates with `animate-fade-in`
- All: `transition-colors duration-150`

---

---

# 📊 4. DATA DISPLAY SYSTEM

## Purpose

**Surface critical numbers and KPIs** in a scannable, elegant format. These are the backbone of dashboards. Each component must communicate hierarchy clearly — the number should dominate, context should support, trend should guide.

---

## Component Breakdown

### `StatCard`
Single metric with label, value, optional trend, and optional icon.

```
<StatCard
  label="Total Revenue"
  value="$124,530"
  trend={{ direction: "up" | "down" | "flat", value: "+12.4%", label: "vs last month" }}
  icon={<DollarSign />}
  variant="default | glass | colored"
/>
```

### `MetricCard`
Richer stat block: value, supporting chart sparkline or mini progress bar, multiple sub-values.

```
<MetricCard
  title="Active Users"
  primary={{ value: "8,492", delta: "+3.2%" }}
  secondary={[{ label: "New", value: "124" }, { label: "Returning", value: "8,368" }]}
  chart={<SparklineData />}
/>
```

### `InfoBox`
Contextual information block. Label + multiline description + optional icon. Used for help text, feature descriptions, system notes.

```
<InfoBox variant="info | tip | warning | error" icon={<Icon />} title="..." dismissible>
  Content
</InfoBox>
```

### `KeyValueDisplay`
Table-like structured data. Property name on left, value on right.

```
<KeyValueDisplay
  items={[
    { key: "Status", value: "Active", badge: true },
    { key: "Created", value: "Jan 12, 2025" },
    { key: "Owner", value: "Alice", avatar: true },
  ]}
  layout="horizontal | vertical | grid"
/>
```

---

## Variants

**StatCard:**
- `default` — glass card with icon slot
- `glass` — higher transparency, for overlaid contexts
- `colored` — tinted background matching trend (green for up, red for down)

**InfoBox:**
- `info` — blue tint, info icon
- `tip` — purple tint, lightbulb icon
- `warning` — amber tint, warning icon
- `error` — red tint, alert icon

---

## Visual Rules

- **StatCard value:** `text-3xl font-black tabular-nums text-gray-900 dark:text-white`
- **StatCard label:** `text-sm text-gray-500 dark:text-gray-400 font-medium`
- **Trend up:** `text-emerald-600 bg-emerald-50/60 dark:bg-emerald-900/20 rounded-full px-2`
- **Trend down:** `text-red-500 bg-red-50/60 dark:bg-red-900/20 rounded-full px-2`
- **Trend arrow:** animated enter from bottom
- **InfoBox:** left border accent `border-l-4` at full opacity of the color variant, rest glass
- **KeyValueDisplay row:** alternating `bg-white/20 dark:bg-white/3` on even rows, 0 on odd

---

## UX Behavior

- **StatCard clickable variant:** full card is a link → hover lift + highlight
- **StatCard value:** number counts up on mount (`animate-count-up`) — 600ms ease-out
- **InfoBox dismissible:** `×` button top-right, fade out on dismiss
- **KeyValueDisplay row hover:** `bg-purple-50/30 dark:bg-purple-900/10` highlight
- All entries animate in with `animate-fade-in` stagger on mount

---

---

# 📋 5. LIST SYSTEM

## Purpose

**Structured row-based data** — navigation menus, record lists, action menus, grouped options. Lists are the most common UI pattern on SaaS dashboards. They must be instantly scannable, clearly separated by spacing (not borders), and feel interactive at every row.

---

## Component Breakdown

### `List`
Outer wrapper. Manages layout, spacing, variant, and role attribute.

```
<List variant="default | flush | bordered | separated" role="list | menu | navigation">
  <ListItem />
  <ListItem />
</List>
```

### `ListItem`
Single row. Optionally clickable, selectable, or just display.

```
<ListItem
  leading={<Avatar />}       ← left slot: icon, avatar, dot
  trailing={<Badge />}       ← right slot: badge, chevron, action
  title="Primary label"
  subtitle="Secondary line"
  selected={false}
  disabled={false}
  onClick={() => {}}
/>
```

### `ListGroup`
Groups list items under a label. Adds a `SectionTitle`-style header.

```
<ListGroup label="Recent" collapsible={false}>
  <ListItem />
  <ListItem />
</ListGroup>
```

### `ListItemCard`
A richer ListItem that IS a card — has its own surface, used in grids or as standalone entity rows (e.g., a person card, a task row).

```
<ListItemCard
  leading={<Avatar />}
  title="Task title"
  subtitle="Due: Tomorrow"
  badge={<StatusBadge status="online" />}
  trailing={<IconButton icon={<MoreHorizontal />} />}
  onClick={() => {}}
/>
```

---

## Variants

| Variant | Separation method |
| ------- | ----------------- |
| `default` | Gap spacing between items, no dividers |
| `flush` | Full-width, no gap, light `border-b` separator on each item |
| `bordered` | Each item in its own glass card with `gap-2` |
| `separated` | `Divider.gradient` between groups |

---

## Visual Rules

- **ListItem height:** min `h-14` (compact), `h-16` (default), `h-20` (comfortable)
- **Padding:** `px-4 py-3`
- **Leading slot:** max `w-10 h-10`
- **Title:** `text-sm font-medium text-gray-800 dark:text-gray-200`
- **Subtitle:** `text-xs text-gray-500 dark:text-gray-400`
- **Selected state:** `bg-purple-50/60 dark:bg-purple-900/20 border-l-2 border-purple-400`
- **Hover state:** `bg-white/60 dark:bg-white/8`
- **Disabled:** `opacity-40 cursor-not-allowed`
- **ListItemCard:** full `Card.clickable` treatment per row

---

## UX Behavior

- **Hover:** `bg-white/60 dark:bg-white/8 transition-colors duration-150`
- **Selected:** `border-l-2 border-purple-400` + purple tint background
- **Clickable:** `cursor-pointer` + `active:scale-[0.995]`
- **ListGroup collapsible:** chevron rotates 90°, content slides down `animate-slide-down`
- **ListItemCard hover:** lift `hover:-translate-y-0.5 hover:shadow-lg`
- **Keyboard:** `Enter` / `Space` triggers click, arrow keys navigate

---

---

# 🚨 6. FEEDBACK SYSTEM

## Purpose

**Communicate system state clearly without alarming the user.** Feedback must be calm, precise, and contextual. It guides rather than interrupts. The Liquid Glass treatment softens feedback so it feels supportive, not critical.

---

## Component Breakdown

### `Alert`
Persistent inline message. Sits within the page flow.

```
<Alert
  variant="info | success | warning | error | neutral"
  title="Optional heading"
  icon={<Icon />}
  action={{ label: "Retry", onClick: () => {} }}
  dismissible
>
  Description text
</Alert>
```

### `Toast`
Ephemeral floating notification. Auto-dismisses. Stacks vertically.

```
toast.show({
  variant: "info | success | warning | error",
  title: "Saved",
  description: "Your changes were saved successfully.",
  duration: 4000,
  action: { label: "Undo", onClick: () => {} },
  position: "top-right | bottom-right | bottom-center | top-center",
})
```

### `Banner`
Full-width persistent message at the top of the viewport or a section.

```
<Banner
  variant="info | warning | error | announcement"
  dismissible
  action={{ label: "Learn more", href: "..." }}
>
  System maintenance scheduled for tonight at 10 PM.
</Banner>
```

### `InlineMessage`
Ultra-compact status line. Appears below a form field, inside a list item, or next to a label.

```
<InlineMessage variant="info | success | warning | error" icon>
  Changes will take effect after refresh.
</InlineMessage>
```

---

## Variants & Color Matrix

| Variant | Background | Border | Icon color | Text |
| ------- | ---------- | ------ | ---------- | ---- |
| `info` | `bg-blue-50/60 dark:bg-blue-900/20` | `border-blue-200/60 dark:border-blue-700/40` | `text-blue-500` | `text-blue-800 dark:text-blue-200` |
| `success` | `bg-emerald-50/60 dark:bg-emerald-900/20` | `border-emerald-200/60` | `text-emerald-500` | `text-emerald-800 dark:text-emerald-200` |
| `warning` | `bg-amber-50/60 dark:bg-amber-900/20` | `border-amber-200/60` | `text-amber-500` | `text-amber-800 dark:text-amber-200` |
| `error` | `bg-red-50/60 dark:bg-red-900/20` | `border-red-200/60` | `text-red-500` | `text-red-800 dark:text-red-200` |
| `neutral` | `bg-gray-50/60 dark:bg-white/5` | `border-gray-200/60` | `text-gray-400` | `text-gray-700 dark:text-gray-300` |

---

## Visual Rules

- **Alert:** `rounded-2xl px-4 py-3.5 backdrop-blur-md border`; left accent strip `border-l-4` at full variant color opacity
- **Alert icon:** `w-5 h-5 flex-shrink-0 mt-0.5`
- **Alert title:** `text-sm font-semibold`; description `text-sm font-normal opacity-90`
- **Alert dismiss:** `×` button top-right, `opacity-50 hover:opacity-100`
- **Toast:** `rounded-2xl px-4 py-3.5 shadow-2xl shadow-black/20 backdrop-blur-xl`; `min-w-[320px] max-w-[400px]`; glass-elevated treatment
- **Toast progress bar:** thin `h-0.5` bar at bottom, drains over `duration` ms in variant color
- **Banner:** full width, `py-3 px-6`; no border-radius (edge-to-edge); left-accented version for warnings
- **InlineMessage:** `text-xs`, `gap-1`, inline flex, `py-0` (no block padding)

---

## UX Behavior

- **Alert enter:** `animate-fade-in` (slide down from top, opacity 0→1)
- **Alert dismiss:** slides up + fade out `animate-fade-out` 200ms
- **Toast stack:** new toasts push existing ones down; max 5 visible
- **Toast auto-dismiss:** 4s default; pauses on hover
- **Toast enter:** slide in from right (top-right) or bottom (bottom-center), spring easing
- **Banner:** sticky to viewport top. Dismiss slides up and collapses height with `transition-[height]`
- **InlineMessage:** fade in, no motion (too small for translate)

---

---

# ⏳ 7. LOADING & EMPTY SYSTEM

## Purpose

**Graceful handling of async and empty states.** Nothing breaks the premium feeling faster than a raw spinner or a blank screen. The loading system must feel intentional — like the UI is *breathing* while waiting.

---

## Component Breakdown

### `Spinner`
Circular loading indicator. Multiple sizes.

```
<Spinner size="xs | sm | md | lg | xl" variant="default | white | colored" />
```

### `Skeleton`
Placeholder block that mimics the shape of real content while loading.

```
<Skeleton width="w-full" height="h-4" rounded="rounded-xl" animate />
<Skeleton.Text lines={3} lastLineWidth="w-2/3" />
<Skeleton.Card />
<Skeleton.Avatar size="md" />
<Skeleton.ListItem />
<Skeleton.StatCard />
```

### `EmptyState`
Friendly, illustrated placeholder for zero-data states.

```
<EmptyState
  icon={<Inbox />}
  title="No results found"
  description="Try adjusting your filters or search terms."
  action={{ label: "Clear filters", onClick: () => {} }}
  variant="default | search | error | permissions"
/>
```

### `LoadingOverlay`
Full-surface glass overlay with centered spinner. Covers a card, panel, or full page.

```
<LoadingOverlay visible blur="sm | md" message="Processing…" />
```

---

## Variants

**Spinner:**
- `default` — `border-purple-400` on transparent
- `white` — for dark/glass backgrounds
- `colored` — inherits parent context color

**Skeleton:**
- Base: `bg-white/40 dark:bg-white/8` with shimmer wave animation
- Shimmer: gradient sweep left→right, 1.5s infinite

**EmptyState:**
- `default` — inbox / folder / grid icon, purple tint
- `search` — magnifier icon, blue tint
- `error` — alert icon, red tint
- `permissions` — lock icon, amber tint

**LoadingOverlay:**
- `bg-white/30 dark:bg-black/30 backdrop-blur-sm` covering parent
- Centered `Spinner.lg` + optional `message`

---

## Visual Rules

- **Spinner sizes:** xs=12px, sm=16px, md=24px, lg=36px, xl=48px
- **Spinner track:** `border-2` (sm/xs), `border-[3px]` (md/lg), `border-4` (xl)
- **Spinner color:** track `border-purple-200/40`, head `border-t-purple-400`
- **Skeleton shimmer:** `from-transparent via-white/30 dark:via-white/10 to-transparent` sweep
- **Skeleton rounded:** matches real content radius (`rounded-xl` for text, `rounded-3xl` for cards)
- **EmptyState icon:** large `w-16 h-16` icon in `p-4 rounded-3xl bg-white/40 dark:bg-white/8`
- **EmptyState title:** `text-lg font-semibold text-gray-700 dark:text-gray-300`
- **EmptyState description:** `text-sm text-gray-400 dark:text-gray-500 max-w-[280px] text-center`
- **LoadingOverlay:** `absolute inset-0 z-20 rounded-[inherit]` — inherits parent radius

---

## UX Behavior

- **Spinner:** pure CSS `animate-spin` — always smooth, never stutters
- **Skeleton:** staggered shimmer delay per item (`delay-[Xms]`)
- **EmptyState:** fade in only after 300ms delay (prevents flash on fast loads)
- **EmptyState action button:** `Card.clickable` mini treatment, purple outline style
- **LoadingOverlay:** `transition-opacity duration-300` — fade in/out, never hard cut

---

---

# 🧭 8. MICRO NAVIGATION

## Purpose

**Contextual wayfinding** within a page or feature. These are not the main sidebar nav — they are the small, embedded navigation patterns that help users move between states, steps, and sub-sections.

---

## Component Breakdown

### `Tabs`
Horizontal switcher between content panels.

```
<Tabs
  value={activeTab}
  onChange={setActiveTab}
  variant="default | pills | underline | glass"
>
  <Tab value="overview" label="Overview" icon={<LayoutDashboard />} badge={3} />
  <Tab value="analytics" label="Analytics" />
  <Tab value="settings" label="Settings" disabled />
</Tabs>
<TabPanel value="overview" activeValue={activeTab}>
  Content
</TabPanel>
```

### `Breadcrumb`
Path trail showing current location.

```
<Breadcrumb separator="/" | <ChevronRight />>
  <BreadcrumbItem href="/">Home</BreadcrumbItem>
  <BreadcrumbItem href="/settings">Settings</BreadcrumbItem>
  <BreadcrumbItem current>Profile</BreadcrumbItem>
</Breadcrumb>
```

### `Pagination`
Page navigator for long lists.

```
<Pagination
  page={1}
  totalPages={20}
  onPageChange={(p) => {}}
  variant="default | compact | minimal"
  showFirstLast
  showPageInput
/>
```

### `Stepper`
Linear progress through a multi-step flow.

```
<Stepper
  steps={["Account", "Plan", "Payment", "Confirm"]}
  currentStep={2}
  variant="horizontal | vertical"
  onStepClick={(i) => {}}
/>
```

---

## Variants

**Tabs:**
- `default` — glass pill background on active tab
- `pills` — each tab is a separate pill button, active = purple filled
- `underline` — underline indicator slides under active tab
- `glass` — tabs float on a glass track background

**Pagination:**
- `default` — numbered page buttons with prev/next
- `compact` — `<` Page 3 of 20 `>`
- `minimal` — only prev/next arrows

**Stepper:**
- `horizontal` — steps in a row with connecting line
- `vertical` — steps stacked, used in sidebar forms

---

## Visual Rules

- **Tabs active indicator:** `bg-white/70 dark:bg-white/15 shadow-md rounded-xl` (default/glass); `bg-purple-400/20 border border-purple-300/40` (pills)
- **Tabs font:** `text-sm font-medium`
- **Tabs active text:** `text-gray-900 dark:text-white`
- **Tabs inactive text:** `text-gray-500 dark:text-gray-400 hover:text-gray-700`
- **Tabs badge:** `Badge.primary` size `sm` placed `ml-1.5`
- **Tab indicator transition:** `transition-all duration-200 ease-out` (slide, not jump)
- **Breadcrumb:** `text-sm text-gray-500 dark:text-gray-400`; current item `text-gray-800 dark:text-gray-200 font-medium`
- **Breadcrumb separator:** `mx-2 text-gray-300 dark:text-gray-600`
- **Pagination button:** `w-9 h-9 rounded-xl glass-surface text-sm font-medium`; active = `bg-purple-400/20 border-purple-300/40 text-purple-700`
- **Stepper completed circle:** `bg-purple-400 text-white`; active: `ring-2 ring-purple-300/50 bg-white text-purple-600`; pending: `bg-white/40 text-gray-400`
- **Stepper connector:** completed = `bg-purple-300/60`; pending = `bg-white/20`

---

## UX Behavior

- **Tabs:** active tab indicator slides (not jumps) to new position via `translate-x` animation
- **Tabs:** keyboard → `←/→` arrow keys navigate; `Enter` selects
- **Breadcrumb links:** `hover:text-purple-600 dark:hover:text-purple-400 transition-colors`
- **Pagination:** active page has no click handler; prev/next disable at bounds
- **Pagination input:** direct page number entry → `Enter` navigates
- **Stepper:** completed steps are clickable (navigate back); future steps are locked (disabled)
- **Stepper vertical:** completed → checkmark icon; active → step number; pending → step number dimmed

---

---

# 🖼️ 9. MEDIA SYSTEM

## Purpose

**Human presence and visual content** components. Avatars ground the UI in humanity. Images and thumbnails display rich content without breaking the glass surface aesthetic.

---

## Component Breakdown

### `Avatar`
User/entity representation. Initials, image, or icon fallback.

```
<Avatar
  src="https://..."
  alt="Alice"
  fallback="AL"
  size="xs | sm | md | lg | xl | 2xl"
  shape="circle | square"
  status={<StatusBadge status="online" />}
  ring                     ← purple ring variant
/>
```

### `AvatarGroup`
Stacked row of overlapping avatars with overflow count.

```
<AvatarGroup max={4} size="sm" overlap="lg | md | sm">
  <Avatar src="..." />
  <Avatar src="..." />
  <Avatar src="..." />
  <Avatar src="..." />
  <Avatar src="..." />
</AvatarGroup>
```

### `Image`
Contextual image display with glass treatment.

```
<Image
  src="..."
  alt="..."
  aspectRatio="video | square | portrait | auto"
  rounded="sm | md | lg | full"
  overlay                  ← dark gradient overlay on hover
  caption="Optional caption"
  fallback={<ImageFallback />}
/>
```

### `Thumbnail`
Compact image preview used in lists, cards, file browsers.

```
<Thumbnail
  src="..."
  alt="..."
  size="sm | md | lg"
  type="image | video | pdf | file"
  selected
  onClick={() => {}}
/>
```

---

## Visual Rules

- **Avatar sizes:** xs=20px, sm=28px, md=36px, lg=44px, xl=56px, 2xl=72px
- **Avatar image:** `object-cover w-full h-full`
- **Avatar fallback bg:** gradient from purple to blue `from-purple-300 to-blue-300` with white initials
- **Avatar ring:** `ring-2 ring-purple-300/60 ring-offset-2 ring-offset-white dark:ring-offset-slate-900`
- **AvatarGroup overlap:** `ml-[-10px]` (sm), `ml-[-12px]` (md), `ml-[-16px]` (lg)
- **AvatarGroup overflow badge:** same size as group avatars, `bg-white/60 dark:bg-white/15 text-gray-600 dark:text-gray-400 font-semibold border border-white/30`
- **Image overlay:** `bg-gradient-to-t from-black/30 to-transparent` on hover
- **Image caption:** `text-xs text-gray-500 mt-1.5`
- **Thumbnail selected:** `ring-2 ring-purple-400 scale-105`
- **Thumbnail type badge:** bottom-right `Badge` (PDF, MP4, etc.)

---

## UX Behavior

- **Avatar hover (interactive):** `ring-2 ring-purple-300/50 transition-all`
- **Avatar fallback:** smooth `animate-fade-in` once image loads, no layout shift
- **AvatarGroup hover:** hovered avatar `scale-110 z-10 relative`
- **Image overlay:** `opacity-0 group-hover:opacity-100 transition-opacity duration-200`
- **Thumbnail hover:** `scale-105 shadow-lg transition-transform duration-200`
- **Thumbnail selected:** spring scale animation on select/deselect

---

---

# ⚙️ 10. UTILITY ELEMENTS

## Purpose

**Invisible architecture** — small functional pieces that don't own a surface but enable proper layout, disclosure, and contextual help across the entire system.

---

## Component Breakdown

### `Tooltip`
Hover-triggered label for iconographic or truncated UI elements.

```
<Tooltip content="Delete item" position="top | bottom | left | right" delay={400}>
  <IconButton icon={<Trash2 />} />
</Tooltip>
```

### `Popover`
Click-triggered floating panel with rich content. More complex than Tooltip.

```
<Popover
  trigger={<Button>Options</Button>}
  position="bottom-start | bottom-end | top-start"
  width="sm | md | lg | auto"
>
  <PopoverContent />
</Popover>
```

### `Divider`
*(also in Panel system — exported standalone)*

```
<Divider
  variant="solid | gradient | dashed"
  orientation="horizontal | vertical"
  label="OR"              ← optional center label
  spacing="sm | md | lg"
/>
```

### `Spacer`
Explicit whitespace control.

```
<Spacer size="1 | 2 | 3 | 4 | 6 | 8 | 12 | 16" axis="x | y" />
```

---

## Visual Rules

- **Tooltip:** `bg-gray-900/90 dark:bg-gray-800/95 backdrop-blur-md text-white text-xs font-medium px-2.5 py-1.5 rounded-lg shadow-lg max-w-[200px]`
- **Tooltip arrow:** 6px CSS triangle matching background
- **Popover:** full `glass-elevated` treatment: `bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border border-white/25 shadow-2xl rounded-2xl`
- **Popover width:** sm=220px, md=320px, lg=420px
- **Divider solid:** `border-t border-white/20 dark:border-white/10`
- **Divider gradient:** `h-px bg-gradient-to-r from-transparent via-white/30 dark:via-white/15 to-transparent`
- **Divider dashed:** `border-t border-dashed border-white/20`
- **Divider label:** centered `text-xs text-gray-400 px-3 bg-inherit`

---

## UX Behavior

- **Tooltip:** appears after 400ms hover delay; instant disappear on mouse-leave; `animate-fade-in` 150ms
- **Tooltip:** never appears on touch — only pointer:fine devices
- **Popover:** opens on click, closes on outside-click or `Escape`; `animate-fade-in` + `scale-95→100`
- **Popover focus trap:** focus cycles within popover content while open
- **Divider:** purely decorative, `aria-hidden="true"` always
- **Spacer:** renders as `div` with `display: block` or `inline-block` — zero visual output

---

---

# 📋 Implementation Priority

## Phase 1 — Foundation (MUST ship first)

| Component | Reason |
| --------- | ------ |
| `Card` + sub-components | Every page needs it |
| `Badge` + `StatusBadge` | Used inside cards and lists |
| `Alert` | Required for all form feedback |
| `Tabs` | Primary page navigation |
| `Skeleton` | Every async load |
| `Spinner` | Loading states everywhere |
| `Panel` + `Divider` | Page structure |

## Phase 2 — Data & Content

| Component | Reason |
| --------- | ------ |
| `List` + `ListItem` + `ListItemCard` | Record browsing |
| `StatCard` + `MetricCard` | Dashboard widgets |
| `KeyValueDisplay` | Detail pages |
| `Avatar` + `AvatarGroup` | People data |
| `EmptyState` | Zero data handling |
| `Toast` | System feedback |

## Phase 3 — Rich & Advanced

| Component | Reason |
| --------- | ------ |
| `Breadcrumb` + `Pagination` + `Stepper` | Navigation patterns |
| `Tooltip` + `Popover` | Contextual overlays |
| `Image` + `Thumbnail` | Media content |
| `Banner` | System announcements |
| `LoadingOverlay` | Full-surface loading |
| `InfoBox` + `InlineMessage` | Rich feedback |

---

# 🔗 Consistency Checklist

| Rule | Input System | Element System |
| ---- | ------------ | -------------- |
| Border radius | `rounded-2xl` / `rounded-3xl` | ✅ Same |
| Glass surface | `bg-white/60 backdrop-blur-lg` | ✅ Same |
| Shadow | `shadow-lg shadow-black/10` | ✅ Same |
| Focus ring | `ring-2 ring-purple-300/50` | ✅ Same |
| Primary color | `purple-400` / `purple-300` | ✅ Same |
| Transition | `duration-200 ease-out` | ✅ Same |
| Error color | `red-400` / `red-300` | ✅ Same |
| Font scale | `text-sm / text-xs / text-base` | ✅ Same |
| Spacing unit | Tailwind 4px grid | ✅ Same |

---

*End of Part 1 Specification. Proceed to Part 2 for implementation.*
