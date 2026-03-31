"use client";

import React, { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  Type, 
  Box, 
  FileText, 
  Layers,
  ChevronRight,
  Home,
  Palette,
  Settings,
  Zap
} from "lucide-react";

interface DemoLayoutProps {
  children: React.ReactNode;
  title: string;
  description?: string;
  currentSection?: string;
}

const demoSections = [
  {
    id: "input",
    title: "Input System",
    description: "Form controls & input components",
    icon: Type,
    href: "/common/input",
    color: "purple"
  },
  {
    id: "element", 
    title: "Element System",
    description: "Display & feedback components",
    icon: Box,
    href: "/common/element",
    color: "blue"
  },
  {
    id: "document",
    title: "Document System", 
    description: "PDF viewing & annotations",
    icon: FileText,
    href: "/common/document",
    color: "emerald"
  },
  {
    id: "overlay",
    title: "Overlay System",
    description: "Modals, tooltips & popovers", 
    icon: Layers,
    href: "/common/overlay",
    color: "amber"
  },
  {
    id: "layout",
    title: "Layout Theme",
    description: "Navigation & layout components",
    icon: LayoutDashboard,
    href: "/common/layout", 
    color: "indigo"
  },
  {
    id: "tokens",
    title: "Design Tokens",
    description: "Colors, spacing & motion",
    icon: Palette,
    href: "/common/tokens",
    color: "pink"
  }
];

export function DemoLayout({ children, title, description, currentSection }: DemoLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50/80 via-purple-50/30 to-blue-50/50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Background glow effect */}
      <div className="fixed inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5 blur-3xl -z-10" />
      
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/50 dark:bg-white/5 backdrop-blur-xl border-b border-white/20 dark:border-white/10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo & Nav */}
            <div className="flex items-center gap-8">
              <Link 
                href="/"
                className="flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-white hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
              >
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-purple-400 to-blue-400 flex items-center justify-center">
                  <Zap className="w-4 h-4 text-white" />
                </div>
                Liquid Glass
              </Link>
              
              <nav className="hidden md:flex items-center gap-1">
                {demoSections.map((section) => {
                  const Icon = section.icon;
                  const isActive = currentSection === section.id;
                  return (
                    <Link
                      key={section.id}
                      href={section.href}
                      className={cn(
                        "flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200",
                        isActive
                          ? `bg-${section.color}-100/70 dark:bg-${section.color}-900/30 text-${section.color}-700 dark:text-${section.color}-300`
                          : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-white/40 dark:hover:bg-white/8"
                      )}
                    >
                      <Icon className="w-4 h-4" />
                      {section.title}
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-white/40 dark:hover:bg-white/8"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className={cn(
          "fixed md:sticky top-16 left-0 z-30 w-64 h-[calc(100vh-4rem)] bg-white/60 dark:bg-white/5 backdrop-blur-xl border-r border-white/20 dark:border-white/10 transform transition-transform duration-200 ease-out",
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}>
          <div className="p-4 space-y-2">
            <div className="px-3 py-2">
              <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Demo Sections</h3>
            </div>
            
            {demoSections.map((section) => {
              const Icon = section.icon;
              const isActive = currentSection === section.id;
              return (
                <Link
                  key={section.id}
                  href={section.href}
                  onClick={() => setSidebarOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200",
                    isActive
                      ? `bg-${section.color}-100/70 dark:bg-${section.color}-900/30 text-${section.color}-700 dark:text-${section.color}-300 shadow-sm`
                      : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-white/40 dark:hover:bg-white/8"
                  )}
                >
                  <Icon className="w-4 h-4" />
                  <div className="flex-1">
                    <div>{section.title}</div>
                    <div className="text-xs opacity-60">{section.description}</div>
                  </div>
                  {isActive && <ChevronRight className="w-4 h-4" />}
                </Link>
              );
            })}
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-6 lg:p-8">
          {/* Page header */}
          <div className="mb-8">
            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-2">
              <Link href="/" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                <Home className="w-4 h-4" />
              </Link>
              <span>/</span>
              <span>Common</span>
              {currentSection && <span>/</span>}
              {currentSection && <span className="capitalize text-gray-900 dark:text-white">{currentSection}</span>}
            </div>
            
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {title}
            </h1>
            
            {description && (
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl">
                {description}
              </p>
            )}
          </div>

          {/* Page content */}
          <div className="space-y-8">
            {children}
          </div>
        </main>
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-20 bg-black/25 dark:bg-black/50 backdrop-blur-sm md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
