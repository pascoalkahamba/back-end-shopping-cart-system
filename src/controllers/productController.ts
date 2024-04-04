import { Request, Response } from "express";
import { handleError } from "../errors/handleError";
import { BaseError } from "../errors/baseError";
import { ProductService } from "../services/product.service";
import { ProductModel } from "../@types";

const productService = new ProductService();

export class ProductController {
  async add(req: Request, res: Response) {
    try {
      const product = req.body as ProductModel;

      // validate before

      let productAdded = productService.add(product);

      res.send(productAdded);
    } catch (e) {
      handleError(e as BaseError, req, res);
    }
  }
  async remove(req: Request, res: Response) {
    try {
      const id = req.params.id as unknown as number;

      let removed = productService.removeById(id);

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
      const productData = req.body as ProductModel;

      // validate before

      const updated = productService.update(+id, productData);

      res.send(updated);
    } catch (e) {
      handleError(e as BaseError, req, res);
    }
  }
  async getProductsList(req: Request, res: Response) {
    try {
      const page = req.params.page;

      let productList = productService.getProductsList(+page);

      res.send(productList);
    } catch (e) {
      handleError(e as BaseError, req, res);
    }
  }
  async getById(req: Request, res: Response) {
    try {
      const productId = req.params.id;

      let product = productService.getById(+productId);

      res.send(product);
    } catch (e) {
      handleError(e as BaseError, req, res);
    }
  }
}
