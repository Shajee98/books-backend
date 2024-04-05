"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
// import { verifyUserOnLogin } from "../../../../../utils/auth.utils"
const Auth_1 = __importDefault(require("../controllers/Auth"));
const userRouter = (0, express_1.Router)();
userRouter.post("/register", Auth_1.default.register);
userRouter.post("/login", 
// () => {console.log("Lets login")},
// verifyUserOnLogin,
Auth_1.default.login);
exports.default = userRouter;
