import { PrismaClient } from "@prisma/client";
import { PrincipalType } from "../schemas/principalSchemas";
import { z } from "zod";
import { coordinatorZodSchema } from "../schemas/coordinatorSchemas";
const prisma = new PrismaClient();

export async function createPrincipal(data: PrincipalType) {
  const principal = await prisma.principal.create({
    data: {
      name: data.name,
      email: data.email,
      phone: data.phone,
      createdAt: new Date(),
    },
  });

  return principal;
}

export async function updatePrincipal(id: number, data: any) {
  // console.log("data", data.coordinators);
  const principal = await prisma.principal.update({
    where: { id: id },
    data: {
      name: data.name,
      email: data.email,
      phone: data.phone,
      coordinators: data.coordinators,
      instructors: data.instructors,
      updatedAt: new Date(),
    },
  });

  // console.log("Updated principal:", principal);

  return principal;
}

export async function getPrincipalById(id: string) {
  const principal = await prisma.principal.findUnique({
    where: { id: parseInt(id) },
  });
  return principal;
}

export async function getAllPrincipals() {
  const principals = await prisma.principal.findMany();
  return principals;
}

export async function removePrincipal(id: string) {
  await prisma.principal.delete({
    where: { id: parseInt(id) },
  });
}
