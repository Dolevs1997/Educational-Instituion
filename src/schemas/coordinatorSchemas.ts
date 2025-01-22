import zod from "zod";
import { instructorSchema } from "./instructorSchemas";
import { principalZodSchema } from "./principalSchemas";
export const coordinatorZodSchema: Zod.ZodSchema = zod.object({
  name: zod.string(),
  email: zod.string().email(),
  phone: zod.string(),
  principalId: zod.number(),
  principal: principalZodSchema,
  department: zod.string(),
  instructors: zod.array(instructorSchema).optional(),
  createdAt: zod.date().optional(),
  updatedAt: zod.date().optional(),
});

export type CoordinatorType = zod.infer<typeof coordinatorZodSchema>;
