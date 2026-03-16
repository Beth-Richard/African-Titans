import { cookies } from "next/headers";
import type { RowDataPacket } from "mysql2";
import { db } from "./db";

type UserRow = RowDataPacket & {
  user_id: number;
  role: "student" | "company" | "admin";
  name: string;
  email: string;
};

/**
 * Reads the session cookie and returns the authenticated user, or null.
 * Use in API route handlers for server-side auth checks.
 */
export async function getSessionUser(): Promise<UserRow | null> {
  const c = await cookies();
  const raw = c.get("session_user_id")?.value;
  const userId = raw ? Number(raw) : NaN;

  if (!Number.isFinite(userId)) return null;

  const [rows] = await db.query<UserRow[]>(
    `SELECT user_id, role, name, email FROM users WHERE user_id = ? LIMIT 1`,
    [userId]
  );

  return rows[0] ?? null;
}

/**
 * Returns the authenticated user if they have the required role.
 * Returns null otherwise.
 */
export async function requireRole(role: UserRow["role"]): Promise<UserRow | null> {
  const user = await getSessionUser();
  if (!user || user.role !== role) return null;
  return user;
}
