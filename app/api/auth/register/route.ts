import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import type { RowDataPacket, ResultSetHeader } from "mysql2";
import { db } from "@/lib/db";

type Role = "student" | "company" | "admin";

type UserRow = RowDataPacket & {
  user_id: number;
  email: string;
};

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => null);
    if (!body) {
      return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
    }

    const name = (body.name as string | undefined)?.trim();
    const email = (body.email as string | undefined)?.trim().toLowerCase();
    const password = body.password as string | undefined;
    const role = body.role as Role | undefined;
    if (!name || !email || !password || !role) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    if (!["student", "company", "admin"].includes(role)) {
      return NextResponse.json({ error: "Invalid role" }, { status: 400 });
    }

    if (password.length < 8) {
      return NextResponse.json({ error: "Password must be at least 8 characters" }, { status: 400 });
    }

    const [existing] = await db.query<UserRow[]>(
      `SELECT user_id FROM users WHERE email = ? LIMIT 1`,
      [email]
    );

    if (existing.length > 0) {
      return NextResponse.json({ error: "Email already registered" }, { status: 409 });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const [result] = await db.query<ResultSetHeader>(
      `INSERT INTO users (name, email, password_hash, role) VALUES (?, ?, ?, ?)`,
      [name, email, passwordHash, role]
    );

    return NextResponse.json(
      { id: result.insertId, email, role, name },
      { status: 201 }
    );
  } catch (err: any) {
    return NextResponse.json({ error: err?.message ?? "Server error" }, { status: 500 });
  }
}
