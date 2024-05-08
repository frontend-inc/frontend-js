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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var context_1 = require("../context");
var useResource_1 = __importDefault(require("./useResource"));
var useTeams = function () {
    var _a = (0, react_1.useContext)(context_1.ApiContext), api = _a.api, url = _a.url;
    var _b = (0, useResource_1.default)({
        name: 'team',
        url: url + "/api/v1/auth/teams"
    }), loading = _b.loading, delayedLoading = _b.delayedLoading, errors = _b.errors, team = _b.resource, teams = _b.resources, findTeam = _b.findOne, findTeams = _b.findMany, updateTeam = _b.update, createTeam = _b.create, deleteTeam = _b.destroy, setTeam = _b.setResource, handleChange = _b.handleChange, handleChangePage = _b.handleChangePage, reloadTeams = _b.reloadMany, query = _b.query, setQuery = _b.setQuery, page = _b.page, numPages = _b.numPages, perPage = _b.perPage, totalCount = _b.totalCount, sortBy = _b.sortBy, sortDirection = _b.sortDirection, handleSort = _b.handleSort, loadMore = _b.loadMore, loadingWrapper = _b.loadingWrapper, paginate = _b.paginate;
    var selectTeam = function (teamId) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, loadingWrapper(function () { return api.post(url + "/api/v1/" + teamId + "/select_team"); })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    }); };
    return {
        loading: loading,
        delayedLoading: delayedLoading,
        errors: errors,
        team: team,
        teams: teams,
        findTeam: findTeam,
        findTeams: findTeams,
        updateTeam: updateTeam,
        createTeam: createTeam,
        deleteTeam: deleteTeam,
        selectTeam: selectTeam,
        setTeam: setTeam,
        handleChange: handleChange,
        handleChangePage: handleChangePage,
        reloadTeams: reloadTeams,
        query: query,
        setQuery: setQuery,
        page: page,
        numPages: numPages,
        perPage: perPage,
        totalCount: totalCount,
        sortBy: sortBy,
        sortDirection: sortDirection,
        handleSort: handleSort,
        loadMore: loadMore,
        loadingWrapper: loadingWrapper,
        paginate: paginate,
    };
};
exports.default = useTeams;
