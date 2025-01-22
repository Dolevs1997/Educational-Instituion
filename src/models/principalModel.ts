import { PrismaClient } from "@prisma/client";
import {
  PrincipalType,
  pricipalCoordinatorsType,
} from "../schemas/principalSchemas";
const prisma = new PrismaClient();

export async function createPrincipal(data: PrincipalType) {
  const principal = await prisma.principal.create({
    data: {
      name: data.name,
      email: data.email,
      phone: data.phone,
      coordinators: data.coordinators
        ? { create: data.coordinators }
        : undefined,
      instructors: data.instructors ? { create: data.instructors } : undefined,
      createdAt: new Date(),
    },
  });

  return principal;
}

export async function updatePrincipal(
  id: string,
  name: string,
  email: string,
  phone: string,
  coordinators: pricipalCoordinatorsType
) {
  const principal = await prisma.principal.update({
    where: { id: parseInt(id) },
    data: {
      name,
      email,
      phone,
      coordinators: coordinators ? { create: coordinators } : undefined,
      updatedAt: new Date(),
    },
  });

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
