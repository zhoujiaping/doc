/**
81. 搜索旋转排序数组 II
假设按照升序排序的数组在预先未知的某个点上进行了旋转。

( 例如，数组 [0,0,1,2,2,5,6] 可能变为 [2,5,6,0,0,1,2] )。

编写一个函数来判断给定的目标值是否存在于数组中。若存在返回 true，否则返回 false。

示例 1:

输入: nums = [2,5,6,0,0,1,2], target = 0
输出: true
示例 2:

输入: nums = [2,5,6,0,0,1,2], target = 3
输出: false
进阶:

这是 搜索旋转排序数组 的延伸题目，本题中的 nums  可能包含重复元素。
这会影响到程序的时间复杂度吗？会有怎样的影响，为什么？
通过次数38,189提交次数106,676
 * @param {number[]} nums
 * @param {number} target
 * @return {boolean}
 */
var search = function(nums, target,begin=0,end=nums.length-1) {
	if(begin>end)return false
	if(begin==end)return nums[begin]==target
	if(nums[begin]==target||nums[end]==target)return true
	let mid=(begin+end)/2|0
	if(nums[mid]==target)return true
	if(nums[mid]<nums[begin]){//mid及其右边有序
		if(nums[mid]<target&&nums[end]>target){//一定在mid右边
			return binSearch(nums,target,mid+1,end)
		}else{
			return search(nums,target,begin,mid-1)
		}
	}else if(nums[mid]>nums[begin]){//mid及其左边有序
		if(nums[begin]<target&&nums[mid]>target){
			return binSearch(nums,target,begin,mid-1)
		}else{
			return search(nums,target,mid+1,end)
		}
	}else{
		return search(nums,target,begin,mid-1)||search(nums,target,mid+1,end)
	}
};
function binSearch(nums,target,begin=0,end=nums.length-1){
	let mid
	while(begin<=end){
		mid=(begin+end)/2|0
		if(nums[mid]==target)return true
		if(nums[mid]<target)begin=mid+1
		else end = mid-1
	}
	return false	
}
let nums = [4,5,6,7,0,1,2]
let target = 6
console.info(search(nums,target))