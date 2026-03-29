"use client";

import React, { useState } from "react";
import {
  LayoutDashboard, Users, Settings, Bell, Star, Zap, Shield,
  Trash2, Edit, MoreHorizontal, Download, Plus, ChevronRight,
  Sun, Moon, ArrowLeft, DollarSign, Activity,
  FileText, Lock, TrendingUp, Database, Globe,
} from "lucide-react";

import {
  BaseSurface,
  Card, CardHeader, CardTitle, CardDescription, CardAction, CardContent, CardFooter,
  Badge, Tag, StatusBadge, DotBadge,
  Alert,
  Spinner,
  Skeleton,
  Tabs, TabPanel,
  Panel, SectionHeader, SectionTitle, SectionSubtitle, SectionTitleGroup, SectionAction, SectionContent, Divider, Spacer,
  List, ListItem, ListItemCard,
  StatCard, MetricCard, InfoBox, KeyValueDisplay,
  Avatar, AvatarGroup,
  EmptyState,
  ToastProvider, useToast,
  Breadcrumb, BreadcrumbItem,
  Pagination,
  Stepper,
  Tooltip,
  Popover, PopoverContent, PopoverItem, PopoverDivider,
  Banner,
  LoadingOverlay,
  InlineMessage,
} from "@/components/element";

// ─── Nav ──────────────────────────────────────────────────────────────────────

