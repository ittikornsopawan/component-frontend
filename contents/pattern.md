<!-- markdownlint-disable MD024 MD060 -->
# Pattern System — Liquid Glass SaaS

Patterns are the answer to: **"How do I build this product screen?"**

Components are building blocks. Patterns are the instructions for assembling them into real product UI that solves real UX problems.

---

## Architecture

```text
Input System    ← raw form controls (TextInput, Select, DatePicker, …)
Element System  ← display + feedback primitives (Card, Badge, Alert, StatCard, …)
Design Tokens   ← colors, spacing, radius, shadow, motion
Motion System   ← transition presets, interaction states, Framer variants
───────────────────────────────────────────────────────
Pattern System  ← assembled UX flows using all of the above
```

**Rule:** Patterns never introduce new visual primitives. Every style decision traces back to a token. Every component traces back to Input or Element System.

---

## Cross-Pattern Rules

These rules apply to **every** pattern without exception.

### Spacing

- Use the token spacing scale exclusively (`xs=4px`, `sm=8px`, `md=12px`, `lg=16px`, `xl=24px`, `2xl=32px`)
- Prefer spacing over borders to separate related groups
- Field groups: `gap-4` between inputs within a group, `gap-7` between sections

### Motion

- All interactive elements use `transition.base` (`transition-all duration-200 ease-out`) as default
- Hover: `hover:-translate-y-0.5 hover:shadow-glass-lg` for cards
- Press: `active:scale-[0.98]` for buttons, `active:scale-[0.99]` for large surfaces
- Loading states must be visible immediately (no blank flash)

### Dark Mode

- All patterns are class-based dark mode (`dark:` prefix)
- No hardcoded hex colors — use token classes only

### Accessibility

- All form controls have visible labels (never placeholder-only)
- Destructive actions require confirmation
- Modal closes on backdrop click and Escape key
- `prefers-reduced-motion` handled globally via CSS

---

## 1. Form Pattern

### Purpose

Handle user input with clarity, inline validation, and logical flow.

### Structure

```text
FormContainer (glass card, max-w-2xl)
├── FormHeader         ← title + subtitle
├── FormBody
│   ├── FieldGroup 1   ← section label + related fields
│   ├── FieldGroup 2   ← section label + related fields
│   └── FieldGroup N   ← …
└── FormFooter         ← cancel/reset + submit CTA
```

### Layout Rules

- Container: `max-w-2xl`, `rounded-3xl`, glass surface
- Group related fields under a `SectionLabel` (11px uppercase, brand color)
- `gap-4` between fields, `gap-7` between sections
- Two-column grid (`grid grid-cols-2 gap-4`) for date + budget pairs
- Footer: `justify-between` — ghost action left, primary CTA right

### UX Rules

- Label always visible above input — never rely on placeholder alone
- Inline validation: error message appears below the field on blur or submit
- Required fields marked with `*` via `required` prop
- Submit button shows loading spinner during async call
- Success state: `Alert variant="success"` replaces/precedes the form, dismissible

### Behavior

- Focus moves top → bottom logically (natural tab order)
- Submit: validate → show inline errors → show loading → show success
- Reset: clears all fields, clears errors, hides success state

### Component Composition

```tsx
// Container
<div className="bg-white/60 dark:bg-white/5 backdrop-blur-xl border border-white/25 rounded-3xl overflow-hidden">

  // Header
  <div className="px-6 pt-6 pb-4 border-b border-white/20">
    <h3>Create Project</h3>
    <p>subtitle</p>
  </div>

  // Body
  <div className="p-6 flex flex-col gap-7">
    <div className="flex flex-col gap-4">
      <SectionLabel>Project Details</SectionLabel>
      <TextInput label="Name" required errorMessage={errors.name} />
      <TextArea  label="Description" autoResize />
      <RadioGroup label="Priority" options={PRIORITY_OPTIONS} />
    </div>
    <div className="flex flex-col gap-4">
      <SectionLabel>Team & Timeline</SectionLabel>
      <MultiSelect label="Team Members" />
      <div className="grid grid-cols-2 gap-4">
        <DatePicker label="Due Date" />
        <NumberInput label="Budget" />
      </div>
    </div>
    <div className="flex flex-col gap-4">
      <SectionLabel>Preferences</SectionLabel>
      <Toggle label="Email notifications" />
    </div>
  </div>

  // Footer
  <div className="px-6 py-4 border-t border-white/20 flex justify-between">
    <button onClick={reset}>Reset</button>
    <button disabled={submitting} onClick={submit}>
      {submitting ? <><Spinner size="xs" /> Creating…</> : <>Create Project</>}
    </button>
  </div>
</div>
```

