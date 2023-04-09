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
var toolkit_1 = require("@reduxjs/toolkit");
var initialState_1 = require("./initialState");
var persist_1 = require("./persist");
var helpers_1 = require("./helpers");
var types_1 = require("./types");
var createRouterSlice = function (history, _a) {
    var storageKey = _a.storageKey, storageLimit = _a.storageLimit;
    return ((0, toolkit_1.createSlice)({
        name: 'router',
        initialState: (0, initialState_1["default"])(history, { storageKey: storageKey, storageLimit: storageLimit }),
        reducers: {
            push: function (state, action) {
                var location = (0, helpers_1.parseLocation)(action.payload);
                state.currentIndex += 1;
                state.action = types_1.HistoryAction.Push;
                state.locationHistory.splice(state.currentIndex, state.locationHistory.length, location);
                (0, persist_1.persistOnPageHide)((0, toolkit_1.current)(state), { storageKey: storageKey, storageLimit: storageLimit });
            },
            replace: function (state, action) {
                var _a, _b;
                var location = (0, helpers_1.parseLocation)(action.payload);
                // Copy skip flags when replacing in case they are not overwritten by new state
                var _c = state.locationHistory[state.currentIndex].state, skipBack = _c.skipBack, skipForward = _c.skipForward;
                if (!((_a = location.state) === null || _a === void 0 ? void 0 : _a.skipBack) && skipBack) {
                    location.state = __assign(__assign({}, location.state), { skipBack: skipBack });
                }
                if (!((_b = location.state) === null || _b === void 0 ? void 0 : _b.skipForward) && skipForward) {
                    location.state = __assign(__assign({}, location.state), { skipForward: skipForward });
                }
                state.action = types_1.HistoryAction.Replace;
                state.locationHistory.splice(state.currentIndex, 1, location);
                delete state.locationHistory[state.currentIndex].state.forceRender;
                (0, persist_1.persistOnPageHide)((0, toolkit_1.current)(state), { storageKey: storageKey, storageLimit: storageLimit });
            },
            back: function (state, action) {
                var _a;
                var _b = action.payload, nextLocationIndex = _b.nextLocationIndex, _c = _b.isSkipping, isSkipping = _c === void 0 ? false : _c;
                if (isSkipping) {
                    // When skipping back we also want to skip forward at some point
                    var skipForward = state.currentIndex - nextLocationIndex;
                    state.locationHistory[nextLocationIndex].state = __assign(__assign({}, state.locationHistory[nextLocationIndex].state), { skipForward: skipForward });
                }
                else {
                    // Delete flag when no longer accurate
                    (_a = state.locationHistory[nextLocationIndex].state) === null || _a === void 0 ? true : delete _a.skipForward;
                }
                state.isSkipping = isSkipping;
                state.action = types_1.HistoryAction.Back;
                state.currentIndex = nextLocationIndex;
                delete state.locationHistory[nextLocationIndex].state.forceRender;
                (0, persist_1.persistOnPageHide)((0, toolkit_1.current)(state), { storageKey: storageKey, storageLimit: storageLimit });
            },
            forward: function (state, action) {
                var _a;
                var _b = action.payload, nextLocationIndex = _b.nextLocationIndex, _c = _b.isSkipping, isSkipping = _c === void 0 ? false : _c;
                if (isSkipping) {
                    // When skipping forward we also want to skip back at some point
                    var skipBack = nextLocationIndex - state.currentIndex;
                    state.locationHistory[nextLocationIndex].state = __assign(__assign({}, state.locationHistory[nextLocationIndex].state), { skipBack: skipBack });
                }
                else {
                    // Delete flag when no longer accurate
                    (_a = state.locationHistory[nextLocationIndex].state) === null || _a === void 0 ? true : delete _a.skipBack;
                }
                state.isSkipping = isSkipping;
                state.action = types_1.HistoryAction.Forward;
                state.currentIndex = nextLocationIndex;
                delete state.locationHistory[nextLocationIndex].state.forceRender;
                (0, persist_1.persistOnPageHide)((0, toolkit_1.current)(state), { storageKey: storageKey, storageLimit: storageLimit });
            },
            setSkipping: function (state, action) {
                state.isSkipping = action.payload;
                (0, persist_1.persistOnPageHide)((0, toolkit_1.current)(state), { storageKey: storageKey, storageLimit: storageLimit });
            }
        }
    }));
};
exports["default"] = createRouterSlice;
