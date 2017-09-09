(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "jsutils"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var jsutils_1 = require("jsutils");
    var sqrt = Math.sqrt, PI = Math.PI, exp = Math.exp, log = Math.log;
    var harmonicNumber = function (n, m) {
        if (m === void 0) { m = 1; }
        return jsutils_1.range(n).reduce(function (prev, curr) { return prev + 1 / Math.pow((curr + 1), m); }, 0);
    };
    var PDFS = {
        normal: function (_a) {
            var _b = _a.mean, mean = _b === void 0 ? 0 : _b, _c = _a.variance, variance = _c === void 0 ? 1 : _c;
            return function normal(x) {
                return exp(-(Math.pow((x - mean), 2)) / (2 * variance)) / sqrt(2 * variance * PI);
            };
        },
        symmetricNormalBimodal: function (_a) {
            var xs = _a.xs, _b = _a.mean, mean = _b === void 0 ? 0 : _b, _c = _a.variance, variance = _c === void 0 ? 1 : _c;
            return function symmetricNormalBimodal(x) {
                return (PDFS.normal({ mean: mean, variance: variance })(x) +
                    PDFS.normal({ mean: xs[xs.length - 1] - mean, variance: variance })(x)) / 2;
            };
        },
        symmetricNormalTrimodal: function (_a) {
            var xs = _a.xs, _b = _a.mean, mean = _b === void 0 ? 0 : _b, _c = _a.variance, variance = _c === void 0 ? 1 : _c;
            return function symmetricNormalTrimodal(x) {
                return (PDFS.normal({ mean: mean, variance: variance })(x) +
                    PDFS.normal({ mean: xs[xs.length - 1] / 2, variance: variance })(x) +
                    PDFS.normal({ mean: xs[xs.length - 1] - mean, variance: variance })(x)) / 3;
            };
        },
        logNormal: function (_a) {
            var _b = _a.mean, mean = _b === void 0 ? 0 : _b, _c = _a.variance, variance = _c === void 0 ? 1 : _c;
            return function logNormal(x) {
                return exp(-(Math.pow((log(x) - mean), 2)) / (2 * variance)) / x / sqrt(variance * 2 * PI);
            };
        },
        zipf: function (_a) {
            var _b = _a.s, s = _b === void 0 ? 1 : _b;
            return function zipf(x) {
                return 1 / Math.pow((x + 1), s) / harmonicNumber(x + 1);
            };
        },
        uniform: function (_a) {
            var count = _a.count;
            return function uniform(x) {
                return 1 / count;
            };
        },
        uniformBimodal: function (_a) {
            var count = _a.count;
            return function uniformBimodal(x) {
                return (x < count / 2 ? 2 : 1) / count;
            };
        },
        uniformTrimodal: function (_a) {
            var count = _a.count;
            return function uniformTrimodal(x) {
                return (x < count / 3 ? 3 : x < 2 * count / 3 ? 2 : 1) / count;
            };
        },
    };
    exports.default = PDFS;
});

