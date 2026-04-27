import { PaymentStatus, Prisma, type AppointmentStatus as PrismaAppointmentStatus } from "@prisma/client";

import { prisma } from "@/lib/db/prisma";
import type { Doctor, Service } from "@/lib/types";

export type DemoPatient = {
  id: string;
  fullName: string;
  phone: string;
  email?: string;
  source: "ONLINE" | "WALK_IN" | "STAFF";
  createdAt: string;
};

export type AppointmentStatus = "PENDING" | "CONFIRMED" | "CHECKED_IN" | "COMPLETED" | "CANCELLED" | "NO_SHOW";

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

const appointmentInclude = {
  patient: {
    include: {
      user: true
    }
  },
  doctor: {
    include: {
      user: true
    }
  }
} satisfies Prisma.AppointmentInclude;

const examinationInclude = {
  patient: {
    include: {
      user: true
    }
  },
  doctor: {
    include: {
      user: true
    }
  }
} satisfies Prisma.ExaminationInclude;

const prescriptionInclude = {
  patient: {
    include: {
      user: true
    }
  },
  doctor: {
    include: {
      user: true
    }
  },
  examination: true
} satisfies Prisma.PrescriptionInclude;

function formatLocalDate(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function decimalToNumber(value: Prisma.Decimal | number | string | null | undefined) {
  if (value == null) {
    return 0;
  }

  return Number(value);
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

function mapAppointment(
  appointment: Prisma.AppointmentGetPayload<{
    include: typeof appointmentInclude;
  }>
): DemoAppointment {
  return {
    id: appointment.id,
    patientId: appointment.patientId,
    patientName: appointment.patient.fullName,
    patientPhone: appointment.patient.phone,
    patientEmail: appointment.patient.email ?? appointment.patient.user?.email ?? undefined,
    doctorId: appointment.doctorId,
    doctorName: appointment.doctor.user.fullName,
    serviceType: appointment.serviceType,
    appointmentDate: appointment.appointmentDate,
    timeSlot: appointment.timeSlot,
    status: appointment.status,
    bookingSource: appointment.bookingSource,
    reason: appointment.reason ?? undefined,
    createdAt: appointment.createdAt.toISOString()
  };
}

function mapProduct(product: {
  id: string;
  name: string;
  category: string;
  sku: string;
  description: string;
  price: Prisma.Decimal | number | string;
  stockQuantity: number;
  lowStockThreshold: number;
  isActive: boolean;
  createdAt: Date;
}): DemoProduct {
  return {
    id: product.id,
    name: product.name,
    category: product.category,
    sku: product.sku,
    description: product.description,
    price: decimalToNumber(product.price),
    stock: product.stockQuantity,
    threshold: product.lowStockThreshold,
    status: getProductStatus(product.stockQuantity, product.lowStockThreshold),
    isActive: product.isActive,
    createdAt: product.createdAt.toISOString()
  };
}

function mapExamination(
  examination: Prisma.ExaminationGetPayload<{
    include: typeof examinationInclude;
  }>
): DemoExamination {
  return {
    id: examination.id,
    appointmentId: examination.appointmentId,
    patientId: examination.patientId,
    doctorId: examination.doctorId,
    leftEyeVision: examination.leftEyeVision ?? "",
    rightEyeVision: examination.rightEyeVision ?? "",
    diagnosis: examination.diagnosis ?? "",
    notes: examination.notes ?? "",
    followUpAdvice: examination.followUpAdvice ?? "",
    recommendations: examination.recommendations ?? "",
    createdAt: examination.createdAt.toISOString()
  };
}

function mapPrescription(
  prescription: Prisma.PrescriptionGetPayload<{
    include: typeof prescriptionInclude;
  }>
): DemoPrescription {
  return {
    id: prescription.id,
    appointmentId: prescription.appointmentId,
    patientId: prescription.patientId,
    patientEmail: prescription.patient.email ?? prescription.patient.user?.email ?? undefined,
    patientName: prescription.patientName,
    doctorId: prescription.doctorId,
    doctorName: prescription.doctorName,
    leftEyeVision: prescription.leftEyeVision,
    rightEyeVision: prescription.rightEyeVision,
    diagnosis: prescription.diagnosis,
    clinicalNotes: prescription.clinicalNotes,
    lensPower: prescription.lensPower,
    medicines: prescription.medicines,
    recommendations: prescription.recommendations,
    advice: prescription.advice,
    printableText: prescription.printableText,
    createdAt: prescription.createdAt.toISOString()
  };
}

function mapRestock(restock: {
  id: string;
  itemName: string;
  productId: string | null;
  requiredQuantity: number;
  frequency: number;
  lastRequestedDate: string;
  status: RestockStatus;
}): DemoRestockRequest {
  return {
    id: restock.id,
    itemName: restock.itemName,
    productId: restock.productId ?? undefined,
    requiredQuantity: restock.requiredQuantity,
    frequency: restock.frequency,
    lastRequestedDate: restock.lastRequestedDate,
    status: restock.status
  };
}

function mapServiceOrder(order: {
  id: string;
  patientId: string | null;
  patientName: string;
  source: string;
  items: Prisma.JsonValue;
  totalAmount: Prisma.Decimal | number | string;
  status: ServiceOrderStatus;
  createdAt: Date;
}): DemoServiceOrder {
  return {
    id: order.id,
    patientId: order.patientId ?? undefined,
    patientName: order.patientName,
    source: order.source as DemoServiceOrder["source"],
    items: Array.isArray(order.items) ? order.items.filter((item): item is string => typeof item === "string") : [],
    totalAmount: decimalToNumber(order.totalAmount),
    status: order.status,
    createdAt: order.createdAt.toISOString()
  };
}

function mapInvoice(invoice: {
  id: string;
  referenceType: string;
  referenceId: string;
  patientName: string;
  totalAmount: Prisma.Decimal | number | string;
  paymentStatus: PaymentStatus;
  createdAt: Date;
}): DemoInvoice {
  return {
    id: invoice.id,
    referenceType: invoice.referenceType as DemoInvoice["referenceType"],
    referenceId: invoice.referenceId,
    patientName: invoice.patientName,
    totalAmount: decimalToNumber(invoice.totalAmount),
    paymentStatus: invoice.paymentStatus,
    createdAt: invoice.createdAt.toISOString()
  };
}

export async function listDoctors(): Promise<Doctor[]> {
  const doctors = await prisma.doctorProfile.findMany({
    where: { isActive: true },
    include: { user: true },
    orderBy: { user: { fullName: "asc" } }
  });

  return doctors.map((doctor) => ({
    id: doctor.id,
    name: doctor.user.fullName,
    specialization: doctor.specialization,
    bio: doctor.bio ?? "Doctor profile will be updated soon.",
    fee: decimalToNumber(doctor.consultationFee),
    schedule: doctor.schedule ?? "Schedule to be updated"
  }));
}

export async function listServices(): Promise<Service[]> {
  const services = await prisma.service.findMany({
    where: { isActive: true },
    orderBy: { createdAt: "asc" }
  });

  return services.map((service) => ({
    id: service.id,
    name: service.name,
    description: service.description,
    type: service.type as Service["type"],
    duration: service.duration,
    priceLabel: service.priceLabel
  }));
}

export async function getPublicDashboardSummaries() {
  const [appointments, patients, restocks] = await Promise.all([
    prisma.appointment.count(),
    prisma.patientProfile.count(),
    prisma.restockRequest.count({
      where: {
        status: {
          in: ["PENDING", "ORDERED"]
        }
      }
    })
  ]);

  return [
    {
      label: "Today’s appointments",
      value: String(appointments),
      description: "Includes online bookings, front-desk bookings, and walk-ins merged into one queue."
    },
    {
      label: "Active patients",
      value: String(patients),
      description: "Historical visits, prescriptions, invoices, and service orders stay connected to the same patient."
    },
    {
      label: "Restock signals",
      value: String(restocks),
      description: "Unavailable items convert into visible operational follow-ups instead of silent failures."
    }
  ] as const;
}

export async function listPatients(search?: string) {
  const query = search?.trim();

  const patients = await prisma.patientProfile.findMany({
    where: query
      ? {
          OR: [
            { fullName: { contains: query, mode: "insensitive" } },
            { phone: { contains: query, mode: "insensitive" } },
            { email: { contains: query, mode: "insensitive" } }
          ]
        }
      : undefined,
    orderBy: { createdAt: "desc" }
  });

  return patients.map((patient) => ({
    id: patient.id,
    fullName: patient.fullName,
    phone: patient.phone,
    email: patient.email ?? undefined,
    source: "STAFF" as const,
    createdAt: patient.createdAt.toISOString()
  }));
}

export async function findOrCreatePatient(input: Omit<DemoPatient, "id" | "createdAt">) {
  const where = [
    input.email ? { email: input.email } : undefined,
    { phone: input.phone }
  ].filter(Boolean) as Prisma.PatientProfileWhereInput[];

  const existing = where.length
    ? await prisma.patientProfile.findFirst({
        where: {
          OR: where
        }
      })
    : null;

  if (existing) {
    return {
      id: existing.id,
      fullName: existing.fullName,
      phone: existing.phone,
      email: existing.email ?? undefined,
      source: input.source,
      createdAt: existing.createdAt.toISOString()
    };
  }

  const patient = await prisma.patientProfile.create({
    data: {
      fullName: input.fullName,
      phone: input.phone,
      email: input.email
    }
  });

  return {
    id: patient.id,
    fullName: patient.fullName,
    phone: patient.phone,
    email: patient.email ?? undefined,
    source: input.source,
    createdAt: patient.createdAt.toISOString()
  };
}

export async function getPatientByEmail(email?: string | null) {
  if (!email) {
    return null;
  }

  const patient = await prisma.patientProfile.findFirst({
    where: { email }
  });

  if (!patient) {
    return null;
  }

  return {
    id: patient.id,
    fullName: patient.fullName,
    phone: patient.phone,
    email: patient.email ?? undefined,
    source: "ONLINE" as const,
    createdAt: patient.createdAt.toISOString()
  };
}

export async function listAppointments(filters?: {
  patientEmail?: string;
  doctorId?: string;
  status?: string;
  appointmentId?: string;
}) {
  const appointments = await prisma.appointment.findMany({
    where: {
      id: filters?.appointmentId,
      doctorId: filters?.doctorId,
      status: filters?.status as PrismaAppointmentStatus | undefined,
      patient: filters?.patientEmail
        ? {
            email: filters.patientEmail
          }
        : undefined
    },
    include: appointmentInclude,
    orderBy: [{ appointmentDate: "desc" }, { timeSlot: "desc" }]
  });

  return appointments.map(mapAppointment);
}

export async function listBranches() {
  const branches = await prisma.branch.findMany({
    orderBy: { createdAt: "asc" }
  });

  return branches.map((branch) => ({
    id: branch.id,
    name: branch.name,
    address: branch.address,
    contactNumber: branch.contactNumber,
    status: branch.status as DemoBranch["status"]
  }));
}

export async function listUsers() {
  const users = await prisma.user.findMany({
    orderBy: { createdAt: "asc" }
  });

  return users.map((user) => ({
    id: user.id,
    fullName: user.fullName,
    email: user.email,
    role: user.role,
    branchId: user.branchId ?? undefined,
    status: user.status as DemoUserAccount["status"]
  }));
}

export async function getSystemSettings() {
  const settings = await prisma.systemSetting.findUnique({
    where: { id: "system-default" }
  });

  return {
    defaultCurrency: settings?.defaultCurrency ?? "BDT",
    prescriptionFooter: settings?.prescriptionFooter ?? "Eye Solutions • Keep your prescription for future reference",
    reminderMode: settings?.reminderMode ?? "PLANNED"
  } satisfies DemoSystemSettings;
}

export async function getAvailableDatesForDoctor(doctorId: string, daysAhead = 21) {
  const today = new Date();
  const dates: string[] = [];

  for (let offset = 0; offset < daysAhead; offset += 1) {
    const date = new Date(today);
    date.setDate(today.getDate() + offset);
    const iso = formatLocalDate(date);

    if ((await getAvailableTimeSlots(doctorId, iso)).length > 0) {
      dates.push(iso);
    }
  }

  return dates;
}

export async function getAvailableTimeSlots(doctorId: string, appointmentDate: string) {
  const reservedAppointments = await prisma.appointment.findMany({
    where: {
      doctorId,
      appointmentDate,
      status: {
        not: "CANCELLED"
      }
    },
    select: { timeSlot: true }
  });

  const reserved = new Set(reservedAppointments.map((appointment) => appointment.timeSlot));

  return APPOINTMENT_TIME_SLOTS.filter((slot) => !reserved.has(slot));
}

export async function createAppointment(input: Omit<DemoAppointment, "id" | "createdAt">) {
  const appointment = await prisma.appointment.create({
    data: {
      patientId: input.patientId,
      doctorId: input.doctorId,
      serviceType: input.serviceType,
      appointmentDate: input.appointmentDate,
      timeSlot: input.timeSlot,
      status: input.status,
      bookingSource: input.bookingSource,
      reason: input.reason
    },
    include: appointmentInclude
  });

  return mapAppointment(appointment);
}

export async function updateAppointmentStatus(id: string, status: AppointmentStatus) {
  try {
    const appointment = await prisma.appointment.update({
      where: { id },
      data: { status },
      include: appointmentInclude
    });

    return mapAppointment(appointment);
  } catch {
    return null;
  }
}

export async function listProducts() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" }
  });

  return products.map(mapProduct);
}

