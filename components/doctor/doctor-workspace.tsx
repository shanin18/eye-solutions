"use client";

import { type FormEvent, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { DemoAppointment, DemoPrescription } from "@/lib/data/demo-store";

type DoctorWorkspaceProps = {
  queue: DemoAppointment[];
  prescriptions: DemoPrescription[];
};

const initialForm = {
  appointmentId: "",
  diagnosis: "",
  lensPower: "",
  medicines: "",
  advice: ""
};

export function DoctorWorkspace({ queue, prescriptions }: DoctorWorkspaceProps) {
  const [form, setForm] = useState(initialForm);
  const [records, setRecords] = useState(prescriptions);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [message, setMessage] = useState("");

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
    setMessage("Prescription saved. You can print it now.");
  }

  function printPrescription(record: DemoPrescription) {
    const printWindow = window.open("", "_blank", "width=800,height=600");
    if (!printWindow) {
      return;
    }

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
    <div className="app-grid two">
      <section className="section-card">
        <span className="eyebrow">Doctor queue</span>
        <h3 className="mt-2">Patients ready for consultation</h3>
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
        <span className="eyebrow">Prescription writer</span>
        <h3 className="mt-2">Write, save, and print a prescription</h3>
        <form className="mt-4 space-y-4" onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="appointmentId">Visit</label>
            <select
              id="appointmentId"
              value={form.appointmentId}
              onChange={(event) => setForm((current) => ({ ...current, appointmentId: event.target.value }))}
            >
              <option value="">Select patient visit</option>
              {queue.map((entry) => (
                <option key={entry.id} value={entry.id}>
                  {entry.patientName} | {entry.appointmentDate} {entry.timeSlot}
                </option>
              ))}
            </select>
            {fieldErrors.appointmentId ? <p className="text-sm text-orange-700">{fieldErrors.appointmentId}</p> : null}
          </div>
          <div className="field">
            <label htmlFor="diagnosis">Diagnosis</label>
            <Textarea id="diagnosis" value={form.diagnosis} onChange={(event) => setForm((current) => ({ ...current, diagnosis: event.target.value }))} />
            {fieldErrors.diagnosis ? <p className="text-sm text-orange-700">{fieldErrors.diagnosis}</p> : null}
          </div>
          <div className="field">
            <label htmlFor="lensPower">Lens power</label>
            <Input id="lensPower" value={form.lensPower} onChange={(event) => setForm((current) => ({ ...current, lensPower: event.target.value }))} />
            {fieldErrors.lensPower ? <p className="text-sm text-orange-700">{fieldErrors.lensPower}</p> : null}
          </div>
          <div className="field">
            <label htmlFor="medicines">Medicines</label>
            <Textarea id="medicines" value={form.medicines} onChange={(event) => setForm((current) => ({ ...current, medicines: event.target.value }))} />
            {fieldErrors.medicines ? <p className="text-sm text-orange-700">{fieldErrors.medicines}</p> : null}
          </div>
          <div className="field">
            <label htmlFor="advice">Advice</label>
            <Textarea id="advice" value={form.advice} onChange={(event) => setForm((current) => ({ ...current, advice: event.target.value }))} />
            {fieldErrors.advice ? <p className="text-sm text-orange-700">{fieldErrors.advice}</p> : null}
          </div>
          {message ? <p className="text-sm font-medium text-primary">{message}</p> : null}
          <Button type="submit">Save prescription</Button>
        </form>
      </section>

      <section className="section-card lg:col-span-2">
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
