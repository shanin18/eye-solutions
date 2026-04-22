"use client";

import { type FormEvent, useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type {
  AppointmentStatus,
  DemoAppointment,
  DemoBranch,
  DemoInvoice,
  DemoProduct,
  DemoRestockRequest,
  DemoSystemSettings,
  DemoUserAccount,
  RestockStatus
} from "@/lib/data/demo-store";

type AdminWorkspaceProps = {
  role: "SUPER_ADMIN" | "ADMIN";
  initialAppointments: DemoAppointment[];
  initialProducts: DemoProduct[];
  restockRequests: DemoRestockRequest[];
  branches: DemoBranch[];
  users: DemoUserAccount[];
  settings: DemoSystemSettings;
  invoices: DemoInvoice[];
};

const appointmentStatuses: AppointmentStatus[] = ["PENDING", "CONFIRMED", "CHECKED_IN", "COMPLETED", "CANCELLED"];
const restockStatuses: RestockStatus[] = ["PENDING", "ORDERED", "RECEIVED", "CLOSED"];

const productInitialState = {
  name: "",
  category: "",
  sku: "",
  description: "",
  price: "",
  stock: "",
  threshold: ""
};

export function AdminWorkspace({
  role,
  initialAppointments,
  initialProducts,
  restockRequests,
  branches,
  users,
  settings,
  invoices
}: AdminWorkspaceProps) {
  const [appointments, setAppointments] = useState(initialAppointments);
  const [products, setProducts] = useState(initialProducts);
  const [restocks, setRestocks] = useState(restockRequests);
  const [productForm, setProductForm] = useState(productInitialState);
  const [productErrors, setProductErrors] = useState<Record<string, string>>({});
  const [formMessage, setFormMessage] = useState("");

  const revenue = useMemo(
    () => invoices.filter((invoice) => invoice.paymentStatus === "PAID" || invoice.paymentStatus === "PARTIAL").reduce((sum, invoice) => sum + invoice.totalAmount, 0),
    [invoices]
  );

  async function updateAppointment(id: string, status: AppointmentStatus) {
    const response = await fetch(`/api/appointments/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status })
    });

    const data = (await response.json()) as { appointment?: DemoAppointment };
    if (!response.ok || !data.appointment) return;
    setAppointments((current) => current.map((item) => (item.id === id ? data.appointment! : item)));
  }

  async function updateProductStock(product: DemoProduct, stock: number) {
    const response = await fetch(`/api/products/${product.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ stock })
    });

    const data = (await response.json()) as { product?: DemoProduct };
    if (!response.ok || !data.product) return;
    setProducts((current) => current.map((item) => (item.id === product.id ? data.product! : item)));
  }

  async function updateRestock(id: string, status: RestockStatus) {
    const response = await fetch(`/api/restocks/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status })
    });

    const data = (await response.json()) as { restock?: DemoRestockRequest };
    if (!response.ok || !data.restock) return;
    setRestocks((current) => current.map((item) => (item.id === id ? data.restock! : item)));
  }

  async function handleProductSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setProductErrors({});
    setFormMessage("");

    const response = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...productForm,
        price: Number(productForm.price),
        stock: Number(productForm.stock),
        threshold: Number(productForm.threshold),
        isActive: true
      })
    });

    const data = (await response.json()) as {
      product?: DemoProduct;
      fieldErrors?: Record<string, string>;
      error?: string;
    };

    if (!response.ok || !data.product) {
      setProductErrors(data.fieldErrors ?? {});
      setFormMessage(data.error ?? "");
      return;
    }

    setProducts((current) => [data.product!, ...current]);
    setProductForm(productInitialState);
    setFormMessage("Product added successfully.");
  }

  return (
    <div className="mt-4 space-y-4">
      {role === "SUPER_ADMIN" ? (
        <div className="app-grid three">
          <section className="section-card">
            <span className="eyebrow">Branches</span>
            <h3 className="mt-2">Manage branches</h3>
            <div className="mt-4 list-block">
              {branches.map((branch) => (
                <div className="list-row" key={branch.id}>
                  <div>
                    <strong>{branch.name}</strong>
                    <p>{branch.address}</p>
                  </div>
                  <span className="pill">{branch.status}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="section-card">
            <span className="eyebrow">Users</span>
            <h3 className="mt-2">Users and permissions</h3>
            <div className="mt-4 list-block">
              {users.map((user) => (
                <div className="list-row" key={user.id}>
                  <div>
                    <strong>{user.fullName}</strong>
                    <p>{user.email}</p>
                  </div>
                  <span className="pill">{user.role}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="section-card">
            <span className="eyebrow">Settings and reports</span>
            <h3 className="mt-2">Business configuration</h3>
            <div className="mt-4 space-y-3 text-sm text-muted-foreground">
              <p>Currency: {settings.defaultCurrency}</p>
              <p>Reminder mode: {settings.reminderMode}</p>
              <p>Prescription footer: {settings.prescriptionFooter}</p>
              <p>Revenue tracked: {settings.defaultCurrency} {revenue}</p>
            </div>
          </section>
        </div>
      ) : null}

      <div className="app-grid two">
        <section className="section-card">
          <span className="eyebrow">Appointments</span>
          <h3 className="mt-2">Branch operations and status updates</h3>
          <div className="mt-4 list-block">
            {appointments.map((appointment) => (
              <div className="list-row" key={appointment.id}>
                <div>
                  <strong>{appointment.patientName}</strong>
                  <p>
                    {appointment.doctorName} | {appointment.appointmentDate} at {appointment.timeSlot}
                  </p>
                  <p>{appointment.serviceType}</p>
                </div>
                <select
                  className="rounded-full border bg-white px-3 py-2 text-sm"
                  value={appointment.status}
                  onChange={(event) => void updateAppointment(appointment.id, event.target.value as AppointmentStatus)}
                >
                  {appointmentStatuses.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        </section>

        <section className="section-card">
          <span className="eyebrow">Restocks</span>
          <h3 className="mt-2">Approve and monitor restock requests</h3>
          <div className="mt-4 list-block">
            {restocks.map((request) => (
              <div className="list-row" key={request.id}>
                <div>
                  <strong>{request.itemName}</strong>
                  <p>Required: {request.requiredQuantity}</p>
                  <p>Frequency: {request.frequency} | Last: {request.lastRequestedDate}</p>
                </div>
                <select
                  className="rounded-full border bg-white px-3 py-2 text-sm"
                  value={request.status}
                  onChange={(event) => void updateRestock(request.id, event.target.value as RestockStatus)}
                >
                  {restockStatuses.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="app-grid two">
        <section className="section-card">
          <span className="eyebrow">Inventory</span>
          <h3 className="mt-2">Products and stock control</h3>
          <div className="mt-4 list-block">
            {products.map((product) => (
              <div className="list-row" key={product.id}>
                <div>
                  <strong>{product.name}</strong>
                  <p>
                    {product.sku} | {product.category} | {settings.defaultCurrency} {product.price}
                  </p>
                  <p>Status: {product.status}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="subtle">Stock</span>
                  <Input
                    className="w-24"
                    type="number"
                    value={product.stock}
                    onChange={(event) => void updateProductStock(product, Number(event.target.value))}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="section-card">
          <span className="eyebrow">Add product</span>
          <h3 className="mt-2">Create stock items</h3>
          <form className="mt-4 space-y-4" onSubmit={handleProductSubmit}>
            <div className="field-grid">
              <div className="field">
                <label htmlFor="product-name">Product name</label>
                <Input id="product-name" value={productForm.name} onChange={(event) => setProductForm((current) => ({ ...current, name: event.target.value }))} />
                {productErrors.name ? <p className="text-sm text-orange-700">{productErrors.name}</p> : null}
              </div>
              <div className="field">
                <label htmlFor="product-category">Category</label>
                <Input id="product-category" value={productForm.category} onChange={(event) => setProductForm((current) => ({ ...current, category: event.target.value }))} />
                {productErrors.category ? <p className="text-sm text-orange-700">{productErrors.category}</p> : null}
              </div>
              <div className="field">
                <label htmlFor="product-sku">SKU</label>
                <Input id="product-sku" value={productForm.sku} onChange={(event) => setProductForm((current) => ({ ...current, sku: event.target.value }))} />
                {productErrors.sku ? <p className="text-sm text-orange-700">{productErrors.sku}</p> : null}
              </div>
              <div className="field">
                <label htmlFor="product-price">Price</label>
                <Input id="product-price" type="number" value={productForm.price} onChange={(event) => setProductForm((current) => ({ ...current, price: event.target.value }))} />
                {productErrors.price ? <p className="text-sm text-orange-700">{productErrors.price}</p> : null}
              </div>
              <div className="field">
                <label htmlFor="product-stock">Stock</label>
                <Input id="product-stock" type="number" value={productForm.stock} onChange={(event) => setProductForm((current) => ({ ...current, stock: event.target.value }))} />
                {productErrors.stock ? <p className="text-sm text-orange-700">{productErrors.stock}</p> : null}
              </div>
              <div className="field">
                <label htmlFor="product-threshold">Low stock threshold</label>
                <Input id="product-threshold" type="number" value={productForm.threshold} onChange={(event) => setProductForm((current) => ({ ...current, threshold: event.target.value }))} />
                {productErrors.threshold ? <p className="text-sm text-orange-700">{productErrors.threshold}</p> : null}
              </div>
            </div>
            <div className="field">
              <label htmlFor="product-description">Description</label>
              <Textarea id="product-description" value={productForm.description} onChange={(event) => setProductForm((current) => ({ ...current, description: event.target.value }))} />
              {productErrors.description ? <p className="text-sm text-orange-700">{productErrors.description}</p> : null}
            </div>
            {formMessage ? <p className="text-sm font-medium text-primary">{formMessage}</p> : null}
            <Button type="submit">Add product</Button>
          </form>
        </section>
      </div>
    </div>
  );
}

