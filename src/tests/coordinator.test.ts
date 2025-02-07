import initApp from "../../app";
import request from "supertest";
import { PrismaClient } from "@prisma/client";
import { Express } from "express";
import { PrincipalType } from "../schemas/principalSchemas";
const prisma = new PrismaClient();
let app: Express;
let pricipalId: number | undefined;
let coordinatorId: number | undefined;
let p: PrincipalType | null;
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

    coordinatorId = res.body.id;
  });

  test("create 2nd coordinator", async () => {
    const res = await request(app).post("/coordinator/create").send({
      name: "Jenny",
      email: "jenny@gmail.com",
      phone: "1234567890",
      principalId: pricipalId,
      department: "Math",
    });
    expect(res.status).toBe(201);
    expect(res.body.name).toBe("Jenny");
    p = await prisma.principal.findUnique({
      where: { id: pricipalId },
      include: {
        coordinators: true,
      },
    });
    console.log("p", p);
  });

  test("principal number of coordinators", async () => {
    expect(p?.coordinators.length).toBe(2);
  });

  test("getting principal coordinators", async () => {
    const res = await request(app).get(`/principal/get/${pricipalId}`);
    expect(res.status).toBe(200);
    console.log("res.body", res.body);
  });

  test("get coordinator by id", async () => {
    const res = await request(app).get(`/coordinator/getById/${coordinatorId}`);
    expect(res.status).toBe(200);
  });

  test("update coordinator", async () => {
    const res = await request(app)
      .put("/coordinator/update/" + coordinatorId)
      .send({ ...coordinator, name: "Jane Doe Updated" })
      .expect(200);
    expect(res.body.name).toBe("Jane Doe Updated");
    console.log("coordinatorId", coordinatorId);
  });

  test("get all coordinators", async () => {
    const res = await request(app).get("/coordinator/getAll");
    expect(res.status).toBe(200);
  });

  test("delete coordinator", async () => {
    console.log("coordinatorId", coordinatorId);
    const res = await request(app).delete(
      `/coordinator/delete/${coordinatorId}`
    );
    console.log("p after delete", p);
    expect(res.status).toBe(200);
    console.log("res.body", res.body);
  });

  test("principal number of coordinators after deletion", async () => {
    p = await prisma.principal.findUnique({
      where: { id: pricipalId },
      include: {
        coordinators: true,
      },
    });
    expect(p?.coordinators.length).toBe(1);
  });

  test("get coordinator by id after deletion", async () => {
    const res = await request(app).get(`/coordinator/getById/${coordinatorId}`);
    expect(res.status).toBe(404);
    expect(res.body.message).toBe("Coordinator not found");
  });
});
