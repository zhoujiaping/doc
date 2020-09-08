/**
91. 解码方法
一条包含字母 A-Z 的消息通过以下方式进行了编码：

'A' -> 1
'B' -> 2
...
'Z' -> 26
给定一个只包含数字的非空字符串，请计算解码方法的总数。

示例 1:

输入: "12"
输出: 2
解释: 它可以解码为 "AB"（1 2）或者 "L"（12）。
示例 2:

输入: "226"
输出: 3
解释: 它可以解码为 "BZ" (2 26), "VF" (22 6), 或者 "BBF" (2 2 6) 。
通过次数64,966提交次数266,669
 * @param {string} s
 * @return {number}
 dp
 1：状态，dp[i]表示前i个字符的编码总数。
 3：初始条件。dp[0]=1,dp[1]=1
 */
const twoCodes = new Set(['11','12','13','14','15','16','17','18','19','21','22','23','24','25','26'])
const zeroCodes = new Set(['30','40','50','60','70','80','90','00'])
var numDecodings = function(s) {
	if(s.length==0)return 0
	if(s[0]=='0')return 0
	let prev=1,curr=1,temp
	for(let k=1;k<s.length;k++){
		//非法情况
		if(zeroCodes.has(s.substr(k-1,2)))return 0
		temp = curr
		//如果s(k-1,k)有两种解码方式，但是s[k+1]为'0',则
		if(twoCodes.has(s.substr(k-1,2)) && s[k+1]!='0'){
			curr = curr + prev	
		}else if(s[k]=='0'){
			curr = prev	
		}
		prev = temp
	}
	return curr
};
console.info(numDecodings('226'))
console.info(numDecodings('110'))
console.info(numDecodings("12120"))
