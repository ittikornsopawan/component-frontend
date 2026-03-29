# 💎 Generate SaaS Page from Design System (Liquid Glass)

You are a senior frontend engineer, UX designer, and design system expert.

Your task is to **generate a complete page UI** based on an existing Design System.

---

# 🎯 OBJECTIVE

Build a **production-ready page** that:

- strictly follows the Design System
- reuses existing components as much as possible
- creates new reusable components if needed
- maintains Liquid Glass + Pastel SaaS style

---

# 📂 INPUT SOURCES (CRITICAL)

Before building anything, you MUST read and follow:

## Design System Documents

- content/input.component.md
- content/element.component.md
- content/pattern.component.md
- content/overlay.component.md
- content/document.component.md (if applicable)

---

# ⚠️ RULE: DESIGN SYSTEM FIRST

## MUST FOLLOW

- use existing components FIRST
- DO NOT reinvent UI
- DO NOT create inline styles randomly

---

## IF COMPONENT DOES NOT EXIST

👉 You MUST:

1. Create it as a reusable component
2. Place it in:

src/components/{domain}/

3. Follow:
- naming consistency
- Liquid Glass style
- token system
- motion system

---

# 🧠 DEVELOPMENT STRATEGY

## Step 1 — Understand Page Type

Identify:

- is it a form?
- dashboard?
- table/list?
- detail view?
- document workspace?

---

## Step 2 — Map to Pattern System

Use existing patterns:

- Form Pattern
- Dashboard Pattern
- List/Table Pattern
- Detail Pattern
- Modal Pattern

---

## Step 3 — Compose UI

Use:

- Element components (Card, Panel, Badge)
- Input components (TextInput, Select)
- Overlay components (Modal, Dropdown)

---

## Step 4 — Fill Missing Gaps

If something is missing:

- extract reusable logic
- create common component

---

# 🎨 DESIGN RULES (STRICT)

## MUST MATCH:

- Liquid Glass style
- Pastel Purple / Blue system
- rounded-2xl
- backdrop blur
- soft shadow

---

## INTERACTION

- smooth transitions
- hover → blue
- focus → purple
- motion consistent

---

# 🧱 TECH STACK

- Next.js (App Router)
- TypeScript
- TailwindCSS
- Use cn() utility

---

# 📁 OUTPUT STRUCTURE

---

## 1. Page File

app/{feature}/page.tsx

---

## 2. Components

Reusable components MUST be placed in:

src/components/{feature}/

OR

src/components/common/

---

## 3. Example

- TaskListPage
- TaskCard
- TaskFilterBar

---

# ♻️ REUSABILITY RULE

## BEFORE CREATING NEW COMPONENT:

Ask:

- Can this be reused?
- Is this generic enough?

---

## IF YES:

👉 Put in:

src/components/common/

---

## IF FEATURE-SPECIFIC:

👉 Put in:

src/components/{feature}/

---

# 🧪 UX REQUIREMENTS

- fully interactive
- loading state
- empty state
- error state

---

# 📄 OUTPUT FORMAT

You MUST return:

---

## 1. Page Code

- full page implementation

---

## 2. Component List

List ALL:

- reused components
- newly created components

---

## 3. New Common Components

For each new component:

- name
- purpose
- why reusable

---

## 4. Notes

- explain pattern used
- explain UX decisions

---

# 🚨 IMPORTANT RULES

❌ DO NOT:

- hardcode styles outside system
- duplicate components
- break consistency

---

# ✅ DO:

- reuse
- abstract
- follow system strictly

---

# 🧠 FINAL MINDSET

You are NOT building a page.

You are:

👉 Extending a Design System

Every page must:

- improve reusability
- maintain consistency
- feel like part of one product