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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
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
exports.ApiQuery = void 0;
var ApiQuery = /** @class */ (function () {
    function ApiQuery(params) {
        if (params === void 0) { params = {
            sort_by: 'id',
            sort_direction: 'desc',
            page: 1,
            per_page: 20,
        }; }
        this.isValidFilter = function (filter) {
            if (typeof filter !== 'object') {
                return false;
            }
            var operator = Object.keys(filter)[0];
            var value = filter[operator];
            return (typeof filter === 'object' &&
                operator !== null &&
                operator !== '' &&
                operator !== undefined &&
                value !== null &&
                value !== '' &&
                value !== undefined);
        };
        var sort_by = params.sort_by, sort_direction = params.sort_direction, keywords = params.keywords, filters = params.filters, page = params.page, per_page = params.per_page, rest = __rest(params, ["sort_by", "sort_direction", "keywords", "filters", "page", "per_page"]);
        this._sort_by = sort_by || 'id';
        this._sort_direction = sort_direction || 'desc';
        this._keywords = keywords;
        this._filters = filters || {
            AND: [],
            OR: [],
        };
        this._page = page;
        this._per_page = per_page;
        this._params = rest;
    }
    Object.defineProperty(ApiQuery.prototype, "page", {
        get: function () {
            return this._page;
        },
        set: function (value) {
            if (typeof value === 'number' && value > 0) {
                this._page = value;
            }
            else {
                throw new Error('Page must be a positive number.');
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ApiQuery.prototype, "per_page", {
        get: function () {
            return this._per_page;
        },
        set: function (value) {
            if (typeof value === 'number' && value > 0) {
                this._per_page = value;
            }
            else {
                throw new Error('Per_page must be a positive number.');
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ApiQuery.prototype, "keywords", {
        get: function () {
            return this._keywords;
        },
        set: function (value) {
            if (typeof value === 'string') {
                this._keywords = value;
            }
            else {
                throw new Error('Keywords must be a string.');
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ApiQuery.prototype, "filters", {
        get: function () {
            return this._filters;
        },
        set: function (value) {
            if (typeof value === 'object') {
                this._filters = value;
            }
            else {
                throw new Error('Filters must be an object.');
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ApiQuery.prototype, "sort_by", {
        get: function () {
            return this._sort_by;
        },
        set: function (value) {
            if (typeof value === 'string') {
                this._sort_by = value;
            }
            else {
                throw new Error('Sort_by must be a string.');
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ApiQuery.prototype, "sort_direction", {
        get: function () {
            return this._sort_direction;
        },
        set: function (value) {
            if (typeof value === 'string') {
                this._sort_direction = value;
            }
            else {
                throw new Error('Sort_direction must be a string.');
            }
        },
        enumerable: false,
        configurable: true
    });
    ApiQuery.prototype.where = function (searchParams) {
        var _a = searchParams || {}, _b = _a.sort_by, sort_by = _b === void 0 ? 'id' : _b, _c = _a.sort_direction, sort_direction = _c === void 0 ? 'desc' : _c, keywords = _a.keywords, filters = _a.filters, _d = _a.page, page = _d === void 0 ? 1 : _d, _e = _a.per_page, per_page = _e === void 0 ? 20 : _e, rest = __rest(_a, ["sort_by", "sort_direction", "keywords", "filters", "page", "per_page"]);
        this.transformFilterArray(filters);
        this._sort_by = sort_by || this._sort_by;
        this._sort_direction = sort_direction || this._sort_direction;
        this._keywords = keywords || this._keywords;
        this._filters = filters || this._filters;
        this._page = page || this._page;
        this._per_page = per_page || this._per_page;
        this._params = rest || {};
        return this;
    };
    ApiQuery.prototype.filter = function (filters) {
        this._filters = filters;
        return this;
    };
    ApiQuery.prototype.sort = function (field, direction) {
        if (direction === void 0) { direction = null; }
        if (field === this.sort_by && !direction) {
            if (this._sort_direction === 'asc') {
                this._sort_direction = 'desc';
            }
            else {
                this._sort_direction = 'asc';
            }
        }
        else {
            this._sort_by = field;
            this._sort_direction = direction || 'asc';
        }
        return this;
    };
    ApiQuery.prototype.search = function (query) {
        this._keywords = query;
        return this;
    };
    ApiQuery.prototype.eq = function (field, value) {
        var _a;
        this.AND_filter((_a = {}, _a[field] = { eq: value }, _a));
        return this;
    };
    ApiQuery.prototype.neq = function (field, value) {
        var _a;
        this.AND_filter((_a = {}, _a[field] = { neq: value }, _a));
        return this;
    };
    ApiQuery.prototype.gt = function (field, value) {
        var _a;
        this.AND_filter((_a = {}, _a[field] = { gt: value }, _a));
        return this;
    };
    ApiQuery.prototype.gte = function (field, value) {
        var _a;
        this.AND_filter((_a = {}, _a[field] = { gte: value }, _a));
        return this;
    };
    ApiQuery.prototype.lt = function (field, value) {
        var _a;
        this.AND_filter((_a = {}, _a[field] = { lt: value }, _a));
        return this;
    };
    ApiQuery.prototype.lte = function (field, value) {
        var _a;
        this.AND_filter((_a = {}, _a[field] = { lte: value }, _a));
        return this;
    };
    ApiQuery.prototype.in = function (field, value) {
        var _a;
        this.AND_filter((_a = {}, _a[field] = { in: value }, _a));
        return this;
    };
    ApiQuery.prototype.nin = function (field, value) {
        var _a;
        this.AND_filter((_a = {}, _a[field] = { nin: value }, _a));
        return this;
    };
    ApiQuery.prototype.orEq = function (field, value) {
        var _a;
        this.OR_filter((_a = {}, _a[field] = { eq: value }, _a));
        return this;
    };
    ApiQuery.prototype.orNeq = function (field, value) {
        var _a;
        this.OR_filter((_a = {}, _a[field] = { neq: value }, _a));
        return this;
    };
    ApiQuery.prototype.orLt = function (field, value) {
        var _a;
        this.OR_filter((_a = {}, _a[field] = { lt: value }, _a));
        return this;
    };
    ApiQuery.prototype.orLte = function (field, value) {
        var _a;
        this.OR_filter((_a = {}, _a[field] = { lte: value }, _a));
        return this;
    };
    ApiQuery.prototype.orGt = function (field, value) {
        var _a;
        this.OR_filter((_a = {}, _a[field] = { gt: value }, _a));
        return this;
    };
    ApiQuery.prototype.orGte = function (field, value) {
        var _a;
        this.OR_filter((_a = {}, _a[field] = { gte: value }, _a));
        return this;
    };
    ApiQuery.prototype.orIn = function (field, value) {
        var _a;
        this.OR_filter((_a = {}, _a[field] = { in: value }, _a));
        return this;
    };
    ApiQuery.prototype.orNin = function (field, value) {
        var _a;
        this.OR_filter((_a = {}, _a[field] = { nin: value }, _a));
        return this;
    };
    ApiQuery.prototype.AND_filter = function (filter) {
        this._filters = __assign(__assign({}, this._filters), { AND: __spreadArray(__spreadArray([], (this._filters['AND'] || []), true), [filter], false) });
        return this;
    };
    ApiQuery.prototype.OR_filter = function (filter) {
        this._filters = __assign(__assign({}, this._filters), { OR: __spreadArray(__spreadArray([], (this._filters['OR'] || []), true), [filter], false) });
        return this;
    };
    ApiQuery.prototype.url = function () {
        var _this = this;
        var searchParams = {
            page: this._page || 1,
            per_page: this._per_page || 20,
        };
        if (this._sort_by && this._sort_direction) {
            searchParams = __assign(__assign({}, searchParams), { order: this._sort_by + ":" + this._sort_direction });
        }
        if (this._keywords && this._keywords.length > 0) {
            searchParams = __assign(__assign({}, searchParams), { keywords: this._keywords });
        }
        var andFilters = [];
        var orFilters = [];
        if (typeof this._filters === 'object' &&
            Object.keys(this._filters).length > 0) {
            Object.keys(this._filters).forEach(function (where) {
                var andOrfilters = _this._filters[where];
                andOrfilters === null || andOrfilters === void 0 ? void 0 : andOrfilters.forEach(function (filter) {
                    if (_this.isValidFilter(filter)) {
                        var field = Object.keys(filter)[0];
                        var operator = Object.keys(filter[field])[0];
                        var value = filter[field][operator];
                        if (Array.isArray(value)) {
                            value = "[" + value.join(',') + "]";
                        }
                        if (where == 'AND') {
                            andFilters.push(field + ":" + operator + ":" + value);
                        }
                        if (where == 'OR') {
                            orFilters.push(field + ":" + operator + ":" + value);
                        }
                    }
                });
            });
        }
        var andOrFilters = [];
        if (andFilters.length > 0) {
            andOrFilters.push("and(" + andFilters.join(',') + ")");
        }
        if (orFilters.length > 0) {
            andOrFilters.push("or(" + orFilters.join(',') + ")");
        }
        searchParams = __assign(__assign({}, searchParams), { filters: andOrFilters.join('') });
        searchParams = __assign(__assign({}, searchParams), (this._params || {}));
        var url = [];
        for (var key in searchParams) {
            if (searchParams[key]) {
                url.push(key + "=" + searchParams[key]);
            }
        }
        return url.join('&');
    };
    ApiQuery.prototype.parseURL = function (routerParams) {
        if (routerParams === void 0) { routerParams = {}; }
        var keywords = routerParams.keywords, page = routerParams.page, per_page = routerParams.per_page, filterParams = routerParams.filters, order = routerParams.order;
        var _a = order ? order.split(':') : [], sort_by = _a[0], sort_direction = _a[1];
        var filters = {};
        // Split the string into "AND" and "OR" parts
        if (filterParams) {
            var andPart = filterParams.match(/and\((.*?)\)/);
            var andFilterArray = [];
            var orPart = filterParams.match(/or\((.*?)\)$/);
            var orFilterArray = [];
            // Parse AND filters
            if (andPart) {
                var andFilters = andPart[1];
                // Regular expression to also handle
                // filters=and(id:in:[1,2,3])
                var filterRegex = /,(?![^\[]*\])/;
                andFilterArray = andFilters.split(filterRegex).map(function (filter) {
                    var _a, _b;
                    var _c = filter.split(':'), field = _c[0], operator = _c[1], value = _c[2];
                    if (operator == 'in' || operator == 'nin') {
                        value = value.replace('[', '').replace(']', '').split(',');
                    }
                    return _a = {},
                        _a[field] = (_b = {}, _b[operator] = value, _b),
                        _a;
                });
                filters = __assign(__assign({}, filters), { AND: andFilterArray });
            }
            // Parse OR filters
            if (orPart) {
                var orFilters = orPart[1];
                orFilterArray = orFilters.split(',').map(function (filter) {
                    var _a, _b;
                    var _c = filter.split(':'), field = _c[0], operator = _c[1], value = _c[2];
                    return _a = {},
                        _a[field] = (_b = {}, _b[operator] = value, _b),
                        _a;
                });
                filters = __assign(__assign({}, filters), { OR: orFilterArray });
            }
        }
        this._keywords = keywords || '';
        this._page = page || 1;
        this._per_page = per_page || 20;
        this._sort_by = sort_by || 'id';
        this._sort_direction = sort_direction || 'desc';
        this._filters = filters || {};
        return this;
    };
    ApiQuery.prototype.transformFilterArray = function (filters) {
        var _a, _b, _c, _d;
        if (Array.isArray(filters)) {
            for (var _i = 0, filters_1 = filters; _i < filters_1.length; _i++) {
                var filter = filters_1[_i];
                var where = filter.where, field = filter.field, operator = filter.operator, value = filter.value;
                if (where !== 'AND' && where !== 'OR') {
                    throw new Error('Filter must include AND or OR.');
                }
                if (where === 'AND') {
                    this.AND_filter((_a = {},
                        _a[field] = (_b = {}, _b[operator] = value, _b),
                        _a));
                }
                if (where === 'OR') {
                    this.OR_filter((_c = {},
                        _c[field] = (_d = {}, _d[operator] = value, _d),
                        _c));
                }
            }
        }
    };
    ApiQuery.prototype.query = function () {
        return {
            keywords: this._keywords,
            page: this._page,
            per_page: this._per_page,
            sort_by: this._sort_by,
            sort_direction: this._sort_direction,
            filters: this._filters,
        };
    };
    return ApiQuery;
}());
exports.ApiQuery = ApiQuery;
