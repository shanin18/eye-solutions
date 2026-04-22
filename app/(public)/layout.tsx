import type { ReactNode } from "react";

import { SiteFooter } from "@/components/nav/site-footer";
import { PublicHeader } from "@/components/nav/public-header";

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <PublicHeader />
      {children}
      <SiteFooter />
    </div>
  );
}
