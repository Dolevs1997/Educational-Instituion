import { PrismaClient } from "@prisma/client";
import { InstructorType } from "../schemas/instructorSchemas";
import { updateCoordinator } from "./coordinatorModel";
import { updatePrincipal } from "./principalModel";
const prisma = new PrismaClient();

export async function createInstructor(instructor: InstructorType) {
  const newInstructor = await prisma.instructor.create({
    data: {
      name: instructor.name,
      email: instructor.email,
      phone: instructor.phone,
      department: instructor.department,
      coordinatorId: instructor.coordinatorId,
      principalId: instructor.principalId,
      createdAt: new Date(),
    },
  });
  const coordinator = await prisma.coordinator.findUnique({
    where: {
      id: instructor.coordinatorId,
    },
  });

  await updateCoordinator(instructor.coordinatorId, {
    ...coordinator,
    instructors: {
      connect: {
        id: newInstructor.id,
      },
    },
  });

  const principal = await prisma.principal.findUnique({
    where: {
      id: instructor.principalId,
    },
  });

  await updatePrincipal(instructor.principalId, {
    ...principal,
    instructors: {
      connect: {
        id: newInstructor.id,
      },
    },
  });

  return newInstructor;
}

export async function getAllInstructors() {
  return await prisma.instructor.findMany();
}

export async function getInstructorById(id: number) {
  return await prisma.instructor.findUnique({
    where: {
      id: id,
    },
  });
}

export async function updateInstructor(id: number, instructor: InstructorType) {
  const updatedInstructor = await prisma.instructor.update({
    where: {
      id: id,
    },
    data: {
      name: instructor.name,
      email: instructor.email,
      phone: instructor.phone,
      department: instructor.department,
      coordinatorId: instructor.coordinatorId,
      principalId: instructor.principalId,
      updatedAt: new Date(),
    },
  });

  return updatedInstructor;
}

export async function deleteInstructor(id: number) {
  return await prisma.instructor.delete({
    where: {
      id: id,
    },
  });
}
