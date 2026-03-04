import { NextResponse } from "next/server";
import { getApprovedJobs, searchJobs } from "@/lib/data";

/**
 * GET /api/jobs
 * Query params:
 *  - q: string
 *  - campus: string ("Wolverhampton" | "Telford" | "Walsall" | "all")
 *  - type: string ("Part-time" | "Full-time" | "Seasonal" | "Internship" | "all")
 *
 * If q/campus/type not provided, returns approved jobs.
 */
export async function GET(req: Request) {
  const url = new URL(req.url);
  const q = url.searchParams.get("q") ?? "";
  const campus = url.searchParams.get("campus") ?? "all";
  const type = url.searchParams.get("type") ?? "all";

  const hasAnyFilter = Boolean(q.trim()) || campus !== "all" || type !== "all";

  const jobs = hasAnyFilter
    ? await searchJobs(q, campus, type)
    : await getApprovedJobs();

  return NextResponse.json({ jobs });
}
