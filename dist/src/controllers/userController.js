"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const user_service_1 = require("../services/user.service");
const handleError_1 = require("../errors/handleError");
const user_validator_1 = require("../validators/user.validator");
const user_errors_1 = require("../errors/user.errors");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userValidator = new user_validator_1.UserValidator();
const userService = new user_service_1.UserService();
class UserController {
    add(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req.body;
                yield userValidator.validate(user);
                const data = yield userService.add(user);
                res.status(201).json(data);
            }
            catch (e) {
                (0, handleError_1.handleError)(e, req, res);
            }
        });
    }
    remove(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const userDeleted = yield userService.remove(Number(id));
                if (!userDeleted)
                    throw user_errors_1.UserErrors.userNotFound();
                res.send(userDeleted);
            }
            catch (e) {
                (0, handleError_1.handleError)(e, req, res);
            }
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            try {
                const user = yield userService.login(email, password);
                if (!user)
                    throw user_errors_1.UserErrors.userOrPasswordWrong();
                const token = jsonwebtoken_1.default.sign({ id: user.id }, process.env.JWT_SECRET_KEY, {
                    expiresIn: "30d",
                });
                res.status(200).json({
                    token,
                    user,
                });
            }
            catch (e) {
                (0, handleError_1.handleError)(e, req, res);
            }
        });
    }
}
exports.UserController = UserController;
