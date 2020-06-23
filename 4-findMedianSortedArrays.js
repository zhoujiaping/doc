/**
	寻找两个正序数组的中位数  
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 * 先排序，再取中间那个数，这样最简单。
 */
var findMedianSortedArrays = function(nums1, nums2) {
    let nums = nums1.concat(nums2)
    nums.sort((a,b)=>a-b)
    console.info(nums)
    let mid = ~~(nums.length/2)//利用取反操作，连续两次，实现Math.floor的效果
    if((nums.length&1)==0){//判断nums是否为偶数
        return (nums[mid-1]+nums[mid])/2
    }
    return nums[mid]
};
console.info(findMedianSortedArrays([3],[-2,-1]))