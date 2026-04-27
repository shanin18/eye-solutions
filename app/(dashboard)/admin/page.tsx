import { AdminWorkspace } from "@/components/admin/admin-workspace";
import { requireSessionUser } from "@/lib/auth/session";
import { getOperationalReport, getSystemSettings, listAppointments, listBranches, listInvoices, listProducts, listRestockRequests, listUsers } from "@/lib/data/data-service";

export default async function AdminDashboardPage() {
  const user = await requireSessionUser(["SUPER_ADMIN", "ADMIN"]);
  const [appointments, products, restocks, branches, users, settings, invoices, report] = await Promise.all([
    listAppointments(),
    listProducts(),
    listRestockRequests(),
    listBranches(),
    listUsers(),
    getSystemSettings(),
    listInvoices(),
    getOperationalReport()
  ]);
  const role = user?.role === "SUPER_ADMIN" ? "SUPER_ADMIN" : "ADMIN";

  return (
    <main className="shell page">
      <div className="page-header">
        <span className="eyebrow">{role === "SUPER_ADMIN" ? "Business owner workspace" : "Branch manager workspace"}</span>
        <h1>Operations, inventory, restocks, and reporting are now connected around the actual clinic flow.</h1>
        <p>
          This dashboard follows the business-owner and branch-manager responsibilities from your flow: manage branches,
          users, settings, stock, restocks, and daily operational visibility.
        </p>
      </div>

      <div className="app-grid three">
        <div className="metric-card">
          <span className="eyebrow">Daily appointments</span>
          <strong>{report.totalAppointments}</strong>
          <p>Online bookings, reception bookings, and walk-ins flow into the same appointment lifecycle.</p>
        </div>
        <div className="metric-card">
          <span className="eyebrow">Tracked revenue</span>
          <strong>{settings.defaultCurrency} {report.totalRevenue}</strong>
          <p>Invoices and paid or partial payments roll into the running operations report.</p>
        </div>
        <div className="metric-card">
          <span className="eyebrow">Restock queue</span>
          <strong>{restocks.length}</strong>
          <p>Low-stock and unavailable medicines or products automatically surface here.</p>
        </div>
      </div>

      <AdminWorkspace
        branches={branches}
        initialAppointments={appointments}
        initialProducts={products}
        invoices={invoices}
        restockRequests={restocks}
        role={role}
        settings={settings}
        users={users}
      />
    </main>
  );
}
