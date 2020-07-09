/**
 * 判断一个数是否为回文数
 * @param {number} x
 * @return {boolean}
 */
var isPalindrome = function(x) {
    let y = (''+x)
    return [...y].reverse().join('') === y
};
console.info(isPalindrome('1001001'))