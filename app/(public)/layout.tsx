import type { ReactNode } from "react";

import { SiteFooter } from "@/components/nav/site-footer";
import { PublicHeader } from "@/components/nav/public-header";
import { getSessionUser } from "@/lib/auth/session";

export default async function PublicLayout({ children }: { children: ReactNode }) {
  const user = await getSessionUser();

  return (
    <div>
      <PublicHeader user={user} />
      {children}
      <SiteFooter />
    </div>
  );
}
