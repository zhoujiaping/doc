/**
6. Z 字形变换
将一个给定字符串根据给定的行数，以从上往下、从左到右进行 Z 字形排列。

比如输入字符串为 "LEETCODEISHIRING" 行数为 3 时，排列如下：

L   C   I   R
E T O E S I I G
E   D   H   N
之后，你的输出需要从左往右逐行读取，产生出一个新的字符串，比如："LCIRETOESIIGEDHN"。

请你实现这个将字符串进行指定行数变换的函数：

string convert(string s, int numRows);
示例 1:

输入: s = "LEETCODEISHIRING", numRows = 3
输出: "LCIRETOESIIGEDHN"
示例 2:

输入: s = "LEETCODEISHIRING", numRows = 4
输出: "LDREOEIIECIHNTSG"
解释:

L     D     R
E   O E   I I
E C   I H   N
T     S     G
通过次数168,814提交次数346,559

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/zigzag-conversion
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
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