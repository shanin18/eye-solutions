# Eye Optics SaaS

A SaaS platform for eye clinics, doctors, reception teams, and optical shops to manage appointments, eye examinations, prescriptions, medicine inventory, restocking, optical retail services, and patient-facing interactions in one unified system.

---

## 1. Product Overview

Eye Optics SaaS is designed to digitize and streamline the full operational flow of an eye-care business that combines clinical consultation and optical retail.

The platform supports:

- Public-facing website for visitors to view doctors, services, products, and appointment options
- Patient appointment booking and walk-ins
- Doctor-led eye examinations
- Digital diagnosis and prescription generation
- Medicine and product stock management
- Restock tracking for unavailable items
- Optical shop services such as lens replacement, frame replacement, and direct retail purchases
- Patient portal for viewing appointments, service details, prescriptions, and invoices
- Download, preview, and print workflows for prescriptions and invoices without storing generated files permanently

The product aims to reduce manual paperwork, improve patient experience, increase operational visibility, reduce stock issues, and connect clinic services with optical shop operations in one system.

---

## 2. Problem Statement

Many eye clinics and optical shops still operate with disconnected systems or manual processes. Common issues include:

- Appointment handling through phone calls or paper registers
- Lack of a centralized patient history
- Manual prescription writing
- No live stock visibility for medicines or optical items
- Delayed restocking because of poor inventory tracking
- Separate operations for clinic and optical shop teams
- Difficulty managing walk-ins and service-only customers
- No modern public website where customers can view doctor details, services, and products
- No patient portal where customers can check their own service details later

This leads to inefficiency, poor customer experience, stock-related losses, and limited visibility for management.

---

## 3. Solution Summary

Eye Optics SaaS provides one integrated platform where:

- Visitors can browse doctors, products, and services from the public frontend
- Patients can book appointments or be registered as walk-ins
- Doctors can record eye examination results and diagnose conditions
- Medicines and products can be selected from live inventory
- Out-of-stock items automatically appear in a restock workflow
- Prescriptions and invoices can be previewed, downloaded, and printed on demand
- Optical staff can serve patients with prescriptions or direct service requests
- Patients can log in and review their appointment history, service details, prescriptions, and invoices
- Admins can monitor stock, patients, sales, and overall operational performance

---

## 4. Goals

### Primary Goals

- Digitize the full eye-care service workflow
- Improve coordination between clinic and optical retail operations
- Provide real-time inventory awareness
- Reduce prescription and record errors
- Improve service speed for appointments and walk-ins
- Give patients and visitors a clear digital experience through a public website and patient portal

### Business Goals

- Increase operational efficiency
- Prevent missed sales due to unavailable stock
- Improve patient trust through transparent records and service history
- Build a scalable SaaS product for multi-branch eye-care businesses
- Create recurring subscription revenue opportunities

---

## 5. Target Users

### Clinic/Shop Owner
Needs centralized visibility over appointments, patients, inventory, staff, and sales.

### Doctors / Optometrists
Need a fast way to access patient records, perform examinations, and generate prescriptions.

### Reception / Front Desk Staff
Need to manage bookings, patient registration, check-ins, and billing.

### Optical Shop Staff
Need to view prescriptions, recommend products, process service orders, and update inventory.

### Patients / End Users
Need a smooth experience for browsing doctor details, booking appointments, receiving prescriptions, checking service history, and purchasing products or services.

### Public Visitors
Need to explore available doctors, services, products, branch information, and appointment options without internal staff involvement.

---

## 6. User Roles and Permissions

### 1. Super Admin / Business Owner
- Manage branches
- Manage users and permissions
- Configure system settings
- View reports and analytics
- Monitor inventory and restocking
- Manage public website content if needed

### 2. Admin / Branch Manager
- Manage branch operations
- Add or update products and stock
- Approve restocks
- Manage doctor profiles and schedules
- View transactions and branch reports

### 3. Doctor / Optometrist
- View daily appointments and walk-ins
- Access patient profiles and history
- Record eye examination results
- Select medicines and optical recommendations
- Generate prescriptions
- Print or preview prescriptions directly

