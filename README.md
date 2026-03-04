# African-Titans
Group project

Team members,student number, roles & subroles. (list) 
Dufale Elizabeth Ebruvwiyo, 2460882, Project Manager & Business Analyst
Clovis Ebeso, 2501240, Software developer & Project Manager
Henry Mbouge Abwe, 2570233, Business Analyst & Database Analyst
Roger Mbuton Ndum, 2458389, Security Consultant & Project Manager
Ali Salih, 2416665, Database Analyst & Business Analyst
Oladele Wasiu Shina, 2442387, Security Consultant & Software Developer
Malik Ashiru, 2370207, Software Developer & Project Manager
Nico Bowen, 2556698, Database Analyst & Software Developer
Divine Oti, 2325154, Software Developer & Business Anlyst

# Student Campus Hub -- University of Wolverhampton

A full-stack MVP / prototype web application for the **Live Student Campus Hub** project. Built with Next.js 16, React 19, TypeScript, and Tailwind CSS following the University of Wolverhampton brand guidelines.

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Features](#features)
3. [Tech Stack](#tech-stack)
4. [Project Structure](#project-structure)
5. [Getting Started](#getting-started)
6. [Pages and Routes](#pages-and-routes)
7. [Data Layer and Database Readiness](#data-layer-and-database-readiness)
8. [Design System](#design-system)
9. [Chatbot](#chatbot)
10. [Security Considerations](#security-considerations)
11. [Deployment](#deployment)
12. [Future Enhancements](#future-enhancements)
13. [Contributing](#contributing)
14. [Team](#team)

---

## Project Overview

The **Student Campus Hub** is a centralised platform connecting University of Wolverhampton students with local part-time jobs, accommodation, campus events, and support services. It serves students across all three campuses -- **Wolverhampton**, **Telford**, and **Walsall** -- and includes administrative tools for managing listings and approvals.

This MVP demonstrates the core user flows and interface design outlined in the project proposal documents (Business Analyst Proposal, Database Proposal, Security Specification, and DB Deliverables).

---

## Features

### Student-Facing

| Feature | Description |
|---|---|
| **Jobs Board** | Browse, search, and filter part-time, full-time, seasonal, and internship jobs by campus, type, and keyword. Save jobs with a bookmark toggle. |
| **Job Detail View** | Full job description with company info, salary, deadline, application link, and field of study. |
| **Accommodation Listings** | Search verified accommodation (student halls, private rentals, shared houses, studios) with amenity badges, availability status, pricing, and contact actions. |
| **Events Calendar** | Browse upcoming career fairs, social events, academic workshops, sport tournaments, and wellbeing sessions with registration tracking. |
| **Student Profile** | View profile details, saved jobs, application history with status tracking (applied, reviewing, interview, accepted, rejected), and editable settings. |
| **AI Chatbot** | Floating chat assistant answering questions about jobs, accommodation, events, transport, and support -- with quick-action buttons and keyword matching. |

### Admin-Facing

| Feature | Description |
|---|---|
| **Dashboard Overview** | Key stats (total jobs, approved, pending, accommodation count, events, students) and recent activity feed. |
| **Job Approval Workflow** | Review, approve, or reject employer-submitted job postings with status filters. |
| **Accommodation Approval** | Review and approve accommodation listings. |
| **User Management** | View all users (students, employers, admins) with role badges, campus, and status. |

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Next.js 16](https://nextjs.org/) (App Router) |
| Language | [TypeScript](https://typescriptlang.org/) |
| Styling | [Tailwind CSS v4](https://tailwindcss.com/) |
| Fonts | Google Fonts -- Roboto Slab (headings), Roboto (body) |
| Icons | [Lucide React](https://lucide.dev/) |
| Package Manager | pnpm |
| Deployment | [Vercel](https://vercel.com/) |

---

## Project Structure

```
student-campus-hub/
├── app/
│   ├── layout.tsx                 # Root layout (fonts, metadata)
│   ├── globals.css                # Design tokens, Tailwind imports
│   ├── not-found.tsx              # Custom 404 page
│   └── (main)/                    # Route group with header/footer
│       ├── layout.tsx             # App shell (header + footer + chatbot)
│       ├── page.tsx               # Landing / Home page
│       ├── jobs/
│       │   ├── page.tsx           # Jobs listing page
│       │   └── [id]/page.tsx      # Individual job detail
│       ├── accommodation/
│       │   └── page.tsx           # Accommodation listings
│       ├── events/
│       │   └── page.tsx           # Events listing
│       ├── admin/
│       │   └── page.tsx           # Admin dashboard
│       └── profile/
│           └── page.tsx           # Student profile
├── components/
│   ├── header.tsx                 # Navigation header (desktop + mobile)
│   ├── footer.tsx                 # Site footer with links
│   ├── jobs-board.tsx             # Jobs search, filter, and listing
│   ├── accommodation-board.tsx    # Accommodation search and cards
│   ├── events-board.tsx           # Events filter and cards
│   ├── admin-dashboard.tsx        # Admin tabs, approvals, user table
│   ├── student-profile.tsx        # Profile, saved jobs, applications
│   └── chatbot.tsx                # Floating chat widget
├── lib/
│   ├── data.ts                    # Dummy data + helper query functions
│   └── utils.ts                   # Utility functions (cn class merger)
├── public/
│   └── images/                    # Campus, accommodation, and hero images
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── next.config.mjs
```

---

## Getting Started

### Prerequisites

- **Node.js** 18.17 or later
- **pnpm** (recommended) or npm / yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/github-repo.git
cd student-campus-hub

# Install dependencies
pnpm install

# Start the development server
pnpm dev
```

The app will be available at [http://localhost:3000](http://localhost:3000) by default.

### Build for Production

```bash
pnpm build
pnpm start
```

---

## Pages and Routes

| Route | Page | Description |
|---|---|---|
| `/` | Home | Landing page with hero, stats, features, recent jobs, campus overview, and CTA |
| `/jobs` | Jobs Board | Full job search with campus/type filters and bookmark functionality |
| `/jobs/[id]` | Job Detail | Individual job page with full description and apply button |
| `/accommodation` | Accommodation | Searchable accommodation listings with images, amenities, and contact |
| `/events` | Events | Campus events with category/campus filters and registration |
| `/admin` | Admin Dashboard | Overview stats, job/accommodation approvals, user management |
| `/profile` | Student Profile | Saved jobs, application tracking, and account settings |

---

## Data Layer and Database Readiness

All data is currently served from `lib/data.ts` as typed TypeScript arrays. This file exports **query-like helper functions** that mirror what real database calls would look like:

```typescript
// Current (dummy data)
export function getApprovedJobs(): Job[] {
  return jobs.filter((j) => j.status === "approved")
}

// Future (real database - example with Prisma)
export async function getApprovedJobs(): Promise<Job[]> {
  return prisma.job.findMany({ where: { status: "approved" } })
}
```

### Supported Data Models

| Model | Fields |
|---|---|
| `Job` | id, title, company, type, campus, location, salary, description, fieldOfStudy, remote, deadline, postedDate, status, applyUrl |
| `Accommodation` | id, title, type, campus, price, address, distance, bedrooms, available, amenities[], description, imageUrl, contactEmail, status |
| `Event` | id, title, date, time, campus, location, category, description, organizer, capacity, registered |
| `Student` | id, name, email, course, yearOfStudy, campus, savedJobs[], applications[] |
| `Application` | id, jobId, studentId, dateApplied, status |
| `Admin` | id, name, email, role |

### Connecting a Real Database

To connect a real database (e.g. PostgreSQL via Supabase, Neon, or Prisma):

1. Add your database integration or connection string
2. Create tables matching the interfaces in `lib/data.ts`
3. Replace the helper functions with real queries
4. No component code changes required -- all components consume data through the helper functions

The `DatabaseProposal` document in the repository contains the full ER diagram and SQL schema design.

---

## Design System

### Brand Colours (University of Wolverhampton)

| Token | Hex | Usage |
|---|---|---|
| Primary | `#4D5168` | Headers, navigation, buttons, dark backgrounds |
| Secondary | `#FAC817` | Accent buttons, highlights, active states, gold branding |
| Background | `#FFFFFF` | Page backgrounds |
| Foreground | `#1A1C2E` | Primary text |
| Muted | `#F1F3F7` | Secondary backgrounds, badges |
| Destructive | `#D93025` | Error states, rejection badges |
| Ring | `#FAC817` | Focus ring colour |

### Typography

| Element | Font | Weight |
|---|---|---|
| Headings | Roboto Slab (serif) | 700 (Bold) |
| Body text | Roboto (sans) | 400 (Regular) |
| Labels / badges | Roboto (sans) | 500 (Medium) |

### Tailwind Tokens

All colours are mapped to CSS custom properties in `globals.css` and referenced through Tailwind's semantic classes:
- `bg-primary`, `text-primary-foreground` -- dark blue-grey header/nav
- `bg-secondary`, `text-secondary-foreground` -- gold accent buttons
- `bg-muted`, `text-muted-foreground` -- subtle backgrounds and secondary text
- `bg-card`, `text-card-foreground` -- card surfaces

---

## Chatbot

The chatbot is a client-side FAQ-matching assistant built as a floating widget accessible from every page. It uses keyword matching against a curated FAQ dataset in `lib/data.ts`.

### How It Works

1. User types a question or clicks a quick-action button
2. The message is matched against keyword arrays in `chatbotFAQ`
3. The best-matching answer is returned (or a fallback if no match)

### Topics Covered

- Jobs and employment
- Accommodation and housing
- Events and workshops
- Campus information
- Application process
- Saved jobs / bookmarks
- Transport and travel
- Technical support and contacts
- Profile and account management
- Admin and employer features

### Upgrading to AI

To replace with a real AI chatbot:

1. Create an API route (e.g. `app/api/chat/route.ts`)
2. Integrate with Vercel AI SDK and your preferred LLM provider
3. Update the `getChatbotResponse` function to call the API
4. The chat UI component remains unchanged

---

## Security Considerations

As outlined in the project's Security Specification document:

- **Authentication**: The MVP uses simulated auth state. When connecting a real backend, implement proper authentication with:
  - Password hashing (bcrypt)
  - HTTP-only session cookies
  - CSRF protection
- **Authorisation**: Role-based access control (Student, Admin, Employer) should be enforced at the API layer
- **Data Validation**: All form inputs should be validated and sanitised server-side
- **SQL Injection**: Use parameterised queries or an ORM (Prisma, Drizzle)
- **XSS Protection**: React's JSX escaping handles most cases; additional CSP headers recommended for production
- **GDPR Compliance**: Student data handling must comply with UK GDPR -- consent mechanisms and data deletion flows should be added before production launch
- **HTTPS**: Enforced automatically on Vercel deployments

---

## Deployment

### Vercel (Recommended)

1. Push the repository to GitHub
2. Connect the repository on [vercel.com](https://vercel.com/)
3. Deploy -- Vercel automatically detects Next.js and configures the build

### Environment Variables

For future database/auth integration, you will need:

| Variable | Description |
|---|---|
| `DATABASE_URL` | Connection string for your database |
| `NEXTAUTH_SECRET` | Secret for session encryption (if using NextAuth) |
| `NEXTAUTH_URL` | Your deployment URL |

---

## Future Enhancements

Based on the project proposal documents, planned enhancements include:

- [ ] Real database integration (PostgreSQL via Supabase or Neon)
- [ ] User authentication and registration (email + university SSO)
- [ ] Employer portal for submitting and managing job listings
- [ ] AI-powered chatbot with natural language understanding
- [ ] Email notifications for new jobs matching student preferences
- [ ] Transport integration (bus/train times to campus)
- [ ] Mobile-responsive push notifications
- [ ] Analytics dashboard for admin insights
- [ ] Accessibility audit and WCAG 2.1 AA compliance
- [ ] Multi-language support

---

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m "Add your feature"`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

---

## Team

**African Titans** -- University of Wolverhampton

This project was developed as part of the academic curriculum at the University of Wolverhampton. All proposal documents (Business Analyst Proposal, Database Proposal, Security Specification, DB Deliverables) are included in the repository root.
