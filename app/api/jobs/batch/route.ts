import { NextResponse } from "next/server";
import { getJobById } from "@/lib/data";

/**
 * GET /api/jobs/batch?ids=j1,j2,j5
 */
export async function GET(req: Request) {
    const url = new URL(req.url);
    const idsParam = url.searchParams.get("ids") ?? "";

    const ids = idsParam
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);

    if (!ids.length) {
        return NextResponse.json({ jobs: [] });
    }

    const jobs = [];

    for (const id of ids) {
        const job = await getJobById(id);
        if (job) jobs.push(job);
    }

    return NextResponse.json({ jobs });
}