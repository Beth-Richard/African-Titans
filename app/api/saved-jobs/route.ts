import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { db } from "@/lib/db";

function parseJobId(input: unknown): number | null {
    const s = String(input ?? "").trim();
    const m = s.match(/^j?(\d+)$/i); // supports "j12" OR "12"
    if (!m) return null;
    const n = Number(m[1]);
    return Number.isFinite(n) ? n : null;
}

// GET /api/saved-jobs -> { savedJobIds: ["j1","j2"] }
export async function GET() {
    const cookieStore = await cookies();
    const userIdRaw = cookieStore.get("session_user_id")?.value;
    const userId = userIdRaw ? Number(userIdRaw) : NaN;

    if (!Number.isFinite(userId)) {
        return NextResponse.json({ savedJobIds: [] }, { status: 200 });
    }

    const [rows]: any = await db.query(
        "SELECT job_id FROM saved_jobs WHERE user_id = ? ORDER BY saved_at DESC",
        [userId]
    );

    const savedJobIds = (rows ?? []).map((r: any) => `j${r.job_id}`);
    return NextResponse.json({ savedJobIds }, { status: 200 });
}

/**
 * POST /api/saved-jobs
 * body: { jobId: "j12" | "12", action: "save" | "unsave" }
 */
export async function POST(req: Request) {
    const cookieStore = await cookies();
    const userIdRaw = cookieStore.get("session_user_id")?.value;
    const userId = userIdRaw ? Number(userIdRaw) : NaN;

    if (!Number.isFinite(userId)) {
        return NextResponse.json({ error: "Not logged in" }, { status: 401 });
    }

    const body = await req.json().catch(() => null);
    const action = body?.action as "save" | "unsave" | undefined;
    const jobIdNum = parseJobId(body?.jobId);

    if (!action || !jobIdNum) {
        return NextResponse.json({ error: "jobId + action required" }, { status: 400 });
    }

    if (action === "save") {
        await db.query(
            "INSERT IGNORE INTO saved_jobs (user_id, job_id) VALUES (?, ?)",
            [userId, jobIdNum]
        );
    } else {
        await db.query(
            "DELETE FROM saved_jobs WHERE user_id = ? AND job_id = ?",
            [userId, jobIdNum]
        );
    }

    // Return updated truth from DB so UI can sync
    const [rows]: any = await db.query(
        "SELECT job_id FROM saved_jobs WHERE user_id = ? ORDER BY saved_at DESC",
        [userId]
    );

    const savedJobIds = (rows ?? []).map((r: any) => `j${r.job_id}`);
    return NextResponse.json({ savedJobIds }, { status: 200 });
}