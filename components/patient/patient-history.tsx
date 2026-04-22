import type { DemoAppointment, DemoPrescription } from "@/lib/data/demo-store";

type PatientHistoryProps = {
  appointments: DemoAppointment[];
  prescriptions: DemoPrescription[];
};

export function PatientHistory({ appointments, prescriptions }: PatientHistoryProps) {
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
    </div>
  );
}

