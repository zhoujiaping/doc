/**
73. 矩阵置零
给定一个 m x n 的矩阵，如果一个元素为 0，则将其所在行和列的所有元素都设为 0。请使用原地算法。

示例 1:

输入: 
[
  [1,1,1],
  [1,0,1],
  [1,1,1]
]
输出: 
[
  [1,0,1],
  [0,0,0],
  [1,0,1]
]
示例 2:

输入: 
[
  [0,1,2,0],
  [3,4,5,2],
  [1,3,1,5]
]
输出: 
[
  [0,0,0,0],
  [0,4,5,0],
  [0,3,1,0]
]
进阶:

一个直接的解决方案是使用  O(mn) 的额外空间，但这并不是一个好的解决方案。
一个简单的改进方案是使用 O(m + n) 的额外空间，但这仍然不是最好的解决方案。
你能想出一个常数空间的解决方案吗？   官方的常数空间解法是错误的。
通过次数51,846提交次数92,839
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
var setZeroes = function(matrix) {
	let rows = [],cols=[]
	for(let i=0;i<matrix.length;i++){
		for(let j=0;j<matrix[i].length;j++){
			if(matrix[i][j]==0){
				rows.push(i),cols.push(j)
			}
		}
	}
	rows.forEach(row=>matrix[row] = matrix[row].map(_=>0))
	cols.forEach(col=>matrix.forEach(row=>row[col]=0))
	return matrix
};
let matrix = [
  [1,1,1],
  [1,0,1],
  [1,1,1]
]
console.info(setZeroes(matrix))