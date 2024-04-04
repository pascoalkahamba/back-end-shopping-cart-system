import { AddUserRespoitory } from "../AddUserRepository";

class AddUserReposity implements AddUserRespoitory {
  async handle(user: {
    id: number;
    name: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
  }) {}
}