export async function createProduct(input: Omit<DemoProduct, "id" | "createdAt" | "status">) {
  const product = await prisma.product.create({
    data: {
      name: input.name,
      category: input.category,
      sku: input.sku,
      description: input.description,
      price: input.price,
      stockQuantity: input.stock,
      lowStockThreshold: input.threshold,
      isActive: input.isActive
    }
  });

  return mapProduct(product);
}

export async function updateProduct(
  id: string,
  input: Partial<Pick<DemoProduct, "name" | "category" | "price" | "stock" | "threshold" | "description" | "isActive">>
) {
  try {
    const product = await prisma.product.update({
      where: { id },
      data: {
        name: input.name,
        category: input.category,
        price: input.price,
        stockQuantity: input.stock,
        lowStockThreshold: input.threshold,
        description: input.description,
        isActive: input.isActive
      }
    });

    return mapProduct(product);
  } catch {
    return null;
  }
}

export async function listExaminations(filters?: { patientId?: string; doctorId?: string }) {
  const examinations = await prisma.examination.findMany({
    where: {
      patientId: filters?.patientId,
      doctorId: filters?.doctorId
    },
    include: examinationInclude,
    orderBy: { createdAt: "desc" }
  });

  return examinations.map(mapExamination);
}

export async function listPrescriptions(filters?: { patientEmail?: string; doctorId?: string }) {
  const prescriptions = await prisma.prescription.findMany({
    where: {
      doctorId: filters?.doctorId,
      patient: filters?.patientEmail
        ? {
            email: filters.patientEmail
          }
        : undefined
    },
    include: prescriptionInclude,
    orderBy: { createdAt: "desc" }
  });

  return prescriptions.map(mapPrescription);
}

