import initApp from "../../app";
import request from "supertest";
import { PrismaClient } from "@prisma/client";
import { Express } from "express";
import { principal } from "./principal.test";
const prisma = new PrismaClient();
let app: Express;
let pricipalId: any;
const coordinator = {
  name: "Jane Doe",
  email: "Jane@gmail.com",
  phone: "0987654321",
  principalId: pricipalId,
  instructors: [],
  createdAt: new Date(),
  updatedAt: new Date(),
};

beforeAll(async () => {
  // Initialize the application
  app = await initApp();
  // Perform any additional setup if needed
  await prisma.$connect();
  await prisma.$executeRaw`DELETE FROM "Principal";`;
});

afterAll(async () => {
  await prisma.$disconnect();
});

describe("Coordinator POST test", () => {
  test("create a new coordinator", async () => {
    // // Create a principal
    await request(app).post("/principal/create").send(principal);

    // Update the principalId
    pricipalId = await prisma.principal.findFirst({
      where: { name: principal.name },
    });
    // Get the principalId
    coordinator.principalId = pricipalId.id;

    // Create a coordinator
    const res = await request(app)
      .post("/coordinator/create")
      .send(coordinator);
    console.log(res);
    expect(res.status).toBe(201);
    expect(res.text).toBe("Coordinator created successfully");
  });
});
