/**
n 皇后问题研究的是如何将 n 个皇后放置在 n×n 的棋盘上，并且使皇后彼此之间不能相互攻击。

上图为 8 皇后问题的一种解法。

给定一个整数 n，返回所有不同的 n 皇后问题的解决方案。

每一种解法包含一个明确的 n 皇后问题的棋子放置方案，该方案中 'Q' 和 '.' 分别代表了皇后和空位。

示例:

输入: 4
输出: [
 [".Q..",  // 解法 1
  "...Q",
  "Q...",
  "..Q."],

 ["..Q.",  // 解法 2
  "Q...",
  "...Q",
  ".Q.."]
]
解释: 4 皇后问题存在两个不同的解法。
 

提示：

皇后，是国际象棋中的棋子，意味着国王的妻子。皇后只做一件事，那就是“吃子”。当她遇见可以吃的棋子时，就迅速冲上去吃掉棋子。当然，她横、竖、斜都可走一到七步，可进可退。（引用自 百度百科 - 皇后 ）
通过次数58,242提交次数82,236

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/n-queens
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 * @param {number} n
 * @return {string[][]}
 */
var solveNQueens = function(n) {
    let ansList = []
    let ans = []
    tryRow(0)
    return ansList.map(arr=>arr.map(it=>{
        let row = []
        for(let i=0;i<n;i++){
            row.push(i==it?'Q':'.')
        }
        return row.join('')
    }))
    function tryRow(row){
        if(row==n){
            ansList.push(ans.concat([]))
        }
        for(let col=0;col<n;col++){
            if(isValid(row,col)){
                ans[row] = col
                tryRow(row+1)
            }
        }
    }
    function isValid(row,col){
        for(let i=0;i<row;i++){
            if(col == ans[i] || row-i==col-ans[i] || row-i==ans[i]-col){
                return false
            }
        }
        return true
    }
};
console.info(solveNQueens(1))