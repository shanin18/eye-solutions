import { DoctorWorkspace } from "@/components/doctor/doctor-workspace";
import { requireSessionUser } from "@/lib/auth/session";
import { listAppointments, listDoctors, listPrescriptions, listProducts, listRestockRequests } from "@/lib/data/data-service";

export default async function DoctorDashboardPage() {
  const user = await requireSessionUser(["DOCTOR"]);
  const doctors = await listDoctors();
  const doctorId = doctors.find((doctor) => doctor.name === user.fullName)?.id;
  const [appointments, prescriptions, products, restockRequests] = await Promise.all([
    listAppointments({ doctorId }),
    listPrescriptions({ doctorId }),
    listProducts(),
    listRestockRequests()
  ]);
  const queue = appointments.filter((item) => item.status === "CONFIRMED" || item.status === "CHECKED_IN");

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
