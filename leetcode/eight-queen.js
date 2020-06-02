let n = 8;
let cols = [];//第i行放在第cols[i]列。
function tryRow(row){
	for(let col=0;col<n;col++){
		if(enabled(row,col)){
			cols[row] = col;
			if(row == n-1){
				console.info(cols);
				return;
			}
			tryRow(row+1);
		}
	}
}
function enabled(row,col){
	for(let i=0;i<row;i++){
		//两种方式对角线，同一列
		if(row-i==cols[i]-col || row-i == col -cols[i] || cols[i]==col){
			return false;
		}
	}
	return true;
}
tryRow(0);