### Do / Don't

```text
✅ Group related fields with a SectionLabel
✅ Show error below the specific field that failed
✅ Disable submit and show spinner during async call
✅ Show success Alert after successful submit
✅ Offer a reset/cancel path

❌ Use placeholder as the only label
❌ Show a page-level error banner when field-level errors are possible
❌ Block the submit button until all fields are touched (use submit-time validation)
❌ Use more than 3 field groups in a single form (split into steps or pages)
```

---

## 2. Dashboard Pattern

### Purpose

Display a high-level overview of system state with key metrics and quick access to content.

### Structure

```text
PageHeader         ← title + subtitle + action bar (search + period filter)
StatCard Row       ← 4 metric cards in a responsive grid
Content Grid       ← 3 summary cards / recent items
```

### Layout Rules

- StatCards: `grid-cols-2 lg:grid-cols-4 gap-4`
- Content grid: `grid-cols-1 md:grid-cols-3 gap-4`
- Page header: flex row on desktop, stacked on mobile

### UX Rules

- Highlight **change** with trend indicators (↑ green, ↓ red, → gray)
- Content cards show a single metric with supporting context
- Progress bars fill left-to-right, color-coded by severity
- Avoid crowding — max 4 stat cards, max 3 content cards per row

### Component Composition

```tsx
// Page header with filter
<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
  <div>
    <h3>Analytics Overview</h3>
    <p>subtitle</p>
  </div>
  <div className="flex items-center gap-3">
    <SearchInput placeholder="Search…" />
    <Select options={PERIOD_OPTIONS} value={period} onChange={setPeriod} />
  </div>
</div>

// Stat cards
<div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
  <StatCard label="Revenue"    value="$84,200" trend={{ direction: "up",   value: "+12.4%" }} icon={<DollarSign />} />
  <StatCard label="Users"      value="3,847"   trend={{ direction: "up",   value: "+8.1%"  }} icon={<Users />} />
  <StatCard label="Conversion" value="4.6%"    trend={{ direction: "down", value: "-0.3%"  }} icon={<TrendingUp />} />
  <StatCard label="Response"   value="1.2s"    trend={{ direction: "flat", value: "±0ms"   }} icon={<BarChart3 />} />
</div>

// Content cards with progress
<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
  {items.map(item => (
    <div className="bg-white/50 rounded-2xl p-4 hover:-translate-y-0.5 transition-all duration-200">
      <p>{item.label}</p>
      <p>{item.name}</p>
      <div className="h-1.5 bg-black/8 rounded-full">
        <div className="h-full rounded-full bg-purple-400" style={{ width: `${item.progress}%` }} />
      </div>
    </div>
  ))}
</div>
```

### Do / Don't

```text
✅ Use StatCard component for all metric tiles
✅ Show trend direction with color (green/red/gray)
✅ Allow period filtering (7d / 30d / 90d / 1y)
✅ Keep content cards to 3 per row max

❌ Mix chart types in a single row
❌ Show raw numbers without context (always add trend or label)
❌ Make content cards clickable without a visible indicator
```

---

## 3. Table / List Pattern

### Purpose

Display structured data sets with search, filter, sort, selection, and actions.

### Structure

