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
const passport_jwt_1 = require("passport-jwt");
const User_1 = __importDefault(require("../services/User/User"));
const cookieExtractor = (req) => {
    let jwt = null;
    if (req && req.signedCookies) {
        jwt = req.signedCookies['token'];
    }
    console.log("jwt =======> ", jwt);
    return jwt;
};
const options = {
    jwtFromRequest: cookieExtractor,
    secretOrKey: 'jdhdhd-kjfjdhrhrerj-uurhr-jjge'
};
// Used by the authenticated requests to deserialize the user i.e., to fetch user details from the JWT.
const deserializeUser = (jwt_payload, done) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("jwt_payload =>" + JSON.stringify(jwt_payload));
    try {
        // if (!(Date.now() >= Number(jwt_payload.exp) * 1000))
        // {
        //   // console.log("exp => ", exp)
        //   return done("token expired", false)
        // }
        let user = yield User_1.default.getUserById(jwt_payload.id);
        if (user) {
            return done(null, user);
        }
        else {
            return done("Unauthorized", false);
        }
    }
    catch (error) {
        done(error, false);
    }
});
passport_1.default.use("jwt", new passport_jwt_1.Strategy(options, deserializeUser));
