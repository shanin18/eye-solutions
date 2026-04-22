import { SectionCard } from "@/components/ui/section-card";
import { services } from "@/lib/mock-data";

export default function ServicesPage() {
  return (
    <main className="shell page">
      <div className="page-header">
        <span className="eyebrow">Clinical and retail services</span>
        <h1>Services are separated clearly so patients know what needs a doctor.</h1>
        <p>
          The product brief supports both consultation-based care and direct optical service. This view keeps those
          paths visible from the start.
        </p>
      </div>

      <div className="app-grid three">
        {services.map((service) => (
          <SectionCard key={service.id} title={service.name} eyebrow={service.type}>
            <p>{service.description}</p>
            <div className="list-row">
              <span className="subtle">{service.duration}</span>
              <span className="pill">{service.priceLabel}</span>
            </div>
          </SectionCard>
        ))}
      </div>
    </main>
  );
}
