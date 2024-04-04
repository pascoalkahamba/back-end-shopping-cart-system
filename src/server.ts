import express from "express";
import swaggerUI from "swagger-ui-express";
import swaggerDocs from "./swagger.json";
import { userRouter } from "./routes/user.routes";
 import { productRouter } from "./routes/product.routes";
import { shoppingCartRouter } from "./routes/shopping-cart.routes";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));

app.use("/user", userRouter);
app.use("/product", productRouter);
app.use("/shopping-cart", shoppingCartRouter);

app.listen(3000, () => {
  console.log("Server running!");
});
