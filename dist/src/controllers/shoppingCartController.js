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
exports.ShoppingCartController = void 0;
const handleError_1 = require("../errors/handleError");
const baseError_1 = require("../errors/baseError");
const shopping_cart_service_1 = require("../services/shopping-cart.service");
const product_service_1 = require("../services/product.service");
const prisma_service_1 = require("../services/prisma.service");
const getTotalFromShoppingCart_1 = require("../utils/getTotalFromShoppingCart");
const shoppingCartService = new shopping_cart_service_1.ShoppingCartService();
const productService = new product_service_1.ProductService();
class ShoppingCartController {
    addProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const shoppingCart = req.body;
                shoppingCart.user_id = req.id;
                // validate before (if amount cannot be zero)
                let exists = yield prisma_service_1.prismaService.prisma.shoppingCart.findFirst({
                    where: {
                        user: {
                            id: shoppingCart.user_id,
                        },
                        product: {
                            id: shoppingCart.product_id,
                        },
                    },
                });
                console.log("exists", exists);
                if (exists) {
                    throw new baseError_1.BaseError("Este produto já foi adicionado ao carrinho", 401);
                }
                let shoppingCartAdded = yield shoppingCartService.addProduct(shoppingCart);
                res.send(shoppingCartAdded);
            }
            catch (e) {
                (0, handleError_1.handleError)(e, req, res);
            }
        });
    }
    removeProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const productId = req.params.productId;
                const userId = req.id;
                let removed = yield shoppingCartService.removeProduct(productId, userId);
                if (!removed) {
                    // throw an error. Shopping Cart does not exist.
                }
                res.send(removed);
            }
            catch (e) {
                (0, handleError_1.handleError)(e, req, res);
            }
        });
    }
    removeAllProducts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.id;
                let removed = yield shoppingCartService.removeAllProducts(userId);
                if (!removed) {
                    // throw an error. Shopping Cart does not exist.
                    throw new baseError_1.BaseError("Houve um erro ao eliminar os produtos", 401);
                }
                res.send(removed);
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
                const shoppingCartData = req.body;
                // validate before updating
                const updated = yield shoppingCartService.updateAmount(+id, shoppingCartData.amount);
                res.send(updated);
            }
            catch (e) {
                (0, handleError_1.handleError)(e, req, res);
            }
        });
    }
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const page = req.params.page;
                const user_id = req.id;
                let shoppingCartList = yield shoppingCartService.getShoppingCartByUser(+page, user_id);
                const user = yield prisma_service_1.prismaService.prisma.user.findFirst({
                    where: { id: user_id },
                    select: {
                        name: true,
                        email: true,
                        id: true,
                    },
                });
                res.send({
                    user,
                    items: shoppingCartList,
                    products: shoppingCartList.length + " produto(s) no carrinho",
                    total: (0, getTotalFromShoppingCart_1.getTotalFromShoppingCart)(shoppingCartList).toLocaleString("pt-BR"),
                });
            }
            catch (e) {
                (0, handleError_1.handleError)(e, req, res);
            }
        });
    }
    buyProductsOnShoppingCart(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const user_id = req.id;
            let amount = yield shoppingCartService.buyProducts(user_id);
            if (amount > 0) {
                return res.send({
                    message: `Você acabou de comprar ${amount} produto(s) a partir do seu carrinho.`,
                });
            }
            return res.send({
                message: "O seu carrinho está vazio ainda.",
            });
        });
    }
}
exports.ShoppingCartController = ShoppingCartController;
