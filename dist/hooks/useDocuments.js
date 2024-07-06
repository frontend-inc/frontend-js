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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var useResourceContext_1 = __importDefault(require("./useResourceContext"));
var helpers_1 = require("../helpers");
var useDocuments = function () {
    var _a = (0, useResourceContext_1.default)(), setResource = _a.setResource, rest = __rest(_a, ["setResource"]);
    var handleDataChange = function (ev) {
        var name = ev.target.name;
        var value = ev.target.type === 'checkbox' ?
            ev.target.checked :
            ev.target.value;
        setResource(function (prev) {
            return (0, helpers_1.changeDocumentValue)(prev, name, value);
        });
    };
    return __assign({ handleDataChange: handleDataChange, filterDocumentLinks: helpers_1.filterDocumentLinks, getDocumentValue: helpers_1.getDocumentValue, flattenDocument: helpers_1.flattenDocument, flattenDocuments: helpers_1.flattenDocuments, setResource: setResource }, rest);
};
exports.default = useDocuments;
