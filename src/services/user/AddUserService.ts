import { User } from "@prisma/client";
import { AddUserRespoitory } from "../../repositories/AddUserRepository";
import { DataBaseExtraValues } from "../../@types";

class AddUserService {
  constructor(private addUserRepository: AddUserRespoitory) {}
  async handle(user: Omit<User, DataBaseExtraValues>) {
    this.addUserRepository.handle(user);
  }
}
