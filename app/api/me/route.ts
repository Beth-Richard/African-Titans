import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { db } from "@/lib/db";

type UserRow = {
    user_id: number;
    role: "student" | "company" | "admin";
    name: string;
    email: string;
};

export async function GET() {
    const c = await cookies();
    const raw = c.get("session_user_id")?.value;
    const userId = raw ? Number(raw) : NaN;

    if (!Number.isFinite(userId)) {
        return NextResponse.json({ user: null });
    }

    const [rows] = await db.query<UserRow[]>(
        `SELECT user_id, role, name, email FROM users WHERE user_id = ? LIMIT 1`,
        [userId]
    );

    const u = rows[0];
    if (!u) return NextResponse.json({ user: null });

    return NextResponse.json({
        user: { id: String(u.user_id), role: u.role, name: u.name, email: u.email },
    });
}