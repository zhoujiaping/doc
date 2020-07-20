/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 分治法
 */
var nextPermutation = function(nums) {
	if(nums.length==1)return nums
	if(nextPermutation0(nums,0))return true
	//该死的sort，如果不传函数，会将数字转成字符串来比较。何止是坑爹，简直就是坑爹
	nums.sort((i1,i2)=>i1-i2)
};
/**
求nums数组从start开始的子数组 的下一个排列，如果不存在，则返回false。如果存在，原地修改数组后返回true。
*/
function nextPermutation0(nums,start){
	if(start==nums.length-1)return false
	if(nextPermutation0(nums,start+1))return true
	let i = start+1
	//找后面的小于等于当前元素的下标
	for(;i<nums.length;i++){
		if(nums[i]<=nums[start]){
			break
		}
	}
	//如果找到的是当前元素后面的第一个元素，说明没有下一个更大的数了
	if(i==start+1)return false
	//假设数组为 x1,x2,x3,x4,x5,x6 当前元素为x1，找到的元素为x4,那么将x2到x3逆序，将x5到x6逆序，然后将x1到x3移到数组末尾
	reverse(nums,start+1,i-1)
	reverse(nums,i)
	let toMove = nums.splice(start,i-1-start)
	Array.prototype.push.apply(nums,toMove)
	return true
}
//将数组的start到end在数组中原地反转
function reverse(nums,start,end=nums.length){
	end = end-1
	let tmp
	while(start<end){
		tmp = nums[start]
		nums[start++] = nums[end]
		nums[end--]=tmp
	}
}
let array = [1,5,4,3]
array = [1,3,4,5]
array = [5,4,3,1]
array = [5,4,1,3]
array = [4,3,1,5]
array = [1,5,1]
array = [6,5,4,3,2,1]
//array = [100,99,98,97,96,95,94,93,92,91,90,89,88,87,86,85,84,83,82,81,80,79,78,77,76,75,74,73,72,71,70,69,68,67,66,65,64,63,62,61,60,59,58,57,56,55,54,53,52,51,50,49,48,47,46,45,44,43,42,41,40,39,38,37,36,35,34,33,32,31,30,29,28,27,26,25,24,23,22,21,20,19,18,17,16,15,14,13,12,11,10,9,8,7,6,5,4,3,2,1]
console.info(array)
//console.info(nextPermutation0(array,0))
for(let i=0;i<20;i++){
	console.info(nextPermutation(array))
	console.info(array)	
}
