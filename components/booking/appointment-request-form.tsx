"use client";

import { type FormEvent, useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { Doctor } from "@/lib/types";

type AppointmentResponse = {
  error?: string;
  appointment?: {
    id: string;
    status: string;
    doctorName: string;
    appointmentDate: string;
    timeSlot: string;
  };
};

type AvailabilityResponse = {
  availableDates?: string[];
  availableTimeSlots?: string[];
};

const initialState = {
  fullName: "",
  phone: "",
  email: "",
  doctorId: "",
  serviceType: "",
  appointmentDate: "",
  timeSlot: "",
  reason: ""
};

type AppointmentRequestFormProps = {
  doctors: Doctor[];
  serviceTypes: string[];
};

export function AppointmentRequestForm({ doctors, serviceTypes }: AppointmentRequestFormProps) {
  const [form, setForm] = useState(initialState);
  const [availableDates, setAvailableDates] = useState<string[]>([]);
  const [availableTimeSlots, setAvailableTimeSlots] = useState<string[]>([]);
  const [isLoadingDates, setIsLoadingDates] = useState(false);
  const [isLoadingSlots, setIsLoadingSlots] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  function updateField<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  useEffect(() => {
    async function loadAvailableDates() {
      if (!form.doctorId) {
        setAvailableDates([]);
        setAvailableTimeSlots([]);
        setForm((current) => ({ ...current, appointmentDate: "", timeSlot: "" }));
        return;
      }

      setIsLoadingDates(true);

      const response = await fetch(`/api/appointments?doctorId=${encodeURIComponent(form.doctorId)}`);
      const data = (await response.json()) as AvailabilityResponse;
      const dates = data.availableDates ?? [];

      setAvailableDates(dates);
      setAvailableTimeSlots([]);
      setForm((current) => ({
        ...current,
        appointmentDate: dates.includes(current.appointmentDate) ? current.appointmentDate : (dates[0] ?? ""),
        timeSlot: ""
      }));
      setIsLoadingDates(false);
    }

    void loadAvailableDates();
  }, [form.doctorId]);

  useEffect(() => {
    async function loadAvailableTimeSlots() {
      if (!form.doctorId || !form.appointmentDate) {
        setAvailableTimeSlots([]);
        setForm((current) => ({ ...current, timeSlot: "" }));
        return;
      }

      setIsLoadingSlots(true);

      const response = await fetch(
        `/api/appointments?doctorId=${encodeURIComponent(form.doctorId)}&appointmentDate=${encodeURIComponent(form.appointmentDate)}`
      );
      const data = (await response.json()) as AvailabilityResponse;
      const slots = data.availableTimeSlots ?? [];

      setAvailableTimeSlots(slots);
      setForm((current) => ({
        ...current,
        timeSlot: slots.includes(current.timeSlot) ? current.timeSlot : (slots[0] ?? "")
      }));
      setIsLoadingSlots(false);
    }

    void loadAvailableTimeSlots();
  }, [form.doctorId, form.appointmentDate]);

  async function submit(bookingSource: "ONLINE" | "WALK_IN") {
    setIsSubmitting(true);
    setMessage("");
    setError("");
    setFieldErrors({});

    const response = await fetch("/api/appointments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        ...form,
        bookingSource
      })
    });

    const data = (await response.json()) as AppointmentResponse & { fieldErrors?: Record<string, string> };

    if (!response.ok || !data.appointment) {
      setError(data.error ?? "Unable to save the appointment.");
      setFieldErrors(data.fieldErrors ?? {});
      setIsSubmitting(false);
      return;
    }

    setMessage(
      `${data.appointment.doctorName} scheduled for ${data.appointment.appointmentDate} at ${data.appointment.timeSlot}. Status: ${data.appointment.status}.`
    );
    setForm(initialState);
    setIsSubmitting(false);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await submit("ONLINE");
  }

  return (
    <form className="form-card" onSubmit={handleSubmit}>
      <h3>Appointment request</h3>
      <p className="subtle">
        Public visitors can book without logging in. Available dates and slots load from current doctor bookings so the
        same slot cannot be assigned twice.
      </p>
      <p className="subtle">Pick a doctor first. The form will suggest the first open date and time automatically.</p>

      <div className="field-grid mt-4">
        <div className="field">
          <label htmlFor="patient-name">Patient name</label>
          <Input
            id="patient-name"
            placeholder="Enter full name"
            value={form.fullName}
            onChange={(event) => updateField("fullName", event.target.value)}
          />
          {fieldErrors.fullName ? <p className="text-sm text-orange-700">{fieldErrors.fullName}</p> : null}
        </div>
        <div className="field">
          <label htmlFor="patient-phone">Phone number</label>
          <Input
            id="patient-phone"
            placeholder="+880..."
            value={form.phone}
            onChange={(event) => updateField("phone", event.target.value)}
          />
          {fieldErrors.phone ? <p className="text-sm text-orange-700">{fieldErrors.phone}</p> : null}
        </div>
        <div className="field">
          <label htmlFor="email">Email</label>
          <Input
            id="email"
            type="email"
            placeholder="name@example.com"
            value={form.email}
            onChange={(event) => updateField("email", event.target.value)}
          />
          {fieldErrors.email ? <p className="text-sm text-orange-700">{fieldErrors.email}</p> : null}
        </div>
        <div className="field">
          <label htmlFor="doctor">Doctor</label>
          <select id="doctor" value={form.doctorId} onChange={(event) => updateField("doctorId", event.target.value)}>
            <option value="">Select doctor</option>
            {doctors.map((doctor) => (
              <option key={doctor.id} value={doctor.id}>
                {doctor.name}
              </option>
            ))}
          </select>
          {fieldErrors.doctorId ? <p className="text-sm text-orange-700">{fieldErrors.doctorId}</p> : null}
        </div>
        <div className="field">
          <label htmlFor="service">Service type</label>
          <select
            id="service"
            value={form.serviceType}
            onChange={(event) => updateField("serviceType", event.target.value)}
          >
            <option value="">Select service</option>
            {serviceTypes.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
          {fieldErrors.serviceType ? <p className="text-sm text-orange-700">{fieldErrors.serviceType}</p> : null}
        </div>
        <div className="field">
          <label htmlFor="date">Preferred date</label>
          <select
            id="date"
            disabled={!form.doctorId || isLoadingDates || availableDates.length === 0}
            value={form.appointmentDate}
            onChange={(event) => updateField("appointmentDate", event.target.value)}
          >
            <option value="">
              {!form.doctorId
                ? "Select doctor first"
                : isLoadingDates
                  ? "Loading dates..."
                  : availableDates.length === 0
                    ? "No dates available"
                    : "Select date"}
            </option>
            {availableDates.map((date) => (
              <option key={date} value={date}>
                {date}
              </option>
            ))}
          </select>
          {availableDates.length > 0 ? <p className="subtle">Suggested: {availableDates[0]}</p> : null}
          {fieldErrors.appointmentDate ? <p className="text-sm text-orange-700">{fieldErrors.appointmentDate}</p> : null}
        </div>
        <div className="field">
          <label htmlFor="time">Preferred slot</label>
          <select
            id="time"
            disabled={!form.appointmentDate || isLoadingSlots || availableTimeSlots.length === 0}
            value={form.timeSlot}
            onChange={(event) => updateField("timeSlot", event.target.value)}
          >
            <option value="">
              {!form.appointmentDate
                ? "Select date first"
                : isLoadingSlots
                  ? "Loading slots..."
                  : availableTimeSlots.length === 0
                    ? "No slots available"
                    : "Select slot"}
            </option>
            {availableTimeSlots.map((slot) => (
              <option key={slot} value={slot}>
                {slot}
              </option>
            ))}
          </select>
          {availableTimeSlots.length > 0 ? <p className="subtle">Suggested: {availableTimeSlots[0]}</p> : null}
          {fieldErrors.timeSlot ? <p className="text-sm text-orange-700">{fieldErrors.timeSlot}</p> : null}
        </div>
      </div>

      <div className="field mt-4">
        <label htmlFor="notes">Reason for visit</label>
        <Textarea
          id="notes"
          placeholder="Blurred vision, follow-up, lens replacement, prescription renewal..."
          value={form.reason}
          onChange={(event) => updateField("reason", event.target.value)}
        />
        {fieldErrors.reason ? <p className="text-sm text-orange-700">{fieldErrors.reason}</p> : null}
      </div>

      {error ? <p className="mt-4 text-sm font-medium text-orange-700">{error}</p> : null}
      {message ? <p className="mt-4 text-sm font-medium text-primary">{message}</p> : null}

      <div className="button-row">
        <Button disabled={isSubmitting} type="submit">
          {isSubmitting ? "Saving..." : "Save as booking"}
        </Button>
        <Button disabled={isSubmitting} type="button" variant="secondary" onClick={() => void submit("WALK_IN")}>
          Register as walk-in
        </Button>
      </div>
    </form>
  );
}
