import initApp from "../../app";
import request from "supertest";
import { PrismaClient } from "@prisma/client";
import { Express } from "express";
import { PrincipalType } from "../schemas/principalSchemas";
const prisma = new PrismaClient();
let app: Express;
let pricipalId: number | undefined;
let coordinatorId: number | undefined;
const principal: PrincipalType = {
  name: "John Doe",
  email: "JohnDoe@gmail.com",
  phone: "1234567890",
};

const coordinator = {
  name: "Jane Doe",
  email: "Jane@gmail.com",
  phone: "0987654321",
  principalId: pricipalId,
  principal: principal,
  department: "Computer Science",
};

beforeAll(async () => {
  // Initialize the application
  app = await initApp();
  // Perform any additional setup if needed
  await prisma.$connect();
  await prisma.coordinator.deleteMany();
  await prisma.principal.deleteMany();

  // Create a principal
  const res = await request(app)
    .post("/principal/create")
    .send(principal)
    .expect(201);

  console.log("res.body", res.body);
  pricipalId = res.body.id;
  coordinator.principalId = pricipalId;
  coordinator.principal = res.body;
});

afterAll(async () => {
  await prisma.$disconnect();
});

describe("-----Coordinator Test------", () => {
  test("create a new coordinator", async () => {
    const res = await request(app)
      .post("/coordinator/create")
      .send(coordinator);
    expect(res.status).toBe(201);
    console.log("res.body", res.body);
    console.log(res.body.id);
    coordinatorId = res.body.id;
  });

  test("get coordinator by id", async () => {
    const res = await request(app)
      .get(`/coordinator/getById/${coordinatorId}`)
      .expect(200);
    console.log("res.body", res.body);
  });

  test("update coordinator", async () => {
    const res = await request(app)
      .put("/coordinator/update/" + coordinatorId)
      .send({ ...coordinator, name: "Jane Doe Updated" })
      .expect(200);
    console.log("res.body", res.body);
    expect(res.body.name).toBe("Jane Doe Updated");
  });

  test("delete coordinator", async () => {
    const res = await request(app)
      .delete("/coordinator/delete" + coordinatorId)
      .expect(200);
    console.log("res.body", res.body);
  });
});
