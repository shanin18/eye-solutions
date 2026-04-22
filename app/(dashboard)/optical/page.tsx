import { OpticalWorkspace } from "@/components/optical/optical-workspace";
import { listInvoices, listProducts, listServiceOrders } from "@/lib/data/demo-store";

export default function OpticalDashboardPage() {
  const products = listProducts();
  const orders = listServiceOrders();
  const invoices = listInvoices();

  return (
    <main className="shell page">
      <div className="page-header">
        <span className="eyebrow">Optical shop / POS</span>
        <h1>Optical staff can recommend products, create direct service orders, and track fulfillment and payments.</h1>
        <p>
          This follows the direct optical service flow: customer arrives, staff creates the service ticket or retail
          order, inventory is checked, billing is generated, and fulfillment status is tracked.
        </p>
      </div>

      <OpticalWorkspace invoices={invoices} orders={orders} products={products} />
    </main>
  );
}
