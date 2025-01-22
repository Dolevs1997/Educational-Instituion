import * as zod from "zod";
export const instructorSchema = zod.object({
  id: zod.number().optional(),
  name: zod.string(),
  email: zod.string().email(),
  phone: zod.string(),
  department: zod.string().optional(),
  coordinatorId: zod.number().optional(),
  principalId: zod.number().optional(),
  createdAt: zod.date().optional(),
  updatedAt: zod.date().optional(),
});
