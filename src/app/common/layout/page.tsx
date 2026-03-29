"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard, BarChart2, Users, FolderOpen,
  Settings, Bell, FileText, Shield, Zap, MessageSquare,
  TrendingUp, Package, CreditCard, HelpCircle,
} from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import type { NavItem, TopnavUser, BreadcrumbItem } from "@/components/layout/layout.types";

// ─── Demo Nav Items ───────────────────────────────────────────────────────────

const NAV_ITEMS: NavItem[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: <LayoutDashboard className="w-4 h-4" />,
    href: "/dashboard",
  },
  {
    id: "analytics",
    label: "Analytics",
    icon: <BarChart2 className="w-4 h-4" />,
    badge: 3,
    children: [
      { id: "analytics-overview",  label: "Overview",        icon: <TrendingUp className="w-3.5 h-3.5" /> },
      { id: "analytics-revenue",   label: "Revenue",         icon: <CreditCard className="w-3.5 h-3.5" /> },
      { id: "analytics-users",     label: "User Behaviour",  icon: <Users className="w-3.5 h-3.5" /> },
      { id: "analytics-events",    label: "Events",          icon: <Zap className="w-3.5 h-3.5" />, badge: 3 },
    ],
  },
  {
    id: "users",
    label: "Users",
    icon: <Users className="w-4 h-4" />,
    children: [
      { id: "users-all",       label: "All Users",   icon: <Users className="w-3.5 h-3.5" /> },
      { id: "users-roles",     label: "Roles",       icon: <Shield className="w-3.5 h-3.5" /> },
      { id: "users-invites",   label: "Invitations", icon: <MessageSquare className="w-3.5 h-3.5" /> },
    ],
  },
  {
    id: "content",
    label: "Content",
    icon: <FolderOpen className="w-4 h-4" />,
    children: [
      { id: "content-docs",     label: "Documents",    icon: <FileText className="w-3.5 h-3.5" /> },
      { id: "content-assets",   label: "Assets",       icon: <Package className="w-3.5 h-3.5" /> },
    ],
  },
  {
    id: "notifications",
    label: "Notifications",
    icon: <Bell className="w-4 h-4" />,
    badge: 12,
    href: "/notifications",
  },
  {
    id: "settings",
    label: "Settings",
    icon: <Settings className="w-4 h-4" />,
    children: [
      { id: "settings-general",  label: "General",    icon: <Settings className="w-3.5 h-3.5" /> },
      { id: "settings-security", label: "Security",   icon: <Shield className="w-3.5 h-3.5" /> },
      { id: "settings-billing",  label: "Billing",    icon: <CreditCard className="w-3.5 h-3.5" /> },
      { id: "settings-help",     label: "Help",       icon: <HelpCircle className="w-3.5 h-3.5" /> },
    ],
  },
];

const DEMO_USER: TopnavUser = {
  name: "Alex Johnson",
  email: "alex@company.io",
  role: "Product Manager",
};

// ─── Demo page content maps ───────────────────────────────────────────────────

const PAGE_TITLES: Record<string, string> = {
  dashboard:          "Dashboard",
  analytics:          "Analytics",
  "analytics-overview": "Analytics / Overview",
  "analytics-revenue":  "Analytics / Revenue",
  "analytics-users":    "Analytics / User Behaviour",
  "analytics-events":   "Analytics / Events",
  users:              "Users",
  "users-all":        "Users / All Users",
  "users-roles":      "Users / Roles",
  "users-invites":    "Users / Invitations",
  content:            "Content",
  "content-docs":     "Content / Documents",
  "content-assets":   "Content / Assets",
  notifications:      "Notifications",
  settings:           "Settings",
  "settings-general": "Settings / General",
  "settings-security":"Settings / Security",
  "settings-billing": "Settings / Billing",
  "settings-help":    "Settings / Help",
};

const PAGE_BREADCRUMBS: Record<string, BreadcrumbItem[]> = {
  "analytics-overview": [{ label: "Analytics", href: "#" }, { label: "Overview" }],
  "analytics-revenue":  [{ label: "Analytics", href: "#" }, { label: "Revenue" }],
  "analytics-users":    [{ label: "Analytics", href: "#" }, { label: "User Behaviour" }],
  "analytics-events":   [{ label: "Analytics", href: "#" }, { label: "Events" }],
  "users-all":          [{ label: "Users", href: "#" }, { label: "All Users" }],
  "users-roles":        [{ label: "Users", href: "#" }, { label: "Roles" }],
  "users-invites":      [{ label: "Users", href: "#" }, { label: "Invitations" }],
  content:             [{ label: "Content" }],
  "content-docs":       [{ label: "Content", href: "#" }, { label: "Documents" }],
  "content-assets":     [{ label: "Content", href: "#" }, { label: "Assets" }],
  "settings-general":   [{ label: "Settings", href: "#" }, { label: "General" }],
  "settings-security":  [{ label: "Settings", href: "#" }, { label: "Security" }],
  "settings-billing":   [{ label: "Settings", href: "#" }, { label: "Billing" }],
  "settings-help":      [{ label: "Settings", href: "#" }, { label: "Help" }],
};

// ─── Stat card ────────────────────────────────────────────────────────────────

function StatCard({ label, value, delta, color }: { label: string; value: string; delta?: string; color: string }) {
  return (
    <div className="bg-white/85 dark:bg-white/5 backdrop-blur-lg border border-purple-200 dark:border-purple-800/30 rounded-2xl shadow-sm hover:bg-white/95 dark:hover:bg-white/8 hover:shadow-md transition-all duration-150 p-5 flex flex-col gap-3">
      <p className="text-[11px] font-semibold uppercase tracking-widest text-neutral-400 dark:text-neutral-500">{label}</p>
      <p className={`text-3xl font-bold ${color}`}>{value}</p>
      {delta && (
        <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">{delta}</p>
      )}
    </div>
  );
}

