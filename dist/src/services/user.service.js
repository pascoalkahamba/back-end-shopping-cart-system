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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const prisma_service_1 = require("./prisma.service");
const bcrypt_1 = __importDefault(require("bcrypt"));
class UserService {
    add(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const hashPassword = yield bcrypt_1.default.hash(user.password, 10);
            let data = yield prisma_service_1.prismaService.prisma.user.create({
                data: {
                    email: user.email,
                    name: user.name,
                    password: hashPassword,
                },
                select: {
                    id: true,
                    email: true,
                    name: true,
                    password: false,
                },
            });
            return data;
        });
    }
    login(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const userExists = yield prisma_service_1.prismaService.prisma.user.findFirst({
                where: { email },
            });
            if (!userExists) {
                return;
            }
            const isvalid = yield bcrypt_1.default.compare(password, userExists.password);
            if (isvalid) {
                const { password } = userExists, newUser = __rest(userExists, ["password"]);
                return newUser;
            }
        });
    }
    remove(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userDeleted = yield prisma_service_1.prismaService.prisma.user.delete({
                    where: { id },
                });
                return userDeleted;
            }
            catch (e) {
                return false;
            }
        });
    }
}
exports.UserService = UserService;
