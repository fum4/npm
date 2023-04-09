"use strict";
exports.__esModule = true;
exports.LOCATION_CHANGE_REQUEST = exports.LOCATION_CHANGED = exports.ActionTypes = exports.HistoryAction = void 0;
var HistoryAction;
(function (HistoryAction) {
    HistoryAction["Push"] = "PUSH";
    HistoryAction["Back"] = "BACK";
    HistoryAction["Forward"] = "FORWARD";
    HistoryAction["Replace"] = "REPLACE";
})(HistoryAction = exports.HistoryAction || (exports.HistoryAction = {}));
/**
 * @deprecated - use `HistoryAction` instead
 */
var ActionTypes;
(function (ActionTypes) {
    ActionTypes["Push"] = "PUSH";
    ActionTypes["Back"] = "BACK";
    ActionTypes["Forward"] = "FORWARD";
    ActionTypes["Replace"] = "REPLACE";
})(ActionTypes = exports.ActionTypes || (exports.ActionTypes = {}));
exports.LOCATION_CHANGED = '@@router/LOCATION_CHANGED';
exports.LOCATION_CHANGE_REQUEST = '@@router/LOCATION_CHANGE_REQUEST';
