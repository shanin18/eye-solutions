import type { ReactNode } from "react";

import { PrivateHeader } from "@/components/nav/private-header";
import { PrivateSidebar } from "@/components/nav/private-sidebar";
import { SiteFooter } from "@/components/nav/site-footer";

export default function PatientLayout({ children }: { children: ReactNode }) {
  return (
    <div className="pb-16">
      <PrivateHeader />
      <div className="shell private-layout">
        <aside className="private-sidebar">
          <PrivateSidebar />
        </aside>
        <div className="private-main">
          {children}
        </div>
      </div>
      <SiteFooter />
    </div>
  );
}
