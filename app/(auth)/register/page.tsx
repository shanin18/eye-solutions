import { RegisterForm } from "@/components/auth/register-form";

export default function RegisterPage() {
  return (
    <main className="shell page">
      <div className="page-header">
        <span className="eyebrow">Patient account</span>
        <h1>Registration supports future portal access without forcing every visitor to log in first.</h1>
        <p>
          That matches the brief: browsing stays public, but history, documents, and service records stay behind patient
          ownership checks.
        </p>
      </div>

      <RegisterForm />
    </main>
  );
}
