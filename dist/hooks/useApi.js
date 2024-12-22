"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var context_1 = require("../context");
var useApi = function () {
    var _a = (0, react_1.useContext)(context_1.ApiContext), api = _a.api, apiUrl = _a.apiUrl, apiKey = _a.apiKey;
    return {
        api: api,
        apiUrl: apiUrl,
        apiKey: apiKey
    };
};
exports.default = useApi;
