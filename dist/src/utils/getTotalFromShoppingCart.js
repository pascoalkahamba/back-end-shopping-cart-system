"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTotalFromShoppingCart = void 0;
function getTotalFromShoppingCart(data) {
    return data.reduce((prev, curr) => {
        return curr.amount * Number(curr.product.price) + prev;
    }, 0);
}
exports.getTotalFromShoppingCart = getTotalFromShoppingCart;
