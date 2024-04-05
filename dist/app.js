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
// import "./passport/JwtStrategy"
// import "./passport/LocalStrategy"
require("./utils/auth.utils");
require("./models/Book");
require("./models/User");
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const db_config_1 = __importDefault(require("./config/db.config"));
const auth_utils_1 = require("./utils/auth.utils");
const routes_private_1 = __importDefault(require("./app/base_routes/routes.private"));
const errorHandling_utils_1 = require("./utils/errorHandling.utils");
const body_parser_1 = __importDefault(require("body-parser"));
const passport_1 = __importDefault(require("passport"));
const routes_public_1 = __importDefault(require("./app/base_routes/routes.public"));
dotenv_1.default.config();
var app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)(process.env.COOKIE_SECRET));
app.use(passport_1.default.initialize());
const whitelistedDomains = ['http://localhost:5173'];
const corsOptions = {
    credentials: true,
    origin(requestOrigin, callback) {
        if (!requestOrigin)
            return callback(null, true);
        if (whitelistedDomains.indexOf(requestOrigin) === -1) {
            var msg = `${requestOrigin} does not have access to this server.`;
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
};
//implementing cors
app.use((0, cors_1.default)(corsOptions));
app.use('/private', auth_utils_1.verifyUser, routes_private_1.default);
app.use('/public', routes_public_1.default);
app.use(errorHandling_utils_1.handleErrors);
// error handler
const initDB = () => __awaiter(void 0, void 0, void 0, function* () {
    // Check DB connection
    try {
        yield db_config_1.default.authenticate();
        //Uncomment for resetting the DB in dev environment
        // await sequelize.sync({ force: true });
        console.log("Database connection has been established successfully.");
    }
    catch (error) {
        console.error(`Unable to connect to database: ${error}`);
    }
});
initDB();
exports.default = app;
