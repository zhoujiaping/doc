/**
37. 解数独
编写一个程序，通过已填充的空格来解决数独问题。

一个数独的解法需遵循如下规则：

数字 1-9 在每一行只能出现一次。
数字 1-9 在每一列只能出现一次。
数字 1-9 在每一个以粗实线分隔的 3x3 宫内只能出现一次。
空白格用 '.' 表示。

图片无法粘贴

一个数独。

图片无法粘贴

答案被标成红色。

Note:

给定的数独序列只包含数字 1-9 和字符 '.' 。
你可以假设给定的数独只有唯一解。
给定数独永远是 9x9 形式的。
通过次数36,377提交次数58,366

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/sudoku-solver
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
*/

/**
 * @param {character[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */
var solveSudoku = function(board) {
	let board0 = board
	board = [[],[],[],[],[],[],[],[],[]]
	let rotate = [[],[],[],[],[],[],[],[],[]]
	let block = [[],[],[],[],[],[],[],[],[]]
    for(let i=0,item=0;i<9;i++){
        for(let j=0;j<9;j++){
        	item = {num:board0[i][j]}
        	item.init = item.num!='.'
        	board[i][j] = item
            rotate[j][i] = item
            block[blockNum(i,j)].push(item)
        }
    }
    let results = []
    let nums = '123456789'.split('')
	tryPosition(0,0)
	if(results.length>0){
		let result = results[0]
		board0.forEach((arr,i)=>result[i].forEach((it,j)=>arr[j]=it))
	}
	console.table(board0)
	function tryPosition(i,j){
		if(i>8){
			let result = board.map(arr=>arr.map(it=>it.num))
			results.push(result)
			console.table(result)
			return
		}
		if(board[i][j].init){
			tryPosition(...nextPosition(i,j))
		}else{
			nums.forEach(num=>{
				board[i][j].num=num
				if(isValidSudoku()){
					tryPosition(...nextPosition(i,j))
				}
				board[i][j].num='.'
			})
		}

	}
	function nextPosition(i,j){
		if(j==8){
			j=0,i++
		}else{
			j++
		}
		return [i,j]
	}
	function isValidSudoku() {
	    for(let i=0,k=0;i<9;i++){
	      for(let j=0;j<9;j++){
            if(board[i][j].num=='.'){
              continue
            }
	        k = blockNum(i,j)
		    if(board[i].some((it,j0)=>j!=j0&&it.num==board[i][j].num)
	          ||rotate[j].some((it,i0)=>i!=i0&&it.num==board[i][j].num)
	          ||block[k].some((it,n)=>i!=knToI(k,n)&&j!=knToJ(k,n)&&it.num==board[i][j].num)){
		      return false
	        }
	      }
	    }
	    return true
	}
}

function blockNum(i,j){
  return ((i/3)|0)*3+((j/3)|0)
}
function knToI(k,n){
  return (k/3|0)*3+(n/3|0)
}
function knToJ(k,n){
  return (k%3)*3+n%3
}

let board = [
              ["5","3",".",".","7",".",".",".","."],
              ["6",".",".","1","9","5",".",".","."],
              [".","9","8",".",".",".",".","6","."],
              ["8",".",".",".","6",".",".",".","3"],
              ["4",".",".","8",".","3",".",".","1"],
              ["7",".",".",".","2",".",".",".","6"],
              [".","6",".",".",".",".","2","8","."],
              [".",".",".","4","1","9",".",".","5"],
              [".",".",".",".","8",".",".","7","9"]
            ]
solveSudoku(board)