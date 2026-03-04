import { NextResponse } from "next/server";
import { getAdminJobsByStatus } from "@/lib/data";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const status = (url.searchParams.get("status") ?? "pending") as
    | "pending"
    | "approved"
    | "rejected";

  const jobs = await getAdminJobsByStatus(status);
  return NextResponse.json({ jobs });
}