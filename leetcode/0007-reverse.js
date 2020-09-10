/**
7. 整数反转
难度简单
给出一个 32 位的有符号整数，你需要将这个整数中每位上的数字进行反转。

示例 1:

输入: 123
输出: 321
 示例 2:

输入: -123
输出: -321
示例 3:

输入: 120
输出: 21
注意:

假设我们的环境只能存储得下 32 位的有符号整数，则其数值范围为 [−231,  231 − 1]。请根据这个假设，如果反转后整数溢出那么就返回 0。
 * @param {number} x
 * @return {number}
 */
let max32 = 0x7fffffff
let min32 = -max32-1
/*
var reverse = function(x) {
	if(x==0){
		return 0
	}else if(x<0){
		x = ''+x
		x = [...(x.substr(1))].reverse().join('')
		x = -x
		if(x<min32 || x>=0){
			return 0
		}
		return x
	}else{
		x = ''+x
		x = [...x].reverse().join('')
		x = +x
		if(x>max32 || x<=0){
			return 0
		}
		return x
	}
};*/
let reverse = x=>{
	if(x==0){
		return 0
	}else if(x<0){
		let left = -x
		let res = 0
		while(left>0){
			res = left%10+res*10
			left = (left/10)|0
		}
		res = -res
		if(res<min32||res>=0){
			return 0
		}
		return res
	}else{
		let left = x
		let res = 0
		while(left>0){
			res = left%10+res*10
			left = (left/10)|0
		}
		if(res>max32||res<=0){
			return 0
		}
		return res
	}
}
/**
 * @param {number} x
 * @return {number}
 这个leetcode上的，nb+啊，代码这么简洁。
 如果result为负数，2147483648|0结果为啥为-2147483648
 小于2147483648的数按位或0得到原数
 */
reverse = function(x) {
    let result = 0;
    while (x !== 0){
        result = result * 10 + x % 10;
        x = (x / 10) | 0;
    }
    return (result | 0) === result ? result : 0;
};
console.info(reverse(-1230))
console.info(reverse(1534236469))
console.info(reverse([...'2147483648'].reverse().join('')))

