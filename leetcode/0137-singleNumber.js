/**
137. 只出现一次的数字 II
给定一个非空整数数组，除了某个元素只出现一次以外，其余每个元素均出现了三次。找出那个只出现了一次的元素。
说明：
你的算法应该具有线性时间复杂度。 你可以不使用额外空间来实现吗？
示例 1:
输入: [2,2,3,2]
输出: 3
示例 2:
输入: [0,1,0,1,0,1,99]
输出: 99
通过次数41,347提交次数60,859
*/
/**
 * @param {number[]} nums
 * @return {number}
逻辑电路角度详细分析该题思路，可推广至通解
 https://leetcode-cn.com/problems/single-number-ii/solution/luo-ji-dian-lu-jiao-du-xiang-xi-fen-xi-gai-ti-si-l/
 */
var singleNumber = function(nums) {
	let once=0,twice=0
	for(let num of nums){
		once = ~twice&(once^num)
		twice = ~once&(twice^num)
	}
	return once
};
Array.prototype.sum = function(){
	return this.reduce((prev,curr)=>prev+curr,0)
}
singleNumber = nums=>([...new Set(nums)].sum()*3-nums.sum())/2
console.info(singleNumber([2,2,3,2]))