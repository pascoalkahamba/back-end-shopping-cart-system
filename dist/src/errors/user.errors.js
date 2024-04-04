"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserErrors = void 0;
const baseError_1 = require("./baseError");
class UserErrors {
    static invalidName() {
        return new baseError_1.BaseError("Nome invalido", 401);
    }
    static invalidEmail() {
        return new baseError_1.BaseError("Email invalido", 401);
    }
    static tooShortPassword() {
        return new baseError_1.BaseError("Senha deve ter mais de 6 caracteres", 401);
    }
    static userEmailExists() {
        return new baseError_1.BaseError("Já existe um usuário com este email", 401);
    }
    static userNotFound() {
        return new baseError_1.BaseError("Usuário não encontrado", 401);
    }
    static userOrPasswordWrong() {
        return new baseError_1.BaseError("Email ou senha incorretos", 401);
    }
}
exports.UserErrors = UserErrors;
