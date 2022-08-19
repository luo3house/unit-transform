"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.formatDecimal = formatDecimal;

/** 保留N位小数，不执行四舍五入，保留0位小数=取整 */
function formatDecimal(dec, fixes) {
  var scale = Math.pow(10, fixes);

  var atoi = function atoi(val) {
    return parseInt("".concat(val), 10) || 0;
  };

  return atoi(dec * scale) / scale;
}
//# sourceMappingURL=utils.js.map