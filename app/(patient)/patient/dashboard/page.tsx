import { PatientHistory } from "@/components/patient/patient-history";
import { getSessionUser } from "@/lib/auth/session";
import { getPatientOverview } from "@/lib/data/demo-store";

export default async function PatientDashboardPage() {
  const user = await getSessionUser();
  const overview = getPatientOverview(user?.email);

  return (
    <main className="shell page">
      <div className="page-header">
        <span className="eyebrow">Patient portal</span>
        <h1>Patients can now see their live appointment and prescription history in one place.</h1>
        <p>
          This portal reads from the same shared records as the booking and doctor workflow, so previous visits and
          prescriptions update dynamically.
        </p>
      </div>

      <div className="app-grid three">
        <div className="metric-card">
          <span className="eyebrow">Upcoming appointments</span>
          <strong>{overview.upcomingAppointments.length}</strong>
          <p>Confirmed visits that the patient can prepare for or reschedule later.</p>
        </div>
        <div className="metric-card">
          <span className="eyebrow">Prescription records</span>
          <strong>{overview.prescriptions.length}</strong>
          <p>Each prescription written by a doctor becomes part of the patient portal immediately.</p>
        </div>
        <div className="metric-card">
          <span className="eyebrow">Visit history</span>
          <strong>{overview.completedVisits.length}</strong>
          <p>Completed doctor visits stay visible together with earlier appointment details.</p>
        </div>
      </div>

      <div className="mt-4">
        <PatientHistory
          appointments={overview.appointments}
          examinations={overview.examinations}
          invoices={overview.invoices}
          prescriptions={overview.prescriptions}
          serviceOrders={overview.serviceOrders}
        />
      </div>
    </main>
  );
}
