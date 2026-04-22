import { SectionCard } from "@/components/ui/section-card";
import { doctors } from "@/lib/mock-data";

export default function DoctorsPage() {
  return (
    <main className="shell page">
      <div className="page-header">
        <h1>Meet the doctors before patients book.</h1>
        <p>
          This page addresses the discovery flow from the brief: visitors should understand who is available, what they
          specialize in, and when they consult.
        </p>
      </div>

      <div className="app-grid three">
        {doctors.map((doctor) => (
          <SectionCard key={doctor.id} title={doctor.name} eyebrow={doctor.specialization}>
            <p>{doctor.bio}</p>
            <div className="stack">
              <span className="pill">{doctor.schedule}</span>
              <span className="subtle">Consultation fee: ${doctor.fee}</span>
            </div>
          </SectionCard>
        ))}
      </div>
    </main>
  );
}
