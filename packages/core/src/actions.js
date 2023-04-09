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
exports.back = exports.forward = exports.go = exports.replace = exports.push = void 0;
var history_1 = require("history");
var types_1 = require("./types");
var push = function (to, state) { return function (dispatch) {
    var location = typeof to === 'string' ? { pathname: to, state: state } : __assign(__assign({}, to), { state: state });
    var payload = { location: location, type: history_1.Action.Push };
    dispatch({ type: types_1.LOCATION_CHANGE_REQUEST, payload: payload });
}; };
exports.push = push;
var replace = function (to, state) { return function (dispatch) {
    var location = typeof to === 'string' ? { pathname: to, state: state } : __assign(__assign({}, to), { state: state });
    var payload = { location: location, type: history_1.Action.Replace };
    dispatch({ type: types_1.LOCATION_CHANGE_REQUEST, payload: payload });
}; };
exports.replace = replace;
var go = function (delta) { return function (dispatch) {
    var payload = { delta: delta, type: history_1.Action.Pop };
    dispatch({ type: types_1.LOCATION_CHANGE_REQUEST, payload: payload });
}; };
exports.go = go;
var forward = function () { return (0, exports.go)(1); };
exports.forward = forward;
var back = function () { return (0, exports.go)(-1); };
exports.back = back;
