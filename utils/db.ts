import { z } from "zod";
import {
  coordinatorZodSchema,
  CoordinatorType,
} from "../src/schemas/coordinatorSchemas";

export function validateCoordinatorData(data: CoordinatorType) {
  console.log("data in coordinator", data);
}
