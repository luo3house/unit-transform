"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createUnitTransform = createUnitTransform;

var _utils = require("./utils");

function createUnitTransform(options) {
  var _options$scale;

  var scale = (_options$scale = options.scale) !== null && _options$scale !== void 0 ? _options$scale : 0;
  var unit = options.unit;
  var transform = {
    formatScale: function formatScale(anyTemp) {
      return (0, _utils.formatDecimal)(anyTemp, scale);
    },
    isC: function isC() {
      return unit === 'c';
    },
    isF: function isF() {
      return unit === 'f';
    },
    c2val: function c2val(c) {
      return Math.floor(transform.formatScale(c) * Math.pow(10, scale));
    },
    val2c: function val2c(c) {
      return transform.formatScale(parseFloat("".concat(parseInt("".concat(c), 10) / Math.pow(10, scale))));
    },
    c2f: function c2f(c) {
      return transform.formatScale(parseFloat("".concat(parseFloat("".concat(c * 1.8 + 32)))));
    },
    f2c: function f2c(f) {
      return transform.formatScale(parseFloat("".concat(parseFloat("".concat((f - 32) / 1.8)))));
    },
    val2cf: function val2cf(val) {
      return transform.c2cf(transform.val2c(val));
    },
    c2cf: function c2cf(c) {
      return unit === 'c' ? transform.formatScale(c) : transform.c2f(c);
    },
    f2cf: function f2cf(f) {
      return unit === 'f' ? transform.formatScale(f) : transform.f2c(f);
    },
    cf2c: function cf2c(cORf) {
      return unit === 'c' ? transform.formatScale(cORf) : transform.f2c(cORf);
    },
    cf2f: function cf2f(cORf) {
      return unit === 'f' ? transform.formatScale(cORf) : transform.c2f(cORf);
    },
    cf2val: function cf2val(cORf) {
      return unit === 'c' ? transform.c2val(cORf) : transform.c2val(transform.f2c(cORf));
    },
    tempUnitString: function tempUnitString() {
      return unit === 'c' ? '℃' : '℉';
    },
    displayTempByC: function displayTempByC(c) {
      return "".concat(transform.c2cf(c), " ").concat(transform.tempUnitString());
    },
    displayTempByVal: function displayTempByVal(val) {
      return transform.displayTempByC(transform.val2c(val));
    }
  };
  return transform;
}
//# sourceMappingURL=unit-transform.js.map