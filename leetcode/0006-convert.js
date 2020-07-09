/**
 一个好的算法，应该可以方便观察中间结果，除非性能上有非常大的提升。
先生成中间结果，保存到二维数组。
使用order记录当前向上还是向下。
使用row和col分别表示当前设置第row行第col列。
该算法相对简单，容易调试，容易观察中间结果。
*/
let convert0 = (chs,numRows)=>{
	if(numRows==1){
		return chs
	}
	let arr = chs.slice(0,numRows).map(_=>[])
	const len = Math.ceil(chs.length/numRows)
	let row = 0,col = 0,order = 1//1:向下，2:向上
	for(let i=0;i<chs.length;i++){
		arr[row][col] = chs[i]
		if(order == 1){
			//如果当前字符是最底下的字符，那么顺序就改为向上，并且处理上一行下一列。
			if(row == numRows-1){
				order = -1,row--,col++
			}else{
				row++
			}
		}else{
			if(row == 0){
				order = 1,row++
			}else{
				row--,col++
			}
		}
	}
	return arr.map(i=>i.join(''))
}
/**
 * @param {string} s
 * @param {number} numRows
 * @return {string}
 */
let convert = (s,numRows)=>convert0([...s],numRows).join('')
console.info(convert("LEETCODEISHIRING",3))//LCIRETOESIIGEDHN
console.info(convert("LEETCODEISHIRING",4))//LDREOEIIECIHNTSG
console.info(convert("L",1))//
console.info(convert("AB",1))//