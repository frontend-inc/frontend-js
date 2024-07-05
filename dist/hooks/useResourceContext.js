"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var context_1 = require("../context");
var useResource_1 = __importDefault(require("./useResource"));
var useResourceContext = function (params) {
    var _a = params || {}, name = _a.name, _url = _a.url;
    var _b = (0, react_1.useContext)(context_1.ResourceContext), loading = _b.loading, setLoading = _b.setLoading, delayedLoading = _b.delayedLoading, setDelayedLoading = _b.setDelayedLoading, errors = _b.errors, setErrors = _b.setErrors, url = _b.url, setUrl = _b.setUrl, query = _b.query, setQuery = _b.setQuery, resource = _b.resource, resources = _b.resources, setResource = _b.setResource, setResources = _b.setResources;
    var _c = (0, useResource_1.default)({
        name: name,
        url: _url,
    }), _loading = _c.loading, _delayedLoading = _c.delayedLoading, loadingWrapper = _c.loadingWrapper, _errors = _c.errors, handleChange = _c.handleChange, handleErrors = _c.handleErrors, _resource = _c.resource, _resources = _c.resources, findOne = _c.findOne, findMany = _c.findMany, reloadMany = _c.reloadMany, save = _c.save, update = _c.update, create = _c.create, destroy = _c.destroy, updateMany = _c.updateMany, deleteMany = _c.deleteMany, publish = _c.publish, unpublish = _c.unpublish, findLinks = _c.findLinks, addLinks = _c.addLinks, removeLinks = _c.removeLinks, addAttachment = _c.addAttachment, removeAttachment = _c.removeAttachment, updatePositions = _c.updatePositions, _query = _c.query, _setQuery = _c.setQuery, meta = _c.meta, page = _c.page, perPage = _c.perPage, totalCount = _c.totalCount, numPages = _c.numPages, numResults = _c.numResults, sort = _c.sort, paginate = _c.paginate, loadMore = _c.loadMore;
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
        if (_url) {
            setUrl(_url);
        }
    }, [_url]);
    return {
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
