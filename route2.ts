import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { createUser, findUserByEmail } from "@/lib/users";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, password, role, companyName } = body;

    if (!name || !email || !password || !role) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const existing = await findUserByEmail(email);
    if (existing) return NextResponse.json({ error: "Email already registered" }, { status: 409 });

    const hash = await bcrypt.hash(password, 10);

    const user = await createUser({
      name,
      email,
      passwordHash: hash,
      role,
      companyName: companyName ?? null,
    });

    return NextResponse.json({ id: user.id, email: user.email, role: user.role, name: user.name }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message ?? "Server error" }, { status: 500 });
  }
}
