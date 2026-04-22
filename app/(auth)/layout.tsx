import type { ReactNode } from "react";

import { SiteFooter } from "@/components/nav/site-footer";
import { PublicHeader } from "@/components/nav/public-header";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="pb-16">
      <PublicHeader />
      {children}
      <SiteFooter />
    </div>
  );
}
