'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.KurepayGateway = undefined;

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var KurepayGateway = exports.KurepayGateway = function () {
    var publicKey = null;
    var verifyTransaction = function verifyTransaction(reference) {
        return new Promise(function (resolve, reject) {
            if (publicKey) {
                var options = {
                    url: 'https://payment.kurepay.com/api/auth/transaction/status/' + reference,
                    json: true,
                    body: {
                        publicKey: publicKey
                    }

                };
                _request2.default.post(options, function (error, response, body) {
                    if (!error && response.statusCode === 200) {
                        if (typeof body === "string") {
                            body = JSON.parse(body);
                        }
                        if (body.data.status == 1) {
                            resolve(body.data);
                        } else {
                            reject(body.data);
                        }
                    } else {
                        reject(error);
                    }
                });
            } else {
                reject('Public Key not set');
            }
        });
    };
    var initiateTransaction = function initiateTransaction(email, amount, reference, fullname, phoneNumber) {
        var meta = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : {};

        return new Promise(function (resolve, reject) {
            if (publicKey) {
                var options = {
                    url: 'https://payment.kurepay.com/api/init-payment',
                    json: true,
                    body: {
                        email: email,
                        amount: amount,
                        reference: reference,
                        fullname: fullname,
                        phoneNumber: phoneNumber,
                        meta: JSON.stringify(meta),
                        public_key: publicKey
                    }

                };
                _request2.default.post(options, function (error, response, body) {
                    if (!error && response.statusCode === 200) {
                        if (typeof body === "string") {
                            body = JSON.parse(body);
                        }
                        if (body.status == 11) {
                            resolve('https://payment.kurepay.com/#/initPayment/' + body.data.reference);
                        } else {
                            reject(body.message);
                        }
                    } else {
                        reject(error);
                    }
                });
            } else {
                reject('Public Key not set');
            }
        });
    };

    return {
        init: function init(_publicKey) {
            publicKey = _publicKey;
        },
        initiateTransaction: initiateTransaction,
        verifyTransaction: verifyTransaction
    };
}();