import { AppLink } from "@/components/navigation/navigation-progress";

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-border/70 bg-white/60">
      <div className="shell flex flex-col gap-6 py-8 md:flex-row md:items-center md:justify-between">
        <div className="space-y-2">
          <p className="text-sm font-semibold text-foreground">Eye Solutions</p>
          <p className="max-w-xl text-sm leading-6 text-muted-foreground">
            Unified clinic, prescription, patient portal, and optical retail workflows for modern eye-care businesses.
          </p>
        </div>

        <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
          <AppLink className="transition hover:text-primary" href="/">
            Home
          </AppLink>
          <AppLink className="transition hover:text-primary" href="/doctors">
            Doctors
          </AppLink>
          <AppLink className="transition hover:text-primary" href="/services">
            Services
          </AppLink>
          <AppLink className="transition hover:text-primary" href="/products">
            Products
          </AppLink>
          <AppLink className="transition hover:text-primary" href="/book-appointment">
            Book Appointment
          </AppLink>
        </div>
      </div>
    </footer>
  );
}
