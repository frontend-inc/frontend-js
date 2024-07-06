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
var ResourceContext_1 = __importDefault(require("./ResourceContext"));
var ResourceProvider = function (props) {
    var url = props.url, name = props.name, children = props.children;
    var _a = (0, react_1.useState)(false), loading = _a[0], setLoading = _a[1];
    var _b = (0, react_1.useState)(false), delayedLoading = _b[0], setDelayedLoading = _b[1];
    var _c = (0, react_1.useState)({}), query = _c[0], setQuery = _c[1];
    var _d = (0, react_1.useState)({}), errors = _d[0], setErrors = _d[1];
    var _e = (0, react_1.useState)(), resource = _e[0], setResource = _e[1];
    var _f = (0, react_1.useState)([]), resources = _f[0], setResources = _f[1];
    var value = {
        url: url,
        name: name,
        loading: loading,
        setLoading: setLoading,
        delayedLoading: delayedLoading,
        setDelayedLoading: setDelayedLoading,
        query: query,
        setQuery: setQuery,
        errors: errors,
        setErrors: setErrors,
        resource: resource,
        setResource: setResource,
        resources: resources,
        setResources: setResources
    };
    return (react_1.default.createElement(ResourceContext_1.default.Provider, { value: value }, children));
};
exports.default = ResourceProvider;
