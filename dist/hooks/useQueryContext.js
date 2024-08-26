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
var swr_1 = __importDefault(require("swr"));
var context_1 = require("../context");
var useQueryContext = function () {
    var api = (0, react_1.useContext)(context_1.ApiContext).api;
    var _a = (0, react_1.useContext)(context_1.ResourceContext), url = _a.url, loading = _a.loading, setLoading = _a.setLoading, errors = _a.errors, setErrors = _a.setErrors, resources = _a.resources, setResources = _a.setResources, meta = _a.meta, page = _a.page, perPage = _a.perPage, numPages = _a.numPages, totalCount = _a.totalCount, setNumPages = _a.setNumPages, setMeta = _a.setMeta, setPage = _a.setPage, setPerPage = _a.setPerPage, setTotalCount = _a.setTotalCount;
    //const cache = (url && defaultQuery) ? [url, defaultQuery] : null
    var fetcher = function (_a) {
        var url = _a[0], defaultQuery = _a[1];
        return api.findMany(defaultQuery, { url: url });
    };
    var _b = (0, swr_1.default)(null, fetcher, {
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
        shouldRetryOnError: false, // Prevent automatic retries on error
    }), isLoading = _b.isLoading, data = _b.data, error = _b.error, mutate = _b.mutate;
    var findMany = function (query) { return __awaiter(void 0, void 0, void 0, function () {
        var resp;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, mutate([url, query])];
                case 1:
                    resp = _a.sent();
                    console.log("Find Many", resp);
                    return [2 /*return*/, resp];
            }
        });
    }); };
    (0, react_1.useEffect)(function () {
        if (data) {
            setResources(data.data);
            if (data.meta) {
                setMeta(data.meta);
                setPage(data.meta.page);
                setPerPage(data.meta.per_page);
                setTotalCount(data.meta.total_count);
                setNumPages(data.meta.num_pages);
            }
        }
    }, [data]);
    var handleError = function (errors) {
        console.log('Errors', errors);
    };
    (0, react_1.useEffect)(function () {
        setLoading(isLoading);
    }, [isLoading]);
    (0, react_1.useEffect)(function () {
        setErrors(error);
        if (error) {
            handleError(error);
        }
    }, [error]);
    return {
        loading: loading,
        errors: errors,
        data: data,
        findMany: findMany,
        resources: resources,
        meta: meta,
        page: page,
        perPage: perPage,
        numPages: numPages,
        totalCount: totalCount,
    };
};
exports.default = useQueryContext;
