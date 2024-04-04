import { User } from "@prisma/client";
import { DataBaseExtraValues, UserModel } from "../@types";
import { prismaService } from "./prisma.service";

export class UserService {
  async add(user: UserModel) {
    let data = await prismaService.prisma.user.create({
      data: user,
    });

    return data;
  }
}
