/**
给定一个可包含重复数字的序列，返回所有不重复的全排列。

示例:

输入: [1,1,2]
输出:
[
  [1,1,2],
  [1,2,1],
  [2,1,1]
]

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/permutations-ii
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function(nums) {
	if(!nums.length){
		return [[]]
	}
	let subPermute = permute(nums.slice(1))
	return [].concat.apply([],nums.map((_,i)=>
		subPermute.map(sub=>sub.slice(0,i).concat([nums[0]]).concat(sub.slice(i)))
	))
}
var permuteUnique = nums=>{
	return [...new Set(permute(nums).map(it=>it.join(',')))].map(it=>it.split(',').map(it=>+it))
}
console.info(permuteUnique([1,1,2]))