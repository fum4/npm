"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
exports.__esModule = true;
var history_1 = require("history");
var selectors_1 = require("./selectors");
var helpers_1 = require("./helpers");
var types_1 = require("./types");
var createRouterMiddleware = function (historyApi, sliceActions) { return (function (store) { return function (next) { return function (action) {
    // Listen for history changes and update the store
    if (action.type === types_1.LOCATION_CHANGED) {
        var _a = action.payload, type = _a.type, location_1 = _a.location;
        switch (type) {
            case history_1.Action.Push:
                // @ts-ignore
                return next(sliceActions.push(location_1));
            case history_1.Action.Replace:
                // @ts-ignore
                return next(sliceActions.replace(location_1));
            case history_1.Action.Pop: {
                var state = store.getState();
                var history_2 = (0, selectors_1.selectLocationHistory)(state);
                var isSkipping = (0, selectors_1.selectIsSkipping)(state);
                var currentIndex = (0, selectors_1.selectCurrentIndex)(state);
                var _b = (0, selectors_1.selectCurrentLocationState)(state), skipForward = _b.skipForward, skipBack = _b.skipBack;
                if ((0, helpers_1.isForwardAction)(location_1, history_2, currentIndex)) {
                    var nextLocationIndex = skipForward ? (
                    // Check if target location index is out of bounds
                    currentIndex + skipForward < history_2.length
                        ? currentIndex + skipForward
                        : history_2.length - 1) : (
                    // location.key is undefined when manually changing the URL!
                    location_1.key
                        ? (0, helpers_1.findIndex)(history_2, { key: location_1.key })
                        : currentIndex + 1);
                    // How many routes left to skip in order to reach the target one.
                    // Keep in mind that one transition has already been made by clicking the forward button
                    var routesToSkip = skipForward ? nextLocationIndex - currentIndex - 1 : 0;
                    if (routesToSkip) {
                        historyApi.go(routesToSkip);
                    }
                    return next(sliceActions.forward({
                        isSkipping: Boolean(routesToSkip),
                        nextLocationIndex: nextLocationIndex
                    }));
                }
                if ((0, helpers_1.isBackAction)(location_1, history_2, currentIndex)) {
                    var nextLocationIndex = skipBack ? (
                    // Check if target location index is out of bounds
                    currentIndex >= skipBack
                        ? currentIndex - skipBack
                        : 0) : (
                    // location.key is undefined when manually changing the URL!
                    location_1.key
                        ? (0, helpers_1.findIndex)(history_2, { key: location_1.key })
                        : currentIndex - 1);
                    // How many routes left to skip in order to reach the target one.
                    // Keep in mind that one transition has already been made by clicking the back button
                    var routesToSkip = skipBack ? nextLocationIndex - currentIndex + 1 : 0;
                    if (routesToSkip) {
                        historyApi.go(routesToSkip);
                    }
                    return next(sliceActions.back({
                        isSkipping: Boolean(routesToSkip),
                        nextLocationIndex: nextLocationIndex
                    }));
                }
                if (isSkipping) {
                    return setTimeout(function () { return next(sliceActions.setSkipping(false)); });
                }
            }
        }
    }
    // Listen for location change requests and update history
    if (action.type === types_1.LOCATION_CHANGE_REQUEST) {
        var _c = action.payload, type = _c.type, location_2 = _c.location, delta = _c.delta;
        switch (type) {
            case history_1.Action.Push: {
                var state = location_2.state, locationWithoutState = __rest(location_2, ["state"]);
                return historyApi.push(locationWithoutState, state);
            }
            case history_1.Action.Replace: {
                var state = location_2.state, locationWithoutState = __rest(location_2, ["state"]);
                return historyApi.replace(locationWithoutState, state);
            }
            case history_1.Action.Pop: {
                return historyApi.go(delta);
            }
        }
    }
    return next(action);
}; }; }); };
exports["default"] = createRouterMiddleware;
