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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidator = void 0;
const user_errors_1 = require("../errors/user.errors");
const prisma_service_1 = require("../services/prisma.service");
const regepEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
class UserValidator {
    validate(user) {
        return __awaiter(this, void 0, void 0, function* () {
            if (user.name.length === 0)
                throw user_errors_1.UserErrors.invalidName();
            if (!regepEmail.test(user.email))
                throw user_errors_1.UserErrors.invalidEmail();
            if (user.password.length <= 5)
                throw user_errors_1.UserErrors.tooShortPassword();
            const userExists = yield prisma_service_1.prismaService.prisma.user.findFirst({
                where: { email: user.email },
            });
            if (userExists)
                throw user_errors_1.UserErrors.userEmailExists();
        });
    }
}
exports.UserValidator = UserValidator;
