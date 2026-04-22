"use client";

import Link, { type LinkProps } from "next/link";
import { createContext, type MouseEvent, type ReactNode, useContext, useEffect, useMemo, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";

type NavigationProgressContextValue = {
  startNavigation: () => void;
};

const NavigationProgressContext = createContext<NavigationProgressContextValue | null>(null);

export function NavigationProgressProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!loading) {
      return;
    }

    const timeout = window.setTimeout(() => {
      setLoading(false);
    }, 450);

    return () => window.clearTimeout(timeout);
  }, [pathname, searchParams, loading]);

  useEffect(() => {
    if (!loading) {
      return;
    }

    const failSafe = window.setTimeout(() => {
      setLoading(false);
    }, 8000);

    return () => window.clearTimeout(failSafe);
  }, [loading]);

  const value = useMemo(
    () => ({
      startNavigation: () => setLoading(true)
    }),
    []
  );

  return (
    <NavigationProgressContext.Provider value={value}>
      {children}
      {loading ? (
        <div className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center bg-background/45 backdrop-blur-[2px]">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary/20 border-t-primary" />
        </div>
      ) : null}
    </NavigationProgressContext.Provider>
  );
}

export function useNavigationProgress() {
  const context = useContext(NavigationProgressContext);

  if (!context) {
    throw new Error("useNavigationProgress must be used within NavigationProgressProvider.");
  }

  return context;
}

type AppLinkProps = LinkProps & {
  children: ReactNode;
  className?: string;
  prefetch?: boolean | null;
  onClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
};

export function AppLink({ children, onClick, href, ...props }: AppLinkProps) {
  const { startNavigation } = useNavigationProgress();

  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    onClick?.(event);

    if (event.defaultPrevented) {
      return;
    }

    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) {
      return;
    }

    startNavigation();
  }

  return (
    <Link href={href} onClick={handleClick} {...props}>
      {children}
    </Link>
  );
}
