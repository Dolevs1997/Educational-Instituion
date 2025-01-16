import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function createPrincipal(
  name: string,
  email: string,
  phone: string,
  coordinators: number[],
  createdAt: Date,
  updatedAt: Date
) {
  const principal = await prisma.principal.create({
    data: {
      name,
      email,
      phone,
      coordinators: {
        connect: coordinators.map((id) => ({ id })),
      },
      createdAt,
      updatedAt,
    },
  });
  return principal;
}
