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
exports.ProductValidator = void 0;
const product_errors_1 = require("../errors/product.errors");
const prisma_service_1 = require("../services/prisma.service");
class ProductValidator {
    validate(product, id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!product.name && !id)
                throw product_errors_1.ProductErrors.invalidName();
            if (product.name) {
                const productExists = yield prisma_service_1.prismaService.prisma.product.findFirst({
                    where: { name: product.name },
                });
                if (id && (productExists === null || productExists === void 0 ? void 0 : productExists.id) === id) {
                    return;
                }
                if (productExists)
                    throw product_errors_1.ProductErrors.productExists();
            }
        });
    }
}
exports.ProductValidator = ProductValidator;
