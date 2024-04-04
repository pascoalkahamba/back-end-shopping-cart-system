import { Request, Response } from "express";
import { UserService } from "../services/user.service";
import { UserModel } from "../@types";
import { handleError } from "../errors/handleError";
import { UserValidator } from "../validators/user.validator";

const userValidator = new UserValidator();
const userService = new UserService();

export class UserController {
  async add(req: Request, res: Response) {
    try {
      const user = req.body as UserModel;

      userValidator.validate(user);

      let data = await userService.add(user);

      res.send(data);
    } catch (e) {
      handleError(e as BaseError, req, res);
    }
  }
  remove(req: Request, res: Response) {}
}
