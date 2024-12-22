"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var swr_1 = __importDefault(require("swr"));
var useApi_1 = __importDefault(require("./useApi"));
var useFindOne = function (params) {
    var api = (0, useApi_1.default)().api;
    var _a = params || {}, id = _a.id, url = _a.url;
    var _b = (0, react_1.useState)(null), resource = _b[0], setResource = _b[1];
    var fetcher = function (id, url) { return api.findOne(id, { url: url }); };
    var cacheKey = (url && id) ? [url, id] : null;
    var _c = (0, swr_1.default)(cacheKey, fetcher, {
        revalidateOnFocus: true,
        revalidateOnReconnect: true
    }), data = _c.data, isLoading = _c.isLoading, error = _c.error, mutate = _c.mutate;
    (0, react_1.useEffect)(function () {
        var _a;
        if ((_a = data === null || data === void 0 ? void 0 : data.data) === null || _a === void 0 ? void 0 : _a.id) {
            setResource(data === null || data === void 0 ? void 0 : data.data);
        }
    }, [data]);
    return {
        isLoading: isLoading,
        data: data,
        error: error,
        resource: resource,
        mutate: mutate
    };
};
exports.default = useFindOne;