```text
TableContainer (glass card, rounded-3xl, overflow-hidden)
├── Toolbar            ← SearchInput + StatusFilter + selection count
├── Table / EmptyState ← headers (sortable) + rows (selectable)
│   ├── Checkbox col
│   ├── Data cols      ← name, Badge status, team, owner, due date
│   └── Actions col    ← Edit + Delete icon buttons
└── PaginationRow      ← count label + Pagination component
```

### UX Rules

- Row hover: `hover:bg-white/40 dark:hover:bg-white/[0.04]`
- Selected row: `bg-purple-50/40 dark:bg-purple-900/10`
- Clicking anywhere on the row toggles selection
- Action buttons stop event propagation (`e.stopPropagation()`)
- Sortable columns show `ChevronUp/Down` when active, `ChevronsUpDown` when inactive
- Empty state: icon + message + clear-filters button

### Derived State Pattern

```tsx
// Filter
const filteredRows = data.filter(row => {
  const matchSearch = !query || row.name.toLowerCase().includes(query);
  const matchStatus = filter === "all" || row.status === filter;
  return matchSearch && matchStatus;
});

// Sort
const sortedRows = [...filteredRows].sort((a, b) => {
  return sortDir === "asc"
    ? a[sortCol].localeCompare(b[sortCol])
    : b[sortCol].localeCompare(a[sortCol]);
});
```

### Component Composition

```tsx
<div className="bg-white/60 rounded-3xl overflow-hidden border border-white/25 shadow-xl">

  {/* Toolbar */}
  <div className="px-5 py-4 border-b border-white/20 flex gap-3">
    <SearchInput value={search} onChange={v => setSearch(v)} />
    <Select options={STATUS_FILTER_OPTIONS} value={status} onChange={setStatus} />
    {selected.length > 0 && <span>{selected.length} selected</span>}
  </div>

  {/* Table */}
  {sortedRows.length === 0 ? (
    <EmptyStateInline />
  ) : (
    <table>
      <thead>
        <tr>
          <th><input type="checkbox" /></th>
          {COLS.map(col => (
            <th onClick={() => toggleSort(col)}>
              {col} {sortIcon}
            </th>
          ))}
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {sortedRows.map(row => (
          <tr onClick={() => toggleRow(row.id)}>
            <td><input type="checkbox" /></td>
            <td>{row.name}</td>
            <td><Badge variant={statusVariant[row.status]}>{row.status}</Badge></td>
            <td>{row.owner}</td>
            <td><Edit2 /><Trash2 /></td>
          </tr>
        ))}
      </tbody>
    </table>
  )}

  {/* Pagination */}
  <div className="px-5 py-4 border-t border-white/15 flex justify-between">
    <span>{filteredRows.length} results</span>
    <Pagination totalPages={N} page={page} onPageChange={setPage} variant="compact" />
  </div>
</div>
```

### Do / Don't

```text
✅ Reset page to 1 when search or filter changes
✅ Clear selection when filter changes
✅ Stop propagation on action cell clicks
✅ Show EmptyState when results are 0 with a clear-filters action
✅ Indicate sort direction with an icon in the header

❌ Re-fetch from server on every keystroke — debounce or filter client-side
❌ Put complex forms inline in a table row — use a modal instead
❌ Allow selecting across pages (selection is page-scoped)
```

---

## 4. Detail / View Pattern

### Purpose

Show the full context of a single item (project, user, order, etc.).

### Structure

```text
DetailHeader       ← title + status badge + action buttons (Edit, Delete, Back)
InfoGrid           ← 2–3 column grid of labeled key-value pairs
ContentSections    ← vertically stacked Panel cards (Description, Activity, Related)
```

### UX Rules

- Header: sticky on scroll with backdrop blur
- Info grid uses `Panel` or `BaseSurface` with consistent padding
- Long text sections use `Panel variant="flat"` with a visible title
- Actions: Edit (primary), Delete (destructive, secondary), Back (ghost)
- Related data: use `List` component with appropriate variant

### Layout

