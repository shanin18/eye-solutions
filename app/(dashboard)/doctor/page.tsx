import { DoctorWorkspace } from "@/components/doctor/doctor-workspace";
import { getSessionUser } from "@/lib/auth/session";
import { listAppointments, listPrescriptions, listProducts, listRestockRequests } from "@/lib/data/demo-store";

export default async function DoctorDashboardPage() {
  const user = await getSessionUser();
  const doctorId = user?.email === "doctor@eyeoptics.local" ? "doc-1" : undefined;
  const queue = listAppointments({ doctorId }).filter((item) => item.status === "CONFIRMED" || item.status === "CHECKED_IN");
  const prescriptions = listPrescriptions({ doctorId });
  const products = listProducts();
  const restockRequests = listRestockRequests();

  return (
    <main className="shell page">
      <div className="page-header">
        <span className="eyebrow">Doctor dashboard</span>
        <h1>Doctors can move from appointment to examination, stock-aware prescription, and print-ready output.</h1>
        <p>
          This now follows the intended examination flow: view appointments, record left and right eye values, save
          diagnosis and notes, check medicine stock, trigger restocks, and finalize the prescription.
        </p>
      </div>

      <DoctorWorkspace prescriptions={prescriptions} products={products} queue={queue} restockRequests={restockRequests} />
    </main>
  );
}
