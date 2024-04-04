import { ProductModel } from "../@types";
import { prismaService } from "./prisma.service";

export class ProductService {
  static pageMaxItems = 10;
  async add(productData: ProductModel) {
    const product = await prismaService.prisma.product.create({
      data: productData,
    });

    return product;
  }
  async removeById(id: number) {
    try {
      const deleted = await prismaService.prisma.product.delete({
        where: { id },
      });

      return deleted;
    } catch (e) {
      return false;
    }
  }
  async update(id: number, productData: ProductModel) {
    const updated = await prismaService.prisma.product.update({
      where: { id },
      data: productData,
    });

    return updated;
  }
  async getById(id: number) {
    const product = await prismaService.prisma.product.findFirst({
      where: { id },
    });

    return product;
  }
  async getProductsList(page: number) {
    let products = await prismaService.prisma.product.findMany({
      skip: page * ProductService.pageMaxItems,
      take: ProductService.pageMaxItems,
      select: {
        id: true,
        name: true,
        price: true,
        createdAt: true,
        stock: true,
      },
    });

    return products;
  }
}
