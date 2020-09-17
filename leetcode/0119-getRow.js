/**
119. 杨辉三角 II
给定一个非负索引 k，其中 k ≤ 33，返回杨辉三角的第 k 行。



在杨辉三角中，每个数是它左上方和右上方的数的和。

示例:

输入: 3
输出: [1,3,3,1]
进阶：

你可以优化你的算法到 O(k) 空间复杂度吗？

通过次数69,773提交次数112,774
*/
/**
 * @param {number} rowIndex
 * @return {number[]}
 */
const nums = [[1],[1,1],[1,2,1],[1,3,3,1],[1,4,6,4,1]]
var getRow = function(rowIndex) {
	if(rowIndex<nums.length)return nums[rowIndex]
	let prevRow = nums[nums.length-1]
	while(prevRow.length<=rowIndex){
		prevRow = generateRow(prevRow)
		nums.push(prevRow)
	}
	return prevRow
};
function generateRow(prevRow){
	let ans = [1]
	let mid = prevRow.length>>1
	for(let i=0;i<mid;i++){
		ans.push(prevRow[i]+prevRow[i+1])
	}
	let reverse = [].concat(ans).reverse()
	if((prevRow.length&1)==0){
		ans.pop()
	}
	return ans.concat(reverse)
}
console.info(getRow(5))