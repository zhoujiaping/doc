/**
10. 正则表达式匹配
难度困难
给你一个字符串 s 和一个字符规律 p，请你来实现一个支持 '.' 和 '*' 的正则表达式匹配。
'.' 匹配任意单个字符
'*' 匹配零个或多个前面的那一个元素
所谓匹配，是要涵盖 整个 字符串 s的，而不是部分字符串。
说明:
s 可能为空，且只包含从 a-z 的小写字母。
p 可能为空，且只包含从 a-z 的小写字母，以及字符 . 和 *。
示例 1:
输入:
s = "aa"
p = "a"
输出: false
解释: "a" 无法匹配 "aa" 整个字符串。
示例 2:
输入:
s = "aa"
p = "a*"
输出: true
解释: 因为 '*' 代表可以匹配零个或多个前面的那一个元素, 在这里前面的元素就是 'a'。因此，字符串 "aa" 可被视为 'a' 重复了一次。
示例 3:
输入:
s = "ab"
p = ".*"
输出: true
解释: ".*" 表示可匹配零个或多个（'*'）任意字符（'.'）。
示例 4:
输入:
s = "aab"
p = "c*a*b"
输出: true
解释: 因为 '*' 表示零个或多个，这里 'c' 为 0 个, 'a' 被重复一次。因此可以匹配字符串 "aab"。
示例 5:
输入:
s = "mississippi"
p = "mis*is*p*."
输出: false
通过次数113,972提交次数374,784
 * 正则匹配
 * @param {string} s
 * @param {string} p
 * @return {boolean}
 执行用时：96 ms, 在所有 JavaScript 提交中击败了58.63%的用户
 内存消耗：34.1 MB, 在所有 JavaScript 提交中击败了100.00%的用户
  用正则是不是太欺负人了，哈哈
 */
var isMatch = function(s, p) {
    let reg = new RegExp(`^${p}$`)
    return reg.test(s)
};
//方法：分治法
let isMatch0 = (s,p)=>{
	if(p.length==0)return s.length==0
	if(p.length==1){
		if(s.length!=1)return false
		if(p[0]=='.')return true
		return p[0]===s[0]
	}
	let [pfst,psnd,...prest] = p
	let [sfst,...srest] = s
    if(pfst=='.'){
    	if(psnd=='*'){
    		return isMatch1(s,prest)
    	}else{
    		return sfst!==undefined && isMatch0(srest,[psnd,...prest])
    	}
    }else{
    	if(psnd=='*'){
    		return isMatch2(s,pfst,prest)
    	}else{
    		return pfst===sfst && isMatch0(srest,[psnd,...prest])
    	}
    }
}
//判断s后缀是否匹配p
let isMatch1 = (s,p)=>{
	if(p.length==0)return true
	s = s.concat([])
	while(s.length>0){
		if(isMatch0(s,p)){
			return true
		}
		s.shift()
	}
	return isMatch0(s,p)
}
//s的前部分是若干个（大于0个）字符ch，后部分匹配p2
let isMatch2 = (s,ch,p2)=>{
	for(let i=0;i<s.length;i++){
		if(s[i]!==ch){
			return isMatch0(s.slice(i),p2)
		}else{
			if(isMatch0(s.slice(i),p2)||isMatch0(s.slice(i+1),p2)){
				return true
			}
		}
	}
	return isMatch([],p2)
}
isMatch = (s,p)=>isMatch0([...s],[...p])
//评论区发现的方法，使用递归
isMatch = (s,p,i=0,j=0)=>{
	if(p.length==j)return s.length==i
	let firstMatch = i<s.length && (s[i]==p[j]||p[j]=='.')
	if(p.length>j+1 && p[j+1]=='*'){
		return isMatch(s,p,i,j+2) || (firstMatch && isMatch(s,p,i+1,j))
	}else{
		return firstMatch && isMatch(s,p,i+1,j+1)
	}
}
/**dp 显然上面的递归版本效率更高，因为有firstMatch判断提前返回，避免了后面无意义的递归*/
isMatch = (s,p)=>{
	//dp[i][j]：s的前i个字符是否匹配p的前j个字符
	let dp = [...s].map(it=>[])
	dp.push([])
	dp[0][0]=true
	//dp[x][0]=false, if x>0
	for(let i=1;i<dp.length;i++)dp[i][0]=false
	//dp[x][1]=false, if x!=1
	dp[0][1]=false
	for(let i=2;i<dp.length;i++)dp[i][1]=false
	if(s.length>0&&p.length>0){
		dp[1][1]=s[0]==p[0]||p[0]=='.'
	}
	for(let i=0;i<=s.length;i++){
		for(let j=2;j<=p.length;j++){
			if(p[j-1]=='*'){//s[i-1]不匹配或者匹配p[j-2]*
				dp[i][j] = dp[i][j-2] || i>0&&(s[i-1]==p[j-2]||p[j-2]=='.')&&dp[i-1][j]
			}else{
				dp[i][j] = i>0 && (p[j-1]==s[i-1]||p[j-1]=='.') && dp[i-1][j-1]
			}
		}
	}
	return dp[s.length][p.length]
}
//console.info(isMatch("a",'.*a*'))//true
/*console.info(isMatch("a",'.*..a*'))//false
console.info(isMatch("ab",'.*c'))//false
console.info(isMatch2(['a','a'],'a',[]))//true
console.info(isMatch("aa","a*"))//true
console.info(isMatch("aa","a"))//false
console.info(isMatch("ab",".*"))//true
console.info(isMatch("aab","c*a*b"))//true
console.info(isMatch("mississippi","mis*is*p*."))//false*/
//console.info(isMatch1([...'abc'],[...'bc']))
//console.info(isMatch1([],[...'bc']))
//console.info(isMatch1([],[...'.*']))


console.info(isMatch("aa","a.*a"))//true
