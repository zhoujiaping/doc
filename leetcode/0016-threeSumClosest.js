/**
16. 最接近的三数之和
难度中等
给定一个包括 n 个整数的数组 nums 和 一个目标值 target。找出 nums 中的三个整数，使得它们的和与 target 最接近。返回这三个数的和。假定每组输入只存在唯一答案。
示例：
输入：nums = [-1,2,1,-4], target = 1
输出：2
解释：与 target 最接近的和是 2 (-1 + 2 + 1 = 2) 。
提示：
3 <= nums.length <= 10^3
-10^3 <= nums[i] <= 10^3
-10^4 <= target <= 10^4
通过次数151,442提交次数330,470
 * @param {number[]} nums
 * @return {number[][]}
 */
let threeSumClosest = (nums,target)=>{
	nums.sort((i1,i2)=>i1-i2)
	let j,k,diff,sum,
	sumClosest=nums[0]+nums[1]+nums[2],
	minDiff=Math.abs(sumClosest-target)
	for(let i=0;i<nums.length-2;i++){
		j = i+1,k=nums.length-1
		while(j<k){
			sum = nums[i]+nums[j]+nums[k]
			diff = sum - target
			if(diff==0)return sum
			diff>0?k--:j++
			if(minDiff>Math.abs(diff)){
				minDiff = Math.abs(diff)
				sumClosest = sum
			}
		}
	}
	return sumClosest
}

//如果性能不够好，说明还有信息没有利用，或者有重复
let data  = [-1,0,1,2,-1,-4]
data = [-1,2,1,-4]
data = [0,1,2]
data = [-3,-2,-5,3,-4]

let begin = new Date().getTime()
console.info(threeSumClosest(data,-1))
let end = new Date().getTime()
let cost = end-begin
console.info(cost)//耗时6518毫秒
