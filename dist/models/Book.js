"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_config_1 = __importDefault(require("../config/db.config"));
const Book = db_config_1.default.define("books", {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: sequelize_1.DataTypes.INTEGER
    },
    title: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING
    },
    author: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING
    },
    genre: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING
    },
    publishedDate: {
        field: "published_date",
        allowNull: true,
        type: sequelize_1.DataTypes.STRING
    },
    isbn: {
        allowNull: true,
        type: sequelize_1.DataTypes.STRING
    },
    createdAt: {
        field: "created_at",
        allowNull: false,
        defaultValue: new Date(),
        type: sequelize_1.DataTypes.DATE
    },
    updatedAt: {
        field: "updated_at",
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        defaultValue: new Date(),
    },
}, {
    underscored: true,
    createdAt: true,
    updatedAt: true
});
Book.sync({ alter: true });
exports.default = Book;