async function pushRestockRequest(product: DemoProduct, requiredQuantity: number) {
  const existing = await prisma.restockRequest.findFirst({
    where: {
      productId: product.id,
      status: {
        not: "CLOSED"
      }
    }
  });

  if (existing) {
    return prisma.restockRequest.update({
      where: { id: existing.id },
      data: {
        requiredQuantity: existing.requiredQuantity + requiredQuantity,
        frequency: existing.frequency + 1,
        lastRequestedDate: formatLocalDate(new Date())
      }
    });
  }

  return prisma.restockRequest.create({
    data: {
      itemName: product.name,
      productId: product.id,
      requiredQuantity,
      frequency: 1,
      lastRequestedDate: formatLocalDate(new Date()),
      status: "PENDING"
    }
  });
}

export async function listRestockRequests() {
  const requests = await prisma.restockRequest.findMany({
    orderBy: { createdAt: "desc" }
  });

  return requests.map(mapRestock);
}

export async function updateRestockStatus(id: string, status: RestockStatus) {
  try {
    const restock = await prisma.restockRequest.update({
      where: { id },
      data: { status }
    });

    return mapRestock(restock);
  } catch {
    return null;
  }
}

export async function createPrescription(input: Omit<DemoPrescription, "id" | "createdAt" | "printableText">) {
  const appointment = await prisma.appointment.findUnique({
    where: { id: input.appointmentId },
    include: appointmentInclude
  });

  if (!appointment) {
    throw new Error("Appointment not found.");
  }

  const products = await listProducts();
  const medicineLines = input.medicines
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

  for (const medicineName of medicineLines) {
    const product = products.find((item) => item.name.toLowerCase() === medicineName.toLowerCase());

    if (!product) {
      continue;
    }

    if (product.stock <= 0 || product.stock <= product.threshold) {
      await pushRestockRequest(product, 1);
    }
  }

  const printableText = [
    `Vision: Left ${input.leftEyeVision}, Right ${input.rightEyeVision}`,
    `Diagnosis: ${input.diagnosis}`,
    `Clinical Notes: ${input.clinicalNotes}`,
    `Lens Power: ${input.lensPower}`,
    `Medicines: ${input.medicines}`,
    `Recommendations: ${input.recommendations}`,
    `Advice: ${input.advice}`
  ].join("\n");

  const prescription = await prisma.$transaction(async (tx) => {
    const examination = await tx.examination.create({
      data: {
        appointmentId: input.appointmentId,
        patientId: input.patientId,
        doctorId: input.doctorId,
        leftEyeVision: input.leftEyeVision,
        rightEyeVision: input.rightEyeVision,
        diagnosis: input.diagnosis,
        notes: input.clinicalNotes,
        followUpAdvice: input.advice,
        recommendations: input.recommendations
      }
    });

    const record = await tx.prescription.create({
      data: {
        appointmentId: input.appointmentId,
        patientId: input.patientId,
        doctorId: input.doctorId,
        examinationId: examination.id,
        patientName: input.patientName,
        doctorName: input.doctorName,
        leftEyeVision: input.leftEyeVision,
        rightEyeVision: input.rightEyeVision,
        diagnosis: input.diagnosis,
        clinicalNotes: input.clinicalNotes,
        lensPower: input.lensPower,
        medicines: input.medicines,
        recommendations: input.recommendations,
        advice: input.advice,
        printableText
      },
      include: prescriptionInclude
    });

    await tx.appointment.update({
      where: { id: input.appointmentId },
      data: { status: "COMPLETED" }
    });

    return record;
  });

  return mapPrescription(prescription);
}

