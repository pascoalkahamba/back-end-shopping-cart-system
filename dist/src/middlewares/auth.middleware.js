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
exports.authMiddleware = void 0;
const handleError_1 = require("../errors/handleError");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_errors_1 = require("../errors/auth.errors");
function authMiddleware(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const authorization = req.headers.authorization;
        if (!authorization) {
            (0, handleError_1.handleError)(auth_errors_1.AuthError.noTokenProvided(), req, res);
            return;
        }
        const [type, token] = authorization.split(" ");
        if (type !== "Bearer") {
            (0, handleError_1.handleError)(auth_errors_1.AuthError.invalidToken(), req, res);
            return;
        }
        const { id } = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET_KEY);
        req.id = id;
        next();
    });
}
exports.authMiddleware = authMiddleware;
