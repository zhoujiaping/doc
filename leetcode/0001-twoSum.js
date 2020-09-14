/**
1. 两数之和
难度简单
给定一个整数数组 nums 和一个目标值 target，请你在该数组中找出和为目标值的那 两个 整数，并返回他们的数组下标。
你可以假设每种输入只会对应一个答案。但是，数组中同一个元素不能使用两遍。
示例:
给定 nums = [2, 7, 11, 15], target = 9
因为 nums[0] + nums[1] = 2 + 7 = 9
所以返回 [0, 1]
*/

/*
首先想到的是暴力法，穷举所有的两两组合的情况，找到了立即返回。时间复杂度和空间复杂度分别为O(n^2)和O(1)。
优化：实际上我们是需要查找差值（target-nums[i])在nums中是否存在。
要实现快速查找，一般可以用二分法查找和hash。
*/

/*
通过次数1,362,550提交次数2,759,907
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 * 2020-06-22
 */
//暴力法
var twoSum = function(nums, target) {
    for(let i=0;i<nums.length-1;i++){
        for(let j=i+1;j<nums.length;j++){
            if(nums[i]+nums[j]==target){
                return [i,j]
            }
        }
    }
}
//hashmap
twoSum = (nums,target)=>{
    let map = new Map()
    for(let i=0;i<nums.length;i++){
        let it = nums[i]
        let v = map.get(it)
        if(v!=null)return [i,v]
        map.set(target-it,i)
    }
    return []
}
console.info(twoSum([2,7,11,15],9))
console.info(twoSum([3,2,4],6))
console.info(twoSum([2,5,5,11],10))