### 4. Receptionist / Front Desk
- Create appointments
- Register walk-ins
- Check in patients
- Handle queue management
- Generate invoices and receive payments
- Assist patients with account lookup and service history access

### 5. Optical Shop Staff
- Access prescriptions
- Recommend frames and lenses
- Process direct service requests
- Create product or service orders
- Update stock movement
- Generate invoices

### 6. Patient / User
- Register and log in
- Browse doctors, services, and products
- Book appointments
- View upcoming and past appointments
- View service history
- Preview, download, or print prescriptions and invoices
- Check order or service status

### Public Access (No Login)
- View doctor profiles
- View services
- View product catalog
- View branch/contact information
- Start appointment booking

---

## 7. Core Use Cases

### Public and Patient Use Cases
- Visitor browses doctor details before booking
- Visitor checks available services and products
- Patient registers and books an appointment
- Patient logs in later to see previous service details
- Patient previews or downloads a prescription or invoice when needed

### Clinical Use Cases
- Patient books an appointment
- Patient arrives and checks in
- Doctor performs eye examination
- Doctor records diagnosis
- Doctor selects medicines from available stock
- Doctor creates a prescription view for preview, download, and print

### Inventory Use Cases
- System checks medicine stock during prescription creation
- Out-of-stock items are flagged automatically
- Missing items are moved to restock queue
- Admin updates stock when new inventory arrives

### Optical Retail Use Cases
- Patient buys recommended products after consultation
- Walk-in customer requests frame change or lens replacement
- Shop staff creates service order without doctor appointment if applicable
- Staff generates invoice and completes sale

---

## 8. End-to-End Workflow

### 8.1 Public Discovery Flow
1. A visitor opens the public website.
2. The visitor browses doctor profiles, services, and products.
3. The visitor books an appointment or creates/logs into a patient account.
4. The visitor becomes a patient user for future service tracking.

### 8.2 Appointment-Based Patient Flow
1. Patient books an appointment online or via staff.
2. Reception confirms the booking.
3. Patient arrives and checks in.
4. Doctor opens the patient profile.
5. Doctor performs eye examination.
6. Doctor records vision values, diagnosis, and notes.
7. Doctor selects medicines and recommendations.
8. System verifies stock availability.
9. Available medicines remain in the prescription flow.
10. Unavailable medicines are added to the restock queue.
11. Doctor finalizes the prescription.
12. System generates a preview-ready prescription from database data.
13. Patient or staff can download or print the prescription immediately.
14. Patient proceeds to the optical shop if needed.
15. Optical staff processes glasses, frames, lenses, or medicine sales.
16. Billing is completed.
17. Patient can later log in to view service details and regenerate the prescription or invoice preview.

### 8.3 Walk-In Consultation Flow
1. Walk-in patient arrives without prior appointment.
2. Reception registers the patient quickly.
3. Patient is assigned to the next available doctor or queue.
4. The rest of the clinical flow remains the same.

### 8.4 Direct Optical Service Flow
Some customers may not need a doctor appointment. They may directly request services such as:

- Changing glasses frame
- Replacing lenses
- Purchasing eye-care accessories
- Buying over-the-counter products
- Fulfilling an existing prescription

Flow:
1. Customer enters the optical shop.
2. Staff creates a service ticket or retail order.
3. Staff selects requested products or services.
4. Inventory is checked in real time.
5. Billing is generated.
6. Order is fulfilled or scheduled for pickup.
7. The customer can later see the service record from their account if they are registered.

### 8.5 Patient Portal Flow
1. Patient logs in.
2. Patient views upcoming appointments.
3. Patient reviews previous visits and service details.
4. Patient opens prescription or invoice preview.
5. Patient downloads or prints the document locally when needed.

---

## 9. Feature Modules

### 9.1 Public Website Module
- Home page
- Doctor listing and doctor detail pages
- Service listing and service detail pages
- Product catalog
- Branch/contact information
- Appointment booking entry point
- Responsive UI for mobile and desktop

