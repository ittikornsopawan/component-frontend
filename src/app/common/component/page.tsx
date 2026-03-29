"use client";

import React, { useState, useEffect } from "react";
import { TextInput } from "@/components/input/TextInput";
import { PasswordInput } from "@/components/input/PasswordInput";
import { NumberInput } from "@/components/input/NumberInput";
import { SearchInput } from "@/components/input/SearchInput";
import { Select } from "@/components/input/Select";
import { MultiSelect } from "@/components/input/MultiSelect";
import { Combobox } from "@/components/input/Combobox";
import { Autocomplete } from "@/components/input/Autocomplete";
import { Checkbox } from "@/components/input/Checkbox";
import { CheckboxGroup } from "@/components/input/CheckboxGroup";
import { Toggle } from "@/components/input/Toggle";
import { RadioGroup } from "@/components/input/RadioGroup";
import { DatePicker } from "@/components/input/DatePicker";
import { DateRangePicker } from "@/components/input/DateRangePicker";
import { TimePicker } from "@/components/input/TimePicker";
import { DateTimePicker } from "@/components/input/DateTimePicker";
import { FileUpload } from "@/components/input/FileUpload";
import { FileUploadMultiple } from "@/components/input/FileUploadMultiple";
import { DragAndDropUpload } from "@/components/input/DragAndDropUpload";
import { ImageUpload } from "@/components/input/ImageUpload";
import { AvatarUpload } from "@/components/input/AvatarUpload";
import { TextArea } from "@/components/input/TextArea";
import { TagInput } from "@/components/input/TagInput";
import { MarkdownEditor } from "@/components/input/MarkdownEditor";
import { PhoneInput } from "@/components/input/PhoneInput";
import { OTPInput } from "@/components/input/OTPInput";
import { ColorPicker } from "@/components/input/ColorPicker";
import { Slider, RangeSlider } from "@/components/input/Slider";
import { Mail, User, Globe, Hash, Sparkles, TrendingUp, Users, DollarSign, BarChart3, Plus, ChevronUp, ChevronDown, ChevronsUpDown, Edit2, Trash2, Clock, CheckCircle2, X, FolderOpen } from "lucide-react";
import { StatCard } from "@/components/element/StatCard";
import { Badge } from "@/components/element/Badge";
import { Alert } from "@/components/element/Alert";
import { Spinner } from "@/components/element/Spinner";
import { Pagination } from "@/components/element/Pagination";
import { EmptyState } from "@/components/element/EmptyState";

// ─── Shared demo options ──────────────────────────────────────────────────────
const FRAMEWORK_OPTIONS = [
  { value: "next", label: "Next.js" },
  { value: "react", label: "React" },
  { value: "vue", label: "Vue.js" },
  { value: "svelte", label: "Svelte" },
  { value: "astro", label: "Astro" },
  { value: "nuxt", label: "Nuxt" },
];

const ROLE_OPTIONS = [
  { value: "admin", label: "Administrator", description: "Full system access" },
  { value: "editor", label: "Editor", description: "Can edit content" },
  { value: "viewer", label: "Viewer", description: "Read-only access" },
];

// ─── Pattern mock data ──────────────────────────────────────────────────────
const TEAM_OPTIONS = [
  { value: "alex",  label: "Alex Chen" },
  { value: "sam",   label: "Sam Park" },
  { value: "maya",  label: "Maya Rodriguez" },
  { value: "james", label: "James Liu" },
  { value: "nina",  label: "Nina Patel" },
];

const PRIORITY_OPTIONS_RADIO = [
  { value: "low",    label: "Low",    description: "Nice to have" },
  { value: "medium", label: "Medium", description: "Standard priority" },
  { value: "high",   label: "High",   description: "Urgent attention needed" },
];

const STATUS_FILTER_OPTIONS = [
  { value: "all",    label: "All Status" },
  { value: "active", label: "Active" },
  { value: "review", label: "In Review" },
  { value: "paused", label: "Paused" },
  { value: "done",   label: "Done" },
];

const MOCK_PROJECTS = [
  { id: 1, name: "Brand Identity Refresh",     status: "active" as const, team: "Design",      owner: "Alex Chen",      ownerInitials: "AC", due: "Apr 15, 2026", budget: "$12,400" },
  { id: 2, name: "API v3 Migration",           status: "review" as const, team: "Engineering",  owner: "Sam Park",       ownerInitials: "SP", due: "Mar 28, 2026", budget: "$8,200" },
  { id: 3, name: "Mobile App Redesign",        status: "active" as const, team: "Product",      owner: "Maya Rodriguez", ownerInitials: "MR", due: "May 1, 2026",  budget: "$24,000" },
  { id: 4, name: "Data Analytics Dashboard",  status: "paused" as const, team: "Engineering",  owner: "James Liu",      ownerInitials: "JL", due: "Jun 10, 2026", budget: "$15,800" },
  { id: 5, name: "Customer Portal v2",         status: "done"   as const, team: "Product",      owner: "Nina Patel",     ownerInitials: "NP", due: "Mar 10, 2026", budget: "$6,500" },
  { id: 6, name: "Security Audit 2026",        status: "review" as const, team: "Engineering",  owner: "Alex Chen",      ownerInitials: "AC", due: "Apr 30, 2026", budget: "$9,100" },
] as const;

type Project = typeof MOCK_PROJECTS[number];
type SortCol = "name" | "status" | "team" | "owner" | "due";

// ─── Section wrapper ──────────────────────────────────────────────────────────
function Section({ id, title, description, children }: { id: string; title: string; description: string; children: React.ReactNode }) {
  return (
    <section id={id} className="flex flex-col gap-6 scroll-mt-28">
      <div>
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-1">{title}</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">{children}</div>
    </section>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white/40 dark:bg-white/5 backdrop-blur-xl border border-white/30 dark:border-white/10 shadow-xl shadow-black/5 rounded-3xl p-6 flex flex-col gap-5">
      <p className="text-[11px] font-bold uppercase tracking-widest text-purple-500 dark:text-purple-400">{title}</p>
      {children}
    </div>
  );
}

function FullCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="md:col-span-2 bg-white/40 dark:bg-white/5 backdrop-blur-xl border border-white/30 dark:border-white/10 shadow-xl shadow-black/5 rounded-3xl p-6 flex flex-col gap-5">
      <p className="text-[11px] font-bold uppercase tracking-widest text-purple-500 dark:text-purple-400">{title}</p>
      {children}
    </div>
  );
}

function PatternBlock({ id, title, badge, description, children }: { id: string; title: string; badge?: React.ReactNode; description: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-28 flex flex-col gap-4">
      <div className="flex items-start gap-3">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-1">
            <h3 className="text-base font-semibold text-gray-800 dark:text-gray-100">{title}</h3>
            {badge}
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
        </div>
      </div>
      {children}
    </section>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p className="text-[11px] font-bold uppercase tracking-widest text-purple-500 dark:text-purple-400 mb-1">{children}</p>;
}

function FieldGroup({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-col gap-4">{children}</div>;
}

// ─── Nav config ──────────────────────────────────────────────────────────────
const NAV_ITEMS = [
  { id: "basic",     label: "Basic" },
  { id: "selection", label: "Selection" },
  { id: "boolean",   label: "Boolean" },
  { id: "datetime",  label: "Date & Time" },
  { id: "files",     label: "Files" },
  { id: "rich",      label: "Rich" },
  { id: "special",   label: "Special" },
  { id: "patterns",  label: "✦ Patterns" },
];

// ─── Main page ────────────────────────────────────────────────────────────────
export default function ComponentShowcasePage() {
  const [darkMode, setDarkMode] = useState(false);
  const [activeSection, setActiveSection] = useState("basic");

  // Auto-highlight nav on scroll
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    NAV_ITEMS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { rootMargin: "-30% 0px -60% 0px", threshold: 0 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  // Basic
  const [textVal, setTextVal] = useState("");
  const [floatVal, setFloatVal] = useState("");
  const [searchVal, setSearchVal] = useState("");

  // Selection
  const [selectVal, setSelectVal] = useState("");
  const [multiVal, setMultiVal] = useState<string[]>([]);
  const [comboVal, setComboVal] = useState("");
  const [acVal, setAcVal] = useState("");

  // Boolean
  const [checkVal, setCheckVal] = useState(false);
  const [groupVal, setGroupVal] = useState<string[]>([]);
  const [toggleVal, setToggleVal] = useState(false);
  const [radioVal, setRadioVal] = useState("");

  // Date
  const [dateVal, setDateVal] = useState<Date | null>(null);
  const [timeVal, setTimeVal] = useState<{ hours: number; minutes: number; period: "AM" | "PM" }>({ hours: 9, minutes: 0, period: "AM" });
  const [sliderVal, setSliderVal] = useState(40);
  const [rangeVal, setRangeVal] = useState<[number, number]>([20, 75]);

  // OTP / Color
  const [otpVal, setOtpVal] = useState("");
  const [colorVal, setColorVal] = useState("#a78bfa");

  // ── Pattern: Form ─────────────────────────────────────────────────────────
  const [formName, setFormName] = useState("");
  const [formTeam, setFormTeam] = useState<string[]>([]);
  const [formDate, setFormDate] = useState<Date | null>(null);
  const [formPriority, setFormPriority] = useState("medium");
  const [formNotify, setFormNotify] = useState(true);
  const [formIsPublic, setFormIsPublic] = useState(false);
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);
  const [formNameError, setFormNameError] = useState("");

  const handleFormSubmit = async () => {
    if (!formName.trim()) { setFormNameError("Project name is required"); return; }
    setFormSubmitting(true);
    await new Promise((r) => setTimeout(r, 1800));
    setFormSubmitting(false);
    setFormSuccess(true);
  };

  const resetForm = () => {
    setFormName(""); setFormTeam([]); setFormDate(null);
    setFormPriority("medium"); setFormNotify(true); setFormIsPublic(false);
    setFormNameError(""); setFormSuccess(false);
  };

  // ── Pattern: Dashboard ────────────────────────────────────────────────────
  const [dashPeriod, setDashPeriod] = useState("30d");
  const [dashSearch, setDashSearch] = useState("");

  // ── Pattern: Table ────────────────────────────────────────────────────────
  const [tableSearch, setTableSearch] = useState("");
  const [tableStatus, setTableStatus] = useState("all");
  const [tablePage, setTablePage] = useState(1);
  const [tableSelected, setTableSelected] = useState<number[]>([]);
  const [tableSortCol, setTableSortCol] = useState<SortCol>("name");
  const [tableSortDir, setTableSortDir] = useState<"asc" | "desc">("asc");

  const filteredProjects = (MOCK_PROJECTS as readonly Project[]).filter((p) => {
    const q = tableSearch.toLowerCase();
    const matchSearch = !q || p.name.toLowerCase().includes(q) || p.owner.toLowerCase().includes(q) || p.team.toLowerCase().includes(q);
    const matchStatus = tableStatus === "all" || p.status === tableStatus;
    return matchSearch && matchStatus;
  });

  const sortedProjects = [...filteredProjects].sort((a, b) => {
    const va = a[tableSortCol] as string;
    const vb = b[tableSortCol] as string;
    return tableSortDir === "asc" ? va.localeCompare(vb) : vb.localeCompare(va);
  });

  const toggleSort = (col: SortCol) => {
    if (tableSortCol === col) setTableSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else { setTableSortCol(col); setTableSortDir("asc"); }
  };

  const toggleRow = (id: number) =>
    setTableSelected((s) => s.includes(id) ? s.filter((i) => i !== id) : [...s, id]);

  // ── Pattern: Modal ────────────────────────────────────────────────────────
  const [activeModal, setActiveModal] = useState<null | "delete" | "edit" | "info">(null);
  const [modalTarget, setModalTarget] = useState<Project>(MOCK_PROJECTS[0]);
  const [editName, setEditName] = useState("");

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="min-h-screen bg-gradient-to-br from-slate-100 via-purple-50/60 to-blue-50 dark:from-slate-950 dark:via-purple-950/40 dark:to-slate-900">
        {/* ── Header ── */}
        <header className="sticky top-0 z-40 bg-white/30 dark:bg-black/20 backdrop-blur-xl border-b border-white/20 dark:border-white/10">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-purple-400 to-blue-400 flex items-center justify-center shadow-md">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-800 dark:text-gray-100 leading-none">Liquid Glass UI</h1>
                <p className="text-[10px] text-gray-500 dark:text-gray-400 font-medium tracking-wide uppercase">Input Framework</p>
              </div>
            </div>
            <button
              onClick={() => setDarkMode((v) => !v)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/50 dark:bg-white/10 border border-white/30 dark:border-white/15 text-xs font-medium text-gray-700 dark:text-gray-300 hover:bg-white/70 dark:hover:bg-white/20 transition-all duration-200 shadow-sm"
            >
              {darkMode ? "☀️ Light" : "🌙 Dark"}
            </button>
          </div>
        </header>

        {/* ── Section Nav ── */}
        <nav className="sticky top-[65px] z-30 bg-white/20 dark:bg-black/10 backdrop-blur-xl border-b border-white/20 dark:border-white/10 overflow-x-auto scrollbar-hide">
          <div className="max-w-7xl mx-auto px-6 flex items-center gap-1 py-2">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={() => setActiveSection(item.id)}
                className={`flex-shrink-0 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 ${
                  activeSection === item.id
                    ? "bg-purple-400/20 dark:bg-purple-500/20 text-purple-700 dark:text-purple-300 border border-purple-300/40"
                    : "text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-white/40 dark:hover:bg-white/10"
                }`}
              >
                {item.label}
              </a>
            ))}
          </div>
        </nav>

        <main className="max-w-7xl mx-auto px-6 py-12 flex flex-col gap-16">

          {/* ── Hero ── */}
          <div className="text-center py-8">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-100/60 dark:bg-purple-900/30 border border-purple-200/50 dark:border-purple-700/30 text-xs font-semibold text-purple-600 dark:text-purple-400 mb-6 shadow-sm">
              <Sparkles className="w-3 h-3" /> 29 Components · Liquid Glass Design
            </div>
            <h1 className="text-5xl font-black text-gray-900 dark:text-white mb-4 tracking-tight">
              Input UI <span className="bg-gradient-to-r from-purple-500 to-blue-400 bg-clip-text text-transparent">Framework</span>
            </h1>
            <p className="text-lg text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
              A premium, fully interactive SaaS input system. Every component is production-ready with full accessibility, dark mode, and React Hook Form support.
            </p>
          </div>

          {/* ─────────────────────── BASIC ─────────────────────── */}
          <Section id="basic" title="🔹 Basic Inputs" description="Core text entry components — the foundation of every form.">
            <Card title="Default · Label · Icon">
              <TextInput label="Full Name" placeholder="John Doe" prefixIcon={<User className="w-4 h-4" />} value={textVal} onChange={(e) => setTextVal(e.target.value)} />
              <TextInput label="Email Address" placeholder="hello@example.com" prefixIcon={<Mail className="w-4 h-4" />} helperText="We'll never share your email" />
              <TextInput label="Website" placeholder="https://example.com" prefixIcon={<Globe className="w-4 h-4" />} suffixIcon={<Hash className="w-4 h-4" />} />
            </Card>

            <Card title="States">
              <TextInput label="Default" placeholder="Start typing…" />
              <TextInput label="With helper text" placeholder="Enter username" helperText="3–20 characters, no spaces" />
              <TextInput label="Error state" placeholder="Invalid input" errorMessage="This field is required" defaultValue="bad value" />
              <TextInput label="Disabled" placeholder="Cannot edit" disabled defaultValue="Read only value" />
              <TextInput label="Loading" placeholder="Processing…" isLoading />
            </Card>

            <Card title="Floating Label">
              <TextInput label="Your Name" placeholder="" floatingLabel value={floatVal} onChange={(e) => setFloatVal(e.target.value)} />
              <TextInput label="Email Address" placeholder="" floatingLabel prefixIcon={<Mail className="w-4 h-4" />} />
              <TextInput label="Required Field" placeholder="" floatingLabel required />
            </Card>

            <Card title="Password · Number · Search">
              <PasswordInput label="Password" placeholder="Enter password" helperText="Min 8 characters" />
              <PasswordInput label="Error password" placeholder="••••••••" errorMessage="Password too short" />
              <NumberInput label="Quantity" defaultValue={5} min={1} max={100} step={1} helperText="Between 1–100" />
              <SearchInput label="Search" placeholder="Search anything…" debounceMs={300} value={searchVal} onChange={setSearchVal} helperText={searchVal ? `Searching for: "${searchVal}"` : undefined} />
            </Card>
          </Section>

          {/* ─────────────────────── SELECTION ─────────────────────── */}
          <Section id="selection" title="🔹 Selection Inputs" description="Glass dropdowns, chips, and async search.">
            <Card title="Select">
              <Select label="Framework" options={FRAMEWORK_OPTIONS} placeholder="Choose a framework…" helperText="Pick your frontend stack" value={selectVal} onChange={setSelectVal} />
              <Select label="Error state" options={FRAMEWORK_OPTIONS} errorMessage="Please select a framework" />
              <Select label="Disabled" options={FRAMEWORK_OPTIONS} disabled defaultValue="next" />
              <Select label="Loading" options={FRAMEWORK_OPTIONS} isLoading />
            </Card>

            <Card title="Multi Select · Combobox">
              <MultiSelect
                label="Technologies"
                options={FRAMEWORK_OPTIONS}
                placeholder="Select multiple…"
                value={multiVal}
                onChange={setMultiVal}
                helperText={multiVal.length > 0 ? `${multiVal.length} selected` : "Pick one or more"}
              />
              <Combobox
                label="Search & Select"
                options={FRAMEWORK_OPTIONS}
                placeholder="Type to filter…"
                value={comboVal}
                onChange={setComboVal}
              />
              <Autocomplete
                label="Autocomplete"
                options={FRAMEWORK_OPTIONS}
                placeholder="Start typing…"
                value={acVal}
                onChange={setAcVal}
              />
            </Card>
          </Section>

          {/* ─────────────────────── BOOLEAN ─────────────────────── */}
          <Section id="boolean" title="🔹 Boolean Inputs" description="Checkboxes, toggles, and radio groups with full state support.">
            <Card title="Checkbox · Checkbox Group">
              <Checkbox label="I agree to the terms" description="By checking this you accept our Terms of Service and Privacy Policy." checked={checkVal} onChange={(e) => setCheckVal(e.target.checked)} />
              <Checkbox label="Error state" description="This checkbox has an error." errorMessage="You must accept the terms" />
              <Checkbox label="Disabled (unchecked)" disabled />
              <Checkbox label="Disabled (checked)" disabled defaultChecked />
              <CheckboxGroup
                label="Notify me about"
                options={[
                  { value: "email", label: "Email notifications", description: "Daily digest" },
                  { value: "push", label: "Push notifications", description: "Real-time alerts" },
                  { value: "sms", label: "SMS notifications", description: "Critical updates only" },
                ]}
                value={groupVal}
                onChange={setGroupVal}
              />
            </Card>

            <Card title="Toggle · Radio Group">
              <Toggle label="Enable notifications" description="Receive alerts when something important happens" size="md" checked={toggleVal} onChange={setToggleVal} />
              <Toggle label="Dark mode" size="md" defaultChecked />
              <Toggle label="Small size" size="sm" />
              <Toggle label="Large size" size="lg" defaultChecked />
              <Toggle label="Disabled off" disabled />
              <Toggle label="Disabled on" disabled defaultChecked />
              <RadioGroup
                label="Account role"
                options={ROLE_OPTIONS}
                value={radioVal}
                onChange={setRadioVal}
                helperText="This cannot be changed later"
              />
            </Card>
          </Section>

          {/* ─────────────────────── DATE & TIME ─────────────────────── */}
          <Section id="datetime" title="🔹 Date & Time" description="Glass calendar pickers with smooth interactions.">
            <Card title="Date Picker">
              <DatePicker label="Select date" value={dateVal} onChange={setDateVal} helperText={dateVal ? `Selected: ${dateVal.toDateString()}` : "Click to open calendar"} />
              <DatePicker label="Error state" errorMessage="Please select a date" />
              <DatePicker label="Disabled" disabled defaultValue={new Date()} />
            </Card>

            <Card title="Date Range · Time · DateTime">
              <DateRangePicker label="Date range" helperText="Click start then end date" />
              <TimePicker label="Appointment time" value={timeVal} onChange={(t) => setTimeVal({ hours: t.hours, minutes: t.minutes, period: t.period ?? "AM" })} helperText={`Selected: ${String(timeVal.hours).padStart(2,"0")}:${String(timeVal.minutes).padStart(2,"0")} ${timeVal.period}`} />
              <DateTimePicker label="Schedule event" helperText="Pick date and time together" />
            </Card>
          </Section>

          {/* ─────────────────────── FILE ─────────────────────── */}
          <Section id="files" title="🔹 File Inputs" description="Upload zones from simple click to full drag & drop.">
            <Card title="File Upload · Multiple">
              <FileUpload label="Attach document" accept=".pdf,.doc,.docx" maxSizeMB={10} helperText="PDF or Word, max 10MB" />
              <FileUploadMultiple label="Upload files" accept=".pdf,.jpg,.png" maxFiles={5} helperText="Up to 5 files" />
            </Card>

            <Card title="Image · Avatar">
              <ImageUpload label="Cover image" aspectRatio="video" maxSizeMB={5} helperText="16:9 recommended" />
              <div className="flex items-center gap-8 justify-center py-2">
                <AvatarUpload label="Avatar (SM)" size="sm" helperText="Click to upload" />
                <AvatarUpload label="Avatar (MD)" size="md" helperText="Click to upload" />
                <AvatarUpload label="Avatar (LG)" size="lg" helperText="Click to upload" />
              </div>
            </Card>

            <FullCard title="Drag & Drop Upload">
              <DragAndDropUpload
                label="Project files"
                accept=".zip,.tar,.gz,.pdf"
                maxSizeMB={50}
                helperText="Drag files here or click to browse — up to 50MB each"
              />
            </FullCard>
          </Section>

          {/* ─────────────────────── RICH ─────────────────────── */}
          <Section id="rich" title="🔹 Rich Inputs" description="Advanced input types for content-heavy workflows.">
            <Card title="TextArea">
              <TextArea label="Bio" placeholder="Tell us about yourself…" helperText="Supports auto-resize" autoResize />
              <TextArea label="With character count" placeholder="Write something…" showCount maxLength={200} autoResize />
              <TextArea label="Error state" placeholder="Required field" errorMessage="Description is required" />
            </Card>

            <Card title="Tag Input">
              <TagInput label="Skills" placeholder="Add skill…" defaultValue={["TypeScript", "React"]} helperText="Enter or comma to add" />
              <TagInput label="Max 5 tags" placeholder="Add tag…" maxTags={5} helperText="Maximum 5 tags allowed" />
              <TagInput label="Error state" placeholder="Add tag…" errorMessage="At least one tag is required" />
            </Card>

            <FullCard title="Markdown Editor">
              <MarkdownEditor
                label="Description"
                placeholder="Write your content in **Markdown**…"
                defaultValue="## Welcome\n\nThis is a **Liquid Glass** markdown editor.\n\nFeatures:\n- Write mode with toolbar\n- Live preview\n- `Inline code` support"
                helperText="Supports bold, italic, code, links, and lists"
                minRows={8}
              />
            </FullCard>
          </Section>

          {/* ─────────────────────── SPECIAL ─────────────────────── */}
          <Section id="special" title="🔹 Special Inputs" description="Purpose-built inputs for specific data types.">
            <Card title="Phone · OTP">
              <PhoneInput label="Phone number" placeholder="000 000 0000" helperText="Include area code" />
              <PhoneInput label="Error state" placeholder="000 000 0000" errorMessage="Invalid phone number" />
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Verification code (6 digits)</label>
                <OTPInput length={6} value={otpVal} onChange={setOtpVal} helperText="Check your email for the code" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Error OTP state</label>
                <OTPInput length={6} errorMessage="Invalid code. Try again." />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">4-digit PIN</label>
                <OTPInput length={4} type="numeric" helperText="Enter your PIN" />
              </div>
            </Card>

            <Card title="Color Picker · Slider">
              <ColorPicker label="Brand color" value={colorVal} onChange={setColorVal} helperText={`Selected: ${colorVal}`} showPresets />
              <ColorPicker label="Disabled" disabled defaultValue="#60a5fa" />
              <Slider label="Volume" value={sliderVal} onChange={setSliderVal} min={0} max={100} showValue formatValue={(v) => `${v}%`} helperText="Drag to adjust" />
              <Slider label="Error state" defaultValue={25} errorMessage="Value must be above 50" showValue />
              <Slider label="Disabled" defaultValue={60} disabled showValue />
              <RangeSlider label="Price range" value={rangeVal} onChange={setRangeVal} min={0} max={1000} step={10} formatValue={(v) => `$${v}`} helperText="Filter by price" />
            </Card>
          </Section>

          {/* ─────────────────────── PATTERNS ─────────────────────── */}
          <section id="patterns" className="scroll-mt-28 flex flex-col gap-3">
            <div className="flex items-center gap-3 mb-1">
              <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">✦ Pattern Showcase</h2>
              <div className="flex-1 h-px bg-gradient-to-r from-purple-200/60 dark:from-purple-700/30 to-transparent" />
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Real-world UI patterns assembled from Input + Element components — how the product is actually built.</p>
          </section>

          {/* ── Pattern 1: Form ── */}
          <PatternBlock
            id="pattern-form"
            title="Form Pattern"
            badge={<Badge variant="primary" size="sm">Create Flow</Badge>}
            description="Validated form with logical field grouping, inline errors, loading state, and success feedback."
          >
            <div className="max-w-2xl">
              {formSuccess && (
                <div className="mb-4">
                  <Alert variant="success" title="Project created successfully!" dismissible onDismiss={resetForm}>
                    Your project is live. Team members have been notified.
                  </Alert>
                </div>
              )}
              <div className="bg-white/60 dark:bg-white/5 backdrop-blur-xl border border-white/25 dark:border-white/10 shadow-xl shadow-black/8 rounded-3xl overflow-hidden">
                {/* Form header */}
                <div className="px-6 pt-6 pb-4 border-b border-white/20 dark:border-white/10">
                  <h3 className="text-base font-semibold text-gray-800 dark:text-gray-100">Create Project</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Set up your new project workspace</p>
                </div>

                {/* Form body */}
                <div className="p-6 flex flex-col gap-7">

                  {/* Section: Details */}
                  <FieldGroup>
                    <SectionLabel>Project Details</SectionLabel>
                    <TextInput
                      label="Project Name"
                      placeholder="e.g. Brand Identity Refresh"
                      value={formName}
                      onChange={(e) => { setFormName(e.target.value); if (e.target.value) setFormNameError(""); }}
                      errorMessage={formNameError}
                      required
                    />
                    <TextArea
                      label="Description"
                      placeholder="What is this project about? Describe goals and scope."
                      helperText="Optional — gives your team context."
                      autoResize
                    />
                    <RadioGroup
                      label="Priority"
                      options={PRIORITY_OPTIONS_RADIO}
                      value={formPriority}
                      onChange={setFormPriority}
                    />
                  </FieldGroup>

                  {/* Section: Team */}
                  <FieldGroup>
                    <SectionLabel>Team & Timeline</SectionLabel>
                    <MultiSelect
                      label="Team Members"
                      options={TEAM_OPTIONS}
                      placeholder="Add team members…"
                      value={formTeam}
                      onChange={setFormTeam}
                      helperText={formTeam.length > 0 ? `${formTeam.length} member${formTeam.length > 1 ? "s" : ""} added` : "Who is working on this?"}
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <DatePicker
                        label="Due Date"
                        value={formDate}
                        onChange={setFormDate}
                        helperText="When should this be done?"
                      />
                      <NumberInput
                        label="Budget (USD)"
                        defaultValue={10000}
                        min={0}
                        step={500}
                        helperText="Estimated cost"
                      />
                    </div>
                  </FieldGroup>

                  {/* Section: Preferences */}
                  <FieldGroup>
                    <SectionLabel>Preferences</SectionLabel>
                    <Toggle
                      label="Email notifications"
                      description="Notify team when tasks are updated"
                      checked={formNotify}
                      onChange={setFormNotify}
                      size="md"
                    />
                    <Toggle
                      label="Make project public"
                      description="Anyone on the workspace can view this project"
                      checked={formIsPublic}
                      onChange={setFormIsPublic}
                      size="md"
                    />
                  </FieldGroup>
                </div>

                {/* Form footer */}
                <div className="px-6 py-4 border-t border-white/20 dark:border-white/10 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-4 py-2 rounded-xl text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-white/40 dark:hover:bg-white/8 transition-all duration-150"
                  >
                    Reset
                  </button>
                  <button
                    type="button"
                    disabled={formSubmitting}
                    onClick={handleFormSubmit}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white shadow-md shadow-purple-500/20 hover:shadow-purple-500/30 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed active:scale-[0.98]"
                  >
                    {formSubmitting
                      ? <><Spinner size="xs" variant="white" /> Creating…</>
                      : <><Plus className="w-4 h-4" /> Create Project</>
                    }
                  </button>
                </div>
              </div>
            </div>
          </PatternBlock>

          {/* ── Pattern 2: Dashboard ── */}
          <PatternBlock
            id="pattern-dashboard"
            title="Dashboard Pattern"
            badge={<Badge variant="secondary" size="sm">Analytics</Badge>}
            description="High-level metrics overview with stat cards, period filter, and content grid."
          >
            {/* Page header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Analytics Overview</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Your team's performance at a glance</p>
              </div>
              <div className="flex items-center gap-3">
                <SearchInput placeholder="Search…" value={dashSearch} onChange={setDashSearch} />
                <Select
                  options={[
                    { value: "7d",  label: "Last 7 days" },
                    { value: "30d", label: "Last 30 days" },
                    { value: "90d", label: "Last 90 days" },
                    { value: "1y",  label: "Last year" },
                  ]}
                  value={dashPeriod}
                  onChange={setDashPeriod}
                />
              </div>
            </div>

            {/* Stat cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard label="Monthly Revenue"  value="$84,200" trend={{ direction: "up",   value: "+12.4%", label: "vs last month" }} icon={<DollarSign className="w-5 h-5" />} />
              <StatCard label="Active Users"     value="3,847"   trend={{ direction: "up",   value: "+8.1%",  label: "vs last month" }} icon={<Users className="w-5 h-5" />} />
              <StatCard label="Conversion Rate"  value="4.6%"    trend={{ direction: "down", value: "-0.3%",  label: "vs last month" }} icon={<TrendingUp className="w-5 h-5" />} />
              <StatCard label="Avg. Response"    value="1.2s"    trend={{ direction: "flat", value: "±0ms",   label: "vs last month" }} icon={<BarChart3 className="w-5 h-5" />} />
            </div>

            {/* Content grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { label: "Top Project",    name: "Brand Identity Refresh", team: "Design",      progress: 78,  color: "purple" },
                { label: "Most Active",    name: "API v3 Migration",        team: "Engineering", progress: 54,  color: "blue" },
                { label: "Near Deadline",  name: "Mobile App Redesign",     team: "Product",     progress: 91,  color: "amber" },
              ].map((item) => (
                <div key={item.name} className="bg-white/50 dark:bg-white/5 backdrop-blur-xl border border-white/25 dark:border-white/10 rounded-2xl p-4 shadow-glass-sm hover:-translate-y-0.5 hover:shadow-glass-md transition-all duration-200 cursor-default">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-2">{item.label}</p>
                  <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">{item.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">{item.team}</p>
                  <div className="w-full h-1.5 bg-black/8 dark:bg-white/10 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        item.color === "purple" ? "bg-purple-400" :
                        item.color === "blue"   ? "bg-blue-400"   : "bg-amber-400"
                      }`}
                      style={{ width: `${item.progress}%` }}
                    />
                  </div>
                  <p className="text-[11px] text-gray-400 dark:text-gray-500 mt-1.5 text-right">{item.progress}% complete</p>
                </div>
              ))}
            </div>
          </PatternBlock>

          {/* ── Pattern 3: Table ── */}
          <PatternBlock
            id="pattern-table"
            title="Table Pattern"
            badge={<Badge variant="neutral" size="sm">Data List</Badge>}
            description="Sortable, selectable table with live search, status filter, inline actions, and pagination."
          >
            <div className="bg-white/60 dark:bg-white/5 backdrop-blur-xl border border-white/25 dark:border-white/10 shadow-xl shadow-black/8 rounded-3xl overflow-hidden">

              {/* Toolbar */}
              <div className="px-5 py-4 border-b border-white/20 dark:border-white/10 flex flex-col sm:flex-row items-start sm:items-center gap-3">
                <div className="flex-1 min-w-0">
                  <SearchInput
                    placeholder="Search projects, owners, teams…"
                    value={tableSearch}
                    onChange={(v) => { setTableSearch(v); setTablePage(1); setTableSelected([]); }}
                  />
                </div>
                <Select
                  options={STATUS_FILTER_OPTIONS}
                  value={tableStatus}
                  onChange={(v) => { setTableStatus(v); setTablePage(1); setTableSelected([]); }}
                />
                {tableSelected.length > 0 && (
                  <div className="flex items-center gap-2 pl-1">
                    <span className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">{tableSelected.length} selected</span>
                    <button
                      type="button"
                      onClick={() => setTableSelected([])}
                      className="px-3 py-1.5 rounded-lg text-xs font-medium text-red-600 dark:text-red-400 hover:bg-red-50/60 dark:hover:bg-red-900/20 transition-all duration-150"
                    >
                      Clear
                    </button>
                  </div>
                )}
              </div>

              {/* Empty state */}
              {sortedProjects.length === 0 ? (
                <div className="py-20 flex flex-col items-center gap-3 text-center px-6">
                  <div className="w-12 h-12 rounded-2xl bg-gray-100/60 dark:bg-white/8 flex items-center justify-center">
                    <FolderOpen className="w-6 h-6 text-gray-400 dark:text-gray-500" />
                  </div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">No projects found</p>
                  <p className="text-xs text-gray-400 dark:text-gray-500">Try adjusting your search or status filter</p>
                  <button
                    type="button"
                    onClick={() => { setTableSearch(""); setTableStatus("all"); }}
                    className="mt-1 px-4 py-2 rounded-xl text-xs font-medium text-purple-600 dark:text-purple-400 hover:bg-purple-50/60 dark:hover:bg-purple-900/20 transition-all duration-150"
                  >
                    Clear filters
                  </button>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-white/15 dark:border-white/10">
                        <th className="w-12 px-5 py-3">
                          <input
                            type="checkbox"
                            className="w-4 h-4 rounded accent-purple-500"
                            checked={sortedProjects.length > 0 && tableSelected.length === sortedProjects.length}
                            onChange={(e) => setTableSelected(e.target.checked ? sortedProjects.map((p) => p.id) : [])}
                          />
                        </th>
                        {(["name", "status", "team", "owner", "due"] as SortCol[]).map((col) => (
                          <th
                            key={col}
                            onClick={() => toggleSort(col)}
                            className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 cursor-pointer hover:text-gray-700 dark:hover:text-gray-300 transition-colors duration-150 select-none whitespace-nowrap"
                          >
                            <span className="flex items-center gap-1">
                              {col === "due" ? "Due Date" : col.charAt(0).toUpperCase() + col.slice(1)}
                              {tableSortCol === col
                                ? tableSortDir === "asc"
                                  ? <ChevronUp className="w-3 h-3" />
                                  : <ChevronDown className="w-3 h-3" />
                                : <ChevronsUpDown className="w-3 h-3 opacity-30" />
                              }
                            </span>
                          </th>
                        ))}
                        <th className="px-4 py-3 text-right text-[11px] font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sortedProjects.map((project, idx) => {
                        const isSelected = tableSelected.includes(project.id);
                        const isLast = idx === sortedProjects.length - 1;
                        const statusBadge: Record<string, "success" | "warning" | "neutral" | "secondary"> = {
                          active: "success", review: "warning", paused: "neutral", done: "secondary",
                        };
                        const statusLabel: Record<string, string> = {
                          active: "Active", review: "In Review", paused: "Paused", done: "Done",
                        };
                        return (
                          <tr
                            key={project.id}
                            onClick={() => toggleRow(project.id)}
                            className={`${!isLast ? "border-b border-white/10 dark:border-white/5" : ""} transition-colors duration-100 cursor-pointer ${
                              isSelected
                                ? "bg-purple-50/40 dark:bg-purple-900/10"
                                : "hover:bg-white/40 dark:hover:bg-white/[0.04]"
                            }`}
                          >
                            <td className="px-5 py-3.5" onClick={(e) => e.stopPropagation()}>
                              <input
                                type="checkbox"
                                className="w-4 h-4 rounded accent-purple-500"
                                checked={isSelected}
                                onChange={() => toggleRow(project.id)}
                              />
                            </td>
                            <td className="px-4 py-3.5">
                              <span className="text-sm font-medium text-gray-800 dark:text-gray-200">{project.name}</span>
                            </td>
                            <td className="px-4 py-3.5">
                              <Badge variant={statusBadge[project.status]} size="sm" dot>{statusLabel[project.status]}</Badge>
                            </td>
                            <td className="px-4 py-3.5">
                              <span className="text-sm text-gray-600 dark:text-gray-400">{project.team}</span>
                            </td>
                            <td className="px-4 py-3.5">
                              <div className="flex items-center gap-2">
                                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-400 to-blue-400 flex items-center justify-center text-[9px] font-bold text-white flex-shrink-0">
                                  {project.ownerInitials}
                                </div>
                                <span className="text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">{project.owner}</span>
                              </div>
                            </td>
                            <td className="px-4 py-3.5">
                              <div className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">
                                <Clock className="w-3.5 h-3.5 flex-shrink-0" />
                                {project.due}
                              </div>
                            </td>
                            <td className="px-4 py-3.5" onClick={(e) => e.stopPropagation()}>
                              <div className="flex items-center justify-end gap-1">
                                <button
                                  type="button"
                                  onClick={() => { setModalTarget(project); setEditName(project.name); setActiveModal("edit"); }}
                                  className="p-1.5 rounded-lg text-gray-400 hover:text-blue-500 hover:bg-blue-50/60 dark:hover:bg-blue-900/20 transition-all duration-150"
                                  title="Edit"
                                >
                                  <Edit2 className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => { setModalTarget(project); setActiveModal("delete"); }}
                                  className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50/60 dark:hover:bg-red-900/20 transition-all duration-150"
                                  title="Delete"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Pagination row */}
              {sortedProjects.length > 0 && (
                <div className="px-5 py-4 border-t border-white/15 dark:border-white/10 flex items-center justify-between">
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {filteredProjects.length} project{filteredProjects.length !== 1 ? "s" : ""}
                    {tableSelected.length > 0 && ` · ${tableSelected.length} selected`}
                  </span>
                  <Pagination totalPages={4} page={tablePage} onPageChange={setTablePage} variant="compact" />
                </div>
              )}
            </div>
          </PatternBlock>

          {/* ── Pattern 4: Modal ── */}
          <PatternBlock
            id="pattern-modal"
            title="Modal Pattern"
            badge={<Badge variant="warning" size="sm">Dialogs</Badge>}
            description="Focused overlays for destructive confirmations, form edits, and status messages."
          >
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => { setModalTarget(MOCK_PROJECTS[0]); setActiveModal("delete"); }}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium bg-red-50/60 dark:bg-red-900/20 text-red-600 dark:text-red-400 border border-red-200/50 dark:border-red-700/30 hover:bg-red-100/60 dark:hover:bg-red-900/30 transition-all duration-150 active:scale-[0.98]"
              >
                <Trash2 className="w-4 h-4" /> Delete Confirmation
              </button>
              <button
                type="button"
                onClick={() => { setModalTarget(MOCK_PROJECTS[1]); setEditName(MOCK_PROJECTS[1].name); setActiveModal("edit"); }}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium bg-white/50 dark:bg-white/8 text-gray-700 dark:text-gray-300 border border-white/30 dark:border-white/15 hover:bg-white/70 dark:hover:bg-white/12 transition-all duration-150 active:scale-[0.98]"
              >
                <Edit2 className="w-4 h-4" /> Edit Form Modal
              </button>
              <button
                type="button"
                onClick={() => setActiveModal("info")}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium bg-purple-50/60 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 border border-purple-200/50 dark:border-purple-700/30 hover:bg-purple-100/60 dark:hover:bg-purple-900/30 transition-all duration-150 active:scale-[0.98]"
              >
                <CheckCircle2 className="w-4 h-4" /> Success State
              </button>
            </div>

            {/* Pattern guide */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {[
                { title: "Confirm Dialog",   rule: "Short task, destructive CTA, always offer cancel",       color: "red" },
                { title: "Form Dialog",      rule: "Focused edit flow, header + body + footer pattern",      color: "blue" },
                { title: "Status Dialog",    rule: "Success/error state, single CTA, centered layout",       color: "purple" },
              ].map((g) => (
                <div key={g.title} className="bg-white/40 dark:bg-white/5 border border-white/25 dark:border-white/10 rounded-2xl p-4">
                  <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">{g.title}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{g.rule}</p>
                </div>
              ))}
            </div>
          </PatternBlock>

          {/* ─────────────────────── FOOTER ─────────────────────── */}
          <footer className="text-center py-12 border-t border-white/20 dark:border-white/10">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/40 dark:bg-white/5 border border-white/30 dark:border-white/10 shadow-sm">
              <Sparkles className="w-4 h-4 text-purple-500" />
              <span className="text-sm text-gray-600 dark:text-gray-400">
                <span className="font-semibold text-gray-800 dark:text-gray-200">Liquid Glass UI</span>
                {" "}· 29 components · TypeScript · Tailwind · React Hook Form ready
              </span>
            </div>
          </footer>

        </main>
      </div>

      {/* ── Modal: Delete Confirmation ─────────────────────────────────────── */}
      {activeModal === "delete" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/25 dark:bg-black/50 backdrop-blur-sm animate-fade-in"
            onClick={() => setActiveModal(null)}
          />
          <div className="relative w-full max-w-md bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-white/30 dark:border-white/10 rounded-3xl shadow-glass-xl animate-fade-in">
            <div className="p-6 flex flex-col gap-5">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-2xl bg-red-100/70 dark:bg-red-900/30 flex items-center justify-center flex-shrink-0">
                  <Trash2 className="w-5 h-5 text-red-500 dark:text-red-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-semibold text-gray-900 dark:text-white">Delete Project</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    Are you sure you want to delete{" "}
                    <span className="font-semibold text-gray-700 dark:text-gray-300">"{modalTarget.name}"</span>?
                    This action cannot be undone.
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-end gap-3 pt-1 border-t border-white/20 dark:border-white/10">
                <button
                  type="button"
                  onClick={() => setActiveModal(null)}
                  className="px-4 py-2 rounded-xl text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-100/60 dark:hover:bg-white/8 transition-all duration-150"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => setActiveModal(null)}
                  className="px-4 py-2 rounded-xl text-sm font-semibold bg-red-500 hover:bg-red-600 text-white shadow-md shadow-red-500/20 hover:shadow-red-500/30 transition-all duration-150 active:scale-[0.98]"
                >
                  Delete Project
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Modal: Edit Form ───────────────────────────────────────────────── */}
      {activeModal === "edit" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/25 dark:bg-black/50 backdrop-blur-sm animate-fade-in"
            onClick={() => setActiveModal(null)}
          />
          <div className="relative w-full max-w-md bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-white/30 dark:border-white/10 rounded-3xl shadow-glass-xl animate-fade-in">
            {/* Header */}
            <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-white/20 dark:border-white/10">
              <div>
                <h3 className="text-base font-semibold text-gray-900 dark:text-white">Edit Project</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Update project details</p>
              </div>
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="p-2 rounded-xl text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100/60 dark:hover:bg-white/8 transition-all duration-150"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            {/* Body */}
            <div className="p-6 flex flex-col gap-4">
              <TextInput
                label="Project Name"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                required
              />
              <Select
                label="Status"
                options={[
                  { value: "active", label: "Active" },
                  { value: "review", label: "In Review" },
                  { value: "paused", label: "Paused" },
                  { value: "done",   label: "Done" },
                ]}
                defaultValue={modalTarget.status}
              />
              <TextArea
                label="Notes"
                placeholder="Any updates for the team?"
                autoResize
              />
            </div>
            {/* Footer */}
            <div className="px-6 pb-5 pt-4 flex items-center justify-end gap-3 border-t border-white/20 dark:border-white/10">
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="px-4 py-2 rounded-xl text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-100/60 dark:hover:bg-white/8 transition-all duration-150"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-semibold bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white shadow-md shadow-purple-500/20 hover:shadow-purple-500/30 transition-all duration-200 active:scale-[0.98]"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Modal: Success / Info ──────────────────────────────────────────── */}
      {activeModal === "info" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/25 dark:bg-black/50 backdrop-blur-sm animate-fade-in"
            onClick={() => setActiveModal(null)}
          />
          <div className="relative w-full max-w-sm bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-white/30 dark:border-white/10 rounded-3xl shadow-glass-xl animate-fade-in">
            <div className="p-7 flex flex-col items-center gap-4 text-center">
              <div className="w-14 h-14 rounded-full bg-emerald-100/70 dark:bg-emerald-900/30 flex items-center justify-center">
                <CheckCircle2 className="w-7 h-7 text-emerald-500 dark:text-emerald-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1.5">Project Published!</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                  Your project is now live and visible to all team members in the workspace.
                </p>
              </div>
              <div className="w-full pt-2 border-t border-white/20 dark:border-white/10">
                <button
                  type="button"
                  onClick={() => setActiveModal(null)}
                  className="w-full py-2.5 rounded-xl text-sm font-semibold bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white shadow-md shadow-purple-500/20 hover:shadow-purple-500/30 transition-all duration-200 active:scale-[0.98]"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
