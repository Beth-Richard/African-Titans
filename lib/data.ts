/**
 * lib/data.ts — JOBS-only, schema-aligned (MySQL)
 *
 * This replaces the dummy arrays and maps your current schema onto your existing UI Job shape.
 *
 * IMPORTANT:
 * - These functions are SERVER-SIDE ONLY (Node).
 * - Do not import into "use client" components. Use the API routes for client components.
 */

import type { RowDataPacket } from "mysql2";
import { db } from "./db"; 
export type Campus = "Wolverhampton" | "Telford" | "Walsall";

export interface Job {
  id: string; // "j1"
  title: string;
  company: string;
  companyLogo?: string; // not in schema
  type: "Part-time" | "Full-time" | "Seasonal" | "Internship";
  campus: Campus;
  location: string;
  salary: string;
  description: string;
  fieldOfStudy: string; // derived from first category name (or "Any")
  remote: boolean;
  deadline: string | null; // DATE(expires_at)
  postedDate: string; // DATE(posted_at)
  status: "approved" | "pending" | "rejected"; // mapped from DB status
  applyUrl: string;

  // Optional: all categories
  categories?: string[];
}

function toJobIdString(jobId: number): string {
  return `j${jobId}`;
}

function parseJobId(input: string | number): number | null {
  if (typeof input === "number") return Number.isFinite(input) ? input : null;
  const s = String(input).trim();
  const m = s.match(/^j?(\d+)$/i);
  if (!m) return null;
  const n = Number(m[1]);
  return Number.isFinite(n) ? n : null;
}

type EmploymentTypeDB = "part-time" | "casual" | "internship" | "temporary" | "contract";
type JobStatusDB = "draft" | "pending" | "approved" | "rejected" | "closed";
type PayTypeDB = "hourly" | "salary";
type RemoteTypeDB = "onsite" | "hybrid" | "remote";

function mapEmploymentTypeToUI(t: EmploymentTypeDB): Job["type"] {
  switch (t) {
    case "part-time":
    case "casual":
      return "Part-time";
    case "internship":
      return "Internship";
    case "temporary":
      return "Seasonal";
    case "contract":
      return "Full-time";
    default:
      return "Part-time";
  }
}

function mapStatusToUI(s: JobStatusDB): Job["status"] {
  if (s === "approved") return "approved";
  if (s === "pending") return "pending";
  return "rejected";
}

function formatSalary(args: {
  pay_min: string | null; // DECIMAL often returns as string with mysql2
  pay_max: string | null;
  currency: string;
  pay_type: PayTypeDB;
}): string {
  const { pay_min, pay_max, currency, pay_type } = args;
  const symbol = currency === "GBP" ? "£" : `${currency} `;
  const suffix = pay_type === "hourly" ? "/hr" : "/year";

  if (pay_min && pay_max) return `${symbol}${pay_min}–${symbol}${pay_max}${suffix}`;
  if (pay_min) return `${symbol}${pay_min}${suffix}`;
  if (pay_max) return `${symbol}${pay_max}${suffix}`;
  return "Competitive";
}

type JobRow = RowDataPacket & {
  job_id: number;
  title: string;
  description: string;
  employment_type: EmploymentTypeDB;
  pay_min: string | null;
  pay_max: string | null;
  currency: string;
  pay_type: PayTypeDB;
  remote_type: RemoteTypeDB;
  location_text: string | null;
  apply_url: string;
  posted_date: string;
  deadline: string | null;
  status: JobStatusDB;

  company_name: string;
  campus_name: string;
  categories_csv: string | null;
};

const JOB_SELECT = `
SELECT
  j.job_id,
  j.title,
  j.description,
  j.employment_type,
  j.pay_min,
  j.pay_max,
  j.currency,
  j.pay_type,
  j.remote_type,
  j.location_text,
  j.apply_url,
  DATE(j.posted_at) AS posted_date,
  DATE(j.expires_at) AS deadline,
  j.status,
  c.company_name,
  ca.campus_name,
  GROUP_CONCAT(DISTINCT jc.category_name ORDER BY jc.category_name SEPARATOR ',') AS categories_csv
FROM jobs j
JOIN companies c ON c.company_id = j.company_id
JOIN campuses ca ON ca.campus_id = j.campus_id
LEFT JOIN job_category_map jcm ON jcm.job_id = j.job_id
LEFT JOIN job_categories jc ON jc.category_id = jcm.category_id
`;

