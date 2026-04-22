# MVP Plan

This file breaks the product brief into practical build steps so the implementation stays understandable.

## Chosen Stack
- Frontend: Next.js App Router, TypeScript, Tailwind CSS, shadcn/ui
- Backend: Next.js Route Handlers and server-side modules
- Database: PostgreSQL with Prisma ORM
- Document strategy: On-demand prescription and invoice rendering from database records

## Step 1: Foundation
- Set up the Next.js app structure
- Create public pages, patient pages, and role dashboards
- Add shared mock data to make the product flow visible early
- Add a starter Prisma schema that reflects the main entities

## Step 2: Authentication and RBAC
- Add login and registration actions
- Add secure password hashing
- Protect patient and staff routes
- Enforce role-based access checks

## Step 3: Patient and Appointment Flow
- Create patient records
- Build booking and walk-in APIs
- Add appointment status updates
- Add queue and check-in flow

## Step 4: Examination and Prescription Flow
- Build examination forms for doctors
- Add prescription item selection
- Validate stock during prescription creation
- Lock finalized prescription snapshots for future preview and print

## Step 5: Inventory and Restock
- Build stock list and stock update APIs
- Create low-stock indicators
- Generate restock requests when stock is unavailable
- Add restock status tracking

## Step 6: Billing and Optical Shop
- Build service order flow
- Generate invoices for products, services, and consultations
- Support direct optical service without appointment dependency

## Step 7: Reporting and Polish
- Add dashboards and reports
- Improve filtering and branch-ready structure
- Add document preview and print-friendly screens
