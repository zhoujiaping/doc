let n = 8;
let cols = [];//��i�з��ڵ�cols[i]�С�
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
		//���ַ�ʽ�Խ��ߣ�ͬһ��
		if(row-i==cols[i]-col || row-i == col -cols[i] || cols[i]==col){
			return false;
		}
	}
	return true;
}
tryRow(0);
