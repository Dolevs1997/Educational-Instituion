import zod from "zod";
import { instructorZodSchema } from "./instructorSchemas";
import { principalZodSchema } from "./principalSchemas";
export const coordinatorZodSchema: Zod.ZodSchema = zod.object({
  id: zod.number().optional(),
  name: zod.string(),
  email: zod.string().email(),
  phone: zod.string(),
  principalId: zod.number(),
  principal: zod.lazy(() => principalZodSchema).optional(),
  department: zod.string(),
  instructors: zod.array(zod.lazy(() => instructorZodSchema)).optional(),
  createdAt: zod.coerce.date().optional(),
  updatedAt: zod.coerce.date().optional(),
});

export type CoordinatorType = zod.infer<typeof coordinatorZodSchema>;
