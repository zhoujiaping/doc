/**
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
	let firstMath = i<s.length && (s[i]==p[j]||p[j]=='.')
	if(p.length>j+1 && p[j+1]=='*'){
		return isMatch(s,p,i,j+2) || (firstMath && isMatch(s,p,i+1,j))
	}else{
		return firstMath && isMatch(s,p,i+1,j+1)
	}
}
/**dp*/
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
