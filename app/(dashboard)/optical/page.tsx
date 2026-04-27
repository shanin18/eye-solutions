import { OpticalWorkspace } from "@/components/optical/optical-workspace";
import { requireSessionUser } from "@/lib/auth/session";
import { listInvoices, listProducts, listServiceOrders } from "@/lib/data/data-service";

export default async function OpticalDashboardPage() {
  await requireSessionUser(["OPTICAL_STAFF", "ADMIN", "SUPER_ADMIN"]);
  const [products, orders, invoices] = await Promise.all([listProducts(), listServiceOrders(), listInvoices()]);

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
