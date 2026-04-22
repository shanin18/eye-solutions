# Auth and RBAC Foundation

This phase keeps the architecture aligned with the chosen stack:

- Frontend: Next.js App Router with TypeScript
- Backend: Next.js Route Handlers
- Session approach for now: cookie-based demo session
- Database target: PostgreSQL with Prisma in the next persistence step

## What is implemented now
- `POST /api/auth/login`
- `POST /api/auth/register`
- `POST /api/auth/logout`
- `GET /api/auth/session`
- Middleware protection for `/patient`, `/admin`, `/doctor`, `/reception`, and `/optical`
- Role-to-route access rules in `lib/rbac.ts`

## Why this is a temporary phase
- The current login uses demo users so the project can move without blocking on database setup
- The session cookie is intentionally simple for now
- In the next auth step, this should move to Prisma-backed users, hashed passwords, and stronger session handling

## Demo accounts
- Admin: `admin@eyeoptics.local` / `admin123`
- Doctor: `doctor@eyeoptics.local` / `doctor123`
- Patient: `patient@eyeoptics.local` / `patient123`
