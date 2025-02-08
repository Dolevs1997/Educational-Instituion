import express from "express";
import instructorController from "../controllers/instructorController";
const instructorRouter = express.Router();

instructorRouter.post("/create", instructorController.create);
instructorRouter.get("/getAll", instructorController.getAll);
instructorRouter.get("/getById/:id", instructorController.getById);
instructorRouter.put("/update/:id", instructorController.update);
instructorRouter.delete("/delete/:id", instructorController.remove);

export default instructorRouter;
