"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductErrors = void 0;
const baseError_1 = require("./baseError");
class ProductErrors {
    static invalidName() {
        return new baseError_1.BaseError("Nome do produto invalido", 401);
    }
    static productExists() {
        return new baseError_1.BaseError("Já existe um produto com este nome", 401);
    }
    static productNotFound() {
        return new baseError_1.BaseError("Produto não encontrado", 401);
    }
}
exports.ProductErrors = ProductErrors;
