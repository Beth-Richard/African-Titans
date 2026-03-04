import { NextResponse } from "next/server";
import { moderateJob } from "@/lib/data";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const jobId = body?.jobId as string | undefined;
  const decision = body?.decision as "approved" | "rejected" | undefined;

  if (!jobId || !decision) {
    return NextResponse.json({ error: "jobId + decision required" }, { status: 400 });
  }

  await moderateJob(jobId, decision);
  return NextResponse.json({ ok: true });
}