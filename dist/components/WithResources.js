"use strict";
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
var hooks_1 = require("../hooks");
var WithResources = function (props) {
    var render = (props || {}).render;
    var _a = (0, hooks_1.useResourceContext)(), resources = _a.resources, rest = __rest(_a, ["resources"]);
    return (resources === null || resources === void 0 ? void 0 : resources.map(function (resource, idx) { return render(resource, idx, rest); }));
};
exports.default = WithResources;