const NAV = [
  { id: "surface",    label: "Surface" },
  { id: "cards",      label: "Cards" },
  { id: "badges",     label: "Badges" },
  { id: "feedback",   label: "Feedback" },
  { id: "loading",    label: "Loading" },
  { id: "navigation", label: "Navigation" },
  { id: "data",       label: "Data" },
  { id: "lists",      label: "Lists" },
  { id: "media",      label: "Media" },
  { id: "utility",    label: "Utility" },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function Section({ id, title, description, children }: {
  id: string; title: string; description?: string; children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-28 flex flex-col gap-6">
      <div>
        <div className="flex items-center gap-3 mb-1">
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">{title}</h2>
          <div className="flex-1 h-px bg-gradient-to-r from-purple-200/60 dark:from-purple-700/30 to-transparent" />
        </div>
        {description && <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>}
      </div>
      {children}
    </section>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-[11px] font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500">{label}</p>
      <div className="flex flex-wrap items-center gap-3">{children}</div>
    </div>
  );
}

function Btn({ children, onClick, variant = "ghost", disabled }: {
  children: React.ReactNode; onClick?: () => void;
  variant?: "ghost" | "solid" | "danger"; disabled?: boolean;
}) {
  const base = "px-3 py-1.5 rounded-xl text-sm font-medium transition-all duration-150 border";
  const styles = {
    ghost:  "bg-white/50 dark:bg-white/8 border-white/25 dark:border-white/10 text-gray-700 dark:text-gray-300 hover:bg-white/70 dark:hover:bg-white/12",
    solid:  "bg-purple-100/70 dark:bg-purple-900/30 border-purple-200/60 dark:border-purple-700/40 text-purple-700 dark:text-purple-300 hover:bg-purple-200/70 dark:hover:bg-purple-800/40",
    danger: "bg-red-100/60 dark:bg-red-900/20 border-red-200/50 dark:border-red-700/30 text-red-600 dark:text-red-300 hover:bg-red-200/70",
  };
  return (
    <button type="button" onClick={onClick} disabled={disabled}
      className={`${base} ${styles[variant]} disabled:opacity-40 disabled:pointer-events-none`}>
      {children}
    </button>
  );
}

// ─── Toast Demo ───────────────────────────────────────────────────────────────

function ToastDemo() {
  const toast = useToast();
  return (
    <Row label="Click to fire">
      {(["success","info","warning","error"] as const).map((v) => (
        <Btn key={v} onClick={() => toast.show({
          variant: v,
          title: `${v.charAt(0).toUpperCase() + v.slice(1)}`,
          description: `This is a ${v} toast. Hover to pause the timer.`,
          action: v === "error" ? { label: "Retry", onClick: () => {} } : undefined,
        })}>
          {v}
        </Btn>
      ))}
      <Btn onClick={() => toast.show({ variant: "success", title: "Saved!", description: "Your changes were saved.", duration: 8000 })}>
        Long (8s)
      </Btn>
    </Row>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

function ElementShowcaseInner() {
  const [darkMode, setDarkMode]     = useState(false);
  const [activeSection, setSection] = useState("surface");
  const [tabMain, setTabMain]       = useState("overview");
  const [tabPills, setTabPills]     = useState("all");
  const [tabUnder, setTabUnder]     = useState("monthly");
  const [stepperStep, setStepper]   = useState(1);
  const [page, setPage]             = useState(3);
  const [overlayOn, setOverlay]     = useState(false);

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="min-h-screen bg-gradient-to-br from-slate-100 via-purple-50/30 to-blue-50/50 dark:from-slate-950 dark:via-purple-950/20 dark:to-slate-900 transition-colors duration-300">

        {/* Page banner */}
        <Banner variant="announcement" dismissible>
          💎 Element System v2 — Portal overlays · BaseSurface primitives · 21 components
        </Banner>

        {/* Header */}
        <header className="sticky top-0 z-50 bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl border-b border-white/20 dark:border-white/10 shadow-sm">
          <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <a href="/" className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                <ArrowLeft className="w-4 h-4" />Home
              </a>
              <span className="text-gray-300 dark:text-gray-700">/</span>
              <a href="/common/component" className="text-sm text-gray-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">Input System</a>
              <span className="text-gray-300 dark:text-gray-700">/</span>
              <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">Element System</span>
            </div>
            <button type="button" onClick={() => setDarkMode(v => !v)} aria-label="Toggle dark mode"
              className="w-9 h-9 rounded-xl bg-white/60 dark:bg-white/8 border border-white/25 dark:border-white/10 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-all">
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>
        </header>

        {/* Section nav */}
        <nav className="sticky top-16 z-40 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md border-b border-white/15 dark:border-white/8">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex gap-0.5 overflow-x-auto scrollbar-hide py-2">
              {NAV.map(item => (
                <a key={item.id} href={`#${item.id}`} onClick={() => setSection(item.id)}
                  className={`flex-shrink-0 px-3.5 py-1.5 rounded-xl text-sm font-medium transition-all duration-150 ${
                    activeSection === item.id
                      ? "bg-purple-100/70 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300"
                      : "text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-white/50 dark:hover:bg-white/8"
                  }`}>{item.label}</a>
              ))}
            </div>
          </div>
        </nav>

        {/* Main content */}
        <main className="max-w-7xl mx-auto px-6 py-12 flex flex-col gap-20">

          {/* breadcrumb */}
          <Breadcrumb>
            <BreadcrumbItem href="/">Home</BreadcrumbItem>
            <BreadcrumbItem href="/common">Common</BreadcrumbItem>
            <BreadcrumbItem current>Element System</BreadcrumbItem>
          </Breadcrumb>

          {/* ───────── SURFACE SYSTEM ──────────────────────────────────────── */}
          <Section id="surface" title="Base Surface System"
            description="Foundation primitive — all components extend BaseSurface. Demonstrates the 6 surface variants and all interaction modes.">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {(["default","elevated","flat","glass"] as const).map(v => (
                <BaseSurface key={v} variant={v} padding="default" hoverable className="min-h-[80px] flex items-center justify-center">
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400">{v}</span>
                </BaseSurface>
              ))}
              <BaseSurface variant="default" padding="default" interactive className="min-h-[80px] flex items-center justify-center">
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">interactive (ring on hover)</span>
              </BaseSurface>
              <BaseSurface variant="elevated" padding="default" clickable onClick={() => {}} className="min-h-[80px] flex items-center justify-center">
                <span className="text-sm font-medium text-purple-600 dark:text-purple-400">clickable (press me)</span>
              </BaseSurface>
            </div>
            <Card variant="flat">
              <CardContent>
                <Row label="Disabled state">
                  <BaseSurface variant="default" padding="compact" disabled className="rounded-xl">
                    <span className="text-sm text-gray-500">Disabled surface — opacity 50%, no pointer events</span>
                  </BaseSurface>
                </Row>
              </CardContent>
            </Card>
          </Section>

          {/* ───────── CARDS ───────────────────────────────────────────────── */}
          <Section id="cards" title="Card System"
            description="6 variants from flat to glass. All support subcomponents: Header, Title, Description, Action, Content, Footer.">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

              <Card variant="default">
                <CardHeader>
                  <div><CardTitle>Default</CardTitle><CardDescription>Glass, blur, soft shadow</CardDescription></div>
                  <CardAction><Badge variant="primary">New</Badge></CardAction>
                </CardHeader>
                <CardContent><p className="text-sm text-gray-500 dark:text-gray-400">Standard container. Backdrop blur + semi-transparent surface.</p></CardContent>
                <CardFooter divider>
                  <button className="text-sm text-purple-600 dark:text-purple-400 font-medium">Learn more →</button>
                </CardFooter>
              </Card>

              <Card variant="elevated">
                <CardHeader><div><CardTitle>Elevated</CardTitle><CardDescription>Stronger shadow depth</CardDescription></div></CardHeader>
                <CardContent><p className="text-sm text-gray-500 dark:text-gray-400">Floats visually — for featured content or hero widgets.</p></CardContent>
              </Card>

              <Card variant="glass">
                <CardHeader><div><CardTitle>Glass</CardTitle><CardDescription>Maximum transparency</CardDescription></div></CardHeader>
                <CardContent><p className="text-sm text-gray-500 dark:text-gray-400">Highest glass level — great over gradients or images.</p></CardContent>
              </Card>

              <Card variant="clickable" onClick={() => {}}>
                <CardHeader>
                  <div><CardTitle>Clickable</CardTitle><CardDescription>Full-card interaction</CardDescription></div>
                  <CardAction><ChevronRight className="w-4 h-4 text-gray-400" /></CardAction>
                </CardHeader>
                <CardContent><p className="text-sm text-gray-500 dark:text-gray-400">Lifts on hover, scales on press, full keyboard focus ring.</p></CardContent>
              </Card>

              <Card variant="interactive">
                <CardHeader><div><CardTitle>Interactive</CardTitle><CardDescription>Hover ring only</CardDescription></div></CardHeader>
                <CardContent><p className="text-sm text-gray-500 dark:text-gray-400">Purple ring on hover. Good for selectable grid items.</p></CardContent>
              </Card>

              <Card variant="flat" padding="compact">
                <CardHeader><div><CardTitle>Flat</CardTitle><CardDescription>Border only, no shadow</CardDescription></div></CardHeader>
                <CardContent><p className="text-sm text-gray-500 dark:text-gray-400">For dense areas or inside panels where depth is heavy.</p></CardContent>
              </Card>
            </div>

            {/* Padding variants */}
            <Card variant="default">
              <CardContent>
                <Row label="Padding Variants — none / compact / default / spacious">
                  {(["none","compact","default","spacious"] as const).map(p => (
                    <Card key={p} variant="flat" padding={p}>
                      <span className="text-xs font-mono text-gray-500 dark:text-gray-400">{p}</span>
                    </Card>
                  ))}
                </Row>
              </CardContent>
            </Card>
          </Section>

          {/* ───────── BADGES ──────────────────────────────────────────────── */}
          <Section id="badges" title="Badge & Tag System"
            description="Badge variants/sizes, removable Tags, animated StatusBadge, and notification DotBadge.">
            <Card variant="default">
              <CardContent>
                <div className="flex flex-col gap-5">
                  <Row label="Badge Variants">
                    {(["primary","secondary","success","warning","error","neutral"] as const).map(v => (
                      <Badge key={v} variant={v} dot>{v}</Badge>
                    ))}
                  </Row>
                  <Divider variant="gradient" spacing="sm" />
                  <Row label="Badge Sizes — sm / md / lg">
                    <Badge variant="primary" size="sm">Small</Badge>
                    <Badge variant="primary" size="md">Medium</Badge>
                    <Badge variant="primary" size="lg">Large</Badge>
                    <Badge variant="success" size="md" dot>With dot</Badge>
                  </Row>
                  <Divider variant="gradient" spacing="sm" />
                  <Row label="Tags — Removable">
                    {(["primary","secondary","success","warning","error","neutral"] as const).map(v => (
                      <Tag key={v} variant={v} onRemove={() => {}}>{v}</Tag>
                    ))}
                  </Row>
                  <Divider variant="gradient" spacing="sm" />
                  <Row label="Status Badge">
                    {(["online","away","busy","offline"] as const).map(s => (
                      <StatusBadge key={s} status={s} showLabel />
                    ))}
                  </Row>
                  <Divider variant="gradient" spacing="sm" />
                  <Row label="Dot Badge — notification counter">
                    <DotBadge count={3}>
                      <div className="w-10 h-10 rounded-xl bg-purple-100/60 dark:bg-purple-900/20 flex items-center justify-center">
                        <Bell className="w-5 h-5 text-purple-500" />
                      </div>
                    </DotBadge>
                    <DotBadge count={128} max={99} variant="primary">
                      <div className="w-10 h-10 rounded-xl bg-blue-100/60 dark:bg-blue-900/20 flex items-center justify-center">
                        <Star className="w-5 h-5 text-blue-500" />
                      </div>
                    </DotBadge>
                    <DotBadge dot variant="success">
                      <div className="w-10 h-10 rounded-xl bg-emerald-100/60 dark:bg-emerald-900/20 flex items-center justify-center">
                        <Shield className="w-5 h-5 text-emerald-500" />
                      </div>
                    </DotBadge>
                    <DotBadge dot variant="error">
                      <div className="w-10 h-10 rounded-xl bg-red-100/60 dark:bg-red-900/20 flex items-center justify-center">
                        <Lock className="w-5 h-5 text-red-500" />
                      </div>
                    </DotBadge>
                  </Row>
                </div>
              </CardContent>
            </Card>
          </Section>

          {/* ───────── FEEDBACK ────────────────────────────────────────────── */}
          <Section id="feedback" title="Feedback System"
            description="Alert (dismissible + action), Banner (page-level), InfoBox, InlineMessage, and portal-based Toast.">

            {/* Alert variants + states */}
            <Card variant="default" padding="default">
              <CardHeader><CardTitle>Alert</CardTitle><CardDescription>5 variants · dismissible · action</CardDescription></CardHeader>
              <CardContent>
                <div className="flex flex-col gap-3">
                  <Alert variant="info" title="Account updated" dismissible>Your profile has been updated successfully.</Alert>
                  <Alert variant="success" title="Payment confirmed" action={{ label: "View receipt", onClick: () => {} }} dismissible>Transaction #TX-2025-001 has been processed.</Alert>
                  <Alert variant="warning" title="Storage 92% full" dismissible>Consider upgrading your plan to avoid disruption.</Alert>
                  <Alert variant="error" title="Upload failed" action={{ label: "Try again", onClick: () => {} }} dismissible>The file exceeds the 50 MB limit.</Alert>
                  <Alert variant="neutral" dismissible>Maintenance tonight at 10 PM UTC — expected downtime 30 min.</Alert>
                </div>
              </CardContent>
            </Card>

            {/* Toast */}
            <Card variant="default" padding="default">
              <CardHeader><CardTitle>Toast (portal-rendered)</CardTitle><CardDescription>Renders to document.body · stacking · progress bar · hover pauses</CardDescription></CardHeader>
              <CardContent><ToastDemo /></CardContent>
            </Card>

            {/* InfoBox */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InfoBox variant="info" title="Did you know?" dismissible>Press <kbd className="px-1 py-0.5 rounded text-xs font-mono bg-white/60 dark:bg-white/10">⌘K</kbd> to open the command palette anywhere.</InfoBox>
              <InfoBox variant="tip" title="Pro tip">Enable two-factor authentication for extra security.</InfoBox>
              <InfoBox variant="warning" title="Unsaved changes" dismissible>Changes will be lost if you navigate away.</InfoBox>
              <InfoBox variant="error" title="Sync failed">Failed to sync. Check your connection and try again.</InfoBox>
            </div>

            {/* InlineMessage — all variants + sizes */}
            <Card variant="default" padding="default">
              <CardHeader><CardTitle>InlineMessage</CardTitle><CardDescription>Compact inline feedback — for form fields, table cells, labels</CardDescription></CardHeader>
              <CardContent>
                <div className="flex flex-col gap-4">
                  <Row label="Variants">
                    <InlineMessage variant="info">Available for upgrade</InlineMessage>
                    <InlineMessage variant="success">Email verified</InlineMessage>
                    <InlineMessage variant="warning">Expiring in 3 days</InlineMessage>
                    <InlineMessage variant="error">Invalid format</InlineMessage>
                  </Row>
                  <Row label="Sizes — sm / md">
                    <InlineMessage variant="error" size="sm">Required field</InlineMessage>
                    <InlineMessage variant="success" size="md">Looks good!</InlineMessage>
                    <InlineMessage variant="warning" size="sm">Check value</InlineMessage>
                  </Row>
                  <Row label="In context (under a form field)">
                    <div className="flex flex-col gap-1">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Email address</label>
                      <input readOnly value="alice@" className="px-3 py-2 rounded-xl bg-white/60 dark:bg-white/8 border border-red-200/60 dark:border-red-700/40 text-sm text-gray-800 dark:text-gray-200 w-64 outline-none ring-2 ring-red-300/40" />
                      <InlineMessage variant="error" size="sm">Please enter a valid email address</InlineMessage>
                    </div>
                  </Row>
                </div>
              </CardContent>
            </Card>

            {/* Banner */}
            <Card variant="default" padding="default">
              <CardHeader><CardTitle>Banner</CardTitle><CardDescription>Page-level persistent notice — 4 variants · dismissible · CTA</CardDescription></CardHeader>
              <CardContent>
                <div className="flex flex-col gap-2 rounded-2xl overflow-hidden">
                  {(["info","warning","error","announcement"] as const).map(v => (
                    <Banner key={v} variant={v} action={{ label: "Learn more", onClick: () => {} }}>
                      This is a <strong>{v}</strong> banner — for page-level notifications and announcements.
                    </Banner>
                  ))}
                </div>
              </CardContent>
            </Card>
          </Section>

          {/* ───────── LOADING ─────────────────────────────────────────────── */}
          <Section id="loading" title="Loading & Empty States"
            description="Spinner sizes/variants, Skeleton presets, 4 EmptyState variants, and the LoadingOverlay.">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* Spinners */}
              <Card variant="default">
                <CardHeader><CardTitle>Spinner</CardTitle><CardDescription>5 sizes · 3 variants</CardDescription></CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-4">
                    <Row label="Sizes — xs / sm / md / lg / xl">
                      {(["xs","sm","md","lg","xl"] as const).map(s => <Spinner key={s} size={s} />)}
                    </Row>
                    <Row label="Variants — default / colored / white (on dark bg)">
                      <Spinner size="md" />
                      <Spinner size="md" variant="colored" />
                      <span className="inline-flex p-2 rounded-xl bg-gray-800">
                        <Spinner size="md" variant="white" />
                      </span>
                    </Row>
                    <Row label="With label">
                      <Spinner size="sm" label="Loading data…" />
                    </Row>
                  </div>
                </CardContent>
              </Card>

              {/* Skeletons */}
              <Card variant="default">
                <CardHeader><CardTitle>Skeleton</CardTitle><CardDescription>Text, Avatar, Card, ListItem, StatCard presets</CardDescription></CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-4">
                    <Row label="Text — 3 lines"><Skeleton.Text lines={3} /></Row>
                    <Row label="Avatar sizes">
                      {(["sm","md","lg"] as const).map(s => <Skeleton.Avatar key={s} size={s} />)}
                    </Row>
                    <Row label="List Item"><Skeleton.ListItem /></Row>
                  </div>
                </CardContent>
              </Card>

              <Card variant="default">
                <CardHeader><CardTitle>Skeleton Card preset</CardTitle></CardHeader>
                <CardContent><Skeleton.Card /></CardContent>
              </Card>

              {/* Loading overlay */}
              <Card variant="default" padding="none">
                <div className="relative p-6">
                  <CardHeader><CardTitle>Loading Overlay</CardTitle><CardDescription>Covers parent — renders in-place (not portal)</CardDescription></CardHeader>
                  <CardContent><Skeleton.Text lines={2} /></CardContent>
                  <LoadingOverlay visible={overlayOn} message="Processing…" blur="md" />
                </div>
                <CardFooter divider>
                  <Btn variant="solid" onClick={() => { setOverlay(true); setTimeout(() => setOverlay(false), 2500); }}>
                    Show overlay (2.5s)
                  </Btn>
                </CardFooter>
              </Card>
            </div>

            {/* Empty states */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {(["default","search","error","permissions"] as const).map(v => (
                <Card key={v} variant="flat">
                  <EmptyState variant={v} action={{ label: v === "error" ? "Retry" : "Get started", onClick: () => {} }} />
                </Card>
              ))}
            </div>
          </Section>

          {/* ───────── NAVIGATION ──────────────────────────────────────────── */}
          <Section id="navigation" title="Navigation Components"
            description="Tabs (4 variants + keyboard nav), Breadcrumb, Pagination (3 variants), and interactive Stepper.">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

              {/* Tabs — default */}
              <Card variant="default">
                <CardHeader><CardTitle>Tabs — Default</CardTitle><CardDescription>Icons, badges, disabled state, keyboard navigation</CardDescription></CardHeader>
                <CardContent>
                  <Tabs value={tabMain} onChange={setTabMain} tabs={[
                    { value: "overview",  label: "Overview",  icon: <LayoutDashboard className="w-4 h-4" /> },
                    { value: "analytics", label: "Analytics", badge: <Badge variant="primary" size="sm">3</Badge> },
                    { value: "settings",  label: "Settings",  icon: <Settings className="w-4 h-4" /> },
                    { value: "disabled",  label: "Disabled",  disabled: true },
                  ]} />
                  <Spacer size="4" />
                  <TabPanel value="overview"  activeValue={tabMain}><p className="text-sm text-gray-500 dark:text-gray-400">Overview panel — your key metrics at a glance.</p></TabPanel>
                  <TabPanel value="analytics" activeValue={tabMain}><p className="text-sm text-gray-500 dark:text-gray-400">Analytics panel — detailed charts and breakdowns.</p></TabPanel>
                  <TabPanel value="settings"  activeValue={tabMain}><p className="text-sm text-gray-500 dark:text-gray-400">Settings panel — configure your preferences.</p></TabPanel>
                </CardContent>
              </Card>

              {/* Tabs — other variants */}
              <Card variant="default">
                <CardHeader><CardTitle>Tabs — Pills &amp; Underline &amp; Glass</CardTitle></CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-5">
                    <div>
                      <p className="text-xs text-gray-400 dark:text-gray-500 mb-2 font-semibold uppercase tracking-wider">Pills</p>
                      <Tabs value={tabPills} onChange={setTabPills} variant="pills"
                        tabs={[{ value: "all", label: "All" }, { value: "active", label: "Active" }, { value: "archived", label: "Archived" }]} />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 dark:text-gray-500 mb-2 font-semibold uppercase tracking-wider">Underline</p>
                      <Tabs value={tabUnder} onChange={setTabUnder} variant="underline"
                        tabs={[{ value: "monthly", label: "Monthly" }, { value: "quarterly", label: "Quarterly" }, { value: "yearly", label: "Yearly" }]} />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 dark:text-gray-500 mb-2 font-semibold uppercase tracking-wider">Glass</p>
                      <Tabs defaultValue="a" variant="glass"
                        tabs={[{ value: "a", label: "Overview" }, { value: "b", label: "Details" }, { value: "c", label: "History" }]} />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Stepper */}
              <Card variant="default">
                <CardHeader><CardTitle>Stepper</CardTitle><CardDescription>Horizontal · click completed steps · keyboard</CardDescription></CardHeader>
                <CardContent>
                  <Stepper steps={["Account", "Plan", "Payment", "Confirm"]} currentStep={stepperStep} onStepClick={setStepper} />
                  <div className="flex gap-2 mt-6">
                    <Btn disabled={stepperStep <= 0} onClick={() => setStepper(s => s - 1)}>Back</Btn>
                    <Btn variant="solid" disabled={stepperStep >= 3} onClick={() => setStepper(s => s + 1)}>Next</Btn>
                  </div>
                  <Spacer size="6" />
                  <p className="text-xs text-gray-400 dark:text-gray-500 mb-3 font-semibold uppercase tracking-wider">Vertical variant</p>
                  <Stepper steps={["Create account", "Verify email", "Setup workspace"]} currentStep={1} variant="vertical" />
                </CardContent>
              </Card>

              {/* Pagination */}
              <Card variant="default">
                <CardHeader><CardTitle>Pagination</CardTitle><CardDescription>3 variants · first/last · shared page state</CardDescription></CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-5">
                    <div>
                      <p className="text-xs text-gray-400 dark:text-gray-500 mb-2 font-semibold uppercase tracking-wider">Default (page {page} / 12)</p>
                      <Pagination page={page} totalPages={12} onPageChange={setPage} showFirstLast />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 dark:text-gray-500 mb-2 font-semibold uppercase tracking-wider">Compact</p>
                      <Pagination page={page} totalPages={12} onPageChange={setPage} variant="compact" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 dark:text-gray-500 mb-2 font-semibold uppercase tracking-wider">Minimal</p>
                      <Pagination page={page} totalPages={12} onPageChange={setPage} variant="minimal" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </Section>

          {/* ───────── DATA DISPLAY ────────────────────────────────────────── */}
          <Section id="data" title="Data Display"
            description="StatCard (4 trends), MetricCard with secondary breakdowns, and flexible KeyValueDisplay.">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <StatCard label="Total Revenue" value="$124,530" trend={{ direction: "up",   value: "+12.4%", label: "vs last month" }} icon={<DollarSign />} />
              <StatCard label="Active Users"  value="8,492"    trend={{ direction: "up",   value: "+3.2%",  label: "this week" }}     icon={<Users />} />
              <StatCard label="Conversion"    value="3.8%"     trend={{ direction: "down", value: "-0.4%",  label: "vs last week" }}   icon={<TrendingUp />} />
              <StatCard label="Uptime"        value="99.99%"   trend={{ direction: "flat", value: "stable", label: "30-day avg" }}     icon={<Activity />} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <MetricCard title="Active Users"
                primary={{ value: "8,492", delta: "+3.2%", deltaDirection: "up" }}
                secondary={[{ label: "New", value: "124" }, { label: "Returning", value: "8,368" }, { label: "Churned", value: "12" }]}
              />
              <Card variant="default">
                <CardHeader><CardTitle>Key Value Display</CardTitle></CardHeader>
                <CardContent>
                  <KeyValueDisplay items={[
                    { key: "Status",  value: <Badge variant="success" dot>Active</Badge> },
                    { key: "Plan",    value: "Professional" },
                    { key: "Billing", value: "Monthly" },
                    { key: "Region",  value: "US East · ap-1" },
                    { key: "Created", value: "Jan 12, 2025" },
                    { key: "Owner",   value: <div className="flex items-center gap-2"><Avatar size="xs" fallback="AL" /><span>Alice Johnson</span></div> },
                  ]} />
                </CardContent>
              </Card>
            </div>
          </Section>

          {/* ───────── LISTS ───────────────────────────────────────────────── */}
          <Section id="lists" title="List System"
            description="List with states (default, selected, disabled), ListGroups, and card-style ListItemCards with portal Popovers.">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              <Card variant="default" padding="none">
                <CardHeader className="px-5 pt-5 pb-0"><CardTitle>List — States</CardTitle></CardHeader>
                <List className="mt-3">
                  <ListItem leading={<Avatar fallback="AL" size="sm" />} title="Alice Johnson" subtitle="Product Designer · Online"
                    trailing={<StatusBadge status="online" />} onClick={() => {}} />
                  <ListItem leading={<Avatar fallback="BM" size="sm" />} title="Bob Martinez" subtitle="Engineer · Away"
                    trailing={<StatusBadge status="away" />} onClick={() => {}} />
                  <ListItem leading={<Avatar fallback="CL" size="sm" />} title="Carol Lee" subtitle="Marketing Lead — selected"
                    trailing={<Badge variant="neutral" size="sm">Admin</Badge>} onClick={() => {}} selected />
                  <ListItem leading={<Avatar fallback="DK" size="sm" />} title="David Kim (disabled)" subtitle="DevOps — disabled state"
                    trailing={<StatusBadge status="busy" />} disabled />
                </List>
              </Card>

              <div className="flex flex-col gap-3">
                <ListItemCard
                  leading={<Avatar fallback="AL" size="md" ring />}
                  title="Design System Review"
                  subtitle="Due: Tomorrow · High priority"
                  badge={<Badge variant="error" size="sm">Urgent</Badge>}
                  trailing={
                    <Popover trigger={
                      <button className="w-8 h-8 rounded-xl flex items-center justify-center hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
                        <MoreHorizontal className="w-4 h-4 text-gray-400" />
                      </button>
                    }>
                      <PopoverContent>
                        <PopoverItem icon={<Edit />} label="Edit task" description="Modify task details" onClick={() => {}} />
                        <PopoverItem icon={<Download />} label="Export" onClick={() => {}} />
                        <PopoverItem icon={<Plus />} label="Duplicate" onClick={() => {}} />
                        <PopoverDivider />
                        <PopoverItem icon={<Trash2 />} label="Delete task" destructive onClick={() => {}} />
                      </PopoverContent>
                    </Popover>
                  }
                  onClick={() => {}}
                />
                <ListItemCard
                  leading={<DotBadge count={2}><Avatar fallback="BM" size="md" /></DotBadge>}
                  title="API Integration"
                  subtitle="In progress · 60% complete"
                  badge={<Badge variant="secondary" size="sm">In Progress</Badge>}
                  onClick={() => {}}
                />
                <ListItemCard
                  leading={<Avatar fallback="CL" size="md" />}
                  title="User Research Report"
                  subtitle="Completed · 3 days ago"
                  badge={<Badge variant="success" size="sm">Done</Badge>}
                  onClick={() => {}}
                />
                <ListItemCard
                  leading={<Avatar fallback="DK" size="md" />}
                  title="Quarterly Planning (disabled)"
                  subtitle="Scheduled for next week"
                  badge={<Badge variant="neutral" size="sm">Pending</Badge>}
                  onClick={() => {}}
                />
              </div>
            </div>
          </Section>

          {/* ───────── MEDIA ───────────────────────────────────────────────── */}
          <Section id="media" title="Media — Avatar System"
            description="6 sizes, 2 shapes, ring, status overlay, fallback initials, and AvatarGroup with overflow count.">
            <Card variant="default">
              <CardContent>
                <div className="flex flex-col gap-5">
                  <Row label="Sizes — xs / sm / md / lg / xl / 2xl">
                    {(["xs","sm","md","lg","xl","2xl"] as const).map(s => <Avatar key={s} size={s} fallback="AL" />)}
                  </Row>
                  <Divider variant="gradient" spacing="sm" />
                  <Row label="Shape — circle (default) / square">
                    <Avatar size="lg" fallback="AL" shape="circle" />
                    <Avatar size="lg" fallback="BM" shape="square" />
                    <Avatar size="lg" fallback="CL" shape="square" ring />
                  </Row>
                  <Divider variant="gradient" spacing="sm" />
                  <Row label="With Status Indicator + Ring">
                    <Avatar size="lg" fallback="AL" ring status={<StatusBadge status="online"  size="sm" />} />
                    <Avatar size="lg" fallback="BM"      status={<StatusBadge status="away"    size="sm" />} />
                    <Avatar size="lg" fallback="CL" ring status={<StatusBadge status="busy"    size="sm" />} />
                    <Avatar size="lg" fallback="DK"      status={<StatusBadge status="offline" size="sm" />} />
                  </Row>
                  <Divider variant="gradient" spacing="sm" />
                  <Row label="Avatar Group — max 4 / max 3">
                    <AvatarGroup size="sm" max={4} avatars={[
                      { fallback: "AL" }, { fallback: "BM" }, { fallback: "CL" },
                      { fallback: "DK" }, { fallback: "EJ" }, { fallback: "FN" },
                    ]} />
                    <AvatarGroup size="md" max={3} avatars={[
                      { fallback: "AL" }, { fallback: "BM" }, { fallback: "CL" }, { fallback: "DK" },
                    ]} />
                    <AvatarGroup size="lg" max={2} avatars={[
                      { fallback: "AL" }, { fallback: "BM" }, { fallback: "CL" },
                    ]} />
                  </Row>
                </div>
              </CardContent>
            </Card>
          </Section>

          {/* ───────── UTILITY ─────────────────────────────────────────────── */}
          <Section id="utility" title="Utility Elements"
            description="Portal-based Tooltip (auto-flip) and Popover (auto-flip + scroll tracking), Dividers, Panel, and Spacer.">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* Tooltip — all 4 positions */}
              <Card variant="default">
                <CardHeader><CardTitle>Tooltip</CardTitle><CardDescription>Portal-rendered · auto-flip · 4 positions · delay</CardDescription></CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-4">
                    <Row label="Positions — hover each button">
                      {(["top","bottom","left","right"] as const).map(pos => (
                        <Tooltip key={pos} content={`Tooltip · ${pos}`} position={pos}>
                          <Btn>{pos}</Btn>
                        </Tooltip>
                      ))}
                    </Row>
                    <Row label="With rich content">
                      <Tooltip content={<span><strong>Pro tip:</strong> Tooltips auto-flip at viewport edges and render via Portal to avoid clipping.</span>} position="top">
                        <Btn variant="solid">Rich tooltip</Btn>
                      </Tooltip>
                      <Tooltip content="Instant tooltip" delay={0} position="right">
                        <Btn>No delay</Btn>
                      </Tooltip>
                      <Tooltip content="This tooltip is disabled" disabled position="top">
                        <Btn>Disabled</Btn>
                      </Tooltip>
                    </Row>
                  </div>
                </CardContent>
              </Card>

              {/* Popover */}
              <Card variant="default">
                <CardHeader><CardTitle>Popover</CardTitle><CardDescription>Portal-rendered · auto-flip · outside click + Escape to close</CardDescription></CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-4">
                    <Row label="Actions menu">
                      <Popover trigger={<Btn variant="solid">Open menu</Btn>}>
                        <PopoverContent>
                          <PopoverItem icon={<Edit />} label="Edit" description="Modify this item" onClick={() => {}} />
                          <PopoverItem icon={<Download />} label="Export as CSV" onClick={() => {}} />
                          <PopoverItem icon={<Plus />} label="Duplicate" onClick={() => {}} />
                          <PopoverDivider />
                          <PopoverItem icon={<Trash2 />} label="Delete" destructive onClick={() => {}} />
                        </PopoverContent>
                      </Popover>
                      <Popover trigger={<Btn>Small popover</Btn>} width="sm" position="bottom-end">
                        <PopoverContent>
                          <PopoverItem icon={<FileText />} label="View details" onClick={() => {}} />
                          <PopoverItem icon={<Globe />} label="Open in browser" onClick={() => {}} />
                        </PopoverContent>
                      </Popover>
                    </Row>
                    <Row label="Bottom-end position">
                      <Popover trigger={<Btn>bottom-end</Btn>} position="bottom-end">
                        <PopoverContent>
                          <PopoverItem icon={<Zap />} label="Upgrade plan" onClick={() => {}} />
                          <PopoverItem icon={<Database />} label="Storage settings" onClick={() => {}} />
                        </PopoverContent>
                      </Popover>
                    </Row>
                  </div>
                </CardContent>
              </Card>

              {/* Dividers */}
              <Card variant="default">
                <CardHeader><CardTitle>Dividers</CardTitle><CardDescription>solid · gradient · dashed · with label</CardDescription></CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-1">
                    {(["solid","gradient","dashed"] as const).map(v => (
                      <div key={v}>
                        <p className="text-xs text-gray-400 dark:text-gray-500 mb-1.5">{v}</p>
                        <Divider variant={v} spacing="sm" />
                      </div>
                    ))}
                    <p className="text-xs text-gray-400 dark:text-gray-500 mb-1.5">with label</p>
                    <Divider label="OR" spacing="sm" />
                    <Divider label="Section break" variant="gradient" spacing="sm" />
                  </div>
                </CardContent>
              </Card>

              {/* Panel & Section structure */}
              <Card variant="default">
                <CardHeader><CardTitle>Panel &amp; SectionContainer</CardTitle><CardDescription>default · transparent · bordered variants</CardDescription></CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-4">
                    <Panel variant="bordered">
                      <SectionHeader>
                        <SectionTitleGroup>
                          <SectionTitle>Account Settings</SectionTitle>
                          <SectionSubtitle>Manage profile &amp; preferences</SectionSubtitle>
                        </SectionTitleGroup>
                        <SectionAction><Badge variant="primary" size="sm">Pro</Badge></SectionAction>
                      </SectionHeader>
                      <SectionContent>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Panel with structured header, title group, action, and content zones.</p>
                      </SectionContent>
                    </Panel>
                    <Panel variant="default">
                      <SectionHeader>
                        <SectionTitleGroup>
                          <SectionTitle>Notifications</SectionTitle>
                          <SectionSubtitle>Choose what you get notified about</SectionSubtitle>
                        </SectionTitleGroup>
                      </SectionHeader>
                      <SectionContent>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Default panel variant — glass surface with blur.</p>
                      </SectionContent>
                    </Panel>
                  </div>
                </CardContent>
              </Card>
            </div>
          </Section>

        </main>
      </div>
    </div>
  );
}

// ─── Export (wrapped in ToastProvider) ────────────────────────────────────────

export default function ElementShowcasePage() {
  return (
    <ToastProvider position="bottom-right" maxVisible={5}>
      <ElementShowcaseInner />
    </ToastProvider>
  );
}
