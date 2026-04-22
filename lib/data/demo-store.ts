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
  leftEyeVision: string;
  rightEyeVision: string;
  diagnosis: string;
  clinicalNotes: string;
  lensPower: string;
  medicines: string;
  recommendations: string;
  advice: string;
  printableText: string;
  createdAt: string;
};

export type DemoBranch = {
  id: string;
  name: string;
  address: string;
  contactNumber: string;
  status: "ACTIVE" | "INACTIVE";
};

export type DemoUserAccount = {
  id: string;
  fullName: string;
  email: string;
  role: "SUPER_ADMIN" | "ADMIN" | "DOCTOR" | "RECEPTIONIST" | "OPTICAL_STAFF" | "PATIENT";
  branchId?: string;
  status: "ACTIVE" | "INVITED";
};

export type DemoSystemSettings = {
  defaultCurrency: string;
  prescriptionFooter: string;
  reminderMode: "DISABLED" | "PLANNED";
};

export type DemoExamination = {
  id: string;
  appointmentId: string;
  patientId: string;
  doctorId: string;
  leftEyeVision: string;
  rightEyeVision: string;
  diagnosis: string;
  notes: string;
  followUpAdvice: string;
  recommendations: string;
  createdAt: string;
};

export type RestockStatus = "PENDING" | "ORDERED" | "RECEIVED" | "CLOSED";

export type DemoRestockRequest = {
  id: string;
  itemName: string;
  productId?: string;
  requiredQuantity: number;
  frequency: number;
  lastRequestedDate: string;
  status: RestockStatus;
};

export type ServiceOrderStatus = "OPEN" | "READY" | "FULFILLED";

export type DemoServiceOrder = {
  id: string;
  patientId?: string;
  patientName: string;
  source: "PRESCRIPTION" | "DIRECT_OPTICAL";
  items: string[];
  totalAmount: number;
  status: ServiceOrderStatus;
  createdAt: string;
};

export type InvoicePaymentStatus = "UNPAID" | "PARTIAL" | "PAID";

export type DemoInvoice = {
  id: string;
  referenceType: "APPOINTMENT" | "SERVICE_ORDER";
  referenceId: string;
  patientName: string;
  totalAmount: number;
  paymentStatus: InvoicePaymentStatus;
  createdAt: string;
};

