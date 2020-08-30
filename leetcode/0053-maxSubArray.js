/**
给定一个整数数组 nums ，找到一个具有最大和的连续子数组（子数组最少包含一个元素），返回其最大和。

示例:

输入: [-2,1,-3,4,-1,2,1,-5,4]
输出: 6
解释: 连续子数组 [4,-1,2,1] 的和最大，为 6。
进阶:

如果你已经实现复杂度为 O(n) 的解法，尝试使用更为精妙的分治法求解。

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/maximum-subarray
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 * @param {number[]} nums
 * @return {number}
dp
 */
Array.prototype.sum = function(from=0,to=this.length){
	let sum = 0
	for(let i=from;i<to;i++){
		sum+=this[i]
	}
	return sum
}
//不仅找到最大和，而且找到最大和的子数组的起始位置和结束位置，内存占用当然要比别人的程序低咯
var maxSubArray0 = function(nums) {
	if(nums.length==0)return {from:-1,to:-1,sum:0}
	/*dp[i]:以i结尾的 具有最大和的连续子数组。
	dp[i] = dp[i-1]
	dp[i] = dp[i-1]
	ans=max(...dp)*/
	let dp = [{from:0,to:0,sum:nums[0]}]
	for(let i=1;i<nums.length;i++){
		dp[i] = {to:i}
		if(dp[i-1].sum>=0){
			dp[i].from = dp[i-1].from,dp[i].sum = dp[i-1].sum+nums[i]
		}else{
			dp[i].from = i,dp[i].sum = nums[i]
		}
	}
	return dp.slice(1).reduce((prev,curr)=>curr.sum>prev.sum?curr:prev,dp[0])
};
let maxSubArray = nums=>maxSubArray0(nums).sum
//console.info([1,2,3].sum())
let nums = [-2,1,-3,4,-1,2,1,-5,4]
console.info(maxSubArray(nums))