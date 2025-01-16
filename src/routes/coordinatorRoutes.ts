import express from "express";
import coordinatorController from "../controllers/coordinatorController";
const coordinatorRouter = express.Router();

coordinatorRouter.post("/create", coordinatorController.create);

export default coordinatorRouter;
