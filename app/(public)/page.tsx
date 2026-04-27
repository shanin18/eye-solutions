import type { Route } from "next";
import { ArrowRight, CalendarCheck2, Glasses, ShieldCheck, Sparkles, Stethoscope } from "lucide-react";

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
const doctorsRoute: Route = "/doctors";
const productsRoute: Route = "/products";

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
  const featuredDoctors = doctors.slice(0, 3);
  const featuredServices = services.slice(0, 3);
  const featuredProducts = products.slice(0, 3);

  return (
    <main className="shell">
      <section className="hero hero-enhanced">
        <article className="hero-card hero-story">
          <span className="eyebrow">Unified eye-care workflow</span>
          <h1>Book faster, see clearer, and keep every eye-care touchpoint connected.</h1>
          <p>
            Eye Solutions brings public discovery, doctor consultations, stock-aware prescriptions, and patient follow-up
            into one warm, modern experience built for real clinic flow.
          </p>
          <div className="hero-badges">
            <span><CalendarCheck2 className="h-4 w-4" /> Live booking slots</span>
            <span><ShieldCheck className="h-4 w-4" /> Shared patient history</span>
            <span><Glasses className="h-4 w-4" /> Optical fulfillment</span>
          </div>
          <div className="button-row">
            <AppLink className="button" href={bookingRoute}>
              Book an appointment
            </AppLink>
            <AppLink className="button-secondary" href={patientRoute}>
              Open patient portal
            </AppLink>
          </div>
          <div className="hero-inline-proof">
            <div>
              <strong>{doctors.length}+</strong>
              <span>available specialists</span>
            </div>
            <div>
              <strong>{services.length}</strong>
              <span>connected service flows</span>
            </div>
            <div>
              <strong>{products.length}</strong>
              <span>trackable product lines</span>
            </div>
          </div>
        </article>

        <div className="hero-visual">
          <div className="hero-orb hero-orb-one" />
          <div className="hero-orb hero-orb-two" />
          <div className="hero-visual-panel hero-visual-panel-primary">
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="eyebrow">Today at a glance</span>
                <h3 className="mt-2 text-2xl font-black">A calmer front desk and clearer care handoff.</h3>
              </div>
              <Sparkles className="h-6 w-6 text-accent" />
            </div>
            <div className="hero-journey-grid">
              <div className="journey-chip">
                <Stethoscope className="h-4 w-4 text-primary" />
                <div>
                  <strong>Doctor-ready queue</strong>
                  <p>Bookings and walk-ins land in one view.</p>
                </div>
              </div>
              <div className="journey-chip">
                <Glasses className="h-4 w-4 text-primary" />
                <div>
                  <strong>Optical continuity</strong>
                  <p>Recommendations flow into fulfillment.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="stack hero-metrics">
            {dashboardSummaries.map((item) => (
              <div className="metric-card metric-card-highlight" key={item.label}>
                <span className="eyebrow">{item.label}</span>
                <strong>{item.value}</strong>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="page">
        <div className="page-header">
          <span className="eyebrow">Why patients stay engaged</span>
          <h1>An experience that feels less like admin work and more like guided care.</h1>
          <p>
            From the first booking tap to prescription follow-up, every step is designed to reduce confusion, surface
            availability early, and keep the clinic and optical team in sync.
          </p>
        </div>

        <div className="feature-ribbon">
          <div className="feature-ribbon-card">
            <span className="pill">Fast booking</span>
            <h3>Choose a doctor, see the first open date, and confirm in one flow.</h3>
          </div>
          <div className="feature-ribbon-card">
            <span className="pill warn">Stock-aware care</span>
            <h3>Prescriptions surface low-stock and unavailable items before patients are surprised.</h3>
          </div>
          <div className="feature-ribbon-card">
            <span className="pill">Portal visibility</span>
            <h3>Patients return to one place for appointments, prescriptions, invoices, and service updates.</h3>
          </div>
        </div>
      </section>

      <section className="page">
        <div className="page-header">
          <span className="eyebrow">Discover care</span>
          <h1>Meet the doctors, services, and products that shape the full patient journey.</h1>
        </div>

        <div className="app-grid three">
          {featuredDoctors.map((doctor) => (
            <article className="spotlight-card" key={doctor.id}>
              <div className="spotlight-icon-wrap">
                <Stethoscope className="h-5 w-5 text-primary" />
              </div>
              <span className="eyebrow">{doctor.specialization}</span>
              <h3>{doctor.name}</h3>
              <p>{doctor.bio}</p>
              <div className="spotlight-meta">
                <span>{doctor.schedule}</span>
                <span>${doctor.fee}</span>
              </div>
            </article>
          ))}
        </div>

        <div className="button-row">
          <AppLink className="button-secondary" href={doctorsRoute}>
            Explore all doctors <ArrowRight className="ml-2 h-4 w-4" />
          </AppLink>
        </div>
      </section>

      <section className="page">
        <div className="app-grid three">
          <SectionCard title="Popular services" eyebrow="Clinical + shop">
            <div className="list-block">
              {featuredServices.map((service) => (
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

          <SectionCard title="Product visibility" eyebrow="Retail inventory">
            <div className="list-block">
              {featuredProducts.map((product) => (
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

          <article className="cta-card">
            <span className="eyebrow">Ready to start</span>
            <h3>Give patients a faster path from first visit to fulfilled care.</h3>
            <p>
              Browse specialists, check service fit, and move into booking with fewer steps and more clarity.
            </p>
            <div className="button-row">
              <AppLink className="button" href={bookingRoute}>
                Book now
              </AppLink>
              <AppLink className="button-secondary" href={productsRoute}>
                View products
              </AppLink>
            </div>
          </article>
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

      <section className="page">
        <div className="immersive-banner">
          <div>
            <span className="eyebrow">One connected workflow</span>
            <h2>Reception, doctors, patients, and optical staff all work from the same live system.</h2>
          </div>
          <AppLink className="button" href={patientRoute}>
            See the patient portal
          </AppLink>
        </div>
      </section>
    </main>
  );
}
