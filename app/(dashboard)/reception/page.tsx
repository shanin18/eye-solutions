import { SectionCard } from "@/components/ui/section-card";

const receptionQueue = [
  { id: "rec-1", patient: "Rezaul Karim", type: "Walk-in", action: "Register and assign doctor" },
  { id: "rec-2", patient: "Sadia Karim", type: "Appointment", action: "Check in for 10:30 slot" },
  { id: "rec-3", patient: "Mili Akter", type: "Follow-up", action: "Find previous visit and billing history" }
] as const;

export default function ReceptionDashboardPage() {
  return (
    <main className="shell page">
      <div className="page-header">
        <span className="eyebrow">Reception dashboard</span>
        <h1>Front desk work starts with fast registration, check-in, and queue control.</h1>
        <p>
          This page represents the receptionist slice from the brief, separate from doctor and admin concerns so each
          role gets a cleaner interface.
        </p>
      </div>

      <div className="app-grid two">
        <SectionCard title="Live queue" eyebrow="Front-desk tasks">
          <div className="list-block">
            {receptionQueue.map((item) => (
              <div className="list-row" key={item.id}>
                <div>
                  <strong>{item.patient}</strong>
                  <p>{item.action}</p>
                </div>
                <span className="pill">{item.type}</span>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Next implementation" eyebrow="Step 3 preview">
          <div className="timeline">
            <div className="timeline-step">
              <strong>Create patient records from booking or walk-in intake</strong>
            </div>
            <div className="timeline-step">
              <strong>Check in confirmed appointments</strong>
            </div>
            <div className="timeline-step">
              <strong>Pass the patient into the doctor queue</strong>
            </div>
          </div>
        </SectionCard>
      </div>
    </main>
  );
}
