/**
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
