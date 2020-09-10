/**
17. 电话号码的字母组合
难度中等
给定一个仅包含数字 2-9 的字符串，返回所有它能表示的字母组合。
给出数字到字母的映射如下（与电话按键相同）。注意 1 不对应任何字母。
示例:
输入："23"
输出：["ad", "ae", "af", "bd", "be", "bf", "cd", "ce", "cf"].
说明:
尽管上面的答案是按字典序排列的，但是你可以任意选择答案输出的顺序。
 * @param {string} digits
 * @return {string[]}
 这种问题，一般用分治法。
 大问题和小问题形式相同，规模不同。
 */
const letters = [null,
null,['a','b','c'],['d','e','f'],
['g','h','i'],['j','k','l'],['m','n','o'],
['p','q','r','s'],['t','u','v'],['w','x','y','z']]
var letterCombinations = function(digits) {
	if(digits==='')return []
	if(digits.length==1)return letters[digits]
	return Array.prototype.concat.apply([],letters[digits[0]].map(i=>letterCombinations(digits.substring(1)).map(item=>i+item)))
};
console.info(letterCombinations('4'))