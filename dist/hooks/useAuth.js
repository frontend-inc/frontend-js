"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var context_1 = require("../context");
var useResource_1 = __importDefault(require("./useResource"));
var cookies_next_1 = require("cookies-next");
var swr_1 = __importDefault(require("swr"));
var useAuth = function () {
    var _a = (0, react_1.useContext)(context_1.ApiContext), api = _a.api, authCookie = _a.authCookie;
    var url = (0, react_1.useContext)(context_1.AuthContext).serverPath;
    var showLoading = function () { return setLoading(true); };
    var hideLoading = function () { return setLoading(false); };
    var _b = (0, react_1.useContext)(context_1.AuthContext), authenticated = _b.authenticated, setAuthenticated = _b.setAuthenticated, currentUser = _b.currentUser, setCurrentUser = _b.setCurrentUser, token = _b.token, setToken = _b.setToken;
    var _c = (0, useResource_1.default)({
        url: url,
        name: 'user',
    }), errors = _c.errors, setErrors = _c.setErrors, loading = _c.loading, delayedLoading = _c.delayedLoading, setLoading = _c.setLoading, user = _c.resource, setUser = _c.setResource, handleChange = _c.handleChange, handleErrors = _c.handleErrors;
    var apiParams = {
        url: url,
        name: 'user'
    };
    var cacheKey = token ? true : false;
    var fetcher = function () { return loadingWrapper(function () { return api.fetchMe(apiParams); }); };
    (0, swr_1.default)([cacheKey], fetcher, {
        revalidateOnFocus: true,
        revalidateOnReconnect: true
    });
    var fetchMe = function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, loadingWrapper(function () { return api.fetchMe(apiParams); })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    }); };
    var updateMe = function (user) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, loadingWrapper(function () { return api.updateMe(user, apiParams); })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    }); };
    var login = function (user) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, loadingWrapper(function () { return api.login(user, apiParams); })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    }); };
    var signup = function (user) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, loadingWrapper(function () { return api.signup(user, apiParams); })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    }); };
    var sendPin = function (user) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, loadingWrapper(function () { return api.sendPin(user, apiParams); })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    }); };
    var verifyPin = function (email, pin) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, loadingWrapper(function () { return api.verifyPin(email, pin, apiParams); })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    }); };
    var changePassword = function (currentPassword, password, passwordConfirmation) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, loadingWrapper(function () {
                        return api.changePassword(currentPassword, password, passwordConfirmation, apiParams);
                    })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    }); };
    var sendOneTimePassword = function (user) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, loadingWrapper(function () {
                        return api.sendOneTimePassword(user, apiParams);
                    })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    }); };
    var verifyOneTimePassword = function (otp) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, loadingWrapper(function () {
                        return api.verifyOneTimePassword(otp, apiParams);
                    })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    }); };
    var forgotPassword = function (user) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, loadingWrapper(function () { return api.forgotPassword(user, apiParams); })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    }); };
    var resetPassword = function (email, password, passwordConfirmation, changePasswordToken) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, loadingWrapper(function () {
                        return api
                            .resetPassword(email, password, passwordConfirmation, changePasswordToken, apiParams);
                    })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    }); };
    var logout = function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            (0, cookies_next_1.setCookie)(authCookie, null);
            (0, cookies_next_1.deleteCookie)(authCookie);
            setCurrentUser({});
            setAuthenticated(false);
            setToken(null);
            return [2 /*return*/];
        });
    }); };
    var googleLogin = function (accessToken) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, loadingWrapper(function () { return api.googleLogin(accessToken, apiParams); })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    }); };
    var deleteAvatar = function () { return __awaiter(void 0, void 0, void 0, function () {
        var deleteAvatarUrl;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    deleteAvatarUrl = url + '/delete_avatar';
                    return [4 /*yield*/, loadingWrapper(function () { return api.post(deleteAvatarUrl); })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    }); };
    var authenticateFromToken = function (token) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setToken(token);
                    setAuthenticated(true);
                    return [4 /*yield*/, loadingWrapper(function () { return api.authenticate(token, apiParams); })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    }); };
    var loadingWrapper = function (fn) { return __awaiter(void 0, void 0, void 0, function () {
        var resp, e_1;
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 2, 3, 4]);
                    showLoading();
                    setErrors(null);
                    return [4 /*yield*/, fn()];
                case 1:
                    resp = _c.sent();
                    if ((_a = resp === null || resp === void 0 ? void 0 : resp.data) === null || _a === void 0 ? void 0 : _a.id) {
                        setUser(resp.data);
                        setCurrentUser(resp.data);
                        if ((_b = resp.data) === null || _b === void 0 ? void 0 : _b.jwt_token) {
                            setAuthenticated(true);
                            setToken(resp.data.jwt_token);
                            (0, cookies_next_1.setCookie)(authCookie, resp.data.jwt_token);
                        }
                    }
                    else if (resp === null || resp === void 0 ? void 0 : resp.errors) {
                        handleErrors(resp === null || resp === void 0 ? void 0 : resp.errors);
                    }
                    return [2 /*return*/, resp === null || resp === void 0 ? void 0 : resp.data];
                case 2:
                    e_1 = _c.sent();
                    handleErrors(e_1);
                    return [3 /*break*/, 4];
                case 3:
                    hideLoading();
                    return [7 /*endfinally*/];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    return {
        loading: loading,
        delayedLoading: delayedLoading,
        errors: errors,
        user: user,
        setUser: setUser,
        currentUser: currentUser,
        setCurrentUser: setCurrentUser,
        fetchMe: fetchMe,
        updateMe: updateMe,
        forgotPassword: forgotPassword,
        handleChange: handleChange,
        authenticateFromToken: authenticateFromToken,
        login: login,
        logout: logout,
        signup: signup,
        changePassword: changePassword,
        resetPassword: resetPassword,
        sendPin: sendPin,
        verifyPin: verifyPin,
        sendOneTimePassword: sendOneTimePassword,
        verifyOneTimePassword: verifyOneTimePassword,
        googleLogin: googleLogin,
        deleteAvatar: deleteAvatar,
        loadingWrapper: loadingWrapper,
        authenticated: authenticated,
        token: token,
        setToken: setToken,
        authCookie: authCookie,
    };
};
exports.default = useAuth;