### 9.2 Appointment Management
- Online and offline booking
- Doctor schedule management
- Time-slot based booking
- Appointment status tracking
- Check-in and queue handling
- Future reminder support

### 9.3 Patient Portal
- Patient registration and login
- Dashboard overview
- Upcoming and past appointments
- Service history
- Prescription preview, download, and print
- Invoice preview, download, and print
- Order and service tracking

### 9.4 Patient Management
- Patient registration
- Searchable patient profiles
- Medical and visit history
- Prescription history
- Contact information and demographics

### 9.5 Eye Examination Module
- Vision details for left and right eye
- Diagnosis input
- Clinical notes
- Recommended treatment
- Follow-up advice
- Future extensibility for diagnostic image or scan handling if ever required

### 9.6 Prescription Management
- Doctor-generated digital prescriptions
- Medicines and dosage instructions
- Lens power and optical recommendations
- Preview in browser
- Download to user device
- Print-friendly format
- Prescription history tracking
- No mandatory persistent PDF file storage

### 9.7 Inventory Management
- Medicine stock tracking
- Frame stock tracking
- Lens stock tracking
- Accessory stock tracking
- Stock status indicators:
  - In Stock
  - Low Stock
  - Out of Stock

### 9.8 Restock Management
- Automatic restock queue for unavailable medicines or products
- Low-stock alerts
- Restock request tracking
- Restock status updates
- Supplier linkage in future versions

### 9.9 Optical Shop / POS Module
- Frame sales
- Lens sales and replacement
- Service-only orders
- Prescription-based order processing
- Walk-in retail sales
- Invoice generation

### 9.10 Billing and Payments
- Consultation fee billing
- Product billing
- Service billing
- Combined billing for clinic and shop
- Payment status tracking
- Invoice preview, download, and print

### 9.11 Reporting and Analytics
- Daily appointments
- Total revenue
- Product sales
- Most prescribed medicines
- Inventory turnover
- Restock trends
- Doctor activity insights

---

## 10. Medicine and Restock Logic

This is a core differentiator of the product.

### Prescription Selection Logic
When a doctor selects a medicine or product:

- If stock is available, the item is added normally
- If stock is low, the system shows a warning
- If stock is unavailable, the system marks it as unavailable and pushes it to the restock queue

### Restock Queue Behavior
The restock queue should contain:

- Medicine or product name
- Required quantity
- Frequency of request
- Last requested date
- Status (`Pending`, `Ordered`, `Received`, `Closed`)

### Benefits
- Prevents silent stock failures
- Gives management clear demand visibility
- Helps prioritize high-demand medicines and products

---

## 11. System Architecture

### High-Level Architecture

### Frontend
- **Next.js**

The frontend will provide:
- Public website
- Patient portal
- Admin dashboard
- Doctor dashboard
- Reception dashboard
- Optical shop dashboard

### Backend
- **Next.js API Routes / Route Handlers**

The backend will handle:
- Authentication and authorization
- Business logic
- Appointment processing
- Prescription generation logic
- Inventory and restock workflows
- Billing and reporting APIs
- Patient portal APIs
- Public website data APIs

### Database
- **PostgreSQL**

PostgreSQL will store structured business data such as:
- Users and roles
- Patients
- Doctors and doctor profiles
- Appointments
- Examinations
- Prescriptions
- Medicines and products
- Inventory movements
- Service orders
- Sales and invoices
- Restock requests

### Storage
- **No dedicated persistent document storage required for the core workflow**

For this product version:
- Prescriptions and invoices are generated on demand from PostgreSQL data
- Users can preview, download, or print documents directly
- Generated PDF files do not need to be permanently stored in object storage
- Static assets such as logos, banners, or basic product images can be served from the Next.js `public` folder or an optional CDN if needed

---

## 12. Suggested Technical Structure

### Frontend Responsibilities
- Public landing pages
- Doctor detail pages
- Service and product listing pages
- Appointment booking UI
- Patient dashboard and service history views
- Internal dashboards by role
- Queue and calendar UI
- Doctor prescription forms
- Optical sales screens
- Inventory and restock views
- Reports and filters
- Browser-based preview and print flows for prescriptions and invoices

