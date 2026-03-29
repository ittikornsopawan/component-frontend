"use client";

import React, { useState } from "react";
import {
  Layers, Moon, Sun, Sparkles, Info, Settings,
  Edit2, Trash2, Copy, Share2, Download, Star,
  Plus, ChevronDown, MoreHorizontal, Bell, User,
  FileText, LogOut, Palette, Shield, CreditCard,
  Check, AlertTriangle, Eye, EyeOff, Lock,
  ExternalLink, RefreshCw, Archive,
} from "lucide-react";

import { Modal, ConfirmationModal, ModalHeader, ModalBody, ModalFooter } from "@/components/overlay/Modal";
import { Drawer }      from "@/components/overlay/Drawer";
import { Dropdown }    from "@/components/overlay/Dropdown";
import { Popover }     from "@/components/overlay/Popover";
import { Tooltip }     from "@/components/overlay/Tooltip";
import { ContextMenu } from "@/components/overlay/ContextMenu";

import { TextInput }  from "@/components/input/TextInput";
import { TextArea }   from "@/components/input/TextArea";
import { Select }     from "@/components/input/Select";
import { Toggle }     from "@/components/input/Toggle";
import { Badge }      from "@/components/element/Badge";

// ─── Layout helpers ───────────────────────────────────────────────────────────

function Section({ id, title, description, children }: {
  id: string; title: string; description: string; children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-28 flex flex-col gap-6">
      <div>
        <div className="flex items-center gap-3 mb-1">
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">{title}</h2>
          <div className="flex-1 h-px bg-gradient-to-r from-purple-200/60 dark:from-purple-700/30 to-transparent" />
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
      </div>
      {children}
    </section>
  );
}

function DemoCard({ title, children, span2 = false }: {
  title: string; children: React.ReactNode; span2?: boolean;
}) {
  return (
    <div className={`bg-white/40 dark:bg-white/5 backdrop-blur-xl border border-white/30 dark:border-white/10 shadow-xl shadow-black/5 rounded-3xl p-5 flex flex-col gap-4 ${span2 ? "md:col-span-2" : ""}`}>
      <p className="text-[11px] font-bold uppercase tracking-widest text-purple-500 dark:text-purple-400">{title}</p>
      {children}
    </div>
  );
}

function DemoRow({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-wrap items-center gap-3">{children}</div>;
}

type TriggerBtnProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "outline" | "ghost" | "danger" | "primary";
};

