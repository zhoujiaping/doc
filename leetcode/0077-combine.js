/**
77. 组合
给定两个整数 n 和 k，返回 1 ... n 中所有可能的 k 个数的组合。

示例:

输入: n = 4, k = 2
输出:
[
  [2,4],
  [3,4],
  [2,3],
  [1,2],
  [1,3],
  [1,4],
]
通过次数71,997提交次数96,547
 * @param {number} n
 * @param {number} k
 * @return {number[][]}
 */
Array.prototype.getAt=function(arg){
	return this[arg>=0?arg:this.length+arg]
}
var combine = function(n, k) {
	if(k==0){
		return []
	}else if(k==1){
		return seq(1,n+1).map(it=>[it])
	}else{
		let arr = seq(1,n+1)
		let coms = combine(n-1,k-1)
		return [].concat.apply([],coms.map(com=>arr.filter(it=>it>com.getAt(-1)).map(it=>com.concat([it]))))
	}

};
function seq(start,end){
	let arr = []
	for(let i=start;i<end;i++){
		arr.push(i)
	}
	return arr
}
let n=5,k=3
console.info(combine(n,k))