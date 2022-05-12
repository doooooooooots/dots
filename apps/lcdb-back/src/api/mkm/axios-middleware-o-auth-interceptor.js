'use strict';
var __assign =
  (this && this.__assign) ||
  function () {
    __assign =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign.apply(this, arguments);
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
exports.__esModule = true;
var crypto_1 = __importDefault(require('crypto'));
var oauth_sign_1 = require('oauth-sign');
var isAbsoluteURL = function (url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(url);
};
var combineURLs = function (baseURL, relativeURL) {
  return relativeURL ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '') : baseURL;
};
var generateNonce = function (size) {
  if (size === void 0) {
    size = 16;
  }
  const tpm = crypto_1['default']
    .randomBytes(0 | (size * 0.75))
    .toString('base64')
    .replaceAll(/[^a-zA-Z0-9]+/g, 'Z');
  return tpm;
};
var calculateBodyHash = function (signatureMethod, data) {
  var buf = Buffer.isBuffer(data)
    ? data
    : typeof data === 'string'
    ? Buffer.from(data)
    : !data
    ? Buffer.from('')
    : Buffer.from(JSON.stringify(data));
  return crypto_1['default']
    .createHash(signatureMethod === 'HMAC-SHA1' ? 'sha1' : 'sha256')
    .update(buf)
    .digest('base64');
};
var addOAuthInterceptor = function (client, _a) {
  var _b = _a.algorithm,
    algorithm = _b === void 0 ? 'HMAC-SHA256' : _b,
    _c = _a.includeBodyHash,
    includeBodyHash = _c === void 0 ? 'auto' : _c,
    key = _a.key,
    realm = _a.realm,
    secret = _a.secret,
    _d = _a.token,
    token = _d === void 0 ? null : _d,
    _e = _a.tokenSecret,
    tokenSecret = _e === void 0 ? null : _e,
    _f = _a.callback,
    callback = _f === void 0 ? null : _f,
    _g = _a.verifier,
    verifier = _g === void 0 ? null : _g;
  client.interceptors.request.use(function (config) {
    var method = (config.method || 'GET').toUpperCase();
    var oauthParams = {
      oauth_consumer_key: key,
      oauth_nonce: generateNonce(),
      oauth_signature_method: algorithm,
      oauth_timestamp: String(Math.floor(Date.now() * 0.001)),
      oauth_version: '1.0'
    };
    // if provided, oauth_token can be included in the oauth parameters
    // more information: https://datatracker.ietf.org/doc/html/rfc5849#section-3.1
    if (token) {
      oauthParams.oauth_token = token;
    }
    if (callback) {
      oauthParams.oauth_callback = callback;
    }
    if (verifier) {
      oauthParams.oauth_verifier = verifier;
    }
    var oauthUrl = new URL(
      !config.baseURL || isAbsoluteURL(config.url) ? config.url : combineURLs(config.baseURL, config.url)
    );
    var paramsToSign = {};
    // Add one key/value pair to paramsToSign
    var addParamToSign = function (key, value) {
      var existingValue = paramsToSign[key];
      if (typeof existingValue === 'string') {
        paramsToSign[key] = [existingValue, value];
      } else if (Array.isArray(existingValue)) {
        existingValue.push(value);
      } else {
        paramsToSign[key] = value;
      }
    };
    // Add multiple key/value pairs to paramsToSign
    var addParamsToSign = function (m) {
      new URLSearchParams(m).forEach(function (value, key) {
        return addParamToSign(key, value);
      });
    };
    addParamsToSign(oauthParams);
    if (config.params) {
      addParamsToSign(config.params);
    }
    // Query parameters are hashed as part of params rather than as part of the URL
    if (oauthUrl.search) {
      addParamsToSign(oauthUrl.searchParams);
      oauthUrl.search = '';
    }
    // Do not include hash in signature
    oauthUrl.hash = '';
    // Remove port if it is the default for that protocol
    if (
      (oauthUrl.protocol === 'https:' && oauthUrl.port === '443') ||
      (oauthUrl.protocol === 'http:' && oauthUrl.port === '80')
    ) {
      oauthUrl.port = '';
    }
    // If they are submitting a form, then include form parameters in the
    // signature as parameters rather than the body hash
    if (config.headers['content-type'] === 'application/x-www-form-urlencoded') {
      addParamsToSign(config.data);
    } else if (
      includeBodyHash === true ||
      (config.data && includeBodyHash === 'auto' && ['POST', 'PUT'].includes(method))
    ) {
      var bodyHash = calculateBodyHash(algorithm, config.data);
      oauthParams.oauth_body_hash = bodyHash;
      addParamToSign('oauth_body_hash', bodyHash);
    }
    oauthParams.oauth_signature = (0, oauth_sign_1.sign)(
      algorithm,
      method,
      oauthUrl.toString(),
      paramsToSign,
      secret,
      tokenSecret
    );
    // realm should not be included in the signature calculation
    // but is optional in the OAuth 1.0 Authorization header
    // so we need to add it after signing the request
    // more information: https://datatracker.ietf.org/doc/html/rfc5849#section-3.4.1.3.1
    if (realm) {
      oauthParams.realm = realm;
    }
    var authorization = [
      'OAuth',
      Object.entries(oauthParams)
        .map(function (e) {
          return [e[0], '="', (0, oauth_sign_1.rfc3986)(e[1]), '"'].join('');
        })
        .join(',')
    ].join(' ');
    return __assign(__assign({}, config), {
      headers: __assign(__assign({}, config.headers), { authorization: authorization })
    });
  });
};
exports['default'] = addOAuthInterceptor;
