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
//方法：有限状态机
function dfa(){
	this.table = {
		'start':[],
		'letter':[],
		'*':[],
		'.':[],
		'end':[]
	}
}
let newDfa=()=>{


}
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
console.info(isMatch("a",'.*..a*'))
console.info(isMatch("ab",'.*c'))
console.info(isMatch2(['a','a'],'a',[]))
console.info(isMatch("aa","a*"))
console.info(isMatch("aa","a"))
console.info(isMatch("ab",".*"))
console.info(isMatch("aab","c*a*b"))
console.info(isMatch("mississippi","mis*is*p*."))
//console.info(isMatch1([...'abc'],[...'bc']))
//console.info(isMatch1([],[...'bc']))
//console.info(isMatch1([],[...'.*']))