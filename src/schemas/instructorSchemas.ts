import * as zod from "zod";
import { principalZodSchema } from "./principalSchemas";
import { coordinatorZodSchema } from "./coordinatorSchemas";

export const instructorZodSchema = zod.object({
  id: zod.number().optional(),
  name: zod.string(),
  email: zod.string().email(),
  phone: zod.string(),
  department: zod.string(),
  coordinatorId: zod.number(),
  coordinator: zod.lazy(() => coordinatorZodSchema),
  principalId: zod.number(),
  principal: zod.lazy(() => principalZodSchema),
  createdAt: zod.coerce.date().optional(),
  updatedAt: zod.coerce.date().optional(),
});
export type InstructorType = zod.infer<typeof instructorZodSchema>;
