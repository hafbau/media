'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Auth Class
 */
var uuid = require('cuid');
var request = require('request-promise-native');
var superagent = require('superagent');

var Media = function () {
    function Media(_ref) {
        var _ref$appId = _ref.appId,
            appId = _ref$appId === undefined ? uuid() : _ref$appId,
            _ref$apiUrl = _ref.apiUrl,
            apiUrl = _ref$apiUrl === undefined ? 'http://localhost:4002' : _ref$apiUrl;

        _classCallCheck(this, Media);

        this.appId = appId;
        this.apiUrl = apiUrl;
    }

    _createClass(Media, [{
        key: 'init',
        value: function init(_ref2) {
            var _ref2$appId = _ref2.appId,
                appId = _ref2$appId === undefined ? this.appId : _ref2$appId,
                _ref2$apiUrl = _ref2.apiUrl,
                apiUrl = _ref2$apiUrl === undefined ? this.apiUrl : _ref2$apiUrl;

            // backfills constructor
            this.appId = appId;
            this.apiUrl = apiUrl;
        }
    }, {
        key: 'upload',
        value: function upload(fileStream) {
            var _this = this;

            var fieldName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'file';

            return Promise.resolve().then(function (_) {
                // fileStream is of File from the browser
                if (process.browser && fileStream instanceof File) {
                    var formData = new FormData();
                    formData.append(fieldName, fileStream);

                    return superagent.post(_this.apiUrl + '/files').send(formData).then(function (res) {
                        return res.body;
                    });
                }
                // fileStream is of node ReadStream
                if (typeof fileStream.read === 'function' || typeof fileStream.on === 'function') {

                    return request({
                        method: 'POST',
                        uri: _this.apiUrl + '/files',
                        formData: _defineProperty({}, fieldName, fileStream),
                        json: true
                    });
                }
                // unrecognized file type
                throw new TypeError("File must be an instance of Web API File or a node ReadStream");
            }).then(function (fileDetail) {
                var files = fileDetail.files;
                return files && files.length === 1 ? files[0] : files;
            }).catch(function (err) {
                console.log('error in media upload', err);
                throw err;
            });
        }
    }]);

    return Media;
}();

// exports a singleton instance


module.exports = new Media({});
