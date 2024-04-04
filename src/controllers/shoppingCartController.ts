import { Request, Response } from "express";
import { handleError } from "../errors/handleError";
import { BaseError } from "../errors/baseError";
import { ShoppingCartService } from "../services/shopping-cart.service";
import { ShoppingCartModel, UserModel } from "../@types";

const shoppingCartService = new ShoppingCartService();

export class ShoppingCartController {
  async add(req: Request, res: Response) {
    try {
      const shoppingCart = req.body as ShoppingCartModel;

      // validate before

      let shoppingCartAdded = await shoppingCartService.add(shoppingCart);

      res.send(shoppingCartAdded);
    } catch (e) {
      handleError(e as BaseError, req, res);
    }
  }
  async removeProduct(req: Request, res: Response) {
    try {
      const productId = req.params.productId as unknown as number;
      const userId = req.id;

      let removed = await shoppingCartService.removeProduct(productId, userId);

      if (!removed) {
        // throw an error. Shopping Cart does not exist.
      }

      res.send(removed);
    } catch (e) {
      handleError(e as BaseError, req, res);
    }
  }
  async removeAllProducts(req: Request, res: Response) {
    try {
      const userId = req.id;

      let removed = await shoppingCartService.removeAllProducts(userId);

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
      const shoppingCartData = req.body as Pick<ShoppingCartModel, "amount">;

      // validate before

      const updated = await shoppingCartService.updateAmount(
        +id,
        shoppingCartData.amount
      );

      res.send(updated);
    } catch (e) {
      handleError(e as BaseError, req, res);
    }
  }
  async getAll(req: Request, res: Response) {
    try {
      const page = req.params.page;
      const user_id = req.id;

      let shoppingCartList = await shoppingCartService.getShoppingCartByUser(
        +page,
        user_id
      );

      res.send(shoppingCartList);
    } catch (e) {
      handleError(e as BaseError, req, res);
    }
  }
}
