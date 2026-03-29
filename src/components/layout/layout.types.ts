// ─── Layout System — Type Definitions ────────────────────────────────────────

import { type ReactNode } from "react";

// ─── Navigation Item ──────────────────────────────────────────────────────────

export interface NavItem {
  id:          string;
  label:       string;
  icon:        ReactNode;
  href?:       string;
  badge?:      string | number;
  badgeVariant?: "primary" | "error" | "warning" | "success";
  children?:   ContextNavItem[];
  disabled?:   boolean;
  /** Items with children open the ContextPanel on click */
}

export interface ContextNavItem {
  id:      string;
  label:   string;
  href?:   string;
  icon?:   ReactNode;
  badge?:  string | number;
  disabled?: boolean;
}

export interface ContextNavGroup {
  id:     string;
  title?: string;
  items:  ContextNavItem[];
}

// ─── Breadcrumb ───────────────────────────────────────────────────────────────

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

// ─── Topnav User ─────────────────────────────────────────────────────────────

export interface TopnavUser {
  name:      string;
  email?:    string;
  avatarUrl?: string;
  role?:     string;
}

// ─── Layout State ─────────────────────────────────────────────────────────────

export interface LayoutState {
  isCollapsed:       boolean;
  activeMenuId:      string | null;
  contextPanelOpen:  boolean;
  activeSubmenuId:   string | null;
  mobileNavOpen:     boolean;
  isInitialized:     boolean;
}

// ─── Component Props ─────────────────────────────────────────────────────────

export interface AppLayoutProps {
  children:       ReactNode;
  navItems:       NavItem[];
  /** Active nav item id — controlled externally (router) */
  activeItemId?:  string;
  /** Active submenu item id */
  activeSubmenuId?: string;
  user?:          TopnavUser;
  /** Page title shown in Topnav */
  pageTitle?:     string;
  breadcrumbs?:   BreadcrumbItem[];
  notificationCount?: number;
  onNavigate?:    (item: NavItem | ContextNavItem) => void;
  onSearch?:      (query: string) => void;
  onThemeToggle?: () => void;
  isDark?:        boolean;
  className?:     string;
}

export interface SidenavProps {
  items:          NavItem[];
  activeItemId?:  string;
  isCollapsed:    boolean;
  isDark?:        boolean;
  onItemClick:    (item: NavItem) => void;
  onToggleCollapse: () => void;
  onThemeToggle?: () => void;
  className?:     string;
}

export interface ContextPanelProps {
  open:            boolean;
  activeItem:      NavItem | null;
  activeSubmenuId?: string;
  onSubmenuClick:  (item: ContextNavItem) => void;
  onClose:         () => void;
  className?:      string;
}

export interface TopnavProps {
  pageTitle?:        string;
  user?:             TopnavUser;
  notificationCount?: number;
  onSearch?:         (query: string) => void;
  onMobileMenuOpen?: () => void;
  onToggleCollapse?: () => void;
  isCollapsed?:      boolean;
  className?:        string;
}

export interface SidebarItemProps {
  item:        NavItem;
  isActive:    boolean;
  isCollapsed: boolean;
  onClick:     (item: NavItem) => void;
}

export interface SidebarTooltipProps {
  content: string;
  children: ReactNode;
  side?: "right";
}
