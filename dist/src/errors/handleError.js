"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleError = void 0;
function handleError(error, req, res) {
    console.log(error);
    return res.status(error.statusCode).send({
        message: error.message,
        statusCode: error.statusCode,
    });
}
exports.handleError = handleError;
