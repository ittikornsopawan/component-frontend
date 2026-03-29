# 💎 Liquid Glass Input Framework — Documentation

## 1. Overview

### Design Philosophy
The Liquid Glass Input Framework is a **next-generation SaaS UI system** built for long-usage office and developer tools. Every component is crafted to be **soft, airy, premium, and slightly futuristic** — inspired by frosted glass interfaces.

### Liquid Glass Concept
All components share:
- **`backdrop-blur-lg`** — frosted glass surface
- **`bg-white/60 dark:bg-white/5`** — semi-transparent layers
- **`border-white/20`** — low-opacity borders for depth
- **`shadow-lg shadow-black/10`** — layered shadow (no heavy elevation)
- **`focus:ring-2 focus:ring-purple-300/50`** — soft purple glow on focus

---

## 2. Component Catalog

| Component | Category | Use Case |
|---|---|---|
| `TextInput` | Basic | General text entry with label, icons, floating label |
| `PasswordInput` | Basic | Password with toggle visibility |
| `NumberInput` | Basic | Numeric entry with stepper controls |
| `SearchInput` | Basic | Search with debounce + clear button |
| `Select` | Selection | Glass dropdown, single selection |
| `MultiSelect` | Selection | Chip-based multi-selection |
| `Combobox` | Selection | Filterable select |
| `Autocomplete` | Selection | Async search with loading state |
| `Checkbox` | Boolean | Single checkbox with description |
| `CheckboxGroup` | Boolean | Multiple checkboxes grouped |
| `Toggle` | Boolean | Animated switch (sm/md/lg) |
| `RadioGroup` | Boolean | Mutually exclusive options |
| `DatePicker` | Date/Time | Glass calendar, single date |
| `DateRangePicker` | Date/Time | Date range with visual highlight |
| `TimePicker` | Date/Time | Hour/minute stepper with AM/PM |
| `DateTimePicker` | Date/Time | Combined date + time picker |
| `FileUpload` | File | Single file upload |
| `FileUploadMultiple` | File | Multiple files with list |
| `DragAndDropUpload` | File | Drag & drop zone |
| `ImageUpload` | File | Image with preview + blur bg |
| `AvatarUpload` | File | Circular avatar with camera overlay |
| `TextArea` | Rich | Auto-resize textarea with char count |
| `TagInput` | Rich | Animated chip tags |
| `MarkdownEditor` | Rich | Write + Preview modes with toolbar |
| `PhoneInput` | Special | Country code picker + phone number |
| `OTPInput` | Special | Auto-focus jumping OTP digits |
| `ColorPicker` | Special | Color wheel + hex input + presets |
| `Slider` | Special | Single range slider |
| `RangeSlider` | Special | Dual-handle range slider |

---

## 3. UX Rules

### Focus Behavior
- Ring appears via `transition-all duration-200 ease-out`
- Purple glow: `focus:ring-2 focus:ring-purple-300/50`
- Subtle scale: `focus:scale-[1.01]`
- Shadow increase: `focus:shadow-xl focus:shadow-purple-100/20`

### Error Behavior
- Soft red border: `border-red-300/60 ring-2 ring-red-300/40`
- Subtle shake: `animate-shake-sm` (custom keyframe, 0.4s)
- Always show error message below with icon
- Never use aggressive red — use `red-300/400` with opacity

### Loading Behavior
- Inline `InputSpinner` component (no layout shift)
- Interaction disabled during loading
- Spinner uses `caret-purple-400` color scheme

### Disabled Behavior
- `opacity-50 cursor-not-allowed pointer-events-none`
- No hover effects when disabled

---

## 4. Props Standard

All components follow a **consistent prop contract**:

```ts
interface SharedInputProps {
  label?: string;           // Label above or floating
  helperText?: string;      // Assistive text below input
  errorMessage?: string;    // Error text (replaces helperText)
  isLoading?: boolean;      // Shows spinner, disables interaction
  disabled?: boolean;       // Disables input
  required?: boolean;       // Shows * on label
  id?: string;              // Custom ID (auto-generated if omitted)
  className?: string;       // Additional Tailwind classes
}
```

All controlled inputs support:
- `value` + `onChange` for controlled mode
- `defaultValue` for uncontrolled mode

---

## 5. Theming

### Light Mode
```
bg-white/60     → Input background
text-gray-800   → Input text
border-white/20 → Border
```

### Dark Mode
```
dark:bg-white/5      → Input background
dark:text-gray-200   → Input text
dark:border-white/10 → Border
```

### Color Tokens
| Token | Usage |
|---|---|
| `purple-300/50` | Focus ring |
| `purple-400` | Active/selected elements |
| `purple-500` | Icons on hover |
| `blue-300/40` | Hover glow |
| `red-300/400` | Error states |

### Applying Dark Mode
Wrap your app root in the `dark` class:
```html
<html class="dark">
```
Or use Tailwind's `darkMode: "class"` strategy.

---

## 6. Accessibility

All components include:
- `aria-label` — descriptive labels for screen readers
- `aria-invalid` — set to `"true"` on error
- `aria-describedby` — links input to helper/error text via ID
- `aria-haspopup` / `aria-expanded` — on dropdown triggers
- `role="alert"` — on error messages
- `role="listbox"` / `role="option"` — on dropdown lists
- `role="combobox"` — on Combobox/Autocomplete
- `role="switch"` — on Toggle component
- Keyboard navigation — all interactive elements are focusable

---

## 7. Form Integration (React Hook Form)

All components expose `ref` via `forwardRef` and are fully compatible:

```tsx
import { useForm } from "react-hook-form";
import { TextInput, Select, Checkbox } from "@/components/input";

function MyForm() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextInput
        label="Email"
        errorMessage={errors.email?.message}
        {...register("email", { required: "Email is required" })}
      />
      <Select
        label="Role"
        options={roleOptions}
        errorMessage={errors.role?.message}
        {...register("role")}
      />
      <Checkbox
        label="Accept terms"
        errorMessage={errors.terms?.message}
        {...register("terms", { required: "You must accept" })}
      />
    </form>
  );
}
```

---

## 8. Do / Don't

### ✅ DO
- Always provide a `label` (or `floatingLabel`)
- Use `helperText` to give user context
- Use `errorMessage` (not inline messages) for validation
- Use `disabled` for read-only states
- Use `isLoading` instead of manually hiding inputs
- Keep `className` overrides minimal
- Use the `cn()` utility for conditional classes

### ❌ DON'T
- Don't use placeholders as labels (accessibility violation)
- Don't use hard-coded hex colors — use Tailwind tokens
- Don't add solid black/white backgrounds — always use opacity
- Don't override `caret-purple-400` — it's part of the typing experience
- Don't skip `aria-describedby` on custom wrappers
- Don't use saturated/harsh colors for errors
- Don't combine `isLoading` and `disabled` simultaneously
