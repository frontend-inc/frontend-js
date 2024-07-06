"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var context_1 = require("../context");
var useResource_1 = __importDefault(require("./useResource"));
var useQuery = function () {
    var _a = (0, react_1.useContext)(context_1.QueryContext), url = _a.url, loading = _a.loading, setLoading = _a.setLoading, delayedLoading = _a.delayedLoading, setDelayedLoading = _a.setDelayedLoading, query = _a.query, setQuery = _a.setQuery, resources = _a.resources, setResources = _a.setResources;
    var _b = (0, useResource_1.default)({
        name: 'document',
        url: url,
    }), _loading = _b.loading, _delayedLoading = _b.delayedLoading, loadingWrapper = _b.loadingWrapper, _resources = _b.resources, findMany = _b.findMany, reloadMany = _b.reloadMany, updateMany = _b.updateMany, deleteMany = _b.deleteMany, findLinks = _b.findLinks, updatePositions = _b.updatePositions, _query = _b.query, _setQuery = _b.setQuery, meta = _b.meta, page = _b.page, perPage = _b.perPage, totalCount = _b.totalCount, numPages = _b.numPages, numResults = _b.numResults, sort = _b.sort, paginate = _b.paginate, loadMore = _b.loadMore;
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
