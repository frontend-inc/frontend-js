'use client';
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
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
    var url = props.url, name = props.name, children = props.children, _resource = props.resource;
    var _a = (0, react_1.useState)(false), loading = _a[0], setLoading = _a[1];
    var _b = (0, react_1.useState)(false), delayedLoading = _b[0], setDelayedLoading = _b[1];
    var _c = (0, react_1.useState)({}), query = _c[0], setQuery = _c[1];
    var _d = (0, react_1.useState)(null), findManyCache = _d[0], setFindManyCache = _d[1];
    var _e = (0, react_1.useState)(null), findOneCache = _e[0], setFindOneCache = _e[1];
    var _f = (0, react_1.useState)({}), meta = _f[0], setMeta = _f[1];
    var _g = (0, react_1.useState)(1), page = _g[0], setPage = _g[1];
    var _h = (0, react_1.useState)(20), perPage = _h[0], setPerPage = _h[1];
    var _j = (0, react_1.useState)(0), numPages = _j[0], setNumPages = _j[1];
    var _k = (0, react_1.useState)(0), totalCount = _k[0], setTotalCount = _k[1];
    var _l = (0, react_1.useState)({}), errors = _l[0], setErrors = _l[1];
    var _m = (0, react_1.useState)(_resource), resource = _m[0], setResource = _m[1];
    var _o = (0, react_1.useState)([]), resources = _o[0], setResources = _o[1];
    var _p = (0, react_1.useState)([]), selected = _p[0], setSelected = _p[1];
    var _q = (0, react_1.useState)([]), selectedIds = _q[0], setSelectedIds = _q[1];
    var _r = (0, react_1.useState)(false), openShow = _r[0], setOpenShow = _r[1];
    var _s = (0, react_1.useState)(false), openDelete = _s[0], setOpenDelete = _s[1];
    var _t = (0, react_1.useState)(false), openEdit = _t[0], setOpenEdit = _t[1];
    var _u = (0, react_1.useState)(false), openCreate = _u[0], setOpenCreate = _u[1];
    var value = {
        url: url,
        name: name,
        loading: loading,
        setLoading: setLoading,
        delayedLoading: delayedLoading,
        setDelayedLoading: setDelayedLoading,
        findManyCache: findManyCache,
        setFindManyCache: setFindManyCache,
        findOneCache: findOneCache,
        setFindOneCache: setFindOneCache,
        query: query,
        setQuery: setQuery,
        errors: errors,
        setErrors: setErrors,
        resource: resource,
        setResource: setResource,
        resources: resources,
        setResources: setResources,
        selected: selected,
        setSelected: setSelected,
        selectedIds: selectedIds,
        setSelectedIds: setSelectedIds,
        meta: meta,
        setMeta: setMeta,
        page: page,
        setPage: setPage,
        perPage: perPage,
        setPerPage: setPerPage,
        numPages: numPages,
        setNumPages: setNumPages,
        totalCount: totalCount,
        setTotalCount: setTotalCount,
        openShow: openShow,
        setOpenShow: setOpenShow,
        openEdit: openEdit,
        setOpenEdit: setOpenEdit,
        openCreate: openCreate,
        setOpenCreate: setOpenCreate,
        openDelete: openDelete,
        setOpenDelete: setOpenDelete,
    };
    return (react_1.default.createElement(ResourceContext_1.default.Provider, { value: value }, children));
};
exports.default = ResourceProvider;
