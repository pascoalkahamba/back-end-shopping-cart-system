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
exports.ProductController = void 0;
const handleError_1 = require("../errors/handleError");
const product_service_1 = require("../services/product.service");
const product_validator_1 = require("../validators/product.validator");
const product_errors_1 = require("../errors/product.errors");
const productService = new product_service_1.ProductService();
const productValidator = new product_validator_1.ProductValidator();
class ProductController {
    add(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const product = req.body;
                yield productValidator.validate(product);
                let productAdded = yield productService.add(product);
                return res.send(productAdded);
            }
            catch (e) {
                (0, handleError_1.handleError)(e, req, res);
            }
        });
    }
    remove(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                let removed = yield productService.removeById(id);
                if (!removed) {
                    throw product_errors_1.ProductErrors.productNotFound();
                }
                return res.send(removed);
            }
            catch (e) {
                (0, handleError_1.handleError)(e, req, res);
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const productData = req.body;
                yield productValidator.validate(productData, +id);
                console.log("product", productData);
                const updated = yield productService.update(+id, productData);
                return res.send(updated);
            }
            catch (e) {
                (0, handleError_1.handleError)(e, req, res);
            }
        });
    }
    getProductsList(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let productList = yield productService.getProductsList();
                return res.send(productList);
            }
            catch (e) {
                (0, handleError_1.handleError)(e, req, res);
            }
        });
    }
    getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const productId = req.params.id;
                let product = yield productService.getById(+productId);
                res.send(product);
            }
            catch (e) {
                (0, handleError_1.handleError)(e, req, res);
            }
        });
    }
}
exports.ProductController = ProductController;
