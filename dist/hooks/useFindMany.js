"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var swr_1 = __importDefault(require("swr"));
var useApi_1 = __importDefault(require("./useApi"));
var useFindMany = function (params) {
    var api = (0, useApi_1.default)().api;
    var _a = params || {}, url = _a.url, query = _a.query;
    var fetcher = function (url, query) { return api.findMany(query, { url: url }); };
    var cacheKey = (url && query) ? [url, query] : null;
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
exports.default = useFindMany;
