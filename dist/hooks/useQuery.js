"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var context_1 = require("../context");
var useResource_1 = __importDefault(require("./useResource"));
var useQuery = function (params) {
    var _a = params || {}, name = _a.name, _url = _a.url;
    var _b = (0, react_1.useContext)(context_1.QueryContext), loading = _b.loading, setLoading = _b.setLoading, delayedLoading = _b.delayedLoading, setDelayedLoading = _b.setDelayedLoading, url = _b.url, setUrl = _b.setUrl, query = _b.query, setQuery = _b.setQuery, resources = _b.resources, setResources = _b.setResources;
    var _c = (0, useResource_1.default)({
        name: name,
        url: _url || url,
    }), _loading = _c.loading, _delayedLoading = _c.delayedLoading, loadingWrapper = _c.loadingWrapper, _resources = _c.resources, findMany = _c.findMany, reloadMany = _c.reloadMany, updateMany = _c.updateMany, deleteMany = _c.deleteMany, findLinks = _c.findLinks, updatePositions = _c.updatePositions, _query = _c.query, _setQuery = _c.setQuery, meta = _c.meta, page = _c.page, perPage = _c.perPage, totalCount = _c.totalCount, numPages = _c.numPages, numResults = _c.numResults, sort = _c.sort, paginate = _c.paginate, loadMore = _c.loadMore;
    (0, react_1.useEffect)(function () {
        setLoading(_loading);
    }, [_loading]);
    (0, react_1.useEffect)(function () {
        setDelayedLoading(_delayedLoading);
    }, [_delayedLoading]);
    (0, react_1.useEffect)(function () {
        setQuery(_query);
    }, [_query]);
    (0, react_1.useEffect)(function () {
        setResources(_resources);
    }, [_resources]);
    (0, react_1.useEffect)(function () {
        if (_url) {
            setUrl(_url);
        }
    }, [_url]);
    return {
        url: url,
        loading: loading,
        setLoading: setLoading,
        delayedLoading: delayedLoading,
        setDelayedLoading: setDelayedLoading,
        loadingWrapper: loadingWrapper,
        resources: resources,
        setResources: setResources,
        findMany: findMany,
        reloadMany: reloadMany,
        updateMany: updateMany,
        deleteMany: deleteMany,
        findLinks: findLinks,
        updatePositions: updatePositions,
        query: query,
        setQuery: setQuery,
        meta: meta,
        page: page,
        perPage: perPage,
        totalCount: totalCount,
        numPages: numPages,
        numResults: numResults,
        sort: sort,
        paginate: paginate,
        loadMore: loadMore
    };
};
exports.default = useQuery;
