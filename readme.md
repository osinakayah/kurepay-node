# Kurepay Gateway Node

## Installation

npm install kurepay-gateway-node

or 

yarn add kurepay-gateway-node

```javascript
import KurepayGateway from 'kurepay-gateway-node'
```

Create a transaction
Initiate the library first

```javascript

KurepayGateway.init(PUBLIC_KEY);

KurepayGateway.initiateTransaction(email, amount, reference, fullname, phoneNumber, {productId: 123}).then((redirectUrl) => {
    /* Redirect the user to this url to complete his payment
    After payment the user is redirected back to the url that was saved in your admin
     */
}).catch((error) => {
    //An error occurred
    console.log(error)
})
```

Verify Transaction
```javascript
KurepayGateway.verifyTransaction(reference).then((transactionDetails) => {
    //Payment was successful
}).catch((error) => {
    //An error occurred
    console.log(error)
})
```


