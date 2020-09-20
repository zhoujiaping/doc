/**
115. 不同的子序列
给定一个字符串 S 和一个字符串 T，计算在 S 的子序列中 T 出现的个数。
一个字符串的一个子序列是指，通过删除一些（也可以不删除）字符且不干扰剩余字符相对位置所组成的新字符串。
（例如，"ACE" 是 "ABCDE" 的一个子序列，而 "AEC" 不是）
题目数据保证答案符合 32 位带符号整数范围。
示例 1：
输入：S = "rabbbit", T = "rabbit"
输出：3
解释：
如下图所示, 有 3 种可以从 S 中得到 "rabbit" 的方案。
(上箭头符号 ^ 表示选取的字母)
rabbbit
^^^^ ^^
rabbbit
^^ ^^^^
rabbbit
^^^ ^^^
示例 2：
输入：S = "babgbag", T = "bag"
输出：5
解释：
如下图所示, 有 5 种可以从 S 中得到 "bag" 的方案。 
(上箭头符号 ^ 表示选取的字母)
babgbag
^^ ^
babgbag
^^    ^
babgbag
^    ^^
babgbag
  ^  ^^
babgbag
    ^^^
通过次数18,628提交次数37,985
*/
/**
 * @param {string} s
 * @param {string} t
 * @return {number}
 */
 	/*dp[i][j]，s的前i个字符为S，t的前j个字符为T，计算个数
	状态转移方程
	如果 s[i-1]==t[j-1],dp[i][j]=dp[i-1][j-1] + dp[i-1][j] (消耗t[j]或者不消耗t[j])
	如果 s[i-1]!=t[j-1],dp[i][j]=dp[i-1][j]
	初始条件
	dp = [
		[1,0,0,0,...],
		[1,...],
		[1,...]
		...
	]
	ans = dp[s.length,t.length]
	*/
var numDistinct = function(s, t) {
    let dp = [...s].map(_=>[1])
    dp.unshift([1].concat([...t].map(_=>0)))
    for(let i=1;i<=s.length;i++){
    	for(let j=1;j<=t.length;j++){
    		if(s[i-1]==t[j-1])dp[i][j]=dp[i-1][j-1]+dp[i-1][j]
    		else dp[i][j] = dp[i-1][j]
    	}
    }
    console.info(dp)
    return dp[s.length][t.length]
};
//滚动数组优化
numDistinct = function(s, t) {
    let prev = [1].concat([...t].map(_=>0))
    let curr = [1]
    for(let i=1;i<=s.length;i++){
    	for(let j=1;j<=t.length;j++){
    		if(s[i-1]==t[j-1])curr[j]=prev[j-1]+prev[j]
    		else curr[j] = prev[j]
    	}
    	prev = curr
    	curr = [1]
    }
    return prev[t.length]
};
//预处理优化，预先去掉s中没有在t中出现的字符
numDistinct = function(s, t) {
	s = [...s].filter(it=>t.indexOf(it)>=0)
    let prev = [1].concat([...t].map(_=>0))
    let curr = [1]
    for(let i=1;i<=s.length;i++){
    	for(let j=1;j<=t.length;j++){
    		if(s[i-1]==t[j-1])curr[j]=prev[j-1]+prev[j]
    		else curr[j] = prev[j]
    	}
    	prev = curr
    	curr = [1]
    }
    return prev[t.length]
};
let s = 'rbbbit'
let t = 'rbbit'
//s = 'aa',t = 'a'
//s = "babgbag", t = "bag"
//s = '',t = ''
//s = 'aaa',t = ''
//console.info(numDistinct(s,t))
console.info(numDistinct(s,t))