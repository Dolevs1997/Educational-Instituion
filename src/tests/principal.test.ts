import initApp from "../../app";
import request from "supertest";
import { PrismaClient } from "@prisma/client";
import { Express } from "express";
import { z } from "zod";
import { coordinatorZodSchema } from "../schemas/coordinatorSchemas";
import { principalZodSchema, PrincipalType } from "../schemas/principalSchemas";
// import { coordinator } from "./coordinator.test";
const prisma = new PrismaClient();
let app: Express;
let principalTemp: any;
const principal = {
  name: "John Doe",
  email: "JohnDoe@gmail.com",
  phone: "1234567890",
};

const coordinator = {
  name: "Jane Doe",
  email: "Jane@gmail.com",
  phone: "0987654321",
  principalId: principalTemp,
  principal: principalZodSchema,
  department: "Computer Science",
};

beforeAll(async () => {
  // Initialize the application
  app = await initApp();
  // Perform any additional setup if needed
  await prisma.$connect();
  await prisma.coordinator.deleteMany();
  await prisma.principal.deleteMany();
});

afterAll(async () => {
  await prisma.$disconnect();
});

describe("Principal POST test", () => {
  test("create a new principal", async () => {
    const res = await request(app).post("/principal/create").send(principal);
    expect(res.status).toBe(201);
    expect(res.body.name).toBe(principal.name);

    principalTemp = await prisma.principal.findFirst({
      where: {
        name: principal.name,
        email: principal.email,
        phone: principal.phone,
      },
    });

    console.log("principalTemp", principalTemp);
    coordinator.principalId = principalTemp?.id;
    coordinator.principal = principalTemp;
  });

  test("update principal data", async () => {
    principal.phone = "0987654321";

    const res = await request(app)
      .put(`/principal/update/${principalTemp?.id}`)
      .send(principal);
    console.log("res.body", res.body);
    expect(res.status).toBe(200);
  });
  test("insert coordinator for principal", async () => {
    const res = await request(app)
      .post("/coordinator/create")
      .send(coordinator);
    console.log(res);
    expect(res.status).toBe(201);
  });

  test("get principal by id", async () => {
    const res = await request(app).get(`/principal/get/${principalTemp?.id}`);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(principal.name);
  });

  test("get all principals", async () => {
    const res = await request(app).get("/principal/getAll");
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(1);
  });

  test("delete principal", async () => {
    const res = await request(app).delete(
      `/principal/delete/${principalTemp?.id}`
    );
    expect(res.status).toBe(200);
    expect(res.text).toBe("Principal deleted successfully");
  });

  test("get all principals after delete", async () => {
    const res = await request(app).get("/principal/getAll");
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(0);
  });
});
