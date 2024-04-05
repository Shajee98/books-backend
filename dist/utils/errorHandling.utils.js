"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleErrors = void 0;
const Response_1 = require("../services/Response/Response");
const handleErrors = (err, req, res, next) => {
    var _a, _b;
    console.error("Globally handled error ->", { err });
    if ((_a = err === null || err === void 0 ? void 0 : err.name) === null || _a === void 0 ? void 0 : _a.includes("Sequelize")) {
        const errors = (err === null || err === void 0 ? void 0 : err.errors) || [];
        const firstError = errors[0] || {};
        const message = (firstError === null || firstError === void 0 ? void 0 : firstError.message) || ((_b = err === null || err === void 0 ? void 0 : err.original) === null || _b === void 0 ? void 0 : _b.message) || err.message;
        (0, Response_1.serverErrorResponse)(res, message);
        return null;
    }
    console.log({ errMsg: err.message });
    (0, Response_1.serverErrorResponse)(res, err.message);
    return;
};
exports.handleErrors = handleErrors;
exports.default = exports.handleErrors;
