/**
54. 螺旋矩阵
给定一个包含 m x n 个元素的矩阵（m 行, n 列），请按照顺时针螺旋顺序，返回矩阵中的所有元素。

示例 1:

输入:
[
 [ 1, 2, 3 ],
 [ 4, 5, 6 ],
 [ 7, 8, 9 ]
]
输出: [1,2,3,6,9,8,7,4,5]
示例 2:

输入:
[
  [1, 2, 3, 4],
  [5, 6, 7, 8],
  [9,10,11,12]
]
输出: [1,2,3,4,8,12,11,10,9,5,6,7]
通过次数77,603提交次数189,030
 * @param {number[][]} matrix
 * @return {number[]}
 */
var spiralOrder = function(matrix) {
	if(matrix.length==0)return []
	let h=matrix.length,w=matrix[0].length
	let ans = []
	let top=0,bottom=h-1,left=0,right=w-1
	while(ans.length<h*w){
		for(let col=left;col<=right;col++){
			ans.push(matrix[top][col])
		}
		top++
		if(top>bottom)break
		for(let row=top;row<=bottom;row++){
			ans.push(matrix[row][right])
		}
		right--
		if(right<left)break	
		for(let col=right;col>=left;col--){
			ans.push(matrix[bottom][col])
		}
		bottom--
		if(top>bottom)break
		for(let row=bottom;row>=top;row--){
			ans.push(matrix[row][left])
		}
		left++
		if(right<left)break	
	}
	return ans
};
let matrix = [
  [1, 2, 3, 4],
  [5, 6, 7, 8],
  [9,10,11,12]
]
matrix2=[
	[]
]
matrix = [[1,2,3,4],[5,6,7,8],[9,10,11,12]]
console.info(spiralOrder(matrix))