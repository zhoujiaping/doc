/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function(nums) {
    if(nums.length<2){
        return nums.length
    }
    let i=1
    while(i<nums.length){
        if(nums[i] === nums[i-1]){
            nums.splice(i,1)
        }else{
            i++
        }
    }
    return nums.length
};
removeDuplicates = function(nums) {
    if(nums.length<2)return nums.length
    let i=0,j=1
    while(j<nums.length){
        if(nums[i] !== nums[j]){
            nums[++i] = nums[j]
        }
        j++
    }
    return i+1
};
let data = [1,1,2]
console.info(removeDuplicates(data))
console.info(data)