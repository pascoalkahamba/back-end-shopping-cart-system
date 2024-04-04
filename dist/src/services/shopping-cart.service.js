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
exports.ShoppingCartService = void 0;
const baseError_1 = require("../errors/baseError");
const prisma_service_1 = require("./prisma.service");
const product_errors_1 = require("../errors/product.errors");
class ShoppingCartService {
    pickProductFromTheStock(shoppingCart) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield prisma_service_1.prismaService.prisma.product.findFirst({
                where: { id: shoppingCart.product_id },
            });
            if (!product) {
                throw product_errors_1.ProductErrors.productNotFound();
            }
            const currentStock = product.stock;
            const nextStock = currentStock - shoppingCart.amount;
            if (nextStock < 0) {
                throw new baseError_1.BaseError(`Não há itens suficientes no stock. Encontrado: ${currentStock}`, 401);
            }
            yield prisma_service_1.prismaService.prisma.product.update({
                where: { id: product.id },
                data: {
                    stock: nextStock,
                },
            });
        });
    }
    addProduct(shoppingCart) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.pickProductFromTheStock(shoppingCart);
            let res = yield prisma_service_1.prismaService.prisma.shoppingCart.create({
                data: shoppingCart,
            });
            return res;
        });
    }
    removeProductsFromShoppingCart(shoppingCarts_1) {
        return __awaiter(this, arguments, void 0, function* (shoppingCarts, forceDelete = false) {
            for (let shoppingCart of shoppingCarts) {
                let currentProduct = yield prisma_service_1.prismaService.prisma.product.findFirst({
                    where: { id: shoppingCart.product_id },
                });
                if (!currentProduct) {
                    throw product_errors_1.ProductErrors.productNotFound();
                }
                const nextStock = currentProduct.stock + shoppingCart.amount;
                yield prisma_service_1.prismaService.prisma.product.update({
                    where: { id: shoppingCart.product_id },
                    data: {
                        stock: nextStock,
                    },
                });
                if (forceDelete) {
                    yield prisma_service_1.prismaService.prisma.shoppingCart.delete({
                        where: { id: shoppingCart.id },
                    });
                }
            }
        });
    }
    removeProduct(userId, productId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let shoppingCarts = yield prisma_service_1.prismaService.prisma.shoppingCart.findMany({
                    where: { user_id: userId, product_id: productId },
                });
                yield this.removeProductsFromShoppingCart(shoppingCarts, true);
                return Boolean(shoppingCarts.length);
            }
            catch (e) {
                return false;
            }
        });
    }
    removeAllProducts(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let shoppingCarts = yield prisma_service_1.prismaService.prisma.shoppingCart.findMany({
                    where: { user_id: userId },
                });
                yield this.removeProductsFromShoppingCart(shoppingCarts, true);
                return Boolean(shoppingCarts.length);
            }
            catch (e) {
                return false;
            }
        });
    }
    updateAmount(id, amount) {
        return __awaiter(this, void 0, void 0, function* () {
            let shoppingCart = yield prisma_service_1.prismaService.prisma.shoppingCart.findFirst({
                where: { id },
            });
            if (!shoppingCart) {
                throw product_errors_1.ProductErrors.productNotFound();
            }
            const previousAmount = (shoppingCart === null || shoppingCart === void 0 ? void 0 : shoppingCart.amount) || 0;
            if (amount === 0) {
                yield prisma_service_1.prismaService.prisma.shoppingCart.delete({
                    where: { id },
                });
                return shoppingCart;
            }
            // quero 3 - no carrinho
            // tinha 2 - antes
            if (amount > previousAmount) {
                // reduzir no carrrinho se existe uma quantidade suficiente
                this.pickProductFromTheStock(Object.assign(Object.assign({}, shoppingCart), { amount: amount - previousAmount }));
            }
            // quero 2 - no carrinho
            // tinha 3 - antes
            if (amount < previousAmount) {
                this.removeProductsFromShoppingCart([
                    Object.assign(Object.assign({}, shoppingCart), { 
                        // add 1 no stock
                        amount: previousAmount - amount }),
                ]);
            }
            yield prisma_service_1.prismaService.prisma.shoppingCart.update({
                where: { id: shoppingCart.id },
                data: { amount },
            });
            return shoppingCart;
        });
    }
    getShoppingCartByUser(page, user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            let shoppingCarts = yield prisma_service_1.prismaService.prisma.shoppingCart.findMany({
                where: {
                    user_id,
                },
                select: {
                    id: true,
                    amount: true,
                    createdAt: true,
                    product: {
                        select: {
                            id: true,
                            name: true,
                            price: true,
                        },
                    },
                },
            });
            return shoppingCarts;
        });
    }
    buyProducts(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            let res = yield prisma_service_1.prismaService.prisma.shoppingCart.deleteMany({
                where: {
                    user: {
                        id: userId,
                    },
                },
            });
            return res.count;
        });
    }
}
exports.ShoppingCartService = ShoppingCartService;
