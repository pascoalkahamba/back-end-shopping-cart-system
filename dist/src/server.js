"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_routes_1 = require("./routes/user.routes");
const swagger_1 = require("./config/swagger");
const product_routes_1 = require("./routes/product.routes");
const shopping_cart_routes_1 = require("./routes/shopping-cart.routes");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cors_1.default)({
    origin: "*",
}));
const PORT = process.env.PORT || 3000;
app.use("/user", user_routes_1.userRouter);
app.use("/product", product_routes_1.productRouter);
app.use("/shopping-cart", shopping_cart_routes_1.shoppingCartRouter);
app.listen(PORT, () => {
    console.log("Server running!");
    (0, swagger_1.swaggerDocs)(app, PORT);
});