### Backend Responsibilities
- API endpoints for all core modules
- Data validation
- Authentication and role checks
- Stock deduction and restock generation rules
- Dynamic prescription and invoice rendering
- Download stream generation for documents
- Audit logging
- Reporting aggregation

### Database Responsibilities
- Maintain data consistency
- Handle relationships across appointments, prescriptions, services, orders, and inventory
- Support query performance for search, filtering, and reporting
- Preserve finalized prescription and invoice snapshots as structured records when needed for consistency

### Document Generation Strategy
- Final business data is stored in PostgreSQL
- Prescription and invoice previews are generated from structured data on demand
- Downloaded files are created at request time and sent directly to the browser
- Printing can be handled through a print-friendly HTML view or PDF stream
- No permanent file save is required for generated documents
- To avoid history changing accidentally, finalized prescriptions and invoices should be versioned or locked in the database after issuance

---

## 13. Core Data Entities

The system will likely require the following entities:

- User
- Role
- Branch
- DoctorProfile
- PatientProfile
- Appointment
- Visit
- Examination
- Diagnosis
- Prescription
- PrescriptionItem
- Medicine
- Product
- ProductCategory
- Inventory
- InventoryMovement
- RestockRequest
- ServiceOrder
- Invoice
- Payment

---

## 14. Example Data Model Summary

### User
- id
- full_name
- email
- phone
- password_hash
- role_id
- status
- created_at

### DoctorProfile
- id
- user_id
- specialization
- qualification
- experience_years
- bio
- consultation_fee
- is_active

### PatientProfile
- id
- user_id_nullable
- full_name
- phone
- email
- date_of_birth
- gender
- address
- created_at

### Appointment
- id
- patient_id
- doctor_id
- appointment_date
- time_slot
- status
- appointment_type
- booking_source

### Examination
- id
- patient_id
- doctor_id
- visit_id
- left_eye_power
- right_eye_power
- diagnosis
- notes
- follow_up_advice

### Prescription
- id
- patient_id
- doctor_id
- examination_id
- prescription_number
- status
- issued_at
- finalized_snapshot_json

### Medicine
- id
- name
- sku
- stock_quantity
- low_stock_threshold
- dosage_form
- is_active

### Product
- id
- category_id
- name
- sku
- price
- stock_quantity
- image_url_nullable
- is_active

### RestockRequest
- id
- item_type
- item_id
- requested_quantity
- reason
- status
- created_at

### ServiceOrder
- id
- patient_id_nullable
- order_type
- total_amount
- status
- created_at

### Invoice
- id
- patient_id_nullable
- service_order_id_nullable
- invoice_number
- total_amount
- payment_status
- finalized_snapshot_json
- created_at

---

## 15. High-Level API Scope

### Auth APIs
- Register
- Login
- Logout
- Role-based session handling

### Public APIs
- List doctors
- Get doctor details
- List services
- List products
- Submit appointment booking request
- Get branch/contact information

### Patient APIs
- Get patient dashboard summary
- List patient appointments
- Get patient visit history
- Get patient service details
- Preview prescription
- Download prescription
- Preview invoice
- Download invoice

### Patient Management APIs
- Create patient
- Update patient
- Search patients
- Get patient history

### Appointment APIs
- Create appointment
- Update appointment
- Update status
- List doctor appointments
- Check in patient

### Examination APIs
- Save examination data
- Update diagnosis
- Link visit with prescription

### Prescription APIs
- Create prescription
- Add prescription items
- Finalize prescription
- Generate preview
- Generate download stream
- Generate print view

### Inventory APIs
- List stock
- Update stock
- Deduct stock
- Show low-stock items

### Restock APIs
- Create restock request
- List restock requests
- Update restock status

### POS / Order APIs
- Create retail order
- Add products or services
- Generate invoice
- Complete payment

### Reporting APIs
- Revenue summary
- Appointment summary
- Inventory summary
- Restock summary

---

## 16. Functional Requirements

