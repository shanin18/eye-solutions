import { redirect } from "next/navigation";

import { LoginForm } from "@/components/auth/login-form";
import { getRoleRedirect } from "@/lib/auth/redirects";
import { getSessionUser } from "@/lib/auth/session";

export default async function LoginPage() {
  const user = await getSessionUser();

  if (user) {
    redirect(getRoleRedirect(user.role));
  }

  return (
    <main className="shell page">
      <div className="page-header">
        <span className="eyebrow">Authentication</span>
        <h1>Sign in to continue with your live patient, clinic, or optical workspace.</h1>
        <p>
          Your account is checked against the live database, your password stays hashed, and verified email ownership
          unlocks the right workspace after sign-in.
        </p>
      </div>

      <LoginForm />
    </main>
  );
}
