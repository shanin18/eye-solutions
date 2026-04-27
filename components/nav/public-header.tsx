"use client";

import type { Route } from "next";
import { Menu, X } from "lucide-react";
import { useState } from "react";

import { BrandMark } from "@/components/nav/brand-mark";
import { AppLink } from "@/components/navigation/navigation-progress";
import { cn } from "@/lib/utils";

const publicLinks: Array<{ href: Route; label: string }> = [
  { href: "/", label: "Home" },
  { href: "/doctors", label: "Doctors" },
  { href: "/services", label: "Services" },
  { href: "/products", label: "Products" },
  { href: "/book-appointment", label: "Book" }
];

export function PublicHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="sticky top-0 z-30 border-b border-border/70 bg-background/80 backdrop-blur">
      <div className="shell flex items-center justify-between gap-4 py-4">
        <BrandMark />

        <div className="hidden items-center gap-2 lg:flex">
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
          <AppLink className="button-secondary" href="/login">
            Login
          </AppLink>
          <AppLink className="button" href="/register">
            Register
          </AppLink>
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
            <div className="grid gap-3 pt-2">
              <AppLink className="button-secondary justify-center" href="/login" onClick={closeMenu}>
                Login
              </AppLink>
              <AppLink className="button justify-center" href="/register" onClick={closeMenu}>
                Register
              </AppLink>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
