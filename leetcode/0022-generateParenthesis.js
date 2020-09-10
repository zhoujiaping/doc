/**
22. 括号生成
难度中等
数字 n 代表生成括号的对数，请你设计一个函数，用于能够生成所有可能的并且 有效的 括号组合。
示例：
输入：n = 3
输出：[
       "((()))",
       "(()())",
       "(())()",
       "()(())",
       "()()()"
     ]
通过次数176,097提交次数231,101
 * @param {number} n
 * @return {string[]}
 */
var generateParenthesis0 = function(n) {
	if(n==0)return ['']
	else if(n==1)return ['()']
	let res = []
	for(let i=1;i<n;i++){
		let left = generateParenthesis0(i)
		let right = generateParenthesis0(n-i)
		res = Array.prototype.concat.apply(res,left.map(j=>right.map(k=>j+k)))
	}
	res = res.concat(generateParenthesis0(n-1).map(k=>'('+k+')'))
	return res
};

var generateParenthesis = n=>{
	let set = new Set()
	cacheable(generateParenthesis0)(n).forEach(i=>set.add(i))
	return Array.from(set)
}
function cacheable(f){
	let cache = []
	return n=>{
		if(cache[n]!=null){
			return cache[n]
		}
		cache[n] = f(n)
		return cache[n]
	}
}
console.info("n=1 ===>")
console.info(generateParenthesis(1))
console.info("n=2 ===>")
console.info(generateParenthesis(2))
console.info("n=3 ===>")
console.info(generateParenthesis(3))
console.info("n=4 ===>")
console.info(generateParenthesis(4))