```tsx
// Detail header
<div className="flex items-start justify-between gap-4 mb-6">
  <div>
    <div className="flex items-center gap-3 mb-1">
      <h1>{item.name}</h1>
      <Badge variant={statusVariant}>{item.status}</Badge>
    </div>
    <p className="text-sm text-gray-500">{item.description}</p>
  </div>
  <div className="flex items-center gap-2">
    <button>Edit</button>
    <button>Delete</button>
  </div>
</div>

// Key-value info grid
<div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
  {[
    { label: "Owner",   value: item.owner },
    { label: "Due",     value: item.due },
    { label: "Budget",  value: item.budget },
    { label: "Team",    value: item.team },
  ].map(({ label, value }) => (
    <div className="bg-white/50 rounded-2xl p-4">
      <p className="text-xs text-gray-400">{label}</p>
      <p className="text-sm font-semibold text-gray-800">{value}</p>
    </div>
  ))}
</div>

// Content sections
<Panel title="Description">{item.description}</Panel>
<Panel title="Activity"><List items={activityItems} /></Panel>
```

---

## 5. Modal / Dialog Pattern

### Purpose

Focused overlay for short tasks, confirmations, and status messages that don't warrant a full page.

### Structure

```text
Backdrop (blur + dark overlay, click to close)
ModalPanel (glass card, max-w-md or max-w-sm)
├── ModalHeader    ← title + subtitle + optional close button (X)
├── ModalBody      ← content (form / message / confirmation)
└── ModalFooter    ← cancel + primary CTA
```

### Dialog Types

| Type | Use case | Max width | CTA color |
|------|----------|-----------|-----------|
| **Confirm** | Destructive action | `max-w-md` | `bg-red-500` |
| **Form** | Focused edit | `max-w-md` | `from-purple-500` |
| **Status** | Success / error feedback | `max-w-sm` | `from-purple-500` |

### UX Rules

- Keep to a single task — never nest modals
- Backdrop click closes the modal
- Add explicit `X` close button on form modals
- Destructive modals must name the item being deleted (`"Brand Refresh"`)
- Status modals: centered layout, large icon, single CTA

### Component Pattern

```tsx
// Backdrop + panel shell
{open && (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
    <div
      className="absolute inset-0 bg-black/25 dark:bg-black/50 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    />
    <div className="relative w-full max-w-md bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-white/30 rounded-3xl shadow-glass-xl animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-white/20">
        <h3>Modal Title</h3>
        <button onClick={onClose}><X /></button>
      </div>
      {/* Body */}
      <div className="p-6">{children}</div>
      {/* Footer */}
      <div className="px-6 pb-5 pt-4 flex justify-end gap-3 border-t border-white/20">
        <button onClick={onClose}>Cancel</button>
        <button onClick={onConfirm}>Confirm</button>
      </div>
    </div>
  </div>
)}
```

### Do / Don't

```text
✅ Name the item in delete confirmations
✅ Close on backdrop click
✅ Use animate-fade-in on both backdrop and panel
✅ Keep form modals to 3–4 fields max

❌ Open a modal from inside a modal
❌ Use modal for multi-step flows (use a Stepper page instead)
❌ Remove the cancel path from destructive modals
❌ Auto-close after a destructive action without user confirmation
```

---

## 6. File / Upload Pattern

### Purpose

Handle file selection, drag & drop, preview, and upload progress.

### Structure

```text
UploadZone     ← DragAndDropUpload (primary) or FileUpload (simple)
FileList       ← list of selected/uploaded files with remove actions
ProgressBar    ← per-file upload progress
Preview        ← ImageUpload for image files; icon for others
```

### UX Rules

- Show file preview immediately on selection (before upload)
- Display file name + size + type icon
- Allow remove on each file before and after upload
- Show upload progress inline per file
- Limit feedback: max file size error shown below the dropzone

### Component Usage

```tsx
// Simple single file
<FileUpload label="Attach Document" accept=".pdf,.doc" maxSizeMB={10} />

// Multiple files
<FileUploadMultiple label="Upload Assets" accept=".jpg,.png,.pdf" maxFiles={5} />

// Drag & drop zone
<DragAndDropUpload label="Project Files" accept=".zip,.pdf" maxSizeMB={50} />

// Image with preview
<ImageUpload label="Cover Image" aspectRatio="video" maxSizeMB={5} />
```

