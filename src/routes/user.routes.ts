import express from "express";
import { UserController } from "../controllers/userController";

const userRouter = express.Router();

const userController = new UserController();

userRouter.post("/", userController.add);
userRouter.delete("/:id", userController.remove);

export { userRouter };
