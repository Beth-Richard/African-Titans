import { prisma } from "./prisma";

export type Role = "student" | "company" | "admin";

export async function findUserByEmail(email: string) {
  return prisma.user.findUnique({ where: { email } });
}

export async function getUserById(id: number) {
  return prisma.user.findUnique({ where: { id } });
}

export async function createUser(args: {
  name: string;
  email: string;
  passwordHash: string;
  role: Role;
  companyName?: string | null;
}) {
  const user = await prisma.user.create({
    data: {
      name: args.name,
      email: args.email,
      passwordHash: args.passwordHash,
      role: args.role,
      companyName: args.companyName ?? null,
    },
  });
  return user;
}