---

## 7. Search & Filter Pattern

### Purpose

Allow users to find data quickly with real-time search and composable filters.

### Structure

```text
SearchBar      ← SearchInput (debounced)
FilterBar      ← Select / MultiSelect for faceted filters
ActiveChips    ← Badge chips showing applied filters with remove action
ResultList     ← Table, List, or Card grid
EmptyState     ← when zero results
```

### UX Rules

- Debounce search input (300ms minimum)
- Show result count alongside the search bar
- Active filters visible as removable chips
- "Clear all filters" resets every filter + search in one action
- Empty state message is filter-aware ("No results for 'design'")

### Component Usage

```tsx
// Search + filter bar
<div className="flex items-center gap-3">
  <SearchInput value={q} onChange={setQ} debounceMs={300} />
  <Select options={STATUS_OPTIONS} value={status} onChange={setStatus} />
  <MultiSelect options={TEAM_OPTIONS} value={teams} onChange={setTeams} />
</div>

// Active filter chips
<div className="flex items-center gap-2">
  {status !== "all" && (
    <Badge variant="primary" onRemove={() => setStatus("all")}>
      Status: {status}
    </Badge>
  )}
  <button onClick={clearAll}>Clear all</button>
</div>

// Empty state
{results.length === 0 && (
  <EmptyState
    title={`No results for "${q}"`}
    description="Try different keywords or remove a filter."
    action={{ label: "Clear filters", onClick: clearAll }}
  />
)}
```

---

## 8. Navigation Pattern

### Purpose

Guide the user across the application with clear location awareness and smooth transitions.

### Structure

```text
GlobalNav     ← sticky top bar (brand + search + user avatar)
SideNav       ← collapsible sidebar with section groups (desktop)
PageTabs      ← Tabs component for sub-section switching
Breadcrumb    ← Breadcrumb component for deep pages
SectionNav    ← sticky sub-page anchors (showcase pages)
```

### UX Rules

- Active item always visually distinct (background + color change)
- Smooth indicator transition on tab change
- Breadcrumb shows current depth (home > section > item)
- Section nav auto-highlights as user scrolls (IntersectionObserver)

### Component Usage

```tsx
// Tabs with smooth indicator
<Tabs
  tabs={[
    { id: "overview",  label: "Overview" },
    { id: "activity",  label: "Activity" },
    { id: "settings",  label: "Settings" },
  ]}
  activeTab={tab}
  onChange={setTab}
/>

// Breadcrumb
<Breadcrumb
  items={[
    { label: "Projects", href: "/projects" },
    { label: "Brand Refresh", href: "/projects/1" },
    { label: "Settings" },
  ]}
/>

// Section nav (sticky anchors)
<nav className="sticky top-[65px] z-30 bg-white/20 backdrop-blur-xl border-b overflow-x-auto scrollbar-hide">
  {NAV_ITEMS.map(item => (
    <a
      key={item.id}
      href={`#${item.id}`}
      className={activeSection === item.id ? "text-purple-700 bg-purple-400/20" : "text-gray-500"}
    >
      {item.label}
    </a>
  ))}
</nav>
```

---

## 9. Feedback Pattern

### Purpose

Communicate system responses (success, error, warning, info) clearly and non-intrusively.

### Types and Placement

| Type | Component | Placement | Duration |
|------|-----------|-----------|----------|
| **Inline field error** | `errorMessage` prop | Below the input | Until fixed |
| **Form-level feedback** | `Alert` | Top of form | Dismissible |
| **Toast notification** | `Toast` | Bottom-right stack | 4–6s auto-dismiss |
| **Page-level alert** | `Banner` | Below page header | Until dismissed |
| **Inline status** | `InlineMessage` | Inside content | Static |

### UX Rules

- Field errors: always next to the field, never page-level
- Toast: use for background actions (saved, deleted, sent)
- Alert: use for form submit outcomes
- Never use both Toast and Alert for the same event
- Errors must be actionable ("Try again" / "Go to settings")

### Component Usage

```tsx
// Field error
<TextInput label="Email" errorMessage="Invalid email address" />

