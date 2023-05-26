"use strict";
// The mutable export is the whole key to the adapter architecture.
Object.defineProperty(exports, "__esModule", { value: true });
exports.crypto = exports.setCrypto = void 0;
// eslint-disable-next-line import/no-mutable-exports
let cryptoVar;
exports.crypto = cryptoVar;
if (typeof crypto === 'undefined') {
    // CF worker will complain about a line reading require('crypto') even if it's never executed, as is the case here,
    // so we create a hacky workaround to make it happy.
    const cfWorkerWorkaround = 'crypto';
    exports.crypto = cryptoVar = require(cfWorkerWorkaround);
}
else {
    exports.crypto = cryptoVar = crypto;
}
function setCrypto(_crypto) {
    // deprecated
    console.log('[shopify-api/WARNING] [Deprecated | 8.0.0] The setCrypto function is no longer necessary, and has been ' +
        'deprecated. You should stop calling it from your adapter, as it will be removed in a future release.');
}
exports.setCrypto = setCrypto;
//# sourceMappingURL=crypto.js.map