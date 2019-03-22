import request from 'request'


export const KurepayGateway = function () {
    let publicKey = null;
    const verifyTransaction = (reference) => {
        return new Promise((resolve, reject) => {
            if (publicKey) {
                const options = {
                    url: `https://payment.kurepay.com/api/auth/transaction/status/${reference}`,
                    json: true,
                    body: {
                        publicKey: publicKey
                    }

                }
                request.post(options, (error, response, body) => {
                    if (!error && response.statusCode === 200) {
                        if (typeof body === "string") {
                            body = JSON.parse(body);
                        }
                        if (body.data.status == 1) {
                            resolve(body.data)
                        }
                        else {
                            reject(body.data)
                        }
                    }
                    else {
                        reject(error)
                    }
                })
            }
            else {
                reject('Public Key not set')
            }
        });
    }
    const initiateTransaction = (email, amount, reference, fullname, phoneNumber, meta = {}) => {
        return new Promise((resolve, reject) => {
            if (publicKey) {
                const options = {
                    url: 'https://payment.kurepay.com/api/init-payment',
                    json: true,
                    body: {
                        email,
                        amount,
                        reference,
                        fullname,
                        phoneNumber,
                        meta: JSON.stringify(meta),
                        public_key: publicKey
                    }

                }
                request.post(options, (error, response, body) => {
                    if (!error && response.statusCode === 200) {
                        if (typeof body === "string") {
                            body = JSON.parse(body);
                        }
                        if (body.status == 11) {
                            resolve(`https://payment.kurepay.com/#/initPayment/${body.data.reference}`)
                        }
                        else {
                            reject(body.message)
                        }
                    }
                    else {
                        reject(error)
                    }
                })
            }
            else {
                reject('Public Key not set')
            }
        });
    }

    return {
        init: (_publicKey) => {
            publicKey = _publicKey
        },
        initiateTransaction,
        verifyTransaction
    }
}();


