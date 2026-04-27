import { ReceptionWorkspace } from "@/components/reception/reception-workspace";
import { requireSessionUser } from "@/lib/auth/session";
import { listAppointments, listDoctors, listInvoices } from "@/lib/data/data-service";

export default async function ReceptionDashboardPage() {
  await requireSessionUser(["RECEPTIONIST", "ADMIN", "SUPER_ADMIN"]);
  const [appointments, invoices, doctors] = await Promise.all([listAppointments(), listInvoices(), listDoctors()]);

  return (
    <main className="shell page">
      <div className="page-header">
        <span className="eyebrow">Reception / Front Desk</span>
        <h1>Reception now handles appointment confirmation, walk-in registration, queue updates, and billing.</h1>
        <p>
          This matches the front-desk responsibilities from your flow: create appointments, register walk-ins, check in
          patients, manage queue status, and receive invoice payments.
        </p>
      </div>

      <ReceptionWorkspace appointments={appointments} doctors={doctors.map((doctor) => ({ id: doctor.id, name: doctor.name }))} invoices={invoices} />
    </main>
  );
}
