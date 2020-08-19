/**
给定一个非负整数数组，你最初位于数组的第一个位置。

数组中的每个元素代表你在该位置可以跳跃的最大长度。

你的目标是使用最少的跳跃次数到达数组的最后一个位置。

示例:

输入: [2,3,1,1,4]
输出: 2
解释: 跳到最后一个位置的最小跳跃数是 2。
     从下标为 0 跳到下标为 1 的位置，跳 1 步，然后跳 3 步到达数组的最后一个位置。
说明:

假设你总是可以到达数组的最后一个位置。

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/jump-game-ii
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 * @param {number[]} nums
 * @return {number}
 贪心，迭代
 基于官方解法稍微修改了一下，可以记录路径。
 */
let jumpPath = nums =>{
	let path=[],maxPos={from:0,to:0},end=0
	for(let i=0;i<nums.length-1;i++){
		if(maxPos.to<i+nums[i]){
			maxPos.from = i,maxPos.to = i+nums[i]
		}
		if(i==end){
			end = maxPos.to
			path.push(maxPos.from)
		}
	}
	return path
}
//jump = nums=>jumpPath(nums).length
jump = jumpPath
console.info(jump([2,3,1,1,4]))//[0,1,4]
console.info(jump([2,1,3,2,1,2,3,1,1,5,2,3,8]))//[0,2,5,6,9,12]
console.info(jump([2,1,1,2,3,1,1,2,3,4,1,2,1,1,2]))//[0,2,3,4,7,9,13,14]
console.info(jump([2,3,0,1,4]))//[0,1,4]
console.info(jump([0]))//[0]
console.info(jump([1]))//[0]
console.info(jump([2,0,2,4,6,0,0,3]))//[0,2,4,10]
console.info(jump([8,6,5,2,1,8,1,8,9,7,1,9,1,0,0,3,2,3,5,8,9,4,3,6,5,9,7,9,9,7,3,0,5,1,4,8,9]))


