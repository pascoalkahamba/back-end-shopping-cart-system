class UserErrors {
  static invalidName() {
    return new BaseError("Nome invalido", 401);
  }
}
