import { DoctorWorkspace } from "@/components/doctor/doctor-workspace";
import { getSessionUser } from "@/lib/auth/session";
import { listAppointments, listPrescriptions } from "@/lib/data/demo-store";

export default async function DoctorDashboardPage() {
  const user = await getSessionUser();
  const doctorId = user?.email === "doctor@eyeoptics.local" ? "doc-1" : undefined;
  const queue = listAppointments({ doctorId }).filter((item) => item.status === "CONFIRMED" || item.status === "CHECKED_IN");
  const prescriptions = listPrescriptions({ doctorId });

  return (
    <main className="shell page">
      <div className="page-header">
        <span className="eyebrow">Doctor dashboard</span>
        <h1>The doctor workspace now creates real prescription records instead of showing only static notes.</h1>
        <p>
          Select a live appointment, write diagnosis and medicines, save the prescription, and print it for the
          patient.
        </p>
      </div>

      <DoctorWorkspace prescriptions={prescriptions} queue={queue} />
    </main>
  );
}

