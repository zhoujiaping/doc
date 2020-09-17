/**
118. 杨辉三角
给定一个非负整数 numRows，生成杨辉三角的前 numRows 行。
在杨辉三角中，每个数是它左上方和右上方的数的和。

示例:

输入: 5
输出:
[
     [1],
    [1,1],
   [1,2,1],
  [1,3,3,1],
 [1,4,6,4,1]
]
通过次数105,417提交次数156,383
*/
/**
 * @param {number} numRows
 * @return {number[][]}
 */
const nums = [[1],[1,1],[1,2,1],[1,3,3,1],[1,4,6,4,1]]
var generate = function(numRows) {
	if(numRows<=nums.length)return nums.slice(0,numRows)
	let prevRow = nums[nums.length-1]
	while(prevRow.length<numRows){
		prevRow = generateRow(prevRow)
		nums.push(prevRow)
	}
	return nums.slice(0,numRows)
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
//console.info(generateRow([1,2,1]))
//console.info(generateRow([1]))
//console.info(generateRow([1,4,6,4,1]))
//console.info(generateRow([1,3,3,1]))
console.info(generate(30))