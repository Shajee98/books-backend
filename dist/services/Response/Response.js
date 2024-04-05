"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.genericResponseByData = exports.successResponse = exports.unauthorizedResponse = exports.notFoundResponse = exports.badRequestResponse = exports.serverErrorResponse = void 0;
const ResponseCodes_1 = __importDefault(require("../../constants/ResponseCodes"));
const Responses_1 = __importDefault(require("../../constants/Responses"));
const responeObject = (status, success, data, error) => {
    return {
        status: {
            code: status,
            success: success,
        },
        data: data,
        error: error,
    };
};
const serverErrorResponse = (res, message) => {
    res.status(ResponseCodes_1.default.SERVER_ERROR).send(responeObject(ResponseCodes_1.default.SERVER_ERROR, false, null, {
        message: message ? message : Responses_1.default.FAILURE,
    }));
};
exports.serverErrorResponse = serverErrorResponse;
const badRequestResponse = (res, message) => {
    res.status(ResponseCodes_1.default.BAD_REQUEST).send(responeObject(ResponseCodes_1.default.BAD_REQUEST, false, null, {
        message: message ? message : Responses_1.default.BAD_REQUEST,
    }));
};
exports.badRequestResponse = badRequestResponse;
const notFoundResponse = (res, message) => {
    res.status(ResponseCodes_1.default.NOT_FOUND).send(responeObject(ResponseCodes_1.default.NOT_FOUND, false, null, {
        message: message ? message : Responses_1.default.NOT_FOUND,
    }));
};
exports.notFoundResponse = notFoundResponse;
const unauthorizedResponse = (res, message) => {
    res.status(ResponseCodes_1.default.UNAUTHORIZED).send(responeObject(ResponseCodes_1.default.UNAUTHORIZED, false, null, {
        message: message ? message : Responses_1.default.UNAUTHORIZED,
    }));
};
exports.unauthorizedResponse = unauthorizedResponse;
const successResponse = (res, dataObj) => {
    res
        .status(ResponseCodes_1.default.SUCCESS)
        .send(responeObject(ResponseCodes_1.default.SUCCESS, true, dataObj, null));
};
exports.successResponse = successResponse;
const genericResponseByData = (data, msg) => {
    if (data) {
        const success = msg && typeof msg.success != "undefined" ? msg.success : "success";
        return { status: { code: 200, success: true }, data: data, error: false, msg: success };
    }
    else {
        const error = msg && typeof msg.error != "undefined" ? msg.error : "something went wrong";
        return { status: { code: 500, success: false }, error: { message: error }, data: null, code: 500 };
    }
};
exports.genericResponseByData = genericResponseByData;
