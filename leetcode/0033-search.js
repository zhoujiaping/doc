/*

假设按照升序排序的数组在预先未知的某个点上进行了旋转。

( 例如，数组 [0,1,2,4,5,6,7] 可能变为 [4,5,6,7,0,1,2] )。

搜索一个给定的目标值，如果数组中存在这个目标值，则返回它的索引，否则返回 -1 。

你可以假设数组中不存在重复的元素。

你的算法时间复杂度必须是 O(log n) 级别。

示例 1:

输入: nums = [4,5,6,7,0,1,2], target = 0
输出: 4
示例 2:

输入: nums = [4,5,6,7,0,1,2], target = 3
输出: -1

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/search-in-rotated-sorted-array
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
*/
var search = function(nums, target) {
	let p=0,q=nums.length-1,m
	while(p<=q){
		m = p+q>>1
		if(target == nums[m])return m
		if(nums[p]<=nums[m]){//左边有序
			if(target>nums[m] || target<nums[p]){
				p=m+1
			}else{
				q=m-1
			}
		}else{//右边有序
			if(target<nums[m] || target>nums[q]){
				q=m-1
			}else{
				p=m+1
			}
		}
	}
	return -1
}
let nums = [4,5,6,7,0,1,2], target = 0
nums=[3,1],target=1
nums=[1,3],target=1
console.info(search(nums,target))