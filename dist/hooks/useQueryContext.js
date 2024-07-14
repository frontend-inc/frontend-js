"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var swr_1 = __importDefault(require("swr"));
var context_1 = require("../context");
var useQueryContext = function (params) {
    var _a = params || {}, url = _a.url, query = _a.query;
    var api = (0, react_1.useContext)(context_1.ApiContext).api;
    var _b = (0, react_1.useContext)(context_1.ResourceContext), loading = _b.loading, setLoading = _b.setLoading, errors = _b.errors, setErrors = _b.setErrors, resources = _b.resources, setResources = _b.setResources, meta = _b.meta, page = _b.page, perPage = _b.perPage, numPages = _b.numPages, totalCount = _b.totalCount, setNumPages = _b.setNumPages, setMeta = _b.setMeta, setPage = _b.setPage, setPerPage = _b.setPerPage, setTotalCount = _b.setTotalCount;
    var data = (0, swr_1.default)((url && query) ? [url, query] : null, function (_a) {
        var url = _a[0], query = _a[1];
        return api.findMany(query, { url: url });
    }).data;
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
        if (!data) {
            setLoading(true);
        }
        else {
            setLoading(false);
        }
    }, [data]);
    var handleError = function (errors) {
        console.log('errors', errors);
    };
    return {
        loading: loading,
        errors: errors,
        resources: resources,
        meta: meta,
        page: page,
        perPage: perPage,
        numPages: numPages,
        totalCount: totalCount,
    };
};
exports.default = useQueryContext;
