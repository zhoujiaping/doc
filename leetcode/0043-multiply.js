/**
给定两个以字符串形式表示的非负整数 num1 和 num2，返回 num1 和 num2 的乘积，它们的乘积也表示为字符串形式。

示例 1:

输入: num1 = "2", num2 = "3"
输出: "6"
示例 2:

输入: num1 = "123", num2 = "456"
输出: "56088"
说明：

num1 和 num2 的长度小于110。
num1 和 num2 只包含数字 0-9。
num1 和 num2 均不以零开头，除非是数字 0 本身。
不能使用任何标准库的大数类型（比如 BigInteger）或直接将输入转换为整数来处理。
通过次数98,664提交次数221,839

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/multiply-strings
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

 * @param {string} num1
 * @param {string} num2
 * @return {string}
js中安全的最大值为Math.pow(2,53),即9007199254740992(共16位)
 */
const blockSize = 7
const blockFac = Math.pow(10,blockSize)
var multiply = function(num1, num2) {
	let block1 = toBlock(num1)
	let block2 = toBlock(num2)
	let resultBlock = ['0']
	let product = 0
	let carry = 0
	for(let i=0;i<block1.length;i++){
		for(let j=0;j<block2.length;j++){
			carry = block1[i]*block2[j]
			let k = i+j
			while(carry){
				resultBlock[k] = resultBlock[k]==null?0:resultBlock[k]
				resultBlock[k] += carry
				carry = resultBlock[k]/blockFac|0
				resultBlock[k] %= blockFac
				k++
			}
		}
	}
	//console.info(block1)
	//console.info(block2)
	return resultBlock.reverse().map((it,i)=>{
		if(i==0){
			return ''+it
		}else{
			return (blockFac+it).toString().substr(1)
		}
	}).join('')
};
function toBlock(num){
	let block = []
	while(num.length>blockSize){
		block.push(num.substr(num.length-blockSize))
		num = num.substr(0,num.length-blockSize)
	}
	if(num!=''){
		block.push(num)
	}
	return block
}
console.info(multiply('99','99'))
console.info(multiply('123456789123456789123456789','98765432198765432'))
console.info(multiply('0','0'))
console.info(multiply("23650399","1148"))
console.info(23650399n*1148n)
console.info(123456789123456789123456789n*98765432198765432n)