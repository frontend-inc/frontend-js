"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var context_1 = require("../context");
var swr_1 = __importDefault(require("swr"));
var cookies_next_1 = require("cookies-next");
var useAuthUser = function (params) {
    var url = (params || {}).url;
    var _a = (0, react_1.useContext)(context_1.ApiContext), api = _a.api, authCookie = _a.authCookie;
    var _b = (0, react_1.useContext)(context_1.AuthContext), currentUser = _b.currentUser, setCurrentUser = _b.setCurrentUser, setAuthenticated = _b.setAuthenticated, setToken = _b.setToken;
    var fetcher = function (url) { return api.fetchMe({ url: url }); };
    var _c = (0, swr_1.default)(url, fetcher), data = _c.data, isLoading = _c.isLoading;
    (0, react_1.useEffect)(function () {
        var _a, _b;
        if (data === null || data === void 0 ? void 0 : data.data) {
            setCurrentUser(data.data);
            setAuthenticated(true);
            setToken((_a = data.data) === null || _a === void 0 ? void 0 : _a.jwt_token);
            (0, cookies_next_1.setCookie)(authCookie, (_b = data.data) === null || _b === void 0 ? void 0 : _b.jwt_token);
        }
    }, [data]);
    return {
        currentUser: currentUser,
        isLoading: isLoading
    };
};
exports.default = useAuthUser;
