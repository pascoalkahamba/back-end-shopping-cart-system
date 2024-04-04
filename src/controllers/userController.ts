import { Request, Response } from "express";
import { UserService } from "../services/user.service";
import { UserModel } from "../@types";
import { handleError } from "../errors/handleError";
import { UserValidator } from "../validators/user.validator";
import { BaseError } from "../errors/baseError";
import { UserErrors } from "../errors/user.errors";

const userValidator = new UserValidator();
const userService = new UserService();

export class UserController {
  async add(req: Request, res: Response) {
    try {
      const user = req.body as UserModel;

      await userValidator.validate(user);

      let data = await userService.add(user);

      res.send(data);
    } catch (e) {
      handleError(e as BaseError, req, res);
    }
  }
  async remove(req: Request, res: Response) {
    try {
      const { id } = req.params as { id: string };

      const userDeleted = await userService.remove(Number(id));
      if (!userDeleted) throw UserErrors.userNotFound();
      res.send(userDeleted);
    } catch (e) {
      handleError(e as BaseError, req, res);
    }
  }
}
