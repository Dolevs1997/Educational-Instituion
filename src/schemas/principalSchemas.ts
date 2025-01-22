import zod from "zod";
import { instructorSchema } from "./instructorSchemas";
import { coordinatorZodSchema } from "./coordinatorSchemas";

export const principalZodSchema: zod.ZodSchema = zod.object({
  id: zod.number().optional(),
  name: zod.string(),
  email: zod.string().email(),
  phone: zod.string(),
  coordinators: zod.array(coordinatorZodSchema).optional(),
  instructors: zod.array(instructorSchema).optional(),
  createdAt: zod.date().optional(),
  updatedAt: zod.date().optional(),
});

export type PrincipalType = zod.infer<typeof principalZodSchema>;
export type pricipalCoordinatorsType = PrincipalType["coordinators"];
