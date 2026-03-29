"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";

export interface BreadcrumbItemProps {
  href?: string;
  current?: boolean;
  className?: string;
  children: React.ReactNode;
}

export interface BreadcrumbProps {
  separator?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
}

export function BreadcrumbItem({ href, current = false, className, children }: BreadcrumbItemProps) {
  if (current || !href) {
    return (
      <li aria-current={current ? "page" : undefined} className={cn("flex items-center", className)}>
        <span className="text-sm font-medium text-gray-800 dark:text-gray-200 truncate max-w-[160px]">
          {children}
        </span>
      </li>
    );
  }
  return (
    <li className={cn("flex items-center", className)}>
      <a
        href={href}
        className="text-sm text-gray-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-150 truncate max-w-[160px]"
      >
        {children}
      </a>
    </li>
  );
}

export function Breadcrumb({ separator, className, children }: BreadcrumbProps) {
  const items = React.Children.toArray(children);
  const sep = separator ?? <ChevronRight className="w-3.5 h-3.5 text-gray-300 dark:text-gray-600 flex-shrink-0" />;

  return (
    <nav aria-label="Breadcrumb">
      <ol className={cn("flex items-center flex-wrap gap-1", className)}>
        {items.map((child, i) => (
          <React.Fragment key={i}>
            {child}
            {i < items.length - 1 && (
              <li aria-hidden="true" className="flex items-center mx-0.5">{sep}</li>
            )}
          </React.Fragment>
        ))}
      </ol>
    </nav>
  );
}
