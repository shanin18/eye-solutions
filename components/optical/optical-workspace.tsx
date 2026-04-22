"use client";

import { type FormEvent, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { DemoInvoice, DemoProduct, DemoServiceOrder, InvoicePaymentStatus, ServiceOrderStatus } from "@/lib/data/demo-store";

type OpticalWorkspaceProps = {
  products: DemoProduct[];
  orders: DemoServiceOrder[];
  invoices: DemoInvoice[];
};

const orderStatuses: ServiceOrderStatus[] = ["OPEN", "READY", "FULFILLED"];
const paymentStatuses: InvoicePaymentStatus[] = ["UNPAID", "PARTIAL", "PAID"];

const initialOrder = {
  patientName: "",
  patientEmail: "",
  items: "",
  totalAmount: "",
  source: "DIRECT_OPTICAL" as const
};

export function OpticalWorkspace({ products, orders: initialOrders, invoices: initialInvoices }: OpticalWorkspaceProps) {
  const [orders, setOrders] = useState(initialOrders);
  const [invoices, setInvoices] = useState(initialInvoices);
  const [orderForm, setOrderForm] = useState(initialOrder);
  const [message, setMessage] = useState("");

  async function handleCreateOrder(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");

    const response = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        patientEmail: orderForm.patientEmail || undefined,
        patientName: orderForm.patientName,
        items: orderForm.items.split(",").map((item) => item.trim()).filter(Boolean),
        totalAmount: Number(orderForm.totalAmount),
        source: orderForm.source
      })
    });
    const data = (await response.json()) as { order?: DemoServiceOrder; invoice?: DemoInvoice; error?: string };
    if (!response.ok || !data.order || !data.invoice) {
      setMessage(data.error ?? "Unable to create service order.");
      return;
    }

    setOrders((current) => [data.order!, ...current]);
    setInvoices((current) => [data.invoice!, ...current]);
    setOrderForm(initialOrder);
    setMessage("Optical service order and invoice created.");
  }

  async function updateOrderStatus(id: string, status: ServiceOrderStatus) {
    const response = await fetch(`/api/orders/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status })
    });
    const data = (await response.json()) as { order?: DemoServiceOrder };
    if (!response.ok || !data.order) return;
    setOrders((current) => current.map((item) => (item.id === id ? data.order! : item)));
  }

  async function updateInvoiceStatus(id: string, paymentStatus: InvoicePaymentStatus) {
    const response = await fetch(`/api/invoices/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ paymentStatus })
    });
    const data = (await response.json()) as { invoice?: DemoInvoice };
    if (!response.ok || !data.invoice) return;
    setInvoices((current) => current.map((item) => (item.id === id ? data.invoice! : item)));
  }

  return (
    <div className="app-grid two">
      <section className="section-card">
        <span className="eyebrow">Inventory and recommendations</span>
        <h3 className="mt-2">Frames, lenses, and medicine availability</h3>
        <div className="mt-4 list-block">
          {products.map((product) => (
            <div className="list-row" key={product.id}>
              <div>
                <strong>{product.name}</strong>
                <p>{product.description}</p>
              </div>
              <span className={`pill ${product.status === "OUT_OF_STOCK" ? "danger" : product.status === "LOW_STOCK" ? "warn" : ""}`}>
                {product.status}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className="section-card">
        <span className="eyebrow">Direct optical service</span>
        <h3 className="mt-2">Create service tickets and retail orders</h3>
        <form className="mt-4 space-y-4" onSubmit={handleCreateOrder}>
          <div className="field">
            <label htmlFor="order-name">Customer or patient name</label>
            <Input id="order-name" value={orderForm.patientName} onChange={(event) => setOrderForm((current) => ({ ...current, patientName: event.target.value }))} />
          </div>
          <div className="field">
            <label htmlFor="order-email">Patient email (optional)</label>
            <Input id="order-email" value={orderForm.patientEmail} onChange={(event) => setOrderForm((current) => ({ ...current, patientEmail: event.target.value }))} />
          </div>
          <div className="field">
            <label htmlFor="order-items">Products / services</label>
            <Input id="order-items" value={orderForm.items} onChange={(event) => setOrderForm((current) => ({ ...current, items: event.target.value }))} placeholder="Frame replacement service, BlueShield Frame A2" />
          </div>
          <div className="field">
            <label htmlFor="order-total">Total amount</label>
            <Input id="order-total" type="number" value={orderForm.totalAmount} onChange={(event) => setOrderForm((current) => ({ ...current, totalAmount: event.target.value }))} />
          </div>
          {message ? <p className="text-sm font-medium text-primary">{message}</p> : null}
          <Button type="submit">Create order</Button>
        </form>
      </section>

      <section className="section-card">
        <span className="eyebrow">Service orders</span>
        <h3 className="mt-2">Order processing</h3>
        <div className="mt-4 list-block">
          {orders.map((order) => (
            <div className="list-row" key={order.id}>
              <div>
                <strong>{order.patientName}</strong>
                <p>{order.items.join(", ")}</p>
              </div>
              <select className="rounded-full border bg-white px-3 py-2 text-sm" value={order.status} onChange={(event) => void updateOrderStatus(order.id, event.target.value as ServiceOrderStatus)}>
                {orderStatuses.map((status) => (
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
        <span className="eyebrow">Invoices</span>
        <h3 className="mt-2">Payment status tracking</h3>
        <div className="mt-4 list-block">
          {invoices.map((invoice) => (
            <div className="list-row" key={invoice.id}>
              <div>
                <strong>{invoice.patientName}</strong>
                <p>{invoice.referenceType}</p>
              </div>
              <select className="rounded-full border bg-white px-3 py-2 text-sm" value={invoice.paymentStatus} onChange={(event) => void updateInvoiceStatus(invoice.id, event.target.value as InvoicePaymentStatus)}>
                {paymentStatuses.map((status) => (
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
  );
}
