import { PrivateSidebarNav } from "@/components/nav/private-sidebar-nav";
import { getSessionUser } from "@/lib/auth/session";

export async function PrivateSidebar() {
  const user = await getSessionUser();

  if (!user) {
    return null;
  }

  return <PrivateSidebarNav fullName={user.fullName} role={user.role} />;
}
