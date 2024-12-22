"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var context_1 = require("../context");
var useApi = function () {
    var _a = (0, react_1.useContext)(context_1.ApiContext), api = _a.api, url = _a.url, apiKey = _a.apiKey;
    return {
        api: api,
        url: url,
        apiKey: apiKey
    };
};
exports.default = useApi;
