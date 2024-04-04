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
exports.ProductService = void 0;
const prisma_service_1 = require("./prisma.service");
const DEFAULT_SELECT = {
    id: true,
    name: true,
    price: true,
    stock: true,
    createdAt: true,
};
class ProductService {
    add(productData) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield prisma_service_1.prismaService.prisma.product.create({
                data: productData,
                select: DEFAULT_SELECT,
            });
            return product;
        });
    }
    removeById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deleted = yield prisma_service_1.prismaService.prisma.product.delete({
                    where: { id },
                    select: DEFAULT_SELECT,
                });
                return deleted;
            }
            catch (e) {
                return false;
            }
        });
    }
    update(id, productData) {
        return __awaiter(this, void 0, void 0, function* () {
            const updated = yield prisma_service_1.prismaService.prisma.product.update({
                where: { id },
                data: productData,
                select: DEFAULT_SELECT,
            });
            console.log(updated);
            return updated;
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield prisma_service_1.prismaService.prisma.product.findFirst({
                where: { id },
                select: DEFAULT_SELECT,
            });
            return product;
        });
    }
    getProductsList() {
        return __awaiter(this, void 0, void 0, function* () {
            let products = yield prisma_service_1.prismaService.prisma.product.findMany({
                //   skip: page * ProductService.pageMaxItems,
                //   take: ProductService.pageMaxItems,
                select: DEFAULT_SELECT,
            });
            return products;
        });
    }
}
exports.ProductService = ProductService;
ProductService.pageMaxItems = 10;
