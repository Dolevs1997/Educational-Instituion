import express from "express";
import coordinatorController from "../controllers/coordinatorController";
const coordinatorRouter = express.Router();

coordinatorRouter.post("/create", coordinatorController.create);
coordinatorRouter.put("/update/:id", coordinatorController.update);
// // coordinatorRouter.delete("/delete", coordinatorController.delete);
// // coordinatorRouter.get("/getAll", coordinatorController.getAll);
coordinatorRouter.get("/getById/:id", coordinatorController.getById);

export default coordinatorRouter;
