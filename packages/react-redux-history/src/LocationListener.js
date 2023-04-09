"use strict";
exports.__esModule = true;
exports.LocationListener = exports.useLocationListener = void 0;
var react_1 = require("react");
var react_redux_1 = require("react-redux");
var types_1 = require("./types");
var useLocationListener = function (history) {
    var dispatch = (0, react_redux_1.useDispatch)();
    (0, react_1.useLayoutEffect)(function () {
        var onLocationChanged = function (_a) {
            var location = _a.location, action = _a.action;
            dispatch({
                type: types_1.LOCATION_CHANGED,
                payload: {
                    location: location,
                    type: action
                }
            });
        };
        return history.listen(onLocationChanged);
    }, [history, dispatch]);
};
exports.useLocationListener = useLocationListener;
var LocationListener = function (_a) {
    var history = _a.history;
    (0, exports.useLocationListener)(history);
    return null;
};
exports.LocationListener = LocationListener;
