import zod from "zod";

export const createPrincipalZodSchema = zod.object({
  name: zod.string(),
  email: zod.string().email(),
  phone: zod.string(),
  coordinators: zod.array(zod.number()),
  createdAt: zod.date(),
  updatedAt: zod.date(),
});
