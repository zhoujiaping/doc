/**
 * @param {string} s
 * @param {number} numRows
 * @return {string}
 */
var convert = function(s, numRows) {
	if(numRows==1){
		return s;
	}
    let chs = [...s];
	let res = [];
	for(let i=0;i<numRows;i++){
		res.push([]);
	}
	let isDown = true;//·½Ïò
	let row = 0;
	let col = 0;
	let i = 0;
	while(i<s.length){
		if(isDown){
			res[row].push(chs[i]);
			if(row==numRows-1){
				isDown = !isDown;
				row--;
				col++;
			}else{
				row++;
			}
		}else{
			res[row].push(chs[i]);
			if(row==0){
				isDown = !isDown;
				row++;
			}else{
				row--;
				col++;
			}
		}
		i++;
	}
	return res.map(item=>item.join('')).join('');
};
(()=>{
	let s = 'PAYPALISHIRING';
	s = 'AB';
	let numRows = 1;
	let expectRes = 'PINALSIGYAHRPI';
	let res = convert(s,numRows);
	console.info(res);
})();