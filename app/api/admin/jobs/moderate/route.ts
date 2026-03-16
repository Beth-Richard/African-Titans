import { NextResponse } from "next/server";
import { moderateJob } from "@/lib/data";
import { requireRole } from "@/lib/auth";

export async function POST(req: Request) {
  const admin = await requireRole("admin");
  if (!admin) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = await req.json().catch(() => null);
  const jobId = body?.jobId as string | undefined;
  const decision = body?.decision as "approved" | "rejected" | undefined;

  if (!jobId || !decision) {
    return NextResponse.json({ error: "jobId + decision required" }, { status: 400 });
  }

  // Validate decision is one of the allowed values
  if (decision !== "approved" && decision !== "rejected") {
    return NextResponse.json({ error: "Invalid decision" }, { status: 400 });
  }

  await moderateJob(jobId, decision, undefined, admin.user_id);
  return NextResponse.json({ ok: true });
}