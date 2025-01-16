import express from "express";
import principalController from "../controllers/principalController";
const principalRouter = express.Router();

principalRouter.post("/create", principalController.create);

export default principalRouter;
