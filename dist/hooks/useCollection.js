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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var useResource_1 = __importDefault(require("./useResource"));
var useCollection = function (params) {
    var name = (params || {}).name;
    var resp = (0, useResource_1.default)({
        name: 'documents',
        url: "/api/v1/cms/" + name
    });
    return __assign({}, resp);
};
exports.default = useCollection;
