"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllParentOf = exports.getAllChildrenOf = exports.getAllTypeOf = exports.getAllValueOf = exports.getAllPlaceholderOf = exports.getAllTextOf = void 0;
var react_native_1 = require("@testing-library/react-native");
var utils_1 = require("../utils");
function getAllTextOf(element) {
    var arr = [];
    (0, utils_1.processGetAllText)(element, arr);
    return arr;
}
exports.getAllTextOf = getAllTextOf;
function getAllPlaceholderOf(element) {
    var arr = [];
    (0, utils_1.processGetAllPlaceholder)(element, arr);
    return arr;
}
exports.getAllPlaceholderOf = getAllPlaceholderOf;
function getAllValueOf(element) {
    var arr = [];
    (0, utils_1.processGetAllValue)(element, arr);
    return arr;
}
exports.getAllValueOf = getAllValueOf;
function getAllTypeOf(element) {
    var arr = [];
    var json = react_native_1.screen.toJSON(element);
    (0, utils_1.processGetAllTypeOf)(json, arr);
    return arr;
}
exports.getAllTypeOf = getAllTypeOf;
function findAllChildren(element, arr) {
    var current = element.children;
    for (var _i = 0, current_1 = current; _i < current_1.length; _i++) {
        var e = current_1[_i];
        if (typeof e === "string" || typeof e.type === "string") {
            arr.push(e);
        }
        if (typeof e !== "string") {
            findAllChildren(e, arr);
        }
    }
}
function getAllChildrenOf(element) {
    if (element === null) {
        return null;
    }
    var child = [];
    findAllChildren(element, child);
    return child;
}
exports.getAllChildrenOf = getAllChildrenOf;
function findAllParent(element, arr) {
    var current = element.parent;
    while (current) {
        if (typeof current.type === "string") {
            arr.push(current);
        }
        current = current.parent;
    }
}
function getAllParentOf(element) {
    if (element === null) {
        return null;
    }
    var parent = [];
    findAllParent(element, parent);
    return parent;
}
exports.getAllParentOf = getAllParentOf;
