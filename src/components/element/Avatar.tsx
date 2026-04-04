"use client";

import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  size?: "sm" | "md" | "lg" | "xl";
  initials?: string;
  fallback?: React.ReactNode;
}

const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  ({ className, src, alt, size = "md", initials, fallback, ...props }, ref) => {
    const sizeClasses = {
      sm: "w-8 h-8 text-xs",
      md: "w-10 h-10 text-sm",
      lg: "w-12 h-12 text-base",
      xl: "w-16 h-16 text-lg",
    };

    if (src) {
      return (
        <div
          ref={ref}
          className={cn(
            "relative overflow-hidden rounded-full bg-neutral-200 dark:bg-neutral-700",
            sizeClasses[size],
            className
          )}
          {...props}
        >
          <img
            src={src}
            alt={alt}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
        </div>
      );
    }

    if (initials) {
      return (
        <div
          ref={ref}
          className={cn(
            "flex items-center justify-center rounded-full bg-brand-500 text-white font-semibold",
            sizeClasses[size],
            className
          )}
          {...props}
        >
          {initials}
        </div>
      );
    }

    if (fallback) {
      return (
        <div
          ref={ref}
          className={cn(
            "flex items-center justify-center rounded-full bg-neutral-200 dark:bg-neutral-700",
            sizeClasses[size],
            className
          )}
          {...props}
        >
          {fallback}
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center justify-center rounded-full bg-neutral-200 dark:bg-neutral-700",
          sizeClasses[size],
          className
        )}
        {...props}
      >
        <svg className="w-1/2 h-1/2 text-neutral-400 dark:text-neutral-500" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
        </svg>
      </div>
    );
  }
);

Avatar.displayName = "Avatar";

export default Avatar;
