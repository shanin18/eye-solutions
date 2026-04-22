import type { Doctor, Product, Service } from "@/lib/types";

export const dashboardSummaries = [
  {
    label: "Today’s appointments",
    value: "28",
    description: "Includes online bookings, front-desk bookings, and walk-ins merged into one queue."
  },
  {
    label: "Active patients",
    value: "1,240",
    description: "Historical visits, prescriptions, invoices, and service orders stay connected to the same patient."
  },
  {
    label: "Restock signals",
    value: "12",
    description: "Unavailable items convert into visible operational follow-ups instead of silent failures."
  }
] as const;

export const doctors: Doctor[] = [
  {
    id: "doc-1",
    name: "Dr. Nadia Rahman",
    specialization: "Comprehensive Eye Care",
    bio: "Focuses on routine eye exams, digital prescriptions, and long-term patient history management.",
    fee: 24,
    schedule: "Sun-Thu, 10:00-16:00"
  },
  {
    id: "doc-2",
    name: "Dr. Sameer Hasan",
    specialization: "Pediatric Vision",
    bio: "Specializes in vision screening for children and early intervention recommendations.",
    fee: 28,
    schedule: "Sat-Tue, 11:00-17:00"
  },
  {
    id: "doc-3",
    name: "Dr. Rafi Ahmed",
    specialization: "Lens and Refraction",
    bio: "Handles refraction-heavy visits, follow-up prescriptions, and optical recommendations.",
    fee: 26,
    schedule: "Mon-Thu, 13:00-19:00"
  }
];

export const services: Service[] = [
  {
    id: "service-1",
    name: "Comprehensive Eye Examination",
    description: "Standard appointment with diagnosis capture, notes, and prescription creation.",
    type: "Clinical",
    duration: "30 min",
    priceLabel: "$24"
  },
  {
    id: "service-2",
    name: "Prescription Renewal",
    description: "Fast track flow for patients who need follow-up review and updated prescription output.",
    type: "Clinical",
    duration: "15 min",
    priceLabel: "$12"
  },
  {
    id: "service-3",
    name: "Lens Replacement",
    description: "Direct shop workflow for replacing existing lenses without full consultation where appropriate.",
    type: "Optical Shop",
    duration: "20 min",
    priceLabel: "Starts at $18"
  },
  {
    id: "service-4",
    name: "Frame Replacement",
    description: "Counter service for walk-in customers needing frame adjustments or replacement.",
    type: "Optical Shop",
    duration: "20 min",
    priceLabel: "Starts at $15"
  },
  {
    id: "service-5",
    name: "Eye Care Accessories",
    description: "Retail-only checkout for over-the-counter products and accessories.",
    type: "Retail",
    duration: "Instant",
    priceLabel: "Varies"
  }
];

export const products: Product[] = [
  {
    id: "product-1",
    name: "BlueShield Frame A2",
    category: "Frames",
    description: "Lightweight frame suitable for daily prescription wear.",
    priceLabel: "$45",
    stock: 9
  },
  {
    id: "product-2",
    name: "HydraLens Daily Pack",
    category: "Lenses",
    description: "Daily use contact lens pack with fast-moving stock.",
    priceLabel: "$22",
    stock: 3
  },
  {
    id: "product-3",
    name: "Lubricating Eye Drops",
    category: "Medicines",
    description: "Commonly prescribed supportive item for dryness relief.",
    priceLabel: "$8",
    stock: 0
  },
  {
    id: "product-4",
    name: "Anti-Glare Lens Upgrade",
    category: "Lens Services",
    description: "Popular upgrade chosen after consultation and optical review.",
    priceLabel: "$28",
    stock: 5
  }
];

export const inventoryHighlights = [
  { name: "HydraLens Daily Pack", sku: "LEN-001", status: "Low Stock" },
  { name: "Lubricating Eye Drops", sku: "MED-007", status: "Out of Stock" },
  { name: "BlueShield Frame A2", sku: "FRM-014", status: "In Stock" }
] as const;

export const patientTimeline = [
  {
    title: "Book or register",
    description: "Patients can self-book or arrive as walk-ins while still entering the same downstream workflow."
  },
  {
    title: "Check in and examine",
    description: "Reception confirms arrival, then the doctor records findings, diagnosis, and care notes."
  },
  {
    title: "Prescribe and fulfill",
    description: "Stock-aware prescription logic keeps available items flowing and unavailable items visible to restock."
  },
  {
    title: "Review later",
    description: "Patients return to the portal to see appointments, prescriptions, invoices, and service history."
  }
] as const;

export const serviceTypes = [
  "Eye Examination",
  "Prescription Renewal",
  "Walk-in Consultation",
  "Lens Replacement",
  "Frame Replacement"
] as const;

export const patientAppointments = [
  {
    id: "appt-1",
    doctor: "Dr. Nadia Rahman",
    date: "2026-04-25",
    slot: "10:30",
    status: "Confirmed",
    reason: "Blurred vision and headache during screen use"
  },
  {
    id: "appt-2",
    doctor: "Dr. Rafi Ahmed",
    date: "2026-03-28",
    slot: "15:15",
    status: "Completed",
    reason: "Prescription follow-up and lens update"
  }
] as const;

export const patientPrescriptions = [
  {
    id: "rx-1",
    number: "RX-2026-041",
    issuedAt: "2026-03-28",
    doctor: "Dr. Rafi Ahmed",
    summary: "Updated lens power with dry-eye support recommendation."
  },
  {
    id: "rx-2",
    number: "RX-2025-320",
    issuedAt: "2025-11-14",
    doctor: "Dr. Nadia Rahman",
    summary: "Routine examination with single-vision lens recommendation."
  }
] as const;

export const patientInvoices = [
  { id: "inv-1", number: "INV-1204" },
  { id: "inv-2", number: "INV-0980" }
] as const;

export const adminDashboardPanels = [
  {
    label: "Revenue today",
    value: "$1,420",
    description: "Combined consultation, product, and service billing."
  },
  {
    label: "Low stock items",
    value: "6",
    description: "Products nearing threshold before prescription or checkout disruption."
  },
  {
    label: "Pending restocks",
    value: "4",
    description: "Items already escalated from unavailable demand."
  }
] as const;

export const restockRequests = [
  { id: "restock-1", item: "Lubricating Eye Drops", quantity: 7, status: "Pending" },
  { id: "restock-2", item: "HydraLens Daily Pack", quantity: 4, status: "Ordered" }
] as const;

export const doctorQueue = [
  { id: "queue-1", patient: "Sara Akter", reason: "Distance blur and refraction check", slot: "10:00" },
  { id: "queue-2", patient: "Mubin Hossain", reason: "Prescription renewal", slot: "10:30" },
  { id: "queue-3", patient: "Walk-in: Farzana", reason: "Lens replacement review", slot: "11:00" }
] as const;

export const prescriptionBuilderChecklist = [
  "Open patient profile and visit context",
  "Capture left and right eye findings",
  "Record diagnosis and clinical notes",
  "Select medicines and optical recommendations",
  "Validate stock and trigger restock if needed",
  "Finalize locked prescription snapshot",
  "Render preview, download, and print outputs"
] as const;

