import zod from "zod";
import { instructorZodSchema } from "./instructorSchemas";
import { coordinatorZodSchema } from "./coordinatorSchemas";

export const principalZodSchema: zod.ZodSchema = zod.object({
  id: zod.number().optional(),
  name: zod.string(),
  email: zod.string().email(),
  phone: zod.string(),
  coordinators: zod.array(zod.lazy(() => coordinatorZodSchema)).optional(),
  instructors: zod.array(zod.lazy(() => instructorZodSchema)).optional(),
  createdAt: zod.coerce.date().optional(),
  updatedAt: zod.coerce.date().optional(),
});

export type PrincipalType = zod.infer<typeof principalZodSchema>;
