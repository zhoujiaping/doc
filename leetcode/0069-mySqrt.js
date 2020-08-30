/**
69. x 的平方根
实现 int sqrt(int x) 函数。

计算并返回 x 的平方根，其中 x 是非负整数。

由于返回类型是整数，结果只保留整数的部分，小数部分将被舍去。

示例 1:

输入: 4
输出: 2
示例 2:

输入: 8
输出: 2
说明: 8 的平方根是 2.82842..., 
     由于返回类型是整数，小数部分将被舍去。
通过次数196,242提交次数505,354
 * @param {number} x
 * @return {number}
 */
var mySqrt = function(x) {
	if(x==1 || x==0)return x
	if(x<1)throw new Error('x must >=0')
	//return Math.sqrt(x)
	let begin=0,end=x,mid=(end+begin)/2,product=mid*mid
	while(true){
		if(product-x>0.0000001){
			end = mid
			mid = (begin+end)/2
		}else if(product-x<-0.0000001){
			begin = mid
			mid = (begin+end)/2
		}else{
			return mid
		}
		product=mid*mid
	}
};
let x = 9
console.info(mySqrt(x))