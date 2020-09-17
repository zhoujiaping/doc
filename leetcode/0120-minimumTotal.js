/**
120. 三角形最小路径和
给定一个三角形，找出自顶向下的最小路径和。每一步只能移动到下一行中相邻的结点上。

相邻的结点 在这里指的是 下标 与 上一层结点下标 相同或者等于 上一层结点下标 + 1 的两个结点。
例如，给定三角形：

[
     [2],
    [3,4],
   [6,5,7],
  [4,1,8,3]
]
自顶向下的最小路径和为 11（即，2 + 3 + 5 + 1 = 11）。
说明：

如果你可以只使用 O(n) 的额外空间（n 为三角形的总行数）来解决这个问题，那么你的算法会很加分。

通过次数107,080提交次数160,632
*/
/**
 * @param {number[][]} triangle
 * @return {number}
 非常典型的dp,以及非常经典的滚动数组实现空间优化
 */
var minimumTotal = function(triangle) {
	//dp[i][j]：第i行第j列的最小路径和
	let dp = triangle.map(_=>[])
	dp.pop(),dp.push(triangle[triangle.length-1])
	for(let i=triangle.length-2;i>=0;i--){
		for(let j=0;j<triangle[i].length;j++){
			dp[i][j] = triangle[i][j]+Math.min(dp[i+1][j],dp[i+1][j+1])
		}
	}
	return dp[0][0]
};
minimumTotal = function(triangle) {
	//dp[j]：当前行第j列的最小路径和
	let dp = triangle[triangle.length-1].concat([])
	for(let i=triangle.length-2;i>=0;i--){
		for(let j=0;j<triangle[i].length;j++){
			dp[j] = triangle[i][j]+Math.min(dp[j],dp[j+1])
		}
	}
	return dp[0]
};
let triangle = [
     [2],
    [3,4],
   [6,5,7],
  [4,1,8,3]
]
console.info(minimumTotal(triangle))