import { BaseError } from "./baseError";

export class AuthError {
  static noTokenProvided() {
    return new BaseError("Token não informado", 401);
  }

  static invalidToken() {
    return new BaseError("Token invalido", 401);
  }
}
