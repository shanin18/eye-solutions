import { SectionCard } from "@/components/ui/section-card";
import { products } from "@/lib/mock-data";

export default function ProductsPage() {
  return (
    <main className="shell page">
      <div className="page-header">
        <span className="eyebrow">Product catalog</span>
        <h1>Retail items show stock context instead of acting like a disconnected store.</h1>
        <p>
          Even on the public side, the catalog is aligned with the clinic workflow so staff can later connect these
          products to prescriptions, service orders, and invoices.
        </p>
      </div>

      <div className="app-grid three">
        {products.map((product) => (
          <SectionCard key={product.id} title={product.name} eyebrow={product.category}>
            <p>{product.description}</p>
            <div className="list-row">
              <span className="subtle">{product.priceLabel}</span>
              <span className={`pill ${product.stock <= 3 ? "warn" : ""}`}>Stock {product.stock}</span>
            </div>
          </SectionCard>
        ))}
      </div>
    </main>
  );
}
