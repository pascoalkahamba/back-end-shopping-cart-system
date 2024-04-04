import express from "express";
import { ShoppingCartController } from "../controllers/shoppingCartController";

const shoppingCartRouter = express.Router();

const shoppingCartController = new ShoppingCartController();

shoppingCartRouter.post("/", shoppingCartController.add);
shoppingCartRouter.get("/", shoppingCartController.getAll);
shoppingCartRouter.get("/:id", shoppingCartController.getById);
shoppingCartRouter.delete("/:id", shoppingCartController.remove);
shoppingCartRouter.put("/:id", shoppingCartController.update);

export { shoppingCartRouter };
