/**
给你一个未排序的整数数组，请你找出其中没有出现的最小的正整数。

 

示例 1:

输入: [1,2,0]
输出: 3
示例 2:

输入: [3,4,-1,1]
输出: 2
示例 3:

输入: [7,8,9,11,12]
输出: 1
 

提示：

你的算法的时间复杂度应为O(n)，并且只能使用常数级别的额外空间。

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/first-missing-positive
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

 * @param {number[]} nums
 * @return {number}

 排序，O(n) ==> 桶排序算法
 */
var firstMissingPositive = function(nums) {
	let arr = [0]
	for(let i=0;i<nums.length;i++){
		if(nums[i]>0){
			arr[nums[i]] = 1
		}
	}
	for(let i=1;i<arr.length;i++){
		if(arr[i]===undefined){
			return i
		}
	}
	return arr.length
};
console.info(firstMissingPositive([2,4,3,1]))
console.info(firstMissingPositive([]))