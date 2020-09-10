/**
28. 实现 strStr()
难度简单
实现 strStr() 函数。
给定一个 haystack 字符串和一个 needle 字符串，在 haystack 字符串中找出 needle 字符串出现的第一个位置 (从0开始)。如果不存在，则返回  -1。
示例 1:
输入: haystack = "hello", needle = "ll"
输出: 2
示例 2:
输入: haystack = "aaaaa", needle = "bba"
输出: -1
说明:
当 needle 是空字符串时，我们应当返回什么值呢？这是一个在面试中很好的问题。
对于本题而言，当 needle 是空字符串时我们应当返回 0 。这与C语言的 strstr() 以及 Java的 indexOf() 定义相符。
通过次数228,691提交次数575,576
 * @param {string} haystack
 * @param {string} needle
 * @return {number}
 能用indexOf？这是不是太简单了？
 用kmp算法？那这题就不应该是简单题了。
 但是让我写一个kmp算法的实现，不好意思，估计我也是到网上抄。
 那我就写个简单的实现吧
 */
var strStr = function(haystack, needle) {
    return haystack.indexOf(needle)
};
strStr = (h,n)=>{
	if(n==='')return 0
	if(h==='')return -1
	let j
	for(let i=0;i<h.length-n.length+1;i++){
		j = 0
		while(j<n.length){
			if(h[i] !== n[j++]){
				break
			}
		}
		if(j===n.length){
			return i
		}
	}
	return -1
}