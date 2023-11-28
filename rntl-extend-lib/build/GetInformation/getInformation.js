"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEnabledInfo = exports.getChildrenOf = exports.getParentOf = exports.getPropsOf = exports.getTypeOf = exports.getValueOf = exports.getStyleOf = void 0;
var utils_1 = require("../utils");
function getStyleOf(element) {
    var style = element.props.style;
    if (Array.isArray(style)) {
        var mergedObject = {};
        var arrayProcessing = (0, utils_1.extractObjects)(style);
        for (var _i = 0, arrayProcessing_1 = arrayProcessing; _i < arrayProcessing_1.length; _i++) {
            var obj = arrayProcessing_1[_i];
            Object.assign(mergedObject, obj);
        }
        return mergedObject;
    }
    else {
        return style;
    }
}
exports.getStyleOf = getStyleOf;
function getValueOf(element) {
    return element.props.value;
}
exports.getValueOf = getValueOf;
function getTypeOf(element) {
    // return element.type.displayName || element.type.name || element.type;
    return element.type.toString();
}
exports.getTypeOf = getTypeOf;
function getPropsOf(element, nameOfProps) {
    if (nameOfProps === undefined) {
        return element.props;
    }
    else {
        return element.props[nameOfProps];
    }
}
exports.getPropsOf = getPropsOf;
function getParentOf(element) {
    if (element === null) {
        return null;
    }
    var current = element.parent;
    while (current) {
        if (typeof current.type === "string") {
            return current;
        }
        current = current.parent;
    }
    return null;
}
exports.getParentOf = getParentOf;
function findChildren(element, arr) {
    var current = element.children;
    for (var _i = 0, current_1 = current; _i < current_1.length; _i++) {
        var e = current_1[_i];
        if (typeof e === "string" || typeof e.type === "string") {
            arr.push(e);
        }
        else {
            findChildren(e, arr);
        }
    }
}
function getChildrenOf(element) {
    if (element === null) {
        return null;
    }
    var child = [];
    findChildren(element, child);
    return child;
}
exports.getChildrenOf = getChildrenOf;
function getEnabledInfo(element) {
    var _a, _b, _c, _d, _e, _f;
    var result = false;
    if (getTypeOf(element) === "TextInput" &&
        ((_a = element === null || element === void 0 ? void 0 : element.props) === null || _a === void 0 ? void 0 : _a.editable) === false) {
        result = false;
    }
    else {
        result = !(!!((_b = element === null || element === void 0 ? void 0 : element.props) === null || _b === void 0 ? void 0 : _b.disabled) ||
            !!((_d = (_c = element === null || element === void 0 ? void 0 : element.props) === null || _c === void 0 ? void 0 : _c.accessibilityState) === null || _d === void 0 ? void 0 : _d.disabled) ||
            !!((_f = (_e = element === null || element === void 0 ? void 0 : element.props) === null || _e === void 0 ? void 0 : _e.accessibilityStates) === null || _f === void 0 ? void 0 : _f.includes("disabled")));
    }
    return result;
}
exports.getEnabledInfo = getEnabledInfo;
