import zod from "zod";
import { instructorZodSchema } from "./instructorSchemas";
export const createStudentZodSchema = zod.object({
  name: zod.string(),
  email: zod.string().email(),
  phone: zod.string(),
  instructors: zod.array(instructorZodSchema),
  createdAt: zod.date(),
  updatedAt: zod.date(),
});
