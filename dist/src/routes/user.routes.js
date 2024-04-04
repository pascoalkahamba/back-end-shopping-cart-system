"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const userRouter = express_1.default.Router();
exports.userRouter = userRouter;
const userController = new userController_1.UserController();
userRouter.post("/", userController.add);
userRouter.post("/login", userController.login);
userRouter.delete("/:id", auth_middleware_1.authMiddleware, userController.remove);
