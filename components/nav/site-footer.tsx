import type { Route } from "next";
import { Clock3, HeartPulse, MapPin, Phone } from "lucide-react";

import { BrandMark } from "@/components/nav/brand-mark";
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
    <footer className="mt-20 border-t border-border/70 bg-white/70">
      <div className="shell py-10">
        <div className="footer-grid">
          <div className="space-y-4">
            <BrandMark />
            <p className="max-w-sm text-sm leading-7 text-muted-foreground">
              Eye Solutions brings appointment booking, doctor care, inventory visibility, and patient follow-up into
              one calmer digital experience.
            </p>
            <div className="grid gap-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-primary" />
                <span>Dhanmondi and Uttara branches, Dhaka</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-primary" />
                <span>+880 1700 001000</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Explore</p>
            <div className="grid gap-3 text-sm text-muted-foreground">
              {footerLinks.map((link) => (
                <AppLink className="transition hover:text-primary" href={link.href} key={link.href}>
                  {link.label}
                </AppLink>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Care Promise</p>
            <div className="grid gap-3 text-sm text-muted-foreground">
              <div className="flex items-start gap-3">
                <HeartPulse className="mt-0.5 h-4 w-4 text-primary" />
                <span>Coordinated records across reception, doctor, and optical service.</span>
              </div>
              <div className="flex items-start gap-3">
                <Clock3 className="mt-0.5 h-4 w-4 text-primary" />
                <span>Fast booking and walk-in support with visible time-slot availability.</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3 border-t border-border/80 pt-5 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
          <p>© 2026 Eye Solutions. Built for modern clinic and optical workflows.</p>
          <div className="flex flex-wrap gap-4">
            <span>Mon-Thu 10:00-19:00</span>
            <span>Fri limited support</span>
            <span>Emergency calls prioritized</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
