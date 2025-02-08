import { Request, Response } from "express";
import {
  createInstructor,
  getAllInstructors,
  getInstructorById,
  updateInstructor,
  deleteInstructor,
} from "../models/instructorModel";
import zod from "zod";
import { instructorZodSchema } from "../schemas/instructorSchemas";

const create = async (req: Request, res: Response): Promise<any> => {
  try {
    const instructor = instructorZodSchema.parse(req.body);
    const newInstructor = await createInstructor(instructor);

    res.status(201).send(newInstructor);
  } catch (error: any) {
    console.error("Error in create controller:", error);
    if (error instanceof zod.ZodError) {
      res.status(400).send(error.errors.map((e: any) => e.message).join(", "));
    } else {
      res.status(500).send(error.message);
    }
  }
};

const getAll = async (req: Request, res: Response): Promise<any> => {
  try {
    const instructors = await getAllInstructors();
    res.status(200).send(instructors);
  } catch (error: any) {
    console.error("Error in getAll controller:", error);
    res.status(500).send(error.message);
  }
};

const getById = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params;
    const instructor = await getInstructorById(parseInt(id));
    res.status(200).send(instructor);
  } catch (error: any) {
    console.error("Error in getById controller:", error);
    res.status(500).send(error.message);
  }
};

const update = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params;
    const instructor = instructorZodSchema.parse(req.body);
    const updatedInstructor = await updateInstructor(parseInt(id), instructor);
    res.status(200).send(updatedInstructor);
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
  try {
    const { id } = req.params;
    await deleteInstructor(parseInt(id));
    res.status(200).send();
  } catch (error: any) {
    console.error("Error in delete controller:", error);
    res.status(500).send(error.message);
  }
};

export default { create, getAll, getById, update, remove };
