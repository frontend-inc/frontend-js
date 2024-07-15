"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var swr_1 = __importDefault(require("swr"));
var context_1 = require("../context");
var useQuery = function (params) {
    var _a = params || {}, url = _a.url, query = _a.query;
    var api = (0, react_1.useContext)(context_1.ApiContext).api;
    var _b = (0, react_1.useState)(false), loading = _b[0], setLoading = _b[1];
    var _c = (0, react_1.useState)(), errors = _c[0], setErrors = _c[1];
    var _d = (0, react_1.useState)([]), resources = _d[0], setResources = _d[1];
    var _e = (0, react_1.useState)(null), meta = _e[0], setMeta = _e[1];
    var _f = (0, react_1.useState)(1), page = _f[0], setPage = _f[1];
    var _g = (0, react_1.useState)(10), perPage = _g[0], setPerPage = _g[1];
    var _h = (0, react_1.useState)(0), totalCount = _h[0], setTotalCount = _h[1];
    var _j = (0, react_1.useState)(0), numPages = _j[0], setNumPages = _j[1];
    var cache = (url && query) ? [url, query] : null;
    var fetcher = function (_a) {
        var url = _a[0], query = _a[1];
        return api.findMany(query, { url: url });
    };
    var _k = (0, swr_1.default)(cache, fetcher), isLoading = _k.isLoading, data = _k.data, error = _k.error;
    (0, react_1.useEffect)(function () {
        if (data === null || data === void 0 ? void 0 : data.data) {
            setResources(data === null || data === void 0 ? void 0 : data.data);
            if (data.meta) {
                setMeta(data.meta);
                setPage(data.meta.page);
                setPerPage(data.meta.per_page);
                setTotalCount(data.meta.total_count);
                setNumPages(data.meta.num_pages);
            }
        }
        if (data === null || data === void 0 ? void 0 : data.errors) {
            setErrors(data.errors);
            handleError(data.errors);
        }
    }, [data]);
    (0, react_1.useEffect)(function () {
        setErrors(error);
    }, [error]);
    (0, react_1.useEffect)(function () {
        setLoading(isLoading);
    }, [isLoading]);
    var handleError = function (errors) {
        console.log('errors', errors);
    };
    return {
        loading: loading,
        errors: errors,
        data: data,
        resources: resources,
        meta: meta,
        page: page,
        perPage: perPage,
        numPages: numPages,
        totalCount: totalCount,
    };
};
exports.default = useQuery;
