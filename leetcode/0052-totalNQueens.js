/**
同0052，只是返回的不是所有的方案，而是方案的个数
 * @param {number} n
 * @return {number}
 */
var totalNQueens = function(n) {
	let ansList = []
    tryRow(0,[])
    return ansList.length
    function tryRow(row,acc){
        if(row==n){
            ansList.push(acc.concat([]))
        }
        for(let col=0;col<n;col++){
            if(isValid(row,col,acc)){
                acc[row] = col
                tryRow(row+1,acc)
            }
        }
    }
    function isValid(row,col,acc){
        for(let i=0;i<row;i++){
            if(col == acc[i] || row-i==col-acc[i] || row-i==acc[i]-col){
                return false
            }
        }
        return true
    }
};
console.info(totalNQueens(4))