// Form success
<Alert variant="success" title="Saved!" dismissible onDismiss={...}>
  Changes have been applied to your account.
</Alert>

// Toast
const { toast } = useToast();
toast({ variant: "success", title: "Project created", description: "3 members notified." });

// Page banner
<Banner variant="warning" title="Trial ends in 3 days">
  <a href="/billing">Upgrade now</a>
</Banner>
```

---

## 10. Loading & State Pattern

### Purpose

Handle every async state gracefully — never show a blank screen or broken layout.

### States

| State | Component | Behavior |
|-------|-----------|----------|
| **Loading** | `Skeleton` | Placeholder layout matching final content shape |
| **Loading (overlay)** | `LoadingOverlay` | Over existing content during refresh |
| **Loading (button)** | `Spinner` inside button | Disable button, show spinner + label |
| **Empty** | `EmptyState` | Meaningful message + optional CTA |
| **Error** | `Alert variant="error"` | Error message + retry action |
| **Success** | `Alert variant="success"` or `Toast` | Confirm completion |

### State Machine Rules

```text
idle → loading → success
              ↘ error → retry → loading
```

Never skip states. Every transition must be visible.

### Component Usage

```tsx
// Content area with all states
{state === "loading" && (
  <div className="flex flex-col gap-3">
    <Skeleton variant="text" lines={1} width="40%" />
    <Skeleton variant="card" height={120} />
    <Skeleton variant="card" height={120} />
  </div>
)}

{state === "error" && (
  <Alert variant="error" title="Failed to load projects" action={{ label: "Retry", onClick: refetch }}>
    Check your connection and try again.
  </Alert>
)}

{state === "empty" && (
  <EmptyState
    title="No projects yet"
    description="Create your first project to get started."
    action={{ label: "Create Project", onClick: openForm }}
  />
)}

{state === "success" && <ProjectGrid data={projects} />}
```

### Skeleton Matching

Skeleton placeholders must match the shape of the content they replace:

```text
Card grid    → Skeleton variant="card"    × N
Table rows   → Skeleton variant="text"    × 5–8
Stat tiles   → Skeleton variant="card"    height=80 × 4
Page header  → Skeleton variant="heading" + variant="text"
```

---

## Import Paths

```ts
// Input System
import { TextInput }    from "@/components/input/TextInput";
import { TextArea }     from "@/components/input/TextArea";
import { Select }       from "@/components/input/Select";
import { MultiSelect }  from "@/components/input/MultiSelect";
import { DatePicker }   from "@/components/input/DatePicker";
import { NumberInput }  from "@/components/input/NumberInput";
import { RadioGroup }   from "@/components/input/RadioGroup";
import { Toggle }       from "@/components/input/Toggle";
import { SearchInput }  from "@/components/input/SearchInput";

// Element System
import { StatCard }      from "@/components/element/StatCard";
import { Badge }         from "@/components/element/Badge";
import { Alert }         from "@/components/element/Alert";
import { Banner }        from "@/components/element/Banner";
import { Spinner }       from "@/components/element/Spinner";
import { Skeleton }      from "@/components/element/Skeleton";
import { EmptyState }    from "@/components/element/EmptyState";
import { Pagination }    from "@/components/element/Pagination";
import { Tabs }          from "@/components/element/Tabs";
import { Breadcrumb }    from "@/components/element/Breadcrumb";
import { Panel }         from "@/components/element/Panel";
import { List }          from "@/components/element/List";
import { Toast }         from "@/components/element/Toast";

// Motion System
import { transition, interaction, cardMotion } from "@/styles/motion";

// Design Tokens
import { glass, semanticColor, zIndex }        from "@/styles/tokens";
```
