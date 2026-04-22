import { AdminWorkspace } from "@/components/admin/admin-workspace";
import { listAppointments, listProducts } from "@/lib/data/demo-store";

export default function AdminDashboardPage() {
  const appointments = listAppointments();
  const products = listProducts();
  const lowStockCount = products.filter((item) => item.status !== "IN_STOCK").length;
  const completedVisits = appointments.filter((item) => item.status === "COMPLETED").length;

  return (
    <main className="shell page">
      <div className="page-header">
        <span className="eyebrow">Admin dashboard</span>
        <h1>Owners and managers can review bookings, inventory, and operational changes live.</h1>
        <p>
          This dashboard is now data-driven. New bookings, product edits, and status changes all flow through the same
          shared live store.
        </p>
      </div>

      <div className="app-grid three">
        <div className="metric-card">
          <span className="eyebrow">Total bookings</span>
          <strong>{appointments.length}</strong>
          <p>All public, staff, and walk-in bookings appear here.</p>
        </div>
        <div className="metric-card">
          <span className="eyebrow">Completed visits</span>
          <strong>{completedVisits}</strong>
          <p>Visits completed by doctors and carried into patient history.</p>
        </div>
        <div className="metric-card">
          <span className="eyebrow">Low stock items</span>
          <strong>{lowStockCount}</strong>
          <p>Products that need attention before they affect service delivery.</p>
        </div>
      </div>

      <AdminWorkspace initialAppointments={appointments} initialProducts={products} />
    </main>
  );
}

