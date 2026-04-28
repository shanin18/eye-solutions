import { SectionCard } from "@/components/ui/section-card";
import { requireSessionUser } from "@/lib/auth/session";
import { getPatientOverview } from "@/lib/data/data-service";

export default async function PatientAppointmentsPage() {
  const user = await requireSessionUser(["PATIENT", "SUPER_ADMIN"]);
  const overview = await getPatientOverview(user.email);

  return (
    <main className="shell page">
      <div className="page-header">
        <span className="eyebrow">Patient appointments</span>
        <h1>Appointments stay readable for both upcoming visits and previous care history.</h1>
      </div>

      <div className="app-grid two">
        {overview.appointments.map((appointment) => (
          <SectionCard key={appointment.id} title={appointment.doctorName} eyebrow={appointment.appointmentDate}>
            <p>{appointment.reason}</p>
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
