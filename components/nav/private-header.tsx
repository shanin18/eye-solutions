import { getSessionUser } from "@/lib/auth/session";
import { PrivateHeaderClient } from "@/components/nav/private-header-client";

export async function PrivateHeader() {
  const user = await getSessionUser();

  return <PrivateHeaderClient user={user} />;
}
