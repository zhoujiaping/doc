/**
125. 验证回文串
给定一个字符串，验证它是否是回文串，只考虑字母和数字字符，可以忽略字母的大小写。

说明：本题中，我们将空字符串定义为有效的回文串。

示例 1:

输入: "A man, a plan, a canal: Panama"
输出: true
示例 2:

输入: "race a car"
输出: false
通过次数162,363提交次数350,371
*/
/**
 * @param {string} s
 * @return {boolean}
 */
const letters = new Set('0123456789abcdefghijklmnopqrstuvwxyz'.split(''))
var isPalindrome = function(s) {
	let chs = [...s.toLowerCase()].filter(it=>letters.has(it))
	let i=0,j=chs.length-1
	while(i<=j){
		if(chs[i++]!=chs[j--])return false
	}
	return true
};
let s = "race a car"
s = "A man, a plan, a canal: Panama"
console.info(isPalindrome(s))