type DemoStore = {
  branches: DemoBranch[];
  users: DemoUserAccount[];
  settings: DemoSystemSettings;
  patients: DemoPatient[];
  appointments: DemoAppointment[];
  products: DemoProduct[];
  examinations: DemoExamination[];
  prescriptions: DemoPrescription[];
  restockRequests: DemoRestockRequest[];
  serviceOrders: DemoServiceOrder[];
  invoices: DemoInvoice[];
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
  const branches: DemoBranch[] = [
    {
      id: "branch-main",
      name: "Eye Solutions Main Branch",
      address: "Dhanmondi, Dhaka",
      contactNumber: "+8801700001000",
      status: "ACTIVE"
    },
    {
      id: "branch-north",
      name: "Eye Solutions North Branch",
      address: "Uttara, Dhaka",
      contactNumber: "+8801700002000",
      status: "ACTIVE"
    }
  ];

  const users: DemoUserAccount[] = [
    { id: "user-super-admin-1", fullName: "Farhan Enterprise", email: "superadmin@eyeoptics.local", role: "SUPER_ADMIN", status: "ACTIVE" },
    { id: "user-admin-1", fullName: "Amina Siddiqua", email: "admin@eyeoptics.local", role: "ADMIN", branchId: "branch-main", status: "ACTIVE" },
    { id: "user-doctor-1", fullName: "Dr. Nadia Rahman", email: "doctor@eyeoptics.local", role: "DOCTOR", branchId: "branch-main", status: "ACTIVE" },
    { id: "user-reception-1", fullName: "Nusrat Jahan", email: "reception@eyeoptics.local", role: "RECEPTIONIST", branchId: "branch-main", status: "ACTIVE" },
    { id: "user-optical-1", fullName: "Shuvo Das", email: "optical@eyeoptics.local", role: "OPTICAL_STAFF", branchId: "branch-main", status: "ACTIVE" },
    { id: "user-patient-1", fullName: "Sadia Karim", email: "patient@eyeoptics.local", role: "PATIENT", status: "ACTIVE" }
  ];

  const settings: DemoSystemSettings = {
    defaultCurrency: "BDT",
    prescriptionFooter: "Eye Solutions • Keep your prescription for future reference",
    reminderMode: "PLANNED"
  };

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
      leftEyeVision: "6/9",
      rightEyeVision: "6/9",
      diagnosis: "Myopia with screen-related eye strain",
      clinicalNotes: "Patient reports headaches after extended screen use.",
      lensPower: "Left -1.25, Right -1.00",
      medicines: "Lubricating eye drops twice daily",
      recommendations: "Anti-glare lens upgrade",
      advice: "Reduce continuous screen time and return for follow-up in 3 months",
      printableText:
        "Vision: Left 6/9, Right 6/9\nDiagnosis: Myopia with screen-related eye strain\nLens Power: Left -1.25, Right -1.00\nMedicines: Lubricating eye drops twice daily\nRecommendations: Anti-glare lens upgrade\nAdvice: Reduce continuous screen time and return for follow-up in 3 months",
      createdAt: "2026-03-28T15:30:00.000Z"
    }
  ];

  const examinations: DemoExamination[] = [
    {
      id: "exam-1001",
      appointmentId: "appt-1002",
      patientId: "patient-sadia",
      doctorId: "doc-3",
      leftEyeVision: "6/9",
      rightEyeVision: "6/9",
      diagnosis: "Myopia with screen-related eye strain",
      notes: "Patient reports headaches after extended screen use.",
      followUpAdvice: "Review again in 3 months",
      recommendations: "Anti-glare lens upgrade",
      createdAt: "2026-03-28T15:20:00.000Z"
    }
  ];

  const restockRequests: DemoRestockRequest[] = [
    {
      id: "restock-1",
      itemName: "Lubricating Eye Drops",
      productId: "product-3",
      requiredQuantity: 12,
      frequency: 3,
      lastRequestedDate: "2026-04-22",
      status: "PENDING"
    }
  ];

  const serviceOrders: DemoServiceOrder[] = [
    {
      id: "order-1001",
      patientId: "patient-sadia",
      patientName: "Sadia Karim",
      source: "PRESCRIPTION",
      items: ["Anti-glare lens upgrade", "BlueShield Frame A2"],
      totalAmount: 73,
      status: "READY",
      createdAt: "2026-03-28T16:00:00.000Z"
    },
    {
      id: "order-1002",
      patientName: "Walk-in: Karim",
      source: "DIRECT_OPTICAL",
      items: ["Frame replacement service"],
      totalAmount: 15,
      status: "OPEN",
      createdAt: "2026-04-22T10:15:00.000Z"
    }
  ];

  const invoices: DemoInvoice[] = [
    {
      id: "inv-1001",
      referenceType: "APPOINTMENT",
      referenceId: "appt-1002",
      patientName: "Sadia Karim",
      totalAmount: 12,
      paymentStatus: "PAID",
      createdAt: "2026-03-28T15:45:00.000Z"
    },
    {
      id: "inv-1002",
      referenceType: "SERVICE_ORDER",
      referenceId: "order-1001",
      patientName: "Sadia Karim",
      totalAmount: 73,
      paymentStatus: "PARTIAL",
      createdAt: "2026-03-28T16:10:00.000Z"
    }
  ];

  return { branches, users, settings, patients, appointments, products, examinations, prescriptions, restockRequests, serviceOrders, invoices };
}