### FR-01 Public Browsing
The system must allow visitors to browse doctors, services, products, and branch information from the public frontend.

### FR-02 Patient Registration and Login
The system must allow patients to register, log in, and access their own account data.

### FR-03 Appointment Booking
The system must allow staff and patients to create appointments with doctors.

### FR-04 Walk-In Registration
The system must allow quick registration of patients without prior booking.

### FR-05 Patient Records
The system must maintain a full history of patient visits, prescriptions, invoices, and service orders.

### FR-06 Examination Recording
Doctors must be able to record eye checkup findings and diagnosis details.

### FR-07 Prescription Creation
Doctors must be able to generate prescriptions with medicines, lens details, and instructions.

### FR-08 Prescription Preview, Download, and Print
The system must generate prescription previews and downloadable/printable documents on demand without requiring permanent file storage.

### FR-09 Inventory Validation
The system must validate medicine or product availability during prescription or order creation.

### FR-10 Restock Generation
The system must create or update restock entries when unavailable items are requested.

### FR-11 Direct Optical Service Handling
The system must support service-only and product-only transactions without requiring a doctor appointment.

### FR-12 Billing
The system must generate invoices for consultations, products, services, or combined transactions.

### FR-13 Patient Portal Visibility
The system must allow patients to view their appointments, service details, prescriptions, and invoices based on their own account permissions.

### FR-14 Reporting
The system must provide dashboards and reports for operations, sales, and inventory.

---

## 17. Non-Functional Requirements

### Performance
- Fast dashboard, search, and catalog response times
- Efficient appointment and inventory queries
- Fast preview generation for prescriptions and invoices

### Scalability
- Support future multi-branch expansion
- Handle increasing patient, prescription, service, and inventory data

### Security
- Role-based access control
- Secure authentication
- Encrypted transport using HTTPS
- Patients can only access their own service details
- Internal medical and billing data must remain restricted by role

### Reliability
- Prevent duplicate stock deductions
- Preserve transaction integrity during checkout and restock updates
- Keep finalized prescription and invoice content consistent over time

### Usability
- Clean and fast UI for doctors and staff
- Clear public frontend for visitors
- Minimal clicks for high-frequency workflows

### Auditability
- Track who created or changed prescriptions, stock, invoices, and restock statuses

---

## 18. Edge Cases to Handle

- Patient misses appointment but arrives later as walk-in
- A patient needs only prescription renewal
- Doctor creates prescription with no medicines, only lens details
- Medicine is unavailable but manually added as external recommendation
- Product stock changes during billing
- One patient receives multiple prescriptions over time
- Walk-in customer wants only frame replacement with no medical consultation
- Partial payment or unpaid invoice scenarios
- Patient account is created after earlier walk-in visits and historical records need linking
- Product exists without image or public description
- A document is regenerated later and must still match the original finalized version

---

## 19. Security and Compliance Considerations

Because this product handles patient and medical-related records, it should follow strong privacy and access practices.

Recommended controls:
- Role-based access control
- Secure password hashing
- Session management
- Audit logs for sensitive actions
- Database backup strategy
- Patient ownership checks for portal access
- Finalized record versioning for prescriptions and invoices
- Branch-level visibility restrictions where needed

If targeting specific countries or healthcare regulations in the future, compliance requirements should be assessed based on region.

---

## 20. MVP Scope

A practical MVP should focus on the main public, clinic, prescription, and shop workflow.

### MVP Features
- User authentication and role management
- Public website with doctor, service, and product listing
- Patient registration and login
- Patient dashboard with appointment and service history
- Patient registration and profiles for staff
- Appointment and walk-in handling
- Doctor examination form
- Prescription creation
- Dynamic prescription preview, download, and print
- Medicine and product inventory tracking
- Restock request generation
- Basic billing and invoicing
- Dynamic invoice preview, download, and print

### Excluded from MVP
- Multi-branch management
- Supplier management
- Advanced analytics
- SMS or email reminders
- AI recommendations
- Full e-commerce checkout and shipping
- Diagnostic image upload workflows

---

## 21. Post-MVP Roadmap

