import { formatDecimal } from './utils';
export function createUnitTransfer(options) {
  var _options$scale;

  var scale = (_options$scale = options.scale) !== null && _options$scale !== void 0 ? _options$scale : 0;
  var unit = options.unit;
  var transfer = {
    formatScale: function formatScale(anyTemp) {
      return formatDecimal(anyTemp, scale);
    },
    isC: function isC() {
      return unit === 'c';
    },
    isF: function isF() {
      return unit === 'f';
    },
    c2val: function c2val(c) {
      return Math.floor(transfer.formatScale(c) * Math.pow(10, scale));
    },
    val2c: function val2c(c) {
      return transfer.formatScale(parseFloat("".concat(parseInt("".concat(c), 10) / Math.pow(10, scale))));
    },
    c2f: function c2f(c) {
      return transfer.formatScale(parseFloat("".concat(parseFloat("".concat(c * 1.8 + 32)))));
    },
    f2c: function f2c(f) {
      return transfer.formatScale(parseFloat("".concat(parseFloat("".concat((f - 32) / 1.8)))));
    },
    val2cf: function val2cf(val) {
      return transfer.c2cf(transfer.val2c(val));
    },
    c2cf: function c2cf(c) {
      return unit === 'c' ? transfer.formatScale(c) : transfer.c2f(c);
    },
    f2cf: function f2cf(f) {
      return unit === 'f' ? transfer.formatScale(f) : transfer.f2c(f);
    },
    cf2c: function cf2c(cORf) {
      return unit === 'c' ? transfer.formatScale(cORf) : transfer.f2c(cORf);
    },
    cf2f: function cf2f(cORf) {
      return unit === 'f' ? transfer.formatScale(cORf) : transfer.c2f(cORf);
    },
    cf2val: function cf2val(cORf) {
      return unit === 'c' ? transfer.c2val(cORf) : transfer.c2val(transfer.f2c(cORf));
    },
    tempUnitString: function tempUnitString() {
      return unit === 'c' ? '℃' : '℉';
    },
    displayTempByC: function displayTempByC(c) {
      return "".concat(transfer.c2cf(c), " ").concat(transfer.tempUnitString());
    },
    displayTempByVal: function displayTempByVal(val) {
      return transfer.displayTempByC(transfer.val2c(val));
    }
  };
  return transfer;
}
//# sourceMappingURL=unit-transform.js.map