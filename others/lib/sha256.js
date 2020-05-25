const CryptoJS = require('crypto-js');
let word = '1234abc';
let res = CryptoJS.SHA256(word);
console.info(res.toString(CryptoJS.enc.Hex));