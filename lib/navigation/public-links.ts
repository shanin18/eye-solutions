import type { Route } from "next";

export const publicLinks: Array<{ href: Route; label: string }> = [
  { href: "/", label: "Home" },
  { href: "/doctors", label: "Doctors" },
  { href: "/services", label: "Services" },
  { href: "/products", label: "Products" },
  { href: "/book-appointment", label: "Book" }
];
