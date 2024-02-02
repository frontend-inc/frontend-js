"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = __importDefault(require("axios"));
axios_1.default.interceptors.response.use(function (resp) { return Promise.resolve(resp === null || resp === void 0 ? void 0 : resp.data); }, function (error) { return Promise.reject(error === null || error === void 0 ? void 0 : error.response); });
exports.default = axios_1.default;
