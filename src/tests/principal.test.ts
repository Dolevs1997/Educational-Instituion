import initApp from "../../app";
import request from "supertest";
import { PrismaClient } from "@prisma/client";
import { Express } from "express";
const prisma = new PrismaClient();
let app: Express;

beforeAll(async () => {
  // Initialize the application
  app = await initApp();
  // Perform any additional setup if needed
  await prisma.$connect();
  await prisma.$executeRaw`DELETE FROM "Principal";`;
});

afterAll(async () => {
  // Clean up the database

  await prisma.$disconnect();
});

describe("Principal POST test", () => {
  test("create a new principal", async () => {
    const res = await request(app).post("/principal/create").send({
      name: "John Doe",
      email: "JohnDoe@gmail.com",
      phone: "1234567890",
      coordinators: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    expect(res.status).toBe(201);
    expect(res.text).toBe("Principal created successfully");
  });
});
