/**
npm install -g crypto-js
*/

const CryptoJS = require('crypto-js');

/**
@param keyHex:16进制密钥
@return WordArray
*/
function parseKeyHex(keyHex){
	return CryptoJS.enc.Hex.parse(keyHex);
}

function parseIvHex(ivHex){
	return CryptoJS.enc.Hex.parse(ivHex);
}

function parseKeyBase64(keyBase64){
	return CryptoJS.enc.Base64.parse(keyBase64);
}

function parseIvBase64(ivBase64){
	return CryptoJS.enc.Base64.parse(ivBase64);
}

/**
msg:字符串
key:WordArray
iv:WordArray
返回：CipherParams
CryptoJS.pad.Pkcs7 和 java中的PKCS5Padding相同
*/
function encrypt (msg, key, iv) {
	return  CryptoJS.AES.encrypt(msg,  key, {
		iv: iv,
		padding: CryptoJS.pad.Pkcs7,
		mode: CryptoJS.mode.CBC
	});
}
/**
msg:字符串
key:WordArray
iv:WordArray
返回：Hex字符串
*/
function encryptToHex (msg, key, iv) {
	let encrypted = CryptoJS.AES.encrypt(msg,  key, {
		iv: iv,
		padding: CryptoJS.pad.Pkcs7,
		mode: CryptoJS.mode.CBC
	});
	return encrypted.ciphertext.toString();//或者CryptoJS.enc.Hex.stringify(encrypted.ciphertext);或者return encrypted.ciphertext.toString(CryptoJS.enc.Hex); 
}
/**
msg:字符串
key:WordArray
iv:WordArray
返回：Hex字符串
*/
function encryptToBase64 (msg, key, iv) {
	let encrypted = CryptoJS.AES.encrypt(msg,  key, {
		iv: iv,
		padding: CryptoJS.pad.Pkcs7,
		mode: CryptoJS.mode.CBC
	});
	return CryptoJS.enc.Base64.stringify(encrypted.ciphertext);//或者return encrypted.ciphertext.toString(CryptoJS.enc.Base64);
}

/**
cipherText:WordArray 或者 base64字符串
key:WordArray
iv:WordArray
返回：WordArray
*/
function decrypt (cipherText, key, iv) {
	let decrypted = CryptoJS.AES.decrypt({ ciphertext: cipherText }, key, {
		iv: iv,
		padding: CryptoJS.pad.Pkcs7,
		mode: CryptoJS.mode.CBC
	});
	return decrypted.toString(CryptoJS.enc.Utf8);
}
function decryptBase64 (cipherTextBase64, key, iv) {
	let cipherText = CryptoJS.enc.Base64.parse(cipherTextBase64);
	let decrypted = CryptoJS.AES.decrypt({ ciphertext: cipherText }, key, {
		iv: iv,
		padding: CryptoJS.pad.Pkcs7,
		mode: CryptoJS.mode.CBC
	});
	return decrypted.toString(CryptoJS.enc.Utf8);
}
function decryptHex (cipherTextHex, key, iv) {
	let cipherText = CryptoJS.enc.Hex.parse(cipherTextHex);
	let decrypted = CryptoJS.AES.decrypt({ ciphertext: cipherText }, key, {
		iv: iv,
		padding: CryptoJS.pad.Pkcs7,
		mode: CryptoJS.mode.CBC
	});
	return decrypted.toString(CryptoJS.enc.Utf8);
}

/**********************测试*****************************/
//16进制密钥和偏移量
let skHex = '6A612FC583E44727295737C21F128770';
let ivHex = 'C74274C19D349391A0172B700F8F8BB6';
//密钥和偏移量WordArray
let sk = parseKeyHex(skHex);
let iv = parseIvHex(ivHex);
//加密
let msg = 'ok';
let encrypted0 = encryptToBase64(msg,sk,iv);
console.info(encrypted0);

let encrypted1 = encryptToHex(msg,sk,iv);
console.info(encrypted1);

let encrypted2 = encrypt(msg,sk,iv);
//console.info(encrypted2);
//解密
let decrypted0 = decryptBase64(encrypted0,sk,iv);
console.info(decrypted0);

let decrypted1 = decryptHex(encrypted1,sk,iv);
console.info(decrypted1);

let decrypted2 = decrypt(encrypted2.ciphertext,sk,iv);
console.info(decrypted2);