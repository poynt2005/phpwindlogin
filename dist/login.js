"use strict";

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.promise");

require("regenerator-runtime/runtime");

var _phpwindlogin = _interopRequireDefault(require("./core/phpwindlogin"));

var _question = _interopRequireDefault(require("./question"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function main() {
  return _main.apply(this, arguments);
}

function _main() {
  _main = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var mylogger, r, captchaCode;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            mylogger = new _phpwindlogin["default"]('', '', '', '');
            console.log('取得真實位址...');
            _context.next = 5;
            return mylogger.getRealSiteURL();

          case 5:
            console.log('/------------------------------------/');
            console.log('/------------------------------------/');
            console.log('確認是否為登陸狀態...');
            _context.next = 10;
            return mylogger.isLogin();

          case 10:
            r = _context.sent;
            console.log('/------------------------------------/');
            console.log('/------------------------------------/');

            if (!r) {
              _context.next = 18;
              break;
            }

            console.log('已登錄');
            console.log('/------------------------------------/');
            console.log('/------------------------------------/');
            return _context.abrupt("return");

          case 18:
            console.log('還未登錄，正在執行登錄手續...');
            console.log('/------------------------------------/');
            console.log('/------------------------------------/');
            console.log('正在下載Captcha...');
            _context.next = 24;
            return mylogger.getCaptcha();

          case 24:
            r = _context.sent;
            console.log('/------------------------------------/');
            console.log('/------------------------------------/');
            console.log('請輸入Captcha...');
            _context.next = 30;
            return (0, _question["default"])('輸入後回車...');

          case 30:
            captchaCode = _context.sent;
            console.log('/------------------------------------/');
            console.log('/------------------------------------/');
            console.log('正在使用腳本登錄...');
            _context.next = 36;
            return mylogger.postData({
              captchaCode: captchaCode
            });

          case 36:
            r = _context.sent;
            console.log('/------------------------------------/');
            console.log('/------------------------------------/');
            console.log('再次確認是否為登陸狀態...');
            _context.next = 42;
            return mylogger.isLogin();

          case 42:
            r = _context.sent;
            console.log('/------------------------------------/');
            console.log('/------------------------------------/');

            if (r) {
              _context.next = 50;
              break;
            }

            console.log('錯誤，未登錄，請重試');
            console.log('/------------------------------------/');
            console.log('/------------------------------------/');
            return _context.abrupt("return");

          case 50:
            console.log('成功登錄');
            console.log('/------------------------------------/');
            console.log('/------------------------------------/');
            return _context.abrupt("return");

          case 56:
            _context.prev = 56;
            _context.t0 = _context["catch"](0);
            console.log('登錄失敗');
            console.log(_context.t0.message);
            console.log('/------------------------------------/');
            console.log('/------------------------------------/');
            return _context.abrupt("return");

          case 63:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 56]]);
  }));
  return _main.apply(this, arguments);
}

main();