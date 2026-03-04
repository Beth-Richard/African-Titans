import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { db } from "@/lib/db";
import { getJobById } from "@/lib/data";

export async function GET() {
    try {
        const cookieStore = await cookies();
        const userIdRaw = cookieStore.get("session_user_id")?.value;

        if (!userIdRaw) {
            return NextResponse.json({ jobs: [] }, { status: 200 });
        }

        const userId = Number(userIdRaw);
        if (!Number.isFinite(userId)) {
            return NextResponse.json({ jobs: [] }, { status: 200 });
        }

        const [rows]: any = await db.query(
            "SELECT job_id FROM saved_jobs WHERE user_id = ? ORDER BY saved_at DESC",
            [userId]
        );

        if (!rows || rows.length === 0) {
            return NextResponse.json({ jobs: [] }, { status: 200 });
        }

        const jobIds: string[] = rows.map((r: any) => `j${r.job_id}`);

        const jobs = [];
        for (const id of jobIds) {
            const job = await getJobById(id);
            if (job) jobs.push(job);
        }

        return NextResponse.json({ jobs }, { status: 200 });
    } catch (err) {
        console.error("GET /api/profile/saved error:", err);
        return NextResponse.json({ jobs: [] }, { status: 500 });
    }
}