import { Request, Response } from "express";
import {
  createPrincipal,
  updatePrincipal,
  getPrincipalById,
  getAllPrincipals,
  removePrincipal,
} from "../models/principalModel";
import { principalZodSchema } from "../schemas/principalSchemas";
import zod from "zod";

function validatePrincipalData(data: any) {
  const { name, email, phone } = data;
  if (!name || !email || !phone) {
    throw new Error("Missing required fields");
  }
  try {
    const principal = principalZodSchema.parse(data);
    return principal;
  } catch (error: any) {
    if (error instanceof zod.ZodError) {
      throw new Error(error.message);
    } else {
      throw new Error(error.message);
    }
  }
}

const create = async (req: Request, res: Response): Promise<void> => {
  try {
    const p = validatePrincipalData(req.body);
    const principal = await createPrincipal(p);
    res.status(201).send(principal);
  } catch (error: any) {
    if (error instanceof zod.ZodError) {
      res.status(400).send(error.message);
    } else {
      res.status(500).send(error.message);
    }
  }
};

const update = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const p = validatePrincipalData(req.body);
    const principal = await updatePrincipal(parseInt(id), p);
    res.status(200).send(principal);
  } catch (error: any) {
    res.status(400).send(error.message);
  }
};

const getById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const principal = await getPrincipalById(id);
    res.status(200).send(principal);
  } catch (error: any) {
    res.status(400).send(error.message);
  }
};

const getAll = async (req: Request, res: Response): Promise<void> => {
  try {
    const principals = await getAllPrincipals();
    res.status(200).send(principals);
  } catch (error: any) {
    res.status(400).send(error.message);
  }
};

const remove = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    await removePrincipal(id);
    res.status(200).send("Principal deleted successfully");
  } catch (error: any) {
    res.status(400).send(error.message);
  }
};

export default { create, update, getById, getAll, remove };
