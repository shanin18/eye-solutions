"use client";

import { type FormEvent, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { AppointmentStatus, DemoAppointment, DemoInvoice } from "@/lib/data/data-service";

type ReceptionWorkspaceProps = {
  appointments: DemoAppointment[];
  invoices: DemoInvoice[];
  doctors: Array<{ id: string; name: string }>;
};

const appointmentStatuses: AppointmentStatus[] = ["PENDING", "CONFIRMED", "CHECKED_IN", "COMPLETED", "CANCELLED"];

const initialWalkIn = {
  fullName: "",
  phone: "",
  doctorId: "",
  serviceType: "",
  reason: ""
};

export function ReceptionWorkspace({ appointments: initialAppointments, invoices: initialInvoices, doctors }: ReceptionWorkspaceProps) {
  const [appointments, setAppointments] = useState(initialAppointments);
  const [invoices, setInvoices] = useState(initialInvoices);
  const [walkInForm, setWalkInForm] = useState(initialWalkIn);
  const [message, setMessage] = useState("");

  async function updateAppointmentStatus(id: string, status: AppointmentStatus) {
    const response = await fetch(`/api/appointments/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status })
    });
    const data = (await response.json()) as { appointment?: DemoAppointment };
    if (!response.ok || !data.appointment) return;
    setAppointments((current) => current.map((item) => (item.id === id ? data.appointment! : item)));
  }

  async function createWalkIn(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");

    const doctor = doctors.find((item) => item.id === walkInForm.doctorId);
    const availabilityResponse = await fetch(`/api/appointments?doctorId=${encodeURIComponent(walkInForm.doctorId)}`);
    const availability = (await availabilityResponse.json()) as { availableDates?: string[] };
    const appointmentDate = availability.availableDates?.[0];

    if (!appointmentDate) {
      setMessage("No available slots found for the selected doctor.");
      return;
    }

    const slotResponse = await fetch(
      `/api/appointments?doctorId=${encodeURIComponent(walkInForm.doctorId)}&appointmentDate=${encodeURIComponent(appointmentDate)}`
    );
    const slotData = (await slotResponse.json()) as { availableTimeSlots?: string[] };
    const timeSlot = slotData.availableTimeSlots?.[0];

    if (!timeSlot) {
      setMessage("No available time slots found for the selected doctor.");
      return;
    }

    const response = await fetch("/api/appointments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fullName: walkInForm.fullName,
        phone: walkInForm.phone,
        doctorId: walkInForm.doctorId,
        serviceType: walkInForm.serviceType,
        appointmentDate,
        timeSlot,
        bookingSource: "WALK_IN",
        reason: walkInForm.reason
      })
    });
    const data = (await response.json()) as { appointment?: DemoAppointment; error?: string };
    if (!response.ok || !data.appointment) {
      setMessage(data.error ?? "Unable to create walk-in.");
      return;
    }

    setAppointments((current) => [data.appointment!, ...current]);
    setWalkInForm(initialWalkIn);
    setMessage(`${doctor?.name ?? "Doctor"} walk-in registered and checked in.`);
  }

  async function markInvoicePaid(invoiceId: string) {
    const response = await fetch(`/api/invoices/${invoiceId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ paymentStatus: "PAID" })
    });
    const data = (await response.json()) as { invoice?: DemoInvoice };
    if (!response.ok || !data.invoice) return;
    setInvoices((current) => current.map((invoice) => (invoice.id === invoiceId ? data.invoice! : invoice)));
  }

  return (
    <div className="app-grid two">
      <section className="section-card">
        <span className="eyebrow">Queue management</span>
        <h3 className="mt-2">Appointments and check-ins</h3>
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
                onChange={(event) => void updateAppointmentStatus(appointment.id, event.target.value as AppointmentStatus)}
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
        <span className="eyebrow">Walk-in registration</span>
        <h3 className="mt-2">Register a patient quickly</h3>
        <form className="mt-4 space-y-4" onSubmit={createWalkIn}>
          <div className="field">
            <label htmlFor="walkin-name">Patient name</label>
            <Input id="walkin-name" value={walkInForm.fullName} onChange={(event) => setWalkInForm((current) => ({ ...current, fullName: event.target.value }))} />
          </div>
          <div className="field">
            <label htmlFor="walkin-phone">Phone</label>
            <Input id="walkin-phone" value={walkInForm.phone} onChange={(event) => setWalkInForm((current) => ({ ...current, phone: event.target.value }))} />
          </div>
          <div className="field">
            <label htmlFor="walkin-doctor">Doctor</label>
            <select id="walkin-doctor" value={walkInForm.doctorId} onChange={(event) => setWalkInForm((current) => ({ ...current, doctorId: event.target.value }))}>
              <option value="">Select doctor</option>
              {doctors.map((doctor) => (
                <option key={doctor.id} value={doctor.id}>
                  {doctor.name}
                </option>
              ))}
            </select>
          </div>
          <div className="field">
            <label htmlFor="walkin-service">Service type</label>
            <Input id="walkin-service" value={walkInForm.serviceType} onChange={(event) => setWalkInForm((current) => ({ ...current, serviceType: event.target.value }))} />
          </div>
          <div className="field">
            <label htmlFor="walkin-reason">Reason</label>
            <Input id="walkin-reason" value={walkInForm.reason} onChange={(event) => setWalkInForm((current) => ({ ...current, reason: event.target.value }))} />
          </div>
          {message ? <p className="text-sm font-medium text-primary">{message}</p> : null}
          <Button type="submit">Register walk-in</Button>
        </form>
      </section>

      <section className="section-card lg:col-span-2">
        <span className="eyebrow">Billing desk</span>
        <h3 className="mt-2">Invoices and payment collection</h3>
        <div className="mt-4 list-block">
          {invoices.map((invoice) => (
            <div className="list-row" key={invoice.id}>
              <div>
                <strong>{invoice.patientName}</strong>
                <p>
                  {invoice.referenceType} | {invoice.referenceId}
                </p>
                <p>Amount: {invoice.totalAmount}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="pill">{invoice.paymentStatus}</span>
                {invoice.paymentStatus !== "PAID" ? (
                  <Button type="button" variant="secondary" onClick={() => void markInvoicePaid(invoice.id)}>
                    Receive payment
                  </Button>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
