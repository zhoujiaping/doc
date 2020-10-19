/*
131. 分割回文串
给定一个字符串 s，将 s 分割成一些子串，使每个子串都是回文串。

返回 s 所有可能的分割方案。

示例:

输入: "aab"
输出:
[
  ["aa","b"],
  ["a","a","b"]
]
通过次数48,658提交次数70,214
*/

/**
 * @param {string} s
 * @return {string[][]}
 */
var partition = function(s) {
	return part(s)
	//判断是否回文
	function isPalindrome(s){
		if(s.length>2){
			return isPalindrome(s.substring(1,s.length-1))&&s[0]==s[s.length-1]
			//下面的代码可以优化性能
			/*let i=0,j=s.length-1
			while(i<j){
				if(s[i++]!=s[j--])return false
			}
			return true*/
		}else if(s.length==2){
			return s[0]==s[1]
		}else{
			return true
		}
	}
	//返回字符串的回文组合
	function part(str){
		let s1,s2,ans = []
		//判断整个字符串是否回文
		if(isPalindrome(str)){
			ans.push([str])
		}
		//将字符串切割为两部分,如果第一部分为回文,则将第一部分和剩下部分的回文组合再进行组合
		for(let i=1;i<str.length;i++){
			s1 = str.substring(0,i)
			if(isPalindrome(s1)){
				s2 = str.substring(i)
				ans.push(...part(s2).map(it=>[s1].concat(it)))
			}
		}
		return ans
	}
};
let s = 'aab'
s = "amanaplanacanalpanama"
console.info(partition(s).length)