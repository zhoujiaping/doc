/**
实现 pow(x, n) ，即计算 x 的 n 次幂函数。

示例 1:

输入: 2.00000, 10
输出: 1024.00000
示例 2:

输入: 2.10000, 3
输出: 9.26100
示例 3:

输入: 2.00000, -2
输出: 0.25000
解释: 2-2 = 1/22 = 1/4 = 0.25
说明:

-100.0 < x < 100.0
n 是 32 位有符号整数，其数值范围是 [−231, 231 − 1] 。
通过次数120,416提交次数330,354

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/powx-n
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 * @param {number} x
 * @param {number} n
 * @return {number}
 */
var myPow = function(x, n) {
	if(n==0)return 1
	if(n<0){
		return myPow(1/x,-n)
	}
	if(n&1){
		let value = myPow(x, n/2|0)
		return value*value*x
	}
	let value = myPow(x, n/2)
	return value*value
};
let x=2,n=10
console.info(myPow(x,n))


