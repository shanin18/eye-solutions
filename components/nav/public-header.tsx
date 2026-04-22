import { BrandMark } from "@/components/nav/brand-mark";
import { AppLink } from "@/components/navigation/navigation-progress";
import { cn } from "@/lib/utils";

const publicLinks = [
  { href: "/", label: "Home" },
  { href: "/doctors", label: "Doctors" },
  { href: "/services", label: "Services" },
  { href: "/products", label: "Products" },
  { href: "/book-appointment", label: "Book" }
];

export function PublicHeader() {
  return (
    <header className="sticky top-0 z-20 border-b border-border/70 bg-background/80 backdrop-blur">
      <div className="shell flex flex-col gap-4 py-4 lg:flex-row lg:items-center lg:justify-between">
        <BrandMark />

        <div className="flex flex-col gap-3 lg:items-end">
          <div className="flex items-center flex-wrap gap-2">
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
        </div>
      </div>
    </header>
  );
}
