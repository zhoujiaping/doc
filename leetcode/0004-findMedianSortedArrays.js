/**
4. 寻找两个正序数组的中位数
难度困难
给定两个大小为 m 和 n 的正序（从小到大）数组 nums1 和 nums2。
请你找出这两个正序数组的中位数，并且要求算法的时间复杂度为 O(log(m + n))。
你可以假设 nums1 和 nums2 不会同时为空。
示例 1:
nums1 = [1, 3]
nums2 = [2]
则中位数是 2.0
示例 2:
nums1 = [1, 2]
nums2 = [3, 4]
则中位数是 (2 + 3)/2 = 2.5
通过次数254,947提交次数658,097
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var findMedianSortedArrays = function(nums1, nums2) {
    let i1 = 0;
	let i2 = 0;
	let i = 0;
	let k = nums1.length+nums2.length;
	let len1 = nums1.length;
	let len2 = nums2.length;
	let prevNum = 0;
	let num = 0;
	let p = k>>1;
	while(true){
		prevNum = num;
		if(i1>=len1){
			num = nums2[i2];
			i2++;
		}else if(i2>=len2){
			num = nums1[i1];
			i1++;
		}else{
			if(nums1[i1]<nums2[i2]){
				num = nums1[i1];
				i1++;
			}else{
				num = nums2[i2];
				i2++;
			}
		}
		if(i==p){
			return k%2==1?num:(prevNum+num)/2;
		}
		i++;
	}	
};
findMedianSortedArrays = (nums1,nums2)=>{
    let nums = nums1.concat(nums2).sort((o1,o2)=>o1-o2)
    if(nums.length%2==1)return nums[nums.length>>1]
    else return (nums[nums.length/2-1]+nums[nums.length/2])/2
}
let nums1 = [2];
let nums2 = [];
let res = findMedianSortedArrays(nums1,nums2);
console.info(res);