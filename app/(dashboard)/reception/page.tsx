import { ReceptionWorkspace } from "@/components/reception/reception-workspace";
import { doctors } from "@/lib/mock-data";
import { listAppointments, listInvoices } from "@/lib/data/demo-store";

export default function ReceptionDashboardPage() {
  const appointments = listAppointments();
  const invoices = listInvoices();

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
