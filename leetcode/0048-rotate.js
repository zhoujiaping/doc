/**
给定一个 n × n 的二维矩阵表示一个图像。

将图像顺时针旋转 90 度。

说明：

你必须在原地旋转图像，这意味着你需要直接修改输入的二维矩阵。请不要使用另一个矩阵来旋转图像。

示例 1:

给定 matrix = 
[
  [1,2,3],
  [4,5,6],
  [7,8,9]
],

原地旋转输入矩阵，使其变为:
[
  [7,4,1],
  [8,5,2],
  [9,6,3]
]
示例 2:

给定 matrix =
[
  [ 5, 1, 9,11],
  [ 2, 4, 8,10],
  [13, 3, 6, 7],
  [15,14,12,16]
], 

原地旋转输入矩阵，使其变为:
[
  [15,13, 2, 5],
  [14, 3, 4, 1],
  [12, 6, 8, 9],
  [16, 7,10,11]
]
通过次数93,828提交次数135,402

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/rotate-image
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 分治法
 */
var rotate = function(matrix) {
	if(matrix.length<=1){
		return matrix
	}else{
		let len = matrix.length
		let tmp = matrix[0].slice(0,len-1)
		for(let i=0;i<len-1;i++){
			matrix[0][i] = matrix[len-i-1][0]
			matrix[len-i-1][0] = matrix[len-1][len-i-1]
			matrix[len-1][len-i-1] = matrix[i][len-1]
			matrix[i][len-1] = tmp[i]
		}
		let subMatrix = rotate(matrix.slice(1,len-1).map(it=>it.slice(1,it.length-1)))
		for(let i=1;i<len-1;i++){
			matrix[i].splice(1,len-2,...subMatrix[i-1])
		}
		return matrix
	}
};
//网上看到更好的解法，先将行和列互转，然后每行reverse
rotate = matrix=>{
	let tmp
	for(let i=0;i<matrix.length;i++){
		for(let j=0;j<i;j++){
			tmp = matrix[i][j]
			matrix[i][j] = matrix[j][i]
			matrix[j][i] = tmp
		}
	}
	matrix.forEach(it=>it.reverse())
	return matrix
}
let zip = (...arrs)=>{
	let newArrs = []
	for(let i=0;i<arrs.length;i++){
		for(let j=0;j<arrs[i].length;j++){
			if(newArrs[j]==null)newArrs[j]=[]
			newArrs[j][i] = arrs[i][j]
		}
	}
	return newArrs
}
//虽然没有在原地修改数组，但是这个函数式编程非常棒
rotate = matrix=>zip(...matrix).forEach(it=>it.reverse())
let matrix = [
	[1,2,3],
	[4,5,6],
	[7,8,9]
]
matrix = [
  [ 5, 1, 9,11],
  [ 2, 4, 8,10],
  [13, 3, 6, 7],
  [15,14,12,16]
]
rotate(matrix).forEach(it=>console.info(it))
