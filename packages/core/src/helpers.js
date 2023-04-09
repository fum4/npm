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
exports.findIndex = exports.parseLocation = exports.injectQuery = exports.isBackAction = exports.isForwardAction = exports.isNextRoute = exports.isPreviousRoute = exports.isSameRoute = void 0;
var isSameRoute = function (location, history, currentIndex) {
    var _a;
    return ((location === null || location === void 0 ? void 0 : location.key)
        ? ((_a = history[currentIndex]) === null || _a === void 0 ? void 0 : _a.key) === location.key
        : isEqual(pickBy(location, Boolean), pickBy(history[currentIndex], Boolean)));
};
exports.isSameRoute = isSameRoute;
var isPreviousRoute = function (location, history, currentIndex) {
    var _a;
    return ((location === null || location === void 0 ? void 0 : location.key)
        ? ((_a = history[currentIndex - 1]) === null || _a === void 0 ? void 0 : _a.key) === location.key
        : isEqual(pickBy(location, Boolean), pickBy(history[currentIndex - 1], Boolean)));
};
exports.isPreviousRoute = isPreviousRoute;
var isNextRoute = function (location, history, currentIndex) {
    var _a;
    return ((location === null || location === void 0 ? void 0 : location.key)
        ? ((_a = history[currentIndex + 1]) === null || _a === void 0 ? void 0 : _a.key) === location.key
        : isEqual(pickBy(location, Boolean), pickBy(history[currentIndex + 1], Boolean)));
};
exports.isNextRoute = isNextRoute;
var isForwardAction = function (location, history, currentIndex) { return (!!history.slice(currentIndex + 1).find(function (historyEntry) { return historyEntry.key === location.key; })); };
exports.isForwardAction = isForwardAction;
var isBackAction = function (location, history, currentIndex) { return (!!history.slice(0, currentIndex).find(function (historyEntry) { return historyEntry.key === location.key; })); };
exports.isBackAction = isBackAction;
var injectQuery = function (location) {
    var searchParams = new URLSearchParams(location.search);
    var query = Object.fromEntries(searchParams);
    return __assign(__assign({}, location), { query: query });
};
exports.injectQuery = injectQuery;
var parseLocation = function (location) { return (__assign(__assign({}, (0, exports.injectQuery)(location)), (!location.state && { state: {} }))); };
exports.parseLocation = parseLocation;
var findIndex = function (array, predicate) {
    if (Array.isArray(array)) {
        var targetKey = Object.keys(predicate)[0];
        var targetValue = predicate[targetKey];
        for (var i = 0; i < array.length; i++) {
            if (array[i][targetKey] === targetValue) {
                return i;
            }
        }
    }
};
exports.findIndex = findIndex;
var pickBy = function (object, predicate) { return (Object.entries(object)
    .filter(function (entry) { return predicate(object[entry[0]]); })
    .reduce(function (acc, entry) {
    var _a;
    return (__assign(__assign({}, acc), (_a = {}, _a[entry[0]] = entry[1], _a)));
}, {})); };
var isEqual = function (firstObject, secondObject) {
    var firstObjectEntries = Object.entries(firstObject);
    var secondObjectEntries = Object.entries(secondObject);
    var result = true;
    if (firstObjectEntries.length !== secondObjectEntries.length) {
        return false;
    }
    Object.entries(firstObject).forEach(function (_a) {
        var key = _a[0], value = _a[1];
        if (value && typeof value === 'object') {
            var propertyResult = isEqual(firstObject[key], secondObject[key]);
            if (!propertyResult) {
                result = false;
            }
        }
        else {
            if (firstObject[key] !== secondObject[key]) {
                result = false;
            }
        }
    });
    return result;
};
