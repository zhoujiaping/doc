/**
169. 多数元素
给定一个大小为 n 的数组，找到其中的多数元素。多数元素是指在数组中出现次数大于 ⌊ n/2 ⌋ 的元素。

你可以假设数组是非空的，并且给定的数组总是存在多数元素。

示例 1:

输入: [3,2,3]
输出: 3
示例 2:

输入: [2,2,1,1,1,2,2]
输出: 2
通过次数215,077提交次数332,900
*/
/**
 * @param {number[]} nums
 * @return {number}
 */
var majorityElement = function(nums) {
	let map = new Map()
	let max = [1,0]
	for(let it of nums){
		let times = map.get(it)
		if(times==null)times = 0
		map.set(it,times+1)
		if(times+1>max[1]){
			max = [it,times+1]
		}
	}
	let threshold = nums.length/2|0
	/*for(let it of map.entries()){
		if(it[1]>threshold)return it[0]
	}*/
	if(max[1]>threshold)return max[0]
	return null
};
/**投票算法
前提条件：该数出现次数必须大于其他数出现次数之和
*/
var majorityElement = function(nums) {
    let count = 1
    let target = nums[0]
    for(let i =1;i<nums.length;i++){
        if (count === 0) {
            target = nums[i]
        }
        if(target === nums[i]) {
            count++
        }else{
            count--
        }
    }
    return target
};
let nums = [2,2,1,1,1,2,2]
nums = [2,1,2,1,3,2,3]
console.info(majorityElement(nums))