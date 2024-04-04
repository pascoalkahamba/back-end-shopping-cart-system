"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthError = void 0;
const baseError_1 = require("./baseError");
class AuthError {
    static noTokenProvided() {
        return new baseError_1.BaseError("Token não informado", 401);
    }
    static invalidToken() {
        return new baseError_1.BaseError("Token invalido", 401);
    }
}
exports.AuthError = AuthError;
