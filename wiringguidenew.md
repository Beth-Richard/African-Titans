Wiring Guide

# UI Wiring Guidance (Application Layer)


This document describes how application-layer features should interact with the existing database.


## General Principle

Frontend and business logic should be built by:

- Following table structures

- Using existing API patterns

- Respecting database constraints and status values


No database changes are required to implement Sprint 2 UI features.


---


## Registration Flows


### Student Registration

- Create a new user record in `users`

- Assign appropriate role value

- No company record required


### Company Registration

- Create a user record in `users`

- Create a company record in `companies`

- Link via user/company relationship


---


## Job Creation Flow

- Insert job into `jobs`

- Default status: `pending`

- Associate job with:

- company_id

- campus

- category mapping


Jobs become visible only once approved.


---


## Admin Moderation Flow

Admin actions should:

- Update job status only

- Never delete job records

- Allow rejected jobs to be re-approved


---


## Saved Jobs

- Insert into `saved_jobs`

- Enforce unique user–job relationship


## Sprint 2 – Data Seeding & Mapping Notes

During Sprint 2, placeholder job data was replaced with real student‑appropriate listings.  
While doing so, it was identified that hard‑coding foreign key IDs (e.g. company_id) can lead to incorrect entity mappings across environments.

To resolve this, job records are now seeded using deterministic lookup queries (INSERT … SELECT) based on company names rather than fixed IDs. This ensures referential integrity and prevents mismatches when database contents differ between development environments.

Additionally, job category mappings were normalised after initial seeding to ensure alignment with the defined job taxonomy. Category assignments are derived from job titles to ensure consistency and repeatability during testing.

No schema or API changes were required for this refinement.
---


## Expected Developer Responsibility

UI developers are expected to:

- Build pages and forms

- Handle validation and errors

- Implement access control in TypeScript

- Use API routes correctly


Database structure and documentation provide all required guidance.
