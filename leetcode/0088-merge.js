/**
88. 合并两个有序数组
给你两个有序整数数组 nums1 和 nums2，请你将 nums2 合并到 nums1 中，使 nums1 成为一个有序数组。

说明:

初始化 nums1 和 nums2 的元素数量分别为 m 和 n 。
你可以假设 nums1 有足够的空间（空间大小大于或等于 m + n）来保存 nums2 中的元素。


示例:

输入:
nums1 = [1,2,3,0,0,0], m = 3
nums2 = [2,5,6],       n = 3

输出: [1,2,2,3,5,6]
通过次数200,540提交次数413,060
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
var merge = function(nums1, m, nums2, n) {
	let i=0,j=0,nums = []
	while(i<m&&j<n){
		if(nums1[i]<nums2[j]){
			nums.push(nums1[i++])
		}else{
			nums.push(nums2[j++])
		}
	}
	while(i<m){
		nums.push(nums1[i++])
	}
	while(j<n){
		nums.push(nums2[j++])
	}
	for(let k=0;k<nums.length;k++)nums1[k]=nums[k]
	return nums1
};
let nums1 = [1,2,3,0,0,0], m = 3
let nums2 = [2,5,6],       n = 3
console.info(merge(nums1,m,nums2,n))