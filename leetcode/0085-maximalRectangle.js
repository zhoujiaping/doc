/**
85. 最大矩形
给定一个仅包含 0 和 1 的二维二进制矩阵，找出只包含 1 的最大矩形，并返回其面积。

示例:

输入:
[
  ["1","0","1","0","0"],
  ["1","0","1","1","1"],
  ["1","1","1","1","1"],
  ["1","0","0","1","0"]
]
输出: 6
通过次数39,840提交次数83,490
 * @param {character[][]} matrix
 * @return {number}
 */
var maximalRectangle = function(matrix) {
	//dp[i][j]表示以(i,j)为左上顶点的最大矩形的右下顶点的坐标。ans=Max(area(dp[i][j]))
	let dp = matrix.map((row,i)=>row.map((col,j)=>matrix[i][j]==0?null:[i,j]))
	for(let i=0;i<matrix.length;i++){
		for(let j=0;j<matrix[i].length;j++){
			if(i==0){
				
			}
			if(dp[i-1][j-1]==null){
				dp[i][j]=null
			}
		}
	}
};