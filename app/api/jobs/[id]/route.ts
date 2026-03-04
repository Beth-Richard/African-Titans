import { NextResponse } from "next/server";
import { getJobById } from "@/lib/data";

/**
 * GET /api/jobs/:id
 * id can be "j1" or "1"
 */
export async function GET(_req: Request, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;
  const job = await getJobById(id);

  if (!job) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ job });
}
