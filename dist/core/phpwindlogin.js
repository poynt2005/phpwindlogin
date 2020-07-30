"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.filter");

require("core-js/modules/es.array.for-each");

require("core-js/modules/es.date.to-string");

require("core-js/modules/es.object.define-properties");

require("core-js/modules/es.object.define-property");

require("core-js/modules/es.object.get-own-property-descriptor");

require("core-js/modules/es.object.get-own-property-descriptors");

require("core-js/modules/es.object.keys");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.promise");

require("core-js/modules/web.dom-collections.for-each");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("regenerator-runtime/runtime");

var _myRequest = _interopRequireDefault(require("./myRequest"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var phpwindLogin = function () {
  var hostname = false,
      usr,
      pw,
      session = null,
      captchaTime,
      lastvisit,
      cknum;
  return /*#__PURE__*/function () {
    function _class(site, iptUsr, iptPw, siteURL) {
      var isCookie = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : true;
      var isRejectUnauthorized = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : true;

      _classCallCheck(this, _class);

      this.site = site;
      this.siteURL = siteURL;
      usr = iptUsr;
      pw = iptPw;
      session = new _myRequest["default"](site, isCookie, isRejectUnauthorized);
    }

    _createClass(_class, [{
      key: "getRealSiteURL",
      value: function () {
        var _getRealSiteURL = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
          var rst;
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.prev = 0;
                  _context.next = 3;
                  return _myRequest["default"].getRealSite(this.siteURL);

                case 3:
                  rst = _context.sent;
                  this.siteURL = rst.hostURL;
                  hostname = rst.hostname;
                  return _context.abrupt("return", Promise.resolve(true));

                case 9:
                  _context.prev = 9;
                  _context.t0 = _context["catch"](0);
                  return _context.abrupt("return", Promise.reject({
                    method: 'phpwindLogin.prototype.getRealSiteURL',
                    message: _context.t0.message
                  }));

                case 12:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, this, [[0, 9]]);
        }));

        function getRealSiteURL() {
          return _getRealSiteURL.apply(this, arguments);
        }

        return getRealSiteURL;
      }()
    }, {
      key: "getCaptcha",
      value: function () {
        var _getCaptcha = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
          var capthaParam,
              handler,
              cookies,
              picsURL,
              rst,
              _args2 = arguments;
          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  capthaParam = _args2.length > 0 && _args2[0] !== undefined ? _args2[0] : {};

                  if (hostname) {
                    _context2.next = 3;
                    break;
                  }

                  throw Error('URL may not a vaild URL');

                case 3:
                  handler = capthaParam.handler, cookies = capthaParam.cookies;
                  if (typeof cookies == 'undefined') cookies = {
                    'Accept': 'image/webp,image/apng,image/*,*/*;q=0.8',
                    'Accept-Encoding': 'gzip, deflate, br',
                    'Accept-Language': 'zh-TW,zh-CN;q=0.9,zh;q=0.8,en-US;q=0.7,en;q=0.6',
                    'Cache-Control': 'no-cache',
                    'Connection': 'keep-alive',
                    'Referer': "".concat(this.siteURL, "/userpay.php?action=log"),
                    'Sec-Fetch-Dest': 'image',
                    'Sec-Fetch-Mode': 'no-cors',
                    'Sec-Fetch-Site': 'same-origin'
                  };

                  if (!(typeof handler == 'function')) {
                    _context2.next = 7;
                    break;
                  }

                  return _context2.abrupt("return", handler());

                case 7:
                  _context2.prev = 7;
                  captchaTime = new Date().getTime();
                  picsURL = "".concat(this.siteURL, "/ck.php?nowtime=").concat(captchaTime);
                  _context2.next = 12;
                  return session.downloadImg(picsURL, {
                    Cookie: cookies
                  });

                case 12:
                  rst = _context2.sent;
                  lastvisit = rst.lastvisit;
                  cknum = rst.cknum;
                  return _context2.abrupt("return", Promise.resolve('Get captcha finished'));

                case 18:
                  _context2.prev = 18;
                  _context2.t0 = _context2["catch"](7);
                  return _context2.abrupt("return", Promise.reject({
                    method: 'phpwindLogin.prototype.getCaptcha',
                    message: _context2.t0.message
                  }));

                case 21:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2, this, [[7, 18]]);
        }));

        function getCaptcha() {
          return _getCaptcha.apply(this, arguments);
        }

        return getCaptcha;
      }()
    }, {
      key: "postData",
      value: function () {
        var _postData = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
          var postParam,
              handler,
              headers,
              data,
              url,
              captchaCode,
              _postData2,
              r,
              _args3 = arguments;

          return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  postParam = _args3.length > 0 && _args3[0] !== undefined ? _args3[0] : {};

                  if (hostname) {
                    _context3.next = 3;
                    break;
                  }

                  throw Error('URL may not a vaild URL');

                case 3:
                  handler = postParam.handler, headers = postParam.headers, data = postParam.data, url = postParam.url, captchaCode = postParam.captchaCode;

                  if (!(typeof handler == 'function')) {
                    _context3.next = 6;
                    break;
                  }

                  return _context3.abrupt("return", handler());

                case 6:
                  _context3.prev = 6;
                  _postData2 = _objectSpread({
                    lgt: '0',
                    pwuser: usr,
                    pwpwd: pw,
                    hideid: '0',
                    forward: "".concat(hostname, "/userpay.php?action-log.html"),
                    jumpurl: "".concat(hostname, "/userpay.php?action-log.html"),
                    step: '2',
                    cktime: '31536000'
                  }, typeof captchaCode != 'undefined' && {
                    gdcode: captchaCode
                  });
                  if (typeof url == 'undefined') url = "".concat(this.siteURL, "/login.php?");
                  if (typeof data != 'undefined') _postData2 = _objectSpread(_objectSpread({}, _postData2), data);
                  if (typeof headers == 'undefined') headers = null;
                  if (typeof lastvisit != 'undefined') session.setLastvisitKey(lastvisit, this.siteURL);
                  if (typeof cknum != 'undefined') session.setLastvisitKey(cknum, this.siteURL);
                  _context3.next = 15;
                  return session.post(url, _postData2);

                case 15:
                  r = _context3.sent;
                  return _context3.abrupt("return", Promise.resolve(r));

                case 19:
                  _context3.prev = 19;
                  _context3.t0 = _context3["catch"](6);
                  return _context3.abrupt("return", Promise.reject({
                    method: 'phpwindLogin.prototype.postData',
                    message: _context3.t0.message
                  }));

                case 22:
                case "end":
                  return _context3.stop();
              }
            }
          }, _callee3, this, [[6, 19]]);
        }));

        function postData() {
          return _postData.apply(this, arguments);
        }

        return postData;
      }()
    }, {
      key: "isLogin",
      value: function () {
        var _isLogin = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
          var r;
          return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
              switch (_context4.prev = _context4.next) {
                case 0:
                  if (hostname) {
                    _context4.next = 2;
                    break;
                  }

                  throw Error('URL may not a vaild URL');

                case 2:
                  _context4.prev = 2;
                  _context4.next = 5;
                  return session.get("".concat(this.siteURL, "/profile.php"));

                case 5:
                  r = _context4.sent;

                  if (!/没有登录/.test(r.text())) {
                    _context4.next = 10;
                    break;
                  }

                  return _context4.abrupt("return", Promise.resolve(false));

                case 10:
                  return _context4.abrupt("return", Promise.resolve(true));

                case 11:
                  _context4.next = 16;
                  break;

                case 13:
                  _context4.prev = 13;
                  _context4.t0 = _context4["catch"](2);
                  return _context4.abrupt("return", Promise.reject({
                    method: 'phpwindLogin.prototype.isLogin',
                    message: _context4.t0.message
                  }));

                case 16:
                case "end":
                  return _context4.stop();
              }
            }
          }, _callee4, this, [[2, 13]]);
        }));

        function isLogin() {
          return _isLogin.apply(this, arguments);
        }

        return isLogin;
      }()
    }, {
      key: "loadCookieB64",
      value: function loadCookieB64(b64) {
        var etc = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
        if (!hostname) throw Error('URL may not a vaild URL');

        try {
          if (etc) session.loadCookieB64FromETC(b64, hostname);else session.loadCookieB64(b64);
          return true;
        } catch (e) {
          return Promise.reject({
            method: 'phpwindLogin.prototype.loadCookieB64',
            message: e.message
          });
        }
      }
    }, {
      key: "getSession",
      value: function getSession() {
        return session;
      }
    }]);

    return _class;
  }();
}();

var _default = phpwindLogin;
exports["default"] = _default;