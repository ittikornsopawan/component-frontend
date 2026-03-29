"use client";

import React, { useState, useRef, useEffect } from "react";
import { Search, Bell, ChevronRight, ChevronDown, Menu, Settings, LogOut, User, HelpCircle, PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { cn } from "@/lib/utils";
import { glass, motion, focus, typography, color } from "@/styles/tokens";
import { Dropdown, Modal } from "@/components/overlay";
import type { TopnavProps } from "./layout.types";

// ─── Avatar ───────────────────────────────────────────────────────────────────

function Avatar({ name, url, size = "sm" }: { name: string; url?: string; size?: "sm" | "md" }) {
  const initials = name.split(" ").slice(0, 2).map((n) => n[0]).join("").toUpperCase();
  const sz = size === "sm" ? "w-8 h-8 text-xs" : "w-10 h-10 text-sm";
  if (url) {
    return (
      <img
        src={url}
        alt={name}
        className={cn(sz, "rounded-full object-cover ring-2 ring-white/20 flex-shrink-0")}
      />
    );
  }
  return (
    <div
      className={cn(
        sz,
        "rounded-full flex items-center justify-center flex-shrink-0",
        "bg-gradient-to-br from-brand-400 to-brand-600 text-gray-900 dark:text-gray-100 font-semibold",
        "ring-2 ring-white/20",
      )}
    >
      {initials}
    </div>
  );
}

// ─── Breadcrumbs ──────────────────────────────────────────────────────────────

function Breadcrumbs({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1">
      {items.map((item, i) => (
        <React.Fragment key={item.label}>
          {i > 0 && <ChevronRight className="w-3 h-3 text-neutral-400 dark:text-neutral-600 flex-shrink-0" />}
          {item.href && i < items.length - 1 ? (
            <a
              href={item.href}
              className={cn(
                "text-sm text-neutral-500 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200",
                motion.fast,
              )}
            >
              {item.label}
            </a>
          ) : (
            <span className={cn(typography.preset.label, i === items.length - 1 ? "text-neutral-800 dark:text-neutral-100" : "")}>
              {item.label}
            </span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
}

// ─── Topnav ───────────────────────────────────────────────────────────────────

export function Topnav({
  pageTitle,
  user,
  notificationCount,
  onSearch,
  onMobileMenuOpen,
  onToggleCollapse,
  isCollapsed,
  className,
}: TopnavProps) {
  // Extract last breadcrumb item for display from page title only
  const menuName = pageTitle?.split(' / ').pop() || pageTitle;
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);
  const [displayTitle, setDisplayTitle] = useState(menuName);
  const [isTitleAnimating, setIsTitleAnimating] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(searchQuery);
  };

  // Animate title change
  useEffect(() => {
    if (menuName !== displayTitle) {
      setIsTitleAnimating(true);
      const timer = setTimeout(() => {
        setDisplayTitle(menuName);
        setIsTitleAnimating(false);
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [menuName, displayTitle]);

  const hasBadge = notificationCount != null && notificationCount > 0;

  // Profile dropdown trigger (forwardRef-compatible button)
  const ProfileTrigger = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
    (props, ref) => (
      <button
        ref={ref}
        type="button"
        aria-label="Open profile menu"
        className={cn(
          "flex items-center gap-2 rounded-2xl pl-1 pr-2.5 py-1",
          "hover:bg-purple-200/20",
          focus.brand,
          motion.fast,
        )}
        {...props}
      >
        {user && <Avatar name={user.name} url={user.avatarUrl} />}
        {user && (
          <div className="hidden sm:flex flex-col items-start min-w-0">
            <span className="text-sm font-semibold text-neutral-800 dark:text-neutral-100 leading-none truncate max-w-[120px]">
              {user.name}
            </span>
            {user.role && (
              <span className="text-[11px] text-neutral-400 dark:text-neutral-500 leading-none mt-0.5">
                {user.role}
              </span>
            )}
          </div>
        )}
      </button>
    )
  );
  ProfileTrigger.displayName = "ProfileTrigger";

  return (
    <header
      className={cn(
        "h-16 flex items-center gap-3 px-5 flex-shrink-0 z-sticky",
        "bg-white/85 dark:bg-[#0f0817]/85 backdrop-blur-lg",
        "border-b border-purple-200 dark:border-purple-800/30",
        className,
      )}
    >
      {/* Mobile menu toggle */}
      <button
        type="button"
        onClick={onMobileMenuOpen}
        aria-label="Open navigation menu"
        className={cn(
          "lg:hidden w-9 h-9 flex items-center justify-center rounded-xl",
          "text-gray-800 dark:text-gray-200 hover:text-purple-500",
          "hover:bg-purple-200/20",
          focus.brand,
          motion.fast,
        )}
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Left — collapse + title */}
      <div className="flex items-center gap-3 flex-1 min-w-0">
        {/* Desktop collapse button - always visible with dynamic icon */}
        <button
          type="button"
          onClick={onToggleCollapse}
          className={cn(
            "hidden lg:flex w-8 h-8 items-center justify-center rounded-xl",
            "text-gray-500 dark:text-gray-400",
            "hover:text-purple-600 dark:hover:text-purple-400",
            "hover:bg-purple-100/30 dark:hover:bg-purple-800/20",
            focus.brand,
            motion.fast,
          )}
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isCollapsed ? <PanelLeftOpen className="w-4 h-4" /> : <PanelLeftClose className="w-4 h-4" />}
        </button>
        
        {/* Title */}
        {displayTitle && (
          <h1 
            className={cn(
              typography.preset["page-title"], 
              "text-lg truncate",
              "transition-all duration-300 ease-out",
              isTitleAnimating ? "opacity-0 transform -translate-y-1" : "opacity-100 transform translate-y-0"
            )}
          >
            {displayTitle}
          </h1>
        )}
      </div>

      {/* Centre — Search */}
      {onSearch && (
        <form
          onSubmit={handleSearch}
          className={cn(
            "hidden md:flex items-center gap-2 rounded-2xl px-3 h-9",
            "border transition-all duration-200 ease-out",
            searchFocused
              ? "bg-white/80 dark:bg-white/10 border-brand-300/40 dark:border-brand-500/30 shadow-glass-sm w-64"
              : "bg-white/40 dark:bg-white/5 border-white/25 dark:border-white/10 w-48",
          )}
        >
          <Search
            className={cn(
              "w-3.5 h-3.5 flex-shrink-0",
              motion.fast,
              searchFocused ? "text-brand-500" : "text-blue-500",
            )}
          />
          <input
            ref={searchRef}
            type="search"
            placeholder="Search…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            className="flex-1 bg-transparent text-sm text-neutral-700 dark:text-neutral-200 placeholder:text-neutral-400 dark:placeholder:text-neutral-600 outline-none min-w-0"
          />
        </form>
      )}

      {/* Right — Actions */}
      <div className="flex items-center gap-1.5">
        {/* Notification bell */}
        <button
          type="button"
          aria-label={hasBadge ? `${notificationCount} notifications` : "Notifications"}
          className={cn(
            "relative w-9 h-9 flex items-center justify-center rounded-xl",
            "text-gray-900 dark:text-gray-100 hover:text-purple-600 dark:hover:text-purple-400",
            "hover:bg-purple-100/30 dark:hover:bg-purple-800/20",
            focus.brand,
            motion.fast,
          )}
        >
          <Bell className="w-4 h-4" />
          {hasBadge && (
            <span className="absolute top-1.5 right-1.5 min-w-[16px] h-4 px-0.5 flex items-center justify-center rounded-full bg-brand-500 text-[9px] font-bold text-white leading-none">
              {notificationCount! > 99 ? "99+" : notificationCount}
            </span>
          )}
        </button>

        {/* Divider */}
        <div className="w-px h-5 bg-white/20 dark:bg-white/10 mx-1" />

        {/* Profile dropdown */}
        {user && (
          <Dropdown
            placement="bottom-end"
            trigger={
              <button
                type="button"
                className={cn(
                  "flex items-center gap-2 px-3 py-1.5 rounded-xl",
                  "text-gray-900 dark:text-gray-100",
                  "hover:bg-purple-100/30 dark:hover:bg-purple-800/20",
                  focus.brand,
                  motion.fast,
                )}
              >
                <Avatar name={user.name} url={user.avatarUrl} />
                <span className="hidden sm:block text-sm font-medium truncate max-w-[120px]">{user.name}</span>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </button>
            }
            items={[
              {
                id: "profile",
                label: user.name,
                description: user.email,
                icon: <User className="w-3.5 h-3.5" />,
              },
              "separator",
              { id: "settings", label: "Settings", icon: <Settings className="w-3.5 h-3.5" />, shortcut: "⌘," },
              { id: "help", label: "Help & docs", icon: <HelpCircle className="w-3.5 h-3.5" /> },
              "separator",
              {
                id: "logout",
                label: "Logout",
                icon: <LogOut className="w-3.5 h-3.5" />,
                onClick: () => setLogoutModalOpen(true),
              },
            ]}
          />
        )}
      </div>
      
      {/* Logout Confirmation Modal */}
      <Modal
        open={logoutModalOpen}
        onClose={() => setLogoutModalOpen(false)}
        variant="confirmation"
        size="sm"
        title="Logout"
        description="Are you sure you want to logout?"
        icon={<LogOut className="w-5 h-5" />}
        primaryAction={{
          label: "Logout",
          onClick: () => {
            console.log('User logged out');
            setLogoutModalOpen(false);
          },
          variant: "danger",
        }}
        secondaryAction={{
          label: "Cancel",
          onClick: () => setLogoutModalOpen(false),
          variant: "ghost",
        }}
        closeOnBackdrop={true}
        showCloseButton={false}
      />
    </header>
  );
}
