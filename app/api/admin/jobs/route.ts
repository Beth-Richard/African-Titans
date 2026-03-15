import { NextResponse } from "next/server";
import { getAdminJobsByStatus } from "@/lib/data";
import { requireRole } from "@/lib/auth";

export async function GET(req: Request) {
  const admin = await requireRole("admin");
  if (!admin) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const url = new URL(req.url);
  const status = (url.searchParams.get("status") ?? "pending") as
    | "pending"
    | "approved"
    | "rejected";

  const jobs = await getAdminJobsByStatus(status);
  return NextResponse.json({ jobs });
}