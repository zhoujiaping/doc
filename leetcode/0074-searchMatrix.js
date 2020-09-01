/**
74. 搜索二维矩阵
编写一个高效的算法来判断 m x n 矩阵中，是否存在一个目标值。该矩阵具有如下特性：

每行中的整数从左到右按升序排列。
每行的第一个整数大于前一行的最后一个整数。
示例 1:

输入:
matrix = [
  [1,   3,  5,  7],
  [10, 11, 16, 20],
  [23, 30, 34, 50]
]
target = 3
输出: true
示例 2:

输入:
matrix = [
  [1,   3,  5,  7],
  [10, 11, 16, 20],
  [23, 30, 34, 50]
]
target = 13
输出: false
通过次数59,211提交次数152,664
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 两次二分查找
 */
var searchMatrix = function(matrix, target) {
	let arr = matrix.map(row=>row[0])
	let pos = binSearch(arr,target)
	if(pos<0)return false
	if(arr[pos]==target){
		return true
	}
	arr = matrix[pos]
	pos = binSearch(arr,target)
	return arr[pos]==target
};
//寻找位置或者要插入的位置i（插入到i后面）。
function binSearch(arr,target){
	let begin = 0,end=arr.length-1,mid=(end-begin)/2|0
	while(begin<=end){
		if(target==arr[mid]){
			return mid
		}else if(target<arr[mid]){
			end = mid-1
		}else{
			begin = mid+1
		}
		mid=(end+begin)/2|0
	}
	return end
}
let arr = [1,4,5],target=3

console.info(binSearch(arr,target))

let matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,50]]
target=3
matrix = [[1]],target=0
matrix = [],target=0
console.info(searchMatrix(matrix,target))