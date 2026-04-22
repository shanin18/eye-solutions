import { LoginForm } from "@/components/auth/login-form";

export default function LoginPage() {
  return (
    <main className="shell page">
      <div className="page-header">
        <span className="eyebrow">Authentication</span>
        <h1>Patients and staff will share one secure sign-in boundary.</h1>
        <p>
          The UI is ready for role-aware auth wiring. In later steps we will connect this to sessions, hashed passwords,
          and route protection.
        </p>
      </div>

      <LoginForm />
    </main>
  );
}
