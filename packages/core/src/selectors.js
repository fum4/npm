"use strict";
exports.__esModule = true;
exports.selectAction = exports.selectIsSkipping = exports.selectCurrentIndex = exports.selectNextLocation = exports.selectPreviousLocation = exports.selectCurrentLocationIndex = exports.selectCurrentLocationState = exports.selectCurrentLocation = exports.selectLocationHistory = exports.selectForceRender = exports.selectIsNewSession = exports.selectIsSkippingRoutes = exports.selectHistoryAction = void 0;
var selectHistoryAction = function (state) { return state.router.action; };
exports.selectHistoryAction = selectHistoryAction;
var selectIsSkippingRoutes = function (state) { return state.router.isSkipping; };
exports.selectIsSkippingRoutes = selectIsSkippingRoutes;
var selectIsNewSession = function (state) { return (0, exports.selectLocationHistory)(state).length === 1; };
exports.selectIsNewSession = selectIsNewSession;
var selectForceRender = function (state) { return (0, exports.selectCurrentLocationState)(state).forceRender; };
exports.selectForceRender = selectForceRender;
var selectLocationHistory = function (state) { return state.router.locationHistory; };
exports.selectLocationHistory = selectLocationHistory;
var selectCurrentLocation = function (state) { return state.router.locationHistory[state.router.currentIndex]; };
exports.selectCurrentLocation = selectCurrentLocation;
var selectCurrentLocationState = function (state) { return (0, exports.selectCurrentLocation)(state).state; };
exports.selectCurrentLocationState = selectCurrentLocationState;
var selectCurrentLocationIndex = function (state) { return state.router.currentIndex; };
exports.selectCurrentLocationIndex = selectCurrentLocationIndex;
var selectPreviousLocation = function (state) { return state.router.locationHistory[state.router.currentIndex - 1]; };
exports.selectPreviousLocation = selectPreviousLocation;
var selectNextLocation = function (state) { return state.router.locationHistory[state.router.currentIndex + 1]; };
exports.selectNextLocation = selectNextLocation;
/**
 * @deprecated - use `selectCurrentLocationIndex` instead
 */
exports.selectCurrentIndex = exports.selectCurrentLocationIndex;
/**
 * @deprecated - use `selectIsSkippingRoutes` instead
 */
exports.selectIsSkipping = exports.selectIsSkippingRoutes;
/**
 * @deprecated - use `selectHistoryAction` instead
 */
exports.selectAction = exports.selectHistoryAction;
