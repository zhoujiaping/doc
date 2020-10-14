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
	if(s==''){
		return []
	}
	if(s.length==1)return [[s]]
	if(s.length==2){
		if(s[0]==s[1]){
			return [[s[0],s[1]],[s]]	
		}
	}
	let ans = []
	for(let i=1;i<s.length;i++){
		let p1 = partition(s.substring(0,i))
		let p2 = partition(s.substring(i))
		ans.push(...[].concat.apply([],p1.map(it1=>p2.map(it2=>it1.concat(it2)))))
	}
	return ans
};
let s = 'aab'
console.info(partition(s))