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
exports.__esModule = true;
exports.getSessionState = exports.persistOnPageHide = void 0;
var pageHideListener;
var saveToSessionStorage = function (state, _a) {
    var storageKey = _a.storageKey, storageLimit = _a.storageLimit;
    sessionStorage.setItem(storageKey, JSON.stringify(__assign(__assign({}, state), { currentIndex: Math.min(state.currentIndex, storageLimit - 1 - (state.locationHistory.length - 1 - state.currentIndex)), locationHistory: state.locationHistory.slice(-storageLimit) })));
};
var persistOnPageHide = function (state, _a) {
    var storageKey = _a.storageKey, storageLimit = _a.storageLimit;
    if (storageLimit) {
        if (pageHideListener) {
            window.removeEventListener('pagehide', pageHideListener);
        }
        pageHideListener = function () { return saveToSessionStorage(state, { storageKey: storageKey, storageLimit: storageLimit }); };
        window.addEventListener('pagehide', pageHideListener, { once: true });
    }
};
exports.persistOnPageHide = persistOnPageHide;
var getSessionState = function (storageKey) {
    var sessionRouterState;
    try {
        var serializedSessionRouterState = sessionStorage.getItem(storageKey);
        sessionRouterState = serializedSessionRouterState && JSON.parse(serializedSessionRouterState);
        if (sessionRouterState) {
            var indexOutOfBounds = sessionRouterState.currentIndex < 0
                || sessionRouterState.currentIndex >= sessionRouterState.locationHistory.length;
            return sessionRouterState.locationHistory.length && !indexOutOfBounds ? sessionRouterState : null;
        }
    }
    catch (e) {
        return null;
    }
    return null;
};
exports.getSessionState = getSessionState;
