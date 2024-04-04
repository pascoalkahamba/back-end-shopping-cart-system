import { BaseError } from "./baseError";

export class ProductErrors {
  static invalidName() {
    return new BaseError("Nome do produto invalido", 401);
  }
  static productExists() {
    return new BaseError("Já existe um produto com este nome", 401);
  }
  static productNotFound() {
    return new BaseError("Produto não encontrado", 401);
  }
}
