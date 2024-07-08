"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var QueryContext_1 = __importDefault(require("./QueryContext"));
var QueryProvider = function (props) {
    var url = props.url, children = props.children;
    var _a = (0, react_1.useState)(false), loading = _a[0], setLoading = _a[1];
    var _b = (0, react_1.useState)(false), delayedLoading = _b[0], setDelayedLoading = _b[1];
    var _c = (0, react_1.useState)({}), query = _c[0], setQuery = _c[1];
    var _d = (0, react_1.useState)({}), meta = _d[0], setMeta = _d[1];
    var _e = (0, react_1.useState)(1), page = _e[0], setPage = _e[1];
    var _f = (0, react_1.useState)(20), perPage = _f[0], setPerPage = _f[1];
    var _g = (0, react_1.useState)(0), numPages = _g[0], setNumPages = _g[1];
    var _h = (0, react_1.useState)(0), numResults = _h[0], setNumResults = _h[1];
    var _j = (0, react_1.useState)(0), totalCount = _j[0], setTotalCount = _j[1];
    var _k = (0, react_1.useState)(), resources = _k[0], setResources = _k[1];
    var value = {
        loading: loading,
        setLoading: setLoading,
        delayedLoading: delayedLoading,
        setDelayedLoading: setDelayedLoading,
        url: url,
        query: query,
        setQuery: setQuery,
        meta: meta,
        setMeta: setMeta,
        page: page,
        setPage: setPage,
        perPage: perPage,
        setPerPage: setPerPage,
        numPages: numPages,
        setNumPages: setNumPages,
        numResults: numResults,
        setNumResults: setNumResults,
        totalCount: totalCount,
        setTotalCount: setTotalCount,
        resources: resources,
        setResources: setResources,
    };
    return (react_1.default.createElement(QueryContext_1.default.Provider, { value: value }, children));
};
exports.default = QueryProvider;
