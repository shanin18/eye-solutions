import { SectionCard } from "@/components/ui/section-card";
import { listProducts } from "@/lib/data/demo-store";

export default function OpticalDashboardPage() {
  const products = listProducts();

  return (
    <main className="shell page">
      <div className="page-header">
        <span className="eyebrow">Optical shop dashboard</span>
        <h1>Optical staff can work from the same live inventory used by admin operations.</h1>
        <p>
          Product additions and stock edits made by admin appear here immediately, so the optical team is working with
          current availability.
        </p>
      </div>

      <div className="app-grid two">
        <SectionCard title="Fast-moving items" eyebrow="Retail stock">
          <div className="list-block">
            {products.map((product) => (
              <div className="list-row" key={product.id}>
                <div>
                  <strong>{product.name}</strong>
                  <p>{product.description}</p>
                </div>
                <span className="pill">Stock {product.stock}</span>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Direct service flow" eyebrow="No appointment required">
          <div className="timeline">
            <div className="timeline-step">
              <strong>Create service ticket or retail order</strong>
            </div>
            <div className="timeline-step">
              <strong>Check inventory in real time</strong>
            </div>
            <div className="timeline-step">
              <strong>Generate invoice and mark fulfillment status</strong>
            </div>
          </div>
        </SectionCard>
      </div>
    </main>
  );
}
