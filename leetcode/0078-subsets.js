/**
78. 子集
给定一组不含重复元素的整数数组 nums，返回该数组所有可能的子集（幂集）。

说明：解集不能包含重复的子集。

示例:

输入: nums = [1,2,3]
输出:
[
  [3],
  [1],
  [2],
  [1,2,3],
  [1,3],
  [2,3],
  [1,2],
  []
]
通过次数126,080提交次数161,892
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsets = function(nums) {
	if(nums.length==0){
		return [[]]
	}else if(nums.length==1){
		return [[],[nums[0]]]
	}else{
		let sub = subsets(nums.slice(0,-1))
		return sub.concat(sub.map(arr=>arr.concat(nums.slice(-1))))
	}
};
let nums = [1,2,3]
console.info(subsets(nums))