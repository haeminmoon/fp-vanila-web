const pbkdf2 = require('pbkdf2');
const hash = {
    salt: 'spinprotocol',
    iterations: 5,
    keyLength: 16,
    digest: 'sha512'
};

const getHash = (pwd) => pbkdf2.pbkdf2Sync(pwd, hash.salt, hash.iterations, hash.keyLength, hash.digest).toString('base64');

module.exports = getHash;
