/**
29. 两数相除
难度中等
给定两个整数，被除数 dividend 和除数 divisor。将两数相除，要求不使用乘法、除法和 mod 运算符。
返回被除数 dividend 除以除数 divisor 得到的商。
整数除法的结果应当截去（truncate）其小数部分，例如：truncate(8.345) = 8 以及 truncate(-2.7335) = -2
示例 1:
输入: dividend = 10, divisor = 3
输出: 3
解释: 10/3 = truncate(3.33333..) = truncate(3) = 3
示例 2:
输入: dividend = 7, divisor = -3
输出: -2
解释: 7/-3 = truncate(-2.33333..) = -2
提示：
被除数和除数均为 32 位有符号整数。
除数不为 0。
假设我们的环境只能存储 32 位有符号整数，其数值范围是 [−231,  231 − 1]。本题中，如果除法结果溢出，则返回 231 − 1。
通过次数61,977提交次数307,966
 * @param {number} dividend
 * @param {number} divisor
 * @return {number}
 解题思路：
 除法的本质是减法，所以用被除数不断减去除数，可以得到商。但是这种方法时间复杂度太高。
 于是考虑特殊情况，被除数是2的时候，如何计算商。
 被除数是2的时候，我们只需要用位移运算即可得到商。
 我们将位移运算的过程模拟，并且推广，可以得到被除数是其他数时的运算方法。
 比如9/2=4,9=1*2^0+0*2^1+0*2^2+1*2^3,
 比如134/13=10,134=0*13*2^0+1*13*2^1+0*13*2^2+1*13*2^3
 （134=26+104），即2^1个13加上2^3个13，根据商的定义，商就是2^1+2^3。
  将其推广，得到divisor/dividend=k0*dividend*2^0+k1*dividend*2^1+k2*dividend*2^2+...+kn*dividend*2^n
 记各项中的2^n为xn，则商为xn之和。
 */
const max = 0x7fffffff
const min = -max-1
/*
var divide = function(dividend, divisor) {
    let res = (dividend/divisor)
    if(res<min || res>max)return max
    return res|0
};*/
Array.prototype.getAt = function(i){
	if(i<0)i=this.length+i
	return this[i]
}
let divide = (dividend, divisor)=>{
	//判断两数是否符号相异
	let sign = dividend&0x80000000 ^ divisor&0x80000000
	//归到两数都大于0的情况
	dividend = Math.abs(dividend)
	divisor = Math.abs(divisor)

	let sum = 0,pair
	for(;dividend>=divisor;){
		pair = div(dividend,divisor)
		sum+=pair[0]
		dividend = dividend - pair[1]
	}
	if(sign)sum=-sum
	if(sum<min)return min
	if(sum>max)return max
	return sum
}
//div = limit(div,200)
//计算divisor的2的n次方的数中，最大的数（result[1]），以及该数的2的n次方(result[0])
function div(dividend,divisor){
	if(dividend<divisor)return [0,dividend]
	if(dividend==divisor)return [1,dividend]
	if(divisor==1)return [dividend,dividend]
	let nums = [divisor]
	//不断找divisor的2的n次方，直到找到一个数比dividend大，或者发生溢出
	while(nums.getAt(-1)<dividend && nums.getAt(-1)>0){
		nums.push(nums.getAt(-1)<<1)
	}
	//console.info(nums)
	return [1<<nums.length-2,nums.getAt(-2)]
}
function limit(f,n){
	let times = 0
	return (...args)=>{
		if(times>=n){
			throw new Error(`执行次数超出限制`)
		}
		times++
		return f(...args)
	}
}
/*
console.info(divide(99,6))
console.info(divide(99,5))
console.info(divide(108,13))
console.info(divide(108,1))
console.info(divide(108,109))
console.info(divide(108,108))
console.info(divide(108,-7))*/
//console.info(divide(-2147483648,-1))
console.info(divide(2147483647,2))