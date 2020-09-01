/**
79. 单词搜索
给定一个二维网格和一个单词，找出该单词是否存在于网格中。

单词必须按照字母顺序，通过相邻的单元格内的字母构成，其中“相邻”单元格是那些水平相邻或垂直相邻的单元格。同一个单元格内的字母不允许被重复使用。

示例:
board =
[
  ['A','B','C','E'],
  ['S','F','C','S'],
  ['A','D','E','E']
]

给定 word = "ABCCED", 返回 true
给定 word = "SEE", 返回 true
给定 word = "ABCB", 返回 false

提示：
board 和 word 中只包含大写和小写英文字母。
1 <= board.length <= 200
1 <= board[i].length <= 200
1 <= word.length <= 10^3
通过次数81,596提交次数192,574
 * @param {character[][]} board
 * @param {string} word
 * @return {boolean}
 回溯
 */
var exist = function(board, word) {
	for(let i=0;i<board.length;i++){
		for(let j=0;j<board[0].length;j++){
			if(tryPosition(i,j,0)){
				return true
			}
		}
	}
	return false
	//从位置i,j开始找word.substr(k)
	function tryPosition(i,j,k){
		if(i<0||j<0||i==board.length||j==board[0].length||board[i][j]!=word[k]){
			return false
		}
		if(k==word.length-1)return true
		//在原数组中保存 已访问标记，这样就不用每次都初始化一次访问标记了
		board[i][j]=board[i][j]+'z'
		let find = tryPosition(i-1,j,k+1)||tryPosition(i+1,j,k+1)||tryPosition(i,j-1,k+1)||tryPosition(i,j+1,k+1)
		board[i][j]=board[i][j][0]
		return find
	}
};
let board = [
  ['A','B','C','E'],
  ['S','F','C','S'],
  ['A','D','E','E']
]
let word= "ABCCED"//返回 true
//word = "SEE"// 返回 true
word = "ABCB"// 返回 false
word = 'SFDECSECBA'

board = [
	["C","A","A"],
	["A","A","A"],
	["B","C","D"]
]
word = "AAB"
console.info(exist(board,word))