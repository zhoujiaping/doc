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
 2：状态转移方程。 
 	若s.substr(i-1,2)可解码为3个字符串，即s[i-1]为1或者2，s[i]为1到9
		dp[i] = dp[i-1] + dp[i-2]
	若s[i-1]为1到9
		dp[i] = dp[i-1]
	否则 
 		dp[i] = dp[i-2]
 3：初始条件。dp[0]=0,dp[1]=1
 */
var numDecodings = function(s) {
	let dp = [1,1]
	for(let k=1;k<s.length;k++){

		dp[k+1] = dp[k] + dp[k-1]
	}
	return dp[s.length]
};
console.info(numDecodings('226'))