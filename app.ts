import express from "express";
import env from "dotenv";
import { PrismaClient } from "@prisma/client";
env.config();

async function initApp() {
  const app = express();
  const prisma = new PrismaClient();
  prisma.$connect().then(() => {
    console.log("Database connected");
  });
  prisma.$on("beforeExit", () => {
    prisma.$disconnect().then(() => {
      console.log("Database disconnected");
    });
  });
  prisma.$on("error", (e: Error) => {
    console.error(e);
  });
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  return app;
}

export default initApp;
