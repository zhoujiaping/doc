/**
60. 第k个排列
给出集合 [1,2,3,…,n]，其所有元素共有 n! 种排列。

按大小顺序列出所有排列情况，并一一标记，当 n = 3 时, 所有排列如下：

"123"
"132"
"213"
"231"
"312"
"321"
给定 n 和 k，返回第 k 个排列。

说明：

给定 n 的范围是 [1, 9]。
给定 k 的范围是[1,  n!]。
示例 1:

输入: n = 3, k = 3
输出: "213"
示例 2:

输入: n = 4, k = 9
输出: "2314"
通过次数44,649提交次数90,980
 * @param {number} n
 * @param {number} k
 * @return {string}
这一题，根据题意，我们可以用不断生成下一个排列的方法，生成k次即可获得第k个排列。
之前做过，这里就不重复了，参考0031-nextPermutation.js
但是从信息的角度考虑，给定n，这时候排列已经确定下来了。
第k个排列，实际上也已经确定下来了。我们并不需要一个个生成，可以直接通过规律快速找到第k个排列。
可以百度一下康托展开公式。
https://blog.csdn.net/ltrbless/article/details/87696372
康托展开可以求解一个排列的序号.
X = a(n)*(n-1)!+a(n-1)*(n-2)!+...+a(1)*0!
 */
var getPermutation = function(n, k) {
	return ''+cantorR(n,k)
};
function cantorR(n,k){
	let left = [],num = 0
	for(let i=1;i<=n;i++)left[i-1]=i
	let p,fac,r = k-1
	while(n>0){
		p = product(n-1)
		fac = r/p|0
		r = r%p
		num = num*10 + left[fac]
		left.splice(fac,1)
		n--
	}	
	return num
}
let cache = new Map()
function product(n){
	let v = cache.get(n)
	if(v!=null)return v
	if(n==0){
		v = 1
	}else if(n>0){
		v = n*product(n-1)	
	}else{
		throw new Error('error: n 不能为负数')
	}
	cache.set(n,v)
	return v
}
let n = 3,k=3
console.info(cantorR(n,k))