export async function getPatientOverview(patientEmail?: string | null) {
  const patient = await getPatientByEmail(patientEmail);
  const [appointments, prescriptions, examinations, serviceOrders, invoices] = await Promise.all([
    listAppointments({ patientEmail: patientEmail ?? undefined }),
    listPrescriptions({ patientEmail: patientEmail ?? undefined }),
    patient ? listExaminations({ patientId: patient.id }) : Promise.resolve([]),
    listServiceOrders(patient?.id, patientEmail),
    listInvoices(patient?.fullName)
  ]);

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

export async function listServiceOrders(patientId?: string, patientEmail?: string | null) {
  const patient = patientEmail ? await getPatientByEmail(patientEmail) : undefined;

  const orders = await prisma.serviceOrder.findMany({
    where:
      patientId || patient?.id
        ? {
            patientId: patientId ?? patient?.id
          }
        : undefined,
    orderBy: { createdAt: "desc" }
  });

  return orders.map(mapServiceOrder);
}

export async function createServiceOrder(input: {
  patientId?: string;
  patientName: string;
  source: "PRESCRIPTION" | "DIRECT_OPTICAL";
  items: string[];
  totalAmount: number;
}) {
  const order = await prisma.serviceOrder.create({
    data: {
      patientId: input.patientId,
      patientName: input.patientName,
      source: input.source,
      items: input.items,
      totalAmount: input.totalAmount,
      status: "OPEN"
    }
  });

  return mapServiceOrder(order);
}

export async function updateServiceOrderStatus(id: string, status: ServiceOrderStatus) {
  try {
    const order = await prisma.serviceOrder.update({
      where: { id },
      data: { status }
    });

    return mapServiceOrder(order);
  } catch {
    return null;
  }
}

export async function listInvoices(patientName?: string) {
  const invoices = await prisma.invoice.findMany({
    where: {
      patientName: patientName ?? undefined
    },
    orderBy: { createdAt: "desc" }
  });

  return invoices.map(mapInvoice);
}

export async function createInvoice(input: {
  referenceType: "APPOINTMENT" | "SERVICE_ORDER";
  referenceId: string;
  patientName: string;
  totalAmount: number;
  paymentStatus?: InvoicePaymentStatus;
  patientId?: string;
}) {
  const invoice = await prisma.invoice.create({
    data: {
      referenceType: input.referenceType,
      referenceId: input.referenceId,
      patientId: input.patientId,
      patientName: input.patientName,
      totalAmount: input.totalAmount,
      paymentStatus: input.paymentStatus ?? "UNPAID"
    }
  });

  return mapInvoice(invoice);
}

export async function updateInvoicePaymentStatus(id: string, paymentStatus: InvoicePaymentStatus) {
  try {
    const invoice = await prisma.invoice.update({
      where: { id },
      data: { paymentStatus }
    });

    return mapInvoice(invoice);
  } catch {
    return null;
  }
}

export async function getOperationalReport() {
  const [totalAppointments, invoices, products, restocks, prescriptions] = await Promise.all([
    prisma.appointment.count(),
    prisma.invoice.findMany(),
    prisma.product.findMany(),
    prisma.restockRequest.findMany(),
    prisma.prescription.findMany()
  ]);

  const totalRevenue = invoices
    .filter((invoice) => invoice.paymentStatus === "PAID" || invoice.paymentStatus === "PARTIAL")
    .reduce((sum, invoice) => sum + decimalToNumber(invoice.totalAmount), 0);

  return {
    totalAppointments,
    totalRevenue,
    lowStockItems: products.map(mapProduct).filter((item) => item.status !== "IN_STOCK"),
    restockRequests: restocks.map(mapRestock),
    doctorActivity: prescriptions.reduce<Record<string, number>>((acc, prescription) => {
      acc[prescription.doctorName] = (acc[prescription.doctorName] ?? 0) + 1;
      return acc;
    }, {})
  };
}
