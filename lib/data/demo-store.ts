export type DemoPatient = {
  id: string;
  fullName: string;
  phone: string;
  email?: string;
  source: "ONLINE" | "WALK_IN" | "STAFF";
  createdAt: string;
};

export type AppointmentStatus = "PENDING" | "CONFIRMED" | "CHECKED_IN" | "COMPLETED" | "CANCELLED";

export type DemoAppointment = {
  id: string;
  patientId: string;
  patientName: string;
  patientPhone: string;
  patientEmail?: string;
  doctorId: string;
  doctorName: string;
  serviceType: string;
  appointmentDate: string;
  timeSlot: string;
  status: AppointmentStatus;
  bookingSource: "ONLINE" | "WALK_IN" | "STAFF";
  reason?: string;
  createdAt: string;
};

export type ProductStatus = "IN_STOCK" | "LOW_STOCK" | "OUT_OF_STOCK";

export type DemoProduct = {
  id: string;
  name: string;
  category: string;
  sku: string;
  description: string;
  price: number;
  stock: number;
  threshold: number;
  status: ProductStatus;
  isActive: boolean;
  createdAt: string;
};

export type DemoPrescription = {
  id: string;
  appointmentId: string;
  patientId: string;
  patientEmail?: string;
  patientName: string;
  doctorId: string;
  doctorName: string;
  diagnosis: string;
  lensPower: string;
  medicines: string;
  advice: string;
  printableText: string;
  createdAt: string;
};

type DemoStore = {
  patients: DemoPatient[];
  appointments: DemoAppointment[];
  products: DemoProduct[];
  prescriptions: DemoPrescription[];
};

export const APPOINTMENT_TIME_SLOTS = [
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00"
] as const;

declare global {
  var __eyeOpticsDemoStore__: DemoStore | undefined;
}

function createId(prefix: string) {
  return `${prefix}-${Math.random().toString(36).slice(2, 10)}`;
}

