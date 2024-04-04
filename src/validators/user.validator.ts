import { UserModel } from "../@types";

export class UserValidator {
  validate(user: UserModel) {
    if (user.name.length === 0) throw UserErrors.invalidName();
    if (user.email.length === 0) throw new Error("Voce deve informar o email");
    if (!user.email.includes("@")) throw new Error("email invalido");
    if (user.password.length <= 5)
      throw new Error("A senha deve ter mais de 6 caracteres");
  }
}
