"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var swr_1 = __importDefault(require("swr"));
var context_1 = require("../context");
var useQueryContext = function (params) {
    var defaultQuery = (params || {}).query;
    var api = (0, react_1.useContext)(context_1.ApiContext).api;
    var _a = (0, react_1.useContext)(context_1.ResourceContext), url = _a.url, loading = _a.loading, setLoading = _a.setLoading, errors = _a.errors, setErrors = _a.setErrors, resources = _a.resources, setResources = _a.setResources, meta = _a.meta, page = _a.page, perPage = _a.perPage, numPages = _a.numPages, totalCount = _a.totalCount, setNumPages = _a.setNumPages, setMeta = _a.setMeta, setPage = _a.setPage, setPerPage = _a.setPerPage, setTotalCount = _a.setTotalCount;
    var cache = (url && defaultQuery) ? [url, defaultQuery] : null;
    var fetcher = function (_a) {
        var url = _a[0], defaultQuery = _a[1];
        return api.findMany(defaultQuery, { url: url });
    };
    var _b = (0, swr_1.default)(cache, fetcher), isLoading = _b.isLoading, data = _b.data, error = _b.error;
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
