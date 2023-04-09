"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
exports.__esModule = true;
exports.configureRouterHistory = void 0;
var middleware_1 = require("./middleware");
var slice_1 = require("./slice");
var configureRouterHistory = function (history, _a) {
    var _b = _a === void 0 ? {} : _a, _c = _b.storageKey, storageKey = _c === void 0 ? 'routerState' : _c, _d = _b.storageLimit, storageLimit = _d === void 0 ? Infinity : _d;
    var _e = (0, slice_1["default"])(history, { storageKey: storageKey, storageLimit: storageLimit }), reducer = _e.reducer, actions = _e.actions;
    // @ts-ignore
    var middleware = (0, middleware_1["default"])(history, actions);
    return {
        routerReducer: reducer,
        routerMiddleware: middleware
    };
};
exports.configureRouterHistory = configureRouterHistory;
__exportStar(require("./actions"), exports);
__exportStar(require("./selectors"), exports);
__exportStar(require("./LocationListener"), exports);
__exportStar(require("./types"), exports);
