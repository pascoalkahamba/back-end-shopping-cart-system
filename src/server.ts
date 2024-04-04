import express from "express";
import { userRouter } from "./routes/user.routes";
import { swaggerDocs } from "./config/swagger";
import { productRouter } from "./routes/product.routes";
import { shoppingCartRouter } from "./routes/shopping-cart.routes";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const PORT = 3000;

app.use("/user", userRouter);
app.use("/product", productRouter);
app.use("/shopping-cart", shoppingCartRouter);

app.listen(PORT, () => {
  console.log("Server running!");

  swaggerDocs(app, PORT);
});
