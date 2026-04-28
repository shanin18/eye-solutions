"use client";

import { Menu, X } from "lucide-react";
import { useState } from "react";

import { BrandMark } from "@/components/nav/brand-mark";
import { LogoutButton } from "@/components/nav/logout-button";
import { AppLink } from "@/components/navigation/navigation-progress";
import type { SessionUser } from "@/lib/auth/session";
import { publicLinks } from "@/lib/navigation/public-links";
import { cn } from "@/lib/utils";

type PrivateHeaderClientProps = {
  user: SessionUser | null;
};

export function PrivateHeaderClient({ user }: PrivateHeaderClientProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="sticky top-0 z-20 border-b border-border/70 bg-background/80 backdrop-blur">
      <div className="shell flex items-center justify-between gap-4 py-4">
        <BrandMark />

        <nav className="hidden items-center gap-2 lg:flex" aria-label="Public navigation">
          {publicLinks.map((link) => (
            <AppLink
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition hover:bg-primary/10 hover:text-primary"
              )}
              href={link.href}
              key={link.href}
            >
              {link.label}
            </AppLink>
          ))}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          {user ? (
            <div className="text-right">
              <p className="text-sm font-semibold text-foreground">{user.fullName}</p>
              <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">{user.role.replace("_", " ")}</p>
            </div>
          ) : null}
          <LogoutButton />
        </div>

        <button
          aria-expanded={isMenuOpen}
          aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-primary/10 bg-white/80 text-primary transition hover:bg-primary/10 lg:hidden"
          onClick={() => setIsMenuOpen((current) => !current)}
          type="button"
        >
          {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {isMenuOpen ? (
        <div className="shell pb-4 lg:hidden">
          <div className="mobile-nav-panel">
            {publicLinks.map((link) => (
              <AppLink
                className={cn(
                  "rounded-2xl px-4 py-3 text-sm font-medium text-muted-foreground transition hover:bg-primary/10 hover:text-primary"
                )}
                href={link.href}
                key={link.href}
                onClick={closeMenu}
              >
                {link.label}
              </AppLink>
            ))}

            {user ? (
              <div className="grid gap-3 border-t border-border/80 pt-3">
                <div className="px-1">
                  <p className="text-sm font-semibold text-foreground">{user.fullName}</p>
                  <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">{user.role.replace("_", " ")}</p>
                </div>
                <LogoutButton />
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
    </header>
  );
}
