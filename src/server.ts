import express from "express";
import swaggerUI from "swagger-ui-express";
import { userRouter } from "./routes/user.routes";
import { handleError } from "./errors/handleError";
import { swaggerDocs } from "./config/swagger";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const PORT = 3000;

app.use("/user", userRouter);

app.listen(PORT, () => {
  console.log("Server running!");

  swaggerDocs(app, PORT);
});
