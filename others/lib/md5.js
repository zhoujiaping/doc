const CryptoJS = require('crypto-js');
let word = '1234abc';
let res = CryptoJS.MD5(word);
console.info(res.toString(CryptoJS.enc.Hex));