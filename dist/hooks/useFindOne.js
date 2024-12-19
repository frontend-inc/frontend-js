"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var swr_1 = __importDefault(require("swr"));
var useApi_1 = __importDefault(require("./useApi"));
var useFindOne = function (params) {
    var api = (0, useApi_1.default)().api;
    var _a = params || {}, id = _a.id, url = _a.url;
    var fetcher = function (id, url) { return api.findOne(id, { url: url }); };
    var cacheKey = (url && id) ? [url, id] : null;
    var _b = (0, swr_1.default)(cacheKey, fetcher, {
        revalidateOnFocus: true,
        revalidateOnReconnect: true
    }), data = _b.data, isLoading = _b.isLoading, error = _b.error, mutate = _b.mutate;
    return {
        isLoading: isLoading,
        data: data,
        error: error,
        mutate: mutate
    };
};
exports.default = useFindOne;
