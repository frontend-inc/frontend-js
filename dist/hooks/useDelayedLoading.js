"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
function useDelayedLoading(_a) {
    var loading = _a.loading, _b = _a.delay, delay = _b === void 0 ? 500 : _b, callback = _a.callback;
    var _c = (0, react_1.useState)(loading), isLoading = _c[0], setIsLoading = _c[1];
    var timerRef = (0, react_1.useRef)(null);
    (0, react_1.useEffect)(function () {
        if (loading) {
            setIsLoading(true);
            if (timerRef.current)
                clearTimeout(timerRef.current);
        }
        else {
            timerRef.current = setTimeout(function () {
                setIsLoading(false);
                if (callback)
                    callback();
            }, delay);
        }
        return function () {
            if (timerRef.current)
                clearTimeout(timerRef.current);
        };
    }, [loading, delay, callback]);
    return {
        loading: isLoading,
    };
}
exports.default = useDelayedLoading;
