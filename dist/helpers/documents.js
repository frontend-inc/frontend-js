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
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterReferences = exports.changeDocumentValue = exports.getDocumentValue = exports.flattenDocument = exports.flattenDocuments = void 0;
var constants_1 = require("../constants");
var lodash_1 = require("lodash");
var flattenDocuments = function (resources) {
    return resources.map(function (resource) { return (0, exports.flattenDocument)(resource); });
};
exports.flattenDocuments = flattenDocuments;
var flattenDocument = function (resource) {
    var _a = resource || {}, data = _a.data, rest = __rest(_a, ["data"]);
    return __assign(__assign({}, data), rest);
};
exports.flattenDocument = flattenDocument;
var getDocumentValue = function (document, field) {
    var _a, _b;
    if (constants_1.REFERENCE_FIELDS.includes(field === null || field === void 0 ? void 0 : field.variant)) {
        var documents = (_b = (_a = document === null || document === void 0 ? void 0 : document.references) === null || _a === void 0 ? void 0 : _a.filter(function (d) { var _a; return ((_a = d === null || d === void 0 ? void 0 : d.target) === null || _a === void 0 ? void 0 : _a.content_type) === (field === null || field === void 0 ? void 0 : field.foreign_content_type); })) === null || _b === void 0 ? void 0 : _b.map(function (d) { return d.target; });
        return documents;
    }
    else if (constants_1.SYSTEM_FIELDS.includes(field === null || field === void 0 ? void 0 : field.name)) {
        return (0, lodash_1.get)(document, field === null || field === void 0 ? void 0 : field.name);
    }
    else {
        return (0, lodash_1.get)(document, "data.".concat(field === null || field === void 0 ? void 0 : field.name));
    }
};
exports.getDocumentValue = getDocumentValue;
var changeDocumentValue = function (document, fieldName, value) {
    var _a;
    if (!document || !fieldName)
        return null;
    var newDocument = __assign({}, document);
    if (constants_1.SYSTEM_FIELDS.includes(fieldName)) {
        newDocument[fieldName] = value;
    }
    else {
        newDocument = __assign(__assign({}, newDocument), { data: __assign(__assign({}, newDocument.data), (_a = {}, _a[fieldName] = value, _a)) });
    }
    return newDocument;
};
exports.changeDocumentValue = changeDocumentValue;
var filterReferences = function (document, contentType) {
    var _a, _b, _c;
    if (!(document === null || document === void 0 ? void 0 : document.references) || ((_a = document === null || document === void 0 ? void 0 : document.references) === null || _a === void 0 ? void 0 : _a.length) == 0 || !contentType)
        return null;
    var documents = (_c = (_b = document === null || document === void 0 ? void 0 : document.references) === null || _b === void 0 ? void 0 : _b.filter(function (reference) { var _a; return ((_a = reference === null || reference === void 0 ? void 0 : reference.target) === null || _a === void 0 ? void 0 : _a.content_type) == contentType; })) === null || _c === void 0 ? void 0 : _c.map(function (reference) { return reference === null || reference === void 0 ? void 0 : reference.target; });
    return documents;
};
exports.filterReferences = filterReferences;