### Phase 2
- Optical POS expansion
- Lens and frame customization workflow
- Advanced reporting
- Follow-up reminders
- Product categories and variants
- Better CMS controls for public website content

### Phase 3
- Multi-branch support
- Supplier management
- Purchase orders for restocking
- More advanced patient portal features
- Mobile-friendly staff workflows

### Phase 4
- Online optical ordering
- AI-based suggestions for products or medicines
- Integrated notifications and CRM features
- Optional media/document storage if future uploads become necessary

---

## 22. Business Model Possibilities

This product can be positioned as:

- SaaS for independent eye clinics
- SaaS for optical retail chains with consultation services
- Multi-branch enterprise solution for eye-care businesses

Possible pricing models:
- Monthly subscription per branch
- Per doctor seat pricing
- Tiered plans based on features
- Setup or onboarding fee for larger clients

---

## 23. Risks and Challenges

- Clinics may resist changing from paper-based workflows
- Inventory accuracy depends on disciplined staff usage
- Prescription formatting must be clear and clinically acceptable
- Some businesses may need custom workflows per branch
- Public product and doctor information must stay updated
- Dynamic document generation needs careful versioning so old records remain consistent
- Medical and legal requirements may vary by region

---

## 24. Suggested Folder Structure for Implementation

```bash
/app
  /(public)
    /page.tsx
    /doctors
    /services
    /products
    /book-appointment
  /(auth)
    /login
    /register
  /(patient)
    /patient
      /dashboard
      /appointments
      /services
      /prescriptions
      /invoices
  /(dashboard)
    /admin
    /doctor
    /reception
    /optical
  /api
    /auth
    /public
    /patients
    /appointments
    /examinations
    /prescriptions
    /inventory
    /restocks
    /orders
    /reports
/components
/lib
  /db
  /auth
  /pdf
  /validators
  /rbac
/prisma
/public
```

---

## 25. Document and Asset Strategy

For the current architecture, no dedicated object storage is required for generated prescriptions and invoices.

### Core Approach
- Prescription and invoice data lives in PostgreSQL
- Preview pages are rendered dynamically
- Downloads are generated when requested
- Printing is handled from preview or print views
- Files are saved only on the user's own device after download

### What This Means
- No permanent storage for generated prescription PDFs
- No permanent storage for generated invoice PDFs
- No required upload pipeline for diagnostic files in the core version

### Optional Static Assets
If the public frontend needs logos, banners, or simple product images, they can be handled using:
- Next.js `public` folder
- External image URLs
- Optional CDN later if scale requires it

### Recommendation
For your current product concept, **PostgreSQL + on-demand document generation** is the best fit. Add dedicated file storage only if you later introduce uploads, media management, or permanent document archiving.

---

## 26. Final Product Vision

Eye Optics SaaS is not only an appointment system. It is a complete workflow platform connecting public discovery, clinical eye care, patient access, and optical commerce.

It enables a business to:
- Present doctors, services, and products to visitors online
- Receive patients through appointments or walk-ins
- Conduct examinations digitally
- Create professional prescriptions
- Track medicine and optical inventory in real time
- Handle unavailable stock with restock visibility
- Serve both prescription-based and direct walk-in customers
- Let patients review their own service details later
- Operate clinic and shop workflows from one system

This makes the platform suitable for modern eye clinics, optical stores, and combined eye-care businesses looking to scale operations with better accuracy, visibility, and customer experience.

---

## 27. Suggested Next Documentation Files

After this README, the next useful documents would be:

1. `PRD.md` – Product requirements document with detailed feature breakdown
2. `USER-FLOWS.md` – Screen-by-screen flows for each role
3. `DATABASE-SCHEMA.md` – Tables and relationships
4. `API-SPEC.md` – Endpoint definitions and payloads
5. `MVP-PLAN.md` – Development milestones and scope
6. `RBAC.md` – Roles and permissions matrix
7. `PATIENT-PORTAL.md` – Patient-facing features and journeys
8. `PUBLIC-WEBSITE.md` – Public pages, SEO structure, and catalog visibility
