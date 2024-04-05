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
exports.verifyUser = exports.comparePassword = exports.COOKIE_OPTIONS = exports.getJwt = void 0;
const passport_1 = __importDefault(require("passport"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const Response_1 = require("../services/Response/Response");
// export const verifyUserOnLogin = passport.authenticate("user-local", {
//   session: false
// })
const getJwt = (user) => {
    return jsonwebtoken_1.default.sign(user, process.env.JWT_SECRET, {
        expiresIn: process.env.SESSION_EXPIRY
    });
};
exports.getJwt = getJwt;
exports.COOKIE_OPTIONS = {
    httpOnly: true,
    secure: false,
    signed: true,
    maxAge: eval(process.env.COOKIE_EXPIRY),
    sameSite: "lax"
};
const comparePassword = (password, passwordToCompareWith) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield bcryptjs_1.default.compare(password, passwordToCompareWith);
    }
    catch (error) {
        console.error(error);
    }
});
exports.comparePassword = comparePassword;
const verifyUser = (req, res, next) => {
    passport_1.default.authenticate("jwt", {
        session: false
    }, (err, user, info) => {
        if (err) {
            // if (err == "token expired")
            // {
            //   res.redirect('/login')
            // }
            console.log("Hiiiiiiii");
            (0, Response_1.unauthorizedResponse)(res, err);
            return;
        }
        else if (!user) {
            console.log("Hellloooooooo");
            return (0, Response_1.unauthorizedResponse)(res, info.message);
        }
        else {
            req.user = user;
            console.log("User found!");
            console.log("req.user => " + JSON.stringify(req.user));
            next();
            return;
        }
    })(req, res, next);
};
exports.verifyUser = verifyUser;
