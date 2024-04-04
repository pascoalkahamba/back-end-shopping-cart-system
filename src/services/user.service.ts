import { UserModel } from "../@types";
import { prismaService } from "./prisma.service";

export class UserService {
  async add(user: UserModel) {
    let data = await prismaService.prisma.user.create({
      data: user,
    });

    return data;
  }

  async remove(id: number) {
    try {
      const userDeleted = await prismaService.prisma.user.delete({
        where: { id },
      });

      return userDeleted;
    } catch (e) {
      return false;
    }
  }
}
