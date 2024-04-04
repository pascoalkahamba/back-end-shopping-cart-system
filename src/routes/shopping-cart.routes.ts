import express from "express";
import { ShoppingCartController } from "../controllers/shoppingCartController";

const shoppingCartRouter = express.Router();

const shoppingCartController = new ShoppingCartController();

shoppingCartRouter.get("/", shoppingCartController.getAll);
shoppingCartRouter.post("/", shoppingCartController.add);
shoppingCartRouter.delete("/", shoppingCartController.removeAllProducts);
shoppingCartRouter.delete("/:productId", shoppingCartController.removeProduct);
shoppingCartRouter.put("/:id", shoppingCartController.update);

export { shoppingCartRouter };
