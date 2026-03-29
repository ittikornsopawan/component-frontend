"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

export interface PortalProps {
  children: React.ReactNode;
  container?: HTMLElement | null;
}

export function Portal({ children, container }: PortalProps) {
  const [mounted, setMounted] = useState(false);
  const defaultContainer = useRef<HTMLElement | null>(null);

  useEffect(() => {
    defaultContainer.current = document.body;
    setMounted(true);
    return () => { setMounted(false); };
  }, []);

  if (!mounted) return null;
  const target = container ?? defaultContainer.current;
  if (!target) return null;

  return createPortal(children, target);
}
