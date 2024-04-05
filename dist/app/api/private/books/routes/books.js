"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const books_1 = __importDefault(require("../controllers/books"));
const complaintRouter = (0, express_1.Router)();
complaintRouter.post("/create", books_1.default.createBook);
complaintRouter.get("/get/all", books_1.default.getAllBooks);
exports.default = complaintRouter;
