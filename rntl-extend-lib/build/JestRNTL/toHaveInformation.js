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
exports.toHaveValue = exports.toHaveProps = exports.toIncludeComponent = exports.toHaveType = exports.toHavePlaceholder = exports.toHaveText = void 0;
var getAllInformation_1 = require("../GetInformation/getAllInformation");
var utils_1 = require("../utils");
var GetInformation_1 = require("../GetInformation");
function toHaveText(received, threshold) {
    var receivedArray = (0, getAllInformation_1.getAllTextOf)(received);
    var pass = false;
    if (Array.isArray(threshold)) {
        pass = (0, utils_1.receivedToIncludeThreshold)(receivedArray, threshold);
    }
    else {
        pass = (0, utils_1.receivedToIncludeThreshold)(receivedArray, [threshold]);
    }
    if (pass) {
        return {
            message: function () { return "Expected ".concat(received, " to have text ").concat(threshold); },
            pass: true,
        };
    }
    else {
        return {
            message: function () { return "Expected ".concat(received, " not to have text ").concat(threshold); },
            pass: false,
        };
    }
}
exports.toHaveText = toHaveText;
function toHavePlaceholder(received, threshold) {
    var receivedArray = (0, getAllInformation_1.getAllPlaceholderOf)(received);
    var pass = false;
    if (Array.isArray(threshold)) {
        pass = (0, utils_1.receivedToIncludeThreshold)(receivedArray, threshold);
    }
    else {
        pass = (0, utils_1.receivedToIncludeThreshold)(receivedArray, [threshold]);
    }
    if (pass) {
        return {
            message: function () { return "Expected ".concat(received, " to have placeholder ").concat(threshold); },
            pass: true,
        };
    }
    else {
        return {
            message: function () {
                return "Expected ".concat(received, " not to have placeholder ").concat(threshold);
            },
            pass: false,
        };
    }
}
exports.toHavePlaceholder = toHavePlaceholder;
function toHaveType(received, threshold) {
    var receivedArray = (0, getAllInformation_1.getAllTypeOf)(received);
    var pass = false;
    if (Array.isArray(threshold)) {
        pass = (0, utils_1.receivedToIncludeThreshold)(receivedArray, threshold);
    }
    else {
        pass = (0, utils_1.receivedToIncludeThreshold)(receivedArray, [threshold]);
    }
    if (pass) {
        return {
            message: function () { return "Expected ".concat(received, " to have type ").concat(threshold); },
            pass: true,
        };
    }
    else {
        return {
            message: function () { return "Expected ".concat(received, " not to have type ").concat(threshold); },
            pass: false,
        };
    }
}
exports.toHaveType = toHaveType;
function toIncludeComponent(received, threshold) {
    var pass = false;
    var parent = (0, GetInformation_1.getParentOf)(threshold);
    while (parent) {
        if (this.equals(received, parent)) {
            pass = true;
            parent = null;
        }
        else {
            parent = (0, GetInformation_1.getParentOf)(parent);
        }
    }
    if (pass) {
        return {
            message: function () { return "Expected ".concat(received, " to be parent of ").concat(threshold); },
            pass: true,
        };
    }
    else {
        return {
            message: function () { return "Expected ".concat(received, " to be not parent of ").concat(threshold); },
            pass: false,
        };
    }
}
exports.toIncludeComponent = toIncludeComponent;
function toHaveProps(received, threshold) {
    var pass = false;
    var obj1 = (0, GetInformation_1.getPropsOf)(received);
    var obj = __assign({}, threshold);
    for (var key in threshold) {
        if (this.equals(obj1[key], obj[key])) {
            delete obj[key];
        }
    }
    pass = Object.keys(obj).length === 0;
    if (pass) {
        return {
            message: function () { return "Expected ".concat(received, " to have prop ").concat(threshold); },
            pass: true,
        };
    }
    else {
        return {
            message: function () { return "Expected ".concat(received, " to be not have props ").concat(threshold); },
            pass: false,
        };
    }
}
exports.toHaveProps = toHaveProps;
function toHaveValue(received, threshold) {
    var pass = false;
    if (typeof threshold === "object") {
        var r = JSON.stringify((0, getAllInformation_1.getAllValueOf)(received));
        var arr = __spreadArray([], threshold, true);
        for (var i = arr.length - 1; i >= 0; i--) {
            if (r.includes(JSON.stringify(arr[i]))) {
                arr.splice(i, 1);
            }
        }
        pass = arr.length === 0;
    }
    else {
        var r = JSON.stringify((0, getAllInformation_1.getAllValueOf)(received));
        pass = r.includes(threshold.toString());
    }
    if (pass) {
        return {
            message: function () { return "Expected ".concat(received, " to have value ").concat(threshold); },
            pass: true,
        };
    }
    else {
        return {
            message: function () { return "Expected ".concat(received, " to be not have value ").concat(threshold); },
            pass: false,
        };
    }
}
exports.toHaveValue = toHaveValue;
