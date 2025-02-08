import initApp from "../../app";
import request from "supertest";
import { PrismaClient } from "@prisma/client";
import { Express } from "express";

const prisma = new PrismaClient();
let app: Express;
let principalId: number | undefined;
let coordinatorId: number | undefined;
let instructorId: number | undefined;

const principal = {
  name: "Principal John",
  email: "john@gmail.com",
  phone: "666666",
};

const coordinator = {
  name: "Coordinator Jane",
  email: "jane@gmail.com",
  phone: "123456",
  department: "Computer Science",
  principalId: principalId,
};

const instructor = {
  name: "Bobby the Instructor",
  email: "bobby@gmail.com",
  phone: "1234567890",
  department: "Computer Science",
  coordinatorId: coordinatorId,
  coordinator: coordinator,
  principalId: principalId,
  principal: principal,
};

beforeAll(async () => {
  // Initialize the application
  app = await initApp();
  // Perform any additional setup if needed
  await prisma.$connect();

  await prisma.instructor.deleteMany();
  await prisma.coordinator.deleteMany();
  await prisma.principal.deleteMany();

  // Create a principal
  const res = await request(app).post("/principal/create").send(principal);
  expect(res.status).toBe(201);
  principalId = res.body.id;
  coordinator.principalId = principalId;
  instructor.principalId = principalId;

  // Create a coordinator
  const res2 = await request(app).post("/coordinator/create").send(coordinator);
  expect(res2.status).toBe(201);
  coordinatorId = res2.body.id;
  instructor.coordinatorId = coordinatorId;
});

afterAll(async () => {
  await prisma.$disconnect();
});

describe("-----Instructor Test------", () => {
  test("create a new instructor", async () => {
    const res = await request(app).post("/instructor/create").send(instructor);
    expect(res.status).toBe(201);
    console.log("res", res.body);
    instructorId = res.body.id;
  });

  test("coordinator number of instructors should be 1", async () => {
    const res = await request(app).get(`/coordinator/getById/${coordinatorId}`);
    expect(res.status).toBe(200);
  });

  test("principal number of instructors should be 1", async () => {
    const res = await request(app).get(`/principal/get/${principalId}`);
    expect(res.status).toBe(200);
  });

  test("create 2nd instructor", async () => {
    const res = await request(app).post("/instructor/create").send({
      name: "Bobby the Instructor 2",
      email: "bobby2@gmail.com",
      phone: "1234567890",
      department: "Computer Science",
      coordinatorId: coordinatorId,
      coordinator: coordinator,
      principalId: principalId,
      principal: principal,
    });
    expect(res.status).toBe(201);
  });

  test("coordinator number of instructors should be 2", async () => {
    const res = await request(app).get(`/coordinator/getById/${coordinatorId}`);
    expect(res.status).toBe(200);
  });

  test("principal number of instructors should be 2", async () => {
    const res = await request(app).get(`/principal/get/${principalId}`);
    expect(res.status).toBe(200);
  });

  test("get all instructors", async () => {
    const res = await request(app).get("/instructor/getAll");
    expect(res.status).toBe(200);
  });

  test("get instructor by id", async () => {
    const res = await request(app).get("/instructor/getById/" + instructorId);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe("Bobby the Instructor");
  });

  test("update instructor", async () => {
    const res = await request(app)
      .put("/instructor/update/" + instructorId)
      .send({
        name: "Bobby the Instructor Updated",
        email: "bobby@gmail.com",
        phone: "1234567890",
        department: "Computer Science",
        coordinatorId: coordinatorId,
        coordinator: coordinator,
        principalId: principalId,
        principal: principal,
      });
    expect(res.status).toBe(200);
    expect(res.body.name).toBe("Bobby the Instructor Updated");
  });
});
