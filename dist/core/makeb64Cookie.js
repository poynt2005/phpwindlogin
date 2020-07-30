"use strict";

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.filter");

require("core-js/modules/es.array.for-each");

require("core-js/modules/es.array.map");

require("core-js/modules/es.array.reduce");

require("core-js/modules/es.date.to-iso-string");

require("core-js/modules/es.date.to-string");

require("core-js/modules/es.object.define-property");

require("core-js/modules/es.object.keys");

require("core-js/modules/web.dom-collections.for-each");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loadCookieB64FromETC = loadCookieB64FromETC;
exports.loadCookieB64 = loadCookieB64;

var _path = _interopRequireDefault(require("path"));

var _fs = _interopRequireDefault(require("fs"));

var _atob = _interopRequireDefault(require("atob"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function loadCookieB64FromETC(sitename, b64Cookie, hostname) {
  var cookieDir = _path["default"].resolve("".concat(process.cwd(), "/cookies")),
      cookiePath = _path["default"].resolve("".concat(process.cwd(), "/cookies/").concat(sitename, ".json"));

  try {
    var jsonFile = JSON.parse((0, _atob["default"])(b64Cookie)).filter(function (e) {
      return e.domain == hostname;
    }).map(function (e) {
      var mapping = {
        expirationDate: "expires",
        name: "key",
        sameSite: null,
        session: null,
        domain: "domain",
        hostOnly: "hostOnly",
        httpOnly: "httpOnly",
        path: "path",
        secure: "secure",
        storeId: null,
        value: "value",
        id: null
      };
      var o2 = {};
      Object.keys(e).forEach(function (r) {
        if (!mapping.hasOwnProperty(r) || mapping[r] === null) return;

        if (r == "expirationDate") {
          o2[mapping.expirationDate] = new Date(e[r] * 1000).toISOString();
        } else o2[mapping[r]] = e[r];
      });
      return o2;
    }).reduce(function (a, e) {
      return Object.defineProperty(a, e.key, {
        value: e,
        enumerable: true
      });
    }, {}),
        dist = _defineProperty({}, hostname, {});

    dist[hostname]["/"] = jsonFile;
    if (!_fs["default"].existsSync(cookieDir)) _fs["default"].mkdirSync(cookieDir);

    _fs["default"].writeFileSync(cookiePath, JSON.stringify(dist));
  } catch (e) {
    throw Error({
      method: 'loadCookieB64FromETC',
      message: e.message
    });
  }
}

function loadCookieB64(sitename, b64Cookie) {
  var cookieDir = _path["default"].resolve("".concat(process.cwd(), "/cookies")),
      cookiePath = _path["default"].resolve("".concat(process.cwd(), "/cookies/").concat(sitename, ".json"));

  try {
    if (!_fs["default"].existsSync(cookieDir)) _fs["default"].mkdirSync(cookieDir);

    _fs["default"].writeFileSync(cookiePath, (0, _atob["default"])(b64Cookie));
  } catch (e) {
    throw Error({
      method: 'loadCookieB64',
      message: e.message
    });
  }
}