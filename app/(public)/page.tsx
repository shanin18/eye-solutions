import type { Route } from "next";

import { AppLink } from "@/components/navigation/navigation-progress";
import { SectionCard } from "@/components/ui/section-card";
import { getPublicDashboardSummaries, listDoctors, listProducts, listServices } from "@/lib/data/data-service";

const patientTimeline = [
  {
    title: "Book or register",
    description: "Patients can self-book or arrive as walk-ins while still entering the same downstream workflow."
  },
  {
    title: "Check in and examine",
    description: "Reception confirms arrival, then the doctor records findings, diagnosis, and care notes."
  },
  {
    title: "Prescribe and fulfill",
    description: "Stock-aware prescription logic keeps available items flowing and unavailable items visible to restock."
  },
  {
    title: "Review later",
    description: "Patients return to the portal to see appointments, prescriptions, invoices, and service history."
  }
] as const;

const bookingRoute: Route = "/book-appointment";
const patientRoute: Route = "/patient/dashboard";

export default async function HomePage() {
  const [dashboardSummaries, doctors, products, services] = await Promise.all([
    getPublicDashboardSummaries(),
    listDoctors(),
    listProducts(),
    listServices()
  ]);
  const inventoryHighlights = products.slice(0, 3).map((product) => ({
    name: product.name,
    sku: product.sku,
    status: product.status === "OUT_OF_STOCK" ? "Out of Stock" : product.status === "LOW_STOCK" ? "Low Stock" : "In Stock"
  }));

  return (
    <main className="shell">
      <section className="hero">
        <article className="hero-card">
          <span className="eyebrow">Unified eye-care workflow</span>
          <h1>Run clinic, patient, and optical operations together.</h1>
          <p>
            This first build milestone turns the product brief into a real app structure. It covers the patient-facing areas, and role dashboards with data models that point directly to the MVP scope.
          </p>
          <div className="button-row">
            <AppLink className="button" href={bookingRoute}>
              Book an appointment
            </AppLink>
            <AppLink className="button-secondary" href={patientRoute}>
              Open patient portal
            </AppLink>
          </div>
        </article>

        <div className="stack">
          {dashboardSummaries.map((item) => (
            <div className="metric-card" key={item.label}>
              <span className="eyebrow">{item.label}</span>
              <strong>{item.value}</strong>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="page">
        <div className="page-header">
          <span className="eyebrow">What this milestone includes</span>
          <h1>Public discovery plus staff workflow foundations.</h1>
          <p>
            The UI is intentionally split along the same product boundaries from the brief, which makes the next phases
            easier: real auth, PostgreSQL, appointment state transitions, prescription finalization, and stock movement.
          </p>
        </div>

        <div className="app-grid three">
          <SectionCard title="Doctors" eyebrow="Public module">
            <div className="list-block">
              {doctors.slice(0, 3).map((doctor) => (
                <div className="list-row" key={doctor.id}>
                  <div>
                    <strong>{doctor.name}</strong>
                    <p>{doctor.specialization}</p>
                  </div>
                  <span className="pill">{doctor.schedule}</span>
                </div>
              ))}
            </div>
          </SectionCard>

          <SectionCard title="Services" eyebrow="Clinical + shop">
            <div className="list-block">
              {services.slice(0, 3).map((service) => (
                <div className="list-row" key={service.id}>
                  <div>
                    <strong>{service.name}</strong>
                    <p>{service.description}</p>
                  </div>
                  <span className="pill">{service.duration}</span>
                </div>
              ))}
            </div>
          </SectionCard>

          <SectionCard title="Products" eyebrow="Retail inventory">
            <div className="list-block">
              {products.slice(0, 3).map((product) => (
                <div className="list-row" key={product.id}>
                  <div>
                    <strong>{product.name}</strong>
                    <p>{product.category}</p>
                  </div>
                  <span className={`pill ${product.stock <= 3 ? "warn" : ""}`}>Stock {product.stock}</span>
                </div>
              ))}
            </div>
          </SectionCard>
        </div>
      </section>

      <section className="page">
        <div className="app-grid two">
          <SectionCard title="Restock-aware inventory" eyebrow="Core differentiator">
            <div className="list-block">
              {inventoryHighlights.map((item) => (
                <div className="list-row" key={item.sku}>
                  <div>
                    <strong>{item.name}</strong>
                    <p>{item.sku}</p>
                  </div>
                  <span className={`pill ${item.status === "Out of Stock" ? "danger" : item.status === "Low Stock" ? "warn" : ""}`}>
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </SectionCard>

          <SectionCard title="Patient journey" eyebrow="Portal flow">
            <div className="timeline">
              {patientTimeline.map((step) => (
                <div className="timeline-step" key={step.title}>
                  <strong>{step.title}</strong>
                  <p>{step.description}</p>
                </div>
              ))}
            </div>
          </SectionCard>
        </div>
      </section>
    </main>
  );
}
