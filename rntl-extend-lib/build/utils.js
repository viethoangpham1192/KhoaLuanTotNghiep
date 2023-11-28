"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.arrayProcess = exports.deepEqual = exports.extractObjects = exports.processGetAllTypeOf = exports.processGetAllValue = exports.processGetAllPlaceholder = exports.processGetAllText = exports.receivedToIncludeThreshold = void 0;
var GetInformation_1 = require("./GetInformation");
function arrayProcess(received, threshold, value) {
    for (var i = 0; i < received.length; i++) {
        if (received[i] === value) {
            deleteArray(received, value);
            deleteArray(threshold, value);
            break;
        }
    }
}
exports.arrayProcess = arrayProcess;
function deleteArray(array, value) {
    var indexToDelete = array.indexOf(value);
    if (indexToDelete !== -1) {
        array.splice(indexToDelete, 1);
    }
}
function receivedToIncludeThreshold(received, threshold) {
    var pass = false;
    var _received = __spreadArray([], received, true);
    var _threshold = __spreadArray([], threshold, true);
    var sizeOfReceived = _received.length;
    var sizeOfThreshold = _threshold.length;
    if (sizeOfReceived < sizeOfThreshold) {
        pass = false;
    }
    else {
        for (var i = 0; i < sizeOfThreshold; i++) {
            arrayProcess(_received, _threshold, threshold[i]);
        }
        if (_threshold.length === 0) {
            pass = true;
        }
    }
    return pass;
}
exports.receivedToIncludeThreshold = receivedToIncludeThreshold;
function processGetAllText(element, arr) {
    if (typeof element === "string") {
        arr.push(element);
        return;
    }
    else if (element && element.children) {
        var child = element.children;
        var length_1 = child.length;
        for (var i = 0; i < length_1; i++) {
            processGetAllText(child[i], arr);
        }
    }
}
exports.processGetAllText = processGetAllText;
function processGetAllPlaceholder(element, arr) {
    if (typeof element === "string") {
        return;
    }
    else if (element.type.toString() === "TextInput" &&
        element.props.placeholder) {
        arr.push(element.props.placeholder);
        return;
    }
    else if (element && element.children) {
        var child = element.children;
        var length_2 = child.length;
        for (var i = 0; i < length_2; i++) {
            processGetAllPlaceholder(child[i], arr);
        }
    }
}
exports.processGetAllPlaceholder = processGetAllPlaceholder;
function processGetAllValue(element, arr) {
    if (typeof element === "string") {
        return;
    }
    else {
        if (element &&
            element.props.value !== undefined &&
            typeof element.type === "string") {
            arr.push((0, GetInformation_1.getValueOf)(element));
        }
        var child = element.children;
        var length_3 = child.length;
        for (var i = 0; i < length_3; i++) {
            processGetAllValue(child[i], arr);
        }
    }
}
exports.processGetAllValue = processGetAllValue;
function processGetAllTypeOf(json, arr) {
    if (json && json.type) {
        arr.push(json.type);
    }
    if (json.children) {
        var child = json.children;
        var length_4 = child.length;
        for (var i = 0; i < length_4; i++) {
            processGetAllTypeOf(child[i], arr);
        }
    }
}
exports.processGetAllTypeOf = processGetAllTypeOf;
function extractObjects(arr) {
    var result = [];
    for (var _i = 0, arr_1 = arr; _i < arr_1.length; _i++) {
        var item = arr_1[_i];
        if (typeof item === "object" && !Array.isArray(item)) {
            result.push(item);
        }
        else if (Array.isArray(item)) {
            result.push.apply(result, extractObjects(item));
        }
    }
    return result;
}
exports.extractObjects = extractObjects;
function deepEqual(obj1, obj2) {
    if (obj1 === obj2) {
        return true;
    }
    if (typeof obj1 !== "object" ||
        typeof obj2 !== "object" ||
        obj1 === null ||
        obj2 === null) {
        return false;
    }
    var keys1 = Object.keys(obj1);
    var keys2 = Object.keys(obj2);
    if (keys1.length !== keys2.length) {
        return false;
    }
    for (var _i = 0, keys1_1 = keys1; _i < keys1_1.length; _i++) {
        var key = keys1_1[_i];
        if (!keys2.includes(key) || !deepEqual(obj1[key], obj2[key])) {
            return false;
        }
    }
    return true;
}
exports.deepEqual = deepEqual;
