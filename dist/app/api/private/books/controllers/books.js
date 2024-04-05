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
const books_1 = __importDefault(require("../../../../../services/books/books"));
const Responses_1 = __importDefault(require("../../../../../constants/Responses"));
const Response_1 = require("../../../../../services/Response/Response");
const createBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("req...", req.body);
        const { title, author, genre, published_date } = req.body;
        // console.log("customer_number ", customer_number, "complaint_number ", complaint_number, "description ", description, staff_id, "department_id ", department_id, "complaint_status_id", complaint_status_id)
        const book = yield books_1.default.createBook({ title, author, genre, published_date });
        if (!book) {
            return (0, Response_1.serverErrorResponse)(res, Responses_1.default.BOOK_NOT_CREATED);
        }
        return (0, Response_1.successResponse)(res, { book });
    }
    catch (error) {
        next(error);
    }
});
exports.createBook = createBook;
const getAllBooks = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { keyword, sortBy, filterBy } = req.query;
        const books = yield books_1.default.getAllBooks(sortBy, filterBy, keyword);
        console.log("books ==> ", books);
        if (!books) {
            return (0, Response_1.serverErrorResponse)(res, Responses_1.default.NO_BOOKS_FOUND);
        }
        else if (books.count == 0) {
            return (0, Response_1.successResponse)(res, { books });
        }
        return (0, Response_1.successResponse)(res, { books });
    }
    catch (error) {
        next(error);
    }
});
exports.getAllBooks = getAllBooks;
const booksController = {
    createBook: exports.createBook,
    getAllBooks: exports.getAllBooks
};
exports.default = booksController;
