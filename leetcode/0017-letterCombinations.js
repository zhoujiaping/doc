/**
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