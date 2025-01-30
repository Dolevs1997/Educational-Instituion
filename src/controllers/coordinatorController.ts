import { Request, Response } from "express";
import {
  createCoordinator,
  getCoordinatorById,
  updateCoordinator,
} from "../models/coordinatorModel";
import zod from "zod";
import { coordinatorZodSchema } from "../schemas/coordinatorSchemas";

const create = async (req: Request, res: Response): Promise<any> => {
  try {
    const coordinator = coordinatorZodSchema.parse(req.body);
    const newCoordinator = await createCoordinator(coordinator);

    res.status(201).send(newCoordinator);
  } catch (error: any) {
    console.error("Error in create controller:", error);
    if (error instanceof zod.ZodError) {
      res.status(400).send(error.errors.map((e: any) => e.message).join(", "));
    } else {
      res.status(500).send(error.message);
    }
  }
};

const getById = async (req: Request, res: Response): Promise<any> => {
  try {
    const id = parseInt(req.params.id);
    const coordinator = await getCoordinatorById(id);

    res.status(200).send(coordinator);
  } catch (error: any) {
    res.status(500).send(error);
  }
};

const update = async (req: Request, res: Response): Promise<any> => {
  try {
    const id = parseInt(req.params.id);
    const coordinator = coordinatorZodSchema.parse(req.body);
    const updatedCoordinator = await updateCoordinator(id, coordinator);
    console.log("updatedCoordinator", updatedCoordinator);
    res.status(200).send(updatedCoordinator);
  } catch (error: any) {
    console.error("Error in update controller:", error);
    if (error instanceof zod.ZodError) {
      res.status(400).send(error.errors.map((e: any) => e.message).join(", "));
    } else {
      res.status(500).send(error.message);
    }
  }
};

export default { create, getById, update };
