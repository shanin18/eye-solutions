import type { ReactNode } from "react";

import { PrivateHeader } from "@/components/nav/private-header";
import { SiteFooter } from "@/components/nav/site-footer";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="pb-16">
      <PrivateHeader />
      {children}
      <SiteFooter />
    </div>
  );
}
