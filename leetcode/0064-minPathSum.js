/**
64. 最小路径和
给定一个包含非负整数的 m x n 网格，请找出一条从左上角到右下角的路径，使得路径上的数字总和为最小。

说明：每次只能向下或者向右移动一步。

示例:

输入:
[
  [1,3,1],
  [1,5,1],
  [4,2,1]
]
输出: 7
解释: 因为路径 1→3→1→1→1 的总和最小。
通过次数138,829提交次数205,642
 * @param {number[][]} grid
 * @return {number}
 dp
 */
Array.prototype.getAt=function(i){
	return this[i>=0?i:i+this.length]
}
var minPathSum = function(grid) {
	if(grid.length==0||grid[0].length==0)return 0
	let m=grid.length,n=grid[0].length
	let curr = []
	curr[n-1] = grid[m-1][n-1]
	for(let i=n-2;i>=0;i--)curr[i]=curr[i+1]+grid[m-1][i]
	console.info(curr)
	for(let i=m-2;i>=0;i--){
		curr[n-1] = curr[n-1]+grid[i][n-1]
		for(let j=n-2;j>=0;j--){
			curr[j] = grid[i][j]+Math.min(curr[j+1],curr[j])
		}
		console.info(curr)
	}
	return curr[0]
};
let grid = [
  [1,3,1],
  [1,5,1],
  [4,2,1]
]
console.info(minPathSum(grid))