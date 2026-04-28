import { SectionCard } from "@/components/ui/section-card";
import { requireSessionUser } from "@/lib/auth/session";
import { getPatientOverview } from "@/lib/data/data-service";

export default async function PatientPrescriptionsPage() {
  const user = await requireSessionUser(["PATIENT", "SUPER_ADMIN"]);
  const overview = await getPatientOverview(user.email);

  return (
    <main className="shell page">
      <div className="page-header">
        <span className="eyebrow">Prescription history</span>
        <h1>Patients can review previous prescriptions together with the doctor and date.</h1>
        <p>Every saved prescription becomes part of the patient&apos;s visible medical record.</p>
      </div>

      <div className="app-grid two">
        {overview.prescriptions.map((prescription) => (
          <SectionCard key={prescription.id} title={prescription.patientName} eyebrow={prescription.createdAt.slice(0, 10)}>
            <p>{prescription.diagnosis}</p>
            <div className="list-row">
              <span className="subtle">{prescription.doctorName}</span>
              <span className="pill">Preview ready</span>
            </div>
          </SectionCard>
        ))}
      </div>
    </main>
  );
}
