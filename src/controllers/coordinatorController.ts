import { Request, Response } from "express";
import {
  createCoordinator,
  getCoordinatorById,
  updateCoordinator,
  deleteCoordinator,
  getAllCoordinators,
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
  const id = parseInt(req.params.id);
  const coordinator = await getCoordinatorById(id);

  if (!coordinator) {
    res.status(404).send({ message: "Coordinator not found" });
  } else res.status(200).send(coordinator);
};

const update = async (req: Request, res: Response): Promise<any> => {
  try {
    const id = parseInt(req.params.id);
    const coordinator = coordinatorZodSchema.parse(req.body);
    const updatedCoordinator = await updateCoordinator(id, coordinator);
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

const remove = async (req: Request, res: Response): Promise<any> => {
  console.log("req.params", req.params);
  console.log("remove controller");
  try {
    const id = parseInt(req.params.id);
    await deleteCoordinator(id);
    res.status(200).send({ message: "Coordinator deleted successfully" });
  } catch (error: any) {
    res.status(500).send(error);
  }
};

const getAll = async (req: Request, res: Response): Promise<any> => {
  try {
    const coordinators = await getAllCoordinators();
    res.status(200).send(coordinators);
  } catch (error: any) {
    res
      .status(500)
      .send({ message: "Error in getting all coordinators", error });
  }
};

export default { create, getById, update, remove, getAll };