const TriggerBtn = React.forwardRef<HTMLButtonElement, TriggerBtnProps>(
  function TriggerBtn({ children, variant = "default", className, ...rest }, ref) {
    const styles: Record<NonNullable<TriggerBtnProps["variant"]>, string> = {
      default: "bg-white/60 dark:bg-white/8 text-gray-700 dark:text-gray-300 border border-white/30 dark:border-white/15 hover:bg-white/80 dark:hover:bg-white/12",
      outline: "bg-transparent border border-purple-300/50 dark:border-purple-700/40 text-purple-700 dark:text-purple-300 hover:bg-purple-50/40 dark:hover:bg-purple-900/20",
      ghost:   "bg-transparent text-gray-600 dark:text-gray-400 hover:bg-white/40 dark:hover:bg-white/8",
      danger:  "bg-red-50/60 dark:bg-red-900/20 text-red-600 dark:text-red-400 border border-red-200/50 dark:border-red-700/30 hover:bg-red-100/60",
      primary: "bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white shadow-md shadow-purple-500/20",
    };
    return (
      <button
        ref={ref}
        type="button"
        className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-150 active:scale-[0.98] ${styles[variant]} ${className ?? ""}`}
        {...rest}
      >
        {children}
      </button>
    );
  }
);

function ZTag({ label, z }: { label: string; z: number }) {
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-gray-100/60 dark:bg-white/8 border border-gray-200/60 dark:border-white/10 text-xs font-mono">
      <span className="text-purple-600 dark:text-purple-400 font-bold">{z}</span>
      <span className="text-gray-500 dark:text-gray-400">{label}</span>
    </span>
  );
}

// ─── Nav config ───────────────────────────────────────────────────────────────

const NAV_ITEMS = [
  { id: "modal",       label: "Modal" },
  { id: "drawer",      label: "Drawer" },
  { id: "dropdown",    label: "Dropdown" },
  { id: "popover",     label: "Popover" },
  { id: "tooltip",     label: "Tooltip" },
  { id: "contextmenu", label: "Context Menu" },
  { id: "stacking",    label: "Stacking" },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function OverlayShowcasePage() {
  const [darkMode, setDarkMode] = useState(false);
  const [activeSection, setActiveSection] = useState("modal");

  // ── Modal state ───────────────────────────────────────────────────────────
  type ModalType = "default" | "form" | "fullscreen" | null;
  const [openModal,         setOpenModal]         = useState<ModalType>(null);
  const [openConfirm,       setOpenConfirm]       = useState<"danger" | "warning" | "info" | null>(null);
  const [formEditName,      setFormEditName]      = useState("Brand Identity Refresh");
  const [formNotify,        setFormNotify]        = useState(true);
  const [fullscreenVisible, setFullscreenVisible] = useState(false);

  // ── Drawer state ──────────────────────────────────────────────────────────
  type DrawerType = "left" | "right" | "bottom" | null;
  const [openDrawer, setOpenDrawer] = useState<DrawerType>(null);

  // ── Stacking test ─────────────────────────────────────────────────────────
  const [openStackModal,  setOpenStackModal]  = useState(false);
  const [openNestedModal, setOpenNestedModal] = useState(false);

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="min-h-screen bg-gradient-to-br from-slate-100 via-purple-50/60 to-blue-50 dark:from-slate-950 dark:via-purple-950/40 dark:to-slate-900">

        {/* ── Header ── */}
        <header className="sticky top-0 z-[40] bg-white/30 dark:bg-black/20 backdrop-blur-xl border-b border-white/20 dark:border-white/10">
          <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-purple-400 to-blue-400 flex items-center justify-center shadow-md">
                <Layers className="w-4 h-4 text-white" />
              </div>
              <div>
                <h1 className="text-base font-bold text-gray-800 dark:text-white leading-none">Overlay System</h1>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Portal-rendered · Focus trapped · Liquid Glass</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setDarkMode((d) => !d)}
              className="w-9 h-9 flex items-center justify-center rounded-xl bg-white/40 dark:bg-white/10 border border-white/30 dark:border-white/15 hover:bg-white/60 dark:hover:bg-white/15 transition-all duration-150"
            >
              {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-gray-600" />}
            </button>
          </div>
        </header>

        {/* ── Section nav ── */}
        <nav className="sticky top-[65px] z-[39] bg-white/20 dark:bg-black/10 backdrop-blur-xl border-b border-white/15 dark:border-white/8 overflow-x-auto scrollbar-hide">
          <div className="max-w-6xl mx-auto px-6 flex gap-1 py-2">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={() => setActiveSection(item.id)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-150 ${
                  activeSection === item.id
                    ? "bg-purple-400/20 dark:bg-purple-500/20 text-purple-700 dark:text-purple-300"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-white/40 dark:hover:bg-white/8"
                }`}
              >
                {item.label}
              </a>
            ))}
          </div>
        </nav>

        {/* ── Main content ── */}
        <main className="max-w-6xl mx-auto px-6 py-10 flex flex-col gap-14">

          {/* ─────────── MODAL ─────────── */}
          <Section
            id="modal"
            title="Modal"
            description="Full-screen overlay for focused tasks. Focus-trapped, scroll-locked, ESC to close."
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              <DemoCard title="Default & Fullscreen Modal">
                <DemoRow>
                  <TriggerBtn onClick={() => setOpenModal("default")}>
                    <Info className="w-4 h-4" /> Default Modal
                  </TriggerBtn>
                  <TriggerBtn variant="outline" onClick={() => setFullscreenVisible(true)}>
                    <ExternalLink className="w-4 h-4" /> Fullscreen
                  </TriggerBtn>
                </DemoRow>
                <p className="text-xs text-gray-400 dark:text-gray-500">
                  Press <kbd className="px-1.5 py-0.5 rounded-md bg-gray-100/60 dark:bg-white/10 text-[10px] font-mono">ESC</kbd> or click backdrop to close. Tab cycles focus inside.
                </p>
              </DemoCard>

              <DemoCard title="Form Modal">
                <DemoRow>
                  <TriggerBtn variant="primary" onClick={() => setOpenModal("form")}>
                    <Edit2 className="w-4 h-4" /> Edit Project
                  </TriggerBtn>
                </DemoRow>
                <p className="text-xs text-gray-400 dark:text-gray-500">
                  Glass card with header + scrollable body + sticky footer. Focus moves to first input.
                </p>
              </DemoCard>

              <DemoCard title="Confirmation Dialogs" span2>
                <DemoRow>
                  <TriggerBtn variant="danger" onClick={() => setOpenConfirm("danger")}>
                    <Trash2 className="w-4 h-4" /> Delete Confirm
                  </TriggerBtn>
                  <TriggerBtn onClick={() => setOpenConfirm("warning")}>
                    <AlertTriangle className="w-4 h-4" /> Warning Confirm
                  </TriggerBtn>
                  <TriggerBtn variant="outline" onClick={() => setOpenConfirm("info")}>
                    <Check className="w-4 h-4" /> Info Confirm
                  </TriggerBtn>
                </DemoRow>
                <p className="text-xs text-gray-400 dark:text-gray-500">
                  Short, focused dialogs for destructive or important confirmations. Icon + description + two actions.
                </p>
              </DemoCard>
            </div>
          </Section>

          {/* ─────────── DRAWER ─────────── */}
          <Section
            id="drawer"
            title="Drawer"
            description="Slide-in panels anchored to screen edges. Used for navigation, detail views, and settings."
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              <DemoCard title="Side Drawers">
                <DemoRow>
                  <TriggerBtn onClick={() => setOpenDrawer("left")}>
                    ← Left Drawer
                  </TriggerBtn>
                  <TriggerBtn onClick={() => setOpenDrawer("right")}>
                    Right Drawer →
                  </TriggerBtn>
                </DemoRow>
                <p className="text-xs text-gray-400 dark:text-gray-500">
                  Slide in from the edge with backdrop blur. Focus trapped inside, ESC closes.
                </p>
              </DemoCard>

              <DemoCard title="Bottom Sheet">
                <DemoRow>
                  <TriggerBtn onClick={() => setOpenDrawer("bottom")}>
                    ↑ Bottom Sheet
                  </TriggerBtn>
                </DemoRow>
                <p className="text-xs text-gray-400 dark:text-gray-500">
                  Ideal for mobile-style action sheets and quick filters.
                </p>
              </DemoCard>
            </div>
          </Section>

          {/* ─────────── DROPDOWN ─────────── */}
          <Section
            id="dropdown"
            title="Dropdown"
            description="Portal-rendered — never clipped. Keyboard navigable with ArrowUp/Down, Enter, Escape."
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              <DemoCard title="Actions Dropdown">
                <DemoRow>
                  <Dropdown
                    trigger={
                      <TriggerBtn>
                        <MoreHorizontal className="w-4 h-4" /> Actions <ChevronDown className="w-3.5 h-3.5" />
                      </TriggerBtn>
                    }
                    items={[
                      { id: "edit",   label: "Edit",         icon: <Edit2 className="w-3.5 h-3.5" />,    shortcut: "⌘E" },
                      { id: "copy",   label: "Duplicate",    icon: <Copy className="w-3.5 h-3.5" />,     shortcut: "⌘D" },
                      { id: "share",  label: "Share",        icon: <Share2 className="w-3.5 h-3.5" />,   shortcut: "⌘S" },
                      { id: "arch",   label: "Archive",      icon: <Archive className="w-3.5 h-3.5" /> },
                      "separator",
                      { id: "delete", label: "Delete",       icon: <Trash2 className="w-3.5 h-3.5" />,  shortcut: "⌫",  danger: true },
                    ]}
                  />

                  <Dropdown
                    placement="bottom-end"
                    trigger={
                      <TriggerBtn variant="outline">
                        <User className="w-4 h-4" /> Account <ChevronDown className="w-3.5 h-3.5" />
                      </TriggerBtn>
                    }
                    items={[
                      { id: "profile",  label: "Profile",      icon: <User className="w-3.5 h-3.5" />,       description: "View your profile" },
                      { id: "settings", label: "Settings",     icon: <Settings className="w-3.5 h-3.5" /> },
                      { id: "billing",  label: "Billing",      icon: <CreditCard className="w-3.5 h-3.5" /> },
                      "separator",
                      { id: "logout",   label: "Sign out",     icon: <LogOut className="w-3.5 h-3.5" />,     danger: true },
                    ]}
                  />
                </DemoRow>
              </DemoCard>

              <DemoCard title="Checked & Disabled Items">
                <DemoRow>
                  <Dropdown
                    trigger={
                      <TriggerBtn>
                        <Bell className="w-4 h-4" /> Notifications <ChevronDown className="w-3.5 h-3.5" />
                      </TriggerBtn>
                    }
                    items={[
                      { id: "email",   label: "Email alerts",   icon: <Bell className="w-3.5 h-3.5" />,   checked: true },
                      { id: "push",    label: "Push alerts",    icon: <Bell className="w-3.5 h-3.5" />,   checked: false },
                      { id: "slack",   label: "Slack alerts",   icon: <Bell className="w-3.5 h-3.5" />,   checked: true },
                      "separator",
                      { id: "pause",   label: "Pause all",      icon: <Lock className="w-3.5 h-3.5" />,   disabled: true },
                    ]}
                  />

                  <Dropdown
                    placement="bottom-end"
                    trigger={
                      <TriggerBtn variant="ghost">
                        <Download className="w-4 h-4" /> Export
                      </TriggerBtn>
                    }
                    items={[
                      { id: "csv",   label: "Export as CSV",  icon: <FileText className="w-3.5 h-3.5" /> },
                      { id: "pdf",   label: "Export as PDF",  icon: <FileText className="w-3.5 h-3.5" /> },
                      { id: "json",  label: "Export as JSON", icon: <FileText className="w-3.5 h-3.5" /> },
                    ]}
                  />
                </DemoRow>
                <p className="text-xs text-gray-400 dark:text-gray-500">
                  Checked state via checkmark icon. Disabled items are dimmed and non-interactive.
                </p>
              </DemoCard>
            </div>
          </Section>

          {/* ─────────── POPOVER ─────────── */}
          <Section
            id="popover"
            title="Popover"
            description="Anchored to trigger, portal-rendered, auto-flips near viewport edges. Click or hover trigger."
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              <DemoCard title="Click Trigger — Rich Content">
                <DemoRow>
                  <Popover
                    title="Notifications"
                    placement="bottom-start"
                    trigger={
                      <TriggerBtn>
                        <Bell className="w-4 h-4" /> Notifications
                        <Badge variant="error" size="sm">3</Badge>
                      </TriggerBtn>
                    }
                    content={
                      <div className="flex flex-col gap-2 min-w-[220px]">
                        {[
                          { t: "New comment on Brand Refresh", s: "2m ago",  dot: "bg-purple-400" },
                          { t: "Task assigned to you",          s: "15m ago", dot: "bg-blue-400" },
                          { t: "Sprint review starts in 1h",    s: "30m ago", dot: "bg-amber-400" },
                        ].map((n) => (
                          <div key={n.t} className="flex items-start gap-2.5">
                            <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${n.dot}`} />
                            <div>
                              <p className="text-xs font-medium text-gray-800 dark:text-gray-200">{n.t}</p>
                              <p className="text-[10px] text-gray-400 dark:text-gray-500">{n.s}</p>
                            </div>
                          </div>
                        ))}
                        <div className="mt-1 pt-2 border-t border-white/20 dark:border-white/10">
                          <button className="text-xs font-medium text-purple-600 dark:text-purple-400 hover:underline">
                            Mark all as read
                          </button>
                        </div>
                      </div>
                    }
                  />

                  <Popover
                    title="User Settings"
                    placement="bottom-end"
                    trigger={
                      <TriggerBtn variant="outline">
                        <Settings className="w-4 h-4" /> Quick Settings
                      </TriggerBtn>
                    }
                    content={
                      <div className="flex flex-col gap-3 min-w-[220px]">
                        <Toggle label="Dark mode"         description="Switch interface theme"     checked={darkMode} onChange={setDarkMode} size="sm" />
                        <Toggle label="Email digest"      description="Daily summary emails"        checked={true}    onChange={() => {}}   size="sm" />
                        <Toggle label="Beta features"     description="Early access to new tools"   checked={false}   onChange={() => {}}   size="sm" />
                      </div>
                    }
                  />
                </DemoRow>
              </DemoCard>

              <DemoCard title="Hover & Placements">
                <DemoRow>
                  {(["bottom", "top", "left", "right"] as const).map((p) => (
                    <Popover
                      key={p}
                      placement={p}
                      triggerOn="hover"
                      showClose={false}
                      trigger={
                        <TriggerBtn variant="ghost">
                          {p}
                        </TriggerBtn>
                      }
                      content={
                        <p className="text-xs text-gray-600 dark:text-gray-300 min-w-[120px]">
                          Popover positioned <strong>{p}</strong> with auto-flip near edges.
                        </p>
                      }
                    />
                  ))}
                </DemoRow>
                <p className="text-xs text-gray-400 dark:text-gray-500">
                  Hover over buttons to trigger. Auto-flips when near viewport edge.
                </p>
              </DemoCard>
            </div>
          </Section>

          {/* ─────────── TOOLTIP ─────────── */}
          <Section
            id="tooltip"
            title="Tooltip"
            description="300ms delay on hover, fade-in, portal-rendered. Plain text only, all 4 placements."
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              <DemoCard title="All Placements">
                <DemoRow>
                  {(["top", "bottom", "left", "right"] as const).map((p) => (
                    <Tooltip key={p} content={`Tooltip: ${p}`} placement={p}>
                      <TriggerBtn>
                        {p}
                      </TriggerBtn>
                    </Tooltip>
                  ))}
                </DemoRow>
                <p className="text-xs text-gray-400 dark:text-gray-500">
                  Hover to see tooltip. All placements auto-flip if near viewport edge.
                </p>
              </DemoCard>

              <DemoCard title="Icon Button Tooltips">
                <DemoRow>
                  {[
                    { icon: <Edit2 className="w-4 h-4" />,     tip: "Edit project",    key: "e" },
                    { icon: <Copy className="w-4 h-4" />,      tip: "Duplicate",       key: "c" },
                    { icon: <Share2 className="w-4 h-4" />,    tip: "Share link",      key: "s" },
                    { icon: <Download className="w-4 h-4" />,  tip: "Download",        key: "d" },
                    { icon: <Archive className="w-4 h-4" />,   tip: "Move to archive", key: "a" },
                    { icon: <Trash2 className="w-4 h-4" />,    tip: "Delete forever",  key: "t" },
                  ].map(({ icon, tip, key }) => (
                    <Tooltip key={key} content={tip} placement="top">
                      <button
                        type="button"
                        className="w-9 h-9 flex items-center justify-center rounded-xl bg-white/50 dark:bg-white/8 border border-white/30 dark:border-white/15 text-gray-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-50/60 dark:hover:bg-purple-900/20 transition-all duration-150"
                      >
                        {icon}
                      </button>
                    </Tooltip>
                  ))}
                </DemoRow>
                <p className="text-xs text-gray-400 dark:text-gray-500">
                  Hover icon buttons. 300ms delay prevents tooltip flash on quick mouse passes.
                </p>
              </DemoCard>

              <DemoCard title="Custom Content Tooltip" span2>
                <DemoRow>
                  <Tooltip
                    content={
                      <span>
                        Keyboard shortcut: <kbd className="ml-1 px-1.5 py-0.5 rounded-md bg-white/20 text-[10px] font-mono">⌘ + K</kbd>
                      </span>
                    }
                    placement="right"
                    size="md"
                  >
                    <TriggerBtn variant="outline">
                      <Sparkles className="w-4 h-4" /> Command Palette
                    </TriggerBtn>
                  </Tooltip>

                  <Tooltip content="This action is disabled for your current plan" placement="top">
                    <span className="inline-flex">
                      <TriggerBtn variant="ghost" className="opacity-50 cursor-not-allowed pointer-events-none">
                        <Star className="w-4 h-4" /> Pro Feature
                      </TriggerBtn>
                    </span>
                  </Tooltip>

                  <Tooltip
                    content="Password strength: Strong. Contains uppercase, number, and symbol."
                    placement="bottom"
                    size="md"
                  >
                    <TriggerBtn>
                      <Shield className="w-4 h-4" /> Password Tips
                    </TriggerBtn>
                  </Tooltip>
                </DemoRow>
              </DemoCard>
            </div>
          </Section>

          {/* ─────────── CONTEXT MENU ─────────── */}
          <Section
            id="contextmenu"
            title="Context Menu"
            description="Right-click anywhere in the zone below. Positions near cursor, closes on outside click."
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              <DemoCard title="File / Asset Context Menu">
                <ContextMenu
                  items={[
                    { id: "open",    label: "Open",           icon: <Eye className="w-3.5 h-3.5" /> },
                    { id: "edit",    label: "Edit",           icon: <Edit2 className="w-3.5 h-3.5" />,    shortcut: "⌘E" },
                    { id: "copy",    label: "Copy link",      icon: <Copy className="w-3.5 h-3.5" />,     shortcut: "⌘C" },
                    { id: "share",   label: "Share",          icon: <Share2 className="w-3.5 h-3.5" />,   shortcut: "⌘S" },
                    { id: "dl",      label: "Download",       icon: <Download className="w-3.5 h-3.5" />, shortcut: "⌘D" },
                    "separator",
                    { id: "rename",  label: "Rename",         icon: <RefreshCw className="w-3.5 h-3.5" /> },
                    { id: "archive", label: "Archive",        icon: <Archive className="w-3.5 h-3.5" />,  description: "Move to archive" },
                    "separator",
                    { id: "delete",  label: "Move to Trash",  icon: <Trash2 className="w-3.5 h-3.5" />,  danger: true, shortcut: "⌫" },
                  ]}
                >
                  <div className="h-28 rounded-2xl border-2 border-dashed border-purple-300/40 dark:border-purple-700/30 flex items-center justify-center cursor-default select-none bg-purple-50/30 dark:bg-purple-900/10 hover:bg-purple-50/50 dark:hover:bg-purple-900/15 transition-colors duration-150">
                    <div className="text-center">
                      <p className="text-sm font-medium text-purple-600 dark:text-purple-400">Right-click here</p>
                      <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">File context menu</p>
                    </div>
                  </div>
                </ContextMenu>
              </DemoCard>

              <DemoCard title="Table Row Context Menu">
                <ContextMenu
                  items={[
                    { id: "view",    label: "View details",    icon: <Eye className="w-3.5 h-3.5" /> },
                    { id: "edit",    label: "Edit row",        icon: <Edit2 className="w-3.5 h-3.5" />,  shortcut: "⌘E" },
                    { id: "dup",     label: "Duplicate row",   icon: <Copy className="w-3.5 h-3.5" /> },
                    "separator",
                    { id: "ext",     label: "Open in new tab", icon: <ExternalLink className="w-3.5 h-3.5" /> },
                    { id: "copy",    label: "Copy ID",         icon: <Copy className="w-3.5 h-3.5" />,  description: "Copy row ID to clipboard" },
                    "separator",
                    { id: "del",     label: "Delete row",      icon: <Trash2 className="w-3.5 h-3.5" />, danger: true },
                  ]}
                >
                  <div className="rounded-2xl overflow-hidden border border-white/25 dark:border-white/10 bg-white/40 dark:bg-white/5">
                    {["Brand Identity Refresh", "API v3 Migration", "Mobile App Redesign"].map((name, i) => (
                      <div
                        key={name}
                        className={`flex items-center gap-3 px-4 py-3 cursor-default hover:bg-white/50 dark:hover:bg-white/8 transition-colors duration-100 ${i > 0 ? "border-t border-white/15 dark:border-white/8" : ""}`}
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0" />
                        <span className="text-sm text-gray-700 dark:text-gray-300">{name}</span>
                      </div>
                    ))}
                  </div>
                </ContextMenu>
                <p className="text-xs text-gray-400 dark:text-gray-500">Right-click any row above.</p>
              </DemoCard>
            </div>
          </Section>

          {/* ─────────── STACKING ─────────── */}
          <Section
            id="stacking"
            title="Z-Index Stacking"
            description="Named z-index tiers prevent arbitrary value proliferation. Higher layers always win."
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              <DemoCard title="Z-Index Scale">
                <div className="flex flex-wrap gap-2">
                  <ZTag label="dropdown" z={40} />
                  <ZTag label="popover"  z={100} />
                  <ZTag label="modal"    z={200} />
                  <ZTag label="toast"    z={9000} />
                  <ZTag label="tooltip"  z={9999} />
                </div>
                <div className="mt-1 flex flex-col gap-2">
                  {[
                    { label: "Dropdown",   z: "z-dropdown (40)",  color: "bg-blue-400" },
                    { label: "Popover",    z: "z-overlay (100)",  color: "bg-purple-400" },
                    { label: "Modal",      z: "z-modal (200)",    color: "bg-indigo-400" },
                    { label: "Toast",      z: "z-toast (9000)",   color: "bg-amber-400" },
                    { label: "Tooltip",    z: "z-tooltip (9999)", color: "bg-red-400" },
                  ].map((tier) => (
                    <div key={tier.label} className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${tier.color} flex-shrink-0`} />
                      <span className="text-xs text-gray-600 dark:text-gray-400 w-20 font-medium">{tier.label}</span>
                      <code className="text-[11px] text-purple-600 dark:text-purple-400 font-mono">{tier.z}</code>
                    </div>
                  ))}
                </div>
              </DemoCard>

              <DemoCard title="Live Stacking Test">
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Open a modal, then a tooltip or dropdown inside it — tooltip always wins (z-9999 &gt; z-200).
                </p>
                <DemoRow>
                  <TriggerBtn variant="primary" onClick={() => setOpenStackModal(true)}>
                    <Plus className="w-4 h-4" /> Open Stack Test
                  </TriggerBtn>
                </DemoRow>
              </DemoCard>
            </div>
          </Section>

          {/* ── Footer ── */}
          <footer className="text-center py-12 border-t border-white/20 dark:border-white/10">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/40 dark:bg-white/5 border border-white/30 dark:border-white/10 shadow-sm">
              <Layers className="w-4 h-4 text-purple-500" />
              <span className="text-sm text-gray-600 dark:text-gray-400">
                <span className="font-semibold text-gray-800 dark:text-gray-200">Overlay System</span>
                {" "}· 6 components · Portal-rendered · Focus-trapped · Accessible
              </span>
            </div>
          </footer>
        </main>
      </div>

      {/* ════════════════ MODAL OVERLAYS ════════════════ */}

      {/* Default Modal */}
      <Modal
        open={openModal === "default"}
        onClose={() => setOpenModal(null)}
        title="Overlay System"
        description="Component detail and interaction guide"
        icon={<Layers className="w-5 h-5 text-purple-500" />}
        primaryAction={{ label: "Got it", onClick: () => setOpenModal(null), variant: "primary" }}
        secondaryAction={{ label: "Learn more", onClick: () => setOpenModal(null), variant: "ghost" }}
      >
        <div className="flex flex-col gap-4 text-sm text-gray-600 dark:text-gray-400">
          <p>This modal is rendered via <code className="px-1.5 py-0.5 rounded-lg bg-purple-50/60 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 text-xs font-mono">createPortal</code> into <code className="px-1.5 py-0.5 rounded-lg bg-gray-100/60 dark:bg-white/10 text-xs font-mono">document.body</code>, guaranteeing it can never be clipped by a parent <code className="text-xs font-mono">overflow: hidden</code>.</p>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "ESC to close",        icon: "⌨️" },
              { label: "Backdrop click",       icon: "🖱️" },
              { label: "Focus trap",           icon: "🔒" },
              { label: "Scroll lock",          icon: "🚫" },
              { label: "aria-modal",           icon: "♿" },
              { label: "Return focus",         icon: "↩️" },
            ].map((f) => (
              <div key={f.label} className="flex items-center gap-2 text-xs">
                <span>{f.icon}</span>
                <span className="text-gray-700 dark:text-gray-300">{f.label}</span>
              </div>
            ))}
          </div>
        </div>
      </Modal>

      {/* Form Modal */}
      <Modal
        open={openModal === "form"}
        onClose={() => setOpenModal(null)}
        title="Edit Project"
        description="Update project details"
        size="md"
        showCloseButton
      >
        <div className="flex flex-col gap-4">
          <TextInput
            label="Project Name"
            value={formEditName}
            onChange={(e) => setFormEditName(e.target.value)}
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
            defaultValue="active"
          />
          <TextArea
            label="Notes"
            placeholder="Any updates for the team?"
            autoResize
          />
          <Toggle
            label="Notify team"
            description="Send update notification to team members"
            checked={formNotify}
            onChange={setFormNotify}
            size="md"
          />
        </div>
        <ModalFooter>
          <button
            type="button"
            onClick={() => setOpenModal(null)}
            className="px-4 py-2 rounded-xl text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-100/60 dark:hover:bg-white/8 transition-all duration-150"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => setOpenModal(null)}
            className="flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-semibold bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white shadow-md shadow-purple-500/20 transition-all duration-200 active:scale-[0.98]"
          >
            <Check className="w-4 h-4" /> Save Changes
          </button>
        </ModalFooter>
      </Modal>

      {/* Fullscreen Modal */}
      <Modal
        open={fullscreenVisible}
        onClose={() => setFullscreenVisible(false)}
        variant="fullscreen"
        title="Fullscreen Modal"
        description="Covers the entire viewport — ideal for document editors or complex workflows"
        showCloseButton
        primaryAction={{ label: "Close", onClick: () => setFullscreenVisible(false), variant: "primary" }}
      >
        <div className="flex flex-col items-center justify-center h-full gap-6 text-center py-12">
          <div className="w-16 h-16 rounded-3xl bg-purple-100/70 dark:bg-purple-900/30 flex items-center justify-center">
            <Layers className="w-8 h-8 text-purple-500" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">Fullscreen Overlay</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 max-w-md">
              This variant fills the entire viewport. Use for immersive editing experiences, onboarding flows, or media viewers.
            </p>
          </div>
        </div>
      </Modal>

      {/* Confirmation Modals */}
      <ConfirmationModal
        open={openConfirm === "danger"}
        onClose={() => setOpenConfirm(null)}
        onConfirm={() => setOpenConfirm(null)}
        variant="danger"
        title="Delete Project"
        description={'Are you sure you want to delete “Brand Identity Refresh”? This will permanently remove all data and cannot be undone.'}
        confirmLabel="Delete permanently"
      />
      <ConfirmationModal
        open={openConfirm === "warning"}
        onClose={() => setOpenConfirm(null)}
        onConfirm={() => setOpenConfirm(null)}
        variant="warning"
        title="Publish to Production"
        description="You're about to deploy changes to the live environment. This will affect all users immediately."
        confirmLabel="Deploy now"
      />
      <ConfirmationModal
        open={openConfirm === "info"}
        onClose={() => setOpenConfirm(null)}
        onConfirm={() => setOpenConfirm(null)}
        variant="info"
        title="Enable Beta Features"
        description="You'll gain early access to features that may change before general availability. Your feedback helps us improve."
        confirmLabel="Enable beta"
      />

      {/* ════════════════ DRAWER OVERLAYS ════════════════ */}

      <Drawer
        open={openDrawer === "left"}
        onClose={() => setOpenDrawer(null)}
        position="left"
        title="Navigation"
        description="Left drawer — sidebar pattern"
      >
        <nav className="flex flex-col gap-1">
          {[
            { label: "Dashboard",   icon: <Layers className="w-4 h-4" /> },
            { label: "Projects",    icon: <FileText className="w-4 h-4" /> },
            { label: "Team",        icon: <User className="w-4 h-4" /> },
            { label: "Settings",    icon: <Settings className="w-4 h-4" /> },
            { label: "Billing",     icon: <CreditCard className="w-4 h-4" /> },
          ].map((item, i) => (
            <button
              key={item.label}
              type="button"
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 w-full text-left ${
                i === 0
                  ? "bg-purple-100/60 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300"
                  : "text-gray-600 dark:text-gray-400 hover:bg-white/50 dark:hover:bg-white/8"
              }`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>
      </Drawer>

      <Drawer
        open={openDrawer === "right"}
        onClose={() => setOpenDrawer(null)}
        position="right"
        title="Project Details"
        description="Brand Identity Refresh"
        footer={
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setOpenDrawer(null)}
              className="flex-1 py-2 rounded-xl text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-100/60 dark:hover:bg-white/8 transition-all duration-150"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => setOpenDrawer(null)}
              className="flex-1 py-2 rounded-xl text-sm font-semibold bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-md shadow-purple-500/20 transition-all duration-200"
            >
              Save
            </button>
          </div>
        }
      >
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-3">
            {[
              { l: "Status",  v: "Active",         c: "text-emerald-600 dark:text-emerald-400" },
              { l: "Team",    v: "Design",          c: "text-gray-700 dark:text-gray-300" },
              { l: "Due",     v: "Apr 15, 2026",    c: "text-gray-700 dark:text-gray-300" },
              { l: "Budget",  v: "$12,400",         c: "text-gray-700 dark:text-gray-300" },
            ].map((f) => (
              <div key={f.l} className="bg-white/40 dark:bg-white/5 rounded-xl p-3">
                <p className="text-[10px] text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-0.5">{f.l}</p>
                <p className={`text-sm font-semibold ${f.c}`}>{f.v}</p>
              </div>
            ))}
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-2">Team Members</p>
            <div className="flex flex-col gap-2">
              {[
                { name: "Alex Chen",      role: "Lead Designer",  initials: "AC" },
                { name: "Maya Rodriguez", role: "UI Designer",    initials: "MR" },
              ].map((m) => (
                <div key={m.name} className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-purple-400 to-blue-400 flex items-center justify-center text-[10px] font-bold text-white">
                    {m.initials}
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-700 dark:text-gray-300">{m.name}</p>
                    <p className="text-[10px] text-gray-400 dark:text-gray-500">{m.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Drawer>

      <Drawer
        open={openDrawer === "bottom"}
        onClose={() => setOpenDrawer(null)}
        position="bottom"
        size="sm"
      >
        <div className="flex flex-col gap-1">
          <p className="text-sm font-semibold text-gray-800 dark:text-gray-100 mb-2 px-1">Quick Actions</p>
          {[
            { label: "Create new project",  icon: <Plus className="w-4 h-4" />,      color: "text-purple-600 dark:text-purple-400" },
            { label: "Import from CSV",     icon: <Download className="w-4 h-4" />,  color: "text-blue-600 dark:text-blue-400" },
            { label: "Share workspace",     icon: <Share2 className="w-4 h-4" />,    color: "text-emerald-600 dark:text-emerald-400" },
            { label: "View all templates",  icon: <FileText className="w-4 h-4" />,  color: "text-gray-600 dark:text-gray-400" },
          ].map((a) => (
            <button
              key={a.label}
              type="button"
              onClick={() => setOpenDrawer(null)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium w-full text-left hover:bg-white/50 dark:hover:bg-white/8 transition-all duration-150 ${a.color}`}
            >
              {a.icon}
              {a.label}
            </button>
          ))}
        </div>
      </Drawer>

      {/* ════════════════ STACKING TEST ════════════════ */}

      <Modal
        open={openStackModal}
        onClose={() => setOpenStackModal(false)}
        title="Stacking Test — Modal (z-200)"
        description="Open a nested overlay to test layering. Tooltip always wins."
        size="md"
        primaryAction={{ label: "Close", onClick: () => setOpenStackModal(false), variant: "ghost" }}
      >
        <div className="flex flex-col gap-4">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            This modal is at <code className="px-1.5 py-0.5 rounded-lg bg-purple-50/60 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 text-xs font-mono">z-200</code>. Open the nested modal to test stacking.
          </p>
          <div className="flex flex-wrap gap-3">
            <Tooltip content="Tooltip z-9999 — always on top" placement="top">
              <TriggerBtn>
                Hover for Tooltip
              </TriggerBtn>
            </Tooltip>

            <Dropdown
              trigger={
                <TriggerBtn variant="outline">
                  <ChevronDown className="w-4 h-4" /> Dropdown inside Modal
                </TriggerBtn>
              }
              items={[
                { id: "a", label: "Option A" },
                { id: "b", label: "Option B" },
                { id: "c", label: "Option C" },
              ]}
            />

            <TriggerBtn variant="primary" onClick={() => setOpenNestedModal(true)}>
              Open Nested Modal
            </TriggerBtn>
          </div>
        </div>
      </Modal>

      <Modal
        open={openNestedModal}
        onClose={() => setOpenNestedModal(false)}
        title="Nested Modal (z-200)"
        description="Both modals share z-modal. Last rendered wins (DOM order)."
        size="sm"
        primaryAction={{ label: "Close nested", onClick: () => setOpenNestedModal(false), variant: "primary" }}
      >
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Best practice: avoid nesting modals. Use a <strong className="text-gray-700 dark:text-gray-300">Drawer</strong> or step-based flow instead.
        </p>
      </Modal>

    </div>
  );
}
