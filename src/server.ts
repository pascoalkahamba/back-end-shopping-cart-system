import express from "express";
import swaggerUI from "swagger-ui-express";
import swaggerDocs from "./swagger.json";

const app = express();
app.use(express.json());
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));

app.listen(3000, () => {
  console.log("Server running!");
});
