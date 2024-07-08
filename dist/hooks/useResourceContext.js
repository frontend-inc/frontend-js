"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var context_1 = require("../context");
var useResource_1 = __importDefault(require("./useResource"));
var useResourceContext = function () {
    var _a = (0, react_1.useContext)(context_1.ResourceContext), url = _a.url, name = _a.name, loading = _a.loading, setLoading = _a.setLoading, delayedLoading = _a.delayedLoading, setDelayedLoading = _a.setDelayedLoading, errors = _a.errors, setErrors = _a.setErrors, query = _a.query, setQuery = _a.setQuery, meta = _a.meta, setMeta = _a.setMeta, page = _a.page, setPage = _a.setPage, perPage = _a.perPage, setPerPage = _a.setPerPage, numPages = _a.numPages, setNumPages = _a.setNumPages, numResults = _a.numResults, setNumResults = _a.setNumResults, totalCount = _a.totalCount, setTotalCount = _a.setTotalCount, resource = _a.resource, resources = _a.resources, setResource = _a.setResource, setResources = _a.setResources;
    var _b = (0, useResource_1.default)({
        name: name,
        url: url
    }), _loading = _b.loading, _delayedLoading = _b.delayedLoading, loadingWrapper = _b.loadingWrapper, _errors = _b.errors, handleChange = _b.handleChange, handleErrors = _b.handleErrors, _resource = _b.resource, _resources = _b.resources, findOne = _b.findOne, findMany = _b.findMany, reloadMany = _b.reloadMany, save = _b.save, update = _b.update, create = _b.create, destroy = _b.destroy, updateMany = _b.updateMany, deleteMany = _b.deleteMany, publish = _b.publish, unpublish = _b.unpublish, findLinks = _b.findLinks, addLinks = _b.addLinks, removeLinks = _b.removeLinks, addAttachment = _b.addAttachment, removeAttachment = _b.removeAttachment, updatePositions = _b.updatePositions, _query = _b.query, _setQuery = _b.setQuery, _meta = _b.meta, _page = _b.page, _perPage = _b.perPage, _totalCount = _b.totalCount, _numPages = _b.numPages, _numResults = _b.numResults, sort = _b.sort, paginate = _b.paginate, loadMore = _b.loadMore;
    (0, react_1.useEffect)(function () {
        setLoading(_loading);
    }, [_loading]);
    (0, react_1.useEffect)(function () {
        setDelayedLoading(_delayedLoading);
    }, [_delayedLoading]);
    (0, react_1.useEffect)(function () {
        setErrors(_errors);
    }, [_errors]);
    (0, react_1.useEffect)(function () {
        setQuery(_query);
    }, [_query]);
    (0, react_1.useEffect)(function () {
        setResource(_resource);
    }, [_resource]);
    (0, react_1.useEffect)(function () {
        setResources(_resources);
    }, [_resources]);
    (0, react_1.useEffect)(function () {
        setMeta(_meta);
    }, [_meta]);
    (0, react_1.useEffect)(function () {
        setPage(_page);
    }, [_page]);
    (0, react_1.useEffect)(function () {
        setPerPage(_perPage);
    }, [_perPage]);
    (0, react_1.useEffect)(function () {
        setTotalCount(_totalCount);
    }, [_totalCount]);
    (0, react_1.useEffect)(function () {
        setNumPages(_numPages);
    }, [_numPages]);
    (0, react_1.useEffect)(function () {
        setNumResults(_numResults);
    }, [_numResults]);
    return {
        url: url,
        name: name,
        loading: loading,
        setLoading: setLoading,
        delayedLoading: delayedLoading,
        setDelayedLoading: setDelayedLoading,
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
        findLinks: findLinks,
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
        numResults: numResults,
        sort: sort,
        paginate: paginate,
        loadMore: loadMore
    };
};
exports.default = useResourceContext;
