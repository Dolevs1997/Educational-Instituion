import express from "express";
import env from "dotenv";
import { PrismaClient } from "@prisma/client";
import principalRouter from "./src/routes/principalRoutes";
import coordinatorRouter from "./src/routes/coordinatorRoutes";

env.config();

async function initApp() {
  const app = express();
  const prisma = new PrismaClient();
  try {
    await prisma.$connect();
    console.log("Database connected");
  } catch (err) {
    console.log(err);
  }

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use("/principal", principalRouter);
  app.use("/coordinator", coordinatorRouter);

  return app;
}

export default initApp;
