import express from "express";
import principalController from "../controllers/principalController";
const principalRouter = express.Router();

principalRouter.post("/create", principalController.create);
principalRouter.put("/update/:id", principalController.update);
principalRouter.get("/get/:id", principalController.getById);
principalRouter.get("/getAll", principalController.getAll);
principalRouter.delete("/delete/:id", principalController.remove);

export default principalRouter;
