"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserByUserName = exports.getUserById = exports.register = void 0;
const User_1 = __importDefault(require("../../models/User"));
const register = (userInfo) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.create({
            username: userInfo.user_name.toLowerCase(),
            first_name: userInfo.first_name,
            last_name: userInfo.last_name,
            password: userInfo.password,
        });
        if (!user) {
            return;
        }
        return {
            user: user.dataValues
        };
    }
    catch (error) {
        return error;
    }
});
exports.register = register;
const getUserById = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findOne({
            where: {
                id: userId
            }
        });
        if (!user) {
            return;
        }
        return user.dataValues;
    }
    catch (error) {
        console.error(error);
    }
});
exports.getUserById = getUserById;
const getUserByUserName = (username) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("username ,,,, ", username);
        const user = yield User_1.default.findOne({
            where: {
                user_name: username
            },
        });
        if (!user) {
            return;
        }
        return user.dataValues;
    }
    catch (error) {
        console.error(error);
    }
});
exports.getUserByUserName = getUserByUserName;
exports.default = {
    register: exports.register,
    getUserById: exports.getUserById,
    getUserByUserName: exports.getUserByUserName
};