function formatLocalDate(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function getProductStatus(stock: number, threshold: number): ProductStatus {
  if (stock <= 0) {
    return "OUT_OF_STOCK";
  }

  if (stock <= threshold) {
    return "LOW_STOCK";
  }

  return "IN_STOCK";
}

function initialStore(): DemoStore {
  const patients: DemoPatient[] = [
    {
      id: "patient-sadia",
      fullName: "Sadia Karim",
      phone: "+8801700000001",
      email: "patient@eyeoptics.local",
      source: "ONLINE",
      createdAt: "2026-04-20T09:00:00.000Z"
    },
    {
      id: "patient-rezaul",
      fullName: "Rezaul Karim",
      phone: "+8801700000002",
      email: "rezaul@example.com",
      source: "WALK_IN",
      createdAt: "2026-04-21T10:15:00.000Z"
    }
  ];

  const appointments: DemoAppointment[] = [
    {
      id: "appt-1001",
      patientId: "patient-sadia",
      patientName: "Sadia Karim",
      patientPhone: "+8801700000001",
      patientEmail: "patient@eyeoptics.local",
      doctorId: "doc-1",
      doctorName: "Dr. Nadia Rahman",
      serviceType: "Eye Examination",
      appointmentDate: "2026-04-25",
      timeSlot: "10:30",
      status: "CONFIRMED",
      bookingSource: "ONLINE",
      reason: "Blurred vision and headache during screen use",
      createdAt: "2026-04-21T08:00:00.000Z"
    },
    {
      id: "appt-1002",
      patientId: "patient-sadia",
      patientName: "Sadia Karim",
      patientPhone: "+8801700000001",
      patientEmail: "patient@eyeoptics.local",
      doctorId: "doc-3",
      doctorName: "Dr. Rafi Ahmed",
      serviceType: "Prescription Renewal",
      appointmentDate: "2026-03-28",
      timeSlot: "15:00",
      status: "COMPLETED",
      bookingSource: "ONLINE",
      reason: "Prescription follow-up and lens update",
      createdAt: "2026-03-24T08:00:00.000Z"
    },
    {
      id: "appt-1003",
      patientId: "patient-rezaul",
      patientName: "Rezaul Karim",
      patientPhone: "+8801700000002",
      patientEmail: "rezaul@example.com",
      doctorId: "doc-2",
      doctorName: "Dr. Sameer Hasan",
      serviceType: "Eye Examination",
      appointmentDate: "2026-04-24",
      timeSlot: "11:00",
      status: "CHECKED_IN",
      bookingSource: "WALK_IN",
      reason: "Child vision screening follow-up",
      createdAt: "2026-04-22T09:30:00.000Z"
    }
  ];

  const products: DemoProduct[] = [
    {
      id: "product-1",
      name: "BlueShield Frame A2",
      category: "Frames",
      sku: "FRM-014",
      description: "Lightweight frame suitable for daily prescription wear.",
      price: 45,
      stock: 9,
      threshold: 3,
      status: "IN_STOCK",
      isActive: true,
      createdAt: "2026-04-18T08:00:00.000Z"
    },
    {
      id: "product-2",
      name: "HydraLens Daily Pack",
      category: "Lenses",
      sku: "LEN-001",
      description: "Daily use contact lens pack with fast-moving stock.",
      price: 22,
      stock: 3,
      threshold: 3,
      status: "LOW_STOCK",
      isActive: true,
      createdAt: "2026-04-18T08:10:00.000Z"
    },
    {
      id: "product-3",
      name: "Lubricating Eye Drops",
      category: "Medicines",
      sku: "MED-007",
      description: "Commonly prescribed supportive item for dryness relief.",
      price: 8,
      stock: 0,
      threshold: 2,
      status: "OUT_OF_STOCK",
      isActive: true,
      createdAt: "2026-04-18T08:20:00.000Z"
    }
  ];

  const prescriptions: DemoPrescription[] = [
    {
      id: "rx-1001",
      appointmentId: "appt-1002",
      patientId: "patient-sadia",
      patientEmail: "patient@eyeoptics.local",
      patientName: "Sadia Karim",
      doctorId: "doc-3",
      doctorName: "Dr. Rafi Ahmed",
      diagnosis: "Myopia with screen-related eye strain",
      lensPower: "Left -1.25, Right -1.00",
      medicines: "Lubricating eye drops twice daily",
      advice: "Reduce continuous screen time and return for follow-up in 3 months",
      printableText:
        "Diagnosis: Myopia with screen-related eye strain\nLens Power: Left -1.25, Right -1.00\nMedicines: Lubricating eye drops twice daily\nAdvice: Reduce continuous screen time and return for follow-up in 3 months",
      createdAt: "2026-03-28T15:30:00.000Z"
    }
  ];

  return { patients, appointments, products, prescriptions };
}

function ensureStoreShape(store: Partial<DemoStore> | undefined): DemoStore {
  const fallback = initialStore();

  return {
    patients: Array.isArray(store?.patients) ? store.patients : fallback.patients,
    appointments: Array.isArray(store?.appointments) ? store.appointments : fallback.appointments,
    products: Array.isArray(store?.products) ? store.products : fallback.products,
    prescriptions: Array.isArray(store?.prescriptions) ? store.prescriptions : fallback.prescriptions
  };
}

function getStore() {
  globalThis.__eyeOpticsDemoStore__ = ensureStoreShape(globalThis.__eyeOpticsDemoStore__);

  return globalThis.__eyeOpticsDemoStore__;
}

export function listPatients(search?: string) {
  const store = getStore();
  const query = search?.trim().toLowerCase();

  if (!query) {
    return [...store.patients];
  }

  return store.patients.filter((patient) => {
    return (
      patient.fullName.toLowerCase().includes(query) ||
      patient.phone.toLowerCase().includes(query) ||
      patient.email?.toLowerCase().includes(query)
    );
  });
}

export function findOrCreatePatient(input: Omit<DemoPatient, "id" | "createdAt">) {
  const store = getStore();

  const existing = store.patients.find((patient) => {
    return patient.phone === input.phone || (input.email ? patient.email === input.email : false);
  });

  if (existing) {
    return existing;
  }

  const patient: DemoPatient = {
    ...input,
    id: createId("patient"),
    createdAt: new Date().toISOString()
  };

  store.patients.unshift(patient);
  return patient;
}

export function getPatientByEmail(email?: string | null) {
  if (!email) {
    return null;
  }

  return getStore().patients.find((patient) => patient.email === email) ?? null;
}

export function listAppointments(filters?: {
  patientEmail?: string;
  doctorId?: string;
  status?: string;
  appointmentId?: string;
}) {
  const store = getStore();

  return store.appointments.filter((appointment) => {
    if (filters?.appointmentId && appointment.id !== filters.appointmentId) {
      return false;
    }

    if (filters?.patientEmail && appointment.patientEmail !== filters.patientEmail) {
      return false;
    }

    if (filters?.doctorId && appointment.doctorId !== filters.doctorId) {
      return false;
    }

    if (filters?.status && appointment.status !== filters.status) {
      return false;
    }

    return true;
  });
}

export function getAvailableDatesForDoctor(doctorId: string, daysAhead = 21) {
  const today = new Date();
  const dates: string[] = [];

  for (let offset = 0; offset < daysAhead; offset += 1) {
    const date = new Date(today);
    date.setDate(today.getDate() + offset);

    const iso = formatLocalDate(date);

    if (getAvailableTimeSlots(doctorId, iso).length > 0) {
      dates.push(iso);
    }
  }

  return dates;
}

export function getAvailableTimeSlots(doctorId: string, appointmentDate: string) {
  const reserved = new Set(
    listAppointments({ doctorId })
      .filter((appointment) => appointment.appointmentDate === appointmentDate)
      .filter((appointment) => appointment.status !== "CANCELLED")
      .map((appointment) => appointment.timeSlot)
  );

  return APPOINTMENT_TIME_SLOTS.filter((slot) => !reserved.has(slot));
}

export function isSlotAvailable(doctorId: string, appointmentDate: string, timeSlot: string) {
  return getAvailableTimeSlots(doctorId, appointmentDate).includes(timeSlot as (typeof APPOINTMENT_TIME_SLOTS)[number]);
}

export function createAppointment(input: Omit<DemoAppointment, "id" | "createdAt">) {
  const store = getStore();
  const appointment: DemoAppointment = {
    ...input,
    id: createId("appt"),
    createdAt: new Date().toISOString()
  };

  store.appointments.unshift(appointment);
  return appointment;
}

export function updateAppointmentStatus(id: string, status: AppointmentStatus) {
  const store = getStore();
  const appointment = store.appointments.find((item) => item.id === id);

  if (!appointment) {
    return null;
  }

  appointment.status = status;
  return appointment;
}

export function listProducts() {
  return [...getStore().products];
}

export function createProduct(input: Omit<DemoProduct, "id" | "createdAt" | "status">) {
  const store = getStore();
  const product: DemoProduct = {
    ...input,
    id: createId("product"),
    createdAt: new Date().toISOString(),
    status: getProductStatus(input.stock, input.threshold)
  };

  store.products.unshift(product);
  return product;
}

export function updateProduct(id: string, input: Partial<Pick<DemoProduct, "name" | "category" | "price" | "stock" | "threshold" | "description" | "isActive">>) {
  const store = getStore();
  const product = store.products.find((item) => item.id === id);

  if (!product) {
    return null;
  }

  Object.assign(product, input);
  product.status = getProductStatus(product.stock, product.threshold);
  return product;
}

export function listPrescriptions(filters?: { patientEmail?: string; doctorId?: string }) {
  const store = getStore();

  return store.prescriptions.filter((prescription) => {
    if (filters?.patientEmail && prescription.patientEmail !== filters.patientEmail) {
      return false;
    }

    if (filters?.doctorId && prescription.doctorId !== filters.doctorId) {
      return false;
    }

    return true;
  });
}

export function createPrescription(input: Omit<DemoPrescription, "id" | "createdAt" | "printableText">) {
  const store = getStore();
  const printableText = [
    `Diagnosis: ${input.diagnosis}`,
    `Lens Power: ${input.lensPower}`,
    `Medicines: ${input.medicines}`,
    `Advice: ${input.advice}`
  ].join("\n");

  const prescription: DemoPrescription = {
    ...input,
    id: createId("rx"),
    createdAt: new Date().toISOString(),
    printableText
  };

  store.prescriptions.unshift(prescription);

  const appointment = store.appointments.find((item) => item.id === input.appointmentId);
  if (appointment && appointment.status !== "COMPLETED") {
    appointment.status = "COMPLETED";
  }

  return prescription;
}

export function getPatientOverview(patientEmail?: string | null) {
  const appointments = listAppointments({ patientEmail: patientEmail ?? undefined });
  const prescriptions = listPrescriptions({ patientEmail: patientEmail ?? undefined });

  return {
    appointments,
    prescriptions,
    completedVisits: appointments.filter((item) => item.status === "COMPLETED"),
    upcomingAppointments: appointments.filter((item) => item.status === "CONFIRMED" || item.status === "CHECKED_IN")
  };
}
