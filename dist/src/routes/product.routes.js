"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRouter = void 0;
const express_1 = __importDefault(require("express"));
const productController_1 = require("../controllers/productController");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const productRouter = express_1.default.Router();
exports.productRouter = productRouter;
const productController = new productController_1.ProductController();
productRouter.use(auth_middleware_1.authMiddleware);
productRouter.post("/", productController.add);
productRouter.get("/list", productController.getProductsList);
productRouter.get("/:id", productController.getById);
productRouter.delete("/:id", productController.remove);
productRouter.put("/:id", productController.update);
