"use strict";

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.promise");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _readline = _interopRequireDefault(require("readline"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _default(ipt) {
  return new Promise(function (resolve) {
    var rl = _readline["default"].createInterface({
      input: process.stdin,
      output: process.stdout
    });

    rl.question(ipt, function (ans) {
      resolve(ans);
      rl.close();
    });
  });
}