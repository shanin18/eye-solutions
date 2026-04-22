"use client";

import { type FormEvent, useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { DemoAppointment, DemoPrescription, DemoProduct, DemoRestockRequest } from "@/lib/data/demo-store";

type DoctorWorkspaceProps = {
  queue: DemoAppointment[];
  prescriptions: DemoPrescription[];
  products: DemoProduct[];
  restockRequests: DemoRestockRequest[];
};

const initialForm = {
  appointmentId: "",
  leftEyeVision: "",
  rightEyeVision: "",
  diagnosis: "",
  clinicalNotes: "",
  lensPower: "",
  medicines: "",
  recommendations: "",
  advice: ""
};

export function DoctorWorkspace({ queue, prescriptions, products, restockRequests }: DoctorWorkspaceProps) {
  const [form, setForm] = useState(initialForm);
  const [records, setRecords] = useState(prescriptions);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [message, setMessage] = useState("");

  const medicineWarnings = useMemo(() => {
    return form.medicines
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean)
      .map((medicineName) => {
        const product = products.find((entry) => entry.name.toLowerCase() === medicineName.toLowerCase());
        if (!product) {
          return { medicineName, level: "external", message: "Not found in stock. It will stay as an external recommendation." };
        }
        if (product.status === "OUT_OF_STOCK") {
          return { medicineName, level: "danger", message: "Out of stock. A restock request will be raised." };
        }
        if (product.status === "LOW_STOCK") {
          return { medicineName, level: "warn", message: "Low stock. A warning and restock follow-up will be raised." };
        }
        return { medicineName, level: "ok", message: "Available in current inventory." };
      });
  }, [form.medicines, products]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFieldErrors({});
    setMessage("");

    const response = await fetch("/api/prescriptions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });

    const data = (await response.json()) as {
      prescription?: DemoPrescription;
      fieldErrors?: Record<string, string>;
      error?: string;
    };

    if (!response.ok || !data.prescription) {
      setFieldErrors(data.fieldErrors ?? {});
      setMessage(data.error ?? "");
      return;
    }

    setRecords((current) => [data.prescription!, ...current]);
    setForm(initialForm);
    setMessage("Prescription, examination, and stock checks were recorded.");
  }

  function printPrescription(record: DemoPrescription) {
    const printWindow = window.open("", "_blank", "width=800,height=600");
    if (!printWindow) return;

    printWindow.document.write(`
      <html>
        <head><title>${record.patientName} Prescription</title></head>
        <body style="font-family: Arial, sans-serif; padding: 32px;">
          <h1>Eye Solutions Prescription</h1>
          <p><strong>Doctor:</strong> ${record.doctorName}</p>
          <p><strong>Patient:</strong> ${record.patientName}</p>
          <p><strong>Date:</strong> ${record.createdAt.slice(0, 10)}</p>
          <pre style="white-space: pre-wrap; font-size: 16px;">${record.printableText}</pre>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  }

  return (
    <div className="space-y-4">
      <div className="app-grid two">
        <section className="section-card">
          <span className="eyebrow">Doctor queue</span>
          <h3 className="mt-2">Appointments and walk-ins ready for examination</h3>
          <div className="mt-4 list-block">
            {queue.map((entry) => (
              <div className="list-row" key={entry.id}>
                <div>
                  <strong>{entry.patientName}</strong>
                  <p>
                    {entry.appointmentDate} at {entry.timeSlot}
                  </p>
                  <p>{entry.reason}</p>
                </div>
                <span className="pill">{entry.status}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="section-card">
          <span className="eyebrow">Restock impact</span>
          <h3 className="mt-2">Current medicine and product restock queue</h3>
          <div className="mt-4 list-block">
            {restockRequests.map((request) => (
              <div className="list-row" key={request.id}>
                <div>
                  <strong>{request.itemName}</strong>
                  <p>Required quantity: {request.requiredQuantity}</p>
                </div>
                <span className="pill">{request.status}</span>
              </div>
            ))}
          </div>
        </section>
      </div>

      <section className="section-card">
        <span className="eyebrow">Examination and prescription</span>
        <h3 className="mt-2">Record eye examination results and generate a printable prescription</h3>
        <form className="mt-4 space-y-4" onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="appointmentId">Visit</label>
            <select id="appointmentId" value={form.appointmentId} onChange={(event) => setForm((current) => ({ ...current, appointmentId: event.target.value }))}>
              <option value="">Select patient visit</option>
              {queue.map((entry) => (
                <option key={entry.id} value={entry.id}>
                  {entry.patientName} | {entry.appointmentDate} {entry.timeSlot}
                </option>
              ))}
            </select>
            {fieldErrors.appointmentId ? <p className="text-sm text-orange-700">{fieldErrors.appointmentId}</p> : null}
          </div>

          <div className="field-grid">
            <div className="field">
              <label htmlFor="leftEyeVision">Left eye vision</label>
              <Input id="leftEyeVision" value={form.leftEyeVision} onChange={(event) => setForm((current) => ({ ...current, leftEyeVision: event.target.value }))} placeholder="6/6" />
              {fieldErrors.leftEyeVision ? <p className="text-sm text-orange-700">{fieldErrors.leftEyeVision}</p> : null}
            </div>
            <div className="field">
              <label htmlFor="rightEyeVision">Right eye vision</label>
              <Input id="rightEyeVision" value={form.rightEyeVision} onChange={(event) => setForm((current) => ({ ...current, rightEyeVision: event.target.value }))} placeholder="6/6" />
              {fieldErrors.rightEyeVision ? <p className="text-sm text-orange-700">{fieldErrors.rightEyeVision}</p> : null}
            </div>
          </div>

          <div className="field">
            <label htmlFor="diagnosis">Diagnosis</label>
            <Textarea id="diagnosis" value={form.diagnosis} onChange={(event) => setForm((current) => ({ ...current, diagnosis: event.target.value }))} />
            {fieldErrors.diagnosis ? <p className="text-sm text-orange-700">{fieldErrors.diagnosis}</p> : null}
          </div>

          <div className="field">
            <label htmlFor="clinicalNotes">Clinical notes</label>
            <Textarea id="clinicalNotes" value={form.clinicalNotes} onChange={(event) => setForm((current) => ({ ...current, clinicalNotes: event.target.value }))} />
            {fieldErrors.clinicalNotes ? <p className="text-sm text-orange-700">{fieldErrors.clinicalNotes}</p> : null}
          </div>

          <div className="field-grid">
            <div className="field">
              <label htmlFor="lensPower">Lens power</label>
              <Input id="lensPower" value={form.lensPower} onChange={(event) => setForm((current) => ({ ...current, lensPower: event.target.value }))} />
              {fieldErrors.lensPower ? <p className="text-sm text-orange-700">{fieldErrors.lensPower}</p> : null}
            </div>
            <div className="field">
              <label htmlFor="recommendations">Optical recommendations</label>
              <Input id="recommendations" value={form.recommendations} onChange={(event) => setForm((current) => ({ ...current, recommendations: event.target.value }))} />
              {fieldErrors.recommendations ? <p className="text-sm text-orange-700">{fieldErrors.recommendations}</p> : null}
            </div>
          </div>

          <div className="field">
            <label htmlFor="medicines">Medicines (comma separated)</label>
            <Textarea id="medicines" value={form.medicines} onChange={(event) => setForm((current) => ({ ...current, medicines: event.target.value }))} />
            {fieldErrors.medicines ? <p className="text-sm text-orange-700">{fieldErrors.medicines}</p> : null}
            {medicineWarnings.length > 0 ? (
              <div className="mt-2 space-y-2">
                {medicineWarnings.map((warning) => (
                  <p key={warning.medicineName} className={`text-sm ${warning.level === "danger" ? "text-orange-700" : warning.level === "warn" ? "text-amber-700" : warning.level === "external" ? "text-muted-foreground" : "text-primary"}`}>
                    {warning.medicineName}: {warning.message}
                  </p>
                ))}
              </div>
            ) : null}
          </div>

          <div className="field">
            <label htmlFor="advice">Follow-up advice</label>
            <Textarea id="advice" value={form.advice} onChange={(event) => setForm((current) => ({ ...current, advice: event.target.value }))} />
            {fieldErrors.advice ? <p className="text-sm text-orange-700">{fieldErrors.advice}</p> : null}
          </div>

          {message ? <p className="text-sm font-medium text-primary">{message}</p> : null}
          <Button type="submit">Finalize prescription</Button>
        </form>
      </section>

      <section className="section-card">
        <span className="eyebrow">Saved prescriptions</span>
        <h3 className="mt-2">Previous prescriptions and print actions</h3>
        <div className="mt-4 list-block">
          {records.map((record) => (
            <div className="list-row" key={record.id}>
              <div>
                <strong>{record.patientName}</strong>
                <p>{record.diagnosis}</p>
                <p>{record.createdAt.slice(0, 10)}</p>
              </div>
              <Button type="button" variant="secondary" onClick={() => printPrescription(record)}>
                Print
              </Button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

