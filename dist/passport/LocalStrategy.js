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
const passport_1 = __importDefault(require("passport"));
const passport_local_1 = require("passport-local");
const User_1 = __importDefault(require("../services/User/User"));
const Responses_1 = __importDefault(require("../constants/Responses"));
const auth_utils_1 = require("../utils/auth.utils");
const Response_1 = require("../services/Response/Response");
const options = {
    usernameField: "user_name",
    passwordField: "password",
    passReqToCallback: true,
};
// This function contains passport conditions that validates a user
const authenticateUser = (req, user_name, password, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("username ==> ", user_name);
        const user = yield User_1.default.getUserByUserName(user_name);
        console.log("user ==> ", user);
        if (user) {
            console.log("user =====> ", user);
            // Here password is compared and validated
            const passwordsMatch = yield (0, auth_utils_1.comparePassword)(password, user.password);
            if (passwordsMatch) {
                done(null, user);
            }
            else {
                (0, Response_1.serverErrorResponse)(req.res, Responses_1.default.GENERIC_LOGIN_FAILED_ERROR);
            }
        }
        // If no user exist return not found message
        else {
            (0, Response_1.notFoundResponse)(req.res, Responses_1.default.GENERIC_LOGIN_FAILED_ERROR);
        }
    }
    catch (error) {
        console.log("error local strategy...", error);
        (0, Response_1.serverErrorResponse)(req, error);
    }
});
passport_1.default.use("user-local", new passport_local_1.Strategy(options, authenticateUser));
