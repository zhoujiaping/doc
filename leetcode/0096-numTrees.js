/**
96. 不同的二叉搜索树
给定一个整数 n，求以 1 ... n 为节点组成的二叉搜索树有多少种？

示例:

输入: 3
输出: 5
解释:
给定 n = 3, 一共有 5 种不同结构的二叉搜索树:

   1         3     3      2      1
    \       /     /      / \      \
     3     2     1      1   3      2
    /     /       \                 \
   2     1         2                 3
通过次数83,599提交次数120,968
 * @param {number} n
 * @return {number}
 我们可以用上一题的方法。
 但是，这里有更高效的方法。求卡特兰数。
 递推公式：c(n+1) = (4n+2)/(n+2)*c(n)
 */
var numTrees = function(n) {
	if(n==0)return 1
	n = n-1
	return (4*n+2)/(n+2)*numTrees(n)
};
//方法二。官方解法用的dp，但是这题其实用个缓存就行了
let cache = new Map()
numTrees = function(n) {
	let v = cache.get(n)
	if(v!=null)return v
	if(n==0){
		cache.set(0,1)
		return 1
	}
	v = 0
	for(let i=0;i<n;i++){
		v += numTrees(i)*numTrees(n-i-1)	
	}
	cache.set(n,v)
	return v
};
function range(from,to,step=1){
	let arr = []
	let i
	if(step>0){
		for(i=from;i<to;i=i+step){
			arr.push(i)
		}
	}else if(step<0){
		for(i=from;i>to;i=i+step){
			arr.push(i)
		}
	}else{
		throw new Error(`step can't be zero!`)
	}
	return arr
}
console.info(numTrees(4))