function mapJob(row: JobRow): Job {
  const categories =
    row.categories_csv?.split(",").map((s) => s.trim()).filter(Boolean) ?? [];

  return {
    id: toJobIdString(row.job_id),
    title: row.title,
    company: row.company_name,
    companyLogo: undefined,
    type: mapEmploymentTypeToUI(row.employment_type),
    campus: row.campus_name as Campus,
    location: row.location_text ?? row.campus_name,
    salary: formatSalary({
      pay_min: row.pay_min,
      pay_max: row.pay_max,
      currency: row.currency,
      pay_type: row.pay_type,
    }),
    description: row.description,
    fieldOfStudy: categories[0] ?? "Any",
    remote: row.remote_type === "remote" || row.remote_type === "hybrid",
    deadline: row.deadline,
    postedDate: row.posted_date,
    status: mapStatusToUI(row.status),
    applyUrl: row.apply_url,
    categories,
  };
}

export async function getApprovedJobs(): Promise<Job[]> {
  const sql = `
${JOB_SELECT}
WHERE j.status = 'approved'
GROUP BY j.job_id
ORDER BY j.posted_at DESC
`;
  const [rows] = await db.query<JobRow[]>(sql);
  return rows.map(mapJob);
}

export async function getPendingJobs(): Promise<Job[]> {
  const sql = `
${JOB_SELECT}
WHERE j.status = 'pending'
GROUP BY j.job_id
ORDER BY j.posted_at DESC
`;
  const [rows] = await db.query<JobRow[]>(sql);
  return rows.map(mapJob);
}

export async function getJobById(id: string): Promise<Job | null> {
  const jobId = parseJobId(id);
  if (!jobId) return null;

  const sql = `
${JOB_SELECT}
WHERE j.job_id = ?
GROUP BY j.job_id
LIMIT 1
`;
  const [rows] = await db.query<JobRow[]>(sql, [jobId]);
  return rows[0] ? mapJob(rows[0]) : null;
}

export async function searchJobs(query: string, campus?: string, type?: string): Promise<Job[]> {
  const filters: string[] = [`j.status = 'approved'`];
  const params: any[] = [];

  if (campus && campus !== "all") {
    filters.push(`ca.campus_name = ?`);
    params.push(campus);
  }

  if (type && type !== "all") {
    const map: Record<string, EmploymentTypeDB[]> = {
      "Part-time": ["part-time", "casual"],
      "Internship": ["internship"],
      "Seasonal": ["temporary"],
      "Full-time": ["contract"],
    };
    const dbTypes = map[type] ?? [];
    if (dbTypes.length) {
      filters.push(`j.employment_type IN (${dbTypes.map(() => "?").join(",")})`);
      params.push(...dbTypes);
    }
  }

  if (query?.trim()) {
    const q = `%${query.trim()}%`;
    filters.push(`(
      j.title LIKE ? OR
      j.description LIKE ? OR
      c.company_name LIKE ? OR
      jc.category_name LIKE ?
    )`);
    params.push(q, q, q, q);
  }

  const where = `WHERE ${filters.join(" AND ")}`;

  const sql = `
${JOB_SELECT}
${where}
GROUP BY j.job_id
ORDER BY j.posted_at DESC
`;
  const [rows] = await db.query<JobRow[]>(sql, params);
  return rows.map(mapJob);
}
export async function getAdminJobsByStatus(
    status: "pending" | "approved" | "rejected"
): Promise<Job[]> {
    // Map UI status to DB status
    const dbStatus: JobStatusDB = status === "approved"
        ? "approved"
        : status === "pending"
            ? "pending"
            : "rejected";

    const sql = `
${JOB_SELECT}
WHERE j.status = ?
GROUP BY j.job_id
ORDER BY j.posted_at DESC
`;
    const [rows] = await db.query<JobRow[]>(sql, [dbStatus]);
    return rows.map(mapJob);
}

export async function moderateJob(
    jobIdInput: string,
    decision: "approved" | "rejected",
    reason?: string
): Promise<void> {
    const jobId = parseJobId(jobIdInput);
    if (!jobId) throw new Error("Invalid jobId");

    // MVP: hardcode admin user_id = 1 (your seeded admin)
    const ADMIN_USER_ID = 1;

    // Update job status
    await db.query(
        `UPDATE jobs SET status = ? WHERE job_id = ?`,
        [decision, jobId]
    );

    // Write moderation record
    await db.query(
        `INSERT INTO job_moderation (job_id, admin_user_id, decision, reason) VALUES (?, ?, ?, ?)`,
        [jobId, ADMIN_USER_ID, decision, reason ?? null]
    );
}
