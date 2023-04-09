"use strict";
exports.__esModule = true;
var persist_1 = require("./persist");
var types_1 = require("./types");
var helpers_1 = require("./helpers");
var getInitialState = function (history, _a) {
    var storageKey = _a.storageKey, storageLimit = _a.storageLimit;
    var location = (0, helpers_1.parseLocation)(history.location);
    var defaultState = {
        action: types_1.HistoryAction.Push,
        locationHistory: [location],
        currentIndex: 0,
        isSkipping: false
    };
    var sessionRouterState = (0, persist_1.getSessionState)(storageKey);
    var initialState = sessionRouterState || defaultState;
    if (sessionRouterState) {
        var isRefresh = (0, helpers_1.isSameRoute)(location, initialState.locationHistory, initialState.currentIndex);
        if (!isRefresh) {
            var isPreviousLocation = (0, helpers_1.isPreviousRoute)(location, initialState.locationHistory, initialState.currentIndex);
            var isNextLocation = (0, helpers_1.isNextRoute)(location, initialState.locationHistory, initialState.currentIndex);
            var isNewLocation = !isPreviousLocation && !isNextLocation;
            if (isPreviousLocation) {
                initialState.currentIndex -= 1;
                initialState.action = types_1.HistoryAction.Back;
            }
            if (isNextLocation) {
                initialState.currentIndex += 1;
                initialState.action = types_1.HistoryAction.Forward;
            }
            if (isNewLocation) {
                initialState.currentIndex += 1;
                initialState.action = types_1.HistoryAction.Push;
                initialState.locationHistory.splice(initialState.currentIndex, initialState.locationHistory.length, location);
            }
        }
        initialState.isSkipping = false;
    }
    (0, persist_1.persistOnPageHide)(initialState, { storageKey: storageKey, storageLimit: storageLimit });
    return initialState;
};
exports["default"] = getInitialState;
