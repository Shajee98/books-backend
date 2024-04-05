"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.csvUpload = exports.attachmentUpload = void 0;
const multer_1 = __importDefault(require("multer"));
const attachmentsStorage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/attachments'); // Set your desired folder path
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});
exports.attachmentUpload = (0, multer_1.default)({ storage: attachmentsStorage });
const csvStorage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/csvs'); // Set your desired folder path
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});
exports.csvUpload = (0, multer_1.default)({ storage: csvStorage });
