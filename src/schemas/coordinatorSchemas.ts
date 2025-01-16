import zod from "zod";

const createCoordinatorSchema = zod.object({
  name: zod.string(),
  email: zod.string().email(),
  phone: zod.string(),
  principalId: zod.number(),
  instructors: zod.array(zod.number()),
  createdAt: zod.date(),
  updatedAt: zod.date(),
});

export { createCoordinatorSchema };
