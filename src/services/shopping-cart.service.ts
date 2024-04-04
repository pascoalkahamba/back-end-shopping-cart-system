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
  async removeById(id: number) {
    try {
      let res = await prismaService.prisma.shoppingCart.delete({
        where: { id },
      });

      return res;
    } catch (e) {
      return false;
    }
  }
  async update(id: number, shoppingCartData: ShoppingCartModel) {
    let shoppingCart = await prismaService.prisma.shoppingCart.update({
      where: { id },
      data: shoppingCartData,
    });

    return shoppingCart;
  }
  async getById(id: number) {
    let shoppingCart = await prismaService.prisma.shoppingCart.findFirst({
      where: { id },
    });

    return shoppingCart;
  }
  async getShoppingCartsByUser(page: number, user_id: number) {
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
