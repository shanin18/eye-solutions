import { PrismaClient } from "@prisma/client";
import { randomBytes, scryptSync } from "node:crypto";

const prisma = new PrismaClient();

function hashPassword(password) {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

async function upsertUser(data) {
  return prisma.user.upsert({
    where: { email: data.email },
    update: data,
    create: data
  });
}

async function main() {
  const mainBranch = await prisma.branch.upsert({
    where: { name: "Eye Solutions Main Branch" },
    update: {
      address: "Dhanmondi, Dhaka",
      contactNumber: "+8801700001000",
      status: "ACTIVE"
    },
    create: {
      name: "Eye Solutions Main Branch",
      address: "Dhanmondi, Dhaka",
      contactNumber: "+8801700001000",
      status: "ACTIVE"
    }
  });

  await prisma.branch.upsert({
    where: { name: "Eye Solutions North Branch" },
    update: {
      address: "Uttara, Dhaka",
      contactNumber: "+8801700002000",
      status: "ACTIVE"
    },
    create: {
      name: "Eye Solutions North Branch",
      address: "Uttara, Dhaka",
      contactNumber: "+8801700002000",
      status: "ACTIVE"
    }
  });

  await prisma.systemSetting.upsert({
    where: { id: "system-default" },
    update: {
      defaultCurrency: "BDT",
      prescriptionFooter: "Eye Solutions • Keep your prescription for future reference",
      reminderMode: "PLANNED"
    },
    create: {
      id: "system-default",
      defaultCurrency: "BDT",
      prescriptionFooter: "Eye Solutions • Keep your prescription for future reference",
      reminderMode: "PLANNED"
    }
  });

  const services = [
    ["Comprehensive Eye Examination", "Standard appointment with diagnosis capture, notes, and prescription creation.", "Clinical", "30 min", "$24"],
    ["Prescription Renewal", "Fast track flow for patients who need follow-up review and updated prescription output.", "Clinical", "15 min", "$12"],
    ["Lens Replacement", "Direct shop workflow for replacing existing lenses without full consultation where appropriate.", "Optical Shop", "20 min", "Starts at $18"],
    ["Frame Replacement", "Counter service for walk-in customers needing frame adjustments or replacement.", "Optical Shop", "20 min", "Starts at $15"],
    ["Eye Care Accessories", "Retail-only checkout for over-the-counter products and accessories.", "Retail", "Instant", "Varies"]
  ];

  for (const [name, description, type, duration, priceLabel] of services) {
    await prisma.service.upsert({
      where: { name },
      update: { description, type, duration, priceLabel, isActive: true },
      create: { name, description, type, duration, priceLabel, isActive: true }
    });
  }

  const [superAdmin, admin, doctorUser1, doctorUser2, doctorUser3, receptionUser, opticalUser, patientUser] = await Promise.all([
    upsertUser({ fullName: "Farhan Enterprise", email: "superadmin@eyeoptics.local", passwordHash: hashPassword("super123"), isEmailVerified: true, emailVerifiedAt: new Date(), role: "SUPER_ADMIN", branchId: mainBranch.id, status: "ACTIVE" }),
    upsertUser({ fullName: "Amina Siddiqua", email: "admin@eyeoptics.local", passwordHash: hashPassword("admin123"), isEmailVerified: true, emailVerifiedAt: new Date(), role: "ADMIN", branchId: mainBranch.id, status: "ACTIVE" }),
    upsertUser({ fullName: "Dr. Nadia Rahman", email: "doctor@eyeoptics.local", passwordHash: hashPassword("doctor123"), isEmailVerified: true, emailVerifiedAt: new Date(), role: "DOCTOR", branchId: mainBranch.id, status: "ACTIVE" }),
    upsertUser({ fullName: "Dr. Sameer Hasan", email: "sameer@eyeoptics.local", passwordHash: hashPassword("sameer123"), isEmailVerified: true, emailVerifiedAt: new Date(), role: "DOCTOR", branchId: mainBranch.id, status: "ACTIVE" }),
    upsertUser({ fullName: "Dr. Rafi Ahmed", email: "rafi@eyeoptics.local", passwordHash: hashPassword("rafi123"), isEmailVerified: true, emailVerifiedAt: new Date(), role: "DOCTOR", branchId: mainBranch.id, status: "ACTIVE" }),
    upsertUser({ fullName: "Nusrat Jahan", email: "reception@eyeoptics.local", passwordHash: hashPassword("reception123"), isEmailVerified: true, emailVerifiedAt: new Date(), role: "RECEPTIONIST", branchId: mainBranch.id, status: "ACTIVE" }),
    upsertUser({ fullName: "Shuvo Das", email: "optical@eyeoptics.local", passwordHash: hashPassword("optical123"), isEmailVerified: true, emailVerifiedAt: new Date(), role: "OPTICAL_STAFF", branchId: mainBranch.id, status: "ACTIVE" }),
    upsertUser({ fullName: "Sadia Karim", email: "patient@eyeoptics.local", passwordHash: hashPassword("patient123"), isEmailVerified: true, emailVerifiedAt: new Date(), role: "PATIENT", status: "ACTIVE" })
  ]);

  const doctor1 = await prisma.doctorProfile.upsert({
    where: { userId: doctorUser1.id },
    update: {
      specialization: "Comprehensive Eye Care",
      bio: "Focuses on routine eye exams, digital prescriptions, and long-term patient history management.",
      consultationFee: 24,
      schedule: "Sun-Thu, 10:00-16:00",
      isActive: true
    },
    create: {
      userId: doctorUser1.id,
      specialization: "Comprehensive Eye Care",
      bio: "Focuses on routine eye exams, digital prescriptions, and long-term patient history management.",
      consultationFee: 24,
      schedule: "Sun-Thu, 10:00-16:00",
      isActive: true
    }
  });

  const doctor2 = await prisma.doctorProfile.upsert({
    where: { userId: doctorUser2.id },
    update: {
      specialization: "Pediatric Vision",
      bio: "Specializes in vision screening for children and early intervention recommendations.",
      consultationFee: 28,
      schedule: "Sat-Tue, 11:00-17:00",
      isActive: true
    },
    create: {
      userId: doctorUser2.id,
      specialization: "Pediatric Vision",
      bio: "Specializes in vision screening for children and early intervention recommendations.",
      consultationFee: 28,
      schedule: "Sat-Tue, 11:00-17:00",
      isActive: true
    }
  });

  const doctor3 = await prisma.doctorProfile.upsert({
    where: { userId: doctorUser3.id },
    update: {
      specialization: "Lens and Refraction",
      bio: "Handles refraction-heavy visits, follow-up prescriptions, and optical recommendations.",
      consultationFee: 26,
      schedule: "Mon-Thu, 13:00-19:00",
      isActive: true
    },
    create: {
      userId: doctorUser3.id,
      specialization: "Lens and Refraction",
      bio: "Handles refraction-heavy visits, follow-up prescriptions, and optical recommendations.",
      consultationFee: 26,
      schedule: "Mon-Thu, 13:00-19:00",
      isActive: true
    }
  });

  const patientSadia = await prisma.patientProfile.upsert({
    where: { userId: patientUser.id },
    update: {
      fullName: "Sadia Karim",
      phone: "+8801700000001",
      email: "patient@eyeoptics.local"
    },
    create: {
      userId: patientUser.id,
      fullName: "Sadia Karim",
      phone: "+8801700000001",
      email: "patient@eyeoptics.local"
    }
  });

  let patientRezaul = await prisma.patientProfile.findFirst({
    where: { phone: "+8801700000002" }
  });

  if (!patientRezaul) {
    patientRezaul = await prisma.patientProfile.create({
      data: {
        fullName: "Rezaul Karim",
        phone: "+8801700000002",
        email: "rezaul@example.com"
      }
    });
  }

  const products = [
    ["FRM-014", "BlueShield Frame A2", "Frames", "Lightweight frame suitable for daily prescription wear.", 45, 9, 3],
    ["LEN-001", "HydraLens Daily Pack", "Lenses", "Daily use contact lens pack with fast-moving stock.", 22, 3, 3],
    ["MED-007", "Lubricating Eye Drops", "Medicines", "Commonly prescribed supportive item for dryness relief.", 8, 0, 2]
  ];

  for (const [sku, name, category, description, price, stockQuantity, lowStockThreshold] of products) {
    await prisma.product.upsert({
      where: { sku },
      update: { name, category, description, price, stockQuantity, lowStockThreshold, isActive: true },
      create: { sku, name, category, description, price, stockQuantity, lowStockThreshold, isActive: true }
    });
  }

  const appointment1 = await prisma.appointment.upsert({
    where: {
      doctorId_appointmentDate_timeSlot: {
        doctorId: doctor1.id,
        appointmentDate: "2026-04-25",
        timeSlot: "10:30"
      }
    },
    update: {
      patientId: patientSadia.id,
      serviceType: "Eye Examination",
      status: "CONFIRMED",
      bookingSource: "ONLINE",
      reason: "Blurred vision and headache during screen use"
    },
    create: {
      patientId: patientSadia.id,
      doctorId: doctor1.id,
      appointmentDate: "2026-04-25",
      timeSlot: "10:30",
      serviceType: "Eye Examination",
      status: "CONFIRMED",
      bookingSource: "ONLINE",
      reason: "Blurred vision and headache during screen use"
    }
  });

  const appointment2 = await prisma.appointment.upsert({
    where: {
      doctorId_appointmentDate_timeSlot: {
        doctorId: doctor3.id,
        appointmentDate: "2026-03-28",
        timeSlot: "15:00"
      }
    },
    update: {
      patientId: patientSadia.id,
      serviceType: "Prescription Renewal",
      status: "COMPLETED",
      bookingSource: "ONLINE",
      reason: "Prescription follow-up and lens update"
    },
    create: {
      patientId: patientSadia.id,
      doctorId: doctor3.id,
      appointmentDate: "2026-03-28",
      timeSlot: "15:00",
      serviceType: "Prescription Renewal",
      status: "COMPLETED",
      bookingSource: "ONLINE",
      reason: "Prescription follow-up and lens update"
    }
  });

  await prisma.appointment.upsert({
    where: {
      doctorId_appointmentDate_timeSlot: {
        doctorId: doctor2.id,
        appointmentDate: "2026-04-24",
        timeSlot: "11:00"
      }
    },
    update: {
      patientId: patientRezaul.id,
      serviceType: "Eye Examination",
      status: "CHECKED_IN",
      bookingSource: "WALK_IN",
      reason: "Child vision screening follow-up"
    },
    create: {
      patientId: patientRezaul.id,
      doctorId: doctor2.id,
      appointmentDate: "2026-04-24",
      timeSlot: "11:00",
      serviceType: "Eye Examination",
      status: "CHECKED_IN",
      bookingSource: "WALK_IN",
      reason: "Child vision screening follow-up"
    }
  });

  const examination = await prisma.examination.upsert({
    where: { appointmentId: appointment2.id },
    update: {
      patientId: patientSadia.id,
      doctorId: doctor3.id,
      leftEyeVision: "6/9",
      rightEyeVision: "6/9",
      diagnosis: "Myopia with screen-related eye strain",
      notes: "Patient reports headaches after extended screen use.",
      followUpAdvice: "Review again in 3 months",
      recommendations: "Anti-glare lens upgrade"
    },
    create: {
      appointmentId: appointment2.id,
      patientId: patientSadia.id,
      doctorId: doctor3.id,
      leftEyeVision: "6/9",
      rightEyeVision: "6/9",
      diagnosis: "Myopia with screen-related eye strain",
      notes: "Patient reports headaches after extended screen use.",
      followUpAdvice: "Review again in 3 months",
      recommendations: "Anti-glare lens upgrade"
    }
  });

  await prisma.prescription.upsert({
    where: { appointmentId: appointment2.id },
    update: {
      patientId: patientSadia.id,
      doctorId: doctor3.id,
      examinationId: examination.id,
      patientName: "Sadia Karim",
      doctorName: "Dr. Rafi Ahmed",
      leftEyeVision: "6/9",
      rightEyeVision: "6/9",
      diagnosis: "Myopia with screen-related eye strain",
      clinicalNotes: "Patient reports headaches after extended screen use.",
      lensPower: "Left -1.25, Right -1.00",
      medicines: "Lubricating Eye Drops",
      recommendations: "Anti-glare lens upgrade",
      advice: "Reduce continuous screen time and return for follow-up in 3 months",
      printableText: "Vision: Left 6/9, Right 6/9\nDiagnosis: Myopia with screen-related eye strain\nLens Power: Left -1.25, Right -1.00\nMedicines: Lubricating Eye Drops\nRecommendations: Anti-glare lens upgrade\nAdvice: Reduce continuous screen time and return for follow-up in 3 months"
    },
    create: {
      appointmentId: appointment2.id,
      patientId: patientSadia.id,
      doctorId: doctor3.id,
      examinationId: examination.id,
      patientName: "Sadia Karim",
      doctorName: "Dr. Rafi Ahmed",
      leftEyeVision: "6/9",
      rightEyeVision: "6/9",
      diagnosis: "Myopia with screen-related eye strain",
      clinicalNotes: "Patient reports headaches after extended screen use.",
      lensPower: "Left -1.25, Right -1.00",
      medicines: "Lubricating Eye Drops",
      recommendations: "Anti-glare lens upgrade",
      advice: "Reduce continuous screen time and return for follow-up in 3 months",
      printableText: "Vision: Left 6/9, Right 6/9\nDiagnosis: Myopia with screen-related eye strain\nLens Power: Left -1.25, Right -1.00\nMedicines: Lubricating Eye Drops\nRecommendations: Anti-glare lens upgrade\nAdvice: Reduce continuous screen time and return for follow-up in 3 months"
    }
  });

  const eyeDrops = await prisma.product.findUnique({
    where: { sku: "MED-007" }
  });

  await prisma.restockRequest.upsert({
    where: { id: "seed-restock-1" },
    update: {
      itemName: "Lubricating Eye Drops",
      productId: eyeDrops?.id,
      requiredQuantity: 12,
      frequency: 3,
      lastRequestedDate: "2026-04-22",
      status: "PENDING"
    },
    create: {
      id: "seed-restock-1",
      itemName: "Lubricating Eye Drops",
      productId: eyeDrops?.id,
      requiredQuantity: 12,
      frequency: 3,
      lastRequestedDate: "2026-04-22",
      status: "PENDING"
    }
  });

  const order = await prisma.serviceOrder.create({
    data: {
      patientId: patientSadia.id,
      patientName: "Sadia Karim",
      source: "PRESCRIPTION",
      items: ["Anti-glare lens upgrade", "BlueShield Frame A2"],
      totalAmount: 73,
      status: "READY"
    }
  }).catch(async () => prisma.serviceOrder.findFirst({ where: { patientName: "Sadia Karim", source: "PRESCRIPTION" } }));

  await prisma.serviceOrder.create({
    data: {
      patientName: "Walk-in: Karim",
      source: "DIRECT_OPTICAL",
      items: ["Frame replacement service"],
      totalAmount: 15,
      status: "OPEN"
    }
  }).catch(() => {});

  await prisma.invoice.create({
    data: {
      referenceType: "APPOINTMENT",
      referenceId: appointment2.id,
      patientId: patientSadia.id,
      patientName: "Sadia Karim",
      totalAmount: 12,
      paymentStatus: "PAID"
    }
  }).catch(() => {});

  await prisma.invoice.create({
    data: {
      referenceType: "SERVICE_ORDER",
      referenceId: order.id,
      patientId: patientSadia.id,
      patientName: "Sadia Karim",
      totalAmount: 73,
      paymentStatus: "PARTIAL"
    }
  }).catch(() => {});

  void superAdmin;
  void admin;
  void receptionUser;
  void opticalUser;
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
