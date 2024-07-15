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
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var context_1 = require("../context");
var hooks_1 = require("../hooks");
var swr_1 = __importDefault(require("swr"));
var useResource = function (params) {
    var _a = params || {}, url = _a.url, name = _a.name, _id = _a.id, _query = _a.query;
    var apiParams = { url: url, name: name };
    var api = (0, react_1.useContext)(context_1.ApiContext).api;
    var _b = (0, react_1.useState)(false), loading = _b[0], setLoading = _b[1];
    var _c = (0, react_1.useState)(), errors = _c[0], setErrors = _c[1];
    var _d = (0, react_1.useState)({}), resource = _d[0], setResource = _d[1];
    var _e = (0, react_1.useState)([]), resources = _e[0], setResources = _e[1];
    var _f = (0, react_1.useState)(_id), id = _f[0], setId = _f[1];
    var _g = (0, react_1.useState)({}), query = _g[0], setQuery = _g[1];
    var _h = (0, react_1.useState)(null), meta = _h[0], setMeta = _h[1];
    var _j = (0, react_1.useState)(1), page = _j[0], setPage = _j[1];
    var _k = (0, react_1.useState)(10), perPage = _k[0], setPerPage = _k[1];
    var _l = (0, react_1.useState)(0), totalCount = _l[0], setTotalCount = _l[1];
    var _m = (0, react_1.useState)(0), numPages = _m[0], setNumPages = _m[1];
    var showLoading = function () { return setLoading(true); };
    var hideLoading = function () { return setLoading(false); };
    var findOne = function (id) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!id)
                        return [2 /*return*/, null];
                    return [4 /*yield*/, loadingWrapper(function () { return api.findOne(id, apiParams); })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    }); };
    var findMany = function (queryParams) {
        if (queryParams === void 0) { queryParams = {}; }
        return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                setQuery(queryParams);
                return [2 /*return*/];
            });
        });
    };
    var loadMore = function () { return __awaiter(void 0, void 0, void 0, function () {
        var res_1, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, 3, 4]);
                    setLoading(true);
                    return [4 /*yield*/, api.findMany(__assign(__assign({}, query), { page: page + 1 }), apiParams)];
                case 1:
                    res_1 = _a.sent();
                    if (res_1.data) {
                        setResources(function (prev) { return __spreadArray(__spreadArray([], prev, true), res_1.data, true); });
                    }
                    if (res_1.meta) {
                        setMeta(res_1.meta);
                    }
                    return [2 /*return*/, res_1.data];
                case 2:
                    e_1 = _a.sent();
                    handleErrors(e_1);
                    return [3 /*break*/, 4];
                case 3:
                    setLoading(false);
                    return [7 /*endfinally*/];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    var reloadMany = function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            setQuery(query);
            return [2 /*return*/];
        });
    }); };
    var paginate = function (page) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            setQuery(__assign(__assign({}, query), { page: page }));
            return [2 /*return*/];
        });
    }); };
    var sort = function (sortBy, sortDirection) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            setQuery(__assign(__assign({}, query), { sort_by: sortBy, sort_direction: sortDirection }));
            return [2 /*return*/];
        });
    }); };
    var save = function (resource) {
        if (resource === null || resource === void 0 ? void 0 : resource.id) {
            return update(resource);
        }
        else {
            return create(resource);
        }
    };
    var create = function (resource) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, loadingWrapper(function () {
                        return api.create(resource, apiParams);
                    })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    }); };
    var update = function (resource) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, loadingWrapper(function () {
                        return api.update(resource, apiParams);
                    })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    }); };
    var destroy = function (id) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, loadingWrapper(function () {
                        return api.destroy(id, apiParams);
                    })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    }); };
    var updateMany = function (ids, resource) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, loadingWrapper(function () {
                        return api.updateMany(ids, resource, apiParams);
                    })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    }); };
    var deleteMany = function (ids) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, loadingWrapper(function () {
                        return api.destroyMany(ids, apiParams);
                    })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    }); };
    var publish = function (ids) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, loadingWrapper(function () {
                        return api.publish(ids, apiParams);
                    })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    }); };
    var unpublish = function (ids) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, loadingWrapper(function () {
                        return api.unpublish(ids, apiParams);
                    })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    }); };
    var addLinks = function (sourceId, targetIds) { return __awaiter(void 0, void 0, void 0, function () {
        var options;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    options = {
                        url: url,
                        name: 'links'
                    };
                    return [4 /*yield*/, loadingWrapper(function () {
                            return api.addLinks(sourceId, targetIds, options);
                        })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    }); };
    var removeLinks = function (sourceId, targetIds) { return __awaiter(void 0, void 0, void 0, function () {
        var options;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    options = {
                        url: url,
                        name: 'links'
                    };
                    return [4 /*yield*/, loadingWrapper(function () {
                            return api.removeLinks(sourceId, targetIds, options);
                        })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    }); };
    var updateLinkPositions = function (id, sorted) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, api.updateLinkPositions(id, sorted, apiParams)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    }); };
    var addAttachment = function (id, fieldName, attachmentId) { return __awaiter(void 0, void 0, void 0, function () {
        var options;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    options = {
                        name: 'attachment',
                        url: url
                    };
                    return [4 /*yield*/, loadingWrapper(function () {
                            return api.addAttachment(id, fieldName, attachmentId, options);
                        })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    }); };
    var removeAttachment = function (id, fieldName) { return __awaiter(void 0, void 0, void 0, function () {
        var options;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    options = {
                        name: 'attachment',
                        url: url
                    };
                    return [4 /*yield*/, loadingWrapper(function () {
                            return api.removeAttachment(id, fieldName, options);
                        })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    }); };
    var updatePositions = function (sorted) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, api.updatePositions(sorted, apiParams)];
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
                    else if (res === null || res === void 0 ? void 0 : res.errors) {
                        handleErrors(res === null || res === void 0 ? void 0 : res.errors);
                    }
                    return [2 /*return*/, res === null || res === void 0 ? void 0 : res.data];
                case 2:
                    e_2 = _b.sent();
                    handleErrors(e_2);
                    return [3 /*break*/, 4];
                case 3:
                    hideLoading();
                    return [7 /*endfinally*/];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    var handleErrors = function (e) {
        if ((e === null || e === void 0 ? void 0 : e.status) === 401) {
            setErrors([{ code: 401, message: 'Unauthorized' }]);
        }
        else if (e) {
            setErrors(e);
        }
        console.log('handleErrors', e);
    };
    var resourcesCache = (url && query) ? [url, query] : null;
    var resourcesFetcher = function (_a) {
        var url = _a[0], query = _a[1];
        return api.findMany(query, { url: url });
    };
    var _o = (0, swr_1.default)(resourcesCache, resourcesFetcher), data = _o.data, isLoading = _o.isLoading;
    var resourceCache = (url && id) ? [url, id] : null;
    var resourceFetcher = function (_a) {
        var url = _a[0], id = _a[1];
        return api.findOne(id, { url: url });
    };
    var _p = (0, swr_1.default)(resourceCache, resourceFetcher), _data = _p.data, _isLoading = _p.isLoading;
    var delayLoading = (0, hooks_1.useDelayedLoading)({
        loading: loading || isLoading || _isLoading
    }).loading;
    (0, react_1.useEffect)(function () {
        if (data === null || data === void 0 ? void 0 : data.data) {
            setResources(data === null || data === void 0 ? void 0 : data.data);
        }
        if (data === null || data === void 0 ? void 0 : data.errors) {
            setErrors(data === null || data === void 0 ? void 0 : data.errors);
        }
        if (data === null || data === void 0 ? void 0 : data.meta) {
            setMeta(data === null || data === void 0 ? void 0 : data.meta);
        }
    }, [data]);
    (0, react_1.useEffect)(function () {
        if (_data === null || _data === void 0 ? void 0 : _data.data) {
            setResource(_data === null || _data === void 0 ? void 0 : _data.data);
        }
        if (_data === null || _data === void 0 ? void 0 : _data.error) {
            setErrors(_data === null || _data === void 0 ? void 0 : _data.error);
        }
    }, [_data]);
    (0, react_1.useEffect)(function () {
        if (_query) {
            setQuery(_query);
        }
    }, [_query]);
    (0, react_1.useEffect)(function () {
        if (_id) {
            setId(_id);
        }
    }, [_id]);
    (0, react_1.useEffect)(function () {
        if (meta) {
            setPage(meta.page);
            setPerPage(meta.per_page);
            setTotalCount(meta.total_count);
            setNumPages(meta.num_pages);
        }
    }, [meta]);
    return {
        loading: loading || isLoading || _isLoading,
        delayLoading: delayLoading,
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
        setQuery: setQuery,
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
        updateLinkPositions: updateLinkPositions,
        addAttachment: addAttachment,
        removeAttachment: removeAttachment,
        updatePositions: updatePositions,
        query: query,
        findMany: findMany,
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
