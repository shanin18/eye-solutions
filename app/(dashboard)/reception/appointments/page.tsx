import { SectionCard } from "@/components/ui/section-card";
import { requireSessionUser } from "@/lib/auth/session";
import { listAppointments } from "@/lib/data/data-service";

export default async function ReceptionAppointmentsPage() {
  await requireSessionUser(["RECEPTIONIST", "ADMIN", "SUPER_ADMIN"]);
  const appointments = await listAppointments();

  return (
    <main className="shell page">
      <div className="page-header">
        <span className="eyebrow">Reception queue</span>
        <h1>Reception can review the full queue before routing patients into doctors and billing.</h1>
        <p>
          The same appointments here are the ones used by booking, reception, doctor workflow, and patient history.
        </p>
      </div>

      <div className="app-grid two">
        {appointments.map((appointment) => (
          <SectionCard key={appointment.id} title={appointment.patientName} eyebrow={appointment.appointmentDate}>
            <p>
              {appointment.doctorName} • {appointment.serviceType}
            </p>
            <div className="list-row">
              <span className="subtle">{appointment.timeSlot}</span>
              <span className="pill">{appointment.status}</span>
            </div>
          </SectionCard>
        ))}
      </div>
    </main>
  );
}
