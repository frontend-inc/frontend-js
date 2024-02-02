"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_2 = require("react");
var context_1 = require("../context");
var useResource = function (props) {
    var _a = props || {}, url = _a.url, _b = _a.name, name = _b === void 0 ? 'resource' : _b;
    var api = (0, react_1.useContext)(context_1.ApiContext).api;
    var _c = (0, react_2.useState)(false), loading = _c[0], setLoading = _c[1];
    var _d = (0, react_2.useState)(), errors = _d[0], setErrors = _d[1];
    var _e = (0, react_2.useState)({}), resource = _e[0], setResource = _e[1];
    var _f = (0, react_2.useState)([]), resources = _f[0], setResources = _f[1];
    var _g = (0, react_2.useState)({}), query = _g[0], setQuery = _g[1];
    var _h = (0, react_2.useState)(null), meta = _h[0], setMeta = _h[1];
    var _j = (0, react_2.useState)(1), page = _j[0], setPage = _j[1];
    var _k = (0, react_2.useState)(10), perPage = _k[0], setPerPage = _k[1];
    var _l = (0, react_2.useState)(0), totalCount = _l[0], setTotalCount = _l[1];
    var _m = (0, react_2.useState)(0), numPages = _m[0], setNumPages = _m[1];
    var showLoading = function () { return setLoading(true); };
    var hideLoading = function () { return setLoading(false); };
    var findOne = function (id) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!id)
                        return [2 /*return*/, null];
                    return [4 /*yield*/, loadingWrapper(function () { return api.collection(name).url(url).findOne(id); })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    }); };
    var findMany = function (queryParams, loadMore) {
        if (loadMore === void 0) { loadMore = false; }
        return __awaiter(void 0, void 0, void 0, function () {
            var res, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (url.includes('undefined')) {
                            console.log('Error: the URL contains undefined', url);
                            return [2 /*return*/];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, 4, 5]);
                        setLoading(true);
                        if (queryParams) {
                            setQuery(__assign(__assign({}, query), queryParams));
                        }
                        return [4 /*yield*/, api.url(url).findMany(__assign(__assign({}, query), queryParams))];
                    case 2:
                        res = _a.sent();
                        if (res.data) {
                            if (!loadMore) {
                                setResources(res.data);
                            }
                            else {
                                setResources(__spreadArray(__spreadArray([], resources, true), res.data, true));
                            }
                            if (res.meta) {
                                setMeta(res.meta);
                                setPage(res.meta.page);
                                setPerPage(res.meta.per_page);
                                setTotalCount(res.meta.total_count);
                                setNumPages(res.meta.num_pages);
                            }
                            return [2 /*return*/, res.data];
                        }
                        return [3 /*break*/, 5];
                    case 3:
                        e_1 = _a.sent();
                        handleErrors(e_1);
                        return [3 /*break*/, 5];
                    case 4:
                        setLoading(false);
                        return [7 /*endfinally*/];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    var loadMore = function () {
        var nextPage = page + 1;
        var loadMoreResults = true;
        findMany(__assign(__assign({}, query), { page: nextPage }), loadMoreResults);
    };
    var reloadMany = function () {
        findMany(query);
    };
    var paginate = function (page) {
        findMany(__assign(__assign({}, query), { page: page }));
    };
    var sort = function (sortBy, sortDirection) {
        findMany(__assign(__assign({}, query), { sort_by: sortBy, sort_direction: sortDirection }));
    };
    var save = function (data) {
        if (data === null || data === void 0 ? void 0 : data.id) {
            return update(data);
        }
        else {
            return create(data);
        }
    };
    var create = function (data) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, loadingWrapper(function () {
                        return api.collection(name).url(url).create(data);
                    })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    }); };
    var update = function (data) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, loadingWrapper(function () {
                        return api.collection(name).url(url).update(data);
                    })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    }); };
    var destroy = function (id) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, loadingWrapper(function () { return api.collection(name).url(url).destroy(id); })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    }); };
    var updateMany = function (ids, data) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, loadingWrapper(function () {
                        return api.collection(name).url(url).updateMany(ids, data);
                    })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    }); };
    var deleteMany = function (ids) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, loadingWrapper(function () {
                        return api.collection(name).url(url).destroyMany(ids);
                    })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    }); };
    var publish = function (ids) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, loadingWrapper(function () {
                        return api.collection(name).url(url).publish(ids);
                    })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    }); };
    var unpublish = function (ids) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, loadingWrapper(function () {
                        return api.collection(name).url(url).unpublish(ids);
                    })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    }); };
    var addLinks = function (id, contentType, dataIds) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, loadingWrapper(function () {
                        return api.collection('links').url(url).addLinks(id, contentType, dataIds);
                    })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    }); };
    var removeLinks = function (id, targetIds) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, loadingWrapper(function () {
                        return api.collection('links').url(url).removeLinks(id, targetIds);
                    })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    }); };
    var addAttachment = function (id, fieldName, attachmentId) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, loadingWrapper(function () {
                        return api
                            .collection('attachment')
                            .url(url)
                            .addAttachment(id, fieldName, attachmentId);
                    })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    }); };
    var removeAttachment = function (id, fieldName) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, loadingWrapper(function () {
                        return api.collection('attachment').url(url).removeAttachment(id, fieldName);
                    })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    }); };
    var updatePositions = function (sorted) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, api.collection(name).url(url).updatePositions(sorted)];
                case 1: 
                // Intentionally avoid loading for drag-drop UIs
                return [2 /*return*/, _a.sent()];
            }
        });
    }); };
    var handleChange = function (ev) {
        var _a;
        var name = ev.target.name;
        var value = ev.target.type === 'checkbox' ? ev.target.checked : ev.target.value;
        setResource(__assign(__assign({}, resource), (_a = {}, _a[name] = value, _a)));
    };
    var loadingWrapper = function (apiMethod) { return __awaiter(void 0, void 0, void 0, function () {
        var res, e_2;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, 3, 4]);
                    showLoading();
                    setErrors(null);
                    return [4 /*yield*/, apiMethod()];
                case 1:
                    res = _b.sent();
                    if ((_a = res === null || res === void 0 ? void 0 : res.data) === null || _a === void 0 ? void 0 : _a.id) {
                        setResource(res.data);
                    }
                    else if (res === null || res === void 0 ? void 0 : res.error) {
                        handleErrors(res === null || res === void 0 ? void 0 : res.error);
                    }
                    return [2 /*return*/, res === null || res === void 0 ? void 0 : res.data];
                case 2:
                    e_2 = _b.sent();
                    return [3 /*break*/, 4];
                case 3:
                    hideLoading();
                    return [7 /*endfinally*/];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    var handleErrors = function (e) {
        var _a, _b, _c;
        if (((_a = e === null || e === void 0 ? void 0 : e.response) === null || _a === void 0 ? void 0 : _a.status) === 401) {
            setErrors([{ code: 401, message: 'Unauthorized' }]);
        }
        if ((_b = e === null || e === void 0 ? void 0 : e.data) === null || _b === void 0 ? void 0 : _b.errors) {
            setErrors((_c = e === null || e === void 0 ? void 0 : e.data) === null || _c === void 0 ? void 0 : _c.errors);
        }
        console.log('handleErrors', e);
    };
    return {
        api: api,
        loading: loading,
        setLoading: setLoading,
        loadingWrapper: loadingWrapper,
        errors: errors,
        setErrors: setErrors,
        handleChange: handleChange,
        handleErrors: handleErrors,
        resource: resource,
        resources: resources,
        setResource: setResource,
        setResources: setResources,
        findOne: findOne,
        findMany: findMany,
        reloadMany: reloadMany,
        save: save,
        update: update,
        create: create,
        destroy: destroy,
        updateMany: updateMany,
        deleteMany: deleteMany,
        publish: publish,
        unpublish: unpublish,
        addLinks: addLinks,
        removeLinks: removeLinks,
        addAttachment: addAttachment,
        removeAttachment: removeAttachment,
        updatePositions: updatePositions,
        query: query,
        setQuery: setQuery,
        meta: meta,
        page: page,
        perPage: perPage,
        totalCount: totalCount,
        numPages: numPages,
        sort: sort,
        paginate: paginate,
        loadMore: loadMore,
    };
};
exports.default = useResource;
