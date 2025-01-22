import zod from "zod";
import { instructorSchema } from "./instructorSchemas";
export const createStudentZodSchema = zod.object({
  name: zod.string(),
  email: zod.string().email(),
  phone: zod.string(),
  instructors: zod.array(instructorSchema),
  createdAt: zod.date(),
  updatedAt: zod.date(),
});
