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
      principalId: coordinator.principalId,
      principal: coordinator.principal,
      department: coordinator.department,
      createdAt: new Date(),
    },
  });

  await updatePrincipal(
    coordinator.principalId.toString(),
    coordinator.principal.name,
    coordinator.principal.email,
    coordinator.principal.phone,
    newCoordinator
  );

  return newCoordinator;
}
