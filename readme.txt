# Student Campus Hub – Database (Jobs MVP)

**Sprint:** 1 (Jobs only)  MVP*
**DBMS:** MySQL 8 (XAMPP/phpMyAdmin) or SQL workbench/Community Server 
**Database name:** `student_campus_hub`

This database supports the Jobs board MVP for University of Wolverhampton campuses (Wolverhampton, Telford, Walsall).

---

## 1) What the database supports

**Student**

- View approved jobs (not expired)
- Filter by campus / employment type / keyword
- View job detail
- Save (bookmark) jobs


**Company/Admin**

- Company users can post jobs (pending)
- Admin approves/rejects jobs
- Moderation decisions logged

---

## 2) Tables

| Table     | Purpose |
|------     |---------|
| `users`   | Students, company users, admins (role-based access) |
| `companies`| Company profile linked to one user |
| `campuses`| Campus filter data |
| `jobs`    | Job listings (status lifecycle + location) |
| `job_categories` | Controlled job categories |
| `job_category_map` | Jobs ↔ categories (M:N bridge) |
| `saved_jobs` | Users ↔ saved jobs (M:N bridge) |
| `job_moderation` | Admin approval/rejection audit log |

---

## 3) ERD Summary (Relationships)

### Core 1→many

- `companies.user_id → users.user_id` (UNIQUE)  
  *A user may own 0..1 company; a company must have 1 owner user.*

- `jobs.company_id → companies.company_id`  
  *A company posts many jobs; each job belongs to one company.*

- `jobs.campus_id → campuses.campus_id`  
  *A campus has many jobs; each job is linked to one campus.*

### Many→many (bridge tables)

- `saved_jobs (user_id, job_id)`  
  *Students can save many jobs; jobs can be saved by many students.*

- `job_category_map (job_id, category_id)`
  
  *Jobs can have multiple categories; categories can apply to many jobs.*

### Moderation log (audit)

- `job_moderation.job_id → jobs.job_id`  
- `job_moderation.admin_user_id → users.user_id`  

---


## 4) Job Visibility (Student View)

Students only see jobs where:
- `status = 'approved'`
- `expires_at IS NULL OR expires_at >= NOW()`

---

## 5) Workflows (MVP)

### A) Company posts a job
1. Company submits job form
2. Insert job with `status='pending'`
3. Admin can review in pending list

### B) Admin approves/rejects
1. Admin selects a pending job
2. Update `jobs.status`
3. Insert a record into `job_moderation`
4. Approved jobs become visible to students immediately

### C) Student saves a job
1. Student toggles bookmark
2. Insert row into `saved_jobs`
3. Composite PK prevents duplicates
4. Unsave = delete row from `saved_jobs`

---

## 6) Authentication & Roles (Planned)

Roles are supported via `users.role`:
- `student`
- `company`
- `admin`

Authentication will be implemented later by adding `users.password_hash` (hashed server-side using bcrypt/argon2).  
No plain-text passwords will be stored in the database.

---

## 7) How to run locally (XAMPP/phpMyAdmin)

1. Start **MySQL** in XAMPP
2. Create DB: `student_campus_hub`
3. Run:
   - `schema_mysql.sql`
   - `seed_mysql.sql`



