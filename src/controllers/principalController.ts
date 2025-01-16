import { Request, Response } from "express";
import { createPrincipal } from "../models/principalModel";

const create = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, phone, coordinators, createdAt, updatedAt } = req.body;
    console.log(req.body);
    await createPrincipal(
      name,
      email,
      phone,
      coordinators,
      createdAt,
      updatedAt
    );
    res.status(201).send("Principal created successfully");
  } catch (error: any) {
    res.status(400).send(error.message);
  }
};

export default { create };
