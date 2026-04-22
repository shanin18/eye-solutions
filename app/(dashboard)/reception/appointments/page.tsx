import { SectionCard } from "@/components/ui/section-card";
import { listAppointments } from "@/lib/data/demo-store";

export default function ReceptionAppointmentsPage() {
  const appointments = listAppointments();

  return (
    <main className="shell page">
      <div className="page-header">
        <span className="eyebrow">Reception appointments</span>
        <h1>Appointments now come from a shared route-backed demo store instead of hardcoded page-only data.</h1>
        <p>
          This is the bridge between static UI and real persistence. It keeps the flow easy to understand before we swap
          the in-memory store for PostgreSQL and Prisma.
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
