/**
59. 螺旋矩阵 II
给定一个正整数 n，生成一个包含 1 到 n2 所有元素，且元素按顺时针顺序螺旋排列的正方形矩阵。

示例:

输入: 3
输出:
[
 [ 1, 2, 3 ],
 [ 8, 9, 4 ],
 [ 7, 6, 5 ]
]
通过次数44,758提交次数57,366
 * @param {number} n
 * @return {number[][]}
 */
var generateMatrix = function(n) {
	let h=n,w=n
	let matrix = []
	for(let i=0;i<n;i++)matrix[i]=[]
	let top=0,bottom=h-1,left=0,right=w-1
	let value=1
	while(value<=h*w){
		for(let col=left;col<=right;col++){
			matrix[top][col] = value++
		}
		top++	
		for(let row=top;row<=bottom;row++){
			matrix[row][right] = value++	
		}
		right--
		for(let col=right;col>=left;col--){
			matrix[bottom][col] = value++
		}
		bottom--	
		for(let row=bottom;row>=top;row--){
			matrix[row][left] = value++	
		}
		left++
	}
	return matrix
};
console.info(generateMatrix(4))
