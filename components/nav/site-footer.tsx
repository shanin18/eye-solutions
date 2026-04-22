import type { Route } from "next";

import { AppLink } from "@/components/navigation/navigation-progress";

const footerLinks: Array<{ href: Route; label: string }> = [
  { href: "/", label: "Home" },
  { href: "/doctors", label: "Doctors" },
  { href: "/services", label: "Services" },
  { href: "/products", label: "Products" },
  { href: "/book-appointment", label: "Book Appointment" }
];

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-border/70 bg-white/60">
      <div className="shell flex flex-col gap-6 py-8 md:flex-row md:items-center md:justify-between">
        <div className="space-y-2">
          <p className="text-sm font-semibold text-foreground">Eye Solutions</p>
        </div>

        <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
          {footerLinks.map((link) => (
            <AppLink className="transition hover:text-primary" href={link.href} key={link.href}>
              {link.label}
            </AppLink>
          ))}
        </div>
      </div>
    </footer>
  );
}
