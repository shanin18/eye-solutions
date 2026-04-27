import type { DemoAppointment, DemoExamination, DemoInvoice, DemoPrescription, DemoServiceOrder } from "@/lib/data/data-service";

type PatientHistoryProps = {
  appointments: DemoAppointment[];
  examinations: DemoExamination[];
  prescriptions: DemoPrescription[];
  serviceOrders: DemoServiceOrder[];
  invoices: DemoInvoice[];
};

export function PatientHistory({ appointments, examinations, prescriptions, serviceOrders, invoices }: PatientHistoryProps) {
  return (
    <div className="app-grid two">
      <section className="section-card">
        <span className="eyebrow">Visit history</span>
        <h3 className="mt-2">Previous visits and status timeline</h3>
        <div className="mt-4 list-block">
          {appointments.map((appointment) => (
            <div className="list-row" key={appointment.id}>
              <div>
                <strong>{appointment.doctorName}</strong>
                <p>
                  {appointment.appointmentDate} at {appointment.timeSlot}
                </p>
                <p>{appointment.reason}</p>
              </div>
              <span className="pill">{appointment.status}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="section-card">
        <span className="eyebrow">Examinations</span>
        <h3 className="mt-2">Recorded eye examination details</h3>
        <div className="mt-4 list-block">
          {examinations.map((exam) => (
            <div className="list-row" key={exam.id}>
              <div>
                <strong>{exam.diagnosis}</strong>
                <p>Left: {exam.leftEyeVision} | Right: {exam.rightEyeVision}</p>
                <p>{exam.notes}</p>
              </div>
              <span className="pill">Saved</span>
            </div>
          ))}
        </div>
      </section>

      <section className="section-card">
        <span className="eyebrow">Prescription history</span>
        <h3 className="mt-2">Previous prescriptions</h3>
        <div className="mt-4 list-block">
          {prescriptions.map((prescription) => (
            <div className="list-row" key={prescription.id}>
              <div>
                <strong>{prescription.doctorName}</strong>
                <p>{prescription.diagnosis}</p>
                <p>{prescription.createdAt.slice(0, 10)}</p>
              </div>
              <span className="pill">Ready</span>
            </div>
          ))}
        </div>
      </section>

      <section className="section-card">
        <span className="eyebrow">Optical orders</span>
        <h3 className="mt-2">Service and product order status</h3>
        <div className="mt-4 list-block">
          {serviceOrders.map((order) => (
            <div className="list-row" key={order.id}>
              <div>
                <strong>{order.source}</strong>
                <p>{order.items.join(", ")}</p>
              </div>
              <span className="pill">{order.status}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="section-card">
        <span className="eyebrow">Invoices</span>
        <h3 className="mt-2">Billing and payment progress</h3>
        <div className="mt-4 list-block">
          {invoices.map((invoice) => (
            <div className="list-row" key={invoice.id}>
              <div>
                <strong>{invoice.referenceType}</strong>
                <p>Amount: {invoice.totalAmount}</p>
              </div>
              <span className="pill">{invoice.paymentStatus}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