function ensureStoreShape(store: Partial<DemoStore> | undefined): DemoStore {
  const fallback = initialStore();

  return {
    branches: Array.isArray(store?.branches) ? store.branches : fallback.branches,
    users: Array.isArray(store?.users) ? store.users : fallback.users,
    settings: store?.settings ?? fallback.settings,
    patients: Array.isArray(store?.patients) ? store.patients : fallback.patients,
    appointments: Array.isArray(store?.appointments) ? store.appointments : fallback.appointments,
    products: Array.isArray(store?.products) ? store.products : fallback.products,
    examinations: Array.isArray(store?.examinations) ? store.examinations : fallback.examinations,
    prescriptions: Array.isArray(store?.prescriptions) ? store.prescriptions : fallback.prescriptions
    ,
    restockRequests: Array.isArray(store?.restockRequests) ? store.restockRequests : fallback.restockRequests,
    serviceOrders: Array.isArray(store?.serviceOrders) ? store.serviceOrders : fallback.serviceOrders,
    invoices: Array.isArray(store?.invoices) ? store.invoices : fallback.invoices
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

export function listBranches() {
  return [...getStore().branches];
}

export function listUsers() {
  return [...getStore().users];
}

export function getSystemSettings() {
  return getStore().settings;
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

export function createWalkInAppointment(input: {
  fullName: string;
  phone: string;
  email?: string;
  doctorId: string;
  doctorName: string;
  serviceType: string;
  reason?: string;
}) {
  const patient = findOrCreatePatient({
    fullName: input.fullName,
    phone: input.phone,
    email: input.email,
    source: "WALK_IN"
  });

  const appointment = createAppointment({
    patientId: patient.id,
    patientName: patient.fullName,
    patientPhone: patient.phone,
    patientEmail: patient.email,
    doctorId: input.doctorId,
    doctorName: input.doctorName,
    serviceType: input.serviceType,
    appointmentDate: formatLocalDate(new Date()),
    timeSlot: getAvailableTimeSlots(input.doctorId, formatLocalDate(new Date()))[0] ?? "10:00",
    status: "CHECKED_IN",
    bookingSource: "WALK_IN",
    reason: input.reason
  });

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

export function listExaminations(filters?: { patientId?: string; doctorId?: string }) {
  const store = getStore();

  return store.examinations.filter((exam) => {
    if (filters?.patientId && exam.patientId !== filters.patientId) {
      return false;
    }

    if (filters?.doctorId && exam.doctorId !== filters.doctorId) {
      return false;
    }

    return true;
  });
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

function pushRestockRequest(product: DemoProduct, requiredQuantity: number) {
  const store = getStore();
  const existing = store.restockRequests.find((request) => request.productId === product.id && request.status !== "CLOSED");

  if (existing) {
    existing.requiredQuantity += requiredQuantity;
    existing.frequency += 1;
    existing.lastRequestedDate = formatLocalDate(new Date());
    return existing;
  }

  const request: DemoRestockRequest = {
    id: createId("restock"),
    itemName: product.name,
    productId: product.id,
    requiredQuantity,
    frequency: 1,
    lastRequestedDate: formatLocalDate(new Date()),
    status: "PENDING"
  };

  store.restockRequests.unshift(request);
  return request;
}

export function listRestockRequests() {
  return [...getStore().restockRequests];
}

export function updateRestockStatus(id: string, status: RestockStatus) {
  const request = getStore().restockRequests.find((item) => item.id === id);
  if (!request) return null;
  request.status = status;
  return request;
}

export function createPrescription(input: Omit<DemoPrescription, "id" | "createdAt" | "printableText">) {
  const store = getStore();
  const appointment = store.appointments.find((item) => item.id === input.appointmentId);
  const medicineLines = input.medicines
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

  medicineLines.forEach((medicineName) => {
    const product = store.products.find((item) => item.name.toLowerCase() === medicineName.toLowerCase());
    if (!product) {
      return;
    }

    if (product.stock <= 0) {
      pushRestockRequest(product, 1);
      return;
    }

    if (product.stock <= product.threshold) {
      pushRestockRequest(product, 1);
    }
  });

    const printableText = [
    `Vision: Left ${input.leftEyeVision}, Right ${input.rightEyeVision}`,
    `Diagnosis: ${input.diagnosis}`,
    `Clinical Notes: ${input.clinicalNotes}`,
    `Lens Power: ${input.lensPower}`,
    `Medicines: ${input.medicines}`,
    `Recommendations: ${input.recommendations}`,
    `Advice: ${input.advice}`
  ].join("\n");

  const prescription: DemoPrescription = {
    ...input,
    id: createId("rx"),
    createdAt: new Date().toISOString(),
    printableText
  };

  const examination: DemoExamination = {
    id: createId("exam"),
    appointmentId: input.appointmentId,
    patientId: input.patientId,
    doctorId: input.doctorId,
    leftEyeVision: input.leftEyeVision,
    rightEyeVision: input.rightEyeVision,
    diagnosis: input.diagnosis,
    notes: input.clinicalNotes,
    followUpAdvice: input.advice,
    recommendations: input.recommendations,
    createdAt: new Date().toISOString()
  };

  store.examinations.unshift(examination);
  store.prescriptions.unshift(prescription);

  if (appointment && appointment.status !== "COMPLETED") {
    appointment.status = "COMPLETED";
  }

  return prescription;
}

export function getPatientOverview(patientEmail?: string | null) {
  const appointments = listAppointments({ patientEmail: patientEmail ?? undefined });
  const prescriptions = listPrescriptions({ patientEmail: patientEmail ?? undefined });
  const patient = getPatientByEmail(patientEmail);
  const serviceOrders = listServiceOrders(patient?.id, patientEmail);
  const invoices = listInvoices(patient?.fullName);
  const examinations = patient ? listExaminations({ patientId: patient.id }) : [];

  return {
    appointments,
    prescriptions,
    examinations,
    serviceOrders,
    invoices,
    completedVisits: appointments.filter((item) => item.status === "COMPLETED"),
    upcomingAppointments: appointments.filter((item) => item.status === "CONFIRMED" || item.status === "CHECKED_IN")
  };
}

export function listServiceOrders(patientId?: string, patientEmail?: string | null) {
  const store = getStore();
  const patient = patientEmail ? getPatientByEmail(patientEmail) : undefined;

  return store.serviceOrders.filter((order) => {
    if (patientId && order.patientId === patientId) {
      return true;
    }

    if (patient && order.patientId === patient.id) {
      return true;
    }

    if (!patientId && !patientEmail) {
      return true;
    }

    return false;
  });
}

export function createServiceOrder(input: {
  patientId?: string;
  patientName: string;
  source: "PRESCRIPTION" | "DIRECT_OPTICAL";
  items: string[];
  totalAmount: number;
}) {
  const store = getStore();
  const order: DemoServiceOrder = {
    id: createId("order"),
    patientId: input.patientId,
    patientName: input.patientName,
    source: input.source,
    items: input.items,
    totalAmount: input.totalAmount,
    status: "OPEN",
    createdAt: new Date().toISOString()
  };
  store.serviceOrders.unshift(order);
  return order;
}

export function updateServiceOrderStatus(id: string, status: ServiceOrderStatus) {
  const order = getStore().serviceOrders.find((item) => item.id === id);
  if (!order) return null;
  order.status = status;
  return order;
}

export function listInvoices(patientName?: string) {
  const store = getStore();
  return store.invoices.filter((invoice) => {
    if (patientName && invoice.patientName !== patientName) {
      return false;
    }
    return true;
  });
}

export function createInvoice(input: {
  referenceType: "APPOINTMENT" | "SERVICE_ORDER";
  referenceId: string;
  patientName: string;
  totalAmount: number;
  paymentStatus?: InvoicePaymentStatus;
}) {
  const store = getStore();
  const invoice: DemoInvoice = {
    id: createId("inv"),
    referenceType: input.referenceType,
    referenceId: input.referenceId,
    patientName: input.patientName,
    totalAmount: input.totalAmount,
    paymentStatus: input.paymentStatus ?? "UNPAID",
    createdAt: new Date().toISOString()
  };
  store.invoices.unshift(invoice);
  return invoice;
}

export function updateInvoicePaymentStatus(id: string, paymentStatus: InvoicePaymentStatus) {
  const invoice = getStore().invoices.find((item) => item.id === id);
  if (!invoice) return null;
  invoice.paymentStatus = paymentStatus;
  return invoice;
}

export function getOperationalReport() {
  const store = getStore();
  const totalRevenue = store.invoices
    .filter((invoice) => invoice.paymentStatus === "PAID" || invoice.paymentStatus === "PARTIAL")
    .reduce((sum, invoice) => sum + invoice.totalAmount, 0);

  return {
    totalAppointments: store.appointments.length,
    totalRevenue,
    lowStockItems: store.products.filter((item) => item.status !== "IN_STOCK"),
    restockRequests: store.restockRequests,
    doctorActivity: store.prescriptions.reduce<Record<string, number>>((acc, prescription) => {
      acc[prescription.doctorName] = (acc[prescription.doctorName] ?? 0) + 1;
      return acc;
    }, {})
  };
}
