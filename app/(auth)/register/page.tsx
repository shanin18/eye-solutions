import { redirect } from "next/navigation";

import { RegisterForm } from "@/components/auth/register-form";
import { getRoleRedirect } from "@/lib/auth/redirects";
import { getSessionUser } from "@/lib/auth/session";

export default async function RegisterPage() {
  const user = await getSessionUser();

  if (user) {
    redirect(getRoleRedirect(user.role));
  }

  return (
    <main className="shell page">
      <div className="page-header">
        <span className="eyebrow">Patient account</span>
        <h1>Create a real patient account for appointments, prescriptions, invoices, and follow-up history.</h1>
        <p>
          Browsing stays public, but appointment history, prescriptions, invoices, and service records stay protected
          behind your own verified account. You can sign up with any email address you control.
        </p>
      </div>

      <RegisterForm />
    </main>
  );
}
