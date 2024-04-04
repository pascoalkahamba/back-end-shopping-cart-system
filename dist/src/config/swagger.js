"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerDocs = void 0;
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_json_1 = __importDefault(require("../swagger.json"));
function swaggerDocs(app, port) {
    app.use("/docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_json_1.default));
    app.get("/docs.json", (req, res) => {
        res.setHeader("Content-Type", "application/json");
        res.send(swagger_json_1.default);
    });
    console.log(`Docs available at http://localhost:${port}/docs`);
}
exports.swaggerDocs = swaggerDocs;
