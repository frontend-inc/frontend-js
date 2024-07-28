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
    var _a = params || {}, url = _a.url, query = _a.query, _b = _a.loadMore, loadMore = _b === void 0 ? false : _b;
    var api = (0, react_1.useContext)(context_1.ApiContext).api;
    var _c = (0, react_1.useContext)(context_1.ResourceContext), loading = _c.loading, setLoading = _c.setLoading, errors = _c.errors, setErrors = _c.setErrors, resources = _c.resources, setResources = _c.setResources, meta = _c.meta, page = _c.page, perPage = _c.perPage, numPages = _c.numPages, totalCount = _c.totalCount, setNumPages = _c.setNumPages, setMeta = _c.setMeta, setPage = _c.setPage, setPerPage = _c.setPerPage, setTotalCount = _c.setTotalCount;
    var cache = (url && query) ? [url, query] : null;
    var fetcher = function (_a) {
        var url = _a[0], query = _a[1];
        return api.findMany(query, { url: url });
    };
    var _d = (0, swr_1.default)(cache, fetcher), isLoading = _d.isLoading, data = _d.data, error = _d.error;
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
    (0, react_1.useEffect)(function () {
        setLoading(isLoading);
    }, [isLoading]);
    (0, react_1.useEffect)(function () {
        setErrors(error);
    }, [error]);
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
exports.default = useQueryContext;
