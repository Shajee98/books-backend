"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Auth_1 = __importDefault(require("../api/public/user/routes/Auth"));
const publicRouter = express_1.default.Router();
publicRouter.use('/users/', Auth_1.default);
exports.default = publicRouter;
