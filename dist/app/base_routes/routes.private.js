"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const books_1 = __importDefault(require("../api/private/books/routes/books"));
const privateRouter = express_1.default.Router();
privateRouter.use("/books/", books_1.default);
exports.default = privateRouter;
