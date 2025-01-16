import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function createCoordinator(
  name: string,
  email: string,
  phone: string,
  principalId: number,
  instructors: number[],
  createdAt: Date,
  updatedAt: Date
) {
  const coordinator = await prisma.coordinator.create({
    data: {
      name,
      email,
      phone,
      principalId,
      instructors: {
        connect: instructors.map((id) => ({ id })),
      },
      createdAt,
      updatedAt,
    },
  });
  return coordinator;
}
