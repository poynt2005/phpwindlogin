"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.filter");

require("core-js/modules/es.array.find");

require("core-js/modules/es.array.for-each");

require("core-js/modules/es.array.join");

require("core-js/modules/es.array.map");

require("core-js/modules/es.object.define-properties");

require("core-js/modules/es.object.define-property");

require("core-js/modules/es.object.get-own-property-descriptor");

require("core-js/modules/es.object.get-own-property-descriptors");

require("core-js/modules/es.object.keys");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.promise");

require("core-js/modules/es.regexp.exec");

require("core-js/modules/es.string.split");

require("core-js/modules/web.dom-collections.for-each");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _request = _interopRequireDefault(require("request"));

var _cheerio = _interopRequireDefault(require("cheerio"));

var _iconvLite = _interopRequireDefault(require("iconv-lite"));

var _buffer = _interopRequireDefault(require("buffer"));

var _path = _interopRequireDefault(require("path"));

var _fs = _interopRequireDefault(require("fs"));

var _atob = _interopRequireDefault(require("atob"));

var _toughCookieFileStore = _interopRequireDefault(require("tough-cookie-file-store"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Buffer = _buffer["default"].Buffer;

var myRequest = function () {
  var UA = {
    'User-Agent': 'Mozilla/5.0 (X11; Linux i686; rv:64.0) Gecko/20100101 Firefox/64.0'
  };
  var formContentType = {
    'Content-Type': 'application/x-www-form-urlencoded'
  };

  var cookieDir = _path["default"].resolve("".concat(process.cwd(), "/cookies"));

  var cookiePath = null,
      cookieJar = null;

  var cls = /*#__PURE__*/function () {
    function cls(site) {
      var isCookie = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      var isRejectUnauthorized = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      _classCallCheck(this, cls);

      this.site = site;
      this.isRejectUnauthorized = isRejectUnauthorized;

      if (isCookie) {
        if (!_fs["default"].existsSync(cookieDir)) _fs["default"].mkdirSync(cookieDir);
        cookiePath = _path["default"].resolve("".concat(process.cwd(), "/cookies/").concat(site, ".json"));
        cookieJar = _request["default"].jar(new _toughCookieFileStore["default"](cookiePath));
      }
    }

    _createClass(cls, [{
      key: "get",
      value: function get(url) {
        var _this = this;

        var headers = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
        var encoding = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'utf8';
        return new Promise(function (resolve, reject) {
          (0, _request["default"])(_objectSpread(_objectSpread(_objectSpread({
            url: url,
            rejectUnauthorized: _this.isRejectUnauthorized,
            method: 'GET',
            headers: _objectSpread({}, UA)
          }, headers !== null && {
            headers: _objectSpread(_objectSpread({}, headers), UA)
          }), cookieJar !== null && {
            jar: cookieJar
          }), encoding != 'utf8' && {
            encoding: null
          }), function (err, res, body) {
            if (err) return reject({
              method: 'myRequest.prototype.get',
              message: err
            });
            var resBody = body;
            if (encoding != 'utf8') resBody = _iconvLite["default"].decode(Buffer.from(body, 'binary'), encoding);
            return resolve({
              response: res,
              text: function text() {
                return resBody;
              },
              jq: function jq() {
                return _cheerio["default"].load(resBody);
              }
            });
          });
        });
      }
    }, {
      key: "post",
      value: function post(url, data) {
        var _this2 = this;

        var headers = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
        var encoding = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'utf8';
        return new Promise(function (resolve, reject) {
          (0, _request["default"])(_objectSpread(_objectSpread(_objectSpread(_objectSpread({
            url: url,
            rejectUnauthorized: _this2.isRejectUnauthorized,
            method: 'POST',
            headers: _objectSpread(_objectSpread({}, UA), formContentType)
          }, headers !== null && {
            headers: _objectSpread(_objectSpread({}, headers), UA)
          }), cookieJar !== null && {
            jar: cookieJar
          }), encoding != 'utf8' && {
            encoding: null
          }), typeof data != 'undefined' && {
            body: function (h) {
              if (h === null || typeof h['Content-Type'] == 'undefined' || /x\-www\-form\-urlencoded/.test(h['Content-Type'])) return Object.keys(data).map(function (e) {
                return "".concat(encodeURIComponent(e), "=").concat(encodeURIComponent(data[e]));
              }).join('&');else if (/json/.test(options.headers['Content-Type'])) return JSON.stringify(data);else return data;
            }(headers)
          }), function (err, res, body) {
            if (err) return reject({
              method: 'myRequest.prototype.post',
              message: err
            });
            var resBody = body;
            if (encoding != 'utf8') resBody = _iconvLite["default"].decode(Buffer.from(body, 'binary'), encoding);
            return resolve({
              response: res,
              text: function text() {
                return resBody;
              },
              jq: function jq() {
                return _cheerio["default"].load(resBody);
              }
            });
          });
        });
      }
    }, {
      key: "downloadImg",
      value: function downloadImg(url) {
        var _this3 = this;

        var headers = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

        var picsDir = _path["default"].resolve("".concat(process.cwd(), "/captcha")),
            picsPath = _path["default"].resolve("".concat(process.cwd(), "/captcha/").concat(this.site, ".jpeg"));

        if (!_fs["default"].existsSync(picsDir)) _fs["default"].mkdirSync(picsDir);
        return new Promise(function (resolve, reject) {
          var lastvisit, cknum;
          (0, _request["default"])(_objectSpread({
            url: url,
            rejectUnauthorized: _this3.isRejectUnauthorized,
            method: 'GET',
            headers: _objectSpread({}, UA)
          }, headers !== null && {
            headers: _objectSpread(_objectSpread({}, headers), UA)
          }), function (err, res, body) {
            res.headers['set-cookie'].forEach(function (e) {
              if (typeof lastvisit == 'undefined' && /lastvisit/.test(e)) lastvisit = e.split(';').find(function (e) {
                return /lastvisit/.test(e);
              });else if (typeof cknum == 'undefined' && /cknum/.test(e)) cknum = e.split(';').find(function (e) {
                return /cknum/.test(e);
              });
            });
          }).pipe(_fs["default"].createWriteStream(_path["default"].resolve("".concat(process.cwd(), "/captcha/").concat(_this3.site, ".jpeg")))).on('finish', function () {
            return resolve({
              lastvisit: lastvisit,
              cknum: cknum
            });
          }).on('error', function (err) {
            return reject({
              method: 'myRequest.prototype.downloadImg',
              message: err
            });
          });
        });
      }
    }, {
      key: "getJar",
      value: function getJar() {
        if (cookieJar == null) return false;
        return cookieJar;
      }
    }, {
      key: "setLastvisitKey",
      value: function setLastvisitKey(cookiestr, url) {
        var rst = false;
        if (cookieJar == null || typeof cookiestr == 'undefined' || typeof url == 'undefined') return rst;
        cookieJar.setCookie(_request["default"].cookie(cookiestr), url);
        return rst;
      }
    }], [{
      key: "getRealSite",
      value: function getRealSite(url) {
        return new Promise(function (resolve) {
          var req = (0, _request["default"])({
            url: url
          }, function () {
            resolve({
              hostURL: "".concat(req.uri.protocol, "//").concat(req.uri.hostname),
              hostname: req.uri.hostname
            });
          });
        });
      }
    }]);

    return cls;
  }();

  return cls;
}();

var _default = myRequest;
exports["default"] = _default;