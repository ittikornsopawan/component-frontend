"use client";

import React, { useState, useCallback, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Sidenav } from "./Sidenav";
import { ContextPanel } from "./ContextPanel";
import { Topnav } from "./Topnav";
import { Drawer } from "@/components/overlay/Drawer";
import type { AppLayoutProps, LayoutState, NavItem, ContextNavItem } from "./layout.types";

// ─── Breadcrumbs ──────────────────────────────────────────────────────────────

function Breadcrumbs({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1">
      {items.map((item, i) => (
        <React.Fragment key={i}>
          {i > 0 && (
            <span className="text-gray-400 dark:text-gray-500 mx-1 select-none">/</span>
          )}
          {item.href ? (
            <a
              href={item.href}
              className="text-sm text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
            >
              {item.label}
            </a>
          ) : (
            <span className="text-sm text-gray-900 dark:text-gray-100 font-medium">{item.label}</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
}

// ─── AppLayout ────────────────────────────────────────────────────────────────

export function AppLayout({
  children,
  navItems,
  activeItemId,
  activeSubmenuId,
  user,
  pageTitle,
  breadcrumbs,
  notificationCount,
  onNavigate,
  onSearch,
  onThemeToggle,
  isDark,
  className,
}: AppLayoutProps) {
  // Create route-to-title mapping from navItems
  const routeToTitleMap = React.useMemo(() => {
    const map: Record<string, string> = {};
    
    navItems.forEach(item => {
      // Add main menu item
      if (item.href) {
        map[item.href] = item.label;
      }
      
      // Add submenu items
      if (item.children) {
        item.children.forEach(child => {
          // Create route path (assuming kebab-case conversion)
          const route = `/${item.id}-${child.id.replace(item.id + '-', '')}`;
          map[route] = child.label;
        });
      }
    });
    
    return map;
  }, [navItems]);

  // Get title from activeItemId with fallback
  const getTitleFromActiveId = React.useCallback((activeId?: string) => {
    if (!activeId) return pageTitle || 'Dashboard';
    
    // Find the item in navItems
    for (const item of navItems) {
      // Check main menu item
      if (item.id === activeId) {
        return item.label;
      }
      
      // Check submenu items
      if (item.children) {
        const child = item.children.find(c => c.id === activeId);
        if (child) {
          return child.label;
        }
      }
    }
    
    // Fallback to pageTitle or safe default
    return pageTitle || 'Dashboard';
  }, [navItems, pageTitle]);

  const [state, setState] = useState<LayoutState>({
    isCollapsed:      false,
    activeMenuId:     null, // Don't set from activeItemId initially
    contextPanelOpen: false,
    activeSubmenuId:  activeSubmenuId ?? null,
    mobileNavOpen:    false,
    isInitialized:    false, // Track if we've done initial setup
  });

  // Set menu from page content on initialization only
  useEffect(() => {
    if (activeItemId && !state.isInitialized) {
      // Find the menu that contains this active item
      const parentMenu = navItems.find(nav => 
        nav.id === activeItemId || nav.children?.some(child => child.id === activeItemId)
      );
      setState((s) => ({ 
        ...s, 
        activeMenuId: parentMenu?.id || activeItemId,
        isInitialized: true
      }));
    }
  }, [activeItemId, navItems, state.isInitialized]);

  // Close context panel on ESC (handled inside ContextPanel too, but belt + braces)
  const handleToggleCollapse = useCallback(() => {
    setState((s) => ({ ...s, isCollapsed: !s.isCollapsed }));
  }, []);

  const handleNavItemClick = useCallback((item: NavItem) => {
    const hasChildren = !!item.children?.length;
    if (hasChildren) {
      // Open context panel for this menu
      setState((s) => ({
        ...s,
        activeMenuId:     item.id, // Set active menu when opening its panel
        contextPanelOpen: true,
        activeSubmenuId:  null, // Reset submenu when switching menus
      }));
    } else {
      // Navigate to the item
      setState((s) => ({
        ...s,
        activeMenuId:     item.id,
        contextPanelOpen: false,
        activeSubmenuId:  null,
      }));
      onNavigate?.(item);
    }
  }, [onNavigate]);

  const handleSubmenuClick = useCallback((item: ContextNavItem) => {
    // Find which parent menu this submenu item belongs to
    const parentMenu = navItems.find(nav => 
      nav.children?.some(child => child.id === item.id)
    );
    
    setState((s) => ({ 
      ...s, 
      activeMenuId: parentMenu?.id || s.activeMenuId,
      activeSubmenuId: item.id, 
      contextPanelOpen: false 
    }));
    onNavigate?.(item);
  }, [onNavigate, navItems]);

  const handleContextPanelClose = useCallback(() => {
    setState((s) => ({ ...s, contextPanelOpen: false }));
  }, []);

  const handleMobileNavOpen = useCallback(() => {
    setState((s) => ({ ...s, mobileNavOpen: true }));
  }, []);

  const handleMobileNavClose = useCallback(() => {
    setState((s) => ({ ...s, mobileNavOpen: false }));
  }, []);

  const activeNavItem = navItems.find((item) => item.id === state.activeMenuId) ?? null;

  return (
    <div className={cn("flex h-screen overflow-hidden", className)}>

      {/* ── Desktop Sidenav ── */}
      <div className="hidden lg:flex flex-shrink-0">
        <Sidenav
          items={navItems}
          activeItemId={state.activeMenuId ?? undefined}
          isCollapsed={state.isCollapsed}
          isDark={isDark}
          onItemClick={handleNavItemClick}
          onToggleCollapse={handleToggleCollapse}
          onThemeToggle={onThemeToggle}
        />
      </div>

      {/* ── Context Panel (desktop) ── */}
      {state.contextPanelOpen && activeNavItem && (
        <div className="hidden lg:flex flex-shrink-0">
          <ContextPanel
            open={state.contextPanelOpen}
            activeItem={activeNavItem}
            activeSubmenuId={state.activeSubmenuId ?? undefined}
            onSubmenuClick={handleSubmenuClick}
            onClose={handleContextPanelClose}
          />
        </div>
      )}

      {/* ── Main column ── */}
      <div className="flex flex-col flex-1 min-w-0 h-full overflow-hidden">
        <Topnav
          pageTitle={getTitleFromActiveId(activeItemId)}
          user={user}
          notificationCount={notificationCount}
          onSearch={onSearch}
          onMobileMenuOpen={handleMobileNavOpen}
          onToggleCollapse={handleToggleCollapse}
          isCollapsed={state.isCollapsed}
        />

        {/* Content area */}
        <main
          role="main"
          className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden bg-gradient-to-br from-[#f8f7ff] via-[#ffffff] to-[#f1f0ff] dark:from-[#140f1f] dark:via-[#0f0a18] dark:to-[#0a0712] relative"
        >
          {/* Optional glow layer */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/10 blur-3xl -z-10 pointer-events-none" />
          <div className="p-6 lg:p-8 h-full relative z-0">
            {/* Breadcrumbs */}
            {breadcrumbs && breadcrumbs.length > 0 && (
              <div className="mb-4">
                <Breadcrumbs items={breadcrumbs} />
              </div>
            )}
            {children}
          </div>
        </main>
      </div>

      {/* ── Mobile Drawer Sidenav ── */}
      <Drawer
        open={state.mobileNavOpen}
        onClose={handleMobileNavClose}
        position="left"
        size="md"
        title="Navigation"
      >
        <Sidenav
          items={navItems}
          activeItemId={state.activeMenuId ?? undefined}
          isCollapsed={false}
          onItemClick={handleNavItemClick}
          onThemeToggle={onThemeToggle}
          onToggleCollapse={() => {}}
        />
      </Drawer>

      {/* ── Mobile Context Panel (portal overlay) ── */}
      {state.contextPanelOpen && activeNavItem && typeof window !== "undefined" && (
        <div className="fixed inset-0 z-[100] pointer-events-none lg:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/20 pointer-events-auto"
            onClick={handleContextPanelClose}
          />
          {/* Slide-in panel */}
          <div className="absolute right-0 top-0 h-full w-72 bg-[#f4f2ff]/95 dark:bg-[#1a1328]/90 backdrop-blur-xl border-l border-purple-100 dark:border-white/10 pointer-events-auto">
            <ContextPanel
              open={state.contextPanelOpen}
              activeItem={activeNavItem}
              activeSubmenuId={state.activeSubmenuId ?? undefined}
              onSubmenuClick={handleSubmenuClick}
              onClose={handleContextPanelClose}
              className="h-full"
            />
          </div>
        </div>
      )}

    </div>
  );
}
