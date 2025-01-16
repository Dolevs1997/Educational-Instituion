import { Request, Response } from "express";
import { createCoordinator } from "../models/coordinatorModel";

const create = async (req: Request, res: Response): Promise<void> => {
  console.log("Creating coordinator");

  try {
    const {
      name,
      email,
      phone,
      principalId,
      instructors,
      createdAt,
      updatedAt,
    } = req.body;
    await createCoordinator(
      name,
      email,
      phone,
      principalId,
      instructors,
      createdAt,
      updatedAt
    );
    res.status(201).send("Coordinator created successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
};

export default { create };
