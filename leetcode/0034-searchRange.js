/**
34. 在排序数组中查找元素的第一个和最后一个位置
给定一个按照升序排列的整数数组 nums，和一个目标值 target。找出给定目标值在数组中的开始位置和结束位置。

你的算法时间复杂度必须是 O(log n) 级别。

如果数组中不存在目标值，返回 [-1, -1]。

示例 1:

输入: nums = [5,7,7,8,8,10], target = 8
输出: [3,4]
示例 2:

输入: nums = [5,7,7,8,8,10], target = 6
输出: [-1,-1]


二分法查找
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var searchRange = function(nums, target) {
	let from = searchFrom(nums,0,nums.length-1,target)
	if(from<0){
		return [-1,-1]
	}
	let to = searchTo(nums,from,nums.length-1,target)
	return [from,to]
};
function searchFrom(nums,i,j,target){
	let p=i,q=j,m,ret
	while(p<=q){
		m=p+q>>1
		if(nums[m]==target){
			if(nums[m-1]==target){
				return searchFrom(nums,i,m-1,target)
			}else{
				return m
			}
		}else if(nums[m]<target){
			p=m+1
		}else{
			q=m-1
		}
	}
	return -1
}
function searchTo(nums,i,j,target){
	let p=i,q=j,m,ret
	while(p<=q){
		m=p+q>>1
		if(nums[m]==target){
			if(nums[m+1]==target){
				return searchTo(nums,m+1,j,target)
			}else{
				return m
			}
		}else if(nums[m]<target){
			p=m+1
		}else{
			q=m-1
		}
	}
	return -1
}
searchRange = (nums,target,from,to)=>{
	if(nums.length==0)return [-1,-1]
	let p=from==null?0:from,q=to==null?nums.length-1:to,m
	while(p<=q){
		m=p+q>>1
		if(nums[m]==target){
			let [fst1,snd1] = searchRange(nums,target,p,m-1)
			let [fst2,snd2] = searchRange(nums,target,m+1,q)
			return [Math.min.apply(null,[fst1,m,fst2].filter(i=>i>=0)),
				Math.max.apply(null,[snd1,m,snd2].filter(i=>i>=0))]
		}else if(nums[m]<target){
			p=m+1
		}else{
			q=m-1
		}
	}
	return [-1,-1]
}
let nums = [5,7,8,9,10,12],target = 8
nums = [5,7,7,8,8,10],target = 8
//nums = [2,2],target=2
console.info(searchRange(nums,target))
//console.info(searchFrom(nums,0,nums.length-1,target))
//console.info(searchTo(nums,0,nums.length-1,target))