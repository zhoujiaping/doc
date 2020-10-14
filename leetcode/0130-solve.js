/**
130. 被围绕的区域
给定一个二维的矩阵，包含 'X' 和 'O'（字母 O）。

找到所有被 'X' 围绕的区域，并将这些区域里所有的 'O' 用 'X' 填充。

示例:

X X X X
X O O X
X X O X
X O X X
运行你的函数后，矩阵变为：

X X X X
X X X X
X X X X
X O X X
解释:

被围绕的区间不会存在于边界上，换句话说，任何边界上的 'O' 都不会被填充为 'X'。 任何不在边界上，或不与边界上的 'O' 相连的 'O' 最终都会被填充为 'X'。如果两个元素在水平或垂直方向相邻，则称它们是“相连”的。

通过次数73,469提交次数174,192
*/
/**
 * @param {character[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */
var solve = function(board) {
	if(board==null||board.length<2)return
	let rowLen = board.length
	let colLen = board[0].length
	let q2 = []
	for(let i=0;i<rowLen;i++){
		bsf(i,0)
		bsf(i,colLen-1)
	}
	for(let j=1;j<colLen-1;j++){
		bsf(0,j)
		bsf(rowLen-1,j)	
	}
	for(let i=0;i<rowLen;i++){
		for(let j=0;j<colLen;j++){
			if(board[i][j]=='O')board[i][j]='X'
			else if(board[i][j]=='M')board[i][j]='O'
		}
	}
	function bsf(i,j){
			if(board[i][j]!='O')return
			//q1:待判断周围的点，q2：连续的为O的点
			let q1 = [[i,j]]
			board[i][j]='M'
			let pos,arounds,row,col,isInner = true
			while(q1.length>0){
				pos = [row,col] = q1.pop()
				q2.push(pos)
				let arounds = [[row-1,col],[row+1,col],[row,col-1],[row,col+1]]
				arounds.forEach(p=>{
					let [r,c] = p
					if(r<0||r>=rowLen||c<0||c>=colLen)return
					if(board[r][c]!='O')return
					board[r][c]='M'
					q1.push(p)
				})
			}
	}
};
let board = [
	'XXXX',
	'XOOX',
	'XXOX',
	'XOXX'
].map(it=>it.split(''))
solve(board)
console.info(board)