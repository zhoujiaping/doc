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
 dp思想
 状态：dp[i,j]保存一个数组，表示从i跳到j的最短步骤
 状态转移方程：dp[i,j] = Math.min(dp[i,k],dp[k,j]),k取1到nums[i]
 边界：dp[x,k0] = 1,k0取1到nums[x]
 */

var jump = function(nums) {
	let dp = nums.map((item,i)=>[])
	let count = 0,hit=0
	let ans = jump0(0,nums.length-1)
	console.info(`count=${count},hit=${hit}`)
	return ans
	function jump0(i,j){
		count++
		if(dp[i][j]){
			hit++
			return dp[i][j]
		}
		if(i==j)return dp[i][j] = []
		if(nums[i]==0)return dp[i][j]=null
		if(i+nums[i]>=j){
			return dp[i][j] = [j-i]
		}
		for(let k=i+1;k<j;k++){
			let d1 = jump0(i,k)
			let d2 = jump0(k,j)
			if(d1&&d2&&(dp[i][j]==null || d1.length+d2.length<dp[i][j].length)){
				dp[i][j] = d1.concat(d2)
			}
		}
		return dp[i][j]
	}
};
console.info(jump([2,3,1,1,4]))
console.info(jump([2,1,3,2,1,2,3,1,1,5,2,3,8]))
console.info(jump([2,1,1,2,3,1,1,2,3,4,1,2,1,1,2]))
console.info(jump([2,3,0,1,4]))
console.info(jump([0]))
console.info(jump([1]))
console.info(jump([2,0,2,4,6,0,0,3]))
console.info(jump([8,6,5,2,1,8,1,8,9,7,1,9,1,0,0,3,2,3,5,8,9,4,3,6,5,9,7,9,9,7,3,0,5,1,4,8,9]))


