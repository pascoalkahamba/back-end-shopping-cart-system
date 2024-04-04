"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.shoppingCartRouter = void 0;
const express_1 = __importDefault(require("express"));
const shoppingCartController_1 = require("../controllers/shoppingCartController");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const shoppingCartRouter = express_1.default.Router();
exports.shoppingCartRouter = shoppingCartRouter;
const shoppingCartController = new shoppingCartController_1.ShoppingCartController();
shoppingCartRouter.use(auth_middleware_1.authMiddleware);
shoppingCartRouter.get("/", shoppingCartController.getAll);
shoppingCartRouter.post("/", shoppingCartController.addProduct);
shoppingCartRouter.delete("/", shoppingCartController.removeAllProducts);
shoppingCartRouter.put("/:id", shoppingCartController.update);
shoppingCartRouter.delete("/:productId", shoppingCartController.removeProduct);
shoppingCartRouter.post("/buy", shoppingCartController.buyProductsOnShoppingCart);
