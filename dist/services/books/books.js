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
exports.getAllBooks = exports.createBook = void 0;
const sequelize_1 = require("sequelize");
const Book_1 = __importDefault(require("../../models/Book"));
const createBook = (complaintDetails) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let book;
        const { title, author, genre, published_date } = complaintDetails;
        book = yield Book_1.default.create({
            title: title,
            author: author,
            genre: genre,
            published_date: published_date,
        });
        return book;
    }
    catch (error) {
        throw error;
    }
});
exports.createBook = createBook;
const getAllBooks = (sortBy, filterBy, keyword) => __awaiter(void 0, void 0, void 0, function* () {
    let books = { rows: [], count: 0 };
    try {
        console.log("keyword ", keyword);
        console.log("filterBy ", filterBy);
        console.log("sortBy ", sortBy);
        // if (keyword != "")
        // {
        switch (filterBy) {
            case "title":
                books = yield Book_1.default.findAndCountAll({
                    where: {
                        title: {
                            [sequelize_1.Op.like]: "%" + keyword + "%",
                        },
                    },
                    order: [[sortBy, "asc"]],
                });
                break;
            case "genre":
                books = yield Book_1.default.findAndCountAll({
                    where: {
                        genre: {
                            [sequelize_1.Op.like]: "%" + keyword + "%",
                        },
                    },
                    order: [[sortBy, "asc"]],
                });
                break;
            case "author":
                console.log("author keyword ", keyword);
                books = yield Book_1.default.findAndCountAll({
                    where: {
                        author: {
                            [sequelize_1.Op.like]: "%" + keyword + "%",
                        },
                    },
                    order: [[sortBy, "asc"]],
                });
                break;
            case "published_date":
                books = yield Book_1.default.findAndCountAll({
                    where: {
                        published_date: {
                            [sequelize_1.Op.like]: "%" + keyword + "%",
                        },
                    },
                    order: [[sortBy, "asc"]],
                });
                break;
            default:
                books = yield Book_1.default.findAndCountAll({
                    where: {
                        title: {
                            [sequelize_1.Op.like]: "%" + keyword + "%",
                        },
                    },
                    order: [[sortBy, "asc"]],
                });
                break;
        }
        return books;
    }
    catch (error) {
        console.error(error);
    }
});
exports.getAllBooks = getAllBooks;
const booksService = {
    createBook: exports.createBook,
    getAllBooks: exports.getAllBooks,
};
exports.default = booksService;
