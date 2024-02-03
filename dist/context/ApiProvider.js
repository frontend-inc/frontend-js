"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var ApiContext_1 = __importDefault(require("./ApiContext"));
var client_1 = require("../client");
var cookies_next_1 = require("cookies-next");
var ApiProvider = function (props) {
    var _a = props || {}, url = _a.url, clientUrl = _a.clientUrl, _b = _a.authCookie, authCookie = _b === void 0 ? 'authToken' : _b, apiKey = _a.apiKey, children = _a.children;
    var fetchAuthToken = function () { return String((0, cookies_next_1.getCookie)(authCookie)); };
    var api = (0, client_1.createClient)({
        url: url,
        fetchToken: fetchAuthToken,
        apiKey: apiKey
    });
    var value = {
        url: url,
        api: api,
        apiKey: apiKey,
        clientUrl: clientUrl,
        authCookie: authCookie,
    };
    return react_1.default.createElement(ApiContext_1.default.Provider, { value: value }, children);
};
exports.default = ApiProvider;
