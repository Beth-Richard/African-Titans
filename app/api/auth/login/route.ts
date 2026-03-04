import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";

type UserRow = {
  user_id: number;
  role: "student" | "company" | "admin";
  name: string;
  email: string;
  password_hash: string | null;
};

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const email = (body?.email as string | undefined)?.trim().toLowerCase();
  const password = body?.password as string | undefined;

  if (!email || !password) {
    return NextResponse.json({ error: "Email + password required" }, { status: 400 });
  }

  const [rows] = await db.query<UserRow[]>(
    `SELECT user_id, role, name, email, password_hash FROM users WHERE email = ? LIMIT 1`,
    [email]
  );

  const user = rows[0];
  if (!user?.password_hash) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const ok = await bcrypt.compare(password, user.password_hash);
  if (!ok) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const res = NextResponse.json({
    user: { id: String(user.user_id), role: user.role, name: user.name, email: user.email },
  });

  // httpOnly cookie session (simple MVP)
  res.cookies.set("session_user_id", String(user.user_id), {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    // secure: true, // enable when using https
  });

  return res;
}