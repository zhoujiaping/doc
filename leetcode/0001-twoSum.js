/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 * 2020-06-22
 */
var twoSum = function(nums, target) {
    for(let i=0;i<nums.length-1;i++){
        for(let j=i+1;j<nums.length;j++){
            if(nums[i]|nums[j]==target){
                return [i,j]
            }
        }
    }
}
console.info(twoSum([2,7,11,15],9))
console.info(twoSum([3,2,4],6))
console.info(twoSum([2,5,5,11],10))