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
const User_1 = __importDefault(require("../../../../../services/User/User"));
const Responses_1 = __importDefault(require("../../../../../constants/Responses"));
const Response_1 = require("../../../../../services/Response/Response");
const User_2 = require("../../../../../services/User/User");
const auth_utils_1 = require("../../../../../utils/auth.utils");
// Gets required info from request and calls service to create new user record
const register = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { firstName, lastName, password, user_name } = req.body;
        const createdUser = yield User_1.default.register({
            first_name: firstName,
            last_name: lastName,
            user_name: user_name,
            password: password
        });
        console.log("createdUser ", createdUser);
        if (!createdUser) {
            (0, Response_1.serverErrorResponse)(res, Responses_1.default.USER_REGISTRATION_FAILURE);
        }
        return res.send((0, Response_1.genericResponseByData)(createdUser, {
            success: Responses_1.default.USER_REGISTRATION_SUCCESS,
        }));
    }
    catch (error) {
        next(error);
    }
});
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const user = yield (0, User_2.getUserById)((_a = req.user) === null || _a === void 0 ? void 0 : _a.id);
        // Remove users password from memory
        req.user.password = undefined;
        console.log("req.user after logging in => ", req.user);
        const jwtToken = (0, auth_utils_1.getJwt)({
            id: req.user.id,
            user_name: req.user.user_name,
        });
        if (!user) {
            (0, Response_1.serverErrorResponse)(res, Responses_1.default.USER_NOT_FOUND);
        }
        const responseData = {
            jwtToken: jwtToken,
            user: Object.assign({}, user)
        };
        res.cookie("token", `${jwtToken}`, auth_utils_1.COOKIE_OPTIONS);
        return (0, Response_1.successResponse)(res, responseData);
    }
    catch (error) {
        next(error);
    }
});
exports.default = {
    register,
    login
};
