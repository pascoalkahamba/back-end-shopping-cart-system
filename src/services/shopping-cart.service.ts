import { ShoppingCartModel } from "../@types";
import { prismaService } from "./prisma.service";

export class ShoppingCartService {
  static pageMaxItems = 10;
  async add(shoppingCart: ShoppingCartModel) {
    let res = await prismaService.prisma.shoppingCart.create({
      data: shoppingCart,
    });

    return res;
  }

  async removeProduct(userId: number, productId: number) {
    try {
      let shoppingCart = await prismaService.prisma.shoppingCart.deleteMany({
        where: { user_id: userId, product_id: productId },
      });

      return Boolean(shoppingCart.count);
    } catch (e) {
      return false;
    }
  }
  async removeAllProducts(userId: number) {
    try {
      let shoppingCart = await prismaService.prisma.shoppingCart.deleteMany({
        where: { user_id: userId },
      });

      return Boolean(shoppingCart.count);
    } catch (e) {
      return false;
    }
  }
  async updateAmount(id: number, amount: number) {
    let shoppingCart = await prismaService.prisma.shoppingCart.update({
      where: { id },
      data: { amount },
    });

    return shoppingCart;
  }
  async getShoppingCartByUser(page: number, user_id: number) {
    let shoppingCarts = await prismaService.prisma.shoppingCart.findMany({
      skip: page * ShoppingCartService.pageMaxItems,
      take: ShoppingCartService.pageMaxItems,
      where: {
        user_id,
      },
      select: {
        user: {
          select: {
            name: true,
            email: true,
            id: true,
          },
        },
        product: {
          select: {
            id: true,
            name: true,
            price: true,
            stock: true,
          },
        },
        id: true,
        amount: true,
        createdAt: true,
      },
    });

    return shoppingCarts;
  }
}
