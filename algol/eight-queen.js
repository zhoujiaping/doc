/**
主要逻辑：
尝试行，尝试列，检查条件，条件满足则尝试下一行，尝试下一行不管是否有解，都要回来尝试下一列。如果条件不满足，则直接尝试下一列。
*/
let n = 8
let cols = []//第i行放在第cols[i]列。
//尝试放置第row行
function tryRow(row){
    //尝试对每一列进行放置
    for(let col=0;col<n;col++){
    //判断在第row行第col列放置是否被允许
        if(enabled(row,col)){
        //如果允许，就记录到保存解的数据结构中
            cols[row] = col
            //如果已经求出解，打印
            if(row == n-1){
                console.table(cols)
                return
            }
            //如果还到最后一行，尝试放置下一行
            tryRow(row+1)
        }
    }
}
//判断第row行第col列放置是否允许
function enabled(row,col){
    for(let i=0;i<row;i++){
        //两种方式对角线，同一列
        //要么row1-row2==col1-col2(对角线)
        //要么row1-row2==col2-col1(对角线)
        //要么col1==col2(同一列)
        if(row-i==cols[i]-col || row-i == col -cols[i] || cols[i]==col){
            return false
        }
    }
    return true
}
tryRow(0)
