import { Request, Response } from "express";
import { handleError } from "../errors/handleError";
import { BaseError } from "../errors/baseError";
import { ShoppingCartService } from "../services/shopping-cart.service";
import { ShoppingCartModel } from "../@types";

const shoppingCartService = new ShoppingCartService();

export class ShoppingCartController {
  async add(req: Request, res: Response) {
    try {
      const shoppingCart = req.body as ShoppingCartModel;

      // validate before

      let shoppingCartAdded = shoppingCartService.add(shoppingCart);

      res.send(shoppingCartAdded);
    } catch (e) {
      handleError(e as BaseError, req, res);
    }
  }
  async remove(req: Request, res: Response) {
    try {
      const id = req.params.id as unknown as number;

      let removed = shoppingCartService.removeById(id);

      if (!removed) {
        // throw an error. Shopping Cart does not exist.
      }

      res.send(removed);
    } catch (e) {
      handleError(e as BaseError, req, res);
    }
  }
  async update(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const shoppingCartData = req.body as ShoppingCartModel;

      // validate before

      const updated = shoppingCartService.update(+id, shoppingCartData);

      res.send(updated);
    } catch (e) {
      handleError(e as BaseError, req, res);
    }
  }
  async getAll(req: Request, res: Response) {
    try {
      const page = req.params.page;
      const user_id = req.id;

      let shoppingCartList = shoppingCartService.getShoppingCartsByUser(
        +page,
        user_id
      );

      res.send(shoppingCartList);
    } catch (e) {
      handleError(e as BaseError, req, res);
    }
  }
  async getById(req: Request, res: Response) {
    try {
      const shoppingCartId = req.params.id;

      let shoppingCart = shoppingCartService.getById(+shoppingCartId);

      res.send(shoppingCart);
    } catch (e) {
      handleError(e as BaseError, req, res);
    }
  }
}
