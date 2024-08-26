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
var helpers_1 = require("../helpers");
var context_2 = require("../context");
var _1 = require(".");
var swr_1 = __importDefault(require("swr"));
var lodash_1 = require("lodash");
var useResourceContext = function () {
    var api = (0, react_1.useContext)(context_2.ApiContext).api;
    var _a = (0, react_1.useContext)(context_1.ResourceContext), url = _a.url, _b = _a.name, name = _b === void 0 ? 'document' : _b, loading = _a.loading, setLoading = _a.setLoading, errors = _a.errors, setErrors = _a.setErrors, resource = _a.resource, setResource = _a.setResource, resources = _a.resources, setResources = _a.setResources, query = _a.query, setQuery = _a.setQuery, meta = _a.meta, setMeta = _a.setMeta, page = _a.page, setPage = _a.setPage, perPage = _a.perPage, setPerPage = _a.setPerPage, totalCount = _a.totalCount, setTotalCount = _a.setTotalCount, numPages = _a.numPages, setNumPages = _a.setNumPages, infiniteLoad = _a.infiniteLoad, setInfiniteLoad = _a.setInfiniteLoad, findManyCache = _a.findManyCache, setFindManyCache = _a.setFindManyCache, findOneCache = _a.findOneCache, setFindOneCache = _a.setFindOneCache, selected = _a.selected, setSelected = _a.setSelected, selectedIds = _a.selectedIds, setSelectedIds = _a.setSelectedIds, openShow = _a.openShow, setOpenShow = _a.setOpenShow, openEdit = _a.openEdit, setOpenEdit = _a.setOpenEdit, openDelete = _a.openDelete, setOpenDelete = _a.setOpenDelete, openComments = _a.openComments, setOpenComments = _a.setOpenComments, openReferences = _a.openReferences, setOpenReferences = _a.setOpenReferences;
    var apiParams = {
        name: name,
        url: url
    };
    var showLoading = function () { return setLoading(true); };
    var hideLoading = function () { return setLoading(false); };
    var handleSelect = function (item) {
        if (selectedIds.find(function (id) { return id === item.id; })) {
            setSelected(selected.filter(function (i) { return i.id != item.id; }));
        }
        else {
            setSelected(selected.concat(item));
        }
    };
    var handleClear = function () {
        setSelected([]);
    };
    /* Find One */
    var findOneFetcher = function (_a) {
        var url = _a[0], id = _a[1];
        return api.findOne(id, { url: url });
    };
    var _c = (0, swr_1.default)(findOneCache, findOneFetcher, {
        revalidateOnFocus: true,
        revalidateOnReconnect: true,
        shouldRetryOnError: true, // Prevent automatic retries on error
    }), findOneIsLoading = _c.isLoading, findOneData = _c.data, findOneError = _c.error;
    (0, react_1.useEffect)(function () {
        var _a;
        if ((_a = findOneData === null || findOneData === void 0 ? void 0 : findOneData.data) === null || _a === void 0 ? void 0 : _a.id) {
            setResource(findOneData.data);
        }
    }, [findOneData === null || findOneData === void 0 ? void 0 : findOneData.data]);
    (0, react_1.useEffect)(function () {
        if (findOneError) {
            handleErrors(findOneError);
        }
    }, [findOneError]);
    (0, react_1.useEffect)(function () {
        setLoading(findOneIsLoading);
    }, [findOneIsLoading]);
    var findOne = function (id) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            if (!id)
                return [2 /*return*/, null];
            setFindOneCache([url, id]);
            return [2 /*return*/];
        });
    }); };
    var findManyFetcher = function (_a) {
        var url = _a[0], query = _a[1];
        return api.findMany(query, { url: url });
    };
    var _d = (0, swr_1.default)(findManyCache, findManyFetcher, {
        revalidateOnFocus: true,
        revalidateOnReconnect: true,
        shouldRetryOnError: true, // Prevent automatic retries on error
    }), isLoading = _d.isLoading, data = _d.data, error = _d.error;
    (0, react_1.useEffect)(function () {
        if (data === null || data === void 0 ? void 0 : data.data) {
            if (infiniteLoad) {
                setResources((0, lodash_1.uniqBy)(__spreadArray(__spreadArray([], resources, true), data.data, true), 'id'));
            }
            else {
                setResources((0, lodash_1.uniqBy)(data.data, 'id'));
            }
            if (data === null || data === void 0 ? void 0 : data.meta) {
                setMeta(data.meta);
                setPage(data.meta.page);
                setPerPage(data.meta.per_page);
                setTotalCount(data.meta.total_count);
                setNumPages(data.meta.num_pages);
            }
        }
    }, [data]);
    (0, react_1.useEffect)(function () {
        if (error) {
            handleErrors(error);
        }
    }, [error]);
    (0, react_1.useEffect)(function () {
        setLoading(isLoading);
    }, [isLoading]);
    var findMany = function (queryParams, opts) {
        if (queryParams === void 0) { queryParams = {}; }
        if (opts === void 0) { opts = {}; }
        return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (url === null || url === void 0 ? void 0 : url.includes('undefined')) {
                    console.log('Error: the URL contains undefined', url);
                    return [2 /*return*/];
                }
                if (opts === null || opts === void 0 ? void 0 : opts.loadMore) {
                    setInfiniteLoad(true);
                }
                else {
                    setInfiniteLoad(false);
                }
                setQuery(queryParams);
                setFindManyCache([url, __assign(__assign({}, query), queryParams)]);
                return [2 /*return*/];
            });
        });
    };
    var loadMore = function () { return __awaiter(void 0, void 0, void 0, function () {
        var nextPage;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    nextPage = page + 1;
                    return [4 /*yield*/, findMany(__assign(__assign({}, query), { page: nextPage }), {
                            loadMore: true
                        })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); };
    var reloadMany = function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, findMany(query)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    }); };
    var paginate = function (page) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, findMany(__assign(__assign({}, query), { page: page }))];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    }); };
    var sort = function (sortBy, sortDirection) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, findMany(__assign(__assign({}, query), { sort_by: sortBy, sort_direction: sortDirection }))];
                case 1: return [2 /*return*/, _a.sent()];
            }
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
    var addReferences = function (sourceId, targetIds) { return __awaiter(void 0, void 0, void 0, function () {
        var options;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    options = { url: url };
                    return [4 /*yield*/, loadingWrapper(function () {
                            return api.addReferences(sourceId, targetIds, options);
                        })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    }); };
    var removeReferences = function (sourceId, targetIds) { return __awaiter(void 0, void 0, void 0, function () {
        var options;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    options = { url: url };
                    return [4 /*yield*/, loadingWrapper(function () {
                            return api.removeReferences(sourceId, targetIds, options);
                        })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    }); };
    var updateReferencePositions = function (id, sorted) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, api.updateReferencePositions(id, sorted, apiParams)];
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
    var setNestedValue = function (obj, path, value) {
        var keys = path.split('.');
        var current = obj;
        keys.forEach(function (key, index) {
            if (index === keys.length - 1) {
                current[key] = value;
            }
            else {
                if (!current[key]) {
                    current[key] = {};
                }
                current = current[key];
            }
        });
    };
    var handleChange = function (ev) {
        var name = ev.target.name;
        var value = ev.target.type === 'checkbox' ? ev.target.checked : ev.target.value;
        var updatedResource = __assign({}, resource);
        setNestedValue(updatedResource, name, value);
        setResource(updatedResource);
    };
    var handleDataChange = function (ev) {
        var name = ev.target.name;
        var value = ev.target.type === 'checkbox' ? ev.target.checked : ev.target.value;
        setResource(function (prev) { return (0, helpers_1.changeDocumentValue)(prev, name, value); });
    };
    var loadingWrapper = function (apiMethod) { return __awaiter(void 0, void 0, void 0, function () {
        var res, e_1;
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
                    e_1 = _b.sent();
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
    (0, react_1.useEffect)(function () {
        if (selected) {
            setSelectedIds(selected.map(function (item) { return item.id; }));
        }
    }, [selected]);
    var delayedLoading = (0, _1.useDelayedLoading)({
        loading: loading
    }).loading;
    return {
        url: url,
        name: name,
        loading: loading,
        delayedLoading: delayedLoading,
        setLoading: setLoading,
        loadingWrapper: loadingWrapper,
        errors: errors,
        setErrors: setErrors,
        handleChange: handleChange,
        handleDataChange: handleDataChange,
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
        addReferences: addReferences,
        removeReferences: removeReferences,
        updateReferencePositions: updateReferencePositions,
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
        infiniteLoad: infiniteLoad,
        setInfiniteLoad: setInfiniteLoad,
        findManyCache: findManyCache,
        setFindManyCache: setFindManyCache,
        findOneCache: findOneCache,
        setFindOneCache: setFindOneCache,
        selected: selected,
        selectedIds: selectedIds,
        setSelected: setSelected,
        setSelectedIds: setSelectedIds,
        handleSelect: handleSelect,
        handleClear: handleClear,
        openShow: openShow,
        setOpenShow: setOpenShow,
        openEdit: openEdit,
        setOpenEdit: setOpenEdit,
        openDelete: openDelete,
        setOpenDelete: setOpenDelete,
        openComments: openComments,
        setOpenComments: setOpenComments,
        openReferences: openReferences,
        setOpenReferences: setOpenReferences,
    };
};
exports.default = useResourceContext;
