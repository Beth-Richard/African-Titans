# Security Implementation -- Student Campus Hub

**Project:** Live Student Campus Hub
**Institution:** University of Wolverhampton
**Team:** African Titans

---

## Table of Contents

1. [Overview](#overview)
2. [Authentication](#authentication)
3. [Authorisation (RBAC)](#authorisation-rbac)
4. [Data Validation](#data-validation)
5. [SQL Injection Prevention](#sql-injection-prevention)
6. [XSS Protection](#xss-protection)
7. [Security Headers](#security-headers)
8. [GDPR Compliance](#gdpr-compliance)
9. [HTTPS](#https)
10. [File Reference](#file-reference)
11. [Future Improvements](#future-improvements)

---

## Overview

This document describes the security measures implemented in the Student Campus Hub MVP, aligned with the project's Security Specification document. The platform handles student accounts, job data, accommodation listings, and personal preferences -- making data protection and system integrity critical.

The system follows a **security-by-design** approach with protections applied at every layer: middleware, API routes, database queries, and HTTP response headers.

---

## Authentication

Authentication is implemented with a real MySQL-backed login flow.

### How It Works

1. User submits email and password to `POST /api/auth/login`
2. The email is looked up via a **parameterised query** (no SQL injection risk)
3. The submitted password is compared against the stored hash using **bcryptjs**
4. On success, an **HTTP-only session cookie** (`session_user_id`) is set

### Security Controls

| Control | Implementation | File |
|---|---|---|
| Password hashing | **bcryptjs** (`bcrypt.compare`) | `app/api/auth/login/route.ts` |
| HTTP-only cookies | `httpOnly: true` -- prevents JavaScript access to the session | `app/api/auth/login/route.ts` |
| SameSite attribute | `sameSite: "lax"` -- mitigates CSRF by restricting cross-origin cookie sending | `app/api/auth/login/route.ts` |
| Secure flag | `secure: true` in production -- cookies only sent over HTTPS | `app/api/auth/login/route.ts` |
| Generic error messages | Login failures return `"Invalid credentials"` -- no user enumeration | `app/api/auth/login/route.ts` |

### Session Cookie Configuration

```typescript
res.cookies.set("session_user_id", String(user.user_id), {
  httpOnly: true,
  sameSite: "lax",
  path: "/",
  secure: process.env.NODE_ENV === "production",
});
```

---

## Authorisation (RBAC)

Role-based access control is enforced at the API layer with three roles: **Student**, **Admin**, and **Employer (Company)**.

### Proxy Layer (`proxy.ts`)

A Next.js proxy intercepts requests to protected routes and blocks unauthenticated access:

- `/api/admin/*` -- requires a valid session cookie
- `/api/saved-jobs/*` -- requires a valid session cookie
- `/api/profile/*` -- requires a valid session cookie

Unauthenticated requests receive a `401 Authentication required` response before reaching the route handler.

### Server-Side Role Verification (`lib/auth.ts`)

Admin API endpoints additionally verify the user's **role** from the database:

```typescript
const admin = await requireRole("admin");
if (!admin) {
  return NextResponse.json({ error: "Forbidden" }, { status: 403 });
}
```

This prevents privilege escalation -- a logged-in student cannot access admin functionality even if they manually call the admin API endpoints.

### Protected Endpoints

| Endpoint | Method | Required Role |
|---|---|---|
| `/api/admin/jobs` | GET | Admin |
| `/api/admin/jobs/moderate` | POST | Admin |
| `/api/saved-jobs` | GET/POST | Any authenticated user |
| `/api/profile/saved` | GET | Any authenticated user |

### Admin Page Protection

The `/admin` page performs a server-side role check and redirects non-admin users:

```typescript
if (!user || user.role !== "admin") {
  redirect("/");
}
```

---

## Data Validation

All form inputs are validated and sanitised server-side in API route handlers.

### Validation Measures

| Measure | Example | File |
|---|---|---|
| Input trimming | `email.trim().toLowerCase()` | `app/api/auth/login/route.ts` |
| Required field checks | Returns 400 if `email` or `password` missing | `app/api/auth/login/route.ts` |
| Type coercion with safety | `Number(raw)` checked with `Number.isFinite()` | `app/api/saved-jobs/route.ts` |
| ID format validation | Regex match `^j?(\d+)$` before DB use | `app/api/saved-jobs/route.ts` |
| Enum validation | `decision` checked against `"approved" \| "rejected"` | `app/api/admin/jobs/moderate/route.ts` |
| JSON parse safety | `req.json().catch(() => null)` prevents crash on malformed input | All POST routes |

---

## SQL Injection Prevention

All database queries use **parameterised statements** with `mysql2` prepared query placeholders (`?`). No raw string interpolation is ever used in SQL.

### Example -- Parameterised Query

```typescript
const [rows] = await db.query<UserRow[]>(
  `SELECT user_id, role, name, email, password_hash
   FROM users WHERE email = ? LIMIT 1`,
  [email]
);
```

### Example -- Dynamic Search with Safe Placeholders

```typescript
if (query?.trim()) {
  const q = `%${query.trim()}%`;
  filters.push(`(j.title LIKE ? OR j.description LIKE ? OR c.company_name LIKE ?)`);
  params.push(q, q, q);
}

const [rows] = await db.query<JobRow[]>(sql, params);
```

All queries in `lib/data.ts`, `lib/auth.ts`, and the API route handlers follow this pattern consistently.

---

## XSS Protection

### React JSX Escaping

React automatically escapes values embedded in JSX, preventing most XSS attacks:

```tsx
<p>{userInput}</p>  {/* automatically escaped */}
```

No use of `dangerouslySetInnerHTML` exists in the codebase.

### Content Security Policy

A CSP header is configured in `next.config.mjs` to restrict resource loading:

```
default-src 'self';
script-src 'self' 'unsafe-inline' 'unsafe-eval';
style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
font-src 'self' https://fonts.gstatic.com;
img-src 'self' data: blob:;
connect-src 'self';
frame-ancestors 'none'
```

> **Note:** `'unsafe-inline'` and `'unsafe-eval'` are required by Next.js in development. These can be tightened with nonce-based CSP in a production hardening pass.

---

## Security Headers

The following HTTP security headers are set on all responses via `next.config.mjs`:

| Header | Value | Purpose |
|---|---|---|
| `Content-Security-Policy` | See above | Restricts resource loading sources |
| `X-Frame-Options` | `DENY` | Prevents clickjacking via iframe embedding |
| `X-Content-Type-Options` | `nosniff` | Prevents MIME-type sniffing attacks |
| `Referrer-Policy` | `strict-origin-when-cross-origin` | Limits referrer information leakage |
| `Permissions-Policy` | `camera=(), microphone=(), geolocation=()` | Disables unnecessary browser APIs |

---

## GDPR Compliance

As the system operates in the UK, **UK GDPR** compliance is mandatory.

### Current Measures

- **Minimal data collection** -- only essential fields are stored (name, email, role, saved jobs)
- **No tracking cookies** -- the only cookie is the HTTP-only session cookie
- **Secure storage** -- passwords are hashed with bcrypt, never stored in plaintext
- **Parameterised queries** -- prevent data exfiltration via injection

### Required Before Production Launch

- Consent mechanism for data collection (cookie banner / terms acceptance)
- User data deletion request flow (right to erasure)
- Privacy policy page
- Data processing records
- Data breach notification procedure

---

## HTTPS

- **Vercel deployments** enforce HTTPS automatically with TLS certificates
- **Session cookies** are marked with `secure: true` in production, preventing transmission over plain HTTP
- **SameSite=lax** prevents cookies from being sent in cross-site POST requests

---

## File Reference

| File | Security Role |
|---|---|
| `proxy.ts` | Authentication gate for protected API routes |
| `lib/auth.ts` | Session reading and role-based access helpers (`getSessionUser`, `requireRole`) |
| `lib/db.ts` | MySQL connection pool with connection limits |
| `lib/data.ts` | Data layer with parameterised SQL queries |
| `app/api/auth/login/route.ts` | Login with bcrypt password verification and secure cookie |
| `app/api/auth/logout/route.ts` | Session cookie clearing |
| `app/api/admin/jobs/route.ts` | Admin-only job listing with role check |
| `app/api/admin/jobs/moderate/route.ts` | Admin-only job moderation with role check and input validation |
| `app/api/saved-jobs/route.ts` | Authenticated saved jobs with input sanitisation |
| `app/api/me/route.ts` | Current user session lookup |
| `next.config.mjs` | Security headers (CSP, X-Frame-Options, etc.) |

---

## Future Improvements

The following enhancements are recommended for production readiness:

- [ ] Rate limiting on authentication endpoints (e.g. Vercel Edge middleware)
- [ ] CSRF tokens for state-changing requests (double-submit cookie pattern)
- [ ] Nonce-based CSP to remove `'unsafe-inline'` and `'unsafe-eval'`
- [ ] Session expiry and refresh token mechanism
- [ ] Multi-factor authentication for admin accounts
- [ ] Input validation library (Zod or Valibot) for schema-level validation
- [ ] Audit logging for admin actions
- [ ] GDPR consent mechanisms and data deletion flows
- [ ] Automated dependency vulnerability scanning (Dependabot / Snyk)
- [ ] Penetration testing before production launch