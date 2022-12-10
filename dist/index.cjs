'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/** 保留N位小数，不执行四舍五入，保留0位小数=取整 */ function formatDecimal(dec, fixes) {
    var scale = Math.pow(10, fixes);
    var atoi = function(val) {
        return parseInt("".concat(val), 10) || 0;
    };
    return atoi(dec * scale) / scale;
}

function createUnitTransform(options) {
    var _options_scale;
    var scale = (_options_scale = options.scale) !== null && _options_scale !== void 0 ? _options_scale : 0;
    var unit = options.unit;
    var transform = {
        formatScale: function(anyTemp) {
            return formatDecimal(anyTemp, scale);
        },
        isC: function() {
            return unit === "c";
        },
        isF: function() {
            return unit === "f";
        },
        c2val: function(c) {
            return Math.floor(transform.formatScale(c) * Math.pow(10, scale));
        },
        val2c: function(c) {
            return transform.formatScale(parseFloat("".concat(parseInt("".concat(c), 10) / Math.pow(10, scale))));
        },
        c2f: function(c) {
            return transform.formatScale(parseFloat("".concat(parseFloat("".concat(c * 1.8 + 32)))));
        },
        f2c: function(f) {
            return transform.formatScale(parseFloat("".concat(parseFloat("".concat((f - 32) / 1.8)))));
        },
        val2cf: function(val) {
            return transform.c2cf(transform.val2c(val));
        },
        c2cf: function(c) {
            return unit === "c" ? transform.formatScale(c) : transform.c2f(c);
        },
        f2cf: function(f) {
            return unit === "f" ? transform.formatScale(f) : transform.f2c(f);
        },
        cf2c: function(cORf) {
            return unit === "c" ? transform.formatScale(cORf) : transform.f2c(cORf);
        },
        cf2f: function(cORf) {
            return unit === "f" ? transform.formatScale(cORf) : transform.c2f(cORf);
        },
        cf2val: function(cORf) {
            return unit === "c" ? transform.c2val(cORf) : transform.c2val(transform.f2c(cORf));
        },
        tempUnitString: function() {
            return unit === "c" ? "℃" : "℉";
        },
        displayTempByC: function(c) {
            return "".concat(transform.c2cf(c), " ").concat(transform.tempUnitString());
        },
        displayTempByVal: function(val) {
            return transform.displayTempByC(transform.val2c(val));
        }
    };
    return transform;
}

exports.createUnitTransform = createUnitTransform;
exports.formatDecimal = formatDecimal;
