"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var swr_1 = __importDefault(require("swr"));
var useApi_1 = __importDefault(require("./useApi"));
var useFindMany = function (params) {
    var api = (0, useApi_1.default)().api;
    var _a = params || {}, url = _a.url, query = _a.query;
    var _b = (0, react_1.useState)(null), resources = _b[0], setResources = _b[1];
    var _c = (0, react_1.useState)(null), meta = _c[0], setMeta = _c[1];
    var _d = (0, react_1.useState)(1), page = _d[0], setPage = _d[1];
    var _e = (0, react_1.useState)(10), perPage = _e[0], setPerPage = _e[1];
    var _f = (0, react_1.useState)(0), totalCount = _f[0], setTotalCount = _f[1];
    var _g = (0, react_1.useState)(0), numPages = _g[0], setNumPages = _g[1];
    var fetcher = function (url, query) { return api.findMany(query, { url: url }); };
    var cacheKey = (url && query) ? [url, query] : null;
    var _h = (0, swr_1.default)(cacheKey, fetcher, {
        revalidateOnFocus: true,
        revalidateOnReconnect: true
    }), data = _h.data, isLoading = _h.isLoading, error = _h.error, mutate = _h.mutate;
    (0, react_1.useEffect)(function () {
        if (Array.isArray(data === null || data === void 0 ? void 0 : data.data)) {
            setResources(data.data);
        }
        if (data === null || data === void 0 ? void 0 : data.meta) {
            setMeta(data.meta);
            setPage(data.meta.page);
            setPerPage(data.meta.per_page);
            setTotalCount(data.meta.total_count);
            setNumPages(data.meta.num_pages);
        }
    }, [data]);
    return {
        isLoading: isLoading,
        data: data,
        error: error,
        mutate: mutate,
        resources: resources,
        meta: meta,
        page: page,
        perPage: perPage,
        totalCount: totalCount,
        numPages: numPages
    };
};
exports.default = useFindMany;
