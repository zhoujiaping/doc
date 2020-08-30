/**
63. 不同路径 II
一个机器人位于一个 m x n 网格的左上角 （起始点在下图中标记为“Start” ）。

机器人每次只能向下或者向右移动一步。机器人试图达到网格的右下角（在下图中标记为“Finish”）。

现在考虑网格中有障碍物。那么从左上角到右下角将会有多少条不同的路径？



网格中的障碍物和空位置分别用 1 和 0 来表示。

说明：m 和 n 的值均不超过 100。

示例 1:

输入:
[
  [0,0,0],
  [0,1,0],
  [0,0,0]
]
输出: 2
解释:
3x3 网格的正中间有一个障碍物。
从左上角到右下角一共有 2 条不同的路径：
1. 向右 -> 向右 -> 向下 -> 向下
2. 向下 -> 向下 -> 向右 -> 向右
通过次数97,171提交次数265,564
*/

Array.prototype.getAt=function(i){
	return this[i>=0?i:i+this.length]
}
var uniquePathsWithObstacles = function(grid) {
	if(grid[0][0]==1 || grid.getAt(-1).getAt(-1)==1)return 0
	let m=grid.length,n=grid[0].length
	let curr = []
	curr[n-1]=1
	for(let i=n-2;i>=0;i--)curr[i]=curr[i+1] && grid.getAt(-1)[i]==0?1:0
	console.info(curr)
	for(let i=m-2;i>=0;i--){
		curr[n-1] = curr[n-1]==1&&grid[i][n-1]==0?1:0
		for(let j=n-2;j>=0;j--){
			curr[j] = grid[i][j]==1?0:(curr[j+1]+curr[j])
			
		}
		console.info(curr)
	}
	return curr[0]
};

let grid = [
  [0,0,0],
  [0,0,1],
  [0,0,0]
]
grid2=[[0,1]]
grid2 = [
	[0,1],
	[0,0]
]
console.info(uniquePathsWithObstacles(grid))
