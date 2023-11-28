"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toBeEnable = exports.toBeDisable = exports.toMatchType = exports.toMatchStyle = void 0;
var GetInformation_1 = require("../GetInformation");
function toMatchStyle(received, threshold) {
    var pass = false;
    var styleOfReceived = (0, GetInformation_1.getStyleOf)(received);
    pass = this.equals(styleOfReceived, threshold);
    if (pass) {
        return {
            message: function () { return "Expected ".concat(received, " have style ").concat(threshold); },
            pass: true,
        };
    }
    else {
        return {
            message: function () { return "Expected ".concat(received, " have not style ").concat(threshold); },
            pass: false,
        };
    }
}
exports.toMatchStyle = toMatchStyle;
function toMatchType(received, threshold) {
    var pass = false;
    var typeOfReceived = (0, GetInformation_1.getTypeOf)(received);
    pass = typeOfReceived === threshold;
    if (pass) {
        return {
            message: function () { return "Expected ".concat(received, " to be of type ").concat(threshold); },
            pass: true,
        };
    }
    else {
        return {
            message: function () { return "Expected ".concat(received, " not of type ").concat(threshold); },
            pass: false,
        };
    }
}
exports.toMatchType = toMatchType;
function checkDisable(received) {
    var _a, _b, _c, _d, _e, _f;
    var pass = false;
    if ((0, GetInformation_1.getTypeOf)(received) === "TextInput" &&
        ((_a = received === null || received === void 0 ? void 0 : received.props) === null || _a === void 0 ? void 0 : _a.editable) === false) {
        pass = true;
    }
    else {
        pass =
            !!((_b = received === null || received === void 0 ? void 0 : received.props) === null || _b === void 0 ? void 0 : _b.disabled) ||
                !!((_d = (_c = received === null || received === void 0 ? void 0 : received.props) === null || _c === void 0 ? void 0 : _c.accessibilityState) === null || _d === void 0 ? void 0 : _d.disabled) ||
                !!((_f = (_e = received === null || received === void 0 ? void 0 : received.props) === null || _e === void 0 ? void 0 : _e.accessibilityStates) === null || _f === void 0 ? void 0 : _f.includes("disabled"));
    }
    return pass;
}
function toBeDisable(received) {
    var pass = checkDisable(received);
    if (pass) {
        return {
            message: function () { return "Expected ".concat(received, " to be disable"); },
            pass: true,
        };
    }
    else {
        return {
            message: function () { return "Expected ".concat(received, " not disable "); },
            pass: false,
        };
    }
}
exports.toBeDisable = toBeDisable;
function toBeEnable(received) {
    var pass = !checkDisable(received);
    if (pass) {
        return {
            message: function () { return "Expected ".concat(received, " to be enable"); },
            pass: true,
        };
    }
    else {
        return {
            message: function () { return "Expected ".concat(received, " not enable "); },
            pass: false,
        };
    }
}
exports.toBeEnable = toBeEnable;
