import { AppointmentRequestForm } from "@/components/booking/appointment-request-form";

export default function BookAppointmentPage() {
  return (
    <main className="shell page">
      <div className="page-header">
        <span className="eyebrow">Booking entry point</span>
        <h1>One form supports both patient self-booking and staff-assisted registration.</h1>
        <p>
          This is still a UI-first milestone, so the form is not submitted yet. The shape matches the future appointment
          API and keeps the walk-in versus scheduled flow easy to extend.
        </p>
      </div>

      <AppointmentRequestForm />
    </main>
  );
}
