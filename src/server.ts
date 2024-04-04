import express from "express";
import swaggerUI from "swagger-ui-express";
import swaggerDocs from "./swagger.json";
import { userRouter } from "./routes/user.routes";
import { handleError } from "./errors/handleError";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));

app.use("/user", userRouter);

app.listen(3000, () => {
  console.log("Server running!");
});
