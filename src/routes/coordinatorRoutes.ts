import express from "express";
import coordinatorController from "../controllers/coordinatorController";
const coordinatorRouter = express.Router();

coordinatorRouter.post("/create", coordinatorController.create);
// // coordinatorRouter.update("/update", coordinatorController.update);
// // coordinatorRouter.delete("/delete", coordinatorController.delete);
// // coordinatorRouter.get("/getAll", coordinatorController.getAll);
// // coordinatorRouter.get("/getById", coordinatorController.getById);

export default coordinatorRouter;
