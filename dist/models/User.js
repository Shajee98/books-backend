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
const sequelize_1 = require("sequelize");
const db_config_1 = __importDefault(require("../config/db.config"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
// Generate and save password hash
const hashPassword = (user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        user.password = yield bcryptjs_1.default.hash(user.password, parseInt(process.env.SALT_ROUNDS, 10));
    }
    catch (error) {
        console.error(error);
    }
});
const User = db_config_1.default.define("users", {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: sequelize_1.DataTypes.INTEGER
    },
    first_name: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING
    },
    last_name: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING
    },
    username: {
        field: 'user_name',
        allowNull: false,
        type: sequelize_1.DataTypes.STRING,
        unique: true
    },
    password: {
        allowNull: false,
        type: sequelize_1.DataTypes.CHAR(60)
    },
    createdAt: {
        field: "created_at",
        allowNull: true,
        defaultValue: new Date(),
        type: sequelize_1.DataTypes.DATE
    },
    updatedAt: {
        field: "updated_at",
        type: sequelize_1.DataTypes.DATE,
        allowNull: true,
        defaultValue: new Date(),
    },
}, {
    underscored: true,
    createdAt: true,
    updatedAt: true,
    hooks: {
        beforeCreate: hashPassword,
    }
});
// User.sync({alter: true})
exports.default = User;
