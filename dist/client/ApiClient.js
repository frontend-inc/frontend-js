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
        while (_) try {
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.createClient = exports.ApiClient = void 0;
var ApiQuery_1 = require("./ApiQuery");
var RestClient_1 = require("./RestClient");
var ApiClient = /** @class */ (function () {
    function ApiClient(params) {
        var url = params.url, fetchToken = params.fetchToken, apiKey = params.apiKey, authToken = params.authToken;
        this.restClient = new RestClient_1.RestClient({
            url: url,
            fetchToken: fetchToken,
            apiKey: apiKey,
            authToken: authToken
        });
        this.init();
        return new Proxy(this, {
            get: function (target, prop) {
                if (typeof target[prop] !== 'undefined') {
                    return target[prop];
                }
                return target;
            },
        });
    }
    ApiClient.prototype.init = function () {
        this.apiQuery = new ApiQuery_1.ApiQuery();
        this.endpoint = '';
        this.payload = null;
        this.headers = {
            'Content-Type': 'application/json',
        };
        return this;
    };
    ApiClient.prototype.clearQuery = function () {
        this.apiQuery = new ApiQuery_1.ApiQuery();
        return this;
    };
    ApiClient.prototype.query = function (params) {
        this.apiQuery = new ApiQuery_1.ApiQuery(params);
        return this;
    };
    ApiClient.prototype.eq = function (field, value) {
        this.apiQuery.eq(field, value);
        return this;
    };
    ApiClient.prototype.neq = function (field, value) {
        this.apiQuery.neq(field, value);
        return this;
    };
    ApiClient.prototype.gt = function (field, value) {
        this.apiQuery.gt(field, value);
        return this;
    };
    ApiClient.prototype.gte = function (field, value) {
        this.apiQuery.gte(field, value);
        return this;
    };
    ApiClient.prototype.lt = function (field, value) {
        this.apiQuery.lt(field, value);
        return this;
    };
    ApiClient.prototype.lte = function (field, value) {
        this.apiQuery.lte(field, value);
        return this;
    };
    ApiClient.prototype.in = function (field, value) {
        this.apiQuery.in(field, value);
        return this;
    };
    ApiClient.prototype.nin = function (field, value) {
        this.apiQuery.nin(field, value);
        return this;
    };
    ApiClient.prototype.sort = function (field, direction) {
        this.apiQuery.sort(field, direction);
        return this;
    };
    ApiClient.prototype.search = function (query) {
        this.apiQuery.search(query);
        return this;
    };
    ApiClient.prototype.filter = function (filters) {
        this.apiQuery.filter(filters);
        return this;
    };
    ApiClient.prototype.page = function (page) {
        this.apiQuery.page = page;
        return this;
    };
    ApiClient.prototype.per = function (perPage) {
        this.apiQuery.per_page = perPage;
        return this;
    };
    ApiClient.prototype.findOne = function (id, options) {
        return __awaiter(this, void 0, void 0, function () {
            var url;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = (options || {}).url;
                        this.endpoint = url + "/" + id;
                        return [4 /*yield*/, this.get(this.endpoint)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ApiClient.prototype.findMany = function (searchParams, options) {
        return __awaiter(this, void 0, void 0, function () {
            var url;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = (options || {}).url;
                        this.apiQuery.where(searchParams);
                        this.endpoint = url;
                        return [4 /*yield*/, this.get(this.endpoint, this.apiQuery.url())];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ApiClient.prototype.create = function (resource, options) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, name, url;
            var _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = options || {}, name = _a.name, url = _a.url;
                        this.payload = (_b = {},
                            _b[name] = resource,
                            _b);
                        console.log("Create Payload", this.payload);
                        this.handleFormatData(name);
                        this.endpoint = url;
                        console.log("Create Format Data", resource, name, url, this.payload, this.headers, this.endpoint);
                        return [4 /*yield*/, this.post(this.endpoint, this.payload, this.headers)];
                    case 1: return [2 /*return*/, _c.sent()];
                }
            });
        });
    };
    ApiClient.prototype.update = function (resource, options) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, name, url;
            var _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = options || {}, name = _a.name, url = _a.url;
                        this.payload = (_b = {},
                            _b[name] = resource,
                            _b);
                        this.handleFormatData(name);
                        this.endpoint = url + "/" + resource.id;
                        return [4 /*yield*/, this.put(this.endpoint, this.payload, this.headers)];
                    case 1: return [2 /*return*/, _c.sent()];
                }
            });
        });
    };
    ApiClient.prototype.destroy = function (id, options) {
        return __awaiter(this, void 0, void 0, function () {
            var url;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = (options || {}).url;
                        this.endpoint = url + "/" + id;
                        return [4 /*yield*/, this.delete(this.endpoint)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ApiClient.prototype.updatePositions = function (sorted, options) {
        return __awaiter(this, void 0, void 0, function () {
            var url;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = (options || {}).url;
                        this.payload = {
                            ids: sorted.map(function (resource) { return resource.id; }),
                            positions: sorted.map(function (_, index) { return index; }),
                        };
                        this.endpoint = url + "/update_positions";
                        return [4 /*yield*/, this.post(this.endpoint, this.payload, this.headers)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ApiClient.prototype.updateLinkPositions = function (id, sorted, options) {
        return __awaiter(this, void 0, void 0, function () {
            var url;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = (options || {}).url;
                        this.payload = {
                            ids: sorted.map(function (resource) { return resource.id; }),
                            positions: sorted.map(function (_, index) { return index; }),
                        };
                        this.endpoint = url + "/" + id + "/update_link_positions";
                        return [4 /*yield*/, this.post(this.endpoint, this.payload, this.headers)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ApiClient.prototype.updateMany = function (ids, resource, options) {
        return __awaiter(this, void 0, void 0, function () {
            var url;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = (options || {}).url;
                        this.payload = {
                            ids: ids,
                            resource: resource,
                        };
                        this.endpoint = url + "/update_many";
                        return [4 /*yield*/, this.post(this.endpoint, this.payload, this.headers)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ApiClient.prototype.destroyMany = function (ids, options) {
        return __awaiter(this, void 0, void 0, function () {
            var url;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = (options || {}).url;
                        if (!Array.isArray(ids)) {
                            throw Error('Ids must be an array');
                        }
                        this.payload = {
                            ids: ids,
                        };
                        this.endpoint = url + "/delete_many";
                        return [4 /*yield*/, this.post(this.endpoint, this.payload, this.headers)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ApiClient.prototype.publish = function (ids, options) {
        return __awaiter(this, void 0, void 0, function () {
            var url;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = (options || {}).url;
                        this.endpoint = url + "/publish";
                        this.payload = {
                            ids: ids,
                        };
                        return [4 /*yield*/, this.post(this.endpoint, this.payload, this.headers)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ApiClient.prototype.unpublish = function (ids, options) {
        return __awaiter(this, void 0, void 0, function () {
            var url;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = (options || {}).url;
                        this.endpoint = url + "/unpublish";
                        this.payload = {
                            ids: ids,
                        };
                        return [4 /*yield*/, this.post(this.endpoint, this.payload, this.headers)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ApiClient.prototype.like = function (id, options) {
        return __awaiter(this, void 0, void 0, function () {
            var url;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = (options || {}).url;
                        this.endpoint = url + "/" + id + "/like";
                        return [4 /*yield*/, this.post(this.endpoint, null, this.headers)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ApiClient.prototype.unlike = function (id, options) {
        return __awaiter(this, void 0, void 0, function () {
            var url;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = (options || {}).url;
                        this.endpoint = url + "/" + id + "/unlike";
                        return [4 /*yield*/, this.post(this.endpoint, null, this.headers)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ApiClient.prototype.favorite = function (id, options) {
        return __awaiter(this, void 0, void 0, function () {
            var url;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = (options || {}).url;
                        this.endpoint = url + "/" + id + "/favorite";
                        return [4 /*yield*/, this.post(this.endpoint, null, this.headers)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ApiClient.prototype.unfavorite = function (id, options) {
        return __awaiter(this, void 0, void 0, function () {
            var url;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = (options || {}).url;
                        this.endpoint = url + "/" + id + "/unfavorite";
                        return [4 /*yield*/, this.post(this.endpoint, null, this.headers)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ApiClient.prototype.follow = function (id, options) {
        return __awaiter(this, void 0, void 0, function () {
            var url;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = (options || {}).url;
                        this.endpoint = url + "/" + id + "/follow";
                        return [4 /*yield*/, this.post(this.endpoint, null, this.headers)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ApiClient.prototype.unfollow = function (id, options) {
        return __awaiter(this, void 0, void 0, function () {
            var url;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = (options || {}).url;
                        this.endpoint = url + "/" + id + "/unfollow";
                        return [4 /*yield*/, this.post(this.endpoint, null, this.headers)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ApiClient.prototype.addLinks = function (sourceId, targetIds, options) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, name, url;
            var _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = options || {}, name = _a.name, url = _a.url;
                        this.payload = (_b = {},
                            _b[name] = {
                                ids: targetIds,
                            },
                            _b);
                        this.endpoint = url + "/" + sourceId + "/add_links";
                        return [4 /*yield*/, this.post(this.endpoint, this.payload, this.headers)];
                    case 1: return [2 /*return*/, _c.sent()];
                }
            });
        });
    };
    ApiClient.prototype.removeLinks = function (sourceId, targetIds, options) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, name, url;
            var _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = options || {}, name = _a.name, url = _a.url;
                        this.payload = (_b = {},
                            _b[name] = {
                                ids: targetIds,
                            },
                            _b);
                        this.endpoint = url + "/" + sourceId + "/remove_links";
                        return [4 /*yield*/, this.restClient.post(this.endpoint, this.payload, this.headers)];
                    case 1: return [2 /*return*/, _c.sent()];
                }
            });
        });
    };
    ApiClient.prototype.addAttachment = function (id, name, attachmentId, options) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, nameParam, url;
            var _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = options || {}, nameParam = _a.name, url = _a.url;
                        this.payload = (_b = {},
                            _b[nameParam] = {
                                name: name,
                                id: attachmentId,
                            },
                            _b);
                        this.endpoint = url + "/" + id + "/add_attachment";
                        return [4 /*yield*/, this.post(this.endpoint, this.payload, this.headers)];
                    case 1: return [2 /*return*/, _c.sent()];
                }
            });
        });
    };
    ApiClient.prototype.removeAttachment = function (id, name, options) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, nameParam, url;
            var _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = options || {}, nameParam = _a.name, url = _a.url;
                        this.payload = (_b = {},
                            _b[nameParam] = {
                                name: name,
                            },
                            _b);
                        this.endpoint = url + "/" + id + "/remove_attachment";
                        return [4 /*yield*/, this.post(this.endpoint, this.payload, this.headers)];
                    case 1: return [2 /*return*/, _c.sent()];
                }
            });
        });
    };
    ApiClient.prototype.addImage = function (id, attachmentId, options) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, name, url;
            var _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = options || {}, name = _a.name, url = _a.url;
                        this.payload = (_b = {},
                            _b[name] = {
                                id: attachmentId,
                            },
                            _b);
                        this.endpoint = url + "/" + id + "/add_image";
                        return [4 /*yield*/, this.post(this.endpoint, this.payload, this.headers)];
                    case 1: return [2 /*return*/, _c.sent()];
                }
            });
        });
    };
    ApiClient.prototype.removeImage = function (id, options) {
        return __awaiter(this, void 0, void 0, function () {
            var url;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = (options || {}).url;
                        this.payload = {};
                        this.endpoint = url + "/" + id + "/remove_image";
                        return [4 /*yield*/, this.post(this.endpoint, this.payload, this.headers)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    // Auth methods
    ApiClient.prototype.fetchMe = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var url;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = (options || {}).url;
                        this.endpoint = url + "/me";
                        return [4 /*yield*/, this.get(this.endpoint)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ApiClient.prototype.updateMe = function (user, options) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, name, url;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = options || {}, _b = _a.name, name = _b === void 0 ? 'user' : _b, url = _a.url;
                        this.payload = {
                            user: user,
                        };
                        this.handleFormatData(name);
                        this.endpoint = url + "/me";
                        return [4 /*yield*/, this.put(this.endpoint, this.payload, this.headers)];
                    case 1: return [2 /*return*/, _c.sent()];
                }
            });
        });
    };
    ApiClient.prototype.login = function (user, options) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, name, url;
            var _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _a = options || {}, _b = _a.name, name = _b === void 0 ? 'user' : _b, url = _a.url;
                        this.payload = (_c = {},
                            _c[name] = user,
                            _c);
                        this.endpoint = url + "/login";
                        return [4 /*yield*/, this.post(this.endpoint, this.payload, this.headers)];
                    case 1: return [2 /*return*/, _d.sent()];
                }
            });
        });
    };
    ApiClient.prototype.signup = function (user, options) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, name, url;
            var _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _a = options || {}, _b = _a.name, name = _b === void 0 ? 'user' : _b, url = _a.url;
                        this.payload = (_c = {},
                            _c[name] = user,
                            _c);
                        this.endpoint = url + "/signup";
                        return [4 /*yield*/, this.post(this.endpoint, this.payload, this.headers)];
                    case 1: return [2 /*return*/, _d.sent()];
                }
            });
        });
    };
    ApiClient.prototype.sendPin = function (user, options) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, name, url;
            var _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _a = options || {}, _b = _a.name, name = _b === void 0 ? 'user' : _b, url = _a.url;
                        this.payload = (_c = {},
                            _c[name] = __assign(__assign({}, user), { email: user.email }),
                            _c);
                        this.endpoint = url + "/send_pin";
                        return [4 /*yield*/, this.post(this.endpoint, this.payload, this.headers)];
                    case 1: return [2 /*return*/, _d.sent()];
                }
            });
        });
    };
    ApiClient.prototype.verifyPin = function (email, pin, options) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, name, url;
            var _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _a = options || {}, _b = _a.name, name = _b === void 0 ? 'user' : _b, url = _a.url;
                        this.payload = (_c = {},
                            _c[name] = {
                                email: email,
                                pin: pin,
                            },
                            _c);
                        this.endpoint = url + "/verify_pin";
                        return [4 /*yield*/, this.post(this.endpoint, this.payload, this.headers)];
                    case 1: return [2 /*return*/, _d.sent()];
                }
            });
        });
    };
    ApiClient.prototype.changePassword = function (currentPassword, password, passwordConfirmation, options) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, name, url;
            var _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _a = options || {}, _b = _a.name, name = _b === void 0 ? 'user' : _b, url = _a.url;
                        this.payload = (_c = {},
                            _c[name] = {
                                current_password: currentPassword,
                                password: password,
                                password_confirmation: passwordConfirmation,
                            },
                            _c);
                        this.endpoint = url + "/change_password";
                        return [4 /*yield*/, this.post(this.endpoint, this.payload, this.headers)];
                    case 1: return [2 /*return*/, _d.sent()];
                }
            });
        });
    };
    ApiClient.prototype.forgotPassword = function (user, options) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, name, url;
            var _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _a = options || {}, _b = _a.name, name = _b === void 0 ? 'user' : _b, url = _a.url;
                        this.payload = (_c = {},
                            _c[name] = __assign(__assign({}, user), { email: user.email }),
                            _c);
                        this.endpoint = url + "/send_forgot_password";
                        return [4 /*yield*/, this.post(this.endpoint, this.payload, this.headers)];
                    case 1: return [2 /*return*/, _d.sent()];
                }
            });
        });
    };
    ApiClient.prototype.googleLogin = function (accessToken, options) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, name, url;
            var _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _a = options || {}, _b = _a.name, name = _b === void 0 ? 'user' : _b, url = _a.url;
                        this.payload = (_c = {},
                            _c[name] = {
                                access_token: accessToken
                            },
                            _c);
                        this.endpoint = url + "/google_login";
                        return [4 /*yield*/, this.post(this.endpoint, this.payload, this.headers)];
                    case 1: return [2 /*return*/, _d.sent()];
                }
            });
        });
    };
    ApiClient.prototype.resetPassword = function (email, password, passwordConfirmation, changePasswordToken, options) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, name, url;
            var _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _a = options || {}, _b = _a.name, name = _b === void 0 ? 'user' : _b, url = _a.url;
                        this.payload = (_c = {},
                            _c[name] = {
                                email: email,
                                password: password,
                                password_confirmation: passwordConfirmation,
                                change_password_token: changePasswordToken,
                            },
                            _c);
                        this.endpoint = url + "/reset_password";
                        return [4 /*yield*/, this.post(this.endpoint, this.payload, this.headers)];
                    case 1: return [2 /*return*/, _d.sent()];
                }
            });
        });
    };
    ApiClient.prototype.sendOneTimePassword = function (user, options) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, name, url;
            var _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _a = options || {}, _b = _a.name, name = _b === void 0 ? 'user' : _b, url = _a.url;
                        this.payload = (_c = {},
                            _c[name] = __assign(__assign({}, user), { email: user.email }),
                            _c);
                        this.endpoint = url + "/send_one_time_password";
                        return [4 /*yield*/, this.post(this.endpoint, this.payload, this.headers)];
                    case 1: return [2 /*return*/, _d.sent()];
                }
            });
        });
    };
    ApiClient.prototype.verifyOneTimePassword = function (otp, options) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, name, url;
            var _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _a = options || {}, _b = _a.name, name = _b === void 0 ? 'user' : _b, url = _a.url;
                        this.payload = (_c = {},
                            _c[name] = {
                                one_time_password: otp,
                            },
                            _c);
                        this.endpoint = url + "/verify_one_time_password";
                        return [4 /*yield*/, this.post(this.endpoint, this.payload, this.headers)];
                    case 1: return [2 /*return*/, _d.sent()];
                }
            });
        });
    };
    ApiClient.prototype.parseURL = function (routerParams) {
        this.apiQuery.parseURL(routerParams);
        return this;
    };
    ApiClient.prototype.get = function (endpoint, params) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.init();
                        return [4 /*yield*/, this.restClient.get(endpoint, params)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ApiClient.prototype.post = function (endpoint, payload, headers) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.init();
                        return [4 /*yield*/, this.restClient.post(endpoint, payload, headers)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ApiClient.prototype.put = function (endpoint, payload, headers) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.init();
                        return [4 /*yield*/, this.restClient.put(endpoint, payload, headers)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ApiClient.prototype.delete = function (endpoint) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.init();
                        return [4 /*yield*/, this.restClient.delete(endpoint)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ApiClient.prototype.handleChange = function (resource, name, value) {
        var _a;
        return __assign(__assign({}, resource), (_a = {}, _a[name] = value, _a));
    };
    ApiClient.prototype.handleFormatData = function (name) {
        var multipart = false;
        // Check if this.payload exists and is an object
        if (!this.payload || typeof this.payload !== 'object') {
            console.error('Payload is not defined or not an object', this.payload);
            return;
        }
        // Check if this.payload[name] exists and is an object
        if (!this.payload[name]) {
            console.error("Payload for " + name + " is not defined or not an object", this.payload);
            return;
        }
        for (var key in this.payload[name]) {
            if (this.payload[name][key] instanceof File) {
                multipart = true;
                break;
            }
        }
        if (multipart) {
            this.handleMultipartData(name);
        }
    };
    ApiClient.prototype.handleMultipartData = function (name) {
        return __awaiter(this, void 0, void 0, function () {
            var formData, formKey;
            return __generator(this, function (_a) {
                formData = new FormData();
                for (formKey in this.payload[name]) {
                    // Form objects can only send string key / value pairs
                    // so we stringify the object
                    if (this.isJsonObject(this.payload[name][formKey])) {
                        formData.append(name + "[" + formKey + "_string]", JSON.stringify(this.payload[name][formKey]));
                    }
                    else {
                        formData.append(name + "[" + formKey + "]", this.payload[name][formKey]);
                    }
                }
                this.payload = formData;
                this.headers['Content-Type'] = 'multipart/form-resource';
                return [2 /*return*/];
            });
        });
    };
    ApiClient.prototype.isJsonObject = function (value) {
        if (value instanceof File) {
            return false;
        }
        try {
            var obj = JSON.parse(JSON.stringify(value));
            return typeof obj === 'object' && obj !== null;
        }
        catch (e) {
            return false;
        }
    };
    return ApiClient;
}());
exports.ApiClient = ApiClient;
// End ApiClient
var createClient = function (params) {
    var url = params.url, fetchToken = params.fetchToken, apiKey = params.apiKey, authToken = params.authToken;
    return new ApiClient({
        url: url,
        fetchToken: fetchToken,
        apiKey: apiKey,
        authToken: authToken
    });
};
exports.createClient = createClient;