// ─── Placeholder content per page ────────────────────────────────────────────

function PageContent({ activeId }: { activeId: string }) {
  if (activeId === "dashboard" || !activeId) {
    return (
      <div className="flex flex-col gap-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard label="Total Revenue"  value="$84,210"  delta="↑ 12.4% vs last month" color="text-neutral-800 dark:text-neutral-100" />
          <StatCard label="Active Users"   value="12,847"   delta="↑ 8.2% vs last month"  color="text-brand-700 dark:text-brand-300" />
          <StatCard label="Conversions"    value="3.6%"     delta="↑ 0.4pts"               color="text-emerald-700 dark:text-emerald-300" />
          <StatCard label="Pending Issues" value="24"       delta="↓ 6 resolved"           color="text-amber-700 dark:text-amber-300" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 bg-white/85 dark:bg-white/5 backdrop-blur-lg border border-purple-200 dark:border-purple-800/30 rounded-2xl shadow-sm hover:bg-white/95 dark:hover:bg-white/8 hover:shadow-md transition-all duration-150 p-5 h-52 flex items-center justify-center">
            <p className="text-sm text-neutral-400 dark:text-neutral-500 italic">Revenue chart placeholder</p>
          </div>
          <div className="bg-white/85 dark:bg-white/5 backdrop-blur-lg border border-purple-200 dark:border-purple-800/30 rounded-2xl shadow-sm hover:bg-white/95 dark:hover:bg-white/8 hover:shadow-md transition-all duration-150 p-5 h-52 flex items-center justify-center">
            <p className="text-sm text-neutral-400 dark:text-neutral-500 italic">Breakdown chart placeholder</p>
          </div>
        </div>
        <div className="bg-white/85 dark:bg-white/5 backdrop-blur-lg border border-purple-200 dark:border-purple-800/30 rounded-2xl shadow-sm hover:bg-white/95 dark:hover:bg-white/8 hover:shadow-md transition-all duration-150 p-5">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-neutral-400 dark:text-neutral-500 mb-4">Recent Activity</p>
          <div className="flex flex-col divide-y divide-white/15 dark:divide-white/8">
            {[
              { label: "New user signup",      time: "2m ago",  color: "bg-emerald-400" },
              { label: "Subscription renewed", time: "8m ago",  color: "bg-brand-400" },
              { label: "Report exported",      time: "15m ago", color: "bg-accent-400" },
              { label: "Alert triggered",      time: "34m ago", color: "bg-amber-400" },
            ].map((row) => (
              <div key={row.label} className="flex items-center gap-3 py-2.5">
                <span className={`w-2 h-2 rounded-full flex-shrink-0 ${row.color}`} />
                <span className="text-sm text-neutral-700 dark:text-neutral-300 flex-1">{row.label}</span>
                <span className="text-xs text-neutral-400 dark:text-neutral-500">{row.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="bg-white/85 dark:bg-white/5 backdrop-blur-lg border border-purple-200 dark:border-purple-800/30 rounded-2xl shadow-sm hover:bg-white/95 dark:hover:bg-white/8 hover:shadow-md transition-all duration-150 p-8 flex flex-col items-center justify-center gap-3 min-h-[280px]">
        <div className="w-12 h-12 rounded-2xl bg-brand-100/70 dark:bg-brand-900/30 flex items-center justify-center">
          <BarChart2 className="w-6 h-6 text-brand-600 dark:text-brand-400" />
        </div>
        <p className="text-base font-semibold text-neutral-800 dark:text-neutral-100">{PAGE_TITLES[activeId] ?? activeId}</p>
        <p className="text-sm text-neutral-400 dark:text-neutral-500 text-center max-w-xs">
          This is a placeholder for the <strong className="text-neutral-600 dark:text-neutral-300">{PAGE_TITLES[activeId] ?? activeId}</strong> page. Navigate using the sidebar to explore the layout system.
        </p>
      </div>
    </div>
  );
}

// ─── Showcase Page ────────────────────────────────────────────────────────────

export default function LayoutShowcasePage() {
  const [isDark, setIsDark]                 = useState(false);
  const [activeItemId, setActiveItemId]     = useState("dashboard");
  const [activeSubmenuId, setActiveSubmenuId] = useState<string | undefined>(undefined);

  const handleNavigate = (item: { id: string }) => {
    setActiveItemId(item.id);
    setActiveSubmenuId(item.id);
  };

  const title    = PAGE_TITLES[activeSubmenuId ?? activeItemId] ?? PAGE_TITLES[activeItemId] ?? "Dashboard";
  const crumbs   = PAGE_BREADCRUMBS[activeSubmenuId ?? activeItemId];

  return (
    <div
      className={cn(
        isDark ? "dark" : "",
        "bg-gradient-to-br from-[#f8f7ff] via-[#ffffff] to-[#f1f0ff]",
        "dark:bg-gradient-to-br dark:from-[#140f1f] dark:via-[#0f0a18] dark:to-[#0a0712]",
      )}
      style={{ height: "100vh", overflow: "hidden" }}
    >
      <AppLayout
        navItems={NAV_ITEMS}
        activeItemId={activeItemId}
        activeSubmenuId={activeSubmenuId}
        user={DEMO_USER}
        pageTitle={crumbs ? undefined : title}
        breadcrumbs={crumbs}
        notificationCount={12}
        onNavigate={handleNavigate}
        onSearch={(q) => console.log("search:", q)}
        onThemeToggle={() => setIsDark((d) => !d)}
        isDark={isDark}
      >
        <PageContent activeId={activeSubmenuId ?? activeItemId} />
      </AppLayout>
    </div>
  );
}
