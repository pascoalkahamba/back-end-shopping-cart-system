import { User } from "@prisma/client";
import { AddUserRespoitory } from "../../repositories/AddUserRepository";
import { ValueToOmit } from "../../@types";

class AddUserService {
  constructor(private addUserRepository: AddUserRespoitory) {}
  async handle(user: Omit<User, ValueToOmit>) {
    this.addUserRepository.handle(user);
  }
}
