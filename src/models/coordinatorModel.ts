import { PrismaClient } from "@prisma/client";
import { CoordinatorType } from "../schemas/coordinatorSchemas";
import { updatePrincipal } from "./principalModel";
const prisma = new PrismaClient();

export async function createCoordinator(coordinator: CoordinatorType) {
  const newCoordinator = await prisma.coordinator.create({
    data: {
      name: coordinator.name,
      email: coordinator.email,
      phone: coordinator.phone,
      department: coordinator.department,
      principalId: coordinator.principalId,
    },
  });
  const principal = await prisma.principal.findUnique({
    where: {
      id: coordinator.principalId,
    },
  });

  await updatePrincipal(coordinator.principalId, {
    ...principal,
    coordinators: {
      connect: {
        id: newCoordinator.id,
      },
    },
  });

  return newCoordinator;
}

export async function getCoordinatorById(id: number) {
  const coordinator = await prisma.coordinator.findUnique({
    where: {
      id: id,
    },
  });

  return coordinator;
}

export async function updateCoordinator(
  id: number,
  coordinator: CoordinatorType
) {
  const updatedCoordinator = await prisma.coordinator.update({
    where: {
      id: id,
    },
    data: {
      name: coordinator.name,
      email: coordinator.email,
      phone: coordinator.phone,
      department: coordinator.department,
      principalId: coordinator.principalId,
      updatedAt: new Date(),
    },
  });

  return updatedCoordinator;
}

export async function deleteCoordinator(id: number) {
  await prisma.coordinator.delete({
    where: {
      id: id,
    },
  });

  return;
}

export async function getAllCoordinators() {
  const coordinators = await prisma.coordinator.findMany();

  return coordinators;
}
