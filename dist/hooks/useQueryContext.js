"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var swr_1 = __importDefault(require("swr"));
var context_1 = require("../context");
var useQueryContext = function (params) {
    var _a = (params || {}).loadMore, loadMore = _a === void 0 ? false : _a;
    var api = (0, react_1.useContext)(context_1.ApiContext).api;
    var _b = (0, react_1.useContext)(context_1.ResourceContext), url = _b.url, loading = _b.loading, setLoading = _b.setLoading, errors = _b.errors, setErrors = _b.setErrors, resources = _b.resources, setResources = _b.setResources, query = _b.query, setQuery = _b.setQuery, meta = _b.meta, page = _b.page, perPage = _b.perPage, numPages = _b.numPages, totalCount = _b.totalCount, setNumPages = _b.setNumPages, setMeta = _b.setMeta, setPage = _b.setPage, setPerPage = _b.setPerPage, setTotalCount = _b.setTotalCount;
    var cache = (url && query) ? [url, query] : null;
    var fetcher = function (_a) {
        var url = _a[0], query = _a[1];
        return api.findMany(query, { url: url });
    };
    var _c = (0, swr_1.default)(cache, fetcher), isLoading = _c.isLoading, data = _c.data, error = _c.error;
    (0, react_1.useEffect)(function () {
        if (data === null || data === void 0 ? void 0 : data.data) {
            if (loadMore) {
                setResources(function (prev) { return __spreadArray(__spreadArray([], prev, true), data.data, true); });
            }
            else {
                setResources(data === null || data === void 0 ? void 0 : data.data);
            }
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
    var handleError = function (errors) {
        console.log('errors', errors);
    };
    (0, react_1.useEffect)(function () {
        setLoading(isLoading);
    }, [isLoading]);
    (0, react_1.useEffect)(function () {
        setErrors(error);
    }, [error]);
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
exports.default = useQueryContext;
