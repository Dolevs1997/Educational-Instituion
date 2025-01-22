import { Request, Response } from "express";
import { createCoordinator } from "../models/coordinatorModel";
import { updatePrincipal, getPrincipalById } from "../models/principalModel";
import { coordinatorZodSchema } from "../schemas/coordinatorSchemas";
import zod from "zod";

function validateCoordinatorData(data: any) {
  const {
    name,
    email,
    phone,
    principalId,
    principal,
    department,
    createdAt,
    updatedAt,
  } = data;
  if (!name || !email || !phone || !principalId || !principal || !department) {
    throw new Error("Missing required fields");
  }
  try {
    const parsedData = {
      ...data,
      createdAt: data.createdAt ? new Date(data.createdAt) : undefined,
      updatedAt: data.updatedAt ? new Date(data.updatedAt) : undefined,
      principal: {
        ...data.principal,
        createdAt: new Date(data.principal.createdAt),
        updatedAt: new Date(data.principal.updatedAt),
      },
    };
    if (!parsedData.createdAt) delete parsedData.createdAt;
    if (!parsedData.updatedAt) delete parsedData.updatedAt;
    console.log("parsedData", parsedData);
    const coordinator = coordinatorZodSchema.parse(parsedData);
    console.log("coordinator", coordinator);
    return coordinator;
  } catch (error: any) {
    if (error instanceof zod.ZodError) {
      throw new Error(error.errors.map((e) => e.message).join(", "));
    } else {
      throw new Error(error.message);
    }
  }
}

const create = async (req: Request, res: Response): Promise<any> => {
  console.log("req.body", req.body);
  try {
    const c = validateCoordinatorData(req.body);
    const coordinator = await createCoordinator(c);

    res.status(201).send(coordinator);
  } catch (error: any) {
    if (error instanceof zod.ZodError) {
      res.status(400).send(error.errors.map((e) => e.message).join(", "));
    } else {
      res.status(500).send(error.message);
    }
  }
};

export default { create };
