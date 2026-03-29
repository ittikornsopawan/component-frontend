# 💎 Liquid Glass Input Framework

A next-generation SaaS UI Input Framework with a **Liquid Glass** aesthetic — frosted surfaces, soft purple glows, and buttery-smooth interactions. Built with Next.js 16, TypeScript, TailwindCSS, and React Hook Form compatibility baked in.

---

## 🚀 Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and click **View Component Showcase** or navigate directly to [http://localhost:3000/common/component](http://localhost:3000/common/component).

---

## 📦 Tech Stack

| Tool                  | Version | Purpose               |
| --------------------- | ------- | --------------------- |
| Next.js               | 16.x    | App Router framework  |
| React                 | 18.x    | UI runtime            |
| TypeScript            | 5.x     | Strict typing         |
| TailwindCSS           | 3.4.x   | Utility-first styles  |
| date-fns              | 3.x     | Date utilities        |
| lucide-react          | latest  | Icons                 |
| clsx + tailwind-merge | latest  | Class merging         |

---

## 🗂 Project Structure

```text
src/
├── app/
│   ├── globals.css              # Tailwind base + glass utilities
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Home page
│   └── common/component/
│       └── page.tsx             # Interactive component showcase
├── components/
│   └── input/
│       ├── core/                # Layer 1: Foundation primitives
│       │   ├── BaseInput.tsx
│       │   ├── InputWrapper.tsx
│       │   ├── FormField.tsx
│       │   ├── InputLabel.tsx
│       │   ├── FloatingLabel.tsx
│       │   ├── InputHelperText.tsx
│       │   ├── InputErrorMessage.tsx
│       │   ├── InputIcon.tsx
│       │   ├── InputContainer.tsx
│       │   └── InputSpinner.tsx
│       │
│       ├── index.ts             # Barrel exports (all 29 components)
│       ├── common.input.md      # Full documentation
│       │
│       ├── TextInput.tsx        # Basic
│       ├── PasswordInput.tsx
│       ├── NumberInput.tsx
│       ├── SearchInput.tsx
│       │
│       ├── Select.tsx           # Selection
│       ├── MultiSelect.tsx
│       ├── Combobox.tsx
│       ├── Autocomplete.tsx
│       │
│       ├── Checkbox.tsx         # Boolean
│       ├── CheckboxGroup.tsx
│       ├── Toggle.tsx
│       ├── RadioGroup.tsx
│       │
│       ├── DatePicker.tsx       # Date & Time
│       ├── DateRangePicker.tsx
│       ├── TimePicker.tsx
│       ├── DateTimePicker.tsx
│       │
│       ├── FileUpload.tsx       # File Inputs
│       ├── FileUploadMultiple.tsx
│       ├── DragAndDropUpload.tsx
│       ├── ImageUpload.tsx
│       ├── AvatarUpload.tsx
│       │
│       ├── TextArea.tsx         # Rich Inputs
│       ├── TagInput.tsx
│       ├── MarkdownEditor.tsx
│       │
│       ├── PhoneInput.tsx       # Special
│       ├── OTPInput.tsx
│       ├── ColorPicker.tsx
│       └── Slider.tsx           # Slider + RangeSlider
└── lib/
    └── utils.ts                 # cn() class utility
```

---

## 🔌 Usage

```tsx
// Import from barrel
import { TextInput, Select, OTPInput, Slider } from "@/components/input";

// Controlled
const [val, setVal] = useState("");
<TextInput
  label="Email"
  value={val}
  onChange={(e) => setVal(e.target.value)}
  helperText="We'll never share your email"
/>

// Uncontrolled
<TextInput label="Name" defaultValue="John" />

// With error
<TextInput label="Username" errorMessage="Username is taken" />

// Loading state
<TextInput label="Checking..." isLoading />

// Disabled
<TextInput label="Read-only" disabled defaultValue="Not editable" />
```

---

## 🎨 Design System

### Liquid Glass Core

Every component uses:

```css
bg-white/60 dark:bg-white/5   /* frosted surface */
backdrop-blur-lg               /* glass blur */
border border-white/20         /* low-opacity border */
shadow-lg shadow-black/10      /* layered shadow */
```

### Focus State

```css
ring-2 ring-purple-300/50      /* soft purple ring */
border-purple-300/50           /* matching border */
shadow-xl shadow-purple-100/20 /* elevated glow */
scale-[1.01]                   /* subtle grow */
```

### Error State

```css
border-red-300/60              /* soft red border */
ring-2 ring-red-300/40         /* red ring */
animate-shake-sm               /* 0.4s horizontal shake */
```

### Dark Mode

Toggle via `.dark` class on any ancestor element:

```tsx
<div className="dark">
  <TextInput label="Dark mode input" />
</div>
```

---

## ♿ Accessibility

All components include:

- `aria-label`, `aria-invalid`, `aria-describedby`
- `aria-haspopup` / `aria-expanded` on dropdowns
- `role="alert"` on error messages
- `role="listbox"` / `role="option"` on dropdown items
- `role="switch"` on Toggle
- `role="combobox"` on Combobox/Autocomplete
- Full keyboard navigation

---

## 📖 Full Documentation

See [`src/components/input/common.input.md`](./src/components/input/common.input.md) for:

- Component catalog
- Props standard
- UX rules
- Theming guide
- React Hook Form integration
- Do / Don't guide
