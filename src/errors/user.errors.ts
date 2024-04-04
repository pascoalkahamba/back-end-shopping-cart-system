import { BaseError } from "./baseError";

export class UserErrors {
  static invalidName() {
    return new BaseError("Nome invalido", 401);
  }

  static invalidEmail() {
    return new BaseError("Email invalido", 401);
  }
  static tooShortPassword() {
    return new BaseError("Senha deve ter mais de 6 caracteres", 401);
  }
  static userEmailExists() {
    return new BaseError("Já existe um usuário com este email", 401);
  }
  static userNotFound() {
    return new BaseError("Usuário não encontrado", 401);
  }
  static userOrPasswordWrong() {
    return new BaseError("Email ou senha incorretos", 401);
  }
}
