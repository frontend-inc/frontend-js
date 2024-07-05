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
    var children = props.children;
    var _a = (0, react_1.useState)(''), url = _a[0], setUrl = _a[1];
    var _b = (0, react_1.useState)(false), loading = _b[0], setLoading = _b[1];
    var _c = (0, react_1.useState)(false), delayedLoading = _c[0], setDelayedLoading = _c[1];
    var _d = (0, react_1.useState)({}), query = _d[0], setQuery = _d[1];
    var _e = (0, react_1.useState)(), resources = _e[0], setResources = _e[1];
    var value = {
        loading: loading,
        setLoading: setLoading,
        delayedLoading: delayedLoading,
        setDelayedLoading: setDelayedLoading,
        url: url,
        setUrl: setUrl,
        query: query,
        setQuery: setQuery,
        resources: resources,
        setResources: setResources,
    };
    return (react_1.default.createElement(QueryContext_1.default.Provider, { value: value }, children));
};
exports.default = QueryProvider;
