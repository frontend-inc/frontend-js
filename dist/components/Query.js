"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var hooks_1 = require("../hooks");
var Query = function (props) {
    var children = props.children, url = props.url, handle = props.handle, _a = props.query, query = _a === void 0 ? {} : _a, _b = props.ready, ready = _b === void 0 ? true : _b;
    var _c = (0, hooks_1.useResourceContext)({
        url: url
    }), findOne = _c.findOne, findMany = _c.findMany;
    (0, react_1.useEffect)(function () {
        if (url && handle && ready) {
            findOne(handle);
        }
        else if (url && ready) {
            findMany(query);
        }
    }, [url, handle, ready]);
    return children;
};
exports.default = Query;
