/**
90. 子集 II
给定一个可能包含重复元素的整数数组 nums，返回该数组所有可能的子集（幂集）。

说明：解集不能包含重复的子集。

示例:

输入: [1,2,2]
输出:
[
  [2],
  [1],
  [1,2,2],
  [2,2],
  [1,2],
  []
]
通过次数46,877提交次数77,192
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsetsWithDup = function(nums) {
	let ans = subsets(nums)
	let map = new Map()
	ans.forEach(it=>{
		it.sort((o1,o2)=>o1-o2)
		map.set(it.join(''),it)
	})  
	return [...map.values()]
};
function subsets(nums){
	if(nums.length==0)return [[]]
	let sub = subsets(nums.slice(1))
	return sub.concat(sub.map(item=>[nums[0]].concat(item)))
}
console.info(subsetsWithDup([1,